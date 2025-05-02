//  conversion logic when the button is clicked
function convertDistance() {
    const input = parseFloat(document.getElementById("textbox1").value); // Input value
    const from = document.getElementById("dropdown1").value; // From unit
    const to = document.getElementById("dropdown2").value;   // To unit
    let result = ''; // Variable to store the final result
  
    // Check if  valid (ei:number)
    if (isNaN(input)) {
        result = "Please enter a valid number"; 
    } else {
        let inches;

        // Conversion logic: Convert the input to inches
        if (from === "inches") inches = input;
        else if (from === "feet") inches = input * 12;
        else if (from === "yards") inches = input * 36;
        else if (from === "miles") inches = input * 63360;
  
        // Conversion logic: Convert from inches to the target unit
        if (to === "inches") result = inches;
        else if (to === "feet") result = inches / 12;
        else if (to === "yards") result = inches / 36;
        else if (to === "miles") result = inches / 63360;
  
        result = result.toFixed(2); // 2 decimal places
    }
    document.getElementById("textbox2").value = result;
}
// Function to update the labels based on selected units
//forgot to add this function in earlier sorry!!
function updateDistanceLabels() {
    const from = document.getElementById("dropdown1").value;
    const to = document.getElementById("dropdown2").value;
    const label1 = document.getElementById("label1");
    const label2 = document.getElementById("label2");

    label1.innerText = `Enter a distance in ${from}`;
    label2.innerText = `Converted distance in ${to}`;
}

