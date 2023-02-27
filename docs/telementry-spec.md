
# Info


## Event Structure

```
{
 // About the event
 "eid": , // Required. TODO: Shall we rename it to "verb" ?? 
 "ets": , // Required. Epoch timestamp of event (time in milli-seconds. For ex: 1442816723)
 "ver": , // Required. Version of the event data structure, currently "3.0"
 "mid": , // Required. Unique message ID. Used for deduplication, replay and update indexes
 
 // Who did the event
 "actor": { // Required. Actor of the event.
   "id": , // Required. Id of the actor. For ex: uid incase of an user
   "type":  // Required. User, System etc.
 },
 
 // Context of the event
 "context": { // Required. Context in which the event has occured.
   "channel": , // Required. Channel which has produced the event
   "pdata": { // Optional. Producer of the event
     "id": , // Required. unique id assigned to that component
     "pid": , // Optional. In case the component is distributed, then which instance of that component
     "ver":  // Optional. version number of the build
   },
   "env": , // Required. Unique environment where the event has occured.
   "sid": , // Optional. session id of the requestor stamped by portal
   "did": , // Optional. uuid of the device, created during app installation
   "cdata": [{ // Optional. correlation data
     "type":"", // Required. Used to indicate action that is being correlated
     "id": "" // Required. The correlation ID value
   }],
   "rollup": { // Optional. Context rollups
     "l1": "",
     "l2": "",
     "l3": "",
     "l4": ""
   }
 },
 // What is the target of the event
 "object": { // Optional. Object which is the subject of the event.
   "id": , // Required. Id of the object. For ex: content id incase of content
   "type": , // Required. Type of the object. For ex: "Content", "Community", "User" etc.
   "ver": , // Optional. version of the object
   "rollup": { // Optional. Rollups to be computed of the object. Only 4 levels are allowed.
   	"l1": "",
     "l2": "",
     "l3": "",
     "l4": ""
   }
 },

```


## Sample Event

```

{
    "actor": {
      "id": "test-user1",
      "type": "User"
    },
    "context": {
      "cdata": [],
      "channel": "test-channel",
      "did": "test-device",
      "env": "ContentPlayer",
      "pdata": {
        "id": "producer1",
        "ver": "1.0"
      },
      "rollup": {},
      "sid": "ci4gjqokrccvbdl4kss4pbhnh0"
    },
    "edata": {
      "duration": 9,
      "item": {
        "desc": "",
        "exlength": 0,
        "id": "ques1",
        "maxscore": 1,
        "mc": [],
        "mmc": [],
        "params": [],
        "uri": ""
      },
      "pass": "No",
      "resvalues": [
        {
          "ans1": "6"
        }
      ],
      "score": 0
    },
    "eid": "ASSESS",
    "ets": 1518503832030,
    "mid": "4399a98d6c50c5d70a3150f3a5ab649e",
    "object": {
      "id": "test-content",
      "type": "Content",
      "ver": "1.0"
    },
    "tags": [],
    "ver": "3.0",
    "@timestamp": "2018-02-13T06:37:25.333Z",
    "ts": "2018-02-13T06:37:12.030+0000"
  }

  ```

  ## Reference

  http://docs.sunbird.org/latest/developer-docs/telemetry/specification/#assess