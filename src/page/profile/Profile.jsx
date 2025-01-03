import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import Navbar from "../../components/navBar/Navbar";
import { GContext } from "../../context/GlobalContext";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const [notification, setNotification] = useState({});
  const [notifyRefetch, setNotifyRefetch] = useState(false);
  const { user } = useContext(GContext);

  const handleProfileChange = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const image = form.get("profile_image");
    const imageData = new FormData();
    imageData.append("image", image);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=0c722e66ce7aba6efe89ef943cd8aa64",
        imageData
      )
      .then((res) => {
        axios
          .patch(`${import.meta.env.VITE_API_URL}/user/${user._id}`, {
            profileImage: res?.data.data.display_url,
          })
          .then((res) => {
            console.log("profile Update");
          });
      });
  };
  const handleGeneralFrom = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    // const email = form.get("email");
    const number = form.get("number");
    const data = { name, email, number };
    const filterData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value)
    );
    axios
      .patch(`${import.meta.env.VITE_API_URL}/user/${user._id}`, filterData)
      .then((res) => {
        console.log("profile Update");
      });
  };
  const handleCarSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const image = form.get("image");
    const imageData = new FormData();
    imageData.append("image", image);
    const name = form.get("name");
    const brand = form.get("brand");
    const perHourPrice = +form.get("price");
    const driverId = user?._id;
    const status = "available";
    const data = { name, brand, perHourPrice, driverId, status };

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=0c722e66ce7aba6efe89ef943cd8aa64",
        imageData
      )
      .then((res) => {
        const filterData = { ...data, image: res?.data.data.display_url };
        console.log(filterData);

        axios
          .post(`${import.meta.env.VITE_API_URL}/cars`, filterData)
          .then(() => {
            toast.success("car added");
          }).catch(()=>{
            toast.error("Something is wrong!");
          })
      });
  };

  useEffect(() => {
    if (user?.accountType === "driver") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/order/${user._id}`)
        .then((res) => {
          setNotification({ for: "driver", data: res.data.data });
        });
    }
    if (user?.accountType === "normal") {
      const id = user._id;
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/notification/${id}`)
        .then((res) => {
          setNotification({ for: "normal", data: res.data.data.notification });
        });
    }
  }, [user, notifyRefetch]);

  const handleReject = (id) => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/order/reject-customer-notify`, {
        id,
      })
      .then(() => {
        axios.delete(`${import.meta.env.VITE_API_URL}/order/${id}`).then(() => {
          setNotifyRefetch((value) => !value);
        });
      });
  };
  const handleAccept = (id) => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/order/accept-customer-notify`, {
        id,
      })
      .then(() => {
        console.log("accept");
        setNotifyRefetch((value) => !value);
      });
  };
  const handlePaid = (id) => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/order/paid`, {
        id,
      })
      .then(() => {
        console.log("paid");
        setNotifyRefetch((value) => !value);
      });
  };

  return (
    <>
      <Navbar linkColor={"white"} background={"#4c4646"} />
      <section>
        <div className="container">
          <div className="profile_wrapper">
            <h1>Account setting</h1>
            <div className="form_div">
              <div className="general_form">
                <h3>General</h3>
                <form onSubmit={handleProfileChange}>
                  <div className="input_control">
                    <label htmlFor="profile_image">Profile image</label>
                    <input type="file" name="profile_image" />
                  </div>
                  <button>submit</button>
                </form>
                <form onSubmit={handleGeneralFrom}>
                  <div className="input_control">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" />
                  </div>
                  {/* <div className="input_control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" />
                  </div> */}
                  <div className="input_control">
                    <label htmlFor="number">Number</label>
                    <input type="number" name="number" />
                  </div>
                  <div>
                    <button>Change</button>
                  </div>
                </form>
              </div>
              <div className="general_form">
                <h3>Change password</h3>
                <form>
                  <div className="input_control">
                    <label htmlFor="c_pass">Current password</label>
                    <input type="password" id="c_pass" />
                  </div>
                  <div className="input_control">
                    <label htmlFor="n_pass">Email</label>
                    <input type="password" id="n_pass" />
                  </div>
                  <div className="input_control">
                    <label htmlFor="confirm_pass">Number</label>
                    <input type="password" id="confirm_pass" />
                  </div>
                  <div>
                    <button>Change</button>
                  </div>
                </form>
              </div>
              {user?.accountType === "driver" && (
                <div className="general_form">
                  <h3>Cars</h3>
                  <form onSubmit={handleCarSubmit}>
                    <div className="input_control">
                      <label htmlFor="profile_image">Car image</label>
                      <input type="file" id="profile_image" name="image" />
                    </div>
                    <div className="input_control">
                      <label htmlFor="name">Car Name</label>
                      <input type="text" id="name" name="name" />
                    </div>
                    <div className="input_control">
                      <label htmlFor="email">Brand</label>
                      <input type="text" id="text" name="brand" />
                    </div>
                    <div className="input_control">
                      <label htmlFor="number">Per hour price</label>
                      <input type="number" id="number" name="price" />
                    </div>
                    <div>
                      <button>Change</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            {user && (
              <div className="notification-section">
                <h1>Notification</h1>

                {notification.for === "driver" ? (
                  <>
                    {notification?.data?.reverse().map((notify) => (
                      <div className="notification" key={notify._id}>
                        <div>
                          <img
                            src={notify.carId.image}
                            alt="car"
                            style={{ width: "60px" }}
                          />
                          <h4>{notify.carId.name}</h4>
                          <p>Hour: {notify.hour}</p>
                          <p>Total price: {notify.totalPrice} &#2547;</p>
                          <p>Customer number: {notify.customerId.number}</p>
                          <p>Customer name: {notify.customerId.name}</p>
                          <p>Booking Date: {new Date(notify.createdAt).toISOString().split("T")[0]}</p>
                          <div>
                            {notify.paid === false ? (
                              <>
                                {notify.accept === false ? (
                                  <>
                                    <button
                                      onClick={() => handleAccept(notify._id)}
                                    >
                                      Accept
                                    </button>
                                    <button
                                      onClick={() => handleReject(notify._id)}
                                    >
                                      Reject
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => handlePaid(notify._id)}
                                  >
                                    Paid
                                  </button>
                                )}
                              </>
                            ) : (
                              <p>Job completed</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {notification?.data?.reverse().map((notify, idx) => (
                      <div className="notification" key={idx}>
                        <div>
                          <h4>{notify.message}</h4>
                          <p>Hour: {notify.hour}</p>
                          <p>Total price: {notify.totalPrice} &#2547;</p>
                          {notify?.link && (
                            <p>
                              See more <Link to={notify.link}>details</Link>
                            </p>
                          )}
                        </div>
                        <button>X</button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
