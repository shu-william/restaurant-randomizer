import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = (props) => {

    const [location, setLocation] = useState("");
    const [cost, setCost] = useState("1");
    const [cuisine, setCuisine] = useState(["tradamerican"]);
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
        console.log(cuisine);
        setErrors("");
        if(formValidator()) {
            axios.get('http://localhost:8000/yelp_api', {
                params: {
                    location: location,
                    cost: cost,
                    cuisine: cuisine,
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

    return (
        <div>
            {errors ? <p className="text-danger">{errors}</p> : ""}
            <form onSubmit={submitHandler} className="form-inline">
                <div className="form-group">
                    <label htmlFor="location">Please enter your location.</label>
                    <input type="text" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" />
                </div>
                <div className="d-flex">
                    <div className="border radio">
                        <h6>Cost:</h6>
                        <input type="radio" name="cost" id="1" value="1" onChange={(e) => setCost(e.target.value)} />
                        <label htmlFor="1">$</label>
                        <input type="radio" name="cost" id="2" value="2" onChange={(e) => setCost(e.target.value)} />
                        <label htmlFor="2">$$</label>
                        <input type="radio" name="cost" id="3" value="3" onChange={(e) => setCost(e.target.value)} />
                        <label htmlFor="3">$$$</label>
                        <input type="radio" name="cost" id="4" value="4" onChange={(e) => setCost(e.target.value)} />
                        <label htmlFor="4">$$$$</label>
                    </div>
                    <div className="border">
                        <h6>Cuisine:</h6>
                        <label htmlFor="cuisine">Cuisine:</label>
                        <select 
                            multiple={true} name="cuisine" id="cuisine" value={cuisine} 
                            onChange={(e) => {
                                const options = [...e.target.selectedOptions];
                                const values = options.map(option => option.value);
                                setCuisine(values);
                            }} >
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
                <input type="submit" value="Find Restaurants Near Me" className="btn btn-primary my-3"/>
            </form>
        </div>
    )
}

export default SearchForm;
