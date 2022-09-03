import React from 'react';
import "./service.css"
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Service = ({ service, handleDelete ,admin}) => {

    const { _id, name, description, Mileage, Engine, img, price } = service;


    // const { admin } = useAuth();

    return (

        <div className="col-md-4 my-3 ">
            <div class="card ">
                <img src={img} class="card-img-top " alt="..." />
                <div class="card-body">
                    <h4 class="card-title">{name}</h4>
                    <p class="card-text">{description.slice(0, 250)}</p>
                    <h3>Price: <span style={{ color: "blue" }}>{price}$</span></h3>

                    {admin ? (
                        <button
                            onClick={() => handleDelete(_id)}
                            className="rounded-pill px-3 py-2 btn text-white"
                            style={{ backgroundColor: "#ff6600" }}
                        >
                            Remove
                        </button>
                    ) : (
                        <Link to={`/booking/${_id}`} >
                            <button className="btn btn-danger">Buy Now</button>
                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Service;