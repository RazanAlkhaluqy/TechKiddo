
         document.addEventListener('DOMContentLoaded', function () {
            // Retrieve child's name from local storage
            var childName = localStorage.getItem('childName');
        
            // Update the course enrollment element with the child's name
            var courseEnrollmentElement = document.getElementById('courseEnrollment');
            if (courseEnrollmentElement && childName) {
                courseEnrollmentElement.textContent = "Enroll for courses for " + childName;
            }
        
            // Retrieve children's names from local storage
            var storedChildrenNames = JSON.parse(localStorage.getItem("childrenNames")) || [];
        
            // Assume you have a newKidName variable with the name of the newly registered kid
            var newKidName = childName;
        
            // Add the new kid's name to the local storage
            storedChildrenNames.push(newKidName);
            localStorage.setItem("childrenNames", JSON.stringify(storedChildrenNames));
        
            // Get the kid select element
            var kidSelect = document.getElementById("kid-select");
        
            // Function to update kid select options
            function updateKidSelectOptions() {

                // Clear existing options
                kidSelect.innerHTML = "";
        
                // Add default option
                var defaultOption = document.createElement("option");
                defaultOption.value = "";
                defaultOption.textContent = "Select Kid";
                kidSelect.appendChild(defaultOption);
        
                // Add existing children's names as options
                storedChildrenNames.forEach(function (name) {
                    var option = document.createElement("option");
                    option.value = name;
                    option.textContent = name;
                    kidSelect.appendChild(option);
                });
            }
        
            // Initial update of kid select options
            updateKidSelectOptions();
        
            // Add the new kid's name as an option
            var newKidOption = document.createElement("option");
            newKidOption.value = newKidName;
            newKidOption.textContent = newKidName;
            kidSelect.appendChild(newKidOption);
        
            // Add event listener for kid select focus
            kidSelect.addEventListener("focus", updateKidSelectOptions);
        
    
        
            // Create a multidimensional array for courses
            var coursesArray = [
                { name: "Java", tutor: "Mohammed", prerequisite: "" },
                { name: "Scratch", tutor: "Norah", prerequisite: "" },
                { name: "Web", tutor: "Abeer", prerequisite: "Scratch" },
                { name: "JavaScript", tutor: "Rehab", prerequisite: "Java" },
                { name: "Python", tutor: "Mohammed", prerequisite: "Scratch" },
                { name: "SQL", tutor: "Norah", prerequisite: "Web" },
                { name: "HTML", tutor: "Abeer", prerequisite: "Scratch" },
                { name: "CSS", tutor: "Rehab", prerequisite: "Web" },
                { name: "HTML", tutor: "Mohammed", prerequisite: "JavaScript" },
            ];
        
            // Populate filter options from the array, ensuring unique tutors and prerequisites
            var filterSelect = document.getElementById("courseFilters");
            var tutorsSet = new Set();
            var prerequisitesSet = new Set();
        
            coursesArray.forEach(function (course) {
                tutorsSet.add(course.tutor);
                prerequisitesSet.add(course.prerequisite);
            });
        
            // Clear existing options
            filterSelect.innerHTML = "";
        
            // Add default option
            var defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Select Filter";
            filterSelect.appendChild(defaultOption);
        
            tutorsSet.forEach(function (tutor) {
                var option = document.createElement("option");
                option.value = tutor.toLowerCase();
                option.textContent = tutor;
                filterSelect.add(option);
            });
        
            prerequisitesSet.forEach(function (prerequisite) {
                var option = document.createElement("option");
                option.value = prerequisite.toLowerCase();
                option.textContent = prerequisite || "None";
                filterSelect.add(option);
            });
        
            // Function to update available courses based on the selected filter
            function updateAvailableCourses() {
                var selectedFilter = filterSelect.value;
        
                // Filter courses based on the selected tutor or prerequisite
                var filteredCourses = coursesArray.filter(function (course) {
                    return (
                        course.tutor.toLowerCase() === selectedFilter.toLowerCase() ||
                        course.prerequisite.toLowerCase() === selectedFilter.toLowerCase()
                    );
                });
        
                // Populate the course options
                var fieldset = document.querySelector("fieldset");
                fieldset.innerHTML = "<legend><h3>Available Courses:</h3></legend>";
        
                filteredCourses.forEach(function (course) {
                    var div = document.createElement("div");
                    div.classList.add("course-label");
        
                    var label = document.createElement("label");
                    label.htmlFor = course.name.toLowerCase().replace(/\s/g, ""); // Remove spaces from course name for ID
                    label.innerHTML =
                        '<input type="checkbox" id="' +
                        label.htmlFor +
                        '" name="courses[]" value="' +
                        course.name.toLowerCase() +
                        '">' +
                        '<img src="image/' +
                        course.name.toLowerCase() +
                        '.jpg" alt="' +
                        course.name +
                        ' logo" class="size-image">' +
                        course.name;
        
                    div.appendChild(label);
                    fieldset.appendChild(div);
                });
            }
        
            // Add event listener for filter selection change
            filterSelect.addEventListener("change", updateAvailableCourses);
        
            // Function to handle form submission
            function handleFormSubmission(event) {
                event.preventDefault();
        
                // Get the selected child
                var selectedKid = kidSelect.value;
        
                // Get the selected courses
                var selectedCourses = [];
                var checkboxes = document.querySelectorAll('input[name="courses[]"]:checked');
                checkboxes.forEach(function (checkbox) {
                    selectedCourses.push(checkbox.value);
                });
        
                // Check if required fields are filled
                if (!selectedKid) {
                    alert("Please select a child.");
                    return;
                }
        
                if (selectedCourses.length === 0) {
                    alert("Please select at least one course.");
                    return;
                }
        
                // Display the selected information on the page
                var displayInfo = document.getElementById("display-info");
        
                // Clear previous information
                displayInfo.innerHTML = "";
        
                // Display new information
                displayInfo.innerHTML += "<h2>Enrollment Information</h2>";
                displayInfo.innerHTML += "<p><strong>Child Name:</strong> " + selectedKid + "</p>";
                displayInfo.innerHTML += "<p><strong>Selected Courses:</strong> " + selectedCourses.join(", ") + "</p>";
        
                // Clear the form
                event.target.reset();
        
                // Update available courses when the form is cleared
                updateAvailableCourses();
            }
        



            
            // Add event listener for form submission
            var enrollmentForm = document.getElementById("enrollment-form");
            enrollmentForm.addEventListener("submit", handleFormSubmission);
        });
        