// Hide the loading screen after 2 seconds
setTimeout(function () {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'flex';
}, 3000);

const MyCars = "http://localhost:3000/cars"
const MyFixedCars = "http://localhost:3000/fixedcars"
let cars = []
let fixedCars = []

// All of this is to make the enter button work when all the fileds are filled to add a new car 
// (don't fully understand how it works yet)
document.addEventListener('DOMContentLoaded', function () {
    const inputFields = document.querySelectorAll('input')

    inputFields.forEach(function (inputField) {
        inputField.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault() 
                if (areAllFieldsFilled()) {
                    addaCar();
                } else {
                    document.getElementById("errorMessage").textContent = "All fields must be filled!";
                }
            }
        });
    });

    function areAllFieldsFilled() {
        for (const inputField of inputFields) {
            if (inputField.value.trim() === '') {
                return false;
            }
        }
        return true
    }
})



// func that sends the cars list items to the html
function viewCars() {
    // counter for how many cars in list
    counter.innerHTML = cars.length
    // using the map loop we save the show the details from the list and add them to the html
    // added index in order to be able to delete specfic item from list when the fixed button is called
    display.innerHTML = cars.map((car, index) => {
        return `<div>
            <img src="svgs/${carImg(car.Brand)}.svg"> | 
            Owner's Name: ${car.ownerName} | 
             Phone Number: ${car.phoneNumber} | 
             Brand: ${car.Brand} | 
             Model: ${car.model} | 
             Model Year: ${car.year} | 
             Color: ${car.Color}
            <button onclick="fixCar(${index})">Fixed</button>
        </div>`
    }).join("")
}

// same as viewCars() the only deffirance is that i added a class to the div to make the scratch line across the text
// and we will be showing the fixed cars list now
function viewFixedCars() {
    fixedCounter.innerHTML = fixedCars.length;
    fixedDisplay.innerHTML = fixedCars.map((car) => {
        return `<div class="scratched-out">
                    <img src="svgs/${carImg(car.Brand)}.svg"> | 
                    Owner's Name: ${car.ownerName} | 
                     Phone Number: ${car.phoneNumber} | 
                     Brand: ${car.Brand} | 
                     Model: ${car.model} | 
                     Model Year: ${car.year} | 
                     Color: ${car.Color} 
                </div>`
    }).join("")
}

// func that adds a car details to the list as a JSON
function addaCar() {
    // save the values from input fields to a variables in order to be able to test if they are empty before submiting them
    // the trim() removes empty spaces from the string, so if someone filled the inputs with spaces it wont be counted as a filled input

    const ownerNameValue = ownerName.value.trim();
    const phoneNumberValue = phoneNumber.value.trim();
    const brandValue = brand.value.trim();
    const modelValue = model.value.trim();
    const yearValue = year.value.trim();
    const clrValue = clr.value.trim();

    if (
        ownerNameValue === "" ||
        phoneNumberValue === "" ||
        brandValue === "" ||
        modelValue === "" ||
        yearValue === "" ||
        clrValue === ""
    ) {
        // print an error messege
        document.getElementById("errorMessage").textContent =
            "All fields must be filled!";
        return;
    }
    // add the car details to the array
    cars.push({
        ownerName: ownerNameValue,
        phoneNumber: phoneNumberValue,
        Brand: brandValue,
        model: modelValue,
        year: yearValue,
        Color: clrValue,
    });
    // updates the view
    viewCars();
    // reset the fileds and remove error messege
    document.getElementById("carForm").reset();
    document.getElementById("errorMessage").textContent = "";
}
// remove the fixed car from cars array and push it to fixed cars array, and update the view
function fixCar(index) {
    const fixedCar = cars.splice(index, 1)[0]
    fixedCar.scratchedOut = true
    fixedCars.push(fixedCar)
    viewCars()
    viewFixedCars();
}

// remove all cars from both arrays and updates view
function removeAll() {
    cars = []
    fixedCars = []
    viewCars()
    viewFixedCars()
}
// func that we use to direct the img src in viewcar and fixedcar to the right img by using a dicitioary
// the inputed brand will be taken and tested to see if there is a key with the same name, if true return img name
function carImg(brand) {
    const brandIcons = {
        'mazda': 'mazda',
        'acura': 'acura',
        'alfa romeo': 'alfa romeo',
        'am general': 'am general',
        'aston martin': 'aston martin',
        'audi': 'audi',
        'bentley': 'bentley',
        'bmw': 'bmw',
        'bugatti': 'bugatti',
        'buick': 'buick',
        'cadillac': 'cadillac',
        'chevrolet': 'chevrolet',
        'chrysler': 'chrysler',
        'citroen': 'citroen',
        'dacia': 'dacia',
        'daewoo': 'daewoo',
        'dodge': 'dodge',
        'eagle': 'eagle',
        'ferrari': 'ferrari',
        'fiat': 'fiat',
        'fisker': 'fisker',
        'ford': 'ford',
        'genesis': 'genesis',
        'geo': 'geo',
        'gmc': 'gmc',
        'honda': 'honda',
        'hummer': 'hummer',
        'hyundai': 'hyundai',
        'infiniti': 'infiniti',
        'isuzu': 'isuzu',
        'jaguar': 'jaguar',
        'jeep': 'jeep',
        'kia': 'kia',
        'lamborghini': 'lamborghini',
        'land rover': 'land rover',
        'lexus': 'lexus',
        'lincoln': 'lincoln',
        'lotus': 'lotus',
        'maserati': 'maserati',
        'maybach': 'maybach',
        'mclaren': 'mclaren',
        'mercedes': 'mercedes benz',
        'mercury': 'mercury',
        'mini': 'mini',
        'mitsubishi': 'mitsubishi',
        'nissan': 'nissan',
        'oldsmobile': 'oldsmobile',
        'opel': 'opel',
        'panoz': 'panoz',
        'peugeot': 'peugeot',
        'plymouth': 'plymouth',
        'pontiac': 'pontiac',
        'porsche': 'porsche',
        'ram': 'ram',
        'renault': 'renault',
        'rolls royce': 'rolss royce',
        'saab': 'saab',
        'saturn': 'satturn',
        'scion': 'scion',
        'seat': 'seat',
        'skoda': 'skoda',
        'smart': 'smart',
        'spyker': 'spyker',
        'subaru': 'subaru',
        'suzuki': 'suzuki',
        'tesla': 'tesla',
        'volkswagen': 'volkswagen',
        'volvo': 'volvo'

    }
    // return the value of the key, we lower case it incase user inputs with capital letters, if key not found, return default img
    return brandIcons[brand.toLowerCase()] || 'default'
}