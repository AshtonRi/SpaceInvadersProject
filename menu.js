document.addEventListener("DOMContentLoaded", function() {
    function handleOnClick() {
        console.log("This is from the inline onclick handler.");
    }

    const button = document.getElementById("myButton");
    button.addEventListener("click", function() {
        window.location.href = "game1.html";
        console.log("This is from the addEventListener method.");
    });
});