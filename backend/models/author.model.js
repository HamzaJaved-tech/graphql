const mongoose = require("mongoose");
const { Schema } = mongoose;

module.exports = (mongoose) => {
     var schema = mongoose.Schema(
          {
               name:String,
               age:Number
          }
     );


     schema.method("toJSON", function () {
          const { __v, _id, ...object } = this.toObject();
          object.id = _id;
          return object;
     });

     const Author = mongoose.model("Author", schema);
     return Author;
};
