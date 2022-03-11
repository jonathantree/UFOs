# UFOs
## Project Overview
The main goal of this project was to develope a dynamic webpage which allows users to manually filter a dataset of UFO sigthings stored as a JavaScript obejct. The webpage was constructed using HTML with CSS and Bootstrap components for added aesthetics. The Webpage displays the data from data.js as a table and contains filters that allow the user to refine a search. The filters were constructed using Javascript in the file app.js. 

### Resources:
Software : HTML, Bootstrap, CSS, JavaScript D3

Data: /static/js/data.js

## Results
There are 5 possible filters which can be used singularly or in combination to further refine the results. The user will enter in the search criteria in the dialog box under each search criteria and press `Enter`. This will apply the filter and display the new results matching the search criteria defined. 
The table without any filters set is built using the following JavaScript code:
#### *app.js*
```javascript
// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}
```
#### This is the full dataset that is displayed without any filters applied.

![png](/screenshots/unfiltered.png)

#### If the user enters invalid data or there are no reults matching the criteria, the table will display no data as seen below. The search criteria were date: 1/12/2010 and the state : nv. This does not match any of the records and so no data is displayed.

![png](/screenshots/no_results.png)

### The following screenshots show a possible combination of filters applied and the resulting table data that is displayed.

### Filters: 
1. Date : 1/1/2010

![png](/screenshots/date_filtered.png)

### Filters:
1. Date : 1/1/2010
2. State : ca

![png](/screenshots/date_state_filtered.png)

### Filters:
1. Date : 1/1/2010
2. State : ca
3. Shape : light

![png](/screenshots/date_state_shape_filtered.png)

### Filters:
1. Date : 1/1/2010
2. City : eugene

![png](/screenshots/date_city_filtered.png)

### All the data is from the US except for two sightings from Canada. These were them:

![png](/screenshots/country_filter.png)

#### How the filter works:

The following code retirieves the element that was changed in the filters, saves the value and id and applies those filters to the data. The code then rewrites the table using the filtered dataset.
```javascript
// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let elementValue = changedElement.property('value')
    
    // 4c. Save the id of the filter that was changed as a variable.
    let filterID = d3.select(this).attr('id')
    //console.log(id)
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue){
      filters[filterID] = elementValue;
    }
    else {
      delete filters[filterID]
    }

    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values 
    let filterKeyValues = Object.keys(filters);

    filterKeyValues.forEach((key, index) => {
      let filterKey = key;
      let filterValue = filters[key];
      
      filteredData = filteredData.filter(row => row[filterKey] === filterValue);

      console.log(filterKey, filterValue);
    });

 
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);

  }
  
  // 2. Attach an event to listen for changes to each filter
d3.selectAll("#datetime").on("change", updateFilters);
d3.selectAll("#city").on("change", updateFilters);
d3.selectAll("#state").on("change", updateFilters);
d3.selectAll("#country").on("change", updateFilters);
d3.selectAll("#shape").on("change", updateFilters);

  
  // Build the table when the page loads
  buildTable(tableData);

```
## Summary

1. 
