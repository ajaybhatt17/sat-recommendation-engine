const { runRuleEngine } = require("../helpers/rule_helper");
const { UserConcept } = require("../models/user_concept_model");


async function getRecommendation(user_id, group_contents) {
    const allMicroConcepts = group_contents
        .map((content) => content.micro_concepts)
        .flat();
      const userConcepts = await UserConcept.find({
        user_id,
        enabled: true,
        concept_id: {
          $in: allMicroConcepts,
        },
      });
      const userConceptMap = userConcepts.reduce((r, a) => {
        r[a.concept_id] = {
          proficiency_score: a.proficiency_score,
          confidence_level: a.confidence_level
        };
        return r;
      }, {});
      const groupContents2 = group_contents.map((e) => {
        return {...e, proficiency_scores: e.micro_concepts.map((p) => userConceptMap[p].proficiency_score), 
          confidence_levels: e.micro_concepts.map((p) => userConceptMap[p].confidence_level) };
      });

      const values = await Promise.all(
        groupContents2.map((groupContent) => {
          return runRuleEngine(groupContent)
        })
      )
      const results = values.flat().filter((e) => e.action==='keep').map((e) => e.data);
      return results;
}

module.exports = {getRecommendation};