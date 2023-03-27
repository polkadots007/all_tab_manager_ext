/*global chrome*/
async function getTabData(){
    const openedtabs = await chrome.tabs.query({})
    const tabGrps = await chrome.tabGroups.query({});
    const openedWindow = await chrome.windows.get(chrome.windows.WINDOW_ID_CURRENT);
    console.log(openedtabs,tabGrps,openedWindow )
    openedtabs.forEach(tab=>{
        const grpInfo = tabGrps.filter(tabgrp => tabgrp.id === tab.groupId)[0];
        var div = document.createElement('div');
        console.log('check',grpInfo?.title || tab.url, tab.title +' - '+ grpInfo?.title || tab.url)
        div.setAttribute('class', `${(tab.active && tab.windowId === openedWindow.id) && 'rounded'} child-item d-flex align-items-center justify-contents-center`);
        var oImg = document.createElement("img");
        oImg.setAttribute('src', tab.favIconUrl);
        oImg.setAttribute('alt', tab.title);
        oImg.setAttribute('height', '30px');
        oImg.setAttribute('width', '30px');
        oImg.setAttribute('class', 'm-2 pe-auto icon');
        oImg.setAttribute('title', tab.title +' - '+ (grpInfo?.title || tab.url));
        oImg.style.cursor = 'pointer';
        oImg.style.backgroundColor = 'none'
        grpInfo && Object.values(grpInfo)?.length>0 ? (div.style.backgroundColor = grpInfo.color) : null;
        (tab.active && tab.windowId === openedWindow.id) && (div.style.backgroundColor = 'white');
        (tab.active && tab.windowId === openedWindow.id) && (div.style.border = '2px solid black');
        (tab.active && tab.windowId === openedWindow.id) && (div.style.boxShadow = '0 0 10px #fff;');
        oImg.onclick=async ()=>{
            const curTab = await chrome.tabs.get(tab.id);
            const isActive = !curTab.active;
            await chrome.windows.update(tab.windowId, {focused: true});
            await chrome.tabs.update(tab.id, {active: isActive});   
         };
        div.appendChild(oImg);
        document.getElementById("tabs").appendChild(div);

    })
}
async function openNewTab(){
    var div = document.createElement('div');
    div.setAttribute('class', 'child-item d-flex align-items-center justify-contents-center')
    var newTab = document.createElement("span");
    newTab.innerHTML="+N";
    newTab.setAttribute('height', '30px');
    newTab.setAttribute('width', '30px');
    newTab.setAttribute('class', 'm-2 pe-auto icon');
    newTab.setAttribute('title','Open New Tab in this Window');
    newTab.style.fontWeight='bold';
    newTab.style.cursor = 'pointer';
    newTab.onclick= async() => {
        await chrome.tabs.create({active: true, windowId: chrome.windows.WINDOW_ID_CURRENT});
    }
    div.appendChild(newTab);
    document.getElementById("tabs").appendChild(div);
}
async function openNewTabWindow(){
    var div = document.createElement('div');
    div.setAttribute('class', 'child-item d-flex align-items-center justify-contents-center')
    var newTab = document.createElement("span");
    newTab.innerHTML="+W";
    newTab.setAttribute('height', '30px');
    newTab.setAttribute('width', '30px');
    newTab.setAttribute('class', 'm-2 pe-auto icon');
    newTab.setAttribute('title','Open New Tab in New Window');
    newTab.style.fontWeight='bold';
    newTab.style.cursor = 'pointer';
    newTab.onclick= async() => {
        await chrome.windows.create({focused: true, state: 'fullscreen'});
    }
    div.appendChild(newTab);
    document.getElementById("tabs").appendChild(div);
}
// fetchData();
getTabData();
openNewTab();
openNewTabWindow();