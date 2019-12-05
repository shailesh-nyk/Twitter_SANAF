
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