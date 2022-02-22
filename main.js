// main utility class import
const UnitConversionUtility = require("./ConversionUtility");

//main function
const main = () => {
  // new utility class
  const utility = new UnitConversionUtility();
  utility.promptUser();
};

// running main function
main();
