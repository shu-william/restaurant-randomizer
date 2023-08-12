import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = (props) => {

    const [location, setLocation] = useState("");
    const [cost, setCost] = useState("1");
    const [cuisine, setCuisine] = useState(["tradamerican"]);
    const [offset, setOffset] = useState(0);
    const [errors, setErrors] = useState("");

    const {fetchedData, setFetchedData} = props;

    const formValidator = () => {
        let isValid = true;
        if (!location.length > 0) {
            isValid = false;
        }
        return isValid;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setOffset(0);
        setErrors("");
        if(formValidator()) {
            axios.get('http://localhost:8000/yelp_api', {
                params: {
                    location: location,
                    cost: cost,
                    cuisine: cuisine,
                    offset: offset.toString(),
                }
            })
                .then(res => {
                    setFetchedData(res.data.businesses);
                    // console.log(fetchedData);
                })
        }
        else {
            setErrors("This field may not be blank.")
        }
    }

    const nextResults = () => {
      // next button not working as intended; it does retrieve new results but when it runs out the results don't display properly. 
      // offset also starts at 0 on first click, not sure why
      setOffset(offset + 21);
      console.log(offset);
      setErrors("");
      if(formValidator()) {
          axios.get('http://localhost:8000/yelp_api', {
              params: {
                  location: location,
                  cost: cost,
                  cuisine: cuisine,
                  offset: offset.toString(),
              }
          })
              .then(res => {
                  setFetchedData(res.data.businesses);
                  console.log(fetchedData);
              })
      }
      else {
          setErrors("This field may not be blank.")
      }
  }

    return (
      <div>
        {errors ? <p className="text-danger">{errors}</p> : ""}
        <form onSubmit={submitHandler} className="form-inline">
          <div className="formClass">
            <div className="form-group">
              <label htmlFor="location">Please enter your location.</label>
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-control"
              />
            </div>
            <div>
              <div className="radio my-2">
                <h6>Cost:</h6>
                <input
                  type="radio"
                  name="cost"
                  id="1"
                  value="1"
                  onChange={(e) => setCost(e.target.value)}
                />
                <label htmlFor="1">$</label>
                <input
                  type="radio"
                  name="cost"
                  id="2"
                  value="2"
                  onChange={(e) => setCost(e.target.value)}
                />
                <label htmlFor="2">$$</label>
                <input
                  type="radio"
                  name="cost"
                  id="3"
                  value="3"
                  onChange={(e) => setCost(e.target.value)}
                />
                <label htmlFor="3">$$$</label>
                <input
                  type="radio"
                  name="cost"
                  id="4"
                  value="4"
                  onChange={(e) => setCost(e.target.value)}
                />
                <label htmlFor="4">$$$$</label>
              </div>
              <div className="my-2">
                <h6>Cuisine:</h6>
                <select
                  multiple={true}
                  name="cuisine"
                  id="cuisine"
                  value={cuisine}
                  onChange={(e) => {
                    const options = [...e.target.selectedOptions];
                    const values = options.map((option) => option.value);
                    setCuisine(values);
                  }}
                >
                  <option value="tradamerican">American</option>
                  <option value="chinese">Chinese</option>
                  <option value="japanese">Japanese</option>
                  <option value="vietnamese">Vietnamese</option>
                  <option value="korean">Korean</option>
                  <option value="french">French</option>
                  <option value="italian">Italian</option>
                  <option value="mexican">Mexican</option>
                  <option value="mediterranean">Mediterranean</option>
                </select>
              </div>
            </div>
          </div>

          <input
            type="submit"
            value="Find Restaurants Near Me"
            className="btn btnStyle my-3"
          />
        </form>
        <div>
          <button onClick={nextResults}>Next</button>
        </div>
      </div>
    );
}

export default SearchForm;
