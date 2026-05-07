
async function createBooking(event) {

    event.preventDefault();

    const message =
        document.getElementById("parkingMessage");


    const firstName =
        document.getElementById("parkName").value;

    const lastName =
        document.getElementById("parkLastName").value;

    const email =
        document.getElementById("parkEmail").value;

    const phoneNumber =
        document.getElementById("parkPhone").value;

    const licensePlate =
        document.getElementById("parkPlate").value;


    const startDate =
        document.getElementById("parkStartDate").value;

    const startTime =
        document.getElementById("parkStartTime").value;


    const endDate =
        document.getElementById("parkEndDate").value;

    const endTime =
        document.getElementById("parkEndTime").value;


    const startDateTime =
        new Date(`${startDate}T${startTime}`);

    const endDateTime =
        new Date(`${endDate}T${endTime}`);


    if (endDateTime <= startDateTime) {

        message.innerHTML =
            "End date must be after start date";

        message.style.color = "#ef4444";

        return;
    }


    message.innerHTML =
        "Creating reservation...";

    message.style.color = "white";


    try {

        const response = await fetch("/api/reserve", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({

                firstName,
                lastName,
                email,
                phoneNumber,
                licensePlate,

                startTime:
                    startDateTime.toISOString(),

                endTime:
                    endDateTime.toISOString(),
            }),
        });


        const result =
            await response.json();


        if (result.success) {

            message.innerHTML =
                "Parking reservation created successfully!";

            message.style.color = "#22c55e";

            document
                .getElementById("parkingForm")
                .reset();

            console.log(result);
        }

        else {

            console.error(result);

            message.innerHTML =
                result.message ||
                "Reservation failed";

            message.style.color = "#ef4444";
        }

    } catch (error) {

        console.error(error);

        message.innerHTML =
            "Server error";

        message.style.color = "#ef4444";
    }
}

document
    .getElementById("parkingForm")
    .addEventListener("submit", createBooking);