import { getChannel } from "./connection";

async function publishMessage(queue: any, message: any) {
  const channel = await getChannel();

  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(message));
}

export { publishMessage };
