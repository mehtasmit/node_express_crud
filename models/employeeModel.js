var sql= require('../db');

var employeeModel=function(){}

employeeModel.insertEmployee=function(newEmployee,result){
    sql.query("INSERT into employee SET  ?",newEmployee,function(err,res,field){
        if(err){
            return err;
        }else{
            return result(null,res);
        }
    });
   
}
employeeModel.getAllEmployees=function(result){
    sql.query("SELECT employee.*,company.name as employee_comp_name FROM `employee` LEFT JOIN company ON company.id=employee.company_id",function(err, rows, fields){
        if(err){
            throw err;
        }else{
            return result(null,rows);
        }
    });
}

module.exports=employeeModel;