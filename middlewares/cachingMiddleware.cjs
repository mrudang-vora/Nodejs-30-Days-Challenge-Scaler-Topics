const { HttpStatusWithCode } = require("../utilities/HttpStatusCodes.cjs");

let cache = {
    toString: () => {
      return JSON.stringify(cache);
    }
  }
const CACHE_TTL = 60 * 1000;
const CACHE_SIZE = 5;
function cachingMiddleware(req, res, next) {
    const cacheKey = req.originalUrl;
    const cachedResponse = cache[cacheKey];
    console.log(`cache: ${cache}`);
    if(cachedResponse){
        const ttl = cachedResponse.ttl;
        if(ttl > Date.now()){
            console.log("Cache HIT");
            return res.status(HttpStatusWithCode.OK_200).send("Cache Hit: " + cachedResponse.data);
        } else {
            console.log("Cache HIT but time to live invalidated");
            delete cache[cacheKey];
        }
    }
    console.log("Cache MISS");
    if(Object.keys(cache).length > CACHE_SIZE){
        console.log("Cache Size Exceeded. Deleting oldest record.");
        const keys = Reflect.ownKeys(cache);
        delete cache[keys[1]];
    }
    const responseData = "Data";
    //Store the data in cache with time to live time
    cache[cacheKey] = {
        data : responseData
        , ttl: (Date.now() + CACHE_TTL)
    };
    req.cachedData = responseData;
    next();
}

module.exports={
    cachingMiddleware
}