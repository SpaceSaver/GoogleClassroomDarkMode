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
//             chrome.storage.sync.get([key], result => {
//                 if (chrome.runtime.lastError)
//                     reject(chrome.runtime.lastError);

//                 resolve(result[key]);
//             });
//         });
//         return promise;
//     }
//     static set = (object) => {
//         const promise = toPromise((resolve, reject) => {
//             chrome.storage.sync.set(object, result => {
//                 if (chrome.runtime.lastError)
//                     reject(chrome.runtime.lastError);

//                 resolve(object);
//             });
//         });
//     }
//     static local = {
//         get: key => {
//             const promise = toPromise((resolve, reject) => {
//                 chrome.storage.local.get([key], result => {
//                     if (chrome.runtime.lastError)
//                         reject(chrome.runtime.lastError);

//                     resolve(result[key]);
//                 });
//             });
//             return promise;
//         },
//         set: (object) => {
//             const promise = toPromise((resolve, reject) => {
//                 chrome.storage.sync.set(object, result => {
//                     if (chrome.runtime.lastError)
//                         reject(chrome.runtime.lastError);

//                     resolve(object);
//                 });
//             });
//         }
//     }
// }
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "get") {
        chrome.storage[request.space].get(request.keys, result => {
            sendResponse(result);
        });
        return true;
    }
    else if (request.command === "set"){
        chrome.storage[request.space].set(request.object, result => {
            sendResponse(result);
        });
        return true;
    }
    else if (request.command === "whoami"){
        sendResponse({id: chrome.runtime.id});
        return true;
    }
    else if (request.command === "thefile"){
        fetch("CustomTheme.css").then(response => {
            return response.text()
        }).then(data => {
            sendResponse({url: "data:text/css;base64," + btoa(data)});
        });
        return true;
    }
});
// chrome.storage.onChanged.addListener((changes, area) => {
//     chrome.runtime.sendMessage({command: "changes", changes: changes, area: area});
// });