import pymongo

#from pymongo import MongoClient
#client = MongoClient("127.0.0.1", 27017) ##这两种方式都可以获取client

client = pymongo.MongoClient("127.0.0.1", 27017)
db = client.mydb
col = db.user
cursor = col.find()

import pprint
for user in cursor:
    pprint.pprint(user)
#    print(user)