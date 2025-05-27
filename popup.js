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

generateTimeOptions(15)
