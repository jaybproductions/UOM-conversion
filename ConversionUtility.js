/*1.0 GALLON (G) = 3.8 LITERS (L)
1.0 INCHES (IN) = 2.54 CENTIMETERS (CM)
1.0 GALLON (G) = 8.0 POUNDS (LB)
1.0 FOOT (FT) = 12.0 INCHES (IN)
1.0 YARD (YD) = 3.0 FEET (FT)
1.0 KILOGRAM (KG) = 2.2 POUNDS (LB) */
// module imports to be able to read from a line
const readline = require("readline");

//default readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Unit Conversion Class
class UnitConversionUtility {
  // private valid conversions member
  #validConversions = {
    G: ["L", "LB"],
    IN: ["CM"],
    FT: ["IN", "CM"],
    YD: ["FT"],
    KG: ["LB"],
    L: ["G"],
    CM: ["IN"],
  };

  //default constructor is blank
  constructor() {}

  // method to prompt the user for input and handle the conversions
  promptUser = () => {
    rl.question("Please enter the number and the UOM...\n", (input) => {
      // recursively call the prompt user function until the user decides to exit
      if (input === "exit") {
        // stop the call
        return rl.close();
      } else {
        // get the split input using the parseInput function
        const parsedArray = this.parseInput(input);

        //input is validated, we may continue
        if (this.validateInput(parsedArray)) {
          // get each of the needed values
          const originalValue = parsedArray[0];
          const currentUOM = parsedArray[1].toUpperCase();
          const convertUOM = parsedArray[2].toUpperCase();
          // handle the conversion
          const convertedUOM = this.handleConversion(
            originalValue,
            currentUOM,
            convertUOM
          );
          // output the converted measurements
          const finalOutput = this.formatConversion(convertedUOM);
          console.log(finalOutput + " " + convertUOM);
          // call prompt user again
          this.promptUser();
        } else {
          // in the case the input could not be used, let them know and prompt the user again
          console.log("Input could not be validated, please try again. ");
          this.promptUser();
        }
      }
    });
  };

  // simple method to parse the input into a useable array to do the conversions
  parseInput = (inputString) => {
    const stringArray = inputString.toUpperCase().split(" ");
    return stringArray;
  };

  validateInput = (inputArray) => {
    // basic validation of the length of the split array. if we don't have all the needed inputs, we cannot do the conversion.
    if (inputArray.length !== 3) {
      return false;
      // also check if the key is not in the validConversions object
    } else if (!(inputArray[1].toUpperCase() in this.#validConversions)) {
      return false;
      // validate that the current conversions are available in our list based on original prompt
    } else if (!this.#validConversions[inputArray[1]].includes(inputArray[2])) {
      return false;
    }

    return true;
  };

  // handles the conversion of original UOM
  handleConversion = (originalUnits, currentUOM, convertedUOM) => {
    let finalConversion;
    switch (currentUOM) {
      case "L":
        // convert L to G
        if (convertedUOM === "G") {
          finalConversion = originalUnits * 0.264172;
        }
        break;
      case "CM":
        // convert CM to IN
        if (convertedUOM === "IN") {
          finalConversion = originalUnits * 0.3937;
        }
        break;
      case "LB":
        // conversion from LB to G
        if (convertedUOM === "G") {
          finalConversion = originalUnits * 8.35;
        }
        break;
      case "IN":
        // handleConversion of IN to FT
        if (convertedUOM === "FT") {
          finalConversion = originalUnits * 0.083333;
        } else if (convertedUOM === "CM") {
          finalConversion = originalUnits * 2.54;
        }
        break;
      case "FT":
        // handle conversion of FT to IN
        if (convertedUOM === "IN") {
          finalConversion = originalUnits * 12;
        } // converting FT to CM
        else if (convertedUOM === "CM") {
          finalConversion = originalUnits * 30.48;
        }
        break;
      case "G":
        // do G to L conversion
        if (convertedUOM === "L") {
          finalConversion = originalUnits / 0.264172;
        } // converting G to LB
        else if (convertedUOM === "LB") {
          finalConversion = originalUnits * 8.0;
        }
        break;
      case "YD":
        // converted YD to FT
        if (convertedUOM === "FT") {
          finalConversion = originalUnits * 3.0;
        }
        break;
      case "KG":
        // converting LB to KG
        if (convertedUOM === "LB") {
          finalConversion = originalUnits * 2.2;
        }
        break;
    }

    return finalConversion;
  };

  // this will format it to the nearest hundreths
  formatConversion = (convertedValue) => {
    return Math.round(convertedValue * 100) / 100;
  };
}

//exporting the module to be used in the main program file
module.exports = UnitConversionUtility;
