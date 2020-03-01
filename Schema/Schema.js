const {buildSchema }=require('graphql');

module.exports=buildSchema(`
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
`)