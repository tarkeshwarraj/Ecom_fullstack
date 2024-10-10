import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(MyContext);

  const [visible, setVisible] = useState(false);

  //By the help of useLocatin hook you can get the path of the url
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  // return have conditiona if the showSearch bar true then it will show the search bar
  return showSearch && visible ? (
    <div>
      <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex item-center justify-center border border-grey-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="flex-1 outline-none bg-inherit text-sm"
          />
          <img src={assets.search_icon} className="w-4" alt="" />
        </div>
        <img
          onClick={() => setShowSearch(false)}
          src={assets.cross_icon}
          className="inline w-3 cursor-pointer"
          alt=""
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
