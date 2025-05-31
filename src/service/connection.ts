import amqp, { Channel, ChannelModel } from 'amqplib';

let connection: ChannelModel|null = null;
let channel: Channel|null = null;

async function getConnection() {
    if (connection) return connection;

    console.log('RabbitMQ connection', process.env.AMQP_URL);
    connection = await amqp.connect(process.env.AMQP_URL || "amqp://guest:password@localhost:5672");
    connection.on('error', (err) => {
        console.error('RabbitMQ connection error', err);
        connection = null;
    });
    connection.on('close', () => {
        console.error('RabbitMQ connection closed');
        connection = null;
    });

    return connection;
}

async function getChannel() {
    if (channel) return channel;

    const conn = await getConnection();
    channel = await conn.createChannel();

    channel.on('error', (err) => {
        console.error('RabbitMQ channel error', err);
        channel = null;
    });
    channel.on('close', () => {
        console.error('RabbitMQ channel closed');
        channel = null;
    });

    return channel;
}

export { getConnection, getChannel };
