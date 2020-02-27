const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp= require('express-graphql');
const {buildSchema }=require('graphql');
const app= express();

const events=[];

app.use(bodyParser.json());


app.use('/graphql',graphqlHttp({
	schema:buildSchema(`

		type Event{
			_id:ID!
			title:String!
			desc:String!
			price:Float!
		}

		input EventInput{
			title:String!
			desc:String!
			price:Float!			
		}

		type RootQuery{
			events:[Event!]!
		}

		type RootMutation{
			createEvent(eventInput:EventInput):Event
		}

		schema{
			query:RootQuery
			mutation:RootMutation
		}
	`),
	rootValue:{
		events:()=>{
			return events;
		},

		createEvent:(args)=>{
			const event={
				_id:Math.random().toString(),
				title:args.eventInput.title,
				desc:args.eventInput.desc,
				price:+args.eventInput.price
			};
			// console.log(event);
			events.push(event);
			return event
		}
	},
	graphiql:true
}));

app.listen(3000);
console.log("Server Listening on PORT 3000");