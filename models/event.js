const mongoose=require('mongoose');
// const Schema = mongoose.Schema();

const eventSchema=mongoose.Schema({	
	title:String,
	desc:String,
	price:Number,
});

const eventCollection=mongoose.model('events',eventSchema);

const collections={
	eventCollection:eventCollection
}

module.exports=collections;
// {type:String, required:true}