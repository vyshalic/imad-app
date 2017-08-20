console.log('Loaded!');
var element=document.getElementById("main-content");
element.innerHTML="new value";
var image=document.getElementById("madi");
marginLeft=0;
image.onclick=function(){
  function moveRight(){
      marginLeft=marginLeft + 10;
      image.style.marginLeft= marginLeft +'px';
  }
  var interval=setInterval(moveRight,100);
    
};