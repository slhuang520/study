const MongodbClient = require("mongodb").MongoClient,
    assert = require("assert");

(async function() {
    const url = "mongodb://127.0.0.1:27017",
        dbName = "mydb",
        client = new MongodbClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);

        const col = await db.collection("user");
        let cursor = col.find();
        cursor.count().then(function (count) {
            console.log("count:" + count);
        });

        // cursor.hasNext().then(function (e) {
        //     console.log(e);
        // });

        cursor.forEach(function (user) {
            console.log(user);
        });
        // cursor.toArray(function (err, arr) {
        //     console.log(err, arr);
        // });

    } catch (e) {
        console.log(e.stack);
    } finally {
        client.close();
    }
})();
