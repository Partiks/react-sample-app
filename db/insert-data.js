db = db.getSiblingDB("partiks_db")

db.auth("test-user", "456");

db.createCollection("userdata");

db.userdata.insertMany([
  {
    _id: 44,
    name: "Mongo V1.44",
    says: "not backed up XD",
    status: "Mongolicious"
  },
  {   
    _id: 4,
    name: "Partiks",
    says: " Orchestration and automation are my JAM",
    status: "Ultra Cool"
  },
  {   
    _id: 69, 
    name: "Az",
    says: " I'm chilling",
    status: "^_^"
  },  
  {
    _id: 1,
    name: "Everyone",
    says: "Partiks Rockzz !",
      status: "=-O"
  },  
  {
    _id: 2,
    name: "Traditional Ops",
    says: "Way we do things is INEFFICIENT -_-",
      status: " :("
  }
]);
