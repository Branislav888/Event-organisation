
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


app.post("/api/reserve", async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            licensePlate,
            startTime,
            endTime,
        } = req.body;


        const response = await fetch(
            "http://localhost:9080/customers-contracts/v2/de_studentui/consumers/visitor",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({

                    firstName,
                    lastName,
                    email,
                    phoneNumber,

                    mediums: [
                        {
                            type: "LICENSEPLATE",

                            encoding: "HEX",

                            value: licensePlate,

                            licencePlateRegion: {
                                code: "BL",
                                country: "SVK",
                            },

                            status: "VALIDATED",
                        },
                    ],

                    visit: {

                        startTime,
                        endTime,

                        contractBusinessId: "A2026X0qTl9Woq",

                        productBusinessId: "PP000037",

                        facilitiesBusinessId: [
                            "FC2754897"
                        ],
                    },
                }),
            }
        );


        const data = await response.json();

        if (!response.ok) {

            console.error(data);

            return res.status(response.status).json({
                success: false,
                message:
                    data.message || "Reservation failed",
            });
        }


        res.json({
            success: true,
            reservation: data,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);
});