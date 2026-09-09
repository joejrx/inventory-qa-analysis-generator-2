function calculateSummary(rows) {

    const totalDiscrepancies = rows.length;

    const shortages = rows.filter(
        row => row["Discrepancy Type"] === "Shortage"
    ).length;

    const overages = rows.filter(
        row => row["Discrepancy Type"] === "Overage"
    ).length;

    const resolved = rows.filter(
        row => row["Resolution Status"] === "Resolved"
    ).length;

    const open = totalDiscrepancies - resolved;

    const resolutionRate =
        totalDiscrepancies > 0
            ? Math.round((resolved / totalDiscrepancies) * 100)
            : 0;

    return {
        totalDiscrepancies,
        shortages,
        overages,
        resolved,
        open,
        resolutionRate
    };

}

function getRootCauseCounts(rows) {

    const counts = {

        "Dispensing Error": 0,
        "Product Misplaced": 0,
        "Product Left at POS / Window": 0,
        "Product Swap": 0,
        "Quarantine Documentation": 0,
        "Destruction Documentation": 0,
        "End of Day Closing Error": 0,
        "Inventory Count Error": 0,
        "Receiving Error": 0,
        "Transfer Error": 0,
        "Dutchie / METRC Mismatch": 0,
        "Network / Offline Transaction Issue": 0,
        "Patient Return / Exchange Correction": 0,
        "Unknown Cause": 0,
        "Other": 0

    };

    rows.forEach(row => {

        const cause = row["Root Cause Category"];

        if (cause && counts.hasOwnProperty(cause)) {
            counts[cause]++;
        }

    });

    return counts;

}

function getTopRootCause(rootCauseCounts) {

    const
