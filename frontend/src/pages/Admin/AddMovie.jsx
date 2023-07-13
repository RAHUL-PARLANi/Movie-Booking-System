import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const AddMovie = () => {
  const [image, setImage] = useState("");
  const [movieName, setMovieName] = useState("");
  const [price, setPrice] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [seats, setSeats] = useState(0);
  const [description, setDescription] = useState("");
  const [likes, setLikes] = useState("");
  const [genre, setGenre] = useState("");
  const [isRecommemded, setIsRecommemded] = useState(0);

  const handleSubmit=()=>{
    console.log({
      "movieName":movieName,
      "releaseDate":releaseDate,
      "endDate":endDate,
      "noOfSeats":Number(seats),
      "imageUrl":image,
      "description":description,
      "isRecommended":isRecommemded,
      "genre":genre,
      "price":price
      })
    axios.post('http://localhost:5000/movie',{
    "movieName":movieName,
    "releaseDate":releaseDate,
    "endDate":endDate,
    "noOfSeats":seats,
    "imageUrl":image,
    "description":description,
    "isRecommended":isRecommemded,
    "genre":genre,
    "price":price
    }).then(res=>{
      if(res.data.message){
        alert(res.data.message)
      }else{
        alert('Something went Wrong')
      }
    }).catch(err=>console.log(err))
  }
  return (
    <div className="container-fluid">
      <Form
        onSubmit={(e)=>{
          e.preventDefault()
          handleSubmit()
        }}
        className="p-4 px-6 border-2 border border-primary rounded mb-3"
        style={{
          fontWeight: 600,
          width: "75%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h3 className="border-bottom border-primary border-3 mb-3">
          Add movie
        </h3>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Movie Name</Form.Label>
          <Form.Control
            className="border border-primary border-2"
            type="text"
            value={movieName}
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="Number"
            className="border border-primary border-2"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Release Date</Form.Label>
          <Form.Control
            type="date"
            className="border border-primary border-2"
            value={releaseDate}
            onChange={(e) => {
              setReleaseDate(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            className="border border-primary border-2"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Total Number of Seats</Form.Label>
          <Form.Control
            type="Number"
            value={seats}
            onChange={(e) => {
              setSeats(e.target.value);
            }}
            className="border border-primary border-2"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="border border-primary border-2"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Is On Recommendation Section ?</Form.Label>
          <Form.Select
            aria-label="On Recommendation Page ?"
            value={isRecommemded}
            onChange={(e) => {
              setIsRecommemded(e.target.value);
            }}
            className="border border-primary border-2"
          >
            <option value="">choose</option>
            <option value={1}>On</option>
            <option value={0}>Off</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            className="border border-primary border-2"
            type="text"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3 mt-3" controlId="formFile">
          <Form.Label>Movie Poster</Form.Label>
          <Form.Control
            type="text"
            className="border border-primary border-2"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </Form.Group>

        {image && (
          <>
            <div>
              <h6>Preview</h6>
              <img
                className="rounded"
                src={(image)}
                style={{ border: "2px solid black" }}
                height={"300px"}
              />
            </div>
          </>
        )}
        <div style={{ textAlign: "left" }} className="mb-2">
          <button className="btn btn-outline-primary  mt-3" type='reset'> Reset </button>
          <button className="btn btn-primary mt-3 ms-2" type='submit'> Add </button>
        </div>
      </Form>
    </div>
  );
};

export default AddMovie;
