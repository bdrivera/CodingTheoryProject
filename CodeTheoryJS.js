'use strict'

let universalBitString = [];

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
    unparsedBitString.replace(/\s+/g, ''); //remove all white space from string
    unparsedCharString = unparsedBitString.split(''); //split into character array

    for(let i = 0; i < unparsedCharString.length; i++){
        if(!unparsedCharString[i] == '0' || !unparsedCharString[i] == '1' || !unparsedCharString[i] == ',') {
            
        }
    }

    workingBitString = unparsedBitString.split(',');
    for(let i = 0; i < workingBitString.length; i++) {
        if(workingBitString[i].contains() )
    }
}

/**
 * Function used to display an error to the user, typical for user input errors.
 * @param {*} errorMessage the error message to display to the user.
 */
function giveUserError(errorMessage) {

}