// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${
  //import.meta.env.REACT_APP_JSON_SERVER_PORT
  9090
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

const recipeIngredientURL = `${baseServerURL}/recipeIngredients`;
const employeeURL = `${baseServerURL}/employees`;
const userRegisterURL = `${baseServerURL}/user/register`;
const userLoginURL = `${baseServerURL}/user/login`;
let paginationWrapper = document.getElementById("pagination-wrapper");

let loginUserUsername = document.getElementById("login-user-username");
let loginUserPassword = document.getElementById("login-user-passowrd");

let loginUserButton = document.getElementById("login-user");
let getTodoButton = document.getElementById("fetch-todos");

let mainSection = document.getElementById("data-list-wrapper");
let notificationWrapper = document.getElementById("notifications-wrapper");

let userAuthToken = localStorage.getItem("localAccessToken") || null;
let userId = +localStorage.getItem("userId") || null;
const urlAllTodosOfUser = `${baseServerURL}/todos?userId=${userId}`;
const urlTodosBase = `${baseServerURL}/todos/`;

loginUserButton.onclick = async () => {
  try { 
    let obj = {
      username: loginUserUsername.value,
      password: loginUserPassword.value,
    };
     console.log(obj);
     let res = await fetch(userLoginURL, { 
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    // console.log(res.ok);
    if(res.ok){
      notificationWrapper.innerHTML = `<h5 class="notification info">
    hey ${loginUserUsername.value}, welcome back!
    </h5>`;
    res = await res.json();
    console.log(res);
    userAuthToken = res.accessToken;
    // console.log(userAuthToken);
    userId = res.user.id;
    localStorage.setItem('userId',userId)
    // console.log(userId);
    }
  }catch (error) {
    console.log(error);
  }
};

getTodoButton.onclick = async () => {
  let res = await fetch(urlAllTodosOfUser, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userAuthToken}`
    }
  })

  let data = await res.json();
  console.log(data);

  renderTodo(data)
  
}

const renderTodo = (data) => {
  
  mainSection.innerHTML = null;

  data.forEach( (el) => {

   
    mainSection.innerHTML = `<div id="todo-list-wrapper" class="todo-list-wrapper">
    </div>
    `

    if(el.completed){
      document.getElementById('todo-list-wrapper').innerHTML=`<label><input class="todo-item-checkbox" data-id=${el.id} type="checkbox" checked="">${el.title}</label>`
    }else{
      document.getElementById('todo-list-wrapper').innerHTML=`<label><input class="todo-item-checkbox" data-id=${el.id} type="checkbox">${el.title}</label>`
    }

    // let div = document.createElement('div')

    // let label = document.createElement("label")
    // let input = document.createElement('input')
    
    // div.append(input)
    // mainSection.append(div)

  })
}

