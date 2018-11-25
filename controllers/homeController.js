var homeController=function(){}

homeController.index=function(req,res){
    req.flash('success', 'Welcome to HOm')
    res.render('home/index',{title:'Home page'});
}

module.exports=homeController