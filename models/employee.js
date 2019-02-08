var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    email               : { type : String, unique: true , required :true },
    firstName           : { type : String, required: true},
    lastName            : { type : String, default : ''},
    mobileNo            : { type : String, /*unique: true , required : true */},
    password            : { type : String},
    manager             : {type:mongoose.Schema.Types.ObjectId, ref: 'manager'},
    project             : [{
        projectId : {type:mongoose.Schema.Types.ObjectId, ref: 'project'}
    }],
    isActive         : {type: Boolean, default :false},
    isDeleted           : { type: Boolean, default: true},
    createdAt           : { type:Date, default: Date.now,select: false},
    updatedAt           : { type:Date, default: Date.now,select: false},
});

var employee = mongoose.model('employee', employeeSchema);
module.exports = employee;
