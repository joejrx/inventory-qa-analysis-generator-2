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
