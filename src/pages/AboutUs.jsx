import React, { useState } from "react";

function AboutUs() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const toggleTerms = () => setShowTerms((prev) => !prev);
  const togglePrivacy = () => setShowPrivacy((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 transition transform hover:scale-105 hover:text-indigo-600">
          About Us
        </h1>

        {/* Introduction Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to [Your Company Name]! We are committed to delivering
            high-quality products and exceptional customer service in [industry
            or niche]. Our experienced team is here to help you every step of
            the way.
          </p>
        </section>

        {/* Specialties Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Specialties
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Custom solutions tailored to your needs</li>
            <li>Expert team with years of experience</li>
            <li>Focus on customer satisfaction</li>
            <li>Transparency and integrity in all interactions</li>
          </ul>
        </section>

        {/* Terms and Conditions Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Terms and Conditions
          </h2>
          <button
            onClick={toggleTerms}
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300"
          >
            {showTerms ? "Hide Details" : "Read More"}
          </button>
          {showTerms && (
            <div className="mt-4 text-gray-600 leading-relaxed space-y-4">
              <p>
                By using our services, you agree to the terms and conditions
                outlined here. This includes respecting intellectual property,
                ensuring fair use of the platform, and abiding by our
                operational policies.
              </p>
              <p>
                For a detailed explanation of our terms, please contact our
                support team.
              </p>
            </div>
          )}
        </section>

        {/* Privacy Policy Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Policy</h2>
          <button
            onClick={togglePrivacy}
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300"
          >
            {showPrivacy ? "Hide Details" : "Read More"}
          </button>
          {showPrivacy && (
            <div className="mt-4 text-gray-600 leading-relaxed space-y-4">
              <p>
                We value your privacy and are committed to protecting your
                personal information. Our privacy policy outlines how we collect,
                use, and safeguard your data.
              </p>
              <p>
                We ensure that your data is used responsibly and in accordance
                with applicable laws. For more details, feel free to reach out to
                us or visit our privacy resources page.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
