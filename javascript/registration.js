window.addEventListener("DOMContentLoaded",function(){
    document.getElementById("register").addEventListener("click",RegisterUser);
});

function RegisterUser(e){
    e.preventDefault();
    var userList=JSON.parse(localStorage.getItem("userlist"));
    if(!userList){
        userList=[];
    }
    
    if(ValidateRegisterForm()){
        var user={
            firstName:document.getElementById("fname").value,
            lastName:document.getElementById("lname").value,
            email:document.getElementById("mailid").value,
            password:document.getElementById("pwd").value,
            gender:document.querySelector('input[name="gender"]:checked').value,
            address:document.getElementById("add").value,
            profilePic:document.getElementById("profileimg").src,
            todos:[]
        };
        userList.push(user);
        localStorage.setItem('userlist',JSON.stringify(userList));
        alert("User registration done succesfully");
        window.location="login.html";
    }
    else{
        return false;
    }
    
};

function ValidateRegisterForm(){
    var user={
        firstName:document.getElementById("fname").value,
        lastName:document.getElementById("lname").value,
        email:document.getElementById("mailid").value,
        password:document.getElementById("pwd").value,
        confirmPassword:document.getElementById("cpwd").value,
        address:document.getElementById("add").value,
        profilePic:document.getElementById("profileimg").src,
    };
    var isFormValid = true;
    if(user.firstName==null || user.firstName==''){
        isFormValid=false;
        document.getElementById("fnameerr").innerHTML = "Please enter first name";
    }
    if(!user.lastName){
        isFormValid=false;
        document.getElementById("lnameerr").innerHTML = "Please enter last name";
    }
    if(!user.email){
        isFormValid=false;
        document.getElementById("emailerr").innerHTML = "Please enter your email";
    }
    else if(!isEmailValid(user.email)){
        isFormValid=false;
        document.getElementById("email_wrong").innerHTML = "Please enter valid email";
    }
    else if(isEmailExist(user.email)){
        isFormValid=false;
        document.getElementById("email_exist").innerHTML = "Email Id already registered in the system";
    }
    if(!user.password){
        isFormValid=false;
        document.getElementById("pwderr").innerHTML = "Please enter password";
    }
    if(!user.confirmPassword){
        isFormValid=false;
        document.getElementById("confirmpwderr").innerHTML = "Please enter confirm password";
    }
    if(user.password != user.confirmPassword){
        isFormValid=false;
        document.getElementById("confirmpwderr").innerHTML = "Password & Confirm Password should match";
    }
    if(!user.address){
        isFormValid=false;
        document.getElementById("add_err").innerHTML = "Please enter your address"
    }
    if(!isImageValid()){
        isFormValid=false;
        document.getElementById("imgerr").innerHTML = "Only Images Can Accepted";
    }
    return isFormValid;
};

function isEmailValid(email){
    var filter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return filter.test(email);
}

function isEmailExist(email){
    var isEmailExist=false;
    var userList=JSON.parse(localStorage.getItem('userlist'));
    if(userList){
        for(var i=0;i<userList.length;i++){
            if(userList[i].email===email){
                isEmailExist=true;
                break;
            }
        }
    }
    
    return isEmailExist;
}
function isImageValid(){
    var imgFilter= /.(gif|jpe|jpeg|JPG|JPEG|PNG|png|webp|bmp)$/i;
    return(imgFilter.test(document.getElementById("profileimg").value));
}
function getImageData() {
    var input = document.getElementById("profileimg");
    var imagereader = new FileReader();
    imagereader.readAsDataURL(input.files[0]);
    imagereader.onloadend = function(event) {
        var profileImage = document.getElementById("profileimg");
        profileImage.src = event.target.result;
       
    }
}
function removeError()
{
  document.getElementById("fnameerr").innerText ="";
  document.getElementById("lnameerr").innerText ="";
  document.getElementById("emailerr").innerText ="";
  document.getElementById("email_wrong").innerText ="";
  document.getElementById("email_exist").innerText ="";
  document.getElementById("pwderr").innerText ="";
  document.getElementById("confirmpwderr").innerText ="";
  document.getElementById("imgerr").innerHTML = "";
  document.getElementById("add_err").innerHTML = "";
}