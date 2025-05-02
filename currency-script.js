let selectedDropdown1 = 'usd';
let selectedDropdown2 = 'eur'; 

// API Configuration
const date = 'latest';
const apiVersion = 'v1';
const baseUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/${apiVersion}`;

async function fetchConversionRate(fromCurrency, toCurrency) {
    const url = `${baseUrl}/currencies/${fromCurrency}.json`;
    console.log('Attempting API call:', url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Could not fetch conversion rate. (${response.status})`);
        }
        const data = await response.json();
        console.log('API Response:', data);
        
        if (!data[fromCurrency] || data[fromCurrency][toCurrency] === undefined) {
            throw new Error("Conversion type not supported");
        }
        
        return data[fromCurrency][toCurrency];
    } catch (error) {
        console.error('API Error:', error);
        throw error; // Re-throw to handle in convert function
    }
}

function updateLabels() {
    const dropdown1 = document.getElementById('dropdown1');
    const dropdown2 = document.getElementById('dropdown2');
    const label1 = document.getElementById('label1');
    const label2 = document.getElementById('label2');
    
    selectedDropdown1 = dropdown1.value;
    selectedDropdown2 = dropdown2.value;
    
    if (selectedDropdown1 === selectedDropdown2) {
        dropdown2.value = getDifferentOption(selectedDropdown1);
        selectedDropdown2 = dropdown2.value; 
    }
    label1.innerText = getLabelForType(selectedDropdown1);
    label2.innerText = getLabelForType(selectedDropdown2);
}

function getDifferentOption(selectedValue) {
    const options = ['usd', 'eur', 'gbp', 'jpy', 'cad', 'aud', 'chf', 'cny'];
    return options.find(option => option !== selectedValue) || 'eur';
}

function getLabelForType(type) {
    switch (type.toLowerCase()) {
        case 'usd':
            return 'Enter amount in USD';
        case 'eur':
            return 'Enter amount in EUR';
        case 'gbp':
            return 'Enter amount in GBP';
        case 'jpy':
            return 'Enter amount in JPY';
        case 'cad':
            return 'Enter amount in CAD';
        case 'aud':
            return 'Enter amount in AUD';
        case 'chf':
            return 'Enter amount in CHF';
        case 'cny':
            return 'Enter amount in CNY';
        default:
            return 'Enter amount';
    }
}

async function convert() {
    const input1 = document.getElementById('textbox1').value;
    const fromCurrency = document.getElementById('dropdown1').value.toLowerCase();
    const toCurrency = document.getElementById('dropdown2').value.toLowerCase();
    let result = '';

    // Check if input is valid
    if (isNaN(input1) || input1.trim() === "") {
        result = 'Please enter a valid number';
        document.getElementById('textbox2').value = result;
        return;
    }

    try {
        const rate = await fetchConversionRate(fromCurrency, toCurrency);
        result = (input1 * rate).toFixed(2) + ` ${toCurrency.toUpperCase()}`;
        document.getElementById('textbox2').value = result;
    } catch (error) {
        console.error('Conversion Error:', error);
        document.getElementById('textbox2').value = error.message;
    }
}

// Initialize on page load
window.onload = function() {
    updateLabels();
    document.getElementById('dropdown1').addEventListener('change', updateLabels);
    document.getElementById('dropdown2').addEventListener('change', updateLabels);
};
