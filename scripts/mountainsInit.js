/* Script to dynamically populate the mountain list during onload and display brief note based on the selection
 * Author: HartCode programmer
 * Date: 08/09/2019
 */
/* This function is called during window onload of the mountain page and 
 * assign function to event handler dropdown
 * No parameters
 * Calls: function checkUserInput(), loadMountainListDropDown() and listMenuOption()
 */
"Use Strict";

window.onload = function() {
    const selectMountainListField = document.getElementById("selectMountainList");
    let errorMsgIdField = document.getElementById("errorMsgId");
    let listOfMountainObjects;

    // Load dropdown from JSON data file
    $.getJSON("data/mountains.json", function(data) {
        listOfMountainObjects = data;
        loadMountainListDropDown(listOfMountainObjects);
    });

    //Event handler function to assign for onclick
    selectMountainListField.onchange = function() {
        let isValid = checkUserInput(selectMountainListField, errorMsgIdField);
        if (isValid) {
            listMenuOption(listOfMountainObjects, selectMountainListField);
            document.getElementById("errorMsgId").innerHTML = " ";
        } else {
            document.getElementById("itemlist").innerHTML = " ";
        }
    };
};


/* Event Handler function to load mountain menu dropdown during windows Onload 
 * @param = JSON loaded array (javascript object array - 2D) - contains list of mountains
 * calls to None
 */
function loadMountainListDropDown(listOfMountainObjects) {
    for (let i = 0; i < listOfMountainObjects.mountains.length; i++) {
        let addOptionItem = document.createElement("option");
        addOptionItem.value = listOfMountainObjects.mountains[i].name;
        addOptionItem.text = listOfMountainObjects.mountains[i].name;
        let parentDiv = document.getElementById("selectMountainList");
        parentDiv.appendChild(addOptionItem);
    }
}

/* Event Handler function to load menu dropdown during windows Onload 
 * @param = JSON loaded array (javascript object array - 2D) - contains list of mountains  
 * @param = selectCategoryField (string - option dropdown) - contains the selected mountain  
 * calls to None
 */
function listMenuOption(listOfMountainObjects, selectMountainListField) {
    let selectMountainList = selectMountainListField.options[selectMountainListField.selectedIndex].value;
    let table = document.getElementById("itemlist");
    table.className = "table table-responsive table-striped mt-3 border";
    // thead is created though it is not created due to 1 mountain display to follow standard
    let thead = document.querySelectorAll("thead");
    if (thead.length == 0) {
        let head = table.createTHead();
        head.classList.add("tableBorder");
        row = head.insertRow(0);
    }

    // create tbody if it does not exist and assign an ID, if already exists, clear them  
    // table.innerHTML = " "; use if we want to clear the whole table
    let tbody = document.getElementById("mountainBodyListId");
    if (tbody != null) {
        tbody.innerHTML = " ";
        row = tbody.insertRow(0);
        tbody.classList.add("tableBorder");
    } else {
        tableBody = table.createTBody();
        tableBody.id = "mountainBodyListId";
        row = tableBody.insertRow(0);
        tableBody.classList.add("tableBorder");
    }

    // Loop through mountain menu items to read through 2D array and build table to show mountain details  
    for (let i = 0; i < listOfMountainObjects.mountains.length; i++) {
        if (selectMountainList == listOfMountainObjects.mountains[i].name) {
            let cellNameTitle = row.insertCell(0);
            cellNameTitle.innerHTML = "Name";
            let cellName = row.insertCell(1);
            cellName.innerHTML = listOfMountainObjects.mountains[i].name;
            row = table.insertRow(table.rows.length);
            let cellElevationTitle = row.insertCell(0);
            cellElevationTitle.innerHTML = "Elevation";
            let cellElevation = row.insertCell(1);
            cellElevation.innerHTML = listOfMountainObjects.mountains[i].elevation;
            row = table.insertRow(table.rows.length);
            let cellEffortTitle = row.insertCell(0);
            cellEffortTitle.innerHTML = "Effort";
            let cellEffort = row.insertCell(1);
            cellEffort.innerHTML = listOfMountainObjects.mountains[i].effort;
            row = table.insertRow(table.rows.length);
            let cellImgTitle = row.insertCell(0);
            cellImgTitle.innerHTML = "Images";
            let imgElement = document.createElement("img");
            cellImg = row.insertCell(1);
            imgElement.src = "images/mountains/" + listOfMountainObjects.mountains[i].img;
            imgElement.alt = listOfMountainObjects.mountains[i].name;
            cellImg.appendChild(imgElement);
            row = table.insertRow(table.rows.length);
            cellDescTitle = row.insertCell(0);
            cellDescTitle.innerHTML = "Description";
            cellDesc = row.insertCell(1);
            cellDesc.innerHTML = listOfMountainObjects.mountains[i].desc;
            row = table.insertRow(table.rows.length);
            cellCoordsTitle = row.insertCell(0);
            cellCoordsTitle.innerHTML = "Coords";
            cellCoords = row.insertCell(1);
            cellCoords.innerHTML = '"lat": ' + listOfMountainObjects.mountains[i].coords.lat + "<br>" + ' "lng": ' +
                listOfMountainObjects.mountains[i].coords.lng;
            row = table.insertRow(table.rows.length);
            // with JSON retrieve the sunset and sunrise based on the latitude and longitude
            let url = "https://api.sunrise-sunset.org/json?lat=" + listOfMountainObjects.mountains[i].coords.lat + "&lng=" + listOfMountainObjects.mountains[i].coords.lng + "&date=today";
            $.getJSON(url, function(data) {
                results = data.results;
                cellSunRiseTitle = row.insertCell(0);
                cellSunRiseTitle.innerHTML = "SunRise";
                cellSunRise = row.insertCell(1);
                cellSunRise.innerHTML = results.sunrise + " UTC";
                row = table.insertRow(table.rows.length);
                cellSunSetTitle = row.insertCell(0);
                cellSunSetTitle.innerHTML = "SunSet"
                cellSunSet = row.insertCell(1);
                cellSunSet.innerHTML = results.sunset + " UTC";
            })
        }
    }
}

/* This function is to validate user selection
 * populate error message field
 * @param (string) - selected mountain type from the dropdown  
 * @param (string) - Error message field to build appropriate error message
 */
function checkUserInput(selectCategoryField, errorMsgIdField) {
    let errorMsg, isError = false;
    // set Error flag based on number validation
    if ((selectCategoryField.selectedIndex == -1) || (selectCategoryField.selectedIndex == " ")) {
        errorMsg = "Select valid menu option item list to display";
        isError = true;
    } else {
        isError = false;
    }
    // Set attribute and content for para tag - Error message / Success
    if (isError == true) {
        document.getElementById("errorMsgId").innerHTML = errorMsg;
        $(errorMsgIdField).addClass("badInput");
        return false;
    } else {
        return true;
    }
}