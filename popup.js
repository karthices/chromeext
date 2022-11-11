const passwordEle = document.getElementById("password");
const inputCompanyEle = document.getElementById("setrealestate");
const Login = document.getElementById("Login");

chrome.storage.sync.get('randpass', function(data) {
    passwordEle.value = data.randpass;
});
chrome.storage.sync.get('company', function(data) {
    inputCompanyEle.value = data.company;
});

const loginwithcompany = async() => {
    var companySelected = document.getElementById("setrealestate").value;
    var password = passwordEle.value;

    chrome.storage.sync.set({ 'randpass': password }, function() {
    });

    chrome.storage.sync.set({ 'company': companySelected }, function() {
    });

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: companychange,
        args: [companySelected, password],
    }); // setFawsec().then();
    window.close();
}

// When the button is clicked, inject script into current page
Login.addEventListener("click", loginwithcompany, false);

inputCompanyEle.addEventListener("change", loginwithcompany, false);




// The body of this function will be executed as a content script inside the
// current page
function companychange(_id, _password) {
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPassword").value = _password;
    if (document.getElementById("inputCompany"))
        document.getElementById("inputCompany").value = _id;
    else document.getElementById("inputEmail").insertAdjacentHTML('afterend', '<input type="hidden" id="inputCompany" value="' + _id + '" />');
    // document.getElementById("inputCompany").removeAttribute("disabled");
    document.getElementById("btnLogin").click();
}