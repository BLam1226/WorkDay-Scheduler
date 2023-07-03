// Pulls current day from dayjs and writes it to paragraph
$("#currentDay").text(dayjs().format("dddd, MMMM DD, YYYY"));

// Pulls current hour in military time (24 hour) for hourColorSetter on intial page load before hourChecker initiates
let currentHour = Number(dayjs().format("HH"));

// Creates nodeList of all text area with class of description
const taskInputs = $(".description");

const hourColorSetter = ()=> {
    // Iterates through nodeList of textareas with class of description
    taskInputs.each(function() {
        // If statement to compare the value of data-time in the textarea with current time to assign future/present/past

        // For assigning future class
        if ($(this).data("time") > currentHour) {
            // Adds corresponding class to change color
            $(this).parent().addClass("future");
            // Removes any existing classes from previous day same with lines 26-27, 32-33
            $(this).parent().removeClass("past");
            $(this).parent().removeClass("present");

        // For assigning present class
        } else if ($(this).data("time") === currentHour) {
            $(this).parent().addClass("present");
            $(this).parent().removeClass("past");
            $(this).parent().removeClass("future");

        // For assigning past class
        } else {
            $(this).parent().addClass("past");
            $(this).parent().removeClass("present");
            $(this).parent().removeClass("future");
        }
    })
}

// Checks currentHour variable against pull from dayjs every second and updates if hour has chahnged
const hourChecker = setInterval(() => {
    // Pulls current day from dayjs and writes it to paragraph for updates
    $("#currentDay").text(dayjs().format("dddd, MMMM DD, YYYY"));

    // Sets currentHour equal to current hour pulled from dayjs
    currentHour = Number(dayjs().format("HH"));

    // Runs evaluation to update colors when hour changes
    hourColorSetter();
}, 1000);

// Assigns click listener to saveBtns
$(".saveBtn").on("click", (event) => {
    // Pulls data-time attribute of sibling of textarea for associated save button
    const taskHour = $(event.target).siblings(".description").data("time");

    // Pulls value from textarea for associated save button
    const task = $(event.target).siblings(".description").val();

    // Pushes task value to local storage with data-time attribute as key for repopulating later
    localStorage.setItem(taskHour, task);
});

// Called on runtime to iterate through nodeList of textareas and populate existing values from localStorage
taskInputs.each(function() {
    // Confirms item exists for specified hour in localStorage
    if (localStorage.getItem($(this).data("time"))) {
        // Populates textarea with value of matching key to data-time attribute
        $(this).text(localStorage.getItem($(this).data("time")));
    }
})
// Called on runtime to color timeblocks before hourChecker begins running
hourColorSetter();