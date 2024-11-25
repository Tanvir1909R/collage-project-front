import { useContext, useEffect, useState } from "react";
import "./rent.css";
import Navbar from "../../components/navBar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GContext } from "../../context/GlobalContext";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
const Rent = () => {
  const { user } = useContext(GContext);

  const { id } = useParams();
  const [carInfo, setCarInfo] = useState({});
  const [price, setPrice] = useState({});
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/cars/${id}`).then((res) => {
      setCarInfo(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const basePrice = carInfo.perHourPrice;
    let hour = e.target.value;

    const totalPrice = basePrice * hour;
    setPrice({ totalPrice, hour });
  };

  const handleRent = () => {
    const order = {
      customerId: user._id,
      driverId: carInfo.driverId._id,
      orderId: uuid(),
      carId: id,
      paid: false,
      hour: price.hour,
      totalPrice: price.totalPrice,
      accept: false,
    };
    axios.patch(`${import.meta.env.VITE_API_URL}/order`, order).then((res) => {
      console.log(res.data.data);
      toast.success("Order send");
    });
  };

  return (
    <>
      <Navbar linkColor={"white"} background={"#4c4646"} />

      <section className="rent">
        <div className="container">
          <div className="rent-wrapper">
            <div className="info">
              <picture>
                <img src={carInfo.image} alt="car" />
              </picture>
            </div>
            <div className="user-info">
              <picture>
                <img src={carInfo?.driverId?.profileImage} alt="profile" />
              </picture>
              <h1>Name: {carInfo.driverId?.name}</h1>
              <h3>Email: {carInfo.driverId?.email}</h3>
              <h3>Phone: {carInfo.driverId?.number}</h3>

              {carInfo.status === "available" && (
                <div className="rent-form">
                  <div>
                    <input type="number" onChange={handleInputChange} />
                    <p>
                      Price:{" "}
                      {price?.totalPrice
                        ? price.totalPrice
                        : carInfo.perHourPrice}
                      &#2547;{" "}
                    </p>
                  </div>
                  <button onClick={handleRent}>Rent Now</button>
                </div>
              )}

              <div className="rate">
                <p>Car info</p>
                <h1>Name: {carInfo.name}</h1>
                <h3>Brand: {carInfo.brand}</h3>
                <h3>Per hour: {carInfo.perHourPrice}&#2547;</h3>
                <h3>Status: {carInfo.status}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rent;
