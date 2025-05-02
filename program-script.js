// Set the default dropdown types 
let selectedDropdown1 = 'decimal';
let selectedDropdown2 = 'binary'; 

// Function to make the drop down never the same type
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

// Logic that doesn't allow the same dropdown data type 
function getDifferentOption(selectedValue) {
    const options = ['decimal', 'binary', 'hexadecimal'];
    return options.find(option => option !== selectedValue);
}

// Function to tell user to enter needed type of data
function getLabelForType(type) {
    switch (type) {
        case 'decimal':
            return 'Please input a decimal number';
        case 'binary':
            return 'Please input a binary number';
        case 'hexadecimal':
            return 'Please input a hexadecimal number';
        default:
            return 'Please input a number';
    }
}
// Convert the entered text into the format needed to convert, valdiation of entered text too 
function convert() {
        const input1 = document.getElementById('textbox1').value.trim();
        const dropdown1 = document.getElementById('dropdown1').value.toLowerCase(); 
        const dropdown2 = document.getElementById('dropdown2').value.toLowerCase(); 
        let result = '';
    
        // Validate based on the selected input format
        const isDecimal = dropdown1 === 'decimal';
        const isHex = dropdown1 === 'hexadecimal';
        const isBinary = dropdown1 === 'binary';
    
        // Input validation
        const decimalRegex = /^-?\d+$/;
        const hexRegex = /^-?[0-9a-fA-F]+$/;
        const binaryRegex = /^-?[01]+$/;
    
        let isValid = false;
        if (isDecimal) {
            isValid = decimalRegex.test(input1);
        } else if (isHex) {
            isValid = hexRegex.test(input1);
        } else if (isBinary) {
            isValid = binaryRegex.test(input1);
        }
    
        if (!isValid) {
            result = 'Please enter a valid value for the selected input format';
        } else {
            let num;
    
            if (isDecimal) {
                num = parseInt(input1, 10);
            } else if (isHex) {
                num = parseInt(input1, 16);
            } else if (isBinary) {
                num = parseInt(input1, 2);
            }
    
            if (isNaN(num)) {
                result = 'Invalid number after parsing';
            } else {
                if (dropdown2 === 'decimal') {
                    result = num.toString(10);
                } else if (dropdown2 === 'hexadecimal') {
                    result = num.toString(16).toUpperCase();
                } else if (dropdown2 === 'binary') {
                    result = num.toString(2);
                } else {
                    result = 'Conversion type not supported';
                }
            }
        }
    
        document.getElementById('textbox2').value = result;
}
