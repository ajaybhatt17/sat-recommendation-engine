import { AssessEvent } from './../types';

export class SunbirdEventTransformer {
  static parse(data: any): AssessEvent {
    return {
      user_id: data['actor']['id'],
      entity_type: data['object']['type'],
      entity_id: data['edata']['item']['id'],
      duration: data['edata']['duration'],
      max_score: data['edata']['item']['maxscore'],
      score: data['edata']['score'],
      concepts: data['edata']['item']['mc'],
    };
  }
}
