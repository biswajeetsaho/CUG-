import RailLogo from "./assets/railwaylogo.png";
import Emblem from "./assets/Emblem_of_India.png";
const Header = () => {
  return (
    <header className="hompage_header">
      <img src={RailLogo} alt="Logo of Railway" className="Railway_logo" />
      <div className="homepage_heading">
        <h1>East Coast Railway, Bhubaneswar</h1>
        <p>Progress Our Mission and Fulfillment of our Vision</p>
      </div>
      <img src={Emblem} alt="Emblem Logo" className="Emblem_logo" />
    </header>
  );
};
export default Header;
