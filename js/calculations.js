function calculateSummary(rows) {
    function getRootCauseCounts(rows) {

    const counts = {};

    rows.forEach(row => {

        const cause =
            row["Root Cause Category"] || "Unknown";

        counts[cause] =
            (counts[cause] || 0) + 1;

    });

    return counts;

}
function getTopRootCause(rootCauseCounts) {

    const sorted =
        Object.entries(rootCauseCounts)
            .sort((a, b) => b[1] - a[1]);

    return sorted.length > 0
        ? sorted[0][0]
        : "None";

}
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
