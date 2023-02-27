

# Product Guide


### Abstract of project (what is the problem you are trying to solve, high level solution description, who is the target audience (geography + persona))

Problem we are solving for adding adaptive ability in learning flow for students. With recommendation engine, rather than make them attempt course content in linear, children item of a content will be in adaptive way so either the content not very difficult or too easy according student ability. basically matching right set of content with student ability at that time. Our target audience is student - learning journey.

### Features & user workflows

1. Generating proficiency level using assessment responses.

2. Using Proficiency level and content metadata to suggest right content to student.

### Tech stack

Nodejs, Mongodb (Atlas)

### Architecture

Flow - https://drive.google.com/file/d/1RnKFo5qVwvMmzpJ36TVRCTB8PGvi2ZBt/view?usp=share_link

### Open-source and Digital Public Goods leveraged/used

Used good amount of open source research and codebase related to Item Response Theory to generate proficiency score (Described in docs/irt-research)

Json-Rules-Engine Npm Library for RuleEngine


### Future Scope.

1. Not fully integrated with Sunbird Ecosystem right now. Assumed data is pushed into system but i think we have to subscribe the data pipeline using Data Service API.
2. Recommendation Engine is build standlone but can be integrated with other system to make it more powerful and in b/w ,main userflows.
3. IRT proficiency score and confidence level can be improved with better model validating with good amount of data.
4. Rules for recommendation engine can be add more to allow more type of actions like - if he is weak in particular segment and preparing for some test (intent) then suggest that content first.