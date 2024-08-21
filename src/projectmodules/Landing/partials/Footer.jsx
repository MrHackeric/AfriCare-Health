import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#874c78] text-white py-4">
      <div className="container mx-auto text-center">
        <p className="mb-2 text-[white]">&copy; 2024 Africare. All rights reserved.</p>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="#"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-[white] hover:text-[#f2b1d0]"
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-[white] hover:text-[#f2b1d0]"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-[white] hover:text-[#f2b1d0]"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-[white] hover:text-[#f2b1d0]"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
