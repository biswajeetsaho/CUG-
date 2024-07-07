import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { getDatabase, set, ref, onValue, remove } from "firebase/database";
import Fapp from "../firebase";
import Header from "../Header";
const UploadCUGBill = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [rowsAdded, setRowsAdded] = useState(0);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState("");
  const [billData, setBillData] = useState([]);
  const [filteredBillData, setFilteredBillData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, settoggle] = useState(0);
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
  useEffect(() => {
    const fetchBills = () => {
      const db = getDatabase(Fapp);
      const billRef = ref(db, "CUGBILL/");
      onValue(billRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const billList = Object.keys(data);
          setBills(billList);
        } else {
          setBills([]);
        }
      });
    };
    fetchBills();
  }, []);
  const handleSubmit = async (event) => {
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
    const dateRef = ref(db, `CUGBILL/${dateStr}`);
    await remove(dateRef);
    let rowsCount = 0;
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
          rowsCount++;
          setRowsAdded(rowsCount); // Update the count of rows successfully added
        })
        .catch((err) => {
          setError(`Error submitting data: ${err.message}`);
        });
    });

    alert("Data Submitted Successfully");
  };
  // ------Fetch Bills--------
  const handleFetchBills = () => {
    const db = getDatabase(Fapp);
    const billRef = ref(db, `CUGBILL/${selectedBill}/`);
    onValue(billRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const billEntries = Object.entries(data).map(([cugNo, entry]) => ({
          cugNo,
          ...entry,
        }));
        setBillData(billEntries);
        setFilteredBillData(billEntries);
      } else {
        setBillData([]);
        setFilteredBillData([]);
      }
    });
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filtered = billData.filter((entry) =>
      entry.Employee_CUG.toString().includes(searchTerm)
    );
    setFilteredBillData(filtered);
  };

  return (
    <main className="uploadCugbill">
      <Header />
      <br />
      <h1>Upload CUG Bill</h1>
      <br />
      {toggle === 0 && (
        <>
          <div className={`uploadCugbill__container`}>
            <label htmlFor="inputFile" className="form-label">
              Please Upload the bill. &#40; File Should be in .XLSX Format!
              &#41;
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
            <br />
            {rowsAdded > 0 && (
              <>
                <br />
                <div className="alert alert-success">
                  {rowsAdded} rows successfully added to the database.
                </div>
              </>
            )}
            <br />
            <button className="btn btn-success" onClick={() => settoggle(1)}>
              View Existing Bill ?
            </button>
          </div>
          <br />
        </>
      )}
      {toggle === 1 && (
        <>
          <div className={`viewBill_Container`}>
            <label htmlFor="selectBill" className="form-label">
              View Existing Bill
            </label>
            <select
              className="form-select "
              id="selectBill"
              value={selectedBill}
              onChange={(e) => {
                setSelectedBill(e.target.value);
              }}
            >
              <option value="">-- Select Bill --</option>
              {bills.map((bill, index) => (
                <option key={index} value={bill}>
                  {bill}
                </option>
              ))}
            </select>
            <br />
            <button className="btn btn-secondary" onClick={handleFetchBills}>
              Go
            </button>
            <br />
            {billData.length > 0 && (
              <>
                <label htmlFor="search" className="form-label">
                  Search by CUG Number:
                </label>
                <input
                  type="number"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-control"
                />
                <br />
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Employee CUG</th>
                        <th>Periodic Charge</th>
                        <th>Amount Usage</th>
                        <th>Amount Data</th>
                        <th>Voice</th>
                        <th>Video</th>
                        <th>SMS</th>
                        <th>VAS</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBillData.map((entry, index) => (
                        <tr key={index}>
                          <td>{entry.Employee_CUG}</td>
                          <td>{entry.Periodic_Charge}</td>
                          <td>{entry.Amount_Usage}</td>
                          <td>{entry.Amount_Data}</td>
                          <td>{entry.Voice}</td>
                          <td>{entry.Video}</td>
                          <td>{entry.SMS}</td>
                          <td>{entry.VAS}</td>
                          <td>{entry.Total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <button className="btn btn-danger" onClick={() => settoggle(0)}>
              Go Back
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default UploadCUGBill;
