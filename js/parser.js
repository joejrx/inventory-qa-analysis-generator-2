document.addEventListener("DOMContentLoaded", () => {

    const fileInput = document.getElementById("fileInput");
    const generateBtn = document.getElementById("generateBtn");

    generateBtn.addEventListener("click", () => {

        const file = fileInput.files[0];

        if (!file) {
            alert("Please select an Excel file.");
            return;
        }

        const results = document.getElementById("results");

        results.innerHTML = `
            <h2>File Loaded</h2>
            <p><strong>File Name:</strong> ${file.name}</p>
            <p><strong>File Size:</strong> ${Math.round(file.size / 1024)} KB</p>
        `;

    });

});
