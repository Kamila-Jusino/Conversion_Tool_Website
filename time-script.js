let selectedDropdown1 = 'seconds';
let selectedDropdown2 = 'minutes'; 

// Time conversion const
const TIME_CONVERSIONS = {
    milliseconds: 0.001,
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    years: 31536000   // Based on 365 days
};

function updateLabels() {
    const dropdown1 = document.getElementById('dropdown1');
    const dropdown2 = document.getElementById('dropdown2');
    const label1 = document.getElementById('label1');
    
    selectedDropdown1 = dropdown1.value;
    selectedDropdown2 = dropdown2.value;
    
    if (selectedDropdown1 === selectedDropdown2) {
        dropdown2.value = getDifferentOption(selectedDropdown1);
        selectedDropdown2 = dropdown2.value; 
    }
    label1.innerText = getLabelForType(selectedDropdown1);
}

function getDifferentOption(selectedValue) {
    const options = Object.keys(TIME_CONVERSIONS);
    return options.find(option => option !== selectedValue) || 'minutes';
}

function getLabelForType(type) {
    return `Enter amount in ${type}`;
}

function convert() {
    const input1 = document.getElementById('textbox1').value.trim();
    const fromUnit = document.getElementById('dropdown1').value.toLowerCase();
    const toUnit = document.getElementById('dropdown2').value.toLowerCase();
    let result = '';

    // Input validation
    if (!input1 || isNaN(input1) || input1 < 0) {
        result = 'Please enter a valid positive number';
        document.getElementById('textbox2').value = result;
        return;
    }

    try {
        const inputValue = parseFloat(input1);
        // Convert to seconds first
        const inSeconds = inputValue * TIME_CONVERSIONS[fromUnit];
        // Convert from seconds to target unit
        const converted = inSeconds / TIME_CONVERSIONS[toUnit];
        result = converted.toFixed(2);
        document.getElementById('textbox2').value = result;
    } catch (error) {
        document.getElementById('textbox2').value = 'Conversion error';
    }
}

window.onload = function() {
    updateLabels();
    document.getElementById('dropdown1').addEventListener('change', updateLabels);
    document.getElementById('dropdown2').addEventListener('change', updateLabels);
};
