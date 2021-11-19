'use strict'

let universalBitCode = [];
let errorFlag = false;

/**
 * Returns the error detection capability of the given bit code
 * @param {*} bitCode the bit code to be used for calculations
 * @returns number of errors the bit code can detect
 */
function errorDetectionPossible(bitCode) {
    
    return bitCode;
}

/**
 * Returns the error correction capability of the given bit code
 * @param {*} bitCode the bit code to be used for calculations
 * @returns number of errors the bit code can detect
 */
function errorCorrectionPossible(bitCode) {
    return bitCode //change later
}

function getMinimumDistance(bitCode) {

}

function getHammingDistance(bitStringOne, bitStringTwo) {
    let bsOne = bitStringOne.split();
    let bsTwo = bitStringTwo.split();
    let distanceCount = 0;
    for(let i = 0; i < bsOne.length; i++) {
        if(bsOne[i] != bsTwo[i]) {
            distanceCount++; 
        }
    }
    return distanceCount;
}

/**
 * Used to take the user's form input, parse it into an array, and append that to the universal bit code array.
 * This function will also catch user input errors.
 * @param {*} unparsedBitCode the raw user input.
 */
function appendUniversalBitCode (unparsedBitCode) {
    let unparsedCharArray = 
        unparsedBitCode.replace(/\s+/g, '').split(''); //remove all white space and split into character array

    for(let i = 0; i < unparsedCharArray.length; i++){
        if(!unparsedCharArray[i] == '0' || !unparsedCharArray[i] == '1' || !unparsedCharArray[i] == ',') {
            giveUserError("Input invalid, please only provide bit strings seperated by commas, with or without spaces.");
            return;
        }
    }
    let lengthTestArray = unparsedBitCode.split(','); //set universal as newly filtered and parsed array
    let testLength = lengthTestArray[0].length;
    for(i = 1; i < lengthTestArray.length; i++) {
        if(lengthTestArray[i] != testLength) {
            giveUserError("Your bit code at index " + (testLength + 1) + " is not the same length as the rest of the " +
            "bit code. Please fix this and try again");
        }
    }

    universalBitCode = lengthTestArray;

}

/**
 * Function used to display an error to the user, typical for user input errors.
 * @param {*} errorMessage the error message to display to the user.
 */
function giveUserError(errorMessage) {
    errorFlag = true;
    //add code here for displaying error
}