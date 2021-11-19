'use strict'

let universalBitString = [];
let errorFlag = false;

/**
 * Returns the error detection capability of the given bit string
 * @param {*} bitString the bit string to be used for calculations
 * @returns number of errors the bit string can detect
 */
function errorDetectionPossible(bitString) {
    return bitString; //change later
}

/**
 * Returns the error correction capability of the given bit string
 * @param {*} bitString the bit string to be used for calculations
 * @returns number of errors the bit string can detect
 */
function errorCorrectionPossible(bitString) {
    return bitString; //change later
}

/**
 * Used to take the user's form input, parse it into an array, and append that to the universal bit string array.
 * This function will also catch user input errors.
 * @param {*} unparsedBitString the raw user input.
 */
function appendUniversalBitString (unparsedBitString) {
    let unparsedCharArray = 
        unparsedBitString.replace(/\s+/g, '').split(''); //remove all white space and split into character array

    for(let i = 0; i < unparsedCharArray.length; i++){
        if(!unparsedCharArray[i] == '0' || !unparsedCharArray[i] == '1' || !unparsedCharArray[i] == ',') {
            giveUserError("Input invalid, please only provide bit strings seperated by commas, with or without spaces.");
            return;
        }
    }

    universalBitString = unparsedBitString.split(','); //set universal as newly filtered and parsed array
}

/**
 * Function used to display an error to the user, typical for user input errors.
 * @param {*} errorMessage the error message to display to the user.
 */
function giveUserError(errorMessage) {
    errorFlag = true;
    //add code here for displaying error
}