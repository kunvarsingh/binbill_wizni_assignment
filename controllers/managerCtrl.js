var Manager = require('../models/manager');


var addManager = (req, res)=>{
	// console.log('req.body',req.body);
	// var firstName = 'hello';
	// var email = "singh@yopmail.com";
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
    	var result = JSON.parse(body);
    	var obj = {
    		firstName : result.firstName,
    		lastName : result.lastName,
    		email : result.email,
    		mobileNo :result.mobileNo,
    		employees : [{employeeId : result.employees}]
    	}
    	console.log('created',obj);
        Manager.create(obj,(err, data)=>{
			console.log('created',data);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!.",err:err});
                res.write(result); 		
			}
			if(!data){
				var result = JSON.stringify({status:400, message:"Unable to save Manager!."});
                res.write(result); 		
			}
			if(data){
				var result = JSON.stringify({status:200, message:"Manager Add successfully!."});
                res.write(result); 
			}
		})    
    });	
}


var getManagerById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        Manager.findOne({_id : body.id,isDeleted : false,isActive : true},{})
        .populate("employees.employeeId")
        .sort({createdAt : -1})
        .exec((err, found)=>{
			console.log('data',found);
			if(!found){
				var result = JSON.stringify({status:400, message:"No Manager Get successfully!."});
                res.write(result); 		
			}
			if(found){
				var result = JSON.stringify({status:200, message:"Manager Get successfully!.",data :found});
                res.write(result); 		
			}
		})    
    	// var result = JSON.stringify({status:200, message:"Manager Get successfully!."});
        // res.write(result); 

    });	
}


var getAllManagerById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        Manager.find({isDeleted : false,isActive : true},{})
        .populate("employees.employeeId")
        .sort({createdAt : -1})
        .exec((err, found)=>{
			console.log('data',found);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!."});
                res.write(result); 		
			}
			if(!found){
				var result = JSON.stringify({status:400, message:"No Manager Get successfully!."});
                res.write(result); 		
			}
			if(found.length>0){
				var result = JSON.stringify({status:200, message:"All Manager Get successfully!.",data :found});
                res.write(result); 		
			}
		})    
    });	
}


var deleteManagerById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        Manager.updateOne({_id : body.id,isActive : true},{$set : {isDelete : true}},(err, found)=>{
			console.log('data',found);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!."});
                res.write(result); 		
			}
			if(!found){
				var result = JSON.stringify({status:400, message:"Manager Not deleted!."});
                res.write(result); 		
			}
			if(found){
				var result = JSON.stringify({status:200, message:"Manager deleted successfully!."});
                res.write(result); 		
			}
		})    
    });	
}


var updateManagerById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
    	var getParams = JSON.parse(body);
        Manager.updateOne({_id : body.id,isActive : true},{$set : {firstName : getParams.firstName,lastName : getParams.getParams,mobileNo : getParams.mobileNo}},(err, found)=>{
			console.log('data',found);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!."});
                res.write(result); 		
			}
			if(!found){
				var result = JSON.stringify({status:400, message:"Manager Not updated!."});
                res.write(result); 		
			}
			if(found){
				var result = JSON.stringify({status:200, message:"Manager updated successfully!."});
                res.write(result); 		
			}
		})    
    });	
}

exports.addManager       = addManager;
exports.getManagerById   = getManagerById;
exports.getAllManagerById = getAllManagerById;
exports.deleteManagerById = deleteManagerById;
exports.updateManagerById  = updateManagerById