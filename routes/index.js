var express = require('express');
var router = express.Router();
var idw=require('./idw')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


router.get('/IDW/:getPoints/:weight/:cellWidth/:returntype', function (req, res, next) {
  //getDateCountByStartEndDate
  var getPoints=req.params.getPoints;
  var weight=req.params.weight;
  var cellWidth=req.params.cellWidth;
  getPoints=JSON.parse(getPoints);

  var returnType="default";
var idwResult=idw.idw(getPoints,weight,cellWidth,returnType);
  //sql.getSearch(start_date,end_date,function(result){
    //console.log(result);
    //var stringRes = JSON.stringify(result);
    res.end(JSON.stringify(idwResult));
 // })

});

router.post('/IDW/calculate',function(req,res,next){
  var data=req.body[0];
  var getPoints=JSON.parse(data.controlpoints);
  var weight=data.weight;
  var cellWidth=data.cellsize;
  if (data.returnType!=undefined){
    if(data.returnType=="geoJSON"){
      var returnType=data.returnType;
      var idwResult=idw.idw(getPoints,weight,cellWidth,returnType);
      res.end(JSON.stringify(idwResult));
    }else{
      res.end("returnType is not allowed!")
    
    }
    
  }else{
    var returnType="default";
    var idwResult=idw.idw(getPoints,weight,cellWidth,returnType);
    res.end(JSON.stringify(idwResult));
  }
  
  } );
