import background1 from "../components/background1.jpg";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../components/Home.css"; 
import { Link } from 'react-router-dom'

function Home() {
  
  return (
    <div>
      
      <img
        src={background1}
        alt="Background"
        style={{
          width: "100%",
          height: "90vh",
          objectFit: "cover",
          margin: 0,
          padding: 0,
          display: "block",
          filter: "blur(1px) brightness(.7)",
          zIndex: -1,             
        }}/>
        
          <div className="overlay-content">
        <h1>Welcome to WriteOffTrack</h1>
        <p>Join us in making donations easy</p>
        <Link to="/register" className="btn btn-primary">Get Started</Link>

      </div>

            <div className="about-text">About Us</div>
            <div className="about-description">
              <p>
                WriteOffTrack is dedicated to helping individuals and businesses manage their tax write-offs efficiently. Our platform simplifies the process of tracking expenses, ensuring you never miss out on potential savings. Join us today and take control of your financial future!
              </p>
            </div>

      <footer className="bottom-banner">
        <p>© 2025 WriteOffTrack. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/contact">Contact Us</Link>
          <Link to="/register">Join Us</Link>
          <Link to="/log-in">Log-in</Link>
        </div>
      </footer>

        {/*Ending Div*/}
      </div>
  );
};

export default Home;
