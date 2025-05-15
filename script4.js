const flightForm = document.getElementById('flightForm');
const flightInfo = document.getElementById('flightInfo');

flightForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const flightNumber = document.getElementById('flightNumber').value.trim();
  if (!flightNumber) return;

  flightInfo.classList.add('hidden');
  flightInfo.innerHTML = "Loading...";

  try {
    const response = await fetch(`http://api.aviationstack.com/v1/flights?access_key=78f780881d82583ba9b69043a17945e2&flight_iata=${flightNumber}`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const flight = data.data[0];
      flightInfo.innerHTML = `
        <strong>Airline:</strong> ${flight.airline.name}<br>
        <strong>Flight:</strong> ${flight.flight.iata}<br>
        <strong>Departure:</strong> ${flight.departure.airport} (${flight.departure.iata})<br>
        <strong>Arrival:</strong> ${flight.arrival.airport} (${flight.arrival.iata})<br>
        <strong>Status:</strong> ${flight.flight_status}<br>
        <strong>Departure Time:</strong> ${flight.departure.scheduled ? flight.departure.scheduled : "N/A"}<br>
        <strong>Arrival Time:</strong> ${flight.arrival.scheduled ? flight.arrival.scheduled : "N/A"}
      `;
    } else {
      flightInfo.innerHTML = "No flight information found.";
    }
  } catch (error) {
    flightInfo.innerHTML = "Error fetching flight data. Recheck credentials";
  }

  flightInfo.classList.remove('hidden');
});

const openPanelBtn = document.getElementById('openPanel');
const sidePanel = document.getElementById('sidePanel');

openPanelBtn.addEventListener('click', () => {
  sidePanel.classList.toggle('active');
});

