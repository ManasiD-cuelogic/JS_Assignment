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
            lastName:document.getElementById("lname").value
        };

    var isFormValid = true;
    if(!user.firstName){
        isFormValid=false;
        document.getElementById("spn_fname").show();
    }
    if(!user.lastName){
        isFormValid=false;
        document.getElementById("spn_lname").show();
    }
    return isFormValid;
};

function OnProfilePicChange() {
    var input = document.getElementById("profileimg");
    var imagereader = new FileReader();
    imagereader.readAsDataURL(input.files[0]);
    imagereader.onloadend = function(event) {
        var profileImage = document.getElementById("profileimg");
        var displayImg = document.getElementById("imgProfile");
        displayImg.src = URL.createObjectURL(input.files[0]);
        profileImage.src = event.target.result;
       
    }
    
}