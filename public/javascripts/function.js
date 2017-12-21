



document.getElementById("myBtn").addEventListener("click", function(){
    document.getElementById("result").innerHTML = "Hello World";
   // calculation();
    calculationPOST();

});


function calculation(){
    var weight=document.getElementById("weight").value;
    var cellsize=document.getElementById("cellsize").value;
    var controlpoint=document.getElementById("controlpoint").value;
    var returnType="default";
    $.ajax({
        url: "/IDW/"+controlpoint+"/"+weight+"/"+cellsize+"/"+returnType,
        async: false,
    }).done(function (data) {
        var JSONstring=JSON.parse(data)
        document.getElementById("result").innerHTML=data;
      
        
        })
}

function calculationPOST(){
    var weight=document.getElementById("weight").value;
    var cellsize=document.getElementById("cellsize").value;
    var controlpoint=document.getElementById("controlpoint").value;
    var returnType="geoJSON";
    //,"returnType":returnType
    var dataArray=[];
    var object={"weight":weight,"cellsize":cellsize,"returnType":returnType,"controlpoints":controlpoint}
    dataArray.push(object);
    $.ajax({
        type: 'POST',
        async: false,
        url: '/IDW/calculate',
        data: JSON.stringify(dataArray),
        contentType: 'application/json',
      }).done(function (data) {
        var JSONstring=JSON.parse(data)
        document.getElementById("result").innerHTML=data;
      
        
        });
}