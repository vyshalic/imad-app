//counter code
var counter=0;
var button=document.getElementById("counter");
button.onclick=function(){
    //Make a request object
    var request= new XMLHttpRequest();
    //Get the variable and store it
    request.onreadystatechange=function(){
    if(request.readyState===XMLHttpRequest.DONE){
        //take some action
            if(request.status===200){
                var counter=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=counter;
            }
    }
};
//Make the actual request
request.open('GET',)
  
};