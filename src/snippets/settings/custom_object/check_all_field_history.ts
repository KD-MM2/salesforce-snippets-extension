import { findAndProcessCheckboxes } from "@/utils/utils";

export default function checkAllFieldHistory() {
    console.log('checkAllFieldHistory called');

    // Try multiple selectors in case the structure varies
    const selectors = [
        'td.dataCol input[type="checkbox"]'
    ];


    // First, try in the main document
    if (findAndProcessCheckboxes(selectors, document)) {
        return;
    }

    // If not found in main document, check all iframes
    const iframes = document.querySelectorAll('iframe');
    console.log(`Checking ${iframes.length} iframes for the checkboxes`);

    for (let i = 0; i < iframes.length; i++) {
        try {
            const iframe = iframes[i] as HTMLIFrameElement;
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

            if (iframeDoc && findAndProcessCheckboxes(selectors, iframeDoc)) {
                console.log(`Found and processed checkboxes in iframe ${i + 1}`);
                return;
            }
        } catch (error) {
            console.log(`Cannot access iframe ${i + 1} due to cross-origin restrictions:`, error);
        }
    }

    // If still not found, wait and try again (for dynamically loaded content)
    console.log('Checkboxes not found immediately, waiting for dynamic content...');
    setTimeout(() => {
        console.log('Retrying after 2 seconds...');
        if (findAndProcessCheckboxes(selectors, document)) {
            return;
        }

        // Try iframes again after delay
        const iframes = document.querySelectorAll('iframe');
        for (let i = 0; i < iframes.length; i++) {
            try {
                const iframe = iframes[i] as HTMLIFrameElement;
                const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

                if (iframeDoc && findAndProcessCheckboxes(selectors, iframeDoc)) {
                    console.log(`Found and processed checkboxes in iframe ${i + 1} after delay`);
                    return;
                }
            } catch (error) {
                console.log(`Cannot access iframe ${i + 1} after delay:`, error);
            }
        }

        console.log('Still no checkboxes found after delay. The content might be in a different frame or loaded differently.');
    }, 2000);
}
