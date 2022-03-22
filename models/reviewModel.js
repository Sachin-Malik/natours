const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
     review:{
         type:String,
         required:[true,'A review must have a review'],
     },
     rating:{
         type:Number,
         min:[1,'Rating must be at least 1'],
         max:[5,'Rating must be at most 5'],
         required:[true,'A review must have a rating'],
     },
     createdAt:{
         type:Date,
         required:true,
         default:Date.now(),
     },
     tour:{
         type:mongoose.Schema.ObjectId,
         ref='Tour', 
         required:[true,'A review must belong to a tour'],
     },
     user:{
         type:mongoose.Schema.ObjectId,
         ref:'User',
         required:[true,'A review must belong to a user'],
     },
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
}
); 

reviewSchema.pre('/^find/',function(next){
    this.populate({
        path:user, 
        select:'name photo'
    })
})

const Review =new mongoose.model('Review',reviewSchema);
module.exports=Review;