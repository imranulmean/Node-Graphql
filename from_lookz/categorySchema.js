var mongoose=require('mongoose');

var parentCategorySchema=mongoose.Schema({
	name:String,
	typeSlug:String,
	pos:Number,
	subcats:[]
});
var subCategorySchema=mongoose.Schema({
	name:String,
	parent:{type:mongoose.Schema.Types.ObjectId, ref:'parentcategory'},
	typeSlug:String,
	pos:Number,
	arr:[]
});

var typeSchema=mongoose.Schema({
	name:String,
	parent:{type:mongoose.Schema.Types.ObjectId, ref:'subcategory'},
	typeSlug:String,
	others:{
		gender:{type:String, default:"null"}
	}
});

var ParentCategory=mongoose.model('parentcategory',parentCategorySchema);
var SubCategory=mongoose.model('subcategory',subCategorySchema);
var Type=mongoose.model('type',typeSchema);

var Models={
	ParentCategory: ParentCategory,
	SubCategory: SubCategory,
	Type: Type
};
module.exports=Models;
