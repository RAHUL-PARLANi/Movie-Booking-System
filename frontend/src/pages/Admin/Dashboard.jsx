import React, { useEffect, useState } from "react";
import movieData from "../../components/movieData";
import axios from "axios";

const Dashboard = () => {
  const [movieCount, setMovieCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    //   setMovieCount(movieData.length);
    axios.get("http://localhost:5000/dashboard").then((res) => {
      setMovieCount(res.data.totalMovies);

      setUserCount(res.data.totalUsers);

      setRevenue(res.data.totalRevenue);
    });

    axios
      .get("http://localhost:5000/ticket/all")
      .then((res) => {
        setTicketData(res.data);
      })
      .catch((err) => {
        alert("Something went Wrong");
      });
  }, []);
  return (
    <>
    <div className="container-fluid d-flex">
      <div
        class="card text-bg-primary text-center me-2 mb-3"
        style={{ width: "10rem" }}
      >
        <div class="card-header fw-bold">Movies</div>
        <div class="card-body">
          <h5 class="card-title ">{movieCount}</h5>
          <p class="card-text">No of Active Movies</p>
        </div>
      </div>
      <div
        class="card text-bg-success text-center me-2 mb-3"
        style={{ width: "10rem" }}
      >
        <div class="card-header fw-bold">Revenue</div>
        <div class="card-body">
          <h5 class="card-title ">Rs {revenue}</h5>
          <p class="card-text">Total Profit</p>
        </div>
      </div>

      <div
        class="card text-bg-warning text-center me-2 mb-3"
        style={{ width: "10rem" }}
      >
        <div class="card-header fw-bold">User</div>
        <div class="card-body">
          <h5 class="card-title ">{userCount}</h5>
          <p class="card-text">No of Active Users</p>
        </div>
      </div>
    </div>
    <div className="table-responsive container-fluid ">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">MovieID</th>
              <th scope="col">TicketID</th>
              <th scope="col">UserID</th>
              <th scope="col">SeatID</th>
              <th scope="col">Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {ticketData.map((elem) => {
              return <tr>
              <td>{elem.MOVIEID}</td>
              <td>{elem.TICKETID}</td>
              <td>{elem.USERID}</td>
              <td>{elem.SEATID}</td>
              <td>{elem.AMOUNT}</td>
            </tr>
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
