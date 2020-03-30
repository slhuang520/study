const  MongodbClient = require("mongodb").MongoClient;

(async () => {
    const url = "mongodb://127.0.0.1:27017",
        dbName = "mydb",
        client = new MongodbClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);

        const col = await db.collection("user");
        // const cursor = col.find();

        const  a = col.aggregate({
            $limit: 3
        });

        // db.user.aggregate({$group:{_id: "$name",count: {$sum: 1}, avg:{$avg:"$age"}}});

        // console.log(a);
        a.forEach(function (user) {
            console.log(user);
        })

    } catch (e) {
        console.log(e)
    } finally {
        client.close();
    }
})();