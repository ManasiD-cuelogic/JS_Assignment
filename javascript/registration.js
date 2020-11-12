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
            email:document.getElementById("mailid").value.toLowerCase(),
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
    };
    var isFormValid = true;
    if(user.firstName==null || user.firstName==''){
        isFormValid=false;
        document.getElementById("spn_fname").style.display = "block";
    }
    if(!user.lastName){
        isFormValid=false;
        document.getElementById("spn_lname").style.display = "block";
    }
    if(!user.email){
        isFormValid=false;
        document.getElementById("spn_email").style.display = "block";
    }
    else if(!isEmailValid(user.email)){
        isFormValid=false;
        document.getElementById("spn_email_wrong").style.display = "block";
    }
    else if(isEmailExist(user.email)){
        isFormValid=false;
        document.getElementById("spn_email_exist").style.display = "block";
    }
    if(!user.password){
        isFormValid=false;
        document.getElementById("spn_pwd").style.display = "block";
    }
    if(!user.confirmPassword || user.password != user.confirmPassword){
        isFormValid=false;
        document.getElementById("spn_confirmpwd").style.display = "block";
    }
    return isFormValid;
};

function isEmailValid(email){
    var filter = /^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/;
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

function getImageData() {
    var input = document.getElementById("profileimg");
    var imagereader = new FileReader();
    imagereader.readAsDataURL(input.files[0]);
    imagereader.onloadend = function(event) {
        var profileImage = document.getElementById("profileimg");
        profileImage.src = event.target.result;
       
    }
    
}