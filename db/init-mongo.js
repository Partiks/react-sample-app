db.auth("admin", "123")

db = db.getSiblingDB("partiks_db")

db.createUser({
  user: "test-user",
  pwd: "456",
  roles: [
    { role: "dbOwner",db: "partiks_db" },
    {  role: "clusterAdmin", db: "admin" },
    { role: "readAnyDatabase", db: "admin" },
  ]
});
