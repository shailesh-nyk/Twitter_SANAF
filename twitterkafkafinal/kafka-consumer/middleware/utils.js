var userService = require('../services/user/mongo_user_fetch_following');
var Redis = require("ioredis");
var redis = new Redis(6379, "54.172.121.236", { password: "kafkasucks" });

module.exports.getTimeElapsed = function(time) {
    let minutes = Math.floor((new Date() - time)/60000);
    console.log("Minutes");
    console.log(minutes);
    if(minutes < 60) {
        return minutes + (minutes > 1 ? " mins": " min") + " ago";
    } else if(minutes < 1440) {
        let hrs = Math.floor(minutes/60);
        return hrs + (hrs > 1 ? " hrs" : " hr") + " ago";
    } else  {
        let days = Math.floor(minutes/1440);
        return days + (days > 1 ? " days" : " day") + " ago";
    }
}

module.exports.invalidateRedis = (id) => {
    userService.getFollowers({ id: id }, function (err, res) {
        let followers = []
        if (!Array.isArray(JSON.parse(JSON.stringify(res))))
            followers.push(JSON.parse(JSON.stringify(res))._id);
        else {
            followers = JSON.parse(JSON.stringify(res));
        }
        if (followers.length > 0) {
            redis.del(followers, (err, o) => {
                if (err) console.log("===============REDIS error while invalidating Cache");
                else console.log("==================REDIS Cache cleared for " + o + "  records");
            })
        }
    })
}
module.exports.invalidateUserRedis = (id) => {
    redis.del(id, (err, o) => {
        if (err) console.log("===============REDIS error while invalidating Cache");
        else console.log("==================REDIS Cache cleared for " + o + "  records");
    })
}