

## Structure

POST /api/recommendation

Body:

{
    "user_id": "",
    "group_contents": [{
        "content_id": "",
        "content_type": "",
        "micro_concepts": [],
        "tags": [],
    }]
}

micro_concept list -> concept_ids

Will fetch user_id, each concept_ids wise gather proficiency and confidence level data from analytics db

conceptAnalyticMap {
    'concept': {
        proficiency_level:
        confidence_level:
    }
}

Map group_contents to 

group_contents -> [{
    ...,
    concept_levels: micro_concepts.map((e) => conceptAnalyticMap(e))
}]

RuleEngine
file backed rule engine 
json-rule-engine

rules.json

[
    {
        conditions: {
            all: [{
                fact: 'concept_levels$.proficiency_level',
                operator: 'greaterThanInclusive',
                value: 95
            }]
        },
        actions: {
            type: 'skip'
        }
    },
    {
        conditions: {
            all: [{
                fact: 'concept_levels$.proficiency_level',
                operator: 'lessThan',
                value: 95
            }]
        },
        actions: {
            type: 'keep'
        }
    }
]

response:

{
    data: [{
        "content_id": "",
        "content_type": "",
        "micro_concepts": [],
        "tags": [],
    }] //remove skip content
}