import React from "react";
import { Link } from "react-router-dom";
import movieData from "../../components/movieData";

const ShowAllMovie = () => {
  return (
    <div className="container-fluid d-flex justify-content-center flex-wrap">
      {movieData.map((elem) => {
        return (
          <div className="card m-3 col-lg-3">
            <div className="row g-0">
              <div className="col-md-5">
                <img
                  src={elem.moviePoster}
                  style={{ height: "300px" }}
                  className="img-fluid col-12 rounded-start"
                  alt={"image of" + elem.movieName}
                />
              </div>
              <div className="col-md-7">
                <div
                  className="card-body"
                  style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <h5
                      className="card-title"
                      style={{ textTransform: "capitalize" }}
                    >
                      {elem.movieName}
                    </h5>
                    <p className="card-text">
                      <span className="fw-bold">Price : </span>
                      {elem.price}
                    </p>
                    <p className="card-text mt-0">
                      <span className="fw-bold">Genre : </span>
                      {elem.genre}
                    </p>
                  </div>
                  <div>
                    <Link to={"/admin/editMovie/" + elem.movieName}>
                      <button className="btn btn-sm btn-primary">Edit</button>
                    </Link>
                    <button className="btn btn-sm btn-danger ms-2">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowAllMovie;
