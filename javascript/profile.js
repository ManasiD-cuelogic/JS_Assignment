window.addEventListener("DOMContentLoaded",function(){
    var loggedInUser=JSON.parse(sessionStorage.getItem("loggedinuser"));
    if(loggedInUser){
        document.getElementById("fname").value=loggedInUser.firstName;
        document.getElementById("lname").value=loggedInUser.lastName;
        document.getElementById("mailid").value=loggedInUser.email;
        document.getElementById("radio_"+loggedInUser.gender).checked =true;
        document.getElementById("add").value=loggedInUser.address;
        document.getElementById("imgProfile").src=loggedInUser.profilePic;
        document.getElementById("profileimg").src=loggedInUser.profilePic;
    }
    else{
        window.location="login.html";
    }

    document.getElementById("updateProfile").addEventListener("click",UpdateUserProfile)
});
function UpdateUserProfile(e){
    e.preventDefault();
    var user={
            firstName:document.getElementById("fname").value,
            lastName:document.getElementById("lname").value,
            email:document.getElementById("mailid").value.toLowerCase(),
            gender:document.querySelector('input[name="gender"]:checked').value,
            address:document.getElementById("add").value,
            profilePic:document.getElementById("profileimg").src,
            todos:[]
    };
    if(ValidateUpdateProfileForm()){
        var userList=JSON.parse(localStorage.getItem('userlist'));

        for(var i=0;i<userList.length;i++){
            if(userList[i].email===user.email){
                userList[i].firstName=user.firstName;
                userList[i].lastName=user.lastName;
                userList[i].address=user.address;
                userList[i].gender=user.gender;
                userList[i].profilePic=user.profilePic;
                localStorage.setItem("userlist",JSON.stringify(userList));
                sessionStorage.setItem("loggedinuser",JSON.stringify(userList[i]));
                break;
            }
        }
        }

        else{
            return false;
        }
        alert("User profile updated succesfully");
        window.location="profile.html";
        
    };

    function ValidateUpdateProfileForm(){
        var user={
            firstName:document.getElementById("fname").value,
            lastName:document.getElementById("lname").value,
            address:document.getElementById("add").value,
            profilePic:document.getElementById("profileimg").src,
        };

    var isFormValid = true;
    if(!user.firstName){
        isFormValid=false;
        document.getElementById("fname_err").innerHTML="Please enter your first name";
    }
    if(!user.lastName){
        isFormValid=false;
        document.getElementById("lname_err").innerHTML="Please enter your last name";
    }
    if(!user.address){
        isFormValid=false;
        document.getElementById("add_err").innerHTML="Please enter your address";
    }
    var imgFilter= /.(gif|jpe|jpeg|JPG|JPEG|PNG|png|webp|bmp)$/i;
    if(!imgFilter.test(document.getElementById("profileimg").value)){
        isFormValid=false;
        document.getElementById("img_err").innerHTML="only images can accepted";
    }
    return isFormValid;
};

function OnProfilePicChange() {
    var input = document.getElementById("profileimg");
    console.log(input.value);
    /*var imgFilter= /.(gif|jpe|jpeg|JPG|JPEG|PNG|png|webp|bmp)$/i;
    if(!imgFilter.test(input.value)){
        document.getElementById("img_err").innerHTML="only images can accepted";
    }*/
    //else{
    var imagereader = new FileReader();
    imagereader.readAsDataURL(input.files[0]);
    imagereader.onloadend = function(event) {
        var profileImage = document.getElementById("profileimg");
        var displayImg = document.getElementById("imgProfile");
        displayImg.src = URL.createObjectURL(input.files[0]);
        profileImage.src = event.target.result;
       
    }
}
//}
function removeError()
{
  document.getElementById("fname_err").innerText ="";
  document.getElementById("lname_err").innerText ="";
  document.getElementById("add_err").innerText ="";
  document.getElementById("img_err").innerText ="";
}