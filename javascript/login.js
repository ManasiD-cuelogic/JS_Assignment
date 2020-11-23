(function(){
    if (sessionStorage.getItem("loggedinuser") != null) {
        RedirectToToDoListPage();
      }
})();

window.addEventListener("DOMContentLoaded",function(){
    document.getElementById("loginbutton").addEventListener("click",LoginUser);
});

function LoginUser(e){
    e.preventDefault();
    //document.getElementById("spn_loginerr").style.display="none";
    var logindetails={
        email:document.getElementById("mailid").value,
        password:document.getElementById("pwd").value
    };
    if(ValidateUserLogin(logindetails)){
        sessionStorage.setItem('loggedinuser',JSON.stringify(GetLoggedInUser(logindetails)));
        RedirectToToDoListPage();
    }
    
};

function ValidateUserLogin(logindetails){
    var userList=JSON.parse(localStorage.getItem('userlist'));
    //console.log(logindetails.email);
    //console.log(logindetails.password);
    var isUserExist=false;
    if(logindetails.email=="" && logindetails.password==""){
        document.getElementById("passmail").innerHTML="Enter Email & Password";
        isUserExist=false;
    }
    if(logindetails.email==""){
        document.getElementById("mailerr").innerHTML="Please Enter Email";
        isUserExist=false;
    }
    else if(logindetails.password==""){
        document.getElementById("passerr").innerHTML="Please Enter Password";
        isUserExist=false;
    }
    else if(userList == null){
        document.getElementById("loginerr").innerHTML="Please Register First";
    }
    else{
        console.log(userList);
    for(var i=0;i<userList.length;i++){
        console.log(userList[i].email);
        if(userList[i].email===logindetails.email && userList[i].password===logindetails.password){
            isUserExist=true;
            break;
        }
        else if(userList[i].email!==logindetails.email){
            // document.getElementById("loginerr").innerHTML="Invalid Email";
            isUserExist=false;
            
        }
        else if(userList[i].password!==logindetails.password){
            // document.getElementById("loginerr").innerHTML="Password Invalid";
            isUserExist=false;
            
        }
        
    }
    if(!isUserExist)
    {
        document.getElementById("loginerr").innerHTML="Username/Password Invalid";

    }
}
    return isUserExist;
}

function GetLoggedInUser(logindetails){
    var user;
    var userList=JSON.parse(localStorage.getItem('userlist'));
    for(var i=0;i<userList.length;i++){
        if(userList[i].email===logindetails.email && userList[i].password===logindetails.password){
            user=userList[i];
            break;
        }
    }
    return user;
}
function removeError()
{
  document.getElementById("mailerr").innerText ="";
  document.getElementById("passerr").innerText ="";
  document.getElementById("passmail").innerText ="";
  document.getElementById("loginerr").innerText ="";
}
function RedirectToToDoListPage(){
    window.location="dashboard.html";
}