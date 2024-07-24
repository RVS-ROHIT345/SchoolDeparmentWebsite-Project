/*
Gnumber: G01379338
Author: Ramena Venkata Satya Rohit
*/
"use strict";

let userName;
/*getUserNameByPrompt function call */
getUserNameByPrompt();
/* displayGreeting function call*/
displayGreeting();
let newUser = document.querySelector(".new-user");
/*Not you link click event */
newUser.addEventListener("click", function (e) {
  e.preventDefault();
  getUserNameByPrompt();
  displayGreeting();
  resetAllInputValue();
});

let dataNumber = document.querySelector(".number-data");
let avgInput = document.querySelector(".result-avg");
let maxInput = document.querySelector(".result-max");
let errorMessage = document.querySelector(".error-message");
/*blur event on data field */
dataNumber.addEventListener("blur", function () {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
  let numberRangeFlag = false;
  let numberLengthFlag = false;
  let userInputNumber = dataNumber.value;
  let userInputDecoded = userInputNumber.split(",");
  const userInputLength = userInputDecoded.length;
  let mainArr = userInputDecoded.map(Number);

  if (userInputLength < 10 || !userInputNumber.includes(",")) {
    numberLengthFlag = true;
  }

  mainArr.forEach((numValue) => {
    if (numValue < 1 || numValue > 100 || isNaN(numValue)) {
      numberRangeFlag = true;
    }
  });

  if (numberLengthFlag) {
    errorMessage.textContent = "Enter atleast 10 comma separated numbers";
    errorMessage.style.display = "block";
    dataNumber.value = "";
    avgInput.value = "";
    maxInput.value = "";
    return;
  }

  if (numberRangeFlag) {
    errorMessage.textContent =
      "Enter each number that should be between 1 and 100.";
    errorMessage.style.display = "block";
    dataNumber.value = "";
    avgInput.value = "";
    maxInput.value = "";
    return;
  }

  if (!numberLengthFlag && !numberRangeFlag) {
    avgInput.value = computeAverage(mainArr);
    maxInput.value = computeMaximum(mainArr);
  }
});

let submitBtn = document.querySelector(".submit-button");
let usernameInputField = document.querySelector("#username");
let addressInputField = document.querySelector("#address");
let allInputData = document.querySelector(".form");
let checkboxField = document.querySelectorAll("input[type='checkbox']");
let checkboxInput = document.querySelector("#students");
let allRadioBtn = document.querySelectorAll("input[type='radio']");
let radioInput = document.querySelector("#friends");
let emailInput = document.querySelector("#email");

allInputData.addEventListener("submit", function (e) {
  e.preventDefault();
  let InputUsername = usernameInputField.value;
  let addressField = addressInputField.value;
  let formStatus = true;

  /*constraint Username should contain only Alphabets*/
  let allLetter = /^[a-zA-Z]+$/;
  if (!allLetter.test(InputUsername)) {
    formStatus = false;
    alert("Username should contain only Alphabets");
    usernameInputField.focus();
    usernameInputField.value = "";
  }

  /*Constraint to select atleast two checkboxes*/
  let checkboxCount = 0;
  checkboxField.forEach((checkboxValue) => {
    checkboxValue.checked ? checkboxCount++ : "not checked";
  });
  if (checkboxCount < 2) {
    formStatus = false;
    alert(
      "You need to select aleast two option for this question 'What did you like most about the campus?'"
    );
    checkboxInput.focus();
    checkboxField.forEach((checkboxValue) => {
      checkboxValue.checked = false;
    });
  }

  /*Constraint to validate the email id */
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let userEmailInput = emailInput.value;
  if (!emailRegex.test(userEmailInput)) {
    formStatus = false;
    alert(`email is incorrect. enter valid email address`);
    emailInput.focus();
    emailInput.value = "";
  }

  /* Address should contain only numeric, alphabet or alphanumeric characters */
  let addressRegex = /^[a-zA-Z0-9\s,.-]+$/;
  if (!addressRegex.test(addressField)) {
    formStatus = false;
    alert(
      "Address should contain only numeric, alphabet or alphanumeric characters"
    );
    addressInputField.focus();
    addressInputField.value = "";
  }

  /*Constraint to select one radio button */
  let radioSelectedStatus = false;
  allRadioBtn.forEach((radioValue) => {
    radioValue.checked ? (radioSelectedStatus = true) : "not checked";
  });
  if (!radioSelectedStatus) {
    formStatus = false;
    alert(
      "Did not select the option for this question 'How did you come to know about the university ?' "
    );
    radioInput.focus();
    allRadioBtn.forEach((radioValue) => {
      radioValue.checked = false;
    });
  }

  if (!formStatus) {
    console.log("check");
  } else {
    alert("Survey form submitted successfully");
    resetAllInputValue();
  }
});
/*reset form input fields on click event */
let resetBtn = document.querySelector(".reset-button");
resetBtn.addEventListener("click", function () {
  resetAllInputValue();
});

let zipcodeInput = document.querySelector("#zip");
let zipcodeErrorMessage = document.querySelector(".invalidziperrormessage");
let cityTextBox = document.querySelector(".city-value");
let stateTextBox = document.querySelector(".state-value");
let xServerHttp = new XMLHttpRequest();
let zipcodeRegex = /^\d{5}$/;
/*blur event on the zipcode field */
zipcodeInput.addEventListener("blur", function () {
  let zipcodeValue = zipcodeInput.value;
  if (!zipcodeRegex.test(zipcodeValue)) {
    console.log("Zipcode should be of 5 numbers");
    zipcodeErrorMessage.textContent = "Zipcode should be of 5 numbers";
    zipcodeErrorMessage.style.display = "block";
    zipcodeInput.value = "";
    return;
  }

  zipcodeErrorMessage.style.display = "none";
  xServerHttp.open("GET", "zipcodeDetails.json", true);
  xServerHttp.onreadystatechange = function () {
    let zipCodeMatchStatus = false;
    console.log(zipcodeValue);
    if (xServerHttp.readyState === 4 && xServerHttp.status === 200) {
      let allZipCodeData = JSON.parse(xServerHttp.responseText);
      let serverZipDataResponse = allZipCodeData.zipcodes;
      let macthFoundZipCodeDetails;
      console.log(serverZipDataResponse);
      serverZipDataResponse.forEach((czip) => {
        if (czip.zip === zipcodeValue) {
          macthFoundZipCodeDetails = czip;
          zipCodeMatchStatus = true;
        }
      });
      console.log(zipCodeMatchStatus);
      if (!zipCodeMatchStatus) {
        zipcodeErrorMessage.textContent = "Kindly enter a valid zip";
        zipcodeErrorMessage.style.display = "block";
        zipcodeInput.value = "";
        cityTextBox.textContent = "";
        stateTextBox.textContent = "";
      } else {
        console.log(macthFoundZipCodeDetails);
        cityTextBox.textContent = macthFoundZipCodeDetails.city;
        stateTextBox.textContent = macthFoundZipCodeDetails.state;
        zipcodeErrorMessage.style.display = "none";
      }
    }
  };
  xServerHttp.send();
});

/* resetAllInputValue function is used to reset all form values*/
function resetAllInputValue() {
  allInputData.reset();
  cityTextBox.textContent = "";
  stateTextBox.textContent = "";
}
/* getUserNameByPrompt function is used get the username*/
function getUserNameByPrompt() {
  userName = prompt("Enter the name:");
  if (userNameValidation(userName)) {
    setCookie("username", userName, 1);
  } else {
    alert("To fill the survey form you need to enter the name");
    getUserNameByPrompt();
  }
}
/* userNameValidation function to validate username*/
function userNameValidation(umValue) {
  let validUserName = false;
  if (umValue !== null && umValue.trim() !== "") {
    validUserName = true;
  }
  return validUserName;
}
/* getCookie function is used to get the cookie*/
function getCookie(uname) {
  let sname = uname + "=";
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let ecValue = cookieArr[i];
    while (ecValue.charAt(0) == " ") {
      ecValue = ecValue.substring(1);
    }
    if (ecValue.indexOf(sname) == 0) {
      return ecValue.substring(sname.length, ecValue.length);
    }
  }
  return "";
}
/* setCookie function is used to set the cookie*/
function setCookie(uname, u_value, number_of_days) {
  const date = new Date();
  date.setTime(date.getTime() + number_of_days * 24 * 60 * 60 * 1000);
  let cookieExpires = "expires=" + date.toUTCString() + ";path=/";
  document.cookie = uname + "=" + u_value + ";" + cookieExpires;
}
/* getGreeting function is used to get the greeting based on time*/
function getGreeting() {
  const currentTime = new Date().getHours();
  console.log(currentTime);
  if (currentTime > 3 && currentTime < 12) {
    return "Morning";
  } else if (currentTime >= 12 && currentTime < 17) {
    return "Afternoon";
  } else if (currentTime >= 17 && currentTime < 20) {
    return "Evening";
  } else {
    return "Night";
  }
}
/* displayGreeting function is used to display the greeting*/
function displayGreeting() {
  let greetBasedOnTime = getGreeting();
  console.log(greetBasedOnTime);
  let nameOfUser = getCookie("username");
  if (nameOfUser) {
    document.querySelector(
      ".greet"
    ).textContent = `Good ${greetBasedOnTime} ${nameOfUser}, welcome to SWE642 Survey.`;
  } else {
    window.location.reload();
  }
}
/*computeAverage function used to compute average*/
function computeAverage(uArr) {
  let sumResult = 0;
  uArr.forEach((num) => {
    sumResult += num;
  });
  return (sumResult / uArr.length).toFixed(2);
}
/*computeMaximum function used to compute the maximum value*/
function computeMaximum(mArr) {
  let maxValue = mArr[0];
  for (let i = 1; i < mArr.length; i++) {
    if (mArr[i] > maxValue) {
      maxValue = mArr[i];
    }
  }
  return maxValue;
}
