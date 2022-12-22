const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList ,GraphQLNonNull} = graphql;
const db = require("../models");
const Author = db.Author;
const Book = db.Book;

const BookType = new GraphQLObjectType({
     name: "Book",
     fields: () => ({
          id: { type: GraphQLString },
          name: { type: GraphQLString },
          genre: { type: GraphQLString },
          authorID:{type:GraphQLString},
          author: {
               type: AuthorType,
               resolve(parent, args) {
                    return Author.findById(parent.authorID);
               },
          },
     }),
});

const AuthorType = new GraphQLObjectType({
     name: "Author",
     fields: () => ({
          id: { type: GraphQLString },
          name: { type: GraphQLString },
          age: { type: GraphQLString },
          bookList: {
               type: new GraphQLList(BookType),
               resolve(parent, args) {
                    return Book.find({authorID:parent.id} );
               },
          },
     }),
});

const RootType = new GraphQLObjectType({
     name: "RootGraphQLType",
     fields: {
          book: {
               type: BookType,
               args: { id: { type: GraphQLString } },
               resolve(parent, args) {
                    return Book.findById( args.id);
               },
          },
          author: {
               type: AuthorType,
               args: { id: { type: GraphQLString } },
               resolve(parent, args) {
                    return Author.findById(args.id);
               },
          },
          books: {
               type: new GraphQLList(BookType),
               resolve(parent, args) {
                    return Book.find({});
               },
          },
          authors: {
               type: new GraphQLList(AuthorType),
               resolve(parent, args) {
                    return Author.find({});
               },
          },
     },
});

const Mutation = new GraphQLObjectType({ 
     name:'mutation', 
     fields:{
          addAuthor:{
               type:AuthorType,
               args:{
                    name:{type: new GraphQLNonNull(GraphQLString) },
                    age:{type:new GraphQLNonNull(GraphQLInt)}
               },
               resolve(parent, args){
                   let author = new Author({
                       name: args.name,
                       age: args.age
                   });
                   return author.save();
               }
          },
          addBook: {
               type: BookType,
               args: {
                   name: { type: new GraphQLNonNull(GraphQLString) },
                   genre: { type: new GraphQLNonNull(GraphQLString) },
                   authorID: { type: new GraphQLNonNull(GraphQLString) }
               },
               resolve(parent, args){
                   let book = new Book({
                       name: args.name,
                       genre: args.genre,
                       authorID: args.authorID
                   });
                   return book.save();
               }
           }
     }
})

module.exports = new GraphQLSchema({
      query: RootType,
      mutation:Mutation
      });
