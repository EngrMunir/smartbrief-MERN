import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">SmartBrief</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {item.name}
            </a>
          ))}
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Panel */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block text-gray-700 hover:text-blue-600"
            >
              {item.name}
            </a>
          ))}
          <Link to="/login" className="block text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link
            to="/register"
            className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;