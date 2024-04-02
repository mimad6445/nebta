const redis = require('redis');
const httpStatusText = require("../utils/httpStatusText");

// Create Redis client
const client = redis.createClient();

// Handle Redis client errors
client.on("error", function(error) {
    console.error('Redis client error:', error);
});

// Define middleware function for Redis caching
const cacheMiddleware = (req, res, next) => {
    // Construct a unique key for the requested data (e.g., based on the request URL)
    const cacheKey = req.originalUrl;

    // Check if the data exists in the Redis cache
    client.get(cacheKey, (err, data) => {
        if (err) {
            console.error('Error getting data from Redis:', err);
            return next(); // Proceed to the next middleware without caching
        }

        if (data !== null) {
            console.log('Data found in cache:', data);
            // Send the cached data as the response
            res.status(200).json({ status: httpStatusText.SUCCESS, data: JSON.parse(data) });
        } else {
            // Data not found in cache, proceed to the next middleware (controller methods)
            next();
        }
    });
};

// Middleware function to cache data in Redis
const cacheData = (req, data) => {
    const cacheKey = req.originalUrl;
    client.set(cacheKey, JSON.stringify(data));
};

module.exports = { cacheMiddleware, cacheData };
