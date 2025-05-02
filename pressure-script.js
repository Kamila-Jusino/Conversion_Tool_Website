function convertPressure() {
    const input = document.getElementById('textbox1').value.trim();
    const fromUnit = document.getElementById('dropdown1').value;
    const toUnit = document.getElementById('dropdown2').value;

    let inputValue = parseFloat(input);

    if (isNaN(inputValue)) {
        document.getElementById('textbox2').value = 'Please enter a valid number';
        return;
    }

    //convert everything to Pascals first
    const toPa = {
        mmHg: 133.322,
        atm: 101325,
        torr: 133.322,
        pa: 1
    };

    //convert Pascals to desired output
    const fromPa = {
        mmHg: 1 / 133.322,
        atm: 1 / 101325,
        torr: 1 / 133.322,
        pa: 1
    };

    //convert input to Pascals
    let valueInPa = inputValue * toPa[fromUnit];

    //convert Pascals to target unit
    let result = valueInPa * fromPa[toUnit];

    document.getElementById('textbox2').value = result.toFixed(4); // show 4 decimal places
}