var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var managerSchema = new Schema({
    email               : { type : String, unique: true , required :true },
    firstName           : { type : String, required: true},
    lastName            : { type : String, default : ''},
    mobileNo            : { type : String, /*unique: true , required : true */},
    password            : { type : String},
    employees            : [{
        employeeId : {type:mongoose.Schema.Types.ObjectId, ref: 'employee'}
    }],
    isActive         : {type: Boolean, default :true},
    isDeleted           : { type: Boolean, default: false},
    createdAt           : { type:Date, default: Date.now,select: false},
    updatedAt           : { type:Date, default: Date.now,select: false},
});

var manager = mongoose.model('manager', managerSchema);
module.exports = manager;
