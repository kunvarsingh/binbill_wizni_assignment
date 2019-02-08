/*Written By : KUNVAR SINGH
  Date : 17th, Sep,2018	
*/

var http = require('http');
var router = require('routes')();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// routes requires here
var employeeCtrl = require('./controllers/employeeCtrl');
var ProjectCtrl = require('./controllers/projectCtrl');
var ManagerCtrl = require('./controllers/managerCtrl');
// Server Creation -----------------------------

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  var m = router.match(req.url);
  if (m) m.fn(req, res,m.params);
  else console.log('Do nothing');

}).listen(3000, function(){
 console.log("server start at port 3000");
});



// DB Connection Start------------------------------------------------------
mongoose.connect('mongodb://localhost:27017/wizni',function (err, database) {
    if (err)console.log(err);
    console.log("****MongoDB Database connection ready****");
});
// DB Connection End------------------------------------------------------



// Routing HERE :
router.addRoute('/employee/addEmployee',employeeCtrl.addEmployee);
router.addRoute('/employee/getEmployeeById/:id',employeeCtrl.getEmployeeById);
router.addRoute('/employee/getAllEmployeeById',employeeCtrl.getAllEmployeeById);
router.addRoute('/employee/deleteEmployeeById/:id',employeeCtrl.deleteEmployeeById);
router.addRoute('/employee/updateEmployeeById',employeeCtrl.addEmployee);

router.addRoute('/Project/addProject',ProjectCtrl.addProject);
router.addRoute('/Project/getProjectById/:id',ProjectCtrl.getProjectById);
router.addRoute('/Project/getAllProjectById',ProjectCtrl.getAllProjectById);
router.addRoute('/Project/deleteProjectById/:id',ProjectCtrl.deleteProjectById);
router.addRoute('/Project/updateProjectById',ProjectCtrl.addProject);

router.addRoute('/Manager/addManager',ManagerCtrl.addManager);
router.addRoute('/Manager/getManagerById/:id',ManagerCtrl.getManagerById);
router.addRoute('/Manager/getAllManagerById',ManagerCtrl.getAllManagerById);
router.addRoute('/Manager/deleteManagerById/:id',ManagerCtrl.deleteManagerById);
router.addRoute('/Manager/updateManagerById',ManagerCtrl.addManager);
