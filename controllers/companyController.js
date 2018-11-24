var companyModel= require('../models/companyModel');
var companyController={}

companyController.index=function(req,res,next){
    companyModel.getAllCompany(function(err,companies){
        if(err){
                throw err;
        }else{
            res.render('company/index',{title:'Company Listing',companies:companies});
        }
       
    });
}
companyController.add=function(req,res,next){
    res.render('company/add',{title:'Add Company'});
}
companyController.save=function(req,res){
    req.assert('name', 'Name is required').notEmpty(); 
    req.assert('location', 'Location is required').notEmpty()      
 
    var errors = req.validationErrors();
    if( !errors ) {
        var newTask={
            name:req.sanitize('name').escape().trim(),
            location:req.sanitize('location').escape().trim(),
        }
        companyModel.insertCompany(newTask,function(err){
            if(err){
                res.flash('error','There was error in inserting data');
        }else{
            res.flash('success','Data added succesfully');
        }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.render('company/add',{title:'Add Company'});
    }
}
module.exports=companyController;