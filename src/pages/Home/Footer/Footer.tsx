const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left: Logo & Tagline */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-blue-600">SmartBrief</h2>
            <p className="text-sm text-gray-500">AI-powered summarization made simple.</p>
          </div>

          {/* Center: Quick Links */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#how-it-works" className="text-sm hover:text-blue-600">
              How it Works
            </a>
            <a href="#features" className="text-sm hover:text-blue-600">
              Features
            </a>
            <a href="#contact" className="text-sm hover:text-blue-600">
              Contact
            </a>
          </div>

          {/* Right: Copyright */}
          <div className="text-sm text-gray-400 text-center md:text-right">
            © {new Date().getFullYear()} SmartBrief. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
