import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

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

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-[9999] border-b border-[#f5f5f7] shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1440px] h-[70px] flex items-center justify-between">
        
        {/* Logo and Tagline */}
        <div className="flex flex-col justify-center">
          <Link to="/" className="text-2xl tracking-tight cursor-pointer flex items-center gap-1">
            <span className="font-bold text-[#1d1d1f]">Carty</span>
            <span className="font-bold text-[#0071e3]">Fly</span>
          </Link>
          <span className="text-[9px] uppercase font-bold text-[#86868b] tracking-widest mt-0">Fly higher with your style</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 ml-8">
          <Link to="/" className="flex items-center text-[#1d1d1f] hover:text-[#0071e3] transition-colors font-medium text-[15px]">
            <AiOutlineHome className="mr-2" size={20} /> Home
          </Link>
          <Link to="/shop" className="flex items-center text-[#1d1d1f] hover:text-[#0071e3] transition-colors font-medium text-[15px]">
            <AiOutlineShopping className="mr-2" size={20} /> Shop
          </Link>

          <Link to="/cart" className="flex items-center relative text-[#1d1d1f] hover:text-[#0071e3] transition-colors font-medium text-[15px]">
            <AiOutlineShoppingCart className="mr-2" size={20} /> Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-3 px-1.5 py-0.5 text-[10px] font-bold text-white bg-[#0071e3] rounded-full shadow-sm">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          <Link to="/favorite" className="flex items-center relative text-[#1d1d1f] hover:text-[#0071e3] transition-colors font-medium text-[15px]">
            <FaHeart className="mr-2 text-rose-500" size={17} /> Favorites
            <div className="absolute -top-1.5 -right-2">
              <FavoritesCount />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* User Account / Auth */}
          <div className="hidden md:flex items-center relative">
            {userInfo ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center text-[#1d1d1f] hover:text-[#0071e3] font-medium text-[15px] focus:outline-none transition-colors border border-[#e5e5ea] px-4 py-2 rounded-full hover:bg-[#fbfbfd]">
                  <span className="mr-1">{userInfo.username}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-3 w-48 bg-white border border-[#e5e5ea] shadow-[0_8px_30px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden py-2 text-[#1d1d1f]  z-[99999]">
                    {userInfo.isAdmin && (
                      <>
                        <li><Link to="/admin/dashboard" onClick={() => setDropdownOpen(false)} className="block px-5 py-2 hover:bg-[#f5f5f7] text-[14px] transition-colors">Dashboard</Link></li>
                        <li><Link to="/admin/productlist" onClick={() => setDropdownOpen(false)} className="block px-5 py-2 hover:bg-[#f5f5f7] text-[14px] transition-colors">Products</Link></li>
                        <li><Link to="/admin/categorylist" onClick={() => setDropdownOpen(false)} className="block px-5 py-2 hover:bg-[#f5f5f7] text-[14px] transition-colors">Category</Link></li>
                        <li><Link to="/admin/orderlist" onClick={() => setDropdownOpen(false)} className="block px-5 py-2 hover:bg-[#f5f5f7] text-[14px] transition-colors">Orders</Link></li>
                        <li><Link to="/admin/userlist" onClick={() => setDropdownOpen(false)} className="block px-5 py-2 hover:bg-[#f5f5f7] text-[14px] transition-colors">Users</Link></li>
                        <li className="border-t border-[#f5f5f7] my-1"></li>
                      </>
                    )}
                    <li><Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-5 py-2 hover:bg-[#f5f5f7] text-[14px] transition-colors">Profile</Link></li>
                    <li>
                      <button onClick={() => {logoutHandler(); setDropdownOpen(false);}} className="block w-full text-left px-5 py-2 text-[14px] text-red-500 hover:bg-rose-50 transition-colors">
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="flex items-center text-[#1d1d1f] hover:text-[#0071e3] font-medium text-[14px] transition-colors">
                  Login
                </Link>
                <Link to="/register" className="flex items-center bg-[#1d1d1f] hover:bg-[#000] text-white px-5 py-2 rounded-full font-medium text-[14px] shadow-sm transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#1d1d1f] focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-[#f5f5f7] shadow-xl absolute top-[70px] left-0 w-full animate-fade-in-down py-5 px-6 z-[99999]">
          <div className="flex flex-col space-y-5">
             <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center text-[#1d1d1f] font-medium text-[16px]">
                <AiOutlineHome className="mr-3 text-[#0071e3]" size={22} /> Home
             </Link>
             <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="flex items-center text-[#1d1d1f] font-medium text-[16px]">
                <AiOutlineShopping className="mr-3 text-[#0071e3]" size={22} /> Shop
             </Link>
             <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center text-[#1d1d1f] font-medium text-[16px]">
                <AiOutlineShoppingCart className="mr-3 text-[#0071e3]" size={22} /> Cart 
                {cartItems.length > 0 && <span className="ml-2 px-2 text-[12px] bg-[#0071e3] text-white rounded-full">{cartItems.reduce((a, c) => a + c.qty, 0)}</span>}
             </Link>
             <Link to="/favorite" onClick={() => setMobileMenuOpen(false)} className="flex items-center text-[#1d1d1f] font-medium text-[16px]">
                <FaHeart className="mr-3 text-rose-500" size={19} /> Favorites
             </Link>
             
             <div className="border-t border-[#e5e5ea] my-3"></div>
             
             {userInfo ? (
               <div className="flex flex-col space-y-3">
                 <div className="text-[12px] font-bold text-[#86868b] uppercase tracking-wider mb-1">Account ({userInfo.username})</div>
                 {userInfo.isAdmin && (
                   <div className="pl-2 border-l-2 border-[#0071e3] flex flex-col space-y-3">
                      <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium text-[#1d1d1f]">Dashboard</Link>
                      <Link to="/admin/productlist" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium text-[#1d1d1f]">Products</Link>
                      <Link to="/admin/categorylist" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium text-[#1d1d1f]">Category</Link>
                      <Link to="/admin/orderlist" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium text-[#1d1d1f]">Orders</Link>
                      <Link to="/admin/userlist" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium text-[#1d1d1f]">Users</Link>
                   </div>
                 )}
                 <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-medium text-[#1d1d1f]">Profile</Link>
                 <button onClick={() => {logoutHandler(); setMobileMenuOpen(false);}} className="text-[15px] font-medium text-left text-red-500 pt-2">Logout</button>
               </div>
             ) : (
               <div className="flex justify-between mt-4">
                 <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="border border-[#e5e5ea] px-5 py-2.5 rounded-full text-center flex-1 mr-2 text-[#1d1d1f] font-medium bg-[#f5f5f7]">Login</Link>
                 <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="bg-[#1d1d1f] text-white px-5 py-2.5 rounded-full text-center flex-1 ml-2 font-medium">Sign Up</Link>
               </div>
             )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
