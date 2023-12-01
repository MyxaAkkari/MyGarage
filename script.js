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




function viewCars() {
    counter.innerHTML = cars.length
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

function addaCar() {
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
        document.getElementById("errorMessage").textContent =
            "All fields must be filled!";
        return;
    }

    cars.push({
        ownerName: ownerNameValue,
        phoneNumber: phoneNumberValue,
        Brand: brandValue,
        model: modelValue,
        year: yearValue,
        Color: clrValue,
    });

    viewCars();
    document.getElementById("carForm").reset();
    document.getElementById("errorMessage").textContent = "";
}

function fixCar(index) {
    const fixedCar = cars.splice(index, 1)[0]
    fixedCar.scratchedOut = true
    fixedCars.push(fixedCar)
    viewCars()
    viewFixedCars();
}

function removeAll() {
    cars = []
    fixedCars = []
    viewCars()
    viewFixedCars()
}
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

    return brandIcons[brand.toLowerCase()] || 'default'
}