const MongodbClient = require("mongodb").MongoClient,
    assert = require("assert");

(async () => {
    const url = "mongodb://127.0.0.1:27017",
        dbName = "mydb",
        client = new MongodbClient(url);

    try {

        await client.connect();
        let db = client.db(dbName);
        const col = await db.collection("user");
        /*//如果传一个 cb 函数，返回的结果为 undefined
        col.insertMany([
            {name: "Sa", age: 51},
            {name: "Ko", age: 36}
        ], (err, res) => {
            console.log(err);
            console.log(res);
            assert.equal(null, err);
            assert.equal(res.result.n, 2);
            assert.equal(res.result.ok, 1);
            assert.equal(res.ops[0].name, "Sa");
            assert.equal(res.ops[0].age, 51);
            assert.equal(res.ops[1].name, "Ko");
            assert.equal(res.ops[1].age, 36);
            assert.equal(res.insertedCount, 2);
        });*/

        //如果没有传 cb 函数，则返回一个 Promise
        col.insertMany([
            {name: "La", age: 88},
            {name: "Er", age: 38}
        ]).then(res => {
            console.log(res);
            assert.equal(res.result.n, 2);
            assert.equal(res.result.ok, 1);
            assert.equal(res.ops[0].name, "La");
            assert.equal(res.ops[0].age, 88);
            assert.equal(res.ops[1].name, "Er");
            assert.equal(res.ops[1].age, 38);
            assert.equal(res.insertedCount, 2);
        });
    } catch (e) {
        console.log(e.stack);
    } finally {
        client.close();
    }
})();