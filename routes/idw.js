var idw = require("@turf/idw");
var fs=require("fs");
var turf=require("turf");
var proj4=require('proj4');


//var controlPoints=["[47.11285,7.222309,33]","[47.085272,7.20377,25]","[47.092285,7.156734,8]","[47.13294,7.220936,12]","[47.088311,7.128925,9]","[47.124765,7.234669,39]","[47.055107,7.07159,6]"];
//var z=[[47.11285,7.222309,33],[47.085272,7.20377,25],[47.092285,7.156734,8],[47.13294,7.220936,12],[47.088311,7.128925,9],[47.124765,7.234669,39],[47.055107,7.07159,6]];

function IDW(pointArray,weight,cellWidth,returnType){

var controlPoints=pointArray;
var weight=weight;
var cellWidth=cellWidth;
var returnType=returnType;

for (i=0;i<controlPoints.length;i++){
    controlPoints[i]="["+controlPoints[i].toString()+"]";
  
   }


var vertices=[];
for (i=0; i<controlPoints.length; i++){
    var point=turf.point(JSON.parse(controlPoints[i]));
    vertices.push(point);
}

var fc=turf.featureCollection(vertices);
for (var i = 0; i < fc.features.length; i++) {
    fc.features[i].properties.z = ~~(JSON.parse(pointArray[i])[2]);
  }
//idw(fc,"z", weight, cellWidth,'kilometers');
var result=idw(fc,"z", weight, cellWidth,'kilometers');
console.log(result);
//判斷資料output 格式 Z值為預設
if(returnType=="default"){
    data=[];
    for (i=0;i<result.features.length;i++){
        var zValue=new Number(result.features[i].properties.z)
       data.push(JSON.parse(zValue.toFixed(8)))
    }
    console.log(data);

    return data
    

}
else if (returnType=="geoJSON"){
    data=[];
    for (i=0;i<result.features.length;i++){
        var zValue=JSON.parse(new Number(result.features[i].properties.z).toFixed(8));
        result.features[i].properties.z=zValue;
        for(k=0;k<result.features[i].geometry.coordinates.length;k++){
            for(j=0;j<result.features[i].geometry.coordinates[k].length;j++){       
                result.features[i].geometry.coordinates[k][j][0]=JSON.parse(result.features[i].geometry.coordinates[k][j][0].toFixed(8))
                result.features[i].geometry.coordinates[k][j][1]=JSON.parse(result.features[i].geometry.coordinates[k][j][1].toFixed(8))
            }
    
           }

    }
    
    return result

}


}



exports.idw=IDW;