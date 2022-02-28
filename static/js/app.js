// import the data from data.js

const tableData = data;

// Reference the HTML table using the D3 library
var tbody = d3.select("tbody");

// Build a function to construct the table
function buildTable(data) {
    //Clear the table
    tbody.html("");

    //Iterate through each element in the array using the .forEach() function
    data.forEach((dataRow) => {
        
        //Appended a row to the HTML table
        let row = tbody.append("tr");

        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
            }
        );
    });
}

// Allow for user-filter to select data
function handleClick() {
    //select the first element that matches the #datetime string and store its value in date
    let date = d3.select("#datetime").property("value");

    //set a default filter and save it to the filteredData variable
    let filteredData = tableData;

    // if there is a date filter applied, the filter the default data using the date
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    };

    //REconstruct the table using the newly filtered data by calling the buildTable()
    buildTable(filteredData);

}

//Handle the filter button click for filter execution
d3.selectAll("#filter-btn").on("click", handleClick);

// Display the entire table before any interaction of filters has happened
buildTable(tableData);
