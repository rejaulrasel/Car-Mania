import React, { useEffect, useState } from 'react';
import './HomeService.css'
import Service from '../../Services/Service/Service';
import {Link} from "react-router-dom";

const HomeService = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://rn-tech-valley-production.up.railway.app/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                console.log(data);
            })
    }, [])

    return (
        <div className="mb-4 pt-5 bg">
            <h1 className="text-center text-warning">OUR TECH-VALLEY</h1>
            <div className="row container-fluid container mx-auto">
                {
                    services.slice(0, 6).map(service => <Service
                        key={service._id}
                        service={service}
                    ></Service>)
                }

            </div>
            <Link to="/services"><div className="mx-auto text-center"><button className="mb-5 btn btn-primary text-white">See all Products</button></div></Link>
        </div>
    );
};

export default HomeService;