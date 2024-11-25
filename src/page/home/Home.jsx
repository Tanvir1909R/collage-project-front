import { Link } from "react-router-dom";
import "./home.css";
import Navbar from "../../components/navBar/Navbar";

const Home = () => {
  return (
    <>
      <section id="banner">
        <Navbar/>

        <div className="banner-txt">
          <h1>Rent A Car</h1>

          <span>Let Us Drive, You Just Arrive</span>
          <div className="banner-btn">
            <Link to={'/cars'}>
              <span></span>Rent Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
