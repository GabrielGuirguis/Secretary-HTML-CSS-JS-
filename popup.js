document.getElementById("submit").addEventListener("click", () => {
    console.log("pressed")
    chrome.runtime.sendMessage({
        "type": "ADD_EVENT",
    }, (response) => {
        if (response.success) {
            alert("Event added successfully")
        } else {
            console.log(response)
            alert("Failed")
        }
    })
})