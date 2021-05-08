import React from 'react';
import Data from '../Data/Data';
import './Home.css';
import rides from '../../FakeData/fakedata';

const Home = () => {

    return (
        <div className="row d-flex justify-content-center">
           <div className="container mt-5 ">
           <div className="row">
            {
                rides.map(ride => <Data className="" key={ride.rideType} ride={ride}></Data>)
            }
        </div>
           </div>
        </div>
    );
};

export default Home;