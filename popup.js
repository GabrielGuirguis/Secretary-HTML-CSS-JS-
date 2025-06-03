import { convertTo12Hour } from "./utils/convertTo12Hour.js";

document.getElementById("submitForm").addEventListener("submit", (e) => {
    e.preventDefault()
    
    chrome.runtime.sendMessage({
        "type": "ADD_EVENT",

        "summary": document.getElementById("summary").value,
        "description": document.getElementById("description").value,
        "start": document.getElementById("start").value,
        "end": document.getElementById("end").value,

    }, (response) => {
        if (response.success) {
            alert("Event added successfully")
        } else {
            console.log(response)
            alert("Failed")
        }
    })
})

const eventIndicator = document.getElementById("event-indicator")
const taskIndicator = document.getElementById("task-indicator")

document.getElementById("event").addEventListener("click", () => {
    eventIndicator.classList.add("selected")
    taskIndicator.classList.remove("selected")
})

document.getElementById("task").addEventListener("click", () => {
    taskIndicator.classList.add("selected")
    eventIndicator.classList.remove("selected")
})

const dateDisplay = document.getElementById("date-display")
const datePicker = document.getElementById("date-picker")

dateDisplay.addEventListener("click", () => {
    datePicker.showPicker();
})

datePicker.addEventListener("change", (e) => {
    const date = e.target.value
    dateDisplay.textContent = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    })
})

const startDisplay = document.getElementById("start-display")
const startPicker = document.getElementById("start-picker")
const endDisplay = document.getElementById("end-display")
const endPicker = document.getElementById("end-picker")

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