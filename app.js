const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp= require('express-graphql');
const {buildSchema }=require('graphql');
const mongoose=require('mongoose');
const EventsList=require('./models/event').eventCollection;

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
			return EventsList.find().then((result)=>{
				return result;
			}).catch(err=> console.log(err));
		},

		createEvent:(args)=>{

			const event=new EventsList();

				event.title=args.eventInput.title;
				event.desc=args.eventInput.desc;
				event.price=+args.eventInput.price;

				return event.save().then((result)=>{
					// return ({...result._doc});
					return result;
				}).catch(err=>console.log(err));
		}
	},
	graphiql:true
}));

mongoose.connect('mongodb+srv://graphqlAdmin:graphqlAdmin007@cluster0-zu9q5.mongodb.net/graphqldb?retryWrites=true&w=majority')
.then(()=>{
	app.listen(3000);	
})
.catch(err=>console.log(err));

console.log("Server Listening on PORT 3000");
//mongoose mongo  connection String : mongodb+srv://graphqlAdmin:graphqlAdmin007@cluster0-zu9q5.mongodb.net/graphqldb?retryWrites=true&w=majority