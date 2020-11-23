//function for prevent default browser back button
function preventBack() { window.history.forward(); }
setTimeout("preventBack()", 0);
window.onunload = function () { null };  

window.addEventListener("DOMContentLoaded",function(){
    if (sessionStorage.getItem("loggedinuser") === null) {
        window.location='login.html';
      }
      var users = JSON.parse(localStorage.getItem("userlist"));
      var loggedinuser=JSON.parse(sessionStorage.getItem("loggedinuser"));
      var todoList=users.find( a => a.email == loggedinuser.email).todos;
      var rowshtml='';
      if(todoList && todoList.length>0 ){
        for (var i=0;i<todoList.length;i++){
            rowshtml+=`<tr>
            <td style="text-align:center"><input type="checkbox" data-id="${todoList[i].id}" name="chkdeletetodo" /></td>
            <td>${(todoList[i].isDone)?"<del>"+todoList[i].title+"</del>":todoList[i].title}</td>
            <td>${todoList[i].targetDate}</td>
            <td>${(todoList[i].isDone)?"<text style='color:green;'><b>Completed</b></text>":"<text style='color:red;'><b>Pending</b></text>"}</td>
            <td>${( Date.parse(todoList[i].reminderDate)< new Date())?"Yes":"No"}</td>
            <td>${todoList[i].categories.join(',')}</td>
            <td><button type="button" class="text-success" onclick="markasdone(${todoList[i].id})">Mark as done</button></td>
            <td><a href="edittodo.html?id=${todoList[i].id}"><i class="fa fa-edit" style="color:#000000;font-size:22px;"></i></a></td>
            <td style="display:none;">${todoList[i].reminderDate}</td>
              </tr>`;
          }
          
      }
      else{
        rowshtml=`<tr>
        <td colspan="7" style="text-align:center"><b>No records to display</b></td>
        </tr>`;
      }
      var tableRef = document.getElementById('todoTbl').getElementsByTagName('tbody')[0];
      tableRef.innerHTML=rowshtml;
      document.getElementById("deleteTodo").addEventListener("click",deletetodos);
      document.getElementById("titleSearch").addEventListener("keyup",searchByTitle);

      //sort by status
      document.getElementsByName('statusSearch').forEach(function(item) {
        item.addEventListener("click", function(e) {
            var selectedStatus=e.target.value;
            var users = JSON.parse(localStorage.getItem("userlist"));
          var loggedinuser=JSON.parse(sessionStorage.getItem("loggedinuser"));
          var todoList=users.find( a => a.email == loggedinuser.email).todos;
          var filteredtodolist;
          if(selectedStatus=="all"){
            filteredtodolist=todoList;
          }
          else if(selectedStatus=="completed"){
            filteredtodolist=todoList.filter(function(value, index, arr){ return value.isDone==true});
          }
          else if(selectedStatus=="pending"){
            filteredtodolist=todoList.filter(function(value, index, arr){ return value.isDone==false});
          }
          
          var rowshtml='';
          if(filteredtodolist && filteredtodolist.length>0){
              for (var i=0;i<filteredtodolist.length;i++){
                  rowshtml+=`<tr>
                  <td style="text-align:center"><input type="checkbox" data-id="${filteredtodolist[i].id}" name="chkdeletetodo" /></td>
                  <td>${(filteredtodolist[i].isDone)?"<del>"+filteredtodolist[i].title+"</del>":filteredtodolist[i].title}</td>
                  <td>${filteredtodolist[i].targetDate}</td>
                  <td>${(filteredtodolist[i].isDone)?"<text style='color:green;'><b>Completed</b></text>":"<text style='color:red;'><b>Pending</b></text>"}</td>
                  <td>${( Date.parse(todoList[i].reminderDate)< new Date())?"Yes":"No"}</td>
                  <td>${filteredtodolist[i].categories.join(',')}</td>
                  <td><button type="button" class="text-success" onclick="markasdone(${filteredtodolist[i].id})">Mark as done</button></td>
                  <td><a href="edittodo.html?id=${filteredtodolist[i].id}"><i class="fa fa-edit" style="color:#000000;font-size:22px;"></i></a></td>
                  <td style="display:none;">${todoList[i].reminderDate}</td>
                  </tr>`;

              }
              
          }

          else{
            rowshtml=`<tr>
            <td colspan="7" style="text-align:center"><b>No records to display</b></td>
            </tr>`;
          }
          var tableRef = document.getElementById('todoTbl').getElementsByTagName('tbody')[0];
          tableRef.innerHTML=rowshtml;
        });
    });

    //search by category
    let a = document.getElementById("all");
    let comp = document.getElementById("comp");
    let pend = document.getElementById("pend");

    let home = document.getElementById("home");
    let personal = document.getElementById("personal");
    let office = document.getElementById("office");


    document.getElementsByName('searchByCat').forEach(function(item) {
      item.addEventListener("click", function(e) {
          pend.checked=false;
          comp.checked = false;
          a.checked=false;

          if(home.checked == false && personal.checked == false && office.checked ==false)
          {
            location.reload();
          }

          var selected_Categories=document.querySelectorAll('input[name="searchByCat"]:checked');
          var catVals = [];
          for(var i = 0; i < selected_Categories.length; i++)
          {
              catVals.push(selected_Categories[i].value);
          }
          var users = JSON.parse(localStorage.getItem("userlist"));
        var loggedinuser=JSON.parse(sessionStorage.getItem("loggedinuser"));
        var todoList=users.find( a => a.email == loggedinuser.email).todos;
        var filteredtodolist=[];
        if(catVals.length>0){
          filteredtodolist=todoList.filter(function(value, index, arr){ return value.categories.some(r=>catVals.includes(r))});
        }
        else{
          filteredtodolist=todoList;
        }

        var rowshtml='';
        if(filteredtodolist && filteredtodolist.length>0){
            for (var i=0;i<filteredtodolist.length;i++){
                rowshtml+=`<tr>
                <td style="text-align:center"><input type="checkbox" data-id="${filteredtodolist[i].id}" name="chkdeletetodo" /></td>
                <td>${(filteredtodolist[i].isDone)?"<del>"+filteredtodolist[i].title+"</del>":filteredtodolist[i].title}</td>
                <td>${filteredtodolist[i].targetDate}</td>
                <td>${(filteredtodolist[i].isDone)?"<text style='color:green;'><b>Completed</b></text>":"<text style='color:red;'><b>Pending</b></text>"}</td>
                <td>${( Date.parse(todoList[i].reminderDate)< new Date())?"Yes":"No"}</td>
                <td>${filteredtodolist[i].categories.join(',')}</td>
                <td><button type="button" class="text-success" onclick="markasdone(${filteredtodolist[i].id})">Mark as done</button></td>
                <td><a href="edittodo.html?id=${filteredtodolist[i].id}"><i class="fa fa-edit" style="color:#000000;font-size:22px;"></i></a></td>
                <td style="display:none;">${todoList[i].reminderDate}</td>
                </tr>`;
            }
            
        }

        else{
          rowshtml=`<tr>
          <td colspan="7" style="text-align:center"><b>No records to display</b></td>
          </tr>`;
        }
        var tableRef = document.getElementById('todoTbl').getElementsByTagName('tbody')[0];
        tableRef.innerHTML=rowshtml;
      });
  });
})


//function for search todo list by it's title

function searchByTitle(e){
  var searchText=e.target.value;

  var users = JSON.parse(localStorage.getItem("userlist"));
    var loggedinuser=JSON.parse(sessionStorage.getItem("loggedinuser"));
    var todoList=users.find( a => a.email == loggedinuser.email).todos;
    let re = new RegExp(searchText, 'gi');
    var filteredtodolist=todoList.filter(function(value, index, arr){ return value.title.match(re)});
    var rowshtml='';
    if(filteredtodolist && filteredtodolist.length>0){
        for (var i=0;i<filteredtodolist.length;i++){
            rowshtml+=`<tr>
            <td style="text-align:center"><input type="checkbox" data-id="${filteredtodolist[i].id}" name="chkdeletetodo" /></td>
            <td>${(filteredtodolist[i].isDone)?"<del>"+filteredtodolist[i].title+"</del>":filteredtodolist[i].title}</td>
            <td>${filteredtodolist[i].targetDate}</td>
            <td>${(filteredtodolist[i].isDone)?"<text style='color:green;'><b>Completed</b></text>":"<text style='color:red;'><b>Pending</b></text>"}</td>
            <td>${( Date.parse(todoList[i].reminderDate)< new Date())?"Yes":"No"}</td>
            <td>${filteredtodolist[i].categories.join(',')}</td>
            <td><button type="button" class="text-success" onclick="markasdone(${filteredtodolist[i].id})">Mark as done</button></td>
            <td><a href="edittodo.html?id=${filteredtodolist[i].id}"><i class="fa fa-edit" style="color:#000000;font-size:22px;"></i></a></td>
            <td style="display:none;">${todoList[i].reminderDate}</td>
            </tr>`;
        }
        
    }
    else{
      rowshtml=`<tr>
      <td colspan="7" style="text-align:center"><b>No records to display</b></td>
      </tr>`;
    }
    var tableRef = document.getElementById('todoTbl').getElementsByTagName('tbody')[0];
    tableRef.innerHTML=rowshtml;
}


//function for delete todo list item

function deletetodos(e){
  e.preventDefault();
  var users = JSON.parse(localStorage.getItem("userlist"));
  var loggedinuser=JSON.parse(sessionStorage.getItem("loggedinuser"));
  var todolist=users.find( a => a.email == loggedinuser.email).todos;
  var newtodolist=todolist;
  //console.log(loggedinuser);
  //console.log(todolist);
  var table = document.getElementById("todoTbl");
  var checkBoxes = table.getElementsByTagName("INPUT");
  var count=0;
  for (var i = 0; i < checkBoxes.length; i++){
    if(!checkBoxes[i].checked){
      count+=1;
    }
  }
    if(count>0){
      alert("Please select task to delete");
    }
  else if(todolist.length==0)
  {
    alert("nothing to delete");
  }

  else{
    var r = confirm("Are you sure, you want to delete selected task?");
    if (r == true) {
        var table = document.getElementById("todoTbl");
        var checkBoxes = table.getElementsByTagName("INPUT");
        for (var i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked) {
                var id = checkBoxes[i].getAttribute("data-id");
                newtodolist=newtodolist.filter(function(value, index, arr){ return value.id != id;});
            }
        }
        
        for(var i=0;i<users.length;i++){
            if(users[i].email==loggedinuser.email){
                users[i].todos=newtodolist;
                break;
            }
        }
        localStorage.setItem("userlist",JSON.stringify(users));
        window.location="dashboard.html";
    } else {
        return false;
    }
}
};

//function for mark as done for completed todo
function markasdone(todoid){
  var users = JSON.parse(localStorage.getItem("userlist"));
  var loggedinuser=JSON.parse(sessionStorage.getItem("loggedinuser"));
  var todolist=users.find( a => a.email == loggedinuser.email).todos;
  for(var i=0;i<todolist.length;i++){
      if(todolist[i].id==todoid){
          todolist[i].isDone=true;
          break;
      }
      
  }
  for(var i=0;i<users.length;i++){
      if(users[i].email==loggedinuser.email){
          users[i].todos=todolist;
          break;
      }
      
  }
  localStorage.setItem("userlist",JSON.stringify(users));
  window.location="dashboard.html";
}



