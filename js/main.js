// @ts-check

// Currency formatter configuration
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

// Tip calculator function
function updateTipAmounts() {
    try {
        // grab the meal cost from the page
        // @ts-ignore
        const mealCost = parseFloat(document.getElementById("mealCost").value) || 0;
        
        // Define tip percentages and their corresponding element IDs
        const tipPercentages = {
            'tip10': 0.10,
            'tip15': 0.15,
            'tip18': 0.18,
            'tip20': 0.20,
            'tip22': 0.22
        };

        // Calculate and update all tip amounts
        for (const [elementId, percentage] of Object.entries(tipPercentages)) {
            const tipElement = document.getElementById(elementId);
            if (tipElement) {
                tipElement.innerHTML = formatter.format(mealCost * percentage);
            }
        }
    } catch (error) {
        console.error('Error updating tip amounts:', error);
    }
}

// Register the event listener for the input field
const mealCostInput = document.getElementById('mealCost');
if (mealCostInput) {
    mealCostInput.oninput = updateTipAmounts;
}

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('JDPS - ServiceWorker registration successful:', registration.scope);
            })
            .catch(error => {
                console.error('JDPS - ServiceWorker registration failed:', error);
            });
    });
} else {
    console.log('JDPS - Service Workers not supported in this browser');
}