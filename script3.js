// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Length conversion function
    document.getElementById("lengthConvert").addEventListener("click", function() {
        convertUnits("length");
    });

    // Weight conversion function
    document.getElementById("weightConvert").addEventListener("click", function() {
        convertUnits("weight");
    });

    // Temperature conversion function
    document.getElementById("tempConvert").addEventListener("click", function() {
        convertUnits("temp");
    });

    // Info Button Toggle
    document.getElementById("infoButton").addEventListener("click", function() {
        document.getElementById("infoText").classList.toggle("visible");
    });
    
    // Side Panel Toggle - Fixed version
    document.getElementById("openPanel").addEventListener("click", function(e) {
        e.stopPropagation(); // Prevent event bubbling
        document.getElementById("sidePanel").classList.toggle("active");
    });

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        const sidePanel = document.getElementById('sidePanel');
        const openBtn = document.getElementById('openPanel');
        
        if (!sidePanel.contains(e.target) && e.target !== openBtn) {
            sidePanel.classList.remove('active');
        }
    });
});

// Unified conversion function
function convertUnits(type) {
    const value = parseFloat(document.getElementById(`${type}Value`).value);
    const fromUnit = document.getElementById(`${type}From`).value;
    const toUnit = document.getElementById(`${type}To`).value;
    const resultElement = document.getElementById(`${type}Result`);

    if (isNaN(value)) {
        resultElement.textContent = "Please enter a valid number.";
        return;
    }

    let result = value;
    
    switch(type) {
        case 'length':
            result = convertLength(value, fromUnit, toUnit);
            break;
        case 'weight':
            result = convertWeight(value, fromUnit, toUnit);
            break;
        case 'temp':
            result = convertTemp(value, fromUnit, toUnit);
            break;
    }

    resultElement.textContent = `Result: ${result.toFixed(4)} ${toUnit}`;
}

// Length conversion helper
function convertLength(value, fromUnit, toUnit) {
    const conversions = {
        meters: {
            kilometers: value / 1000,
            miles: value * 0.000621371,
            yards: value * 1.09361
        },
        kilometers: {
            meters: value * 1000,
            miles: value * 0.621371,
            yards: value * 1093.61
        },
        miles: {
            meters: value / 0.000621371,
            kilometers: value / 0.621371,
            yards: value * 1760
        },
        yards: {
            meters: value / 1.09361,
            kilometers: value / 1093.61,
            miles: value / 1760
        }
    };
    return fromUnit === toUnit ? value : conversions[fromUnit][toUnit];
}

// Weight conversion helper
function convertWeight(value, fromUnit, toUnit) {
    const conversions = {
        kilograms: {
            grams: value * 1000,
            pounds: value * 2.20462,
            ounces: value * 35.274
        },
        grams: {
            kilograms: value / 1000,
            pounds: value / 453.592,
            ounces: value / 28.3495
        },
        pounds: {
            kilograms: value / 2.20462,
            grams: value * 453.592,
            ounces: value * 16
        },
        ounces: {
            kilograms: value / 35.274,
            grams: value * 28.3495,
            pounds: value / 16
        }
    };
    return fromUnit === toUnit ? value : conversions[fromUnit][toUnit];
}

// Temperature conversion helper
function convertTemp(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;
    
    // Convert to Celsius first
    let celsius;
    switch(fromUnit) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }
    
    // Convert from Celsius to target unit
    switch(toUnit) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return (celsius * 9/5) + 32;
        case 'kelvin':
            return celsius + 273.15;
    }
}
