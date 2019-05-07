const MongodbClient = require("mongodb").MongoClient;
const assert = require("assert");

(async function() {
    const url = "mongodb://127.0.0.1:27017",
        dbName = "mydb",
        client = new MongodbClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);

        const col = await db.collection("user");
        /*//如果传一个 cb 函数，返回的结果为 undefined
        col.insert({name: "Jim", age: 23}, function (err, res) {
            console.log(err);
            console.log(res);
            assert.equal(null, err);
            assert.equal(1, res.result.ok);
            assert.equal(1, res.result.n);
            assert.equal("Jim", res.ops[0].name);
            assert.equal(23, res.ops[0].age);
            assert.equal(1, res.insertedCount);
        });*/

        //如果没有传 cb 函数，则返回一个 Promise
        col.insert({name: "Tos", age: 33}).then(function (res) {
            console.log(res);
            assert.equal(1, res.result.ok);
            assert.equal(1, res.result.n);
            assert.equal("Tos", res.ops[0].name);
            assert.equal(33, res.ops[0].age);
            assert.equal(1, res.insertedCount);
        });
    } catch (e) {
        console.log(e.stack);
    } finally {
        client.close();
    }
})();