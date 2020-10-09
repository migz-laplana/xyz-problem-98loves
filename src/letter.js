export const renderImage = (inputs) => {

    const { size, pattern, direction } = inputs;
    const inputSize = Number(size);

    //initialize the overall image! array contains sub-arrays(individual row-lines of the big image)
    let allRows = []


    //------------------FOR HORIZONTAL MODE--------------------------
    if (direction === "horizontal") {

        //ref indexes for placement of o
        let start = 0;
        let end = inputSize - 1;
        let mid = end / 2;

        //looper for each row of the image
        for (let i = 0; i < (inputSize); i++) {

            let row = [];  //an array w/ chars of each line of overall image

            //const multiples will equal to array.length of inputPattern
            for (let copy = 0; copy < pattern.length; copy++) {   //FOR EACH LETTER
                //this should loop twice

                //Adding it to the overall row
                switch (pattern[copy]) {
                    case "X":
                        row.push(...singleLetterLine_X(inputSize, start, end))
                        break;
                    case "Y":
                        row.push(...singleLetterLine_Y(inputSize, start, end, mid, i))
                        break;
                    case "Z":
                        row.push(...singleLetterLine_Z(inputSize, start, end, i))
                        break;
                    default:
                        break;
                }
            }
            allRows.push(row); //pushing the line to overall array

            //ref indexes move once after each row render
            start++;
            end--;

        }
    }

    //----------------------FOR VERTICAL MODE----------------------------
    if (direction === "vertical") {

        //lets make lotsa arrays of index pairs with a for loop!
        let indexPairs = [];

        //make lotsa objects that contain indexes for reference use, and push each to array indexPairs
        for (let letter = 0; letter < pattern.length; letter++) {
            let indexPairObj = {
                letter: pattern[letter],
                start: 0,
                end: (inputSize - 1),
                mid: (inputSize - 1) / 2,
                i: 0
            }
            indexPairs.push(indexPairObj);
        }

        let currentLetter = 0;

        //looper for each row of the image
        for (let i = 0; i < (inputSize * pattern.length); i++) {
            //^^^^endpoint is pattern.length bc letters will render vertically, thus multiplying the row count of the overll image

            let row = [];  //an array w/ chars of each line of overall image

            let { letter, start, end, mid, i } = indexPairs[currentLetter];

            switch (letter) {
                case "X":
                    row.push(...singleLetterLine_X(inputSize, start, end))
                    break;
                case "Y":
                    row.push(...singleLetterLine_Y(inputSize, start, end, mid, i))
                    break;
                case "Z":
                    row.push(...singleLetterLine_Z(inputSize, start, end, i))
                    break;
                default:
                    break;
            }

            allRows.push(row); //pushing the line to overall array

            indexPairs[currentLetter].start++;
            indexPairs[currentLetter].end--;
            indexPairs[currentLetter].i++;

            //indexes have exceeded range; onto the next letter!
            if (indexPairs[currentLetter].end === -1) {

                //moves on to the next letter in the pattern specified
                currentLetter++;
            }
        }

    }

    return allRows;
}




//-----------------------------------SEPARATE FUNCTIONS!------------------------------------


const singleLetterLine_X = (inputSize, startIndex, endIndex) => {
    let row = [];  //an array w/ chars of each line

    //Writing one horizontal line of the letter!
    for (let j = 0; j < (inputSize); j++) {
        if (j === startIndex || j === endIndex) {
            row.push("o");
        } else {
            row.push(" ");
        }
    }
    row.push(" ");
    row.push(" ");
    return row;
}


const singleLetterLine_Y = (inputSize, startIndex, endIndex, midIndex, rootRowCounter) => {
    let row = [];  //an array w/ chars of each line

    //Writing one horizontal line of the letter!
    for (let j = 0; j < inputSize; j++) {

        //if row index of letter is above midpoint:
        if (rootRowCounter < midIndex) {

            // do this letter row pattern (X's pattern)
            if (j === startIndex || j === endIndex) {
                row.push("o");
            } else {
                row.push(" ");
            }

        } else {   //if row index is now at midpoint below:

            //do this letter row pattern (tail of Y)
            if (j === midIndex) {
                row.push("o");
            } else {
                row.push(" ");
            }
        }
    }
    row.push(" ");
    row.push(" ");
    return row;
}


const singleLetterLine_Z = (inputSize, startIndex, endIndex, rootRowCounter) => {
    let row = [];  //an array w/ chars of each line

    //Writing one horizontal line of the letter!
    for (let j = 0; j < inputSize; j++) {

        //if letter row index is at topmost or bottom
        if (rootRowCounter === 0 || rootRowCounter === (inputSize - 1)) {

            row.push("o");
        }

        //if letter row index at the body of Z
        else {
            if (j === endIndex) {
                row.push("o");
            } else {
                row.push(" ");
            }
        }
    }
    row.push(" ");
    row.push(" ");
    return row;
}

