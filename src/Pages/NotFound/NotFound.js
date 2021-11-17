import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../images/404.jpg'

const NotFound = () => {
    return (
        <div>
            <div className="text-center">
            <img src={img} className="mx-auto text-center img-fluid" alt="" />
            <br />
            <Link to="/"><button className="btn btn-danger m-5">Go Back</button>
            </Link>
        </div>
        </div>
    );
};

export default NotFound;