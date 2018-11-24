var sql= require('../db');

var companyModel={

}
companyModel.getAllCompany=function(result){
    sql.query("SELECT * FROM company",function(err,res){
        if(err) {
          throw err;
        }
        else{
         return result(null,res);
        }
    });
}
companyModel.insertCompany=function(newCompany)
{
    sql.query("INSERT INTO company SET ?",newCompany,function(err){
        if(err) {
            throw err;
           //return false;
          }
          else{
            return true;
          }
    });
}

module.exports=companyModel;