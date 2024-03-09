import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserHome({ userData }) {
  const navigate = useNavigate();
  const userId = window.localStorage.getItem("token");
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://log-server-2.onrender.com/user/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setDetail(userData.data); // Corrected access to user data
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, [userId]);

  console.log(detail);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  const showHis = () => {
    navigate(`/History/${userId}`);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div>
          {detail && (
            <>
              <p>Name: {detail.fname} {detail.lname}</p> {/* Corrected access to user details */}
              <p>Email: {detail.email}</p> {/* Corrected access to user details */}
            </>
          )}
          <br />
          <button onClick={logOut} className="btn btn-primary m-2">
            Log Out
          </button>
          <button onClick={showHis} className="btn btn-primary p-1 m-2">
            History
          </button>
        </div>
      </div>
    </div>
  );
}
