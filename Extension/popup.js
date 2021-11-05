window.onload = () => {
    const toggle = document.getElementById("toggle");
    chrome.runtime.sendMessage({command: "get", space: "sync", keys: ["enabled"]}, (result) => {
        toggle.checked = result.enabled;
    });
    toggle.onchange = () => {
        chrome.runtime.sendMessage({command: "set", space: "sync", object: {enabled: toggle.checked}});
    };
};