document.addEventListener("DOMContentLoaded", () => {

    const fileInput = document.getElementById("fileInput");
    const generateBtn = document.getElementById("generateBtn");

    generateBtn.addEventListener("click", () => {

        const file = fileInput.files[0];

        if (!file) {
            alert("Please select an Excel file.");
            return;
        }

        alert("Parser loaded successfully.");

        console.log(file.name);

    });

});
