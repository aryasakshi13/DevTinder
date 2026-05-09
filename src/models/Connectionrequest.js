
const mongoose = require('mongoose');
const ConnectionRequestSchema = new mongoose.Schema({
     
    fromUserId :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId :{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
    },
    
    status: {
        type : String,
        enum: {
        values: ['interested','ignored', 'accepted', 'rejected'],
        message: '{VALUE} is not supported'
       }
    }
 
},{timestamps: true}) ;


ConnectionRequestSchema.pre('save', async function(next){
    const connectionRequest = this ;

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        return new Error("Can't send this request to yourself!");
    }
    
});

const ConnectionRequestModel = mongoose.models.ConnectionRequest || mongoose.model("ConnectionRequest", ConnectionRequestSchema);

module.exports = ConnectionRequestModel;