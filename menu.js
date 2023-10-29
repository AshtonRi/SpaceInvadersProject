document.addEventListener("DOMContentLoaded", function() {
    function handleOnClick() {
        console.log("This is from the inline onclick handler.");
    }

    const button = document.getElementById("myButton");
    button.addEventListener("click", function() {
        window.location.href = "https://en.wikipedia.org/";
        console.log("This is from the addEventListener method.");
    });
});