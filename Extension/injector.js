var stylesheet;
function setCustom() {
    var links = document.getElementsByTagName("link");
    for (var x = 0; x < links.length; x++) {
        if (links[x].getAttribute("data-id") === "_cl") {
            stylesheet = links[x];
        }
    }
    chrome.runtime.sendMessage({ object: { safekeeping: stylesheet.href }, command: "set", space: "local" });
    // chrome.runtime.sendMessage({ command: "whoami" }, response => {
    //     console.log(response.id);
    //     stylesheet.setAttribute("href", "chrome-extension://" + response.id + "/CustomTheme.css");
    // });
    chrome.runtime.sendMessage({command: "thefile"}, response => {
        stylesheet.setAttribute("href", response.url);
    })
}
window.addEventListener("load", () => {
    chrome.runtime.sendMessage({ command: "get", space: "sync", keys: ["enabled"] }, response => {
        if (response.enabled) {
            setCustom();
        }
    })
    chrome.runtime.onMessage = (request, sender, sendResponse) => {
        if (request.command === "change") {
            if (request.area === "sync" && request.changes.enabled?.newValue != undefined) {
                if (request.changes.enabled.newValue) {
                    setCustom();
                }
                else {
                    chrome.runtime.sendMessage({command: "get", space: "local", keys: ["safekeeping"]}, result => {
                        stylesheet.href = result.safekeeping;
                    });
                }
            }
        }
    };
});