// Array of Global Time Zones
const timeZones = [
    { location: "addis-ababa", tz: "Africa/Addis_Ababa" },
    { location: "auckland", tz: "Pacific/Auckland" },
    { location: "bahrain", tz: "Asia/Bahrain" },
    { location: "bangkok", tz: "Asia/Bangkok" },
    { location: "berlin", tz: "Europe/Berlin" },,
    { location: "cairo", tz: "Africa/Cairo" },
    { location: "chicago", tz: "America/Chicago" },
    { location: "dubai", tz: "Asia/Dubai" },
    { location: "hong-kong", tz: "Asia/Hong_Kong" },
    { location: "london", tz: "Europe/London" },
    { location: "los-angeles", tz: "America/Los_Angeles" },
    { location: "moscow", tz: "Europe/Moscow" },
    { location: "nairobi", tz: "Africa/Nairobi" },
    { location: "new-york", tz: "America/New_York" },
    { location: "paris", tz: "Europe/Paris" },
    { location: "sao-paulo", tz: "America/Sao_Paulo" },
    { location: "singapore", tz: "Asia/Singapore" },
    { location: "sydney", tz: "Australia/Sydney" },
    { location: "tokyo", tz: "Asia/Tokyo" },  
    { location: "vancouver", tz: "America/Vancouver" }, 
]

const setCurrentLocation = () => {
    // Set Date and Time of Current Location
    let localTimeZone = moment.tz.guess();
    let currentCityElement = document.querySelector("#current-location .current-city");
    currentCityElement.innerHTML = `${localTimeZone.replace("_", " ").split("/")[1]}`

    let currentDateElement = document.querySelector("#current-location .current-date");
    currentDateElement.innerHTML = moment.tz(localTimeZone).format("dddd, MMM Do YYYY");

    let currentTimeElement = document.querySelector("#current-location .current-time");
    currentTimeElement.innerHTML = moment.tz(localTimeZone).format("h:mm:ss [<span>]A[</span>]");
}

const setLocationPreview = () => {
    // Set Date and Time of chosen Locations
    let newArray = [
        { location: "new-york", tz: "America/New_York" },
        { location: "london", tz: "Europe/London" },
        { location: "hong-kong", tz: "Asia/Hong_Kong" },
    ]

    newArray.forEach(item => {
        let cityObject = document.querySelector(`#${item.location}`);
        let dateObject = cityObject.querySelector(".date");
        dateObject.innerHTML = moment.tz(item.tz).format("dddd, MMM Do YYYY");
        let timeObject = cityObject.querySelector(".time");
        timeObject.innerHTML = moment.tz(item.tz).format("h:mm:ss [<span>]A[</span>]");
    })
}

const setLocationSelection = (event) => {
    let city = event.target.value;
    let cityHTML = "";
    let mainComponent = document.querySelector("#display");
    
    timeZones.forEach(timeZone => {
      if (city === timeZone.location) {
        cityHTML = `
          <div id=${timeZone.location} class="city-date-container">
            <div class="city-date">
              <h3>${timeZone.tz.replace("_", " ").split("/")[1]}</h3>
              <small class="date">${moment.tz(timeZone.tz).format("dddd, MMM Do YYYY")}</small>
            </div>
            <h2 class="time">${moment.tz(timeZone.tz).format("h:mm:ss [<span>]A[</span>]")}</h2>
          </div>
        `
      }
      return cityHTML;
    })
    mainComponent.innerHTML = cityHTML
}

setInterval(setCurrentLocation, 1000);
setInterval(setLocationPreview, 1000);

let changeLocation = document.querySelector("#time-zone");
changeLocation.addEventListener("change", setLocationSelection)