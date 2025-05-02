function updateEnergyLabels() {
    const from = document.getElementById("dropdown1").value;
    const to = document.getElementById("dropdown2").value;
    const label1 = document.getElementById("label1");
    const label2 = document.getElementById("label2");
  
    label1.innerText = `Enter an energy value in ${capitalize(from)}`;
    label2.innerText = `Converted energy value in ${capitalize(to)}`;
  }
  
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  function convertEnergy() {
    const input = parseFloat(document.getElementById("textbox1").value);
    const from = document.getElementById("dropdown1").value;
    const to = document.getElementById("dropdown2").value;
    let result = '';
  
    if (isNaN(input)) {
      result = "Please enter a valid number above.";
    } else {
      // Convert to Joules first
      let energyJ;
      if (from === "cal") energyJ = input * 4.184;
      else if (from === "J") energyJ = input;
      else if (from === "eV") energyJ = input * 1.60218e-19;
  
      // Then convert from Joules to target
      if (to === "cal") result = energyJ / 4.184;
      else if (to === "J") result = energyJ;
      else if (to === "eV") result = energyJ / 1.60218e-19;
  
      result = Number(result).toExponential(4); // outputs in scientific notation
    }
  
    document.getElementById("textbox2").value = result;
  }