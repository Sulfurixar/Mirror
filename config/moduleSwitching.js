const { isNull } = require('lodash');

/*This function takes in a module name as a string and an integer that determines
* whether the module is to be removed or added to the config.js file*/
function moduleSwitching(moduleName, truthValue) {

    if (truthValue !== 1 && truthValue !== 0) {
        return console.log("The truth value has to be 0 or 1");
    }

    const fs = require('fs');

    let moduleDefaultsbuffer = [], extractedBlock = [], configBuffer = [];
    let Extracting = 0, extractingStart = null, extractingStop = null;
    let moduleNameSearch = [];

    let i = 0, j = 0, bracketCounter = 0;
    let squareBracketCounter = 0, sBCstart = 0, sBCstop = 0;

    let moduleLocationInConfig = [];

    let isModuleThere = 0;

    configBuffer = readFileToMemory('./config.js');
    for (let i = 0; i < configBuffer.length; i++) {

        //Scan config.js file for the requested module
        if (getIndicesOf("module:", configBuffer[i]).length !== 0 &&
            getIndicesOf(moduleName, configBuffer[i], 1).length !== 0) {
            isModuleThere = 1;
            bracketCounter = 1
            //Mark the spot where the module starts, when it is found in the config file
            while (getIndicesOf("{", configBuffer[i - j]).length === 0) {
                j++;
                moduleLocationInConfig[0] = i - j;
            }

        }
        //Start counting brackets to find where the module ends in the config file
        if (bracketCounter !== 0) {
            bracketCounter += getIndicesOf("{", configBuffer[i]).length -
                getIndicesOf("}", configBuffer[i]).length;
            moduleLocationInConfig[1] = i;
        }

        /*While confirming, whether the module is in the file, this part
        finds the place to add the module information in case it isn't*/
        if (squareBracketCounter !== 0) {
            squareBracketCounter += getIndicesOf("[", configBuffer[i]).length -
                getIndicesOf("]", configBuffer[i]).length;
            sBCstop = i;
        }

        if (getIndicesOf("modules:", configBuffer[i]).length !== 0 &&
            getIndicesOf("[", configBuffer[i], 1).length !== 0) {
            squareBracketCounter = 1;
            sBCstart = i;
        }
    }

    j = 0; bracketCounter = 0; i = 0;
    
    //Add text to config.js file
    if (truthValue === 1) {
        try {
            //If the module is already in the config.js file and you try to add it
            if (isModuleThere === 1) {
                return console.log("The module \"" + moduleName + "\" is already in the config.");
            }

            moduleDefaultsbuffer = readFileToMemory('./moduledefaults.txt');
            //Cycle through the default module file to find the required block of text
            for (let i = 0; i < moduleDefaultsbuffer.length; i++) {
                moduleNameSearch[0] = moduleDefaultsbuffer[i].search("module:");
                moduleNameSearch[1] = moduleDefaultsbuffer[i].search(moduleName);

                //moduleName is found in the newest line
                if (moduleNameSearch[1] !== -1 && moduleNameSearch[0] !== -1) {
                    // console.log(moduleDefaultsbuffer[i]);
                    // console.log(moduleNameSearch);
                    Extracting = 1;
                    bracketCounter = 1;
                }

                //Find the start and end for the block that is to be copied
                if (Extracting === 1) {
                    while (getIndicesOf("{", moduleDefaultsbuffer[i - j]).length === 0 &&
                        isNull(extractingStart) === 1) {
                        j++;
                    }
                    if (isNull(extractingStart)) {
                        extractingStart = i - j;
                        j = 0;
                    }

                    if (bracketCounter !== 0) {
                        bracketCounter += getIndicesOf("{", moduleDefaultsbuffer[i]).length -
                            getIndicesOf("}", moduleDefaultsbuffer[i]).length;
                        extractingStop = i;
                    }
                }
            }

            //Copy the relevant block of text to the config.js file
            for (let i = 0; i <= extractingStop - extractingStart; i++) {
                extractedBlock[i] = moduleDefaultsbuffer[extractingStart + i];
            }

            for (let i = 0; i < extractedBlock.length; i++) {
                configBuffer.splice(sBCstop + i, 0, extractedBlock[i]);
            }

            writeToFile(configBuffer, "config.js");

        }
        catch (err) {
            console.error(err);
        }
    }

    //Remove text from config.js file
    else if (truthValue === 0) {
        try {
            if (isModuleThere === 0) {
                return console.log("The module was not found so there is nothing to remove.");
            }

            for (let i = 0; i < moduleLocationInConfig[1]-moduleLocationInConfig[0]+1; i++) {
                configBuffer.splice(moduleLocationInConfig[0], 1);
            }
            writeToFile(configBuffer, "./config.js");
        // eslint-disable-next-line no-empty
        } catch (error) {

        }
    }
}

/*Takes two strings as an argument and tries to find the occurences of the first string
in the second string*/
function getIndicesOf(searchStr, str, caseSensitive = 0) {
    let searchStrLen = searchStr.length;
    if (searchStrLen === 0) {
        return [];
    }
    let startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}

/*Writes an array to file while adding newlines throughout*/
function writeToFile(array, path) {
    const fs = require('fs');
    let file = fs.createWriteStream(path);
    file.on('error', function (err) { /* error handling */ });
    array.forEach(function (line) { file.write(line + '\n'); });
    file.end();
}

/*Reads entire file to memory with every line added as a separate array element*/
function readFileToMemory(path) {
    // read contents of the file
    let buffer = [];
    const fs = require('fs');
    let i = 0;
    const data = fs.readFileSync(path, 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // store all lines
    lines.forEach((line) => {
        //console.log(line);
        buffer[i] = line;
        i++;
    });
    return buffer;
}
moduleSwitching("compliments", 1);