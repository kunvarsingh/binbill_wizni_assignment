var employee = require('../models/employee');


var addEmployee = (req, res)=>{
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
    		project : [{projectId : result.projectId}]
    	}

        employee.create(obj,(err, data)=>{
			console.log('created',data);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!."});
                res.write(result); 		
			}
			if(!data){
				var result = JSON.stringify({status:400, message:"Unable to save Employee!."});
                res.write(result); 		
			}
			if(data){
				var result = JSON.stringify({status:200, message:"Employee Add successfully!."});
                res.write(result); 
			}
		})    
    });	
}


var getEmployeeById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        employee.findOne({_id : body.id,isDeleted : false,isActive : true},{})
        .populate("project.projectId")
        .sort({createdAt : -1})
        .exec((err, found)=>{
			console.log('data',found);
			if(!found){
				var result = JSON.stringify({status:400, message:"No Employee Get successfully!."});
                res.write(result); 		
			}
			if(found){
				var result = JSON.stringify({status:200, message:"Employee Get successfully!.",data :found});
                res.write(result); 		
			}
		})    
    	// var result = JSON.stringify({status:200, message:"Employee Get successfully!."});
        // res.write(result); 

    });	
}


var getAllEmployeeById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        employee.find({isDeleted : false,isActive : true},{})
        .populate("project.projectId")
        .sort({createdAt : -1})
        .exec((err, found)=>{
			console.log('data',found);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!."});
                res.write(result); 		
			}
			if(!found){
				var result = JSON.stringify({status:400, message:"No Employee Get successfully!."});
                res.write(result); 		
			}
			if(found.length>0){
				var result = JSON.stringify({status:200, message:"All Employee Get successfully!.",data :found});
                res.write(result); 		
			}
		})    
    });	
}


var deleteEmployeeById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        employee.updateOne({_id : body.id,isActive : true},{$set : {isDelete : true}},(err, found)=>{
			console.log('data',found);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!."});
                res.write(result); 		
			}
			if(!found){
				var result = JSON.stringify({status:400, message:"Employee Not deleted!."});
                res.write(result); 		
			}
			if(found){
				var result = JSON.stringify({status:200, message:"Employee deleted successfully!."});
                res.write(result); 		
			}
		})    
    });	
}


var updateEmployeeById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
    	var getParams = JSON.parse(body);
        employee.updateOne({_id : body.id,isActive : true},{$set : {firstName : getParams.firstName,lastName : getParams.getParams,mobileNo : getParams.mobileNo}},(err, found)=>{
			console.log('data',found);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!."});
                res.write(result); 		
			}
			if(!found){
				var result = JSON.stringify({status:400, message:"Employee Not updated!."});
                res.write(result); 		
			}
			if(found){
				var result = JSON.stringify({status:200, message:"Employee updated successfully!."});
                res.write(result); 		
			}
		})    
    });	
}

exports.addEmployee       = addEmployee;
exports.getEmployeeById   = getEmployeeById;
exports.getAllEmployeeById = getAllEmployeeById;
exports.deleteEmployeeById = deleteEmployeeById;
exports.updateEmployeeById  = updateEmployeeById