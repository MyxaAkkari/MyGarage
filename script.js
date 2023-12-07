// Hide the loading screen after 2 seconds
setTimeout(function () {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'flex';
}, 3000);

const ownerNameInput = document.getElementById('ownerName');
const phoneNumberInput = document.getElementById('phoneNumber');
const brandInput = document.getElementById('brand');
const modelInput = document.getElementById('model');
const yearInput = document.getElementById('year');
const colorInput = document.getElementById('clr');
const errorMessage = document.getElementById('errorMessage');
const displayElement = document.getElementById('display');
const fixedDisplayElement = document.getElementById('fixedDisplay');
const counterElement = document.getElementById('counter');
const fixedCounterElement = document.getElementById('fixedCounter');

const serverUrl = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', () => {

    async function fetchData(endpoint) {
        try {
            const response = await fetch(`${serverUrl}/${endpoint}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    async function displayCars() {
        const carsData = await fetchData('cars');
        console.log('Cars Data:', carsData);
        if (carsData) {
            counterElement.textContent = `Total Cars: ${carsData.length}`;
            displayElement.innerHTML = carsData.map((car) =>
                `<div>${car.ownerName}'s ${car.color} ${car.brand} ${car.model} (${car.year}) - Phone: ${car.ownerNumber} 
            <button onclick="fixCar(${car.id})">Fixed</button>
            <button onclick="editCar(${car.id})">Edit</button></div>`
            ).join('');
        }
    }

    async function displayFixedCars() {
        const fixedCarsData = await fetchData('fixedCars');
        console.log('Fixed Cars Data:', fixedCarsData);
        if (fixedCarsData) {
            fixedCounterElement.textContent = `Total Fixed Cars: ${fixedCarsData.length}`;
            fixedDisplayElement.innerHTML = fixedCarsData.map((fixedCar) =>
                `<div>${fixedCar.ownerName}'s ${fixedCar.color} ${fixedCar.brand} ${fixedCar.model} (${fixedCar.year}) - Phone: ${fixedCar.ownerNumber} 
            <button onclick="delCar(${fixedCar.id}, true)">Delete</button></div>`
            ).join('');
        }
    }
    displayCars();
    displayFixedCars();
})
async function addaCar() {
    const ownerName = ownerNameInput.value;
    const ownerNumber = phoneNumberInput.value;
    const brand = brandInput.value;
    const model = modelInput.value;
    const year = yearInput.value;
    const color = colorInput.value;

    if (ownerName && ownerNumber && brand && model && year && color) {
        try {
            const response = await fetch(`${serverUrl}/cars`, {
                method: 'post',
                body: JSON.stringify({
                    ownerName,
                    ownerNumber,
                    brand,
                    model,
                    year,
                    color
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const data = await response.json();
            console.log('Added Car:', data);

            // Clear input fields after successfully adding a car
            ownerNameInput.value = '';
            phoneNumberInput.value = '';
            brandInput.value = '';
            modelInput.value = '';
            yearInput.value = '';
            colorInput.value = '';

            // Update the displayed cars
            displayCars();
        } catch (error) {
            console.error('Error adding car:', error);
        }
    } else {
        errorMessage.textContent = 'Please fill in all fields.';
    }
}
async function editCar(carId) {
    const newName = prompt('Enter new owner\'s name:');
    const newNumber = prompt('Enter new phone number:');
    const newBrand = prompt('Enter new brand:');
    const newModel = prompt('Enter new model:');
    const newYear = prompt('Enter new model year:');
    const newColor = prompt('Enter new color:');

    if (newName && newNumber && newBrand && newModel && newYear && newColor) {
        try {
            const response = await fetch(`${serverUrl}/cars/${carId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ownerName: newName,
                    ownerNumber: newNumber,
                    brand: newBrand,
                    model: newModel,
                    year: newYear,
                    color: newColor
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const data = await response.json();
            console.log('Edited Car:', data);

            // Update the displayed cars
            displayCars();
        } catch (error) {
            console.error('Error editing car:', error);
        }
    } else {
        console.error('Invalid input. Editing car canceled.');
    }
}
async function fixCar(carId) {
    try {
        // Fetch the car data from the "cars" array
        const carResponse = await fetch(`${serverUrl}/cars/${carId}`);
        const carData = await carResponse.json();

        // Add the car data to the "fixedCars" array
        const fixResponse = await fetch(`${serverUrl}/fixedCars`, {
            method: 'post',
            body: JSON.stringify(carData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        // If successfully added to "fixedCars", delete the car from "cars"
        if (fixResponse.ok) {
            // Use the delCar function to delete the car from "cars"
            await delCar(carId);

            console.log(`Car with ID ${carId} moved to fixedCars.`);
            // Update the displayed fixed cars
            displayFixedCars();
        } else {
            console.error(`Error fixing car with ID ${carId}.`);
        }
    } catch (error) {
        console.error('Error fixing car:', error);
    }
}
async function delCar(carId, fromFixedCars = false) {
    try {
        const response = await fetch(`${serverUrl}/${fromFixedCars ? 'fixedCars' : 'cars'}/${carId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Car with ID ${carId} deleted.`);
            // Update the displayed cars and fixed cars
            displayCars();
            displayFixedCars();
        } else {
            console.error(`Error deleting car with ID ${carId}.`);
        }
    } catch (error) {
        console.error('Error deleting car:', error);
    }
}


