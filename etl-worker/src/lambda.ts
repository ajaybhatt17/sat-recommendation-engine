import { connectToDatabase } from './db.connection';
import { DBConfig } from './env';

async function processEvent(info: any) {
  const { event, payload } = info;
  if (!event) return;
  switch (event) {
    case 'fetch_events_from_sunbird':
      break;

    case 'consume_events_from_queue':
      break;

    default:
      console.log(
        `Event not supported - ${JSON.stringify(event)} ${JSON.stringify(
          payload || {},
        )}`,
      );
      break;
  }
}

export const eventHandler = async (event: any, context) => {
  connectToDatabase(DBConfig.url);
  if (event['Records']) {
    const records = event['Records'];
    for (const record of records) {
      const body = JSON.parse(record['body']);
      await processEvent(body);
    }
  } else {
    await processEvent(event);
  }
  return null;
};
