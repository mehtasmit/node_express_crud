var employeeModel = require('../models/employeeModel');
var conpanyModel = require('../models/companyModel');
const dateFormat = require('dateformat');

var employeeController = function () {


}


employeeController.index = function (req, res, next) {
    employeeModel.getAllEmployees(function (err, employees) {
        if (err) {
            throw err;
        } else {
            res.render('employee/index', { title: 'Employee Listing', employees: employees });
        }
    });

}
employeeController.add = function (req, res, next) {
    conpanyModel.getAllCompany(function (err, companies) {
        res.render('employee/add', { title: 'Add Employee', companies: companies });
    });

}
employeeController.save = function (req, res, next) {
    req.assert('name', 'Name is required.').notEmpty();
    req.assert('email', 'Email is required.').notEmpty()
    req.assert('company', 'Company must be selected.').notEmpty();
    req.assert('date_of_birth', 'Date of birth must not be empty.').notEmpty();
    req.assert('joining_date', 'Joining Date must not be empty.').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        var newEmployee = {
            name: req.sanitize('name').escape().trim(),
            pic: 'no-user-pic.png',
            email: req.sanitize('email').escape().trim(),
            company_id: req.sanitize('company').escape().trim(),
            date_of_birth: dateFormat(req.sanitize('date_of_birth').trim(), 'yyyy-mm-dd'),
            joining_date: dateFormat(req.sanitize('joining_date').trim(), 'yyyy-mm-dd')
        }
        employeeModel.insertEmployee(newEmployee, function (err) {
            if (err) {
                req.flash('error', 'There was error in inserting data');
            } else {
                req.flash('success', 'Employee added succesfully');
            }
            res.redirect('/employee');
        });
    } else {
        var err_msg = "";
        errors.forEach(function (err) {
            err_msg += err.msg + "<br/>";
        })
        conpanyModel.getAllCompany(function (err, companies) {
            req.flash('error', err_msg);
            res.render('employee/add', { title: 'Add Employee', companies: companies });
        });
    }
}
employeeController.employeeDetail = function (req, res) {
    var employee_id = req.body.employee_id;
    var response={};
    employeeModel.getEmployeeById(employee_id, function (result) {
        if (result == null) {
            response.status=0;
            response.data={};
            response.message="No employee details found";
        } else {
            response.status=1;
            response.data=result;
            response.message="Employee found";
        }
        res.send(JSON.stringify(response));
    })
}
employeeController.edit=function(req,res){
    var employee_id=req.params.employee_id;
   employeeModel.getEmployeeById(employee_id,function(result){
    if(result==null){
        req.flash('error','Sorry the employee doesnot exists!!');
        res.redirect('/employee');
    }else{
        conpanyModel.getAllCompany(function(err,companies){
            res.render('employee/edit',{title: 'Edit Employee',companies:companies,employee:result[0]});
        });
    }
   });
}
module.exports = employeeController;