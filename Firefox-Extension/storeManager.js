// class StoreManager {
//     static toPromise = callback => {
//         const promise = new Promise((resolve, reject) => {
//             try {
//                 callback(resolve, reject);
//             }
//             catch (err) {
//                 reject(err);
//             }
//         })
//     }
//     static get = key => {
//         const promise = toPromise((resolve, reject) => {
//             browser.storage.sync.get([key], result => {
//                 if (browser.runtime.lastError)
//                     reject(browser.runtime.lastError);

//                 resolve(result[key]);
//             });
//         });
//         return promise;
//     }
//     static set = (object) => {
//         const promise = toPromise((resolve, reject) => {
//             browser.storage.sync.set(object, result => {
//                 if (browser.runtime.lastError)
//                     reject(browser.runtime.lastError);

//                 resolve(object);
//             });
//         });
//     }
//     static local = {
//         get: key => {
//             const promise = toPromise((resolve, reject) => {
//                 browser.storage.local.get([key], result => {
//                     if (browser.runtime.lastError)
//                         reject(browser.runtime.lastError);

//                     resolve(result[key]);
//                 });
//             });
//             return promise;
//         },
//         set: (object) => {
//             const promise = toPromise((resolve, reject) => {
//                 browser.storage.sync.set(object, result => {
//                     if (browser.runtime.lastError)
//                         reject(browser.runtime.lastError);

//                     resolve(object);
//                 });
//             });
//         }
//     }
// }
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "get") {
        browser.storage[request.space].get(request.keys, result => {
            sendResponse(result);
        });
        return true;
    }
    else if (request.command === "set") {
        browser.storage[request.space].set(request.object, result => {
            sendResponse(result);
        });
        return true;
    }
    else if (request.command === "whoami") {
        sendResponse({ id: browser.runtime.id });
        return true;
    }
    else if (request.command === "thefile") {
        fetch("https://raw.githubusercontent.com/SpaceSaver/GoogleClassroomDarkMode/beta/CustomTheme.css").then(response => {
            return response.text()
        }).then(data => {
            sendResponse({ url: "data:text/css;base64," + btoa(data) });
        });
        return true;
    }
});
browser.storage.onChanged.addListener((changes, area) => {
    browser.tabs.query({url: "https://classroom.google.com/*"}, function (tabs) {
        // console.log(tabs);
        for (var x = 0; x < tabs.length; x++){
            // console.log(tabs[x].id);
            browser.tabs.sendMessage(tabs[x].id, { command: "changes", changes: changes, area: area });
        }
    });
});