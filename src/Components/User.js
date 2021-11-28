/** @format */
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Product({ data }) {
  const [dropped, setDropped] = useState(false);

  const { address, email, mobile, name, role, vendor, _id } = data;

  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {}, []);

  const UpdateUserRole = (UserRole) => {
    fetch("/api/auth/UpdateUserRole", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("vendor")).token,
      },
      body: JSON.stringify({ role: UserRole, _id }),
    })
      .then((res) =>
        res.json().then((d) => {
          console.log(d);
          window.location.reload();
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="cartDiv1in" key={_id}>
      <React.Fragment>
        <div className="cartImg">
          <div
            className="cartActualImg"
            style={{
              backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/1077/1077063.png)`,
            }}
          ></div>
        </div>

        <div className="cartDetails">
          <h3> {name} </h3>
          <div className="cartDetailsWBtn">
            <div className="cartValue cvl">
              <span>Mobile: {mobile}</span>

              <span>
                Role:
                {role == "User" ? (
                  <> {role}</>
                ) : (
                  <span className="redBold"> {role} </span>
                )}
              </span>
            </div>
            <div className="cartButton">
              <Button
                className="cartButtonv2"
                onClick={() => {
                  if (!dropped) {
                    setDropped(true);
                  } else {
                    setDropped(false);
                  }
                }}
              >
                {!dropped ? (
                  <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                ) : (
                  <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div
          className="detailedOrderDiv"
          id={dropped ? "showDetail" : "hideDetails"}
        >
          {/* <div className="cdinfo">
            {mediaUrl.map((mUrl, index) => {
              return <img src={mUrl} alt="" width="60px" key={index + 1} />;
            })}
          </div> */}

          <div className="cdinfo">
            <span>
              <b>Mobile</b>: {mobile}{" "}
            </span>
            <span>
              <b>Email</b>: {email}{" "}
            </span>
            <span>
              <b>_ID</b>: {_id}{" "}
            </span>
            <span>
              <b>Role</b>: {role}{" "}
            </span>
          </div>

          {role == "User" ? (
            <div className="cdinfo1">
              <Button
                id="UpdateOrderBtn"
                style={{ width: "200px" }}
                onClick={() => UpdateUserRole("Vendor")}
              >
                Make him Vendor
              </Button>
            </div>
          ) : role == "Vendor" || "Admin" ? (
            <div className="cdinfo1">
              <Button
                id="UpdateOrderBtn"
                style={{ width: "200px" }}
                onClick={() => UpdateUserRole("User")}
              >
                Remove As Vendor
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </React.Fragment>
    </div>
  );
}

export default Product;
