import { Outlet } from "react-router-dom";
import "./createDealer.css";
import { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import Fapp from "../firebase";
const CreateDealer = () => {
  const db = getFirestore(Fapp);
  // ----------states for the Input Fields-------------
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addres, setAdress] = useState("");
  // const [city, setcity] = useState("");
  // const [state, setState] = useState("");
  const [zip, setZip] = useState("");

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
  return (
    <>
      <main className="createDealer">
        <h1>Create Dealer</h1>
        <form className="row g-3">
          <div className="col-6">
            <label htmlFor="inputName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
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
              className="form-control form-control-lg"
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
              className="form-control form-control-lg"
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
              className="form-control form-control-lg"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
              onChange={(e) => {
                setAdress(e.target.value);
              }}
              value={addres}
            />
          </div>
          {/* <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label ">
              City
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="inputCity"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <select id="inputState" className="form-select form-select-lg">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div> */}
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
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
      </main>

      <Outlet />
    </>
  );
};
export default CreateDealer;
