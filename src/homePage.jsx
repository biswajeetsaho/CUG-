import RailLogo from "./assets/railwaylogo.png";
import Emblem from "./assets/Emblem_of_India.png";

const HomePage = () => {
  return (
    <>
      <main className="homePage">
        <header className="hompage_header">
          <img src={RailLogo} alt="Logo of Railway" className="Railway_logo" />
          <div className="homepage_heading">
            <h1>East Coast Railway, Bhubaneswar</h1>
            <p>Progress Our Mission and Fulfillment of our Vision</p>
          </div>
          <img src={Emblem} alt="Emblem Logo" className="Emblem_logo" />
        </header>
        <h1>Closed User Group (CUG) Management Portal</h1>
        <p>
          The CUG Management System is designed to streamline and simplify
          management of Closed User Group (CUG) numbers and employee within an
          organization. This system offers an efficient way to handle various
          aspects of CUG number management, including adding new numbers,
          uploading bulk CUG numbers via Excel files, and detailed reports.
        </p>
      </main>
    </>
  );
};
export default HomePage;
