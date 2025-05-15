chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == "ADD_EVENT") {
        addEventToCalendar()
            .then(result => sendResponse({success: true, result}))
            .catch(error => sendResponse({success: false, error}))
        return true
    }
})

async function addEventToCalendar() {
    const token = await getAuthToken()
    const event = {
        "summary": "Coffee chat",
        "description": "Hi",
        "start": { dateTime: "2025-05-15T13:15:03-08:00" },
        "end": { dateTime: "2025-05-15T14:15:03-08:00" }
    }
    const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        }
    )
    if (!response.ok) {
        throw new Error("Failed to create event", response.json())
    }
    return await response.json()
}

function getAuthToken() {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError)
            } else {
                console.log("Token: ", token)
                return resolve(token)
            }
        })
    })
}