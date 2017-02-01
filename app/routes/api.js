var apiRoutes=function(app)
{
    app.get('/api/bars',function(req,res){
            res.send('this will get lis of bars');
    });    
}

module.exports=apiRoutes;