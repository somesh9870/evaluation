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
      passowrd: loginUserPassword.value,
    };
     console.log(obj);
    let res = await fetch(userLoginURL, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    // if (res.ok) {
    //   alert(`hey ${username}, welcome back!`);
    // }

    // notificationWrapper.innerHTML = `<h5 class="notification info">
    // hey ${username}, welcome back!
    // </h5>`;
    // let token = await res.json();
    // userAuthToken = token.accessToken;
    // userId = token.id;
  } catch (error) {
    alert("bad request");
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

  let data = res.json();
  console.log(data);
}


// const fetchData = async () => {
//   let res = await fetch(urlAllTodosOfUser, {
//     method: "GET",
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${userAuthToken}`
//     }
//   })

//   let data = res.json();
//   console.log(data);

  
// }

