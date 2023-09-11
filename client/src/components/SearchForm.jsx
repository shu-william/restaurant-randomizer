import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const SearchForm = (props) => {

    const {setFetchedData, location, setLocation, latitude, setLatitude, longitude, setLongitude, cost, setCost, cuisine, setCuisine, setOffset} = props;

    const [errors, setErrors] = useState("");

    const [costs, setCosts] = useState({
      1: true,
      2: true,
      3: true,
      4: true
    })

    // Holds state of cuisine dropdown on change, consider updating since this
    // could cause bugs if the user were able to manipulate the dropdown
    const [emptySelect, setEmptySelect] = useState(false);

    const selectOptions = [
      { value: "tradamerican", label: "American" },
      { value: "arabic", label: "Arabic" },
      { value: "bbq", label: "Barbeque" },
      { value: "cajun", label: "Cajun" },
      { value: "caribbean", label: "Caribbean" },
      { value: "chinese", label: "Chinese" },
      { value: "diners", label: "Diners" },
      { value: "hotdogs", label: "Fast Food" },
      { value: "filipino", label: "Filipino" },
      { value: "french", label: "French" },
      { value: "german", label: "German" },
      { value: "hawaiian", label: "Hawaiian" },
      { value: "italian", label: "Italian" },
      { value: "japanese", label: "Japanese" },
      { value: "korean", label: "Korean" },
      { value: "mediterranean", label: "Mediterranean" },
      { value: "mexican", label: "Mexican" },
      { value: "thai", label: "Thai" },
      { value: "vietnamese", label: "Vietnamese" },
    ]

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successLocation);
      }
    }

    function successLocation(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }

    // This, along with the useEffect, updates the cost variable to be sent to the Yelp API
    const handleCostChange = (value) => {
      setCosts({...costs,
        [value]: !costs[value]
      })
    }

    useEffect(() => {
      let arr = [];
      for (let i = 1; i <= 4; i++) {
        if (costs[i]) {
          arr.push(i);
        }
      }
      setCost(arr);
    }, [costs])

    const formValidator = () => {
        let isValid = true;
        // Location Validator
        if (!location.length > 0 && !latitude) {
            isValid = false;
        }
        // Cost Validator
        let costCheck = false;
        for (let i = 1; i <= 4; i++) {
          if (costs[i] === true) {
            costCheck = true;
          }
        }
        if (costCheck !== true) {
          isValid = false;
        }
        // Cuisine Validator
        if (emptySelect) {
          isValid = false;
        }
        return isValid;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors("");
        if(formValidator()) {
          if (latitude && longitude) { // send coordinates if available
            axios.get('http://localhost:8000/yelp_api', {
              params: {
                latitude: latitude,
                longitude: longitude,
                cost: cost,
                cuisine: cuisine,
                offset: 0,
              }
            })
              .then(res => {
                setOffset(0);
                setFetchedData(res.data.businesses);
            })
          } else { // otherwise use location provided by user
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
              .catch(err => {
                setErrors(err.response.data.message);
              })
          }
        }
        else {
            setErrors("Please specify a valid location, price range, and cuisine.")
        }
    }

    return (
      <div className="filterStyle">
        <form onSubmit={submitHandler}>
          <div className="formClass">
            <div className="form-group">
              {errors ? <p className="errorStyle">{errors}</p> : ""}
              <label htmlFor="location">Enter your location:</label>
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setLatitude("");
                  setLongitude("");
                }}
                className="form-control"
              />
              <button type="button" onClick={getLocation}>Get Location</button>
            </div>
            <div>
              <div className="my-2">
                <h6>Cost:</h6>
                <input
                  type="checkbox"
                  name="cost"
                  id="1"
                  value="1"
                  checked={costs[1]}
                  onChange={(e) => handleCostChange(e.target.value)}
                  className="mx-1"
                />
                <label htmlFor="1">$</label>
                <input
                  type="checkbox"
                  name="cost"
                  id="2"
                  value="2"
                  checked={costs[2]}
                  onChange={(e) => handleCostChange(e.target.value)}
                  className="mx-1"
                />
                <label htmlFor="2">$$</label>
                <input
                  type="checkbox"
                  name="cost"
                  id="3"
                  value="3"
                  checked={costs[3]}
                  onChange={(e) => handleCostChange(e.target.value)}
                  className="mx-1"
                />
                <label htmlFor="3">$$$</label>
                <input
                  type="checkbox"
                  name="cost"
                  id="4"
                  value="4"
                  checked={costs[4]}
                  onChange={(e) => handleCostChange(e.target.value)}
                  className="mx-1"
                />
                <label htmlFor="4">$$$$</label>
              </div>
              <div className="my-2">
                <h6>Cuisine:</h6>
                <Select
                  isMulti
                  isSearchable
                  isClearable={false}
                  name="cuisine"
                  id="cuisine"
                  defaultValue={selectOptions[0]}
                  onChange={(selectedOptions) => {
                    selectedOptions.length === 0 ? setEmptySelect(true) : setEmptySelect(false);
                    setCuisine(selectedOptions.map(option => option.value))
                  }}
                  options={selectOptions}
                />
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
