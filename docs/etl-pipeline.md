
## Model


Concept 
```
{
    concept_id
    concept_name
    subject_name
    parent_concept_id
    threshold
    enabled
    created_at
    updated_at
}
```

UserConcept
```
{
    id
    user_id
    concept_id
    proficiency_score
    confidence_level
    total_correct_responses
    total_wrong_responses
    first_response_timestamp
    last_response_timestamp
    enabled
    created_at
    updated_at
    UNIQUE(user_id,concept_id)
}
```

ChangeEventHistory
```
{
    id
    table_ref -> "user_concept"
    ref_id -> user_concept.id
    prev_value -> JSON
    updated_value -> JSON
    enabled
    created_at
    updated_at
}
```

## Transformed for internal pipeline consumption

```
{
    "user_id":
    "event_type":
    "entities": [{
        "entity_type": "question",
        "entity_id": "ques1",
        "total_duration": ,
        "duration":
        "score":
        "max_score": 
        "concepts":
        "missing_concepts":
    }]
}
```

Should we store intermediate processed event in db also?

## Formula

inputs: Pold_c, Cold_c, score, max_score, total_correct_responses, total_wrong_responses

output: 

Case 1:
fully_correct / partial_correct

    total_responses = total_correct_responses + total_wrong_responses + 1
    total_correct_responses += 1

    Pnew_c = (score/max_score) * (total_responses/total_correct_responses) * Pold_c;
    Cnew_c = (score/max_score) * ((total_responses+1)/total_responses) * Cold_c;

Case 2:
complete_wrong

    total_responses = total_correct_responses + total_wrong_responses + 1
    total_wrong_responses += 1

    Cnew_c = total_correct_responses/total_responses;

    
