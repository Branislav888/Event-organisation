document.getElementById("submitReservation").addEventListener("click", async function () {
    try {
        // Získanie údajov z formulára
        const firstName = document.querySelector('input[placeholder="Name"]').value;
        const lastName = document.querySelector('input[placeholder="Last name"]').value;
        const email = document.querySelector('input[type="email"]').value;
        const phone = document.querySelector('input[type="tel"]').value;
        const licensePlate = document.querySelector('input[placeholder*="Number plate"]').value;
        const reservationDate = document.querySelector('input[type="date"]').value;
        const reservationTime = document.querySelector('input[type="time"]').value;

        // Kontrola povinných polí
        if (!firstName || !lastName || !email || !phone || !licensePlate || !reservationDate || !reservationTime) {
            alert("Please fill in all fields.");
            return;
        }

        // Krok 1: Získanie OAuth tokenu
        const tokenBody = new URLSearchParams();
        tokenBody.append("client_id", "B2C_de_studentui");
        tokenBody.append("client_secret", "TVOJ_CLIENT_SECRET");
        tokenBody.append("grant_type", "client_credentials");

        const tokenResponse = await fetch(
            "https://auth.preprod.parking.scheidt-bachmann.net/auth/realms/de_studentui/protocol/openid-connect/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: tokenBody
            }
        );

        if (!tokenResponse.ok) {
            throw new Error(`Token request failed: ${tokenResponse.status}`);
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Krok 2: Načítanie zákazníkov (test API)
        const apiResponse = await fetch(
            "https://pm.preprod.parking.scheidt-bachmann.net/customers-contracts/v2/de_studentui/customers",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!apiResponse.ok) {
            throw new Error(`API request failed: ${apiResponse.status}`);
        }

        const result = await apiResponse.json();

        console.log("Reservation details:", {
            firstName,
            lastName,
            email,
            phone,
            licensePlate,
            reservationDate,
            reservationTime
        });

        console.log("API response:", result);

        alert("Reservation submitted successfully!");
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred: " + error.message);
    }
});