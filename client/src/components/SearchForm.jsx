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
      { value: "african", label: "African" },
      { value: "tradamerican", label: "American" },
      { value: "arabian", label: "Arabic" },
      { value: "argentine", label: "Argentine" },
      { value: "armenian", label: "Armenian" },
      { value: "bbq", label: "Barbeque" },
      { value: "belgian", label: "Belgian" },
      { value: "brazilian", label: "Brazilian" },
      { value: "breakfast_brunch", label: "Breakfast" },
      { value: "breweries", label: "Breweries" },
      { value: "british", label: "British" },
      { value: "buffets", label: "Buffets" },
      { value: "bulgarian", label: "Bulgarian" },
      { value: "cafes", label: "Cafes" },
      { value: "cajun", label: "Cajun" },
      { value: "caribbean", label: "Caribbean" },
      { value: "chinese", label: "Chinese" },
      { value: "cuban", label: "Cuban" },
      { value: "diners", label: "Diners" },
      { value: "desserts", label: "Desserts" },
      { value: "ethiopian", label: "Ethiopian" },
      { value: "hotdogs", label: "Fast Food" },
      { value: "filipino", label: "Filipino" },
      { value: "french", label: "French" },
      { value: "gastropubs", label: "Gastropubs" },
      { value: "german", label: "German" },
      { value: "gluten_free", label: "Gluten Free" },
      { value: "greek", label: "Greek" },
      { value: "halal", label: "Halal" },
      { value: "hawaiian", label: "Hawaiian" },
      { value: "indpak", label: "Indian" },
      { value: "indonesian", label: "Indonesian" },
      { value: "italian", label: "Italian" },
      { value: "irish", label: "Irish" },
      { value: "japanese", label: "Japanese" },
      { value: "korean", label: "Korean" },
      { value: "kosher", label: "Kosher" },
      { value: "laotian", label: "Laotian" },
      { value: "latin", label: "Latin American" },
      { value: "malaysian", label: "Malaysian" },
      { value: "mediterranean", label: "Mediterranean" },
      { value: "mexican", label: "Mexican" },
      { value: "mongolian", label: "Mongolian" },
      { value: "moroccan", label: "Moroccan" },
      { value: "persian", label: "Persian" },
      { value: "portuguese", label: "Portuguese" },
      { value: "russian", label: "Russian" },
      { value: "spanish", label: "Spanish" },
      { value: "thai", label: "Thai" },
      { value: "turkish", label: "Turkish" },
      { value: "vegan", label: "Vegan" },
      { value: "vegetarian", label: "Vegetarian" },
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
                console.log(res.data.businesses[0])
                setFetchedData(res.data.businesses);
                if (res.data.businesses.length === 0) {
                  setErrors("Your search did not return any results.")
                }
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
                if (res.data.businesses.length === 0) {
                  setErrors("Your search did not return any results.")
                }
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
            <div className="form-group mt-2 mb-3">
              {errors ? <p className="errorStyle">{errors}</p> : ""}
              <label htmlFor="location">Enter your location:</label>
              <div className="d-flex align-items-center my-2">
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
                <button type="button" onClick={getLocation} className="locationBtn"></button>                
              </div>
            </div>
            <div>
              <div className="mt-2 mb-3">
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
              <div className="mt-4 mb-3">
                <h6>Cuisine:</h6>
                <Select
                  isMulti
                  isSearchable
                  isClearable={false}
                  name="cuisine"
                  id="cuisine"
                  defaultValue={selectOptions[1]}
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
