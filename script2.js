// Currency Converter
document.getElementById("getCurrencyBtn").addEventListener("click", getConversion);

function getConversion() {
  const amount = document.getElementById("currencyInput").value;
  const fromCurrency = document.getElementById("currencyFrom").value;
  const toCurrency = document.getElementById("currencyTo").value;

  if (amount === "") {
    alert("Please enter an amount.");
    return;
  }

  // Example API - Exchangerate-API
  const apiKey = "a5ae0af1193faa4b667e5e48"; // Replace with your actual API key
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const conversionRate = data.conversion_rates[toCurrency];
      const convertedAmount = (amount * conversionRate).toFixed(2);
      document.getElementById("convertedAmount").textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`;
      document.getElementById("currencyBox").style.opacity = 1;
    })
    .catch(error => {
      console.error("Error fetching the currency conversion data:", error);
      alert("Failed to get currency data.");
    });
}

// Info Button Toggle
document.getElementById("infoButton").addEventListener("click", function() {
  const infoText = document.getElementById("infoText");
  infoText.classList.toggle("visible");  // Toggles the visibility correctly
});

// Side Panel Toggle
document.getElementById("openPanel").addEventListener("click", function() {
  const sidePanel = document.getElementById("sidePanel");
  if (sidePanel.style.left === "0px") {
    sidePanel.style.left = "-300px";
  } else {
    sidePanel.style.left = "0px";
  }
});

