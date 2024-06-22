import { useState } from "react";
import * as XLSX from "xlsx";

const UploadCUGBill = () => {
  const [data, setData] = useState([]);

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

  return (
    <main className="uploadCugbill">
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
      {data.length > 0 && (
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
      )}
    </main>
  );
};

export default UploadCUGBill;
