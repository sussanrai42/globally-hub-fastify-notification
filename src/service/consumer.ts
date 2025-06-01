import { Message } from "amqplib";
import { getChannel, getConnection } from "./connection";
import { processor } from "../events/processor.event";
import { RateLimitNotificationException } from "../exceptions/rateLimitNotificationException.exception";

async function processMessage(msg: Message): Promise<void> {
	let body = JSON.parse(msg.content.toString());
	console.log(body, 'Call email API here');
	console.log(body.type, 'payload type');

	await processor.processEvent({
		userId: body.userId,
		type: body.type,
		data: body
	});
}

const consumeMessage = async () => {
	const connection = await getConnection();

	connection.on('error', (err) => {
		console.error('[!] RabbitMQ connection error:', err.message);
	});

	connection.on('close', () => {
		console.error('[!] RabbitMQ connection closed. Trying to reconnect...');
	});

	const channel = await getChannel();
	const exchange = 'laravel-exchange1';
	const retryQueue = 'retry_notification_queue';
	const deleyQueue = 'delay_notification_queue';
	const queue = 'notify-queue12';
	const routingKey = 'test-queue1';

	await channel.assertExchange(exchange, 'direct', { durable: true });
	await channel.assertQueue(queue, {
		durable: true,           // matches queue_durable: true
		exclusive: false,        // matches queue_exclusive: false
		autoDelete: false,       // matches queue_auto_delete: false
		arguments: {
			'x-ha-policy': 'all'   // THIS IS THE KEY - matches Laravel's queue_properties
		}
	});
	// Retry queue with TTL and DLX back to main_queue
	await channel.assertQueue(retryQueue, {
		durable: true,
		arguments: {
		'x-message-ttl': 10000, // 10 seconds
		'x-dead-letter-exchange': '',
		'x-dead-letter-routing-key': queue
		}
	});
	// Delay queue with TTL and DLX back to main_queue
	await channel.assertQueue(deleyQueue, {
		durable: true,
		arguments: {
		'x-message-ttl': 60000, // 1 min
		'x-dead-letter-exchange': '',
		'x-dead-letter-routing-key': queue
		}
	});
	await channel.bindQueue(queue, exchange, routingKey);
	await channel.consume(queue, async (msg: any) => {
		console.log('processing messages');
		const retryCount = parseInt(msg.properties.headers['x-retry'] || 0);
		try {
			await processMessage(msg);
			await channel.ack(msg);
		} catch (error) {
			console.error('Rabbitmq Error processing notification queue message:', error);

			if (retryCount >= 3) {
				console.error(`Max retries notification queue count ${retryCount} reached, discarding message`);
			} else {
				if (error instanceof RateLimitNotificationException) {
					console.warn('Retrying rate limit delay notification queue, message count:', retryCount);
					channel.sendToQueue(deleyQueue, msg.content, {
						headers: {
							...msg.properties.headers,
							'x-retry': retryCount + 1
						}
					});
				} else {
					console.warn('Retrying retry notification queue, message count:', retryCount);
					channel.sendToQueue(retryQueue, msg.content, {
						headers: {
							...msg.properties.headers,
							'x-retry': retryCount + 1
						}
					});
				}
			}
			channel.ack(msg);
		}
	});
	console.log(" [*] Waiting for messages. To exit press CTRL+C");
};

// Immediately invoke async consumer startup
(async () => {
  try {
    await consumeMessage();
  } catch (err) {
    console.error('Error starting consumer:', err);
    process.exit(1);
  }
})();

export { consumeMessage }