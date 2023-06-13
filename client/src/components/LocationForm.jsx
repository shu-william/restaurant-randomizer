import React, { useState } from 'react';
import axios from 'axios';

const LocationForm = (props) => {

    const [location, setLocation] = useState("");
    const [errors, setErrors] = useState("");

    const {fetchedData, setFetchedData} = props;

    const locationValidator = () => {
        let isValid = true;
        if (!location.length > 0) {
            isValid = false;
        }
        return isValid;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors("");
        if(locationValidator()) {
            axios.get('http://localhost:8000/yelp_api/' + location)
                .then(res => {
                    console.log(res.data);
                })
        }
        else {
            setErrors("This field may not be blank.")
        }
    }

    return (
        <div>
            {errors ? <p className="text-danger">{errors}</p> : ""}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="location">Please enter your location.</label>
                    <input type="text" name="location" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" />
                </div>
                <input type="submit" value="Find Restaurants Near Me" className="btn btn-primary my-3"/>
            </form>
        </div>
    )
}

export default LocationForm;
