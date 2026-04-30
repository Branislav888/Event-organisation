document.addEventListener('DOMContentLoaded', function() {
    function showMessage(element, text, isError) {
        element.textContent = text;
        element.className = 'form-message ' + (isError ? 'error' : 'success');
        setTimeout(() => {
            if (element.textContent === text) {
                element.textContent = '';
                element.className = 'form-message';
            }
        }, 5000);
    }

    const parkingForm = document.getElementById('parkingForm');
    const parkingMsg = document.getElementById('parkingMessage');

    parkingForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('parkName').value.trim();
        const lastName = document.getElementById('parkLastName').value.trim();
        const email = document.getElementById('parkEmail').value.trim();
        const phone = document.getElementById('parkPhone').value.trim();
        const plate = document.getElementById('parkPlate').value.trim();
        const date = document.getElementById('parkDate').value;
        const time = document.getElementById('parkTime').value;
        const spaces = document.getElementById('parkSpaces').value;

        if (!name || !lastName || !email || !phone || !plate || !date || !time) {
            showMessage(parkingMsg, 'Please fill all fields.', true);
            return;
        }
        if (!email.includes('@')) {
            showMessage(parkingMsg, 'Enter a valid email address.', true);
            return;
        }

        const parkingData = {
            firstName: name,
            lastName: lastName,
            email: email,
            phone: phone,
            numberPlate: plate,
            date: date,
            time: time,
            parkingSpots: parseInt(spaces)
        };

        const btn = parkingForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parkingData)
            });
            if (response.ok) {
                showMessage(parkingMsg, 'Parking reserved successfully!', false);
                parkingForm.reset();
            } else {
                showMessage(parkingMsg, 'Server error: ' + response.status, true);
            }
        } catch (err) {
            showMessage(parkingMsg, 'Network error. Check API.', true);
            console.error(err);
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });

    const partyForm = document.getElementById('partyForm');
    const partyMsg = document.getElementById('partyMessage');

    partyForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const eventName = document.getElementById('eventName').value.trim();
        const eventType = document.getElementById('eventType').value;
        const guests = document.getElementById('guests').value;
        let foodPortions = document.getElementById('foodPortions').value;
        if (!foodPortions) foodPortions = guests;
        const dietary = document.getElementById('dietary').value.trim();
        const mainDish = document.getElementById('mainDish').value;
        const specialRequests = document.getElementById('specialRequests').value.trim();

        if (!eventName || !eventType || !guests || guests < 1) {
            showMessage(partyMsg, 'Please fill event name, type and number of guests.', true);
            return;
        }

        const partyData = {
            eventName: eventName,
            eventType: eventType,
            guestCount: parseInt(guests),
            mealPortions: parseInt(foodPortions),
            dietaryRestrictions: dietary,
            preferredMainDish: mainDish,
            specialRequests: specialRequests
        };

        const btn = partyForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(partyData)
            });
            if (response.ok) {
                showMessage(partyMsg, 'Party plan submitted! We will contact you.', false);
                partyForm.reset();
            } else {
                showMessage(partyMsg, 'Server error: ' + response.status, true);
            }
        } catch (err) {
            showMessage(partyMsg, 'Network error. Check API.', true);
            console.error(err);
        } finally {
            btn.textContent = originalText;
            btn.disabled = false;
        }
    });
});
