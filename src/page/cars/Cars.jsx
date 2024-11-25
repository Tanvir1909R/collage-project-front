import { useContext, useEffect } from "react";
import "./car.css";
import Navbar from "../../components/navBar/Navbar";
import { Link } from "react-router-dom";
import { GContext } from "../../context/GlobalContext";
const Cars = () => {
  const { cars } = useContext(GContext);
  const categories = [...new Set(cars.map((car) => car.brand))];

  useEffect(() => {
    // select all filter button and filterable card
    const filterButtons = document.querySelectorAll(".filter_buttons button");
    const filterableCards = document.querySelectorAll(
      ".filterable_cards .card"
    );
    const filterCards = (e) => {
      document.querySelector(".active").classList.remove("active");
      e.target.classList.add("active");

      // Iterate over each filterable card
      filterableCards.forEach((card) => {
        // Add "hide" class to hide the card initially
        card.classList.add("hide");

        // Check if the card mathces the selected filter or "all" is selcted
        if (
          card.dataset.name === e.target.dataset.name ||
          e.target.dataset.name === "all"
        ) {
          card.classList.remove("hide");
        }
      });
    };
    // Add click event listener to each filter button
    filterButtons.forEach((button) =>
      button.addEventListener("click", filterCards)
    );
  }, []);

  return (
    <div className="cars_div">
      <Navbar linkColor={"white"} background={"#4c4646"} />

      <div className="container">
        <div className="catagory_container">
          <div className="filter_buttons">
            <button className="cat_button active" data-name="all">
              Show all
            </button>
            {categories.map((category,idx) => (
              <button className="cat_button" data-name={category} key={idx}>
                {category}
              </button>
            ))}
          </div>

          <div className="filterable_cards">
            {cars.map((car) => (
              <div className="card" data-name={car.brand} key={car._id}>
                <img src={car.image} alt={car.name} />

                <div className="card_body">
                  <h6 className="card_title">{car.name}- <span style={
                    car.status === "available" ? {color:"green", fontWeight:"bold",textTransform:"capitalize"} :{color:"red",fontWeight:"bold",textTransform:"capitalize"}
                  }>{car.status}</span></h6>
                  <p className="card_text">Per hour: {car.perHourPrice}&#2547;</p>
                  <div className="card_btn">
                    <Link to={`/rent/${car._id}`} type="button">
                      Rent Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
