const timeZones = [
  "Asia/Bangkok", "Europe/Berlin", "America/Buenos_Aires", "Africa/Cairo", "America/Chicago",
  "Asia/Dubai", "Asia/Hong_Kong", "Africa/Johannesburg", "Asia/Kuala_Lumpur", "Europe/London",
  "America/Los_Angeles", "America/Mexico_City", "Europe/Moscow", "Asia/Kolkata", "Africa/Nairobi",
  "America/New_York", "Europe/Paris", "Europe/Rome", "America/Sao_Paulo", "Asia/Seoul",
  "Asia/Shanghai", "Australia/Sydney", "Asia/Tokyo", "America/Toronto", "America/Vancouver"
];

// Populate dropdown
timeZones.forEach((zone) => {
  const option = document.createElement("option");
  option.value = zone;
  option.innerText = zone.split("/")[1].replaceAll("_", " ");
  document.querySelector("optgroup").appendChild(option);
});

let userHasSelectedCity = false; // 👈 New flag

// Display current location
const setCurrentLocation = () => {
  const localTimeZone = moment.tz.guess();
  document.querySelector("#current-location .current-city").innerHTML = localTimeZone.split("/")[1].replace("_", " ");
  document.querySelector("#current-location .current-date").innerHTML = moment.tz(localTimeZone).format("dddd, MMM Do YYYY");
  document.querySelector("#current-location .current-time").innerHTML = moment.tz(localTimeZone).format("h:mm:ss [<span>]A[</span>]");
}

// Display default locations
const setPreviewLocation = () => {
  if (userHasSelectedCity) return; // 👈 Skip updating if user has selected a city

  const displayDiv = document.getElementById("display");
  displayDiv.innerHTML = "";

  const previews = ["America/New_York", "Europe/London", "Asia/Seoul"];

  previews.forEach(preview => {
    const city = preview.split("/")[1];
    const cityDiv = document.createElement("div");
    cityDiv.setAttribute("id", city.replace("_", "-").toLowerCase());
    cityDiv.setAttribute("class", "city-date-container");

    const dateDiv = document.createElement("div");
    dateDiv.setAttribute("class", "city-date");
    dateDiv.innerHTML = `
      <h3>${city.replace("_", " ")}</h3>
      <small class="date">${moment.tz(preview).format("dddd, MMM Do YYYY")}</small>
    `;

    cityDiv.innerHTML = `
      <h2 class="time">${moment.tz(preview).format("h:mm:ss [<span>]A[</span>]")}</h2>
    `;
    displayDiv.appendChild(cityDiv);
    cityDiv.appendChild(dateDiv);
  });
}

// Display selected city only
const setLocationSelection = (event) => {
  userHasSelectedCity = true; // 👈 Prevent preview from rendering

  const selectedCity = event.target.value;
  const zone = timeZones.find(zone => selectedCity === zone);
  if (!zone) return;

  const cityHTML = `
    <div id=${zone.split("/")[1].replaceAll("_", "-").toLowerCase()} class="city-date-container">
      <div class="city-date">
        <h3>${zone.split("/")[1].replaceAll("_", " ")}</h3>
        <small class="date">${moment.tz(zone).format("dddd, MMM Do YYYY")}</small>
      </div>
      <h2 class="time">${moment.tz(zone).format("h:mm:ss [<span>]A[</span>]")}</h2>
    </div>
  `;

  document.getElementById("display").innerHTML = cityHTML;
};

// Update time every second
setInterval(setCurrentLocation, 1000);
setInterval(setPreviewLocation, 1000);

// Add dropdown event
document.getElementById("time-zone").addEventListener("change", setLocationSelection);