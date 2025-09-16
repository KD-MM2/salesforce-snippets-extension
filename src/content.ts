import checkAllAllowEditAccess from "@/snippets/settings/profile/field_level_security/check_all_allow_edit_access";
import checkAllFieldHistory from "@/snippets/settings/custom_object/check_all_field_history";

// Function to ensure DOM is ready before executing
function executeWhenReady(callback: () => void) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        // DOM is already ready, execute immediately
        callback();
    }
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkAllAllowEditAccess") {
        console.log('Content script received checkAllAllowEditAccess message');
        executeWhenReady(() => {
            checkAllAllowEditAccess();
        });
    } else if (request.action === "checkAllFieldHistory") {
        console.log('Content script received checkAllFieldHistory message');
        executeWhenReady(() => {
            checkAllFieldHistory();
        });
    }
});