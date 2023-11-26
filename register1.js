
document.addEventListener('DOMContentLoaded', function () {
    var personalInfoForm = document.getElementById('personalInfoForm');
    var contactInfoForm = document.getElementById('contactInfoForm');

    personalInfoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateAndDisplayChildInfo();
    });

    contactInfoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        validateAndDisplayChildInfo();
    });

    var submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', function () {
        validateAndDisplayChildInfo();
    });
});

function validateForm() {
    var nameInput = document.getElementById('text-input');
    var phoneInput = document.getElementById('phone');
    var dayInput = document.getElementById('day');
    var monthInput = document.getElementById('month');
    var yearInput = document.getElementById('year');
    var genderInputs = document.getElementsByName('gender');
    var emailInput = document.getElementById('email');
    var photoInput = document.getElementById('photo1');
    // Validate Name
    var name = nameInput.value.trim();
    if (!name) {
        alert("Name cannot be empty");
        return false;
    }

    // Check if the name starts with a number
    if (/^\d/.test(name)) {
        alert("Name cannot start with a number");
        return false;
    }

    // Validate Phone Number
    var phoneNumber = phoneInput.value.trim();
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
        alert("Phone number should be 10 digits");
        return false;
    }

    // Validate Day, Month, Year
    var day = parseInt(dayInput.value, 10);
    var month = parseInt(monthInput.value, 10);
    var year = parseInt(yearInput.value, 10);

    // Check for empty or invalid values
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        alert("Please enter a valid date of birth");
        return false;
    }

    // Check for valid year input
    if (year > 2017) {
        alert("Invalid year (should be less than 2017)");
        return false;
    }

    // Validate Gender
    var selectedGender = Array.from(genderInputs).some(input => input.checked);
    if (!selectedGender) {
        alert("Please select a gender");
        return false;
    }

    // Validate Email
    var email = emailInput.value.trim();
    if (!email) {
        alert("Email cannot be empty");
        return false;
    }

    // Validate Photo
    if (!photoInput.files || photoInput.files.length === 0) {
        alert("Photo cannot be empty");
        return false;
    }

    // All validations passed
    return true;
}

function validateAndDisplayChildInfo() {
    if (validateForm()) {
        var nameInput = document.getElementById('text-input');
        var photoInput = document.getElementById('photo1');

        if (nameInput && photoInput && photoInput.files && photoInput.files.length > 0) {
            var formData = {
                name: nameInput.value.trim(),
                gender: getSelectedGender(),
            };

            // Store the child's name in local storage
            localStorage.setItem('childName', formData.name);

            // Display the child's name on the Parent Dashboard and Course Enrollment page
            displayChildNameOnPages(formData.name);

            openPrintWindow(formData, photoInput.files[0]);
        } else {
            console.error("Error: Unable to retrieve name or photo input element.");
        }
    }
}
function openPrintWindow() {
    const printWindow = window.open('', '_blank');

    if (!printWindow) {
        alert("You have closed the printing window. Here the registration page");
        return;
    }

    const formData = {
        name: document.getElementById('text-input').value.trim(),
        gender: getSelectedGender(),
        day: document.getElementById('day').value,
        month: document.getElementById('month').value,
        year: document.getElementById('year').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        // Add other fields similarly...
    };

    const photoInput = document.getElementById('photo1');
    const photoFile = photoInput.files[0];

    const childInfoDiv = document.createElement('div');
    childInfoDiv.style.border = '1px solid black'; // Add border styling

    if (photoFile) {
        const clonedPictureElement = new Image();
        clonedPictureElement.src = URL.createObjectURL(photoFile);
        clonedPictureElement.alt = 'Child Photo';

        clonedPictureElement.width = 100; 
        clonedPictureElement.height = 100; 

        clonedPictureElement.onload = function () {
            childInfoDiv.appendChild(clonedPictureElement);

            const nameParagraph = document.createElement('p');
            nameParagraph.textContent = `Child's Name: ${formData.name}`;
            childInfoDiv.appendChild(nameParagraph);

            const genderParagraph = document.createElement('p');
            genderParagraph.textContent = `Gender: ${formData.gender}`;
            childInfoDiv.appendChild(genderParagraph);

            const formattedDate = `${formData.day}-${formData.month}-${formData.year}`;
            const dateParagraph = document.createElement('p');
            dateParagraph.textContent = `Birth Date: ${formattedDate}`;
            childInfoDiv.appendChild(dateParagraph);

            const phoneParagraph = document.createElement('p');
            phoneParagraph.textContent = `Phone: ${formData.phone}`;
            childInfoDiv.appendChild(phoneParagraph);

            const emailParagraph = document.createElement('p');
            emailParagraph.textContent = `Email: ${formData.email}`;
            childInfoDiv.appendChild(emailParagraph);

            printWindow.document.body.appendChild(childInfoDiv);

            printWindow.print();
            printWindow.close();
        };

        clonedPictureElement.onerror = function () {
            console.error("Error loading the image.");
            printWindow.close();
        };
    } else {
        console.warn("No photo selected.");

        const nameParagraph = document.createElement('p');
        nameParagraph.textContent = `Child's Name: ${formData.name}`;
        childInfoDiv.appendChild(nameParagraph);

        const genderParagraph = document.createElement('p');
        genderParagraph.textContent = `Gender: ${formData.gender}`;
        childInfoDiv.appendChild(genderParagraph);

        const formattedDate = `${formData.day}-${formData.month}-${formData.year}`;
        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = `Birth Date: ${formattedDate}`;
        childInfoDiv.appendChild(dateParagraph);

        const phoneParagraph = document.createElement('p');
        phoneParagraph.textContent = `Phone: ${formData.phone}`;
        childInfoDiv.appendChild(phoneParagraph);

        const emailParagraph = document.createElement('p');
        emailParagraph.textContent = `Email: ${formData.email}`;
        childInfoDiv.appendChild(emailParagraph);

        printWindow.document.body.appendChild(childInfoDiv);

        printWindow.print();
        printWindow.close();
    }
}




function getSelectedGender() {
    var genderInputs = document.getElementsByName('gender');
    var selectedGender = '';

    genderInputs.forEach(function (input) {
        if (input.checked) {
            selectedGender = input.value;
        }
    });

    return selectedGender;
}

function displayChildNameOnPages(childName) {
    var parentDashboardElement = document.getElementById('parentDashboard');
    if (parentDashboardElement) {
        parentDashboardElement.textContent = 'Child\'s Name: ' + childName;
    }

    var courseEnrollmentElement = document.getElementById('courseEnrollment');
    if (courseEnrollmentElement) {
        courseEnrollmentElement.textContent = 'Enrolled Child: ' + childName;
    }

}