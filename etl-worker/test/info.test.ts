/* eslint-disable @typescript-eslint/no-var-requires */
// import dotenv from 'dotenv';
// dotenv.config();
import { connectToDatabase } from '../src/db.connection';
import { DBConfig } from '../src/env';
import {
  calculateSE,
  calculateSEFromProficiency,
  estimateAbilityEAP,
  getConfidenceLevel,
  getProficiencyLevel,
} from '../src/irt';
import { persistInfoInDB } from '../src/lambda.helper';

describe('userCollection', function () {
  it('validation filters', async function () {
    // const json = require(__dirname + '/test.json');
    // const event = [];
    // event.push(json);
    // await PersistInfoIndb(event);
    // const zetas1 = [
    //   { difficultyLvl: 1, discriminationPower: 1, guessAbility: 0.01 },
    // ];
    // const data1 = getProficiencyLevel([1], zetas1);
    // const confLvl1 = getConfidenceLevel(data1, zetas1);
    // const data2 = getProficiencyLevel([1], zetas1, data1);
    // const confLvl2 = getConfidenceLevel(data2, zetas1, confLvl1);
    // const data3 = getProficiencyLevel([1], zetas1, data2);
    // const confLvl3 = getConfidenceLevel(data2, zetas1, confLvl2);
    // const data4 = getProficiencyLevel([1], zetas1, data3);
    // const confLvl4 = getConfidenceLevel(data2, zetas1, confLvl3);
    // const data5 = getProficiencyLevel([1], zetas1, data4);
    // const confLvl5 = getConfidenceLevel(data2, zetas1, confLvl4);
    // // const data3 = getProficiencyLevel([1], zetas1, data2);
    // // const data4 = getProficiencyLevel([1], zetas1, data3);
    // // const data5 = getProficiencyLevel([1], zetas1, data4);
    // // const data6 = getProficiencyLevel([1], zetas1, data5);
    // // const data7 = getProficiencyLevel([1], zetas1, data6);
    // // const data8 = getProficiencyLevel([1], zetas1, data7);

    // console.log(data1, confLvl1, data5, confLvl5);
    await connectToDatabase(DBConfig.url);
    await persistInfoInDB([
      {
        actor: {
          id: 'test-user1',
          type: 'User',
        },
        context: {
          cdata: [],
          channel: 'test-channel',
          did: 'test-device',
          env: 'ContentPlayer',
          pdata: {
            id: 'producer1',
            ver: '1.0',
          },
          rollup: {},
          sid: 'ci4gjqokrccvbdl4kss4pbhnh0',
        },
        edata: {
          duration: 9,
          item: {
            desc: '',
            exlength: 0,
            id: 'ques1',
            maxscore: 1,
            mc: ['Addition of two numbers', 'Addition of two similar numbers'],
            mmc: [],
            params: [],
            uri: '',
          },
          pass: 'No',
          resvalues: [
            {
              ans1: '6',
            },
          ],
          score: 1,
        },
        eid: 'ASSESS',
        ets: 1518503832030,
        mid: '4399a98d6c50c5d70a3150f3a5ab649e',
        object: {
          id: 'test-content',
          type: 'Content',
          ver: '1.0',
        },
        tags: [],
        ver: '3.0',
        '@timestamp': '2018-02-13T06:37:25.333Z',
        ts: '2018-02-13T06:37:12.030+0000',
      },
    ]);
  });
});
