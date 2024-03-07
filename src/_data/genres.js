const { MongoClient } = require("mongodb");
const { AssetCache } = require("@11ty/eleventy-fetch");

const client = new MongoClient(process.env.MONGO_URI);

async function getGenres() {
  await client.connect();
  const db = client.db("sample_mflix");
  const collection = db.collection("movies");

  const genres = await collection
    .aggregate([
      // https://www.mongodb.com/docs/manual/reference/operator/aggregation/unwind/
      { $unwind: "$genres" },

      // https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/
      { $group: { _id: "$genres" } },

      // https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/
      { $sort : { _id : 1 } }
    ])
    .toArray();

  client.close();
  return genres;
}

module.exports = async function () {
  const cacheKey = "genres";
  const asset = new AssetCache(cacheKey);

  // check if the cache is fresh within the last day
  if (asset.isCacheValid("5m")) {
    console.log("Returning cached genres");
    return asset.getCachedValue(); // a promise
  }

  const data = await getGenres();
  await asset.save(data, "json");
  return data;
};
