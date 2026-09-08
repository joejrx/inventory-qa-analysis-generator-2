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

            <p><strong>Total Discrepancies:</strong>
                ${summary.totalDiscrepancies}
            </p>

            <p><strong>Shortages:</strong>
                ${summary.shortages}
            </p>

            <p><strong>Overages:</strong>
                ${summary.overages}
            </p>

            <p><strong>Resolved:</strong>
                ${summary.resolved}
            </p>

            <p><strong>Open:</strong>
                ${summary.open}
            </p>

            <p><strong>Resolution Rate:</strong>
                ${summary.resolutionRate}%
            </p>

            <p><strong>Top Root Cause:</strong>
                ${topRootCause}
            </p>

        `;

        console.log(rows);
        console.log(summary);

    };

    reader.readAsArrayBuffer(file);

}
