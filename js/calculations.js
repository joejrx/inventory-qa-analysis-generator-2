function calculateSummary(rows) {

    return {

        totalDiscrepancies: rows.length,

        shortages: rows.filter(
            row => row["Discrepancy Type"] === "Shortage"
        ).length,

        overages: rows.filter(
            row => row["Discrepancy Type"] === "Overage"
        ).length,

        resolved: rows.filter(
            row => row["Resolution Status"] === "Resolved"
        ).length

    };

}
