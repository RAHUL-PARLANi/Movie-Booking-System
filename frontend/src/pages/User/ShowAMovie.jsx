import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ShowAMovie = () => {
  const [movieData, setMovieData] = useState([]);
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const userId = useSelector(state=>state.users.value.userId)

  const handleCheckboxChange = (id) => {
    handleRowSelect(id);
  };

  const handleRowSelect = (id) => {
    let updatedSelectedSeats;
    if (selectedSeats.includes(id)) {
      updatedSelectedSeats = selectedSeats.filter((rowId) => rowId !== id);
    } else {
      updatedSelectedSeats = [...selectedSeats, id];
    }
    setSelectedSeats(updatedSelectedSeats);
  };

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/movie/" + window.location.href.split("/").pop()
      )
      .then((res) => {
        setMovieData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        "http://localhost:5000/seat/" + window.location.href.split("/").pop()
      )
      .then((res) => {
        setSeatData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit=()=>{
    axios.post('http://localhost:5000/seat/bookSeat',{
      'seatIdList':selectedSeats,
      'userId':userId,
      'movieId':window.location.href.split('/').pop()
    }).then(elem=>{if(elem.data.message){alert(elem.data.message)}}).catch(err=>{
      console.log(err)
    })
  }
  return (
    <>
      <div
        className="container-fluid my-4"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div class="card col-lg-3 col-xs-10">
          <img
            class="card-img-top"
            src={movieData.IMAGEURL}
            height={"400px"}
            width={"300px"}
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{movieData.MOVIENAME}</h5>
            <p class="card-text">{movieData.DESCRIPTION}</p>
            <h6>Price : Rs. {movieData.PRICE}</h6>
            <h6>Likes: {movieData.LIKES}</h6>
          </div>
          <div class="card-footer">
            <h5>Book Here</h5>
            {seatData.map((elem) => {
              return (
                <div
                  className={
                    elem.BOOKINGSTATUS == 0
                      ? "btn btn-primary m-1"
                      : "btn btn-dark m-1"
                  }
                >
                  {elem.SEATNO} <br />
                  <input
                    disabled={elem.BOOKINGSTATUS == 1}
                    checked={selectedSeats.includes(elem.SEATID)}
                    onChange={()=>handleCheckboxChange(elem.SEATID)}
                    type="checkbox"
                  />
                </div>
              );
            })}
            
          </div>
          <button className="btn btn-dark" onClick={handleSubmit}>Book Now</button>
        </div>
      </div>
    </>
  );
};

export default ShowAMovie;
