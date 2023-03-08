const { addDestinationInfo , myFetch , pickPlanet}  = require('./scriptHelper');
// Write your JavaScript code here!
window.addEventListener("load", function() {
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanets;
   let listedPlanetsResponse = myFetch()
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
const planetSelected = pickPlanet(listedPlanets)
 addDestinationInfo(document, planetSelected.name, planetSelected.diameter, planetSelected.star, planetSelected.distance, planetSelected.imageUrl, planetSelected.moons)
    })
   // making sure submit form stuff is there
   let list = document.getElementById("faultyItems");
   list.style.visibility = "hidden";
   let form = document.querySelector("form");

   form.addEventListener("submit", function(event) {
       event.preventDefault();
       let pilotInput = document.querySelector("input[name=pilotName]");
       let pilot = pilotInput.value;

       let copilotInput = document.querySelector("input[name=copilotName]");
       let copilot = copilotInput.value;

       let fuelInput = document.querySelector("input[name=fuelLevel]");
       let fuelLevel = Number(fuelInput.value);

       let cargoInput = document.querySelector("input[name=cargoMass]");
       let cargoLevel = Number(cargoInput.value);

       formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);
   });
});