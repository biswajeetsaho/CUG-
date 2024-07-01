import { Outlet } from "react-router-dom";
// import "./billRegister.css";
import { useState, useEffect } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import Fapp from "../firebase";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from "../Header";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
// --------------------Document Structure-------------
const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  header: {
    textAlign: "center",
  },
  subHeader: {
    textAlign: "center",
    marginBottom: 10,
  },
  smallText: {
    textAlign: "center",
    fontSize: 10,
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "33%",
  },
  tableColHeader: {
    width: "33%",
    borderStyle: "solid",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 3,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
  tableCell: {
    margin: 3,
    fontSize: 8,
  },
  tableCellRightHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
  },
  tableCellRight: {
    margin: 3,
    fontSize: 8,
    textAlign: "right",
  },
  divisionTitleContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 5,
    marginBottom: 3,
    width: "20%", // Adjust the width as needed
  },
  divisionTitle: {
    fontSize: 8,
    textAlign: "left",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 5,
  },
  footerText: {
    fontSize: 9,
    marginTop: 4,
    marginLeft: 10,
  },
  footerTextBold: {
    fontSize: 10,
    fontWeight: "bolder",
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 4,
  },
  footerTextBoldTotal: {
    fontSize: 10,
    fontWeight: "bolder",
    marginLeft: 200,
    marginBottom: 10,
  },
  extraHL: {
    borderBottomWidth: 1,
    marginTop: 1,
    marginBottom: 1,
    borderBottomColor: "#000",
    width: "30%",
    marginLeft: "350",
  },
  footerPText: {
    fontSize: 10,
    textAlign: "left",
  },
  footerSign: {
    fontSize: 11,
    textAlign: "right",
    marginRight: "40",
  },
  footerSignText: {
    fontSize: 11,
    textAlign: "right",
    marginRight: "30",
    marginBottom: "10",
  },
  footerPassed: {
    fontSize: 11,
    textAlign: "left",
    marginLeft: "20",
    marginBottom: "10",
  },
  footerGross: {
    fontSize: 11,
    textAlign: "left",
    marginLeft: "20",
    marginBottom: "2",
  },
  footerDeduction: {
    fontSize: 11,
    textAlign: "left",

    marginBottom: "2",
  },
  footerAfter: {
    fontSize: 11,
    textAlign: "left",
    marginLeft: "16",
    marginBottom: "2",
  },
  footerGST: {
    fontSize: 11,
    textAlign: "left",
    marginLeft: "60",
    marginBottom: "2",
  },
  footerLine: {
    borderBottomWidth: 1,
    marginTop: 2,
    marginBottom: 2,
    borderBottomColor: "#000",
    marginLeft: "20",
    width: "30%",
  },
  footerTotal: {
    fontSize: 11,
    textAlign: "left",
    marginLeft: "20",
    marginBottom: "20",
  },
  footerExtrsSign: {
    fontSize: 11,
    textAlign: "right",
    marginTop: 10,
  },
  footerExtrsSignText: {
    fontSize: 11,
    textAlign: "right",
    marginRight: "10",
  },
});
const MyDocument = ({ data }) => {
  console.log("Clicked", data);
  // ------calculating Date
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const currentMonth = now.toLocaleString("default", { month: "long" });
  const currentYear = now.getFullYear();
  // -----------Calculating Totals
  const grandTotal = data
    .reduce((sum, division) => {
      const divisionName = Object.keys(division)[0];
      const departments = division[divisionName];
      const totalForDivision = Object.values(departments).reduce(
        (sum, dept) => sum + dept.total,
        0
      );
      return sum + totalForDivision;
    }, 0)
    .toFixed(2);

  const Final_Amount = (
    parseFloat(grandTotal) +
    0.18 * parseFloat(grandTotal)
  ).toFixed(2);

  // Arrays for converting numbers into words
  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  // Function to convert a number into words
  const convertToWords = (num) => {
    if (num === 0) return "zero";

    const [integerPart, decimalPart] = num.toString().split(".");
    const integerWords = convertIntegerToWords(parseInt(integerPart, 10));

    let decimalWords = "";
    if (decimalPart) {
      const decimalNumber = parseInt(
        decimalPart.padEnd(2, "0").slice(0, 2),
        10
      );
      decimalWords = ` and ${convertIntegerToWords(decimalNumber)} paisa`;
    }

    return `${integerWords}${decimalWords}`;
  };

  const convertIntegerToWords = (num) => {
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100)
      return `${tens[Math.floor(num / 10)]} ${ones[num % 10]}`.trim();
    if (num < 1000)
      return `${ones[Math.floor(num / 100)]} hundred ${convertIntegerToWords(
        num % 100
      )}`.trim();
    if (num < 1000000)
      return `${convertIntegerToWords(
        Math.floor(num / 1000)
      )} thousand ${convertIntegerToWords(num % 1000)}`.trim();
    if (num < 1000000000)
      return `${convertIntegerToWords(
        Math.floor(num / 1000000)
      )} million ${convertIntegerToWords(num % 1000000)}`.trim();
    return "overflow";
  };

  const words = convertToWords(Final_Amount);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>East Coast Railway Bhubaneswar</Text>
        <Text style={styles.subHeader}>Showing Bill Passing Register</Text>
        <Text style={styles.smallText}>
          For the Month of: {currentMonth} {currentYear}
        </Text>

        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Department</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Date</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellRightHeader}>Amount</Text>
          </View>
        </View>

        {data.map((division, index) => {
          const divisionName = Object.keys(division)[0];
          const departments = division[divisionName];
          const totalForDivision = Object.values(departments)
            .reduce((sum, dept) => sum + dept.total, 0)
            .toFixed(2);

          return (
            <>
              <View style={styles.divisionTitleContainer}>
                <Text style={styles.divisionTitle}>
                  Division: {divisionName}
                </Text>
              </View>
              <View style={styles.table}>
                {Object.entries(departments).map(
                  ([deptName, deptData], index) => (
                    <View style={styles.tableRow} key={index}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{deptName}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{dateStr}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellRight}>
                          {deptData.total.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  )
                )}
              </View>
              <View style={styles.horizontalLine} />
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.footerTextBold}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.footerTextBold}></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.footerTextBold}>
                    Total: {totalForDivision} &nbsp; &nbsp; &nbsp;
                  </Text>
                </View>
              </View>
            </>
          );
        })}

        <View style={styles.horizontalLine} />
        <View style={styles.footer}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.footerTextBold}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.footerTextBold}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.footerTextBold}>
                Grand Total: {grandTotal} &nbsp; &nbsp; &nbsp;
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}></View>
            <View style={styles.tableCol}></View>
            <View style={styles.tableCol}>
              <Text style={styles.footerText}>
                Deduction: 0 &nbsp; &nbsp; &nbsp;
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}></View>
            <View style={styles.tableCol}></View>
            <View style={styles.tableCol}>
              <Text style={styles.footerText}>
                After Deduction: &nbsp; &nbsp; &nbsp; {grandTotal}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}></View>
            <View style={styles.tableCol}></View>
            <View style={styles.tableCol}>
              <Text style={styles.footerText}>
                CGST RS. &nbsp; &nbsp; &nbsp; {(0.09 * grandTotal).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}></View>
            <View style={styles.tableCol}></View>
            <View style={styles.tableCol}>
              <Text style={styles.footerText}>
                SGST RS. &nbsp; &nbsp; &nbsp; {(0.09 * grandTotal).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.extraHL} />
          <View style={styles.extraHL} />
          <View style={styles.tableRow}>
            <View style={{ ...styles.tableCol, flex: 2 }}></View>
            <View style={styles.tableCol}>
              <Text style={styles.footerTextBold}>
                Total Payable: &nbsp; {Final_Amount}
              </Text>
            </View>
          </View>
          <Text style={styles.footerPText}>
            Voucher No: ECoR/S&T/BBS/TELE/CUG
          </Text>
          <Text style={styles.footerPText}>
            Bill Passed for Rs. {Final_Amount} ({words}) and forwarded to FA &
            CAO/ECoR/BBS along with Individual Bills and Dept. summary for audit
            arranging payment through cheque in favour of Reliance JIO Infocomm
            Ltd, Mumbai Fort, Mumbai, through NEFT/RTGS.
          </Text>
          <Text style={styles.footerPText}>
            Certified that amount drawn through this bill was not drawn
            previously or will not be drawn in future.
          </Text>
          <Text style={styles.footerExtrsSign}>
            Dy. CSTE/Tele & NW/ECoR/BBS
          </Text>
          <Text style={styles.footerExtrsSignText}>For PCSTE/ECoR/BBS</Text>
        </View>
      </Page>
    </Document>
  );
};

// -------------------------------------
const BillPassingRegister = () => {
  const db = getDatabase(Fapp);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState("");
  const [divisions, setDivisions] = useState(["CON", "HQ", "MCS"]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [departmentAmounts, setDepartmentAmounts] = useState([]);
  const [grandTotall, setGrandTotal] = useState(0);
  const Divisions = ["MCS", "CON", "HQ"];
  const [DataArray, setDataArray] = useState([]); //for Report part
  const finalArray = [];
  const grandTotal = []; //for Report part
  let finalTotal = 0;
  useEffect(() => {
    const fetchBills = () => {
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
  }, [db]);

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log("Search button clicked");
    if (selectedBill === "" || selectedDivision === "") {
      alert("Please select a bill and a division.");
      return;
    }

    const employeesRef = ref(db, "Employees3/");
    const cugBillRef = ref(db, `CUGBILL/${selectedBill}/`);

    const fetchEmployees = new Promise((resolve, reject) => {
      onValue(employeesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(data);
        } else {
          reject("No employee data found");
        }
      });
    });

    const fetchCugBill = new Promise((resolve, reject) => {
      onValue(cugBillRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          resolve(data);
        } else {
          reject("No CUG Bill data found");
        }
      });
    });

    try {
      const [employeesData, cugBillData] = await Promise.all([
        fetchEmployees,
        fetchCugBill,
      ]);

      // console.log("Employees Data:", employeesData);
      // console.log("CUG Bill Data:", cugBillData);
      // ------------------------Report Section-----------

      // Iterate over each division
      Divisions.forEach((selectedDivision) => {
        const divisionObject = { [selectedDivision]: {} };

        // Iterate over employeesData for the current division
        Object.values(employeesData).forEach((employee) => {
          if (
            employee.Employee_Division === selectedDivision &&
            employee.status === "Active"
          ) {
            const department = employee.Employee_Dept;
            if (!divisionObject[selectedDivision][department]) {
              divisionObject[selectedDivision][department] = {
                total: 0,
              };
            }
            if (cugBillData[employee.Employee_CUG]) {
              divisionObject[selectedDivision][department].total += parseFloat(
                cugBillData[employee.Employee_CUG].Total
              );
            }
          }
        });
        const totalForDivision = Object.values(divisionObject[selectedDivision])
          .reduce((acc, dept) => acc + dept.total, 0)
          .toFixed(2);

        // Store the division and its total in grandTotal array
        grandTotal.push({
          division: selectedDivision,
          total: totalForDivision,
        });

        // Push the division object into the final array
        finalArray.push(divisionObject);
        finalTotal = grandTotal
          .reduce((sum, entry) => {
            return sum + parseFloat(entry.total);
          }, 0)
          .toFixed(2);
      });
      setDataArray(finalArray);
      console.log("Final Total:", finalTotal);
      console.log(finalArray);
      console.log(grandTotal);
      // ------------------------
      const departmentTotals = {};
      const departments = new Set();

      Object.values(employeesData).forEach((employee) => {
        if (
          employee.Employee_Division === selectedDivision &&
          employee.status === "Active"
        ) {
          const department = employee.Employee_Dept;
          departments.add(department);
          if (!departmentTotals[department]) {
            departmentTotals[department] = 0;
          }
          if (cugBillData[employee.Employee_CUG]) {
            departmentTotals[department] += parseFloat(
              cugBillData[employee.Employee_CUG].Total
            );
          }
        }
      });

      setDepartments(Array.from(departments));
      const departmentAmounts = Object.entries(departmentTotals).map(
        ([department, total]) => ({
          department,
          total: total.toFixed(2),
          division: selectedDivision,
        })
      );
      setDepartmentAmounts(departmentAmounts);
      setGrandTotal(
        departmentAmounts
          .reduce((sum, item) => sum + parseFloat(item.total), 0)
          .toFixed(2)
      );
      setError("");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An error occurred");
      setDepartments([]);
      setDepartmentAmounts([]);
      setGrandTotal(0);
    }
  };

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    const tableColumn = ["Department", "Amount"];
    const tableRows = [];

    departmentAmounts.forEach((item) => {
      const rowData = [item.department, item.total];
      tableRows.push(rowData);
    });

    // Adding the grand total at the bottom
    tableRows.push(["Grand Total", grandTotal]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text(
      `Bill Passing Register - ${selectedBill} - ${selectedDivision}`,
      14,
      15
    );

    doc.save("bill_passing_register.pdf");
  };

  return (
    <>
      <main className="billRegister">
        <Header />
        <br />
        <h1>Bill Passing Register</h1>
        <br />
        <div className="row g-2">
          <div className="col-6">
            <label htmlFor="selectBill" className="form-label">
              Select Bill
            </label>
            <select
              className="form-select "
              id="selectBill"
              value={selectedBill}
              onChange={(e) => {
                setSelectedBill(e.target.value);
                setDepartmentAmounts([]);
                setError("");
              }}
            >
              <option value="">-- Select Bill --</option>
              {bills.map((bill, index) => (
                <option key={index} value={bill}>
                  {bill}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <label htmlFor="selectDivision" className="form-label">
              Select Division
            </label>
            <select
              className="form-select "
              id="selectDivision"
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setDepartmentAmounts([]);
                setError("");
              }}
            >
              <option value="">-- Select Division --</option>
              {divisions.map((division, index) => (
                <option key={index} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2">
            <button
              className="btn btn-primary"
              onClick={(event) => handleSearch(event)}
            >
              Go
            </button>
          </div>
        </div>
        <br />
        {error && <div className="alert alert-danger">{error}</div>}
        {departmentAmounts.length > 0 && (
          <>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Department</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentAmounts.map((item, index) => (
                    <tr key={index}>
                      <td>{item.department}</td>
                      <td>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <p className="grand-total">
              <strong>Grand Total:</strong> {grandTotall}
            </p>
            <div className="row">
              <div className="col-2">
                <button className="btn btn-success">
                  <PDFDownloadLink
                    document={<MyDocument data={DataArray} />}
                    fileName="Bill_Register.pdf"
                    className="generateRepo"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading document..." : "Generate Report"
                    }
                  </PDFDownloadLink>
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      <Outlet />
    </>
  );
};

export default BillPassingRegister;
