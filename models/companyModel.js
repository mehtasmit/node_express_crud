var sql= require('../db');

var companyModel={

}
companyModel.getAllCompany=function(result){
    sql.query("SELECT * FROM company",function(err,res){
        if(err) {
            return result(err,null);
        }
        else{
         return result(null,res);
        }
    });
}
companyModel.insertCompany=function(newCompany,result)
{
    sql.query("INSERT INTO company SET ?",newCompany,function(err,res){
        if(err){
            return result(err,null);
        }else{
            return result(null,res);
        }
    });
}
companyModel.findCompanyById=function(companyId,result){
    sql.query("SELECT * FROM company WHERE id ="+companyId,function(err,rows){
        if(err)
            throw err;
      
        if (rows.length <= 0) {
            return result(err);
        }
        else { 
            return result(rows);
        }   
    })
}

companyModel.updateCompany=function(companyId,company,result){
    sql.query("UPDATE company SET  ? WHERE id="+companyId,company,function(err,rows){
        if(err)
            result(err); 
       
        return result(rows);

    });
}
module.exports=companyModel;