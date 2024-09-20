import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; 2024 AfriCare. All rights reserved.</p>

        {/* Links Section */}
        <div className="mb-4">
          <Link to="/AboutUs" className="mx-4 text-gray-700 hover:underline">About Us</Link>
          <Link to="/PrivacyPolicy" className="mx-4 text-gray-700 hover:underline">Privacy Policy & Terms of Use</Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://x.com/AfriCare254?t=ZW4PtlWXqXvyPG-v_ZtWJg&s=09"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-600 hover:text-blue-800 transition duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/africare254?igsh=NThoNHkyNm0zaTFp"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-pink-600 hover:text-pink-800 transition duration-300"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
