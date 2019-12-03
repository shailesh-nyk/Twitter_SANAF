const nodeCache = require('node-cache');
const ttlSeconds = 60 * 60 * 1; // cache for 1 hour
const cache = new nodeCache({
    stdTTL: ttlSeconds,
    checkperiod: ttlSeconds * 0.2,
    useClones: false 
});
module.exports.get = function(key, storeFunction) {
    const value = cache.get(key);
    if (value) {
      return Promise.resolve(value);
    }
    storeFunction();
}

module.exports.set = function(key,value){
    return cache.set(key,value,ttlSeconds);
}

module.exports.del = function(keys) {
    cache.del(keys);
}

module.exports.delStartWith = function(startStr = '') {
    if (!startStr) {
      return;
}

const keys = this.cache.keys();
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    }
}

module.exports.flush = function() {
    cache.flushAll();
}



// const NodeCache = require('node-cache');

// class Cache {

//   constructor(ttlSeconds) {
//     this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
//   }

//   get(key, storeFunction) {
//     const value = this.cache.get(key);
//     if (value) {
//       return Promise.resolve(value);
//     }

//     return storeFunction().then((result) => {
//       this.cache.set(key, result);
//       return result;
//     });
//   }

//   del(keys) {
//     this.cache.del(keys);
//   }

//   delStartWith(startStr = '') {
//     if (!startStr) {
//       return;
//     }

//     const keys = this.cache.keys();
//     for (const key of keys) {
//       if (key.indexOf(startStr) === 0) {
//         this.del(key);
//       }
//     }
//   }

//   flush() {
//     this.cache.flushAll();
//   }
// }


// module.exports.Cache= Cache;