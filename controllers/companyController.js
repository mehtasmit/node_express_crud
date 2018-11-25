var companyModel= require('../models/companyModel');
var companyController=function(){}

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
                req.flash('error','There was error in inserting data');
        }else{
            req.flash('success','Company added succesfully');
        }
        res.redirect('/company');
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
companyController.edit=function(req,res){
    var companyId=req.params.id;
    companyModel.findCompanyById(companyId,function(result){
        if(result==null){
            req.flash('error','Sorry the company doesnot exists!!');
            res.redirect('/company');
        }else{
          res.render('company/edit',{title:'Edit Company',company:result});
        }
    })
}

companyController.update=function(req,res){
    var companyId=req.params.id;
    req.assert('name', 'Name is required').notEmpty(); 
    req.assert('location', 'Location is required').notEmpty()      
    var errors = req.validationErrors();
    if( !errors ) {
        var company={
            name:req.sanitize('name').escape().trim(),
            location:req.sanitize('location').escape().trim(),
        }
        companyModel.updateCompany(companyId,company,function(result){
                if(result.affectedRows==1){
                    req.flash('success', 'Company Information update successfully.');
                    res.redirect('/company');
                }else{
                    req.flash('error', 'There was error in updating company.');
                    res.redirect('/company/edit/'+companyId);  
                }
        });
    }else{
        var err_msg="";
        errors.forEach(function(err){
            err_msg+=err.msg+"<br/>";
        })
         req.flash('error', err_msg);
         res.redirect('/company/edit/'+companyId);
    }
}


module.exports=companyController;