window.onload = () => {
    const toggle = document.getElementById("toggle");
    chrome.storage.sync.get(["enabled"], (result) => {
        toggle.value = result.enabled;
    });
    toggle.onchange = () => {
        chrome.storage.sync.set({enabled: toggle.value});
    }
};