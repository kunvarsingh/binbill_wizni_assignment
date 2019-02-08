var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name           : { type : String, required: true},
    description            : { type : String, default : ''},
    employees           : [{
    	employeeId : {type:mongoose.Schema.Types.ObjectId, ref: 'employee'}
    }],
    manager             : {type:mongoose.Schema.Types.ObjectId, ref: 'manager'},
    isActive         : {type: Boolean, default :true},
    isDeleted           : { type: Boolean, default: false},
    startDate    : { type : Date,default: Date.now},
    endDate    : { type : Date,default:+new Date() + 30*24*60*60*1000},
    createdAt           : { type:Date, default: Date.now,select: false},
    updatedAt           : { type:Date, default: Date.now,select: false},
});

var project = mongoose.model('project', projectSchema);
module.exports = project;
