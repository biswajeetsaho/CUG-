import { useState } from "react";
import * as XLSX from "xlsx";
import { getDatabase, set, ref, onValue } from "firebase/database";
import Fapp from "../firebase";
import Header from "../Header";
const UploadCUGBill = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setData(sheetData);
      };
      reader.readAsBinaryString(file);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const db = getDatabase(Fapp);
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0]; // Use date as the unique key
    // Check if data is available
    if (data.length <= 1) {
      setError("No data to submit");
      return;
    }

    // Remove the header row
    const [header, ...rows] = data;

    // Check if header columns are correct
    const expectedHeader = [
      "CUG NO",
      "Periodic Charge",
      "Amount Usage",
      "Amount Data",
      "Voice ",
      "Video",
      "SMS",
      "VAS",
    ];

    if (JSON.stringify(header) !== JSON.stringify(expectedHeader)) {
      setError("Invalid file format");
      return;
    }

    // Iterate over the rows and submit each entry to Firebase
    rows.forEach((row) => {
      const [
        cugNo,
        periodicCharge,
        AmountUsage,
        AmountData,
        Voice,
        Video,
        SMS,
        VAS,
      ] = row;

      if (
        cugNo === "" ||
        periodicCharge === "" ||
        AmountUsage === "" ||
        AmountData === "" ||
        Voice === "" ||
        Video === "" ||
        SMS === "" ||
        VAS === ""
      ) {
        setError("Some rows have missing fields");
        return;
      }

      const newCugRef = ref(db, `CUGBILL/${dateStr}/${cugNo}`);
      set(newCugRef, {
        Employee_CUG: cugNo,
        Periodic_Charge: periodicCharge,
        Amount_Usage: AmountUsage,
        Amount_Data: AmountData,
        Voice: Voice,
        Video: Video,
        SMS: SMS,
        VAS: VAS,
        Total:
          periodicCharge + AmountUsage + AmountData + Voice + Video + SMS + VAS,
      })
        .then(() => {
          setError(""); // Clear any previous errors
        })
        .catch((err) => {
          setError(`Error submitting data: ${err.message}`);
        });
    });

    alert("Data Submitted Successfully");
  };

  return (
    <main className="uploadCugbill">
      <Header />
      <br />
      <h1>Upload CUG Bill</h1>
      <br />
      <label htmlFor="inputFile" className="form-label">
        Please Upload the bill. &#40; File Should be in .XLSX Format! &#41;
      </label>
      <input
        type="file"
        accept=".xlsx"
        className="form-control"
        id="inputFile"
        onChange={handleFileUpload}
      />
      <br />
      {error && <div className="alert alert-danger">{error}</div>}
      {data.length > 0 && (
        <>
          <div className="table-responsive">
            <table className="table table-bordered ">
              <thead>
                <tr>
                  {data[0].map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          <button className="btn btn-primary" onClick={handleSubmit}>
            Upload
          </button>
        </>
      )}
    </main>
  );
};

export default UploadCUGBill;
