let inputName;

function onLogin(event) {
    sessionStorage.setItem("name", inputName.value);
}

window.onload = () => {
    inputName = document.getElementById("name");
}