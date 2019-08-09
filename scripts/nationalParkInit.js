/*Description: window onload Init script to assign event handler and other supporting functions
 *Author: HartCode Programmer
 *Date:08/09/2019
 */

/* This function is called during window onload of the natural park page and 
 * assign function to event handler dropdown
 * No parameters
 * Calls: function checkUserInput(), loadLocationList(), loadParkTypesList(), loadTableListByLocation() and loadTableListByParkType   
 */
"Use Strict";
window.onload = function() {

    // Array of park Types
    let parkTypeList = [
            "National Park",
            "National Monument",
            "Recreation Area",
            "Scenic Trail",
            "Battlefield",
            "Historic",
            "Memorial",
            "Preserve",
            "Island",
            "River",
            "Seashore",
            "Trail",
            "Parkway"
        ]
        // Array of location lists
    let locationList = [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "DC",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Islands",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ]
    let listOfNationalParks;
    let inputSearchTypeField = document.getElementById("inputSearchType");
    let locationListDivField = document.getElementById("locationListDiv");
    let parkTypeListDivField = document.getElementById("parkTypeListDiv");
    let selectByLocationListField = document.getElementById("selectByLocationList");
    let selectByParkTypeListField = document.getElementById("selectByParkTypeList");
    let errorMsgIdField = document.getElementById("errorMsgId")
    let resultTableListField = document.getElementById("resultTableList");

    //Load JSON during onload process. it will not delay further processing upon further selection
    $.getJSON("data/nationalparks.json", function(data) {
        listOfNationalParks = data;
    });

    //Event handler function to assign for onchange
    inputSearchTypeField.onchange = function() {
        let isValid = checkUserInput(inputSearchTypeField, errorMsgIdField);
        if (isValid) {
            let selectedSearchType = inputSearchTypeField.options[inputSearchTypeField.selectedIndex].value;
            switch (selectedSearchType) {
                case "byLocation":
                    loadLocationList(locationList, selectByLocationListField);
                    locationListDivField.style.display = "block";
                    parkTypeListDivField.style.display = "none";
                    resultTableListField.innerHTML = " ";
                    selectByLocationListField.selectedIndex = 0;
                    break;
                case "byParkType":
                    loadParkTypesList(parkTypeList, selectByParkTypeListField);
                    parkTypeListDivField.style.display = "block";
                    locationListDivField.style.display = "none";
                    resultTableListField.innerHTML = " ";
                    selectByParkTypeListField.selectedIndex = 0;
                    break;
            }
            document.getElementById("errorMsgId").innerHTML = " ";
        } else {
            document.getElementById("resultTableList").innerHTML = " ";
            resultTableListField.innerHTML = " ";
            locationListDivField.style.display = "none";
            parkTypeListDivField.style.display = "none";
        }
    };
    // Event handler for location list dropdown selection
    selectByLocationListField.onchange = function() {
            let isValid = checkUserInput(selectByLocationListField, errorMsgIdField);
            if (isValid) {
                let selectedLocation = selectByLocationListField.options[selectByLocationListField.selectedIndex].value;
                loadTableListByLocation(selectedLocation, listOfNationalParks, resultTableListField);
                locationListDivField.style.display = "block";
                parkTypeListDivField.style.display = "none";
            }
        }
        // Event handler for park type list dropdown selection
    selectByParkTypeListField.onchange = function() {
            let isValid = checkUserInput(selectByParkTypeListField, errorMsgIdField);
            if (isValid) {
                let selectedParkType = selectByParkTypeListField.options[selectByParkTypeListField.selectedIndex].value;
                loadTableListByParkType(selectedParkType, listOfNationalParks, resultTableListField);
                locationListDivField.style.display = "none";
                parkTypeListDivField.style.display = "block";
            }
        }
        // Hide all fields in the form except search By during onload process
    locationListDivField.style.display = "none";
    parkTypeListDivField.style.display = "none";

};

/* function is to load location dropdown list based on user selection - by location 
 * @param locationList (javascript array of string) - list of locations
 * @param selectByLocationListField (string) - Reference to location type dropdown
 * Calls: None
 */
function loadLocationList(locationList, selectByLocationListField) {
    //load only when dropdown is not loaded yet, as it is static
    if (selectByLocationListField.selectedIndex == 0) {
        for (let i = 0; i < locationList.length; i++) {
            let addOptionItem = document.createElement("option");
            addOptionItem.value = locationList[i];
            addOptionItem.text = locationList[i];
            let parentDiv = selectByLocationListField;
            parentDiv.appendChild(addOptionItem);
        }
    }

}

/* function is to parkType dropdown list based on user selection - by location 
 * @param parkTypeList (javascript array of string) - list of parktypes
 * @param selectByParkTypeListField (string) - Reference to parkTypes dropdown
 * Calls: None
 */
function loadParkTypesList(parkTypeList, selectByParkTypeListField) {
    //load only when dropdown is not loaded yet, as it is static
    if (selectByParkTypeListField.selectedIndex == 0) {
        for (let i = 0; i < parkTypeList.length; i++) {
            let addOptionItem = document.createElement("option");
            addOptionItem.value = parkTypeList[i];
            addOptionItem.text = parkTypeList[i];
            let parentDiv = selectByParkTypeListField;
            parentDiv.appendChild(addOptionItem);
        }
    }
}

/* function is to load table based on the selected location and build results in table 
 * @param location (string) - selected location (state)
 * @param listOfNationalParks (array of javastring objects) - list of national parks
 * @param resultTableListField (string) - table id to build the results  
 * Calls: None
 */
function loadTableListByLocation(location, listOfNationalParks, resultTableListField) {
    resultTableListField.className = "table table-responsive table-striped mt-3 border";
    let row;
    // Table header and apply classes  
    let thead = document.querySelectorAll("thead");
    if (thead.length == 0) {
        let head = resultTableListField.createTHead();
        row = head.insertRow(0);
        let cellHeadLocName = row.insertCell(0);
        cellHeadLocName.innerHTML = "Location Name";
        let cellHeadAddress = row.insertCell(1);
        cellHeadAddress.innerHTML = "Address";
        let cellHeadCity = row.insertCell(2);
        cellHeadCity.innerHTML = "City";
        let cellHeadState = row.insertCell(3);
        cellHeadState.innerHTML = "State";
        let cellHeadZipCode = row.insertCell(4);
        cellHeadZipCode.innerHTML = "Zip Code"
        let cellHeadPhone = row.insertCell(5);
        cellHeadPhone.innerHTML = "Phone";
        let cellHeadVisit = row.insertCell(6);
        cellHeadVisit.innerHTML = "Visit";
        let cellCoords = row.insertCell(7);
        cellCoords.innerHTML = "Coords";
    }

    //Build table body, if not already available and create a table row
    let tbody = document.getElementById("tableBodyList");
    if (tbody != null) {
        tbody.innerHTML = " ";
        row = tbody.insertRow(0);
        tbody.classList.add("tableBorder");
    } else {
        tableBody = resultTableListField.createTBody();
        tableBody.id = "tableBodyList";
        row = tableBody.insertRow(0);
        tableBody.classList.add("tableBorder");
    }

    // Loop through the data array and build table
    for (let i = 0; i < listOfNationalParks.parks.length; i++) {
        if (location == listOfNationalParks.parks[i].State) {
            let cellLocName = row.insertCell(0);
            cellLocName.innerHTML = listOfNationalParks.parks[i].LocationName;
            let cellAddress = row.insertCell(1);
            cellAddress.innerHTML = listOfNationalParks.parks[i].Address;
            let cellCity = row.insertCell(2);
            cellCity.innerHTML = listOfNationalParks.parks[i].City;
            let cellState = row.insertCell(3);
            cellState.innerHTML = listOfNationalParks.parks[i].State;
            let cellZipCode = row.insertCell(4);
            cellZipCode.innerHTML = listOfNationalParks.parks[i].ZipCode;
            let cellPhone = row.insertCell(5);
            if (listOfNationalParks.parks[i].Phone == 0) {
                cellPhone.innerHTML = "&nbsp";
            } else {
                cellPhone.innerHTML = listOfNationalParks.parks[i].Phone;
            }
            // let cellFax = row.insertCell(6);
            // cellFax.innerHTML = listOfNationalParks.parks[i].Fax;

            cellVisit = row.insertCell(6);
            // Add anchor tag for more info for respective park, if available
            if (listOfNationalParks.parks[i].Visit != undefined) {
                let visitTag = document.createElement("a");
                visitTag.href = listOfNationalParks.parks[i].Visit;
                visitTag.id = "Visit" + i;
                visitTag.innerHTML = "Click me to know more"
                visitTag.target = "Visit" + i;
                cellVisit.appendChild(visitTag);
            } else {
                cellVisit.innerHTML = "NA";
            }
            cellCoords = row.insertCell(7);
            cellCoords.innerHTML = "lat:" + listOfNationalParks.parks[i].Latitude + "<br>" + "lon: " + listOfNationalParks.parks[i].Longitude;
            row = resultTableListField.insertRow(resultTableListField.rows.length);
        }
    }

}

/* function is to load table based on the selected park type and build results in table 
 * @param location (string) - selected park Type (park name)
 * @param listOfNationalParks (array of javastring objects) - list of national parks
 * @param resultTableListField (string) - table id to build the results  
 * Calls: None
 */
function loadTableListByParkType(selectedParkType, listOfNationalParks, resultTableListField) {
    resultTableListField.className = "table table-responsive table-striped mt-3 border";
    let row;
    // Table header and apply classes  
    let thead = document.querySelectorAll("thead");
    if (thead.length == 0) {
        let head = resultTableListField.createTHead();
        row = head.insertRow(0);
        let cellHeadLocName = row.insertCell(0);
        cellHeadLocName.innerHTML = "Location Name";
        let cellHeadAddress = row.insertCell(1);
        cellHeadAddress.innerHTML = "Address";
        let cellHeadCity = row.insertCell(2);
        cellHeadCity.innerHTML = "City";
        let cellHeadState = row.insertCell(3);
        cellHeadState.innerHTML = "State";
        let cellHeadZipCode = row.insertCell(4);
        cellHeadZipCode.innerHTML = "Zip Code"
        let cellHeadPhone = row.insertCell(5);
        cellHeadPhone.innerHTML = "Phone";
        let cellHeadVisit = row.insertCell(6);
        cellHeadVisit.innerHTML = "Visit";
        let cellCoords = row.insertCell(7);
        cellCoords.innerHTML = "Coords";
    }

    //Build table body, if not already available and create a table row
    let tbody = document.getElementById("tableBodyList");
    if (tbody != null) {
        tbody.innerHTML = " ";
        row = tbody.insertRow(0);
        tbody.classList.add("tableBorder");
    } else {
        tableBody = resultTableListField.createTBody();
        tableBody.id = "tableBodyList";
        row = tableBody.insertRow(0);
        tableBody.classList.add("tableBorder");
    }

    // Loop through the data array and build table
    for (let i = 0; i < listOfNationalParks.parks.length; i++) {
        // Look for case insensitive search to find the matching national park by location name
        let regExp = new RegExp(selectedParkType, "i");
        let isValid = regExp.test(listOfNationalParks.parks[i].LocationName);

        if (isValid) {
            let cellLocName = row.insertCell(0);
            cellLocName.innerHTML = listOfNationalParks.parks[i].LocationName;
            let cellAddress = row.insertCell(1);
            cellAddress.innerHTML = listOfNationalParks.parks[i].Address;
            let cellCity = row.insertCell(2);
            cellCity.innerHTML = listOfNationalParks.parks[i].City;
            let cellState = row.insertCell(3);
            cellState.innerHTML = listOfNationalParks.parks[i].State;
            let cellZipCode = row.insertCell(4);
            cellZipCode.innerHTML = listOfNationalParks.parks[i].ZipCode;
            let cellPhone = row.insertCell(5);
            if (listOfNationalParks.parks[i].Phone == 0) {
                cellPhone.innerHTML = "&nbsp";
            } else {
                cellPhone.innerHTML = listOfNationalParks.parks[i].Phone;
            }
            cellVisit = row.insertCell(6);
            // Add anchor tag for more info for respective park, if available
            if (listOfNationalParks.parks[i].Visit != undefined) {
                let visitTag = document.createElement("a");
                visitTag.href = listOfNationalParks.parks[i].Visit;
                visitTag.id = "Visit" + i;
                visitTag.innerHTML = "Click me to know more"
                visitTag.target = "Visit" + i;
                cellVisit.appendChild(visitTag);
            } else {
                cellVisit.innerHTML = "NA";
            }
            // per direction, it has been concatenated to look better display
            cellCoords = row.insertCell(7);
            cellCoords.innerHTML = "lat:" + listOfNationalParks.parks[i].Latitude + "<br>" + "lon: " + listOfNationalParks.parks[i].Longitude;
            row = resultTableListField.insertRow(resultTableListField.rows.length);
        }
    }
}

/* This function is to validate user selection
 * populate error message field
 * @param (string) - selected search By category type dropdown
 * @param (string) - Error message field to build appropriate error message
 */
function checkUserInput(inputDropDown, errorMsgIdField) {
    let errorMsg, isError = false;
    // set Error flag based on number validation
    if ((inputDropDown.selectedIndex == -1) || (inputDropDown.selectedIndex == " ")) {
        errorMsg = "Select valid search type from the dropdown";
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