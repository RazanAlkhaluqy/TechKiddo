document.addEventListener('DOMContentLoaded', function () {
    const starRatings = document.querySelectorAll('.star-rating');
    const ratingInputs = document.querySelectorAll('.selected-rating');

    starRatings.forEach((starRating, index) => {
        const stars = starRating.querySelectorAll('.star');

        stars.forEach(star => {
            star.addEventListener('click', function () {
                const rating = this.getAttribute('data-rating');
                ratingInputs[index].value = rating;

                // Reset all stars in this set
                stars.forEach(s => s.textContent = '☆');

                // Highlight selected stars
                for (let i = 0; i < rating; i++) {
                    stars[i].textContent = '★';
                }
            });
        });
    });

    // Get the form element
    const form = document.getElementById('evaluationForm');

    // Attach the submit event listener to the form
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Call the validation function
        validateAndSubmit();
    });
});

function validateAndSubmit() {
    var courseSelect = document.getElementById('course-select');
    var ratingInputs = document.querySelectorAll('.selected-rating');
    var feedbackTextarea = document.getElementById('feedback');

    // Check if a course is selected
    if (courseSelect.value === "") {
        alert("Please select a course");
        return;
    }

    // Check if both rating inputs have values
    for (var i = 0; i < ratingInputs.length; i++) {
        if (ratingInputs[i].value === "") {
            alert("Please provide ratings for all questions");
            return;
        }
    }

    // Check if the feedback textarea is not empty
    if (feedbackTextarea.value.trim() === "") {
        alert("Please provide feedback");
        return;
    }

    // If validation passes, submit the form
    document.getElementById('evaluationForm').submit();
}
function validateAndSubmit() {
    var courseSelect = document.getElementById('course-select');
    var ratingInputs = document.querySelectorAll('.selected-rating');
    var feedbackTextarea = document.getElementById('feedback');

    // Check if a course is selected
    if (courseSelect.value === "") {
        alert("Please select a course");
        return;
    }

    // Check if both rating inputs have values
    for (var i = 0; i < ratingInputs.length; i++) {
        if (ratingInputs[i].value === "") {
            alert("Please provide ratings for all questions");
            return;
        }
    }

    // Check if the feedback textarea is not empty
    if (feedbackTextarea.value.trim() === "") {
        alert("Please provide feedback");
        return;
    }

    // If validation passes, display a custom alert
    var courseName = courseSelect.options[courseSelect.selectedIndex].text;
    var userRating = ratingInputs[0].value; // Assuming there is only one rating in your form

    alert("Thank you for your feedback!\nYour rating for course " + courseName + " is " + userRating);
}
