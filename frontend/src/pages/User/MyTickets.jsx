import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const MyTickets = () => {
  const [ticketData, setTicketData] = useState([]);
  const userId = useSelector(state=>state.users.value.userId)

  useEffect(() => {
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
    <div>
      <h3>My Tickets</h3>
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
            {ticketData.filter(res=>res.USERID==userId).map((elem) => {
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
    </div>
  )
}

export default MyTickets
