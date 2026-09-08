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

    const reader = new FileReader();

    reader.onload = function (e) {

        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(data, {
            type: "array"
        });

        const firstSheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[firstSheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet);

        const summary = calculateSummary(rows);

        const rootCauseCounts =
            getRootCauseCounts(rows);

        const topRootCause =
            getTopRootCause(rootCauseCounts);

        document.getElementById("results").innerHTML = `
            <h2>Executive Summary</h2>

            <p>Total Discrepancies: ${summary.totalDiscrepancies}</p>

            <p>Shortages: ${summary.shortages}</p>

            <p>Overages: ${summary.overages}</p>

            <p>Resolved: ${summary.resolved}</p>

            <p>Open: ${summary.open}</p>

            <p>Resolution Rate: ${summary.resolutionRate}%</p>

            <p>Top Root Cause: ${topRootCause}</p>
        `;

    };

    reader.readAsArrayBuffer(file);

}
