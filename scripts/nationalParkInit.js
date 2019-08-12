/*Description: window onload Init script to assign event handler and other supporting functions
 *Author: HartCode Programmer
 *Date:08/09/2019
 */

/* This function is called during window onload of the natural park page and 
 * assign function to event handler dropdown
 * No parameters
 * Calls: function checkUserInput(), loadLocationList(), loadParkTypesList(), loadTableListByLocation(),
 * loadTableListByParkType() and validateResults()
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
    let tableDivField = document.getElementById("tableDiv");

    //Load JSON during onload process. it will not delay further processing upon further selection
    $.getJSON("data/nationalparks.json", function(data) {
        listOfNationalParks = data;
    });

    //Event handler function to assign for onchange
    inputSearchTypeField.onchange = function() {
        let isValid = checkUserInput(inputSearchTypeField, errorMsgIdField);
        if (isValid) {
            let selectedSearchType = inputSearchTypeField.options[inputSearchTypeField.selectedIndex].value;
            // validate the selection search type and load location/park types drop down if not already and toggle hide/display
            switch (selectedSearchType) {
                case "byLocation":
                    loadLocationList(locationList, selectByLocationListField);
                    // flex is used to NOT to loose applied height and width
                    locationListDivField.style.display = "flex";
                    parkTypeListDivField.style.display = "none";
                    resultTableListField.innerHTML = " ";
                    selectByLocationListField.selectedIndex = 0;
                    break;
                case "byParkType":
                    loadParkTypesList(parkTypeList, selectByParkTypeListField);
                    parkTypeListDivField.style.display = "flex";
                    locationListDivField.style.display = "none";
                    resultTableListField.innerHTML = " ";
                    selectByParkTypeListField.selectedIndex = 0;
                    break;
            }
            document.getElementById("errorMsgId").innerHTML = " ";
        } else {
            // If invalid user selection, hide dropdown and clear the prior results
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
                // load table list based on location sub selection
                loadTableListByLocation(selectedLocation, listOfNationalParks, resultTableListField);
                // hide display of previous parktype results, if there are
                locationListDivField.style.display = "flex";
                parkTypeListDivField.style.display = "none";
                // validate the results, if empty due to no data for selection, show appropriate error message
                validateResults(tableDivField, errorMsgIdField);

            } else {
                resultTableListField.innerHTML = " ";
            }
        }
        // Event handler for park type list dropdown selection
    selectByParkTypeListField.onchange = function() {
            let isValid = checkUserInput(selectByParkTypeListField, errorMsgIdField);
            if (isValid) {
                let selectedParkType = selectByParkTypeListField.options[selectByParkTypeListField.selectedIndex].value;
                // load table list based on park type sub selection
                loadTableListByParkType(selectedParkType, listOfNationalParks, resultTableListField);
                // hide display of previous parktype results, if there are
                locationListDivField.style.display = "none";
                parkTypeListDivField.style.display = "flex";
                // validate the results, if empty due to no data for selection, show appropriate error message
                validateResults(tableDivField, errorMsgIdField);
            } else {
                resultTableListField.innerHTML = " ";
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
    resultTableListField.className = "table table-responsive text-center mt-3 border table-hover";
    let row;
    // Table header and apply classes  
    let thead = document.querySelectorAll("thead");
    if (thead.length == 0) {
        let head = resultTableListField.createTHead();
        head.className = "bg-info text-white";
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
            // Build table rows for the matched park 
            buildTbodyRow(listOfNationalParks.parks[i], row, i);
            row = resultTableListField.insertRow(resultTableListField.rows.length);
        }
    }

}

/* function is to load table based on the selected park type and build results in table 
 * @param selectedParkType (string) - selected park Type (park name)
 * @param listOfNationalParks (array of javastring objects) - list of national parks
 * @param resultTableListField (string) - table id to build the results  
 * Calls: None
 */
function loadTableListByParkType(selectedParkType, listOfNationalParks, resultTableListField) {
    // set class table responsive for responsive design
    resultTableListField.className = "table table-responsive text-center mt-3 border table-hover";
    let row;
    // Table header and apply classes  
    let thead = document.querySelectorAll("thead");
    if (thead.length == 0) {
        let head = resultTableListField.createTHead();
        head.className = "bg-info text-white";
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
            // Build table rows for the matched park 
            buildTbodyRow(listOfNationalParks.parks[i], row, i);
            row = resultTableListField.insertRow(resultTableListField.rows.length);
        }
    }
}

/* function is to load table based on the selected park type and build results in table 
 * @param park (string) - selected park Type (park name)
 * @param row (table row in table body identifier)  
 * @param occurenceNo (occurence in the source array of parks list) - table id to build the results  
 * Calls: None
 */
function buildTbodyRow(park, row, occurenceNo) {
    let cellLocName = row.insertCell(0);
    cellLocName.innerHTML = park.LocationName;
    // Apply table width for each column to show required info in appropriate pattern
    cellLocName.className = "locTwidth";
    let cellAddress = row.insertCell(1);
    cellAddress.innerHTML = park.Address;
    cellAddress.className = "addrTwidth";
    let cellCity = row.insertCell(2);
    cellCity.className = "suppTwidth";
    cellCity.innerHTML = park.City;
    let cellState = row.insertCell(3);
    cellState.className = "suppTwidth";
    cellState.innerHTML = park.State;
    let cellZipCode = row.insertCell(4);
    cellZipCode.innerHTML = park.ZipCode;
    cellZipCode.className = "suppTwidth";
    let cellPhone = row.insertCell(5);
    if (park.Phone == 0) {
        cellPhone.innerHTML = "&nbsp";
    } else {
        cellPhone.innerHTML = park.Phone;
    }
    cellPhone.className = "phoneTwidth";
    cellVisit = row.insertCell(6);
    // Add anchor tag for more info for respective park, if available
    if (park.Visit != undefined) {
        let visitTag = document.createElement("a");
        visitTag.href = park.Visit;
        visitTag.id = "Visit" + occurenceNo;
        visitTag.innerHTML = "Click me"
        visitTag.target = "Visit" + occurenceNo;
        cellVisit.appendChild(visitTag);
    } else {
        cellVisit.innerHTML = "NA";
    }
    cellVisit.className = "visitTwidth";
    // per direction, it has been concatenated to look better display
    cellCoords = row.insertCell(7);
    cellCoords.innerHTML = "lat:" + park.Latitude + "<br>" + "lon: " + park.Longitude;
    cellCoords.className = "coordTwidth";
}

/* This function is to validate results table and show appropriate error message / clear error message for success
 * @param (tableDivField) (div Id / string) - holds the result table
 * @param errorMsgIdField (string) - Error message field to build appropriate error message
 */
function validateResults(tableDivField, errorMsgIdField) {
    let tableBodyListField = document.getElementById("tableBodyList");
    // validate child node of body to find if there is NO match found for the results and build appropriate message
    if (tableBodyListField != null) {
        if (tableBodyListField.children.length <= 1) {
            let errorMsg = "Sorry! No results for selected value, Please select other options";
            errorMsgIdField.innerHTML = errorMsg;
            $(errorMsgIdField).addClass("badInput");
            tableDivField.style.display = "none";
        } else {
            tableDivField.style.display = "flex";
            errorMsgIdField.innerHTML = " ";
        }
    } else {
        tableDivField.style.display = "flex";
        errorMsgIdField.innerHTML = " ";
    }
}

/* This function is to validate user selection
 * populate error message field
 * @param inputDropDown (string) - selected search By category type dropdown
 * @param errorMsgIdField (string) - Error message field to build appropriate error message
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