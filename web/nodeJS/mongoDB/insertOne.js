const MongodbClient = require("mongodb").MongoClient,
    assert = require("assert");

(async function() {
    const url = "mongodb://127.0.0.1:27017",
        dbName = "mydb",
        client = new MongodbClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        let col = await db.collection("user");

        /*//如果传一个 cb 函数，返回的结果为 undefined
        let res = col.insertOne({name: "Bob", age: 34}, function (err, res) {
            console.log(err);
            console.log(res);
            assert.equal(null, err);
            assert.equal(res.result.n, 1);
            assert.equal(res.result.ok, 1);
            assert.equal(res.ops[0].name, "Bob");
            assert.equal(res.ops[0].age, 34);
            assert.equal(res.insertedCount, 1);
        });*/

        //如果没有传 cb 函数，则返回一个 Promise
        col.insertOne({name: "DG", age: 53}).then(res => {
            console.log(res);
            assert.equal(res.result.n, 1);
            assert.equal(res.result.ok, 1);
            assert.equal(res.ops[0].name, "DG");
            assert.equal(res.ops[0].age, 53);
            assert.equal(res.insertedCount, 1);
        })
    } catch (e) {
        console.log(e.stack);
    } finally {
        client.close();
    }
})();