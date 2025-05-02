function updateTempLabels() {
  const from = document.getElementById("dropdown1").value;
  const to = document.getElementById("dropdown2").value;
  const label1 = document.getElementById("label1");
  const label2 = document.getElementById("label2");

  label1.innerText = `Enter a temperature in ${(from)}`; //add capitalize in front of the (to/from) if needed 
  label2.innerText = `Converted temperature in ${(to)}`; 
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function convertTemperature() {
  const input = parseFloat(document.getElementById("textbox1").value);
  const from = document.getElementById("dropdown1").value;
  const to = document.getElementById("dropdown2").value;
  let result = '';

  if (isNaN(input)) {
    result = "Please enter a valid number";
  } else {
    // Convert to Celsius first
    let tempC;
    if (from === "celsius") tempC = input;
    else if (from === "fahrenheit") tempC = (input - 32) * (5 / 9);
    else if (from === "kelvin") tempC = input - 273.15;

    // Then convert from Celsius to target
    if (to === "celsius") result = tempC;
    else if (to === "fahrenheit") result = (tempC * 9 / 5) + 32;
    else if (to === "kelvin") result = tempC + 273.15;

    result = result.toFixed(2); // Limit decimalss
  }

  document.getElementById("textbox2").value = result;
}
