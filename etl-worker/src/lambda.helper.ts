/* eslint-disable prettier/prettier */
import EventModel, { EventInterface } from './models/event.model';
import UserConcept, { UserConceptInterface } from './models/user_concept.model';
import { queueEvent } from './queue';
import { EventTransformer } from './transformers/event.transformer';
import { getProficiencyLevel, getConfidenceLevel } from './irt';
import { QUEUE_URL } from './env';
import R from 'ramda';
import ConceptModel from './models/concept.model';

export const persistInfoInDB = async (payload: any[]) => {
  for (const data of payload) {
    console.log(typeof data);
    const eventData = EventTransformer.parse(data);
    const event = new EventModel(eventData);
    await event.save();
    // await queueEvent(QUEUE_URL, event);
    await consumeEventsFromQueue([event]);
  }
};

export const updateUserConceptRecord = async  (userId: string, conceptId: string, isCorrect: boolean) => {
  const userdata: UserConceptInterface = await UserConcept.findOne({
    user_id: userId,
    concept_id: conceptId,
  });
  const correct = isCorrect ? 1 : 0;
  const wrong = !isCorrect ? 1 : 0;
  const input: (1 | 0)[] = [isCorrect ? 1 : 0];
  const zetas1 = [
    { difficultyLvl: 1, discriminationPower: 1, guessAbility: 0.01 },
  ];

  const proficiencyScoreNew = getProficiencyLevel(input, zetas1, userdata?.proficiency_score || 0);
  const confidenceLevelNew = getConfidenceLevel(proficiencyScoreNew, zetas1, userdata?.confidence_level || 0);

  const payload = {
    user_id: userId,
    concept_id: conceptId,
    proficiency_score: proficiencyScoreNew,
    confidence_level: confidenceLevelNew,
    total_correct_responses: (userdata?.total_correct_responses || 0) + correct,
    total_wrong_responses: (userdata?.total_wrong_responses || 0) + wrong,
  };

  if (userdata) {
    await UserConcept.updateOne({ user_id: userId, concept_id: conceptId }, payload);
  } else {
    await UserConcept.create(payload);
  }
}

export const consumeEventsFromQueue = async (events: EventInterface[]) => {
  const conceptList = R.flatten(events.map((e) => (e.concepts||[]))).filter((e) => !!e);
  if (conceptList.length===0) {
    console.log('No concepts to proceed');
    return;
  }

  const concepts1 = await ConceptModel.find({concept_name: {"$in": conceptList}, enabled: true});
  const nonCreatedCocnepts = R.difference(conceptList, concepts1.map((e) => e.name));
  await ConceptModel.create(nonCreatedCocnepts.map((e) => { return {name: e}; }));
  const concepts = await ConceptModel.find({concept_name: {"$in": conceptList}, enabled: true});

  const conceptMap = concepts.reduce((r: any, a: any) => {
    r[a.name] = String(a._id);
    return r;
  }, {})
  for (const event of events) {
    //process and save to analytics db
    for (const concept of event.concepts) {
      await updateUserConceptRecord(event.user_id, conceptMap[concept], event.score === event.max_score);
    }
  }
};
