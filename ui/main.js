//counter code
var counter=0;
var button=document.getElementById("counter");
button.onclick=function(){
    //Make a request to the counter endpoint
    
    //Get the variable and store it
    
    //Render the variable in the correct span
    counter=counter+1;
    var span=document.getElementById('count');
    span.innerHTML=counter;
};