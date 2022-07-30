let myLeads = []
const saveEl = document.querySelector("#save-el");
const deleteEl = document.querySelector("#delete-el");
const textEl = document.querySelector("#text-el");
const ulEl = document.querySelector("#ul-el");
const tabEl = document.querySelector("#tab-el");

const getLeadsFromStorage = JSON.parse(localStorage.getItem("myLeads"));

if (getLeadsFromStorage) {
    myLeads = getLeadsFromStorage;
    render(myLeads);
}

saveEl.addEventListener("click", function () {
    if (textEl.value != "") {
        myLeads.push(textEl.value);
        textEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    }
})

tabEl.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
})

function render(Leads) {
    // const li=document.createElement("li");
    // li.textContent=myLeads[j++];
    // ulEl.append(li);
    let listItems = "";
    for (let i = 0; i < Leads.length; i++) {
        listItems += `
    <li>
    <a target="_blank" href="${Leads[i]}">${Leads[i]}</a>
    </li>
    `
    }
    ulEl.innerHTML = listItems;
}

deleteEl.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

