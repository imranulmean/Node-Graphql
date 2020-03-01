const EventsList=require('../models/event').eventCollection;
module.exports=
{
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
}