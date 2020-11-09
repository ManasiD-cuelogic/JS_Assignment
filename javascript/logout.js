window.addEventListener("DOMContentLoaded",function(){
    document.getElementById("logoutButton").addEventListener("click",function(e){
       e.preventDefault();
       sessionStorage.removeItem('loggedinuser');
       window.location='login.html';
    });
})