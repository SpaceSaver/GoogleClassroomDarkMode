window.onload = () => {
    const toggle = document.getElementById("toggle");
    browser.runtime.sendMessage({command: "get", space: "sync", keys: ["enabled"]}, (result) => {
        toggle.checked = result.enabled;
    });
    toggle.onchange = () => {
        browser.runtime.sendMessage({command: "set", space: "sync", object: {enabled: toggle.checked}});
    };
};