
module.exports.getTimeElapsed = function(time) {
    let minutes = Math.floor((new Date() - time)/60000);
    console.log("Minutes");
    console.log(minutes);
    if(minutes < 60) {
        return minutes + " mins ago";
    } else if(minutes < 1440) {
        return Math.floor(minutes/60) + " hr ago";
    } else  {
        return Math.floor(minutes/1440) + " days ago";
    }
}