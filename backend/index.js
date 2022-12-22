const express = require("express");
var { graphqlHTTP } = require('express-graphql');
const schema = require("./schema");
const app = express();

const db = require("./models");
db.mongoose
     .connect(db.url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
     })
     .then(() => {
          console.log("Connected to the database!");
     })
     .catch((err) => {
          console.log("Cannot connect to the database!", err);
     });

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.get("/", (req, res) => {
     res.send("Hello world!");
});

app.listen(4000, () => {
     console.log("listening on port 4000");
});
