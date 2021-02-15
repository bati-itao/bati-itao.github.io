// Gets the date modified and creates a `date` object
// Referenced from https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/
const modified = new Date(document.lastModified);

// Gets the year from the `date` object
const year = modified.getFullYear()

// Gets the day from the `date` object
const date = modified.getDate() < 10 ? '0' + modified.getDate() : modified.getDate()

// Use `getMonth` to get the zero-indexed month from the `date` object.
const monthIndex = modified.getMonth()

// Create a `months` array to use to with the zero-indexed month
const months = {
    0: '01',
    1: '02',
    2: '03',
    3: '04',
    4: '05',
    5: '06',
    6: '07',
    7: '08',
    8: '09',
    9: '10',
    10: '11',
    11: '12'
}

// Get the month numbers from months
const monthNumber = months[monthIndex]

// Combines all the variables to get the formatted string
const dateModified = `${year}-${monthNumber}-${date}`

// CDTS call
var defPreFooter = document.getElementById("def-preFooter");
defPreFooter.outerHTML = wet.builder.preFooter({
    "dateModified": dateModified,
	"showFeedback" : false,
	"isContainer" : true,
    "showShare" : false
});