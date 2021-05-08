import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import map from '../../images/Map.png';
import fakePlace from '../../FakePlace/FakePlace'
import Date from '../Date/Date';
const SelectDest = () => {

    const { veh } = useParams();

    

    const [placeFrom, setPlaceFrom] = useState("");
    const [placeTo, setPlaceTo] = useState("");

    const handlePlaceFrom = (e) => {
        const placeValue = e.target.value
        setPlaceFrom(placeValue)
    }
    console.log(placeFrom)
    const handlePlaceTo = (e) => {
        const placeValue = e.target.value
        setPlaceTo(placeValue)
    }
    console.log(placeTo)
    return (
        <div className="row">
            <div className="col-md-4 card cardStyle">
                <p className="mb-0 mt-3">Pick from</p>
                <select onChange={handlePlaceFrom} value={placeFrom} name="category" id="">
                    <option value="">Please Select</option>
                    {
                        fakePlace.map(place => (
                            <option value={place.name}>{place.name}</option>
                        ))
                    }
                </select>
                
                <p className="mb-0 mt-3">Drop</p>
                <select onChange={handlePlaceTo} value={placeTo} name="category" id="">
                    <option value="">Please Select</option>
                    {
                        fakePlace.map(place => (
                            <option value={place.name}>{place.name}</option>
                        ))
                    }
                </select>
                <br />
                <div>
                <Date className="mt-2"></Date>
                </div>
                <br /><br />
                {
                    (placeFrom == placeTo) && <p class="text-danger">Please Select different places</p>
                }
                <br /> <br />
                {
                    (placeFrom != placeTo) && <Link to={`/destination/${veh}/${placeFrom}/${placeTo}`}><button className="btn btn-info text-center text-light mb-5">Search</button></Link>
                }
            </div>

            <div className="col-md-7">
                <div>
                    <img className="img" src={map} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SelectDest;