import { convertTo12Hour } from "./utils/convertTo12Hour.js";

var event = true;

const dateDisplay = document.getElementById("date-display")
const datePicker = document.getElementById("date-picker")
const startDisplay = document.getElementById("start-display")
const endDisplay = document.getElementById("end-display")
const startPicker = document.getElementById("start-picker")
const endPicker = document.getElementById("end-picker")
const eventIndicator = document.getElementById("event-indicator")
const taskIndicator = document.getElementById("task-indicator")

dateDisplay.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
})

document.getElementById("submitForm").addEventListener("submit", (e) => {
    e.preventDefault()
    
    chrome.runtime.sendMessage({
        "type": "ADD_EVENT",

        "summary": document.getElementById("summary").value,
        "description": document.getElementById("description").value,
        "start": datePicker.value + `T` + startPicker.value,
        "end": datePicker.value + `T` + endPicker.value,

    }, (response) => {
        if (response.success) {
            alert("Event added successfully")
        } else {
            console.log(response)
            alert("Failed")
        }
    })
})



document.getElementById("event").addEventListener("click", () => {
    eventIndicator.classList.add("selected")
    taskIndicator.classList.remove("selected")
    event = true;
})

document.getElementById("task").addEventListener("click", () => {
    taskIndicator.classList.add("selected")
    eventIndicator.classList.remove("selected")
    event = false;
})

dateDisplay.addEventListener("click", () => {
    datePicker.showPicker();
})

datePicker.addEventListener("change", (e) => {
    const [year, month, day] = e.target.value.split("-").map(Number)
    const localDate = new Date(year, month - 1, day)
  
    dateDisplay.textContent = localDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    })

})



startDisplay.addEventListener("click", () => {
    startPicker.showPicker();
})

startPicker.addEventListener("change", (e) => {
    const time = e.target.value
    startDisplay.textContent = convertTo12Hour(time);
})

endDisplay.addEventListener("click", () => {
    endPicker.showPicker();
})

endPicker.addEventListener("change", (e) => {
    const time = e.target.value
    endDisplay.textContent = convertTo12Hour(time);
})