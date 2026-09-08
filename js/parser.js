document.addEventListener("DOMContentLoaded", () => {

    const fileInput = document.getElementById("fileInput");
    const generateBtn = document.getElementById("generateBtn");

    generateBtn.addEventListener("click", () => {

        const file = fileInput.files[0];

        if (!file) {
            alert("Please select an Excel file.");
            return;
        }

        readExcelFile(file);

    });

});

function readExcelFile(file) {

    alert("Starting readExcelFile");

    const reader = new FileReader();

    reader.onload = function (e) {

        alert("File loaded");

        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(data, {
            type: "array"
        });

        alert("Workbook opened");

        const firstSheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[firstSheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet);

        alert(`Rows Found: ${rows.length}`);

        const summary = calculateSummary(rows);

        alert("Summary calculated");

        document.getElementById("results").innerHTML =
            "<h2>TEST SUCCESS</h2>";

    };

    reader.readAsArrayBuffer(file);

}
