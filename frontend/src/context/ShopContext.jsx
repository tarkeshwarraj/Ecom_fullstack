import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets"; //products is an array of objects in assests file
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const MyContext = createContext(); //Named export  This will import in Login.jsx

const ContextFunction = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token,setToken] = useState('');
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }


    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if(token) {
      try{
        await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}} )
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  //Cart Update Quantity
  const updateOuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if(token){
      try{
        await axios.post(backendUrl + '/api/cart/update', {itemId,size, quantity}, {headers:{token}})
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async() => {
    try{

      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success){
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }


    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  const getUserCart = async( token )=> {
    try{
      const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getProductsData();
  },[]);

  //set token in browser
  useEffect(()=>{
    if(!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  },[])

  const sentvalue = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateOuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems
  };

  return (
    // जब UserContext.Provider में value को pass किया जाता है, तो यह value उन सभी components के लिए accessible हो जाती है जो Provider के अंदर nested हैं और useContext का उपयोग करते हैं।
    <MyContext.Provider value={sentvalue}>{props.children}</MyContext.Provider>
  );
};

export default ContextFunction;
