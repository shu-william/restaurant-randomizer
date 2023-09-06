import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = (props) => {

    const [errors, setErrors] = useState("");

    const {setFetchedData, location, setLocation, cost, setCost, cuisine, setCuisine, setOffset} = props;

    const [costs, setCosts] = useState({
      1: false,
      2: false,
      3: false,
      4: false
    })

    const handleCostChange = (value) => {
      costs[value] = (!costs[value]);
      let arr = [];
      for (let i = 0; i < 4; i++) {
        if (costs[i]) {
          arr.push(i);
        }
      }
      console.log(arr);
      setCost(arr);
    }

    const formValidator = () => {
        let isValid = true;
        if (!location.length > 0) {
            isValid = false;
        }
        return isValid;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors("");
        if(formValidator()) {
            axios.get('http://localhost:8000/yelp_api', {
                params: {
                    location: location,
                    cost: cost,
                    cuisine: cuisine,
                    offset: 0,
                }
            })
                .then(res => {
                  setOffset(0);
                  setFetchedData(res.data.businesses);
                })
        }
        else {
            setErrors("This field may not be blank.")
        }
    }

    return (
      <div className="filterStyle">
        <form onSubmit={submitHandler}>
          <div className="formClass">
            <div className="form-group">
              {errors ? <p className="text-danger">{errors}</p> : ""}
              <label htmlFor="location">Please enter your location:</label>
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
              <div className="my-2">
                <h6>Cost:</h6>
                <input
                  type="checkbox"
                  name="cost"
                  id="1"
                  value="1"
                  onChange={(e) => handleCostChange(e.target.value)}
                  className="mx-1"
                />
                <label htmlFor="1">$</label>
                <input
                  type="checkbox"
                  name="cost"
                  id="2"
                  value="2"
                  onChange={(e) => handleCostChange(e.target.value)}
                  className="mx-1"
                />
                <label htmlFor="2">$$</label>
                <input
                  type="checkbox"
                  name="cost"
                  id="3"
                  value="3"
                  onChange={(e) => handleCostChange(e.target.value)}
                  className="mx-1"
                />
                <label htmlFor="3">$$$</label>
                <input
                  type="checkbox"
                  name="cost"
                  id="4"
                  value="4"
                  onChange={(e) => handleCostChange(e.target.value)}
                  className="mx-1"
                />
                <label htmlFor="4">$$$$</label>
              </div>
              <div className="my-2">
                <h6>Cuisine:</h6>
                <select
                  multiple={true}
                  name="cuisine"
                  id="cuisine"
                  size="5"
                  value={cuisine}
                  onChange={(e) => {
                    const options = [...e.target.selectedOptions];
                    const values = options.map((option) => option.value);
                    setCuisine(values);
                  }}
                >
                  <option value="tradamerican">American</option>
                  <option value="arabic">Arabic</option>
                  <option value="bbq">Barbeque</option>
                  <option value="cajun">Cajun</option>
                  <option value="caribbean">Caribbean</option>
                  <option value="chinese">Chinese</option>
                  <option value="diners">Diners</option>
                  <option value="hotdogs">Fast Food</option>
                  <option value="filipino">Filipino</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="italian">Italian</option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="mexican">Mexican</option>
                  <option value="thai">Thai</option>
                  <option value="vietnamese">Vietnamese</option>
                </select>
              </div>
            </div>
          </div>

          <input
            type="submit"
            value="Find Restaurants Near Me"
            className="btnStyle"
          />
        </form>
      </div>
    );
}

export default SearchForm;
