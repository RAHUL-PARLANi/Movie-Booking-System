import React, { useEffect, useState } from "react";
import movieData from "../../components/movieData";

const Dashboard = () => {
  const [movieCount, setMovieCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    setMovieCount(movieData.length);
  }, []);
  return (
    <div className="container-fluid d-flex">
      <div
        class="card text-bg-primary text-center m-3"
        style={{ width: "10rem" }}
      >
        <div class="card-header fw-bold">Movies</div>
        <div class="card-body">
          <h5 class="card-title ">{movieCount}</h5>
          <p class="card-text">No of Active Movies</p>
        </div>
      </div>
      <div
        class="card text-bg-success text-center m-3"
        style={{ width: "10rem" }}
      >
        <div class="card-header fw-bold">Revenue</div>
        <div class="card-body">
          <h5 class="card-title ">Rs {revenue}</h5>
          <p class="card-text">Total Profit</p>
        </div>
      </div>

      <div
        class="card text-bg-warning text-center m-3"
        style={{ width: "10rem" }}
      >
        <div class="card-header fw-bold">User</div>
        <div class="card-body">
          <h5 class="card-title ">{revenue}</h5>
          <p class="card-text">No of Active Users</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
