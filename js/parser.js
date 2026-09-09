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
        const selectedStore =
    document.getElementById("storeSelect").value;
        const filteredRows =
    rows.filter(
        row => row["Store Name"] === selectedStore
    );

        const summary = calculateSummary(filteredRows)

        const rootCauseCounts =
           getRootCauseCounts(filteredRows);

        const topRootCause =
            getTopRootCause(rootCauseCounts);

        const storeName =
            selectedStore;

        const reviewPeriod =
          getReviewPeriod(filteredRows);

        const sortedRootCauses =
            Object.entries(rootCauseCounts)
                .sort((a, b) => b[1] - a[1]);

        let rootCauseHtml = "";

        sortedRootCauses.forEach(([cause, count]) => {

            rootCauseHtml += `
                <tr>
                    <td>${cause}</td>
                    <td>${count}</td>
                </tr>
            `;

        });

        let findingsHtml = "";

        const topThree =
            sortedRootCauses
                .filter(item => item[1] > 0)
                .slice(0, 3);

        topThree.forEach(([cause, count], index) => {

            let recommendation =
                "Continue monitoring this category.";

            switch (cause) {

                case "Dispensing Error":
                    recommendation =
                        "Review transaction verification procedures and product confirmation practices.";
                    break;

                case "Product Swap":
                    recommendation =
                        "Reinforce scan verification and final product review procedures.";
                    break;

                case "Quarantine Documentation":
                    recommendation =
                        "Review quarantine workflow and documentation requirements.";
                    break;

                case "Inventory Count Error":
                    recommendation =
                        "Review inventory count procedures and verification practices.";
                    break;

                case "Network / Offline Transaction Issue":
                    recommendation =
                        "Review outage recovery and transaction synchronization procedures.";
                    break;

                case "Patient Return / Exchange Correction":
                    recommendation =
                        "Review exchange and correction procedures with staff.";
                    break;

            }

            findingsHtml += `
                <div class="finding-card">

                    <h3>
                        Finding #${index + 1}
                    </h3>

                    <p>
                        <strong>${cause}</strong> accounted for
                        <strong>${count}</strong>
                        discrepancies during the review period.
                    </p>

                    <p>
                        <strong>Recommendation:</strong>
                        ${recommendation}
                    </p>

                </div>
            `;

        });

        document.getElementById("results").innerHTML = `

            <div class="report-banner">

                <h2>Inventory Discrepancy QA Review</h2>

                <p>
                    <strong>Store:</strong>
                    ${storeName}
                </p>

                <p>
                    <strong>Review Period:</strong>
                    ${reviewPeriod}
                </p>

                <p>
                    <strong>Records Reviewed:</strong>
                    ${summary.totalDiscrepancies}
                </p>

            </div>

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

            <h2 style="margin-top:40px;">
                Root Cause Analysis
            </h2>

            <table class="root-cause-table">

                <thead>
                    <tr>
                        <th>Root Cause</th>
                        <th>Count</th>
                    </tr>
                </thead>

                <tbody>
                    ${rootCauseHtml}
                </tbody>

            </table>

            <h2 style="margin-top:40px;">
                Findings & Observations
            </h2>

            ${findingsHtml}

        `;

    };

    reader.readAsArrayBuffer(file);

}
