db.auth("admin", "123")

//db = connect("localhost:27017/partiks_db");

db = db.getSiblingDB("partiks_db")

//db.auth("appuser", "456")

db.createUser({
  user: "test-user",
  pwd: "456",
  roles: [
    { role: "readWrite",db: "partiks_db" },
    {  role: "clusterAdmin", db: "admin" },
    { role: "readAnyDatabase", db: "admin" } 
  ]
});

db.auth("test-user", "456");

db.createCollection("users");

db.users.insertMany([
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
