'use strict'

let universalBitCode = [];
let universalBitStringArray = [];
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
    let minDistance = bitCodeArray[0].length;
    for(let i = 0; i < bitCodeArray.length-1; i++) { //start with this parent element...
        for(let j = (i+1); j < bitCodeArray.length; j++) { //compare parent element with each one after
            let hamDistance = getHammingDistance(bitCodeArray[i], bitCodeArray[j]);
            if(minDistance > hamDistance) { //if the current distance is greater than calculated, replace it.
                minDistance = hamDistance;
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
    let bsOne = bitStringOne.split("");
    let bsTwo = bitStringTwo.split("");
    let distanceCount = 0;
    console.log("comparing: " + bitStringOne + " and " +bitStringTwo);
    for(let i = 0; i < bsOne.length; i++) { //iterate through the bits
        if(bsOne[i] != bsTwo[i]) {
            distanceCount++; 
        }
    }
    console.log("Hamming Distance: " + distanceCount);
    return distanceCount;
}

/**
 * Uses nearest neighbor method to determine corrections to bitstring using the universal bit codes.
 * @param {*} bitString bit string to correct
 * @returns most likely correction to the bit string
 */
function getCorrection(bitString) {
    let minDistance = universalBitStringArray.length;
    let mostLikelyCorrection = null;
    for(let i = 0; i < universalBitCode.length; i++) {
        let hamD = getHammingDistance(bitString, universalBitCode[i]);
        if(minDistance > hamD) {
            minDistance = hamD;
            mostLikelyCorrection = universalBitCode[i];
        }
    }
    return mostLikelyCorrection;
}

/**
 * Used to take the user's bit code form input, parse it into an array, and append that to the universal bit code array.
 * This function will also catch user input errors.
 * @param {*} unparsedBitCode the raw user input.
 */
function appendUniversalBitCode(unparsedBitCode) {
    errorFlag = false;
    let unparsedCharArray = 
        unparsedBitCode.replace(/\s+/g, '').split(''); //remove all white space and split into character array

    if(unparsedBitCode == "") {
        displayUserError("Please Enter a bit code.", 0);
        return;
    }

    for(let i = 0; i < unparsedCharArray.length; i++){
        if(unparsedCharArray[i] != "0" && unparsedCharArray[i] != "1" && unparsedCharArray[i] != ',') {
            displayUserError("Input invalid, please only provide bit strings seperated by commas, with or without spaces.", 0);
            return;
        }
    }
    let lengthTestArray = unparsedBitCode.replace(/\s+/g, '').split(','); //set universal as newly filtered and parsed array
    let testLength = lengthTestArray[0].length;
    console.log(lengthTestArray); //debug
    for(let i = 1; i < lengthTestArray.length; i++) {
        if(lengthTestArray[i].length != testLength) {
            displayUserError("Your bit code at index " + (i + 1) + " is not the same length as the rest of the " +
            "bit code. Please fix this and try again", 0);
        }
    }

    universalBitCode = lengthTestArray;
}

/**
 * Used to take user's bit string form input, parse it into a bit array, and append that to the universal
 * test string array
 * @param {*} unparsedBitString raw user input
 */
function appendUniversalBitStringArray(unparsedBitString) {
    errorFlag = false;
    let unparsedBitArray = 
        unparsedBitString.replace(/\s+/g, '').split(''); //remove all white space and split into character array

    if(unparsedBitString == "") {
        displayUserError("Please Enter a bit string.", 1);
        return;
    }

    for(let i = 0; i < unparsedBitArray.length; i++){
        if(unparsedBitArray[i] != "0" && unparsedBitArray[i] != "1") {
            displayUserError("Input invalid, please only provide bit strings.", 1);
            return;
        }
    }

    if(unparsedBitArray.length != universalBitCode[0].length) {
        displayUserError("Your bit code is not the same size as your bit code elements. Please fix this and try again.", 1);
        console.log("input error 3");
    }

    universalBitStringArray = unparsedBitArray;
}

/**
 * Function used to display an error to the user, typical for user input errors.
 * @param {*} errorMessage the error message to display to the user.
 */
function displayUserError(errorMessage, displayId) {
    errorFlag = true;
    if(displayId == 0) {
        $('#action_output_capabilities').innerHTML = errorMessage;
    } else if(displayId == 1) {
        $('#action_output_correction').innerHTML = errorMessage;
    }
}

/**
 * Formats and displays capability data for the universal bit code
 */
function displayCapabilities() {
    appendUniversalBitCode($('#code_input').value);

    if(errorFlag)
        return;

    let message =
        "Error Detection Capability: " + getErrorDetectionPossible(universalBitCode) + "<br/>" +
        "Error Correction Capability: " + getErrorCorrectionPossible(universalBitCode)
        ;
    displayMessageCapabilities(message);
}

/**
 * Formats and displays correction data for the universals
 */
function displayCorrection() {
    appendUniversalBitStringArray($('#test_code_input').value);
    let correction = getCorrection(universalBitStringArray.join(""));

    if(errorFlag)
        return;

    let message = "Error";
    if(getErrorCorrectionPossible(universalBitCode) >=
            getHammingDistance(universalBitStringArray.join(""), correction)) {
        message =
            "Errors found: " + getHammingDistance(universalBitStringArray.join(""), correction) + "<br/>" +
            "Correction: " + correction
        ;
    } else {
        message =
            "Errors found: " + getHammingDistance(universalBitStringArray.join(""), correction) + ", too many errors to correct.<br/>" +
            "Possible correction: " + correction
    }


    displayMessageCorrection(message);
}

/**
 * Displays a message on the HTML for capability section
 * @param {*} message message to display
 */
function displayMessageCapabilities(message) {
    $('#action_output_capabilities').innerHTML = message;
}

/**
 * Displays a message on the HTML for procedure section
 * @param {*} message message to display
 */
function displayMessageCorrection(message) {
    $('#action_output_correction').innerHTML = message;
}

/**
 * Adds button listeners for HTML buttons and directs calls
 */
function addButtonListeners() {
    const btns = document.querySelectorAll('button');
    btns.forEach((button) => {
        button.addEventListener('click', (e) => {
            switch(e.target.id) {
                case "capabilities_button":
                    displayCapabilities();
                break;
    
                case "correct_button":
                    displayCapabilities();
                    displayCorrection();
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