import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-indigo-400 text-white py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Part 1: E-Shop Description */}
          <div>
            <h2 className="text-xl font-bold mb-4">About Our E-Shop</h2>
            <p>
              Welcome to our e-commerce store! We offer a wide range of products to cater to all your needs.
              Our mission is to provide quality products at affordable prices, ensuring a seamless shopping experience.
              Join us today and discover amazing deals!
            </p>
          </div>

          {/* Part 2: Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/about-us" className="hover:underline">About Us</a></li>
              <li><a href="/search" className="hover:underline">Products</a></li>
              <li><a href="/contact-us" className="hover:underline">Contact Us</a></li>
              <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          {/* Part 3: Social Media and Email Form */}
          <div>
            <h2 className="text-xl font-bold mb-4">Stay Connected</h2>
            <div className="flex space-x-4 mb-4">
              {/* Social Media Icons */}
              <a href="#" aria-label="Facebook" className="hover:text-blue-500">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-pink-500">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>

            {/* Email Subscription Form */}
            <form className="flex flex-col">
              <label htmlFor="email" className="text-sm mb-2">Subscribe to our newsletter</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="p-2 text-white rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="mt-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-500">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
