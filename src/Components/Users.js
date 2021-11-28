/** @format */

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Product from "./Product";
import { toast } from "react-toastify";
import User from "./User";

function MyProducts() {
  const [products, setProducts] = useState("");
  const [filter, setFilter] = useState("");

  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
    var vendor = JSON.parse(localStorage.getItem("vendor"));
    fetch(`/api/auth/allUser`)
      .then((r) =>
        r.json().then((d) => {
          console.log(d);
          setProducts(d);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="OrderBox">
      <div className="OrderFilterNav">
        <div className="FilterInputs">
          <span>Search User by UserDetails</span>
          <input
            type="text"
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Name, Mobile or Email"
          />
        </div>
      </div>
      <div className="OrderDiv">
        {products
          ? products
              .filter((f) => {
                if (!filter) {
                  return f;
                } else {
                  return (
                    f.name.match(filter) ||
                    f.email.match(filter) ||
                    f.mobile.match(filter)
                  );
                }
              })
              .map((p) => {
                console.log(p);
                return <User data={p} />;
              })
          : ""}
      </div>
      ;
    </div>
  );
}

export default MyProducts;
