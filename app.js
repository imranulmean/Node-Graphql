const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp= require('express-graphql');
const {buildSchema }=require('graphql');
const Schema=require('./Schema/Schema');
const Resolver=require('./Resolver/Resolver');
const cors = require('cors')

const mongoose=require('mongoose');
const EventsList=require('./models/event').eventCollection;

const app= express();

const events=[];

app.use(cors());
app.use(bodyParser.json());


app.use('/graphql',graphqlHttp({
	schema:Schema,
	rootValue:Resolver,
	graphiql:true
}));

// mongoose.connect('mongodb+srv://graphqlAdmin:graphqlAdmin007@cluster0-zu9q5.mongodb.net/graphqldb?retryWrites=true&w=majority')
mongoose.connect('mongodb://localhost:27017/graphqldb')
.then(()=>{
	app.listen(3000);	
})
.catch(err=>console.log(err));

console.log("Server Listening on PORT 3000");
//mongoose mongo  connection String : mongodb+srv://graphqlAdmin:graphqlAdmin007@cluster0-zu9q5.mongodb.net/graphqldb?retryWrites=true&w=majority