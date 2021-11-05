var stylesheet;
function setCustom() {
    var links = document.getElementsByTagName("link");
    for (var x = 0; x < links.length; x++) {
        if (links[x].getAttribute("data-id").equals("_cl")) {
            stylesheet = links[x];
        }
    }
    chrome.storage.local.set({ safekeeping: stylesheet.href });
    stylesheet.href = "https://raw.githubusercontent.com/SpaceSaver/GoogleClassroomDarkMode/main/CustomTheme.css";
}
window.addEventListener("load", () => {
    chrome.storage.sync.get(["enabled"], result => {
        if (result.enabled) {
            setCustom();
        }
    })
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === "sync" && changes.enabled?.newValue != undefined) {
            if (changes.enabled.newValue) {
                setCustom();
            }
            else {
                chrome.storage.local.get(["safekeeping"], result => {
                    stylesheet.href = result.safekeeping;
                });
            }
        }
    });
});