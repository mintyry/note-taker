//generates random string of letters and numbers for each object
function uuid() {
   return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

module.exports = uuid;