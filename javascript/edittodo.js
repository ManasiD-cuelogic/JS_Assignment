window.addEventListener("DOMContentLoaded",function(){
    if (sessionStorage.getItem("loggedinuser") === null) {
        window.location='login.html';
      }
      const params = new URLSearchParams(window.location.search);
      var id=params.get("id");
      var users = JSON.parse(localStorage.getItem("userlist"));
      var loggedinuser=JSON.parse(sessionStorage.getItem("loggedinuser"));
      var todos=users.find( a => a.email == loggedinuser.email).todos;
      var editedtodo;
      for (var i=0;i<todos.length;i++)
      {
          if(todos[i].id==id)
          {
              editedtodo=todos[i];
              break;
          }
      }
    document.getElementById("inputId").value=editedtodo.id;
    document.getElementById("todoTitle").value=editedtodo.title;
    document.getElementById("todoStartDate").value=editedtodo.targetDate;
    document.getElementById("isPublic_"+editedtodo.isPublic).checked=true;
    if(editedtodo.reminderDate){
        document.getElementById("reminderYes").checked =true;
        document.getElementById("div_reminder").style.display="block";
        document.getElementById("reminderDate").value=editedtodo.reminderDate;
    }
    else{
        document.getElementById("reminderNo").checked =true;
        document.getElementById("div_reminder").style.display="none";
    }
     for(var i = 0; i < editedtodo.categories.length; i++)
     {
        document.getElementById("chk_"+editedtodo.categories[i]).checked =true;
     }
    var today = new Date().toISOString().split('T')[0];
    document.getElementById("todoStartDate").setAttribute('min', today);
    document.getElementById("reminderDate").setAttribute('min', today);

    document.getElementById("updateTodoButton").addEventListener("click",editTodo)
})


function editTodo(e){
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    var id=params.get("id");
    var users = JSON.parse(localStorage.getItem("userlist"));
    var loggedinuser=JSON.parse(sessionStorage.getItem("loggedinuser"));
    var todos=users.find( a => a.email == loggedinuser.email).todos;

    var isReminder=document.querySelector('input[name="reminder"]:checked').value
    var reminderDate;
    if(isReminder=='yes'){
        reminderDate=document.getElementById("reminderDate").value;
    }
    else{
        reminderDate='';
    }

    var selected_Categories=document.querySelectorAll('input[name="todoCategory"]:checked');
    var catVals = [];
     for(var i = 0; i < selected_Categories.length; i++)
     {
        catVals.push(selected_Categories[i].value);
     }

    var tobeupdatetodo={
        id:document.getElementById("inputId").value,
        title:document.getElementById("todoTitle").value,
        targetDate:document.getElementById("todoStartDate").value,
        isDone:false,
        isPublic:document.querySelector('input[name="public"]:checked').value,
        reminderDate:reminderDate,
        categories:catVals
    }
    
    if(validatetodoform(tobeupdatetodo)){
        for (var i=0;i<todos.length;i++){
            if(todos[i].id==id){
                todos[i].title=tobeupdatetodo.title;
                todos[i].targetDate=tobeupdatetodo.targetDate;
                todos[i].isDone=tobeupdatetodo.isDone;
                todos[i].isPublic=tobeupdatetodo.isPublic;
                todos[i].categories=tobeupdatetodo.categories;
                todos[i].reminderDate=tobeupdatetodo.reminderDate;
                break;
            }
        }
        for(var i=0;i<users.length;i++){
            if(users[i].email==loggedinuser.email){
                users[i].todos=todos;
                break;
            }
        }
        localStorage.setItem("userlist",JSON.stringify(users));
        alert("Task updated succesfully!");
        window.location="dashboard.html";
    }
};
function validatetodoform(new_todo){
    var isFormValid = true;
    if(!new_todo.title){
        isFormValid=false;
        document.getElementById("title_err").innerHTML="Please Enter Tiltle";
    }
    if(!new_todo.targetDate){
        isFormValid=false;
        document.getElementById("startdate_err").innerHTML="please enter/select date";
    }
    if(!validatedate(new_todo.targetDate)){
        isFormValid=false;
        document.getElementById("startdate_err").innerHTML="invalid date";
    }
    var isReminder=document.querySelector('input[name="reminder"]:checked').value
    if(isReminder=='yes'){
        if(!new_todo.reminderDate){
            isFormValid=false;
            document.getElementById("reminderdate_err").innerHTML="Please enter/select date";
        }
        else if(!validateReminderDate(new_todo.reminderDate,new_todo.targetDate)){
            isFormValid=false;
            document.getElementById("reminderdate_err").innerHTML="Reminder date must be greater than start date";
        }
    }
    if(!new_todo.categories || new_todo.categories.length==0){
        isFormValid=false;
         document.getElementById("categoty_err").innerHTML = "Please select category";
    }
    return isFormValid;
}
function validatedate(targetdate){
    var today=new Date();
    today.setHours(0, 0, 0, 0); 
    if(stringToDate(targetdate,"yyyy-mm-dd","-") < today){
        return false;
    }
    return true;
}
function validateReminderDate(targetdate,sdate){
    if(targetdate < sdate){
        //console.log('hiiiiiiiiiiiiiiiii');
        return false;
    }
    return true;
}
function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            formatedDate.setHours(0, 0, 0, 0)
            return formatedDate;
}

function handleReminderClick(radioReminder){
    if(radioReminder.value=='yes'){
        document.getElementById("div_reminder").style.display="block";
    }
    else{
        document.getElementById("div_reminder").style.display="none";
    }
}
function removeError(){
    document.getElementById("title_err").innerHTML="";
    document.getElementById("startdate_err").innerHTML="";
    document.getElementById("reminderdate_err").innerHTML="";
    document.getElementById("categoty_err").innerHTML="";

}



