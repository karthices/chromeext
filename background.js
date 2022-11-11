chrome.runtime.onInstalled.addListener(async() => {
    let url = chrome.runtime.getURL("hello.html");
    let color = '#3aa757';
    let tab = await chrome.tabs.create({ url });

    chrome.storage.sync.set({ randpass: '' }, function() {
        console.log("Hide image is on");
    });

});
// chrome.storage.onChanged.addListener(function(changes, namespace) {
//     for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//         console.log(
//             `Storage key "${key}" in namespace "${namespace}" changed.`,
//             `Old value was "${oldValue}", new value is "${newValue}".`
//         );
//     }
// });