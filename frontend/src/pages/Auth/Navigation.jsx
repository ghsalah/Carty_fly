import { useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <AiOutlineHome size={20} /> },
    { name: "Shop", path: "/shop", icon: <AiOutlineShopping size={20} /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ${scrolled ? "py-3 bg-white/80 backdrop-blur-xl shadow-sm border-b border-black/5" : "py-5 bg-transparent"}`}>
      <div className="container mx-auto px-6 lg:px-12 max-w-[1440px] flex items-center justify-between">
        
        {/* Logo and Tagline */}
        <div className="flex items-center gap-10">
          <Link to="/" className="group flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold tracking-tight text-[#1d1d1f]">Carty</span>
              <span className="text-2xl font-bold tracking-tight text-[#0071e3]">Fly</span>
            </div>
            <span className="text-[9px] uppercase font-bold text-[#86868b] tracking-[0.2em] group-hover:text-[#0071e3] transition-colors">Premium Tech</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-[15px] transition-all duration-300 ${location.pathname === link.path ? "bg-[#1d1d1f] text-white" : "text-[#1d1d1f] hover:bg-black/5"}`}
              >
                {link.icon} {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 border-r border-black/5 pr-4 mr-2">
            <Link to="/favorite" className="relative p-2.5 rounded-full hover:bg-rose-50 transition-colors group">
              <FaHeart className="text-rose-500 group-hover:scale-110 transition-transform" size={18} />
              <div className="absolute -top-0.5 -right-0.5 scale-75">
                <FavoritesCount />
              </div>
            </Link>

            <Link to="/cart" className="relative p-2.5 rounded-full hover:bg-blue-50 transition-colors group">
              <AiOutlineShoppingCart className="text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors" size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white bg-[#0071e3] rounded-full premium-shadow">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>
          </div>

          {/* User Account / Auth */}
          <div className="hidden md:flex items-center relative">
            {userInfo ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center gap-2 bg-[#f5f5f7] hover:bg-[#e5e5ea] px-4 py-2 rounded-full transition-all focus:outline-none">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0071e3] to-[#5e5ce6] flex items-center justify-center text-white text-[10px] font-bold">
                    {userInfo.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-[14px] text-[#1d1d1f]">{userInfo.username}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-xl border border-black/5 shadow-2xl rounded-[24px] overflow-hidden py-3 text-[#1d1d1f] z-[99999] animate-fade-in">
                    {userInfo.isAdmin && (
                      <div className="mb-2 px-3">
                        <div className="text-[10px] uppercase font-bold text-[#86868b] tracking-widest px-3 py-2">Admin Control</div>
                        <li><Link to="/admin/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-[#0071e3] hover:text-white rounded-xl mx-1 text-[14px] font-medium transition-all">Dashboard</Link></li>
                        <li><Link to="/admin/productlist" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-[#0071e3] hover:text-white rounded-xl mx-1 text-[14px] font-medium transition-all">Products</Link></li>
                        <li><Link to="/admin/orderlist" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-[#0071e3] hover:text-white rounded-xl mx-1 text-[14px] font-medium transition-all">Orders</Link></li>
                        <div className="border-t border-black/5 my-2 mx-3"></div>
                      </div>
                    )}
                    <li><Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 hover:bg-black/5 rounded-xl mx-1 text-[14px] font-medium transition-all">Account Settings</Link></li>
                    <li>
                      <button onClick={() => {logoutHandler(); setDropdownOpen(false);}} className="block w-full text-left px-4 py-2 text-[14px] font-medium text-red-500 hover:bg-red-50 rounded-xl mx-1 transition-all mt-1">
                        Sign Out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-5 py-2 font-semibold text-[14px] text-[#1d1d1f] hover:text-[#0071e3] transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="bg-[#1d1d1f] hover:bg-[#000] text-white px-6 py-2.5 rounded-full font-bold text-[14px] premium-shadow transition-all transform hover:scale-105 active:scale-95">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white fixed inset-0 z-[10000] p-6 flex flex-col animate-fade-in">
            <div className="flex justify-between items-center mb-12">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-[#1d1d1f]">Carty</span>
                    <span className="text-2xl font-bold text-[#0071e3]">Fly</span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full bg-[#f5f5f7]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                    <Link 
                        key={link.name}
                        to={link.path} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-3xl font-bold text-[#1d1d1f] flex items-center gap-4"
                    >
                        {link.name} <span className="text-[#0071e3]">→</span>
                    </Link>
                ))}
            </div>

            <div className="mt-auto pb-12">
                {userInfo ? (
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-4 p-4 bg-[#f5f5f7] rounded-3xl">
                            <div className="w-12 h-12 rounded-full bg-[#0071e3] flex items-center justify-center text-white font-bold text-xl">
                                {userInfo.username.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="font-bold text-lg">{userInfo.username}</div>
                                <div className="text-sm text-[#86868b]">{userInfo.email}</div>
                            </div>
                        </div>
                        <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-xl font-semibold">Profile Settings</Link>
                        <button onClick={() => {logoutHandler(); setMobileMenuOpen(false);}} className="text-xl font-semibold text-red-500 text-left">Sign Out</button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 rounded-2xl bg-[#f5f5f7] text-center font-bold text-lg">Sign In</Link>
                        <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 rounded-2xl bg-[#1d1d1f] text-white text-center font-bold text-lg">Create Account</Link>
                    </div>
                )}
            </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
