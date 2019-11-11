# Twitter_SANAF

## Tweet Collection structure
`{
    "_id": "String",
    "user": "UserObject",
    "text": "String",
    "image": "String",
    "likes": "Number",  //default 0
    "retweetCount": "Number", //default 0
    "parent_id": "TweetObject", //Null default
    "comments": [ {
        "user": "UserObject",
        "text": "String"
     }]
}`
