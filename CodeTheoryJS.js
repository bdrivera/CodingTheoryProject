'use strict'

let universalBitCode = [];
let errorFlag = false;

addButtonListeners();

/**
 * Returns the error detection capability of the given bit code
 * @param {*} bitCodeArray the bit code to be used for calculations
 * @returns number of errors the bit code can detect
 */
function getErrorDetectionPossible(bitCodeArray) {
    return (getMinimumDistance(bitCodeArray) - 1);
}

/**
 * Returns the error correction capability of the given bit code
 * @param {*} bitCodeArray the bit code to be used for calculations
 * @returns number of errors the bit code can detect
 */
function getErrorCorrectionPossible(bitCodeArray) {
    return Math.floor(getErrorDetectionPossible(bitCodeArray)/2);
}

/**
 * Returns the minimum Hamming distance in a given bit code
 * @param {*} bitCodeArray the bit code to be used for calculations
 * @returns minimum Hamming Distance
 */
function getMinimumDistance(bitCodeArray) {
    let minDistance = (bitCodeArray.length + 1);
    for(let i = 0; i < bitCodeArray.length; i++) { //start with this parent element...
        for(let j = i; i < bitCodeArray.length; i++) { //compare parent element with each one after
            let hamD = getHammingDistance(bitCodeArray[i], bitCodeArray[j]);
            if(hamD < minDistance) { //if the current distance is greater than calculated, replace it.
                minDistance = hamD;
            }
        }

    }

    return minDistance;
}

/**
 * Returns the Hamming distance between two given bit strings
 * @param {*} bitStringOne first bit string to be compared
 * @param {*} bitStringTwo second bit string to be compared
 * @returns the Hamming distance between the two bit strings
 */
function getHammingDistance(bitStringOne, bitStringTwo) {
    let bsOne = bitStringOne.split();
    let bsTwo = bitStringTwo.split();
    let distanceCount = 0;
    for(let i = 0; i < bsOne.length; i++) { //iterate through the bits
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
    errorFlag = false;
    let unparsedCharArray = 
        unparsedBitCode.replace(/\s+/g, '').split(''); //remove all white space and split into character array

    if(unparsedBitCode == "") {
        displayUserError("Please Enter a bit code.");
        console.log("input error 1");
        return;
    }

    for(let i = 0; i < unparsedCharArray.length; i++){
        if(unparsedCharArray[i] != "0" && unparsedCharArray[i] != "1" && unparsedCharArray[i] != ',') {
            displayUserError("Input invalid, please only provide bit strings seperated by commas, with or without spaces.");
            console.log("input error 2: character " + unparsedCharArray[i]); //debug
            return;
        }
    }
    let lengthTestArray = unparsedBitCode.split(','); //set universal as newly filtered and parsed array
    let testLength = lengthTestArray[0].length;
    console.log(lengthTestArray); //debug
    for(let i = 1; i < lengthTestArray.length; i++) {
        if(lengthTestArray[i].length != testLength) {
            displayUserError("Your bit code at index " + (testLength) + " is not the same length as the rest of the " +
            "bit code. Please fix this and try again");
            console.log("input error 3");
        }
    }

    universalBitCode = lengthTestArray;

}

/**
 * Function used to display an error to the user, typical for user input errors.
 * @param {*} errorMessage the error message to display to the user.
 */
function displayUserError(errorMessage) {
    errorFlag = true;
    $('#action_output').innerHTML = errorMessage;
}

function displayCapabilities() {
    appendUniversalBitCode($('#codeInput').value);
    if(!errorFlag) {
        let message =
            "Error Detection Capability: <br>" + getErrorCorrectionPossible(universalBitCode) +
            + "Error Correction Capability: " + getErrorDetectionPossible(universalBitCode);
    }
}

/**
 * Constant button listeners
 */
function addButtonListeners() {
    const btns = document.querySelectorAll('button');
    btns.forEach((button) => {
        button.addEventListener('click', (e) => {
            switch(e.target.id) {
                case "updateCapabilities":
                    displayCapabilities();
                break;
    
                case "performErrorProcedure":
                break;
            }
        });
    });
}

/**
 * Function that queries and returns the element.
 * @param {*} n element to query
 * @returns queried element
 */
function $(n) { return document.querySelector(n); }