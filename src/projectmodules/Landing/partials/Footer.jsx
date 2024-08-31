import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="dark:bg-gray-700 dark:text-gray-200 py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2 dark:text-gray-200">&copy; 2024 AfriCare. All rights reserved.</p>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://x.com/AfriCare254?t=ZW4PtlWXqXvyPG-v_ZtWJg&s=09"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-400 hover:text-gray-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com/africare254?igsh=NThoNHkyNm0zaTFp"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-400 hover:text-gray-200"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
