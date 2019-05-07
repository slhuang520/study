const MongodbClient = require("mongodb").MongoClient,
    assert = require("assert");
// save deprecated
(async function () {
    const url = "mongodb://127.0.0.1:27017",
        dbName = "mydb",
        client = new MongodbClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);

        let col = await db.collection("user");
        col.save({name: "Kin", age: 40}, function (err, res) {
            console.log(res.ops); //添加的记录
            console.log(res.result); //执行的结果集
            assert.equal(null, err);
            assert.equal(1, res.result.n);
            assert.equal(1, res.result.ok);
            assert.equal("Kin", res.ops[0].name);
            assert.equal(40, res.ops[0].age);
        });

    } catch (e) {
        console.log(e.stack);
    } finally {
        client.close();
    }
})();