import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaShoppingBag } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto px-6 py-12 md:px-12 max-w-[1200px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-4 border-b border-[#e5e5ea]">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f]">
          Shopping Cart
        </h1>
        {cartItems.length > 0 && (
          <span className="text-[#86868b] text-[15px] mt-2 md:mt-0">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
          </span>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-[#e5e5ea]">
          <FaShoppingBag className="text-6xl text-[#d2d2d7] mb-6" />
          <h2 className="text-2xl font-medium text-[#1d1d1f] mb-3">Your cart is empty</h2>
          <p className="text-[#86868b] mb-8 text-center max-w-md">
            Looks like you haven't added any items to your cart yet. Discover our latest products and exclusive deals.
          </p>
          <Link
            to="/shop"
            className="bg-[#0071e3] hover:bg-[#005cbf] text-white px-8 py-3 rounded-full text-[15px] font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-6 rounded-3xl shadow-sm border border-[#e5e5ea] gap-6 transition-all hover:shadow-md"
              >
                <div className="w-32 h-32 flex-shrink-0 bg-[#f5f5f7] rounded-2xl overflow-hidden p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between h-full w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-1 block">
                        {item.brand}
                      </span>
                      <Link
                        to={`/product/${item._id}`}
                        className="text-[17px] font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors leading-tight line-clamp-2"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-lg font-semibold text-[#1d1d1f] ml-4 shrink-0">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 w-full">
                    <div className="flex items-center bg-[#f5f5f7] rounded-full p-1 border border-[#e5e5ea]">
                      <select
                        className="appearance-none bg-transparent text-[#1d1d1f] font-medium px-4 py-1 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0071e3] cursor-pointer"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%231d1d1f%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.7rem top 50%',
                          backgroundSize: '0.65rem auto',
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            Qty: {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="text-[#ff3b30] hover:bg-[#ff3b30] hover:bg-opacity-10 p-2.5 rounded-full transition-colors flex items-center justify-center"
                      onClick={() => removeFromCartHandler(item._id)}
                      title="Remove Item"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/3 bg-[#f5f5f7] p-8 rounded-3xl sticky top-[100px]">
            <h2 className="text-[22px] font-semibold text-[#1d1d1f] mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 border-b border-[#d2d2d7] pb-6">
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-[#86868b]">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span className="text-[#1d1d1f] font-medium">
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-[#86868b]">Estimated Shipping</span>
                <span className="text-[#1d1d1f] font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-center text-[15px]">
                <span className="text-[#86868b]">Estimated Tax</span>
                <span className="text-[#1d1d1f] font-medium">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-semibold text-[#1d1d1f]">Total</span>
              <span className="text-2xl font-bold text-[#1d1d1f]">
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </span>
            </div>

            <button
              className="w-full bg-[#1d1d1f] hover:bg-[#000000] text-white py-4 rounded-xl text-[17px] font-medium transition-colors mb-4 flex justify-center items-center"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
            
            <p className="text-xs text-[#86868b] text-center mt-4">
              Free shipping on all orders.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
