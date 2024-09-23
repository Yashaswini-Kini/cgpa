$(document).ready(function() {
    // jQuery event for navigation menu
    $('nav .nav-link').click(function(e) {
        e.preventDefault();
        $('.content-section').hide();
        const targetSection = $(this).attr('href');
        $(targetSection).fadeIn();
    });

    // Initially display the home section
    $('#home').show();

    // Generate subject input fields
    $('#generate-btn').click(function() {
        const subjectCount = $('#subjectCount').val();
        const subjectInputs = $('#subjectInputs');
        subjectInputs.empty();
        
        if (subjectCount > 0) {
            for (let i = 0; i < subjectCount; i++) {
                subjectInputs.append(`
                    <div class="form-group row mb-3">
                        <div class="col-md-6">
                            <label for="credit${i}" class="form-label">Credits for Subject ${i + 1}:</label>
                            <input type="number" id="credit${i}" class="form-control" placeholder="Enter Credits">
                        </div>
                        <div class="col-md-6">
                            <label for="marks${i}" class="form-label">Marks for Subject ${i + 1}:</label>
                            <input type="number" id="marks${i}" class="form-control" placeholder="Enter Marks">
                        </div>
                    </div>
                `);
            }
        }
    });

    // Calculate CGPA based on marks and credits
    $('#calculate-btn').click(function() {
        const subjectCount = $('#subjectCount').val();
        let totalPoints = 0;
        let totalCredits = 0;

        for (let i = 0; i < subjectCount; i++) {
            const credit = parseFloat($(`#credit${i}`).val());
            const marks = parseFloat($(`#marks${i}`).val());

            if (isNaN(credit) || isNaN(marks) || marks < 0 || marks > 100) {
                alert("Please enter valid marks and credits (Marks should be between 0 and 100).");
                return;
            }

            // Convert marks to grade points using a standard mapping (university-specific)
            let gradePoint = 0;
            if (marks >= 90) gradePoint = 10;
            else if (marks >= 80) gradePoint = 9;
            else if (marks >= 70) gradePoint = 8;
            else if (marks >= 60) gradePoint = 7;
            else if (marks >= 50) gradePoint = 6;
            else if (marks >= 40) gradePoint = 5;
            else gradePoint = 0;  // Fail grade

            totalPoints += gradePoint * credit;
            totalCredits += credit;
        }

        const cgpa = totalPoints / totalCredits;
        const percentage = (cgpa - 0.75) * 10;

        $('#result1').text(`Your CGPA is: ${cgpa.toFixed(2)}`);
        $('#result2').text(`Equivalent percentage is: ${percentage.toFixed(2)} %`);
        $('#result3').text(`Total Credits earned: ${totalCredits}`);
    });
});
