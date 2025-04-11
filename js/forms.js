function handleForm(page) {
    const pageURLs = {
      '/oremaproductions/collabs.html' : {
        'url': 'https://docs.google.com/forms/u/1/d/e/1FAIpQLSe3MXaFitjMBqRC-VbiTvvuQy1buLFiVQO0b7bHKewIyO9-8g/formResponse',
        'formTitle' : 'Request Sent',
        'formSubtext' : 'I look forward to working with you'
      },
      '/oremaproductions/warehouse.html' : {
        'url': 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdOHZk7NfZgJQUd1WRYVArnmFFd_VD33vI9ndPxNfAeEFoKPQ/formResponse',
        'formTitle': 'Application Sent',
        'formSubtext': 'We will be in touch!'
      }
    };

    document.getElementById("form").addEventListener("submit", function(event) {
        event.preventDefault(); // Stop normal form submission

        let formData = new FormData(this); // Capture form data

        fetch(pageURLs[page]['url'], {
            method: "POST",
            body: formData,
            mode: "no-cors" // Prevent CORS errors
        }).then(() => {
            $('#form, .moveLater').css('opacity', '0');
            $('#form, .moveLater').hide('blind', 600);
        }).then(() => {
            document.getElementById('formTitle').innerText = pageURLs[page]['formTitle'];
            document.getElementById('formSubtext').innerText = pageURLs[page]['formSubtext'];

        }).then(() => {
            $('#formCheckmark').css('opacity', '1');
        }).catch(error => console.error("Error!", error));
    });

}
handleForm(window.location.pathname);

