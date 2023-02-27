import { SunbirdEventTransformer } from './sunbird_event.transformer';

export class EventTransformer {
  static parse(data: any) {
    let eventData;
    if (data['edata']) eventData = SunbirdEventTransformer.parse(data);
    return eventData;
  }
}
