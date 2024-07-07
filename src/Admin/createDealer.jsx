import { Outlet } from "react-router-dom";
import "./createDealer.css";
import { useState, useEffect } from "react";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import Fapp from "../firebase";
import Header from "../Header";
const CreateDealer = () => {
  const db = getFirestore(Fapp);
  // ----------states for the Input Fields-------------
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addres, setAdress] = useState("");
  const [zip, setZip] = useState("");
  const [toggle, settoggle] = useState(0);
  const [dealers, setDealers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // --------------Handling Submit Button------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Data Received: ", userName, password, email, addres, zip);
    if (
      userName === "" ||
      email === "" ||
      password === "" ||
      addres === "" ||
      zip === ""
    )
      alert("Please Fill all the Fields");
    else {
      const docRef = await addDoc(collection(db, "dealers"), {
        Dealer_Name: userName,
        Dealer_Email: email,
        Dealer_Password: password,
        Dealer_Address: addres,
        Dealer_Zip: zip,
      });
      alert("Data Submitted Successfully");
      setuserName("");
      setEmail("");
      setPassword("");
      setAdress("");
      setZip("");
    }
  };
  // Fetching dealer information
  const fetchDealers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "dealers"));
      const dealerList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDealers(dealerList);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    if (toggle === 1) {
      fetchDealers();
    }
  }, [toggle]);

  // Filtering dealers based on the search query
  const filteredDealers = dealers.filter((dealer) =>
    dealer.Dealer_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <main className="createDealer">
        <Header />
        <br />
        <h1>Create Dealer</h1>
        <br />
        {toggle === 0 && (
          <>
            <form className="row g-3">
              <div className="col-6">
                <label htmlFor="inputName" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputName"
                  placeholder="John Wick"
                  onChange={(e) => {
                    setuserName(e.target.value);
                  }}
                  value={userName}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="john@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputPassword4" className="form-label">
                  Create Password
                </label>
                <input
                  type="password"
                  className="form-control "
                  id="inputPassword4"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="col-6">
                <label htmlFor="inputAddress2" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  onChange={(e) => {
                    setAdress(e.target.value);
                  }}
                  value={addres}
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="000000"
                  id="inputZip"
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                >
                  Create Dealer
                </button>
              </div>
            </form>
            <br />
            <button
              className="btn btn-outline-success"
              onClick={() => settoggle(1)}
            >
              View Existing Dealers?
            </button>
          </>
        )}
        {toggle === 1 && (
          <>
            {" "}
            <button
              className="btn btn-outline-primary"
              onClick={() => settoggle(0)}
            >
              Back to Create Dealer
            </button>
            <br />
            <h2>Existing Dealers</h2>
            <br />
            <div className="search-container">
              <input
                type="text"
                className="form-control"
                placeholder="Search name"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </div>
            <br />
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Dealer Name</th>
                    <th scope="col">Dealer Email</th>
                    <th scope="col">Dealer Address</th>
                    <th scope="col">Dealer Zip</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDealers.map((dealer) => (
                    <tr key={dealer.id}>
                      <td>{dealer.Dealer_Name}</td>
                      <td>{dealer.Dealer_Email}</td>
                      <td>{dealer.Dealer_Address}</td>
                      <td>{dealer.Dealer_Zip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      <Outlet />
    </>
  );
};
export default CreateDealer;
