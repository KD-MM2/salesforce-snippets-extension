import createContextMenus from "./menu";

chrome.runtime.onStartup.addListener(createContextMenus);
chrome.runtime.onInstalled.addListener(createContextMenus);


chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) => {
    if (!(tab && tab.id)) return;
    const { menuItemId } = info;

    // Handle menu item clicks
    switch (menuItemId) {
        case "check_all_allow_edit_access":
            chrome.tabs.sendMessage(tab.id, { action: "checkAllAllowEditAccess" });
            break;
        // Add more cases as needed
    }
});
