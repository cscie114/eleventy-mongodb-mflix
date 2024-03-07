# mongo-11ty-mflix-example

This is an example of a database-driven [11ty](https://www.11ty.dev/) site that integrates data from  MongoDB, a document-oriented database (NoSQL). It makes use of the [mongodb](https://www.npmjs.com/package/mongodb) driver for NodeJS.

## How to run

1. Setup a MongoDB database (try the free tier [MongoDB Atlas](https://www.mongodb.com/atlas) and follow the [Atlas Tutorial](https://www.mongodb.com/basics/mongodb-atlas-tutorial)).
2. Load the [Sample Mflix Dataset](https://www.mongodb.com/docs/atlas/sample-data/sample-mflix/).
3. Create `.env` file and add `MONGO_URI` to define the [connection string](https://www.mongodb.com/docs/manual/reference/connection-string/).
4. Start 11ty with `npm start`.

## Data files

There are two [global data files](https://www.11ty.dev/docs/data-global/):

- `src/_data/movies.js` [retrieves](https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/retrieve/) a subset of movies from the database that have "Jurassic" in the title.
- `src/_data/genres.js` [aggregates](https://www.mongodb.com/docs/drivers/node/current/fundamentals/aggregation/) a list of unique genres across all movie documents in the database.

## Caching database results

This example also demonstrates the use of 11ty's `AssetCache` to [manually cache](https://www.11ty.dev/docs/plugins/fetch/#manually-store-your-own-data-in-the-cache) the results of the database requests. This can be helpful to speed up local development if the database queries are expensive.

## Debugging

There is a `.vscode/launch.json` in this repository that can be used for [debugging with VS Code](https://code.visualstudio.com/docs/editor/debugging). Configuration options are described in more detail by [Node.js debugging in VS Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging). Use this when you want to set a breakpoint in a javascript file to inspect variables at a particular point in time and/or step through the execution.
