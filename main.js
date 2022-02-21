/*1.0 GALLON (G) = 3.8 LITERS (L)
1.0 INCHES (IN) = 2.54 CENTIMETERS (CM)
1.0 GALLON (G) = 8.0 POUNDS (LB)
1.0 FOOT (FT) = 12.0 INCHES (IN)
1.0 YARD (YD) = 3.0 FEET (FT)
1.0 KILOGRAM (KG) = 2.2 POUNDS (LB) */

const readline = require("readline");

// a structure of current valid conversion based on the prompt given, more can be added as needed.
// this gives us the ability to add future valid conversions as needed
const validConversions = {
  G: ["L", "LB"],
  IN: ["CM"],
  FT: ["IN", "CM"],
  YD: ["FT"],
  KG: ["LB"],
  L: ["G"],
  CM: ["IN"],
};

//console.log(validConversions["G"].includes("FG"));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// simple function to parse the input into a useable array to do the conversions
const parseInput = (inputString) => {
  const stringArray = inputString.split(" ");
  return stringArray;
};

const validateInput = (inputArray) => {
  // basic validation of the length of the split array. if we don't have all the needed inputs, we cannot do the conversion.
  if (inputArray.length !== 3) {
    return false;
    // validate that the current conversions are available in our list based on ooriginal prompt
    // ignoring case
  } else if (
    !validConversions[inputArray[1].toUpperCase()].includes(
      inputArray[2].toUpperCase()
    )
  ) {
    return false;
  }

  return true;
};

// handle the conversions based on the input given and what options we have available in our "validConversions"
// this is a portion I feel can definitely be cleaned up given more thought and time
// simple switch case to determine the appropiate conversion based on the input
const handleConversion = (originalUnits, currentUOM, convertedUOM) => {
  switch (currentUOM) {
    case "L":
      // convert L to G
      if (convertedUOM === "G") {
        return originalUnits * 0.264172;
      }
    case "CM":
      // convert CM to IN
      if (convertedUOM === "IN") {
        return originalUnits * 0.3937;
      }

    case "LB":
      // conversion from LB to G
      if (convertedUOM === "G") {
        return originalUnits * 8.35;
      }
    case "IN":
      // handleConversion of IN to FT
      if (convertedUOM === "FT") {
        return originalUnits * 0.083333;
      } else if (convertedUOM === "CM") {
        return originalUnits * 2.54;
      }
    case "FT":
      // handle conversion of FT to IN
      if (convertedUOM === "IN") {
        return originalUnits * 12;
      } // converting FT to CM
      else if (convertedUOM === "CM") {
        return originalUnits * 30.48;
      }
    case "G":
      // do G to L conversion
      if (convertedUOM === "L") {
        return originalUnits / 0.264172;
      } // converting G to LB
      else if (convertedUOM === "LB") {
        return originalUnits * 8.0;
      }
    case "YD":
      // converted YD to FT
      if (convertedUOM === "FT") {
        return originalUnits * 3.0;
      }
    case "KG":
      // converting LB to KG
      if (convertedUOM === "LB") {
        return originalUnits * 2.20462;
      }
  }
};

// this will format it to the nearest hundreths
const formatConversion = (convertedValue) => {
  return Math.round(convertedValue * 100) / 100;
};

// main meat of the code happens here
// prompt the user for a new input and recursively call it until the users chooses to exit the program
const promptUser = () => {
  rl.question("Please enter the number and the UOM...", (input) => {
    // recursively call the prompt user function until the user decides to exit
    if (input === "exit") {
      // stop the call
      return rl.close();
    } else {
      // get the split input using the parseInput function
      const parsedArray = parseInput(input);

      //input is validated, we may continue
      if (validateInput(parsedArray)) {
        // get each of the needed values
        const originalValue = parsedArray[0];
        const currentUOM = parsedArray[1].toUpperCase();
        const convertUOM = parsedArray[2].toUpperCase();
        // handle the conversion
        const convertedUOM = handleConversion(
          originalValue,
          currentUOM,
          convertUOM
        );
        // output the converted measurements
        finalOutput = formatConversion(convertedUOM);
        console.log(finalOutput + " " + convertUOM);
        // call prompt user again
        promptUser();
      } else {
        // in the case the input could not be used, let them know and prompt the user again
        console.log("Input could not be validated, please try again. ");
        promptUser();
      }
    }
  });
};

//main function
const main = async () => {
  promptUser();
};

// running main function
main();
