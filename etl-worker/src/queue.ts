import { DEFAULT_AWS_CONFIG } from './env';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

export async function queueEvent(
  queueUrl: string | undefined,
  data: any,
  delaySecs?: number,
) {
  try {
    if (!queueUrl) {
      console.info(`No env variable to queue url`);
      return;
    }

    if (!DEFAULT_AWS_CONFIG.region) {
      console.info(`No env variable to queue event: ${queueUrl}`);
      return;
    }

    const sqs = new SQSClient(
      DEFAULT_AWS_CONFIG.accessKeyId
        ? {
            region: DEFAULT_AWS_CONFIG.region,
            credentials: {
              accessKeyId: DEFAULT_AWS_CONFIG.accessKeyId,
              secretAccessKey: DEFAULT_AWS_CONFIG.secretAccessKey,
            },
          }
        : { region: DEFAULT_AWS_CONFIG.region },
    );

    await sqs.send(
      new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(data),
        DelaySeconds: delaySecs ? delaySecs : 0,
      }),
    );
  } catch (err) {
    console.error(`Not able to queue event`, err);
  }
}
