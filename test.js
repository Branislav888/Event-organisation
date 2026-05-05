document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("parkingForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = {
            name: document.getElementById("parkName").value,
            lastName: document.getElementById("parkLastName").value,
            email: document.getElementById("parkEmail").value,
            phone: document.getElementById("parkPhone").value,
            plate: document.getElementById("parkPlate").value,
            date: document.getElementById("parkDate").value,
            time: document.getElementById("parkTime").value,
            spaces: document.getElementById("parkSpaces").value
        };

        console.log("FORM DATA:", data);

        const message = document.getElementById("parkingMessage");
        message.textContent = "Reservation submitted!";
        message.style.color = "green";
    });

});