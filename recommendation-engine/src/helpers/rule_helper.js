const { Engine } = require('json-rules-engine');
const R = require('ramda');

function getRuleEngine() {

  let engine = new Engine();

  engine.addOperator('valuesGreaterThanInclusive', (factValue, jsonValue) => {
    if (!factValue.length) return false
    if (!Array.isArray(factValue)) return false;
    if (factValue.filter((e) => e<jsonValue).length>0) return false;
    return true;
  });

  engine.addOperator('valuesLessThan', (factValue, jsonValue) => {
    if (!factValue.length) return false
    if (!Array.isArray(factValue)) return false;
    if (factValue.filter((e) => e<jsonValue).length>0) return true;
    return false;
  });
  return engine;
}

module.exports = {

  async runRuleEngine(fact) {
    const engine = getRuleEngine();
    const rulesData = require('./../rules.json');
    for(const ruleData of rulesData) {
      if (!((ruleData.params_req||[]).length>0 && R.difference((ruleData.params_req||[]), Object.keys(fact)).length>0)) {
        engine.addRule({
          name: ruleData.name || "Default",
          conditions: ruleData.conditions,
          event: ruleData.event,
          priority: (ruleData.priority || 1),
        })
      }
    }
    const {events} = await engine.run(fact);
    return events.map((event) => ({
            action: event.type,
            data: fact,
          }));
  }

};

