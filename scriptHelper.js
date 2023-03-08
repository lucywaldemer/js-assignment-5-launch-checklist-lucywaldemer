// Write your helper functions here!
require('isomorphic-fetch');
// replaces HTML with the planet data
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let div = document.getElementById("missionTarget")
    div.innerHTML= ` 
    <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter} km</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance} million km from Earth</li>
            <li>Number of Moons: ${moons}</li>
          </ol>
                     <img src="${imageUrl}">
                     `;
}
// makes sure the user entered data & checks data types for number or not
function validateInput(testInput) {
    if (testInput === ""){
    return "Empty"}

    if (isNaN(testInput)){
    return "Not a Number"
    }

    return "Is a Number"
}

// makes sure user has entered correct information in the form
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const pilotValid = validateInput(pilot) === "Not a Number";
    const copilotValid = validateInput(copilot) === "Not a Number";
    if (!pilotValid || !copilotValid){
        alert("All fields are required!")
        return
    }
// checks that user entered values for fuel & cargo as numbers
    const fuelValid = validateInput(fuelLevel) === "Is a Number";
    const cargoValid = validateInput(cargoLevel) === "Is a Number";
    if (!fuelValid || !cargoValid){
        alert("Make sure to enter valid information for each field!")
        return
    }
    // visibility
    list.style.visibility= "visible"
//updating the status
   document.querySelector("#pilotStatus").innerHTML= `Pilot ${pilot} is ready for launch`;
   document.querySelector("#copilotStatus").innerHTML= `Co-pilot ${copilot} is ready for launch`;
//checking fuelLevel
   const enoughFuel = parseInt(fuelLevel) >= 10000
   if (!enoughFuel){
    document.querySelector("#fuelStatus").innerHTML= "Fuel level too low for launch"
    const launchStatus= document.querySelector("#launchStatus")
    launchStatus.innerHTML= "Shuttle Not Ready for Launch"
    launchStatus.style.color= "rgb(199, 37, 78)"
    return
   } else {
    const launchStatus= document.querySelector("#launchStatus")
    launchStatus.innerHTML= "Shuttle is Ready for Launch"
    launchStatus.style.color= "rgb(65, 159, 106)"
    document.querySelector("#fuelStatus").innerHTML= "Fuel level high enough for launch"
   }
//checking cargo
   const enoughCargo = parseInt(cargoLevel) < 10000
   if (!enoughCargo){
    document.querySelector("#cargoStatus").innerHTML= "Cargo mass too heavy for launch"
    const launchStatus= document.querySelector("#launchStatus")
    launchStatus.innerHTML= "Shuttle Not Ready for Launch"
    launchStatus.style.color= "rgb(199, 37, 78)"
    return
   } else {
    const launchStatus= document.querySelector("#launchStatus")
    launchStatus.innerHTML= "Shuttle is Ready for Launch"
    launchStatus.style.color= "rgb(65, 159, 106)"
    document.querySelector("#cargoStatus").innerHTML= "Cargo mass low enough for launch"
   }
}

// getting the JSON planet data
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
 return response.json()
});

    return planetsReturned;
}
// selecting a random planet 
function pickPlanet(planets) {
   const index =  Math.floor(Math.random() * planets.length);
   return planets[index]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

// module.exports = {addDestinationInfo, validateInput, formSubmission, pickPlanet, myFetch};
