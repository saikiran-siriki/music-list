## Project Structure
- Top100 (Contains the core state of the application)
   - Select (component for displaying categories)
   - DateFilter (external library)
   - Accordion (to display music as well as the details)

### Select component
Props (defaultOption, setSelected, options, name)
- defaultOption - Sets the default option for the select dropdown (Currently not using this)
- setSelected - event triggered when select option changes (passes the selected value as arg)
- options - accepts data in the {value, label} format to render options

### Accordion component
Props (data)
- data - takes data in the format of {title, body}
- We are using isActive and isFavorite to market an item as active or favorite
- Has a child Accordion item which is purely for displaying accordion item


## Implementation details
- We fetch the data from the api on initial render in the Top100jsx component
- We save the initial api data in the variable `data`
- We also filter out all the unique categories from the response to render our categories `Select` filter
- DateFilter displays date from 1960 to current date by default
- We trigger events whenever we change date or category
- We always use `filteredData` as single source of truth to display items. `data` exists purely to reset state

### `npm i && npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


