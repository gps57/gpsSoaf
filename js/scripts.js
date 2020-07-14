$("#doSoafBtn").on("click", function () {
    let numListField = document.getElementById("numListInput");
    let inputStr = numListField.value;
    let kNum = parseInt($("#kNumber").val());
    let firstNum = 0;
    let secondNum = 0;
    let numOfSolutions = 0;
    let outMsg = "";

    if (isNaN(kNum)) {
        let outArea = document.getElementById("outArea");
        outArea.classList.add("text-danger", "font-weight-bold");
        outArea.innerHTML = "Error - You must enter a K number."
        return;
    }

    if (kNum > 100) {
        let outArea = document.getElementById("outArea");
        outArea.classList.add("text-danger", "font-weight-bold");
        outArea.innerHTML = "Error - The range of acceptable values for the K number is from 1 to 100."
        return;
    }

    // remove all letters, white spaces, and special characters from string. Leave behind numbers and the comma.
    numListStr = inputStr.replace(/[^0-9/,]/g, '');

    // now convert the string of numbers to an array of numbers
    let numListArray = numListStr.split(',').map(Number);

    for (let i = 0; i < numListArray.length - 1; i++) {
        firstNum = numListArray[i];
        if (firstNum > kNum)
            continue;

        let secondNum = kNum - firstNum;
        console.log("firstNum is: " + firstNum);
        console.log("secondNum is: " + secondNum);
        if (numListArray.indexOf(secondNum, i + 1) > -1) {
            // a solution was found
            numOfSolutions++;
            outMsg += `${firstNum} + ${secondNum} = ${kNum}, is a solution found in this list of numbers.<br />`;
        }
    }

    let frontMsg = "";
    if (!numOfSolutions) {
        outMsg = `<span class='text-danger font-weight-bold'>No solution</span> for a K value of ${kNum} was found.`;
    } else {
        if (numOfSolutions == 1) {
            frontMsg = `<span class='text-success font-weight-bold'>${numOfSolutions} solution was found</span> for a K value of ${kNum}.<br />`
        } else {
            frontMsg = `<span class='text-success font-weight-bold'>${numOfSolutions} solutions were found</span> for a K value of ${kNum}.<br />`
        }
    }

    let outArea = document.getElementById("outArea");
    // just in case any classes are left over from a pervious error condition
    outArea.classList.remove("text-danger", "font-weight-bold");

    let str = frontMsg.concat(outMsg);
    outArea.innerHTML = str;

});