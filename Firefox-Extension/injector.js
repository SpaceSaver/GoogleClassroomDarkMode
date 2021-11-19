var stylesheet;
function setCustom() {
    var links = document.getElementsByTagName("link");
    for (var x = 0; x < links.length; x++) {
        if (links[x].getAttribute("data-id") === "_cl") {
            stylesheet = links[x];
        }
    }
    browser.runtime.sendMessage({ object: { safekeeping: stylesheet.href }, command: "set", space: "local" });
    // browser.runtime.sendMessage({ command: "whoami" }, response => {
    //     console.log(response.id);
    //     stylesheet.setAttribute("href", "chrome-extension://" + response.id + "/CustomTheme.css");
    // });
    browser.runtime.sendMessage({command: "thefile"}, response => {
        stylesheet.setAttribute("href", response.url);
    })
}
browser.runtime.sendMessage({ command: "get", space: "sync", keys: ["enabled"] }, response => {
    if (response.enabled) {
        setCustom();
    }
})
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // console.log(request);
    if (request.command === "changes") {
        if (request.area === "sync" && request.changes.enabled?.newValue != undefined) {
            if (request.changes.enabled.newValue) {
                setCustom();
            }
            else {
                browser.runtime.sendMessage({command: "get", space: "local", keys: ["safekeeping"]}, result => {
                    stylesheet.href = result.safekeeping;
                });
            }
        }
    }
});
console.log("Injected the dark side!");