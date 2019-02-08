var Project = require('../models/project');


var addProject = (req, res)=>{
	// console.log('req.body',req.body);
	// var firstName = 'hello';
	// var email = "singh@yopmail.com";
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
    	console.log('bodybody',body)
    	var result = JSON.parse(body);
    	var obj = {
    		name : result.name,
    		description : result.description,
    		manager : result.manager,
    		employees : [{employeeId : result.employees}]
    	}
        Project.create(obj,(err, data)=>{
			console.log('created',data);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!.",err:err});
                res.write(result); 		
			}
			if(!data){
				var result = JSON.stringify({status:400, message:"Unable to save Project!."});
                res.write(result); 		
			}
			if(data){
				var result = JSON.stringify({status:200, message:"Project Add successfully!."});
                res.write(result); 
			}
		})    
    });	
}


var getProjectById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        Project.findOne({_id : body.id,isDeleted : false,isActive : true},{})
        .populate("employees.employeeId")
        .sort({createdAt : -1}).exec((err, found)=>{
			console.log('data',found);
			if(!found){
				var result = JSON.stringify({status:400, message:"No Project Get successfully!."});
                res.write(result); 		
			}
			if(found){
				var result = JSON.stringify({status:200, message:"Project Get successfully!.",data :found});
                res.write(result); 		
			}
		})    
    	// var result = JSON.stringify({status:200, message:"Project Get successfully!."});
        // res.write(result); 

    });	
}


var getAllProjectById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        Project.find({isDeleted : false,isActive : true},{})
        .populate("employees.employeeId")
        .sort({createdAt : -1})
        .exec((err, found)=>{
			console.log('data',found);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!."});
                res.write(result); 		
			}
			if(!found){
				var result = JSON.stringify({status:400, message:"No Project Get successfully!."});
                res.write(result); 		
			}
			if(found.length>0){
				var result = JSON.stringify({status:200, message:"All Project Get successfully!.",data :found});
                res.write(result); 		
			}
		})    
    });	
}


var deleteProjectById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        Project.updateOne({_id : body.id,isActive : true},{$set : {isDelete : true}},(err, found)=>{
			console.log('data',found);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!."});
                res.write(result); 		
			}
			if(!found){
				var result = JSON.stringify({status:400, message:"Project Not deleted!."});
                res.write(result); 		
			}
			if(found){
				var result = JSON.stringify({status:200, message:"Project deleted successfully!."});
                res.write(result); 		
			}
		})    
    });	
}


var updateProjectById = (req, res,params)=>{
	console.log('req.body',params);
	var body = '';
	req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
    	var getParams = JSON.parse(body);
        Project.updateOne({_id : body.id,isActive : true},{$set : {firstName : getParams.firstName,lastName : getParams.getParams,mobileNo : getParams.mobileNo}},(err, found)=>{
			console.log('data',found);
			if(err){
				var result = JSON.stringify({status:400, message:"Something went wrong!."});
                res.write(result); 		
			}
			if(!found){
				var result = JSON.stringify({status:400, message:"Project Not updated!."});
                res.write(result); 		
			}
			if(found){
				var result = JSON.stringify({status:200, message:"Project updated successfully!."});
                res.write(result); 		
			}
		})    
    });	
}

exports.addProject       = addProject;
exports.getProjectById   = getProjectById;
exports.getAllProjectById = getAllProjectById;
exports.deleteProjectById = deleteProjectById;
exports.updateProjectById  = updateProjectById