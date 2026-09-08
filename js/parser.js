document.addEventListener("DOMContentLoaded", () => {

    const fileInput = document.getElementById("fileInput");
    const generateBtn = document.getElementById("generateBtn");

    generateBtn.addEventListener("click", () => {

        const file = fileInput.files[0];

        if (!file) {
            alert("Please select a file.");
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

        const firstSheet =
            workbook.SheetNames[0];

        const worksheet =
            workbook.Sheets[firstSheet];

        const rows =
            XLSX.utils.sheet_to_json(worksheet);

        console.log(rows);

        document.getElementById("results")
            .innerHTML =
            `<pre>${JSON.stringify(rows, null, 2)}</pre>`;
    };

    reader.readAsArrayBuffer(file);
}
