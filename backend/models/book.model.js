const mongoose = require("mongoose");

const { Schema } = mongoose;

module.exports = (mongoose) => {
     var schema = mongoose.Schema(
          {
               name: String,
               genre: String,
               authorID:Schema.Types.ObjectId,
               
          }
     );

     schema.method("toJSON", function () {
          const { __v, _id, ...object } = this.toObject();
          object.id = _id;
          return object;
     });
     const Book = mongoose.model("Book", schema);
     return Book;
};
