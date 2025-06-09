chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == "ADD_EVENT") {

        const event = {
            "summary": message.summary,
            "description": message.description,
            "start": { 
                dateTime: message.start + ":00-04:00"
            },
            "end": { 
                dateTime: message.end + ":00-04:00"
            },
        }

        //console.log("summary", message.summary);
        //console.log("description", message.description);
        //console.log("start", message.start);
        //console.log("end", message.end);

        addEventToCalendar(event)
            .then(result => sendResponse({success: true, result}))
            .catch(error => sendResponse({success: false, error}))
        return true
    }
})

async function addEventToCalendar(event) {
    const token = await getAuthToken()
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
        //console.log(response.json())
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
                //console.log("Token: ", token)
                return resolve(token)
            }
        })
    })
}