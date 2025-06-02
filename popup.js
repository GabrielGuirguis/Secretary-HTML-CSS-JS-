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

document.getElementById("event").addEventListener("click" = () => {
    eventIndicator.classList.add("selected")
    taskIndicator.classList.remove("selected")
})

document.getElementById("task").addEventListener("click" = () => {
    taskIndicator.classList.add("selected")
    eventIndicator.classList.remove("selected")
})
