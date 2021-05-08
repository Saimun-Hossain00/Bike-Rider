import React from 'react';
import { useParams } from 'react-router';
import map from '../../images/Map.png';
import './Destination.css';
import fakedata from "../../FakeData/fakedata"
import fakePlace from '../../FakePlace/FakePlace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Destination = () => {
    const {veh, placeFrom, placeTo} = useParams();
    const {type, info, imgUrl} = fakedata.find(vehicle => vehicle.type === veh);
    const {gMap} = fakePlace.find(place => place.name === placeFrom);
    
    return (
        <div className="row">

<div className="col-md-4 card cardStyle mt-2">
            <p className="mb-0 mt-3">From: {placeFrom}</p>
            <p className="mb-0 mt-3">To: {placeTo}</p>
            <br/><br/>

            

            {info.map(vehicleName => 
            <div className="selected-ride">
                <div className="d-flex align-items-center ml-2">
                    <img src={vehicleName.imgUrl} alt=""/>
                    
                </div>
                    <p> {vehicleName.Name}</p>
                    <p> <FontAwesomeIcon icon={faUserFriends}></FontAwesomeIcon> {vehicleName.space}</p>
                    <p> {vehicleName.price}</p>
                </div>)}
        </div>
            <div className="col-md-7 mt-2">
                <div>
                    <iframe src={gMap} width="400px" height="400px" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
            </div>

            
        </div>
    );
};

export default Destination;