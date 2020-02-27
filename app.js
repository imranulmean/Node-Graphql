const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp= require('express-graphql');
const {buildSchema }=require('graphql');
const app= express();

app.use(bodyParser.json());

app.use('/graphql',graphqlHttp({
	schema:buildSchema(`

		type RootQuery{
			events:[String!]!
		}

		type RootMutation{
			createEvent(name:String):String
		}

		schema{
			query:RootQuery
			mutation:RootMutation
		}
	`),
	rootValue:{
		events:()=>{
			return ['Marriage','Meeting','Cooking']
		},

		createEvent:(args)=>{
			return JSON.stringify(args);
		}
	},
	graphiql:true
}));

app.listen(3000);
console.log("Server Listening on PORT 3000");