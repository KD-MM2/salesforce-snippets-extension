export default function checkAllAllowEditAccess() {
    console.log('checkAllAllowEditAccess called');
    
    // Function to find and process checkboxes
    function findAndProcessCheckboxes(doc: Document = document): boolean {
        console.log('Searching in document:', doc.location?.href || 'current document');
        
        // Try multiple selectors in case the structure varies
        const selectors = [
            'td.dataCell.displayedCol input[type="checkbox"]',
            'td.dataCell input[type="checkbox"]', 
            '.dataCell.displayedCol input[type="checkbox"]',
            '.dataCell input[type="checkbox"]',
            'input[type="checkbox"][id*="edit_"]'
        ];
        
        let inputs: NodeListOf<Element> | null = null;
        let usedSelector = '';
        
        for (const selector of selectors) {
            inputs = doc.querySelectorAll(selector);
            if (inputs.length > 0) {
                usedSelector = selector;
                console.log(`Found ${inputs.length} inputs using selector: ${selector}`);
                break;
            }
        }
        
        if (!inputs || inputs.length === 0) {
            console.log('No checkbox inputs found with any selector');
            return false;
        }

        console.log(`Found ${inputs.length} checkbox inputs using: ${usedSelector}`);

        // Loop through each input and click if not checked
        let clickedCount = 0;
        inputs.forEach((input, index) => {
            const checkbox = input as HTMLInputElement;
            if (!checkbox.checked) {
                console.log(`Clicking unchecked input ${index + 1}: ${checkbox.id}`);
                checkbox.click();
                clickedCount++;
            } else {
                console.log(`Input ${index + 1} already checked: ${checkbox.id}`);
            }
        });

        console.log(`Clicked ${clickedCount} unchecked inputs out of ${inputs.length} total inputs`);
        return true;
    }

    // First, try in the main document
    if (findAndProcessCheckboxes(document)) {
        return;
    }

    // If not found in main document, check all iframes
    const iframes = document.querySelectorAll('iframe');
    console.log(`Checking ${iframes.length} iframes for the checkboxes`);
    
    for (let i = 0; i < iframes.length; i++) {
        try {
            const iframe = iframes[i] as HTMLIFrameElement;
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            
            if (iframeDoc && findAndProcessCheckboxes(iframeDoc)) {
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
        if (findAndProcessCheckboxes(document)) {
            return;
        }
        
        // Try iframes again after delay
        const iframes = document.querySelectorAll('iframe');
        for (let i = 0; i < iframes.length; i++) {
            try {
                const iframe = iframes[i] as HTMLIFrameElement;
                const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                
                if (iframeDoc && findAndProcessCheckboxes(iframeDoc)) {
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
