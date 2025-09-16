// Function to find and process checkboxes
export function findAndProcessCheckboxes(selectors: string[], doc: Document = document): boolean {
    console.log('Searching in document:', doc.location?.href || 'current document');

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
