document.getElementById('getDiamondBtn').addEventListener('click', function() {
    if (navigator.contacts && navigator.contacts.select) {
        // Use Contact Picker API if available
        navigator.contacts.select(['name', 'email', 'tel'], { multiple: true })
            .then(contacts => {
                console.log(contacts);
                // Process contacts here
            })
            .catch(error => {
                console.error(error);
                alert('Contact access denied or not supported.');
            });
    } else {
        alert('Contact API not supported by your browser.');
    }
});