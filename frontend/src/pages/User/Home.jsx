import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [data,setData]=useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/movie/all').then(elem=>{
      setData(elem.data)
    })
  }, [])
  
  return (
    <div className='container-fluid'>
      {data.filter(res=>{return res.ISRECOMMENDED==1}).length>0&&<h3 className='text-center'>Recommended Movies</h3>}
      <div className='d-flex justify-content-center flex-wrap'>
      {data.filter(res=>{return res.ISRECOMMENDED==1}).map(elem=>{
        return  <div className="card m-3 col-lg-3">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={elem.IMAGEURL}
              style={{ height: "300px" }}
              className="img-fluid col-12 rounded-start"
              alt={"image of" + elem.MOVIENAME}
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
                  {elem.MOVIENAME}
                </h5>
                <p className="card-text">
                  <span className="fw-bold">Price : </span>
                  {elem.PRICE}
                </p>
                <p className="card-text mt-0">
                  <span className="fw-bold">Genre : </span>
                  {elem.GENRE}
                </p>
              </div>
              <div>
                <Link to={"/showAMovie/" + elem.MOVIEID}>
                  <button className="btn btn-sm btn-primary">Book Seats</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      })}
      </div>
      <h3 className='text-center'>Available Movies</h3>
      <div className='d-flex justify-content-center flex-wrap'>
      {data.map(elem=>{
        return  <div className="card m-3 col-lg-3">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={elem.IMAGEURL}
              style={{ height: "300px" }}
              className="img-fluid col-12 rounded-start"
              alt={"image of" + elem.MOVIENAME}
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
                  {elem.MOVIENAME}
                </h5>
                <p className="card-text">
                  <span className="fw-bold">Price : </span>
                  {elem.PRICE}
                </p>
                <p className="card-text mt-0">
                  <span className="fw-bold">Genre : </span>
                  {elem.GENRE}
                </p>
              </div>
              <div>
                <Link to={"/showAMovie/" + elem.MOVIEID}>
                  <button className="btn btn-sm btn-primary">Book Seats</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      })}
      </div>
    </div>
  )
}

export default Home
