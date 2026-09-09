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

            <h2>Executive Dashboard</h2>

            <div class="kpi-container">

                <div class="kpi-card">
                    <div class="kpi-label">Total Discrepancies</div>
                    <div class="kpi-value">${summary.totalDiscrepancies}</div>
                </div>

                <div class="kpi-card">
                    <div class="kpi-label">Shortages</div>
                    <div class="kpi-value">${summary.shortages}</div>
                </div>

                <div class="kpi-card">
                    <div class="kpi-label">Overages</div>
                    <div class="kpi-value">${summary.overages}</div>
                </div>

                <div class="kpi-card">
                    <div class="kpi-label">Open Items</div>
                    <div class="kpi-value">${summary.open}</div>
                </div>

                <div class="kpi-card">
                    <div class="kpi-label">Resolution Rate</div>
                    <div class="kpi-value">${summary.resolutionRate}%</div>
                </div>

                <div class="kpi-card">
                    <div class="kpi-label">Top Root Cause</div>
                    <div class="kpi-value">${topRootCause}</div>
                </div>

            </div>

        `;

    };

    reader.readAsArrayBuffer(file);

}
