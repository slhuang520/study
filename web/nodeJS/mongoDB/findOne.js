const MongodbClient = require("mongodb").MongoClient,
    assert = require("assert");

(async () => {
    const url = "mongodb://127.0.0.1:27017",
        dbName = "mydb",
        client = new MongodbClient(url);

    try {

        await client.connect();
        const db = client.db(dbName);

        let col = await db.collection("user");
        col.findOne().then(res => {
            console.log(res); //{ _id: 5ccd913ef78b417285224075, name: 'Jim', age: 12 }
        });

    } catch (e) {
        console.log(e.stack);
    } finally {
        client.close();
    }
})();