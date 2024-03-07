const { MongoClient } = require("mongodb");
const { AssetCache } = require("@11ty/eleventy-fetch");

const client = new MongoClient(process.env.MONGO_URI);

async function getMovies() {
  await client.connect();
  const db = client.db("sample_mflix");
  const collection = db.collection("movies");
  const movies = await collection.find({ title: { $regex: /Jurassic/ } })
    .sort({ year: 1 })
    .limit(10)
    .toArray();
  client.close();
  return movies;
}

module.exports = async function() {
    const cacheKey = "movies";
    const asset = new AssetCache(cacheKey);

    // check if the cache is fresh within the last day
    if(asset.isCacheValid("5m")) {
        console.log("Returning cached movies");
        return asset.getCachedValue(); // a promise
    }

    const data = await getMovies();
    await asset.save(data, "json");
    return data;
};
