import "./contact.css";
import Navbar from "../../components/navBar/Navbar";

const Contact = () => {
  return (
   <>
   <Navbar/>
     <div className="contactDiv">
      <div className="contact-page-container">
      <h2>Contact Us</h2>
      <p>If you have any questions, feel free to reach out to us!</p>
      <htmlForm id="contact-htmlForm">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          placeholder="Your message"
          rows="5"
          required
        ></textarea>

        <button type="submit">Send Message</button>
      </htmlForm>
      <div className="contact-info">
        <h3>Get in Touch</h3>
        <p><strong>Phone:</strong> +880138498548</p>
        <p><strong>Email:</strong> info@ghorergari.com</p>
        <p><strong>Address:</strong> Lotifpur, Colony, Bogura</p>
      </div>
    </div>
    </div>
   </>
  );
};

export default Contact;
