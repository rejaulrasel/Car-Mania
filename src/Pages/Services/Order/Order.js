import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import swal from 'sweetalert';
import useAuth from '../../../Hooks/useAuth';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';

const Order = () => {

    const [service, setService] = useState({});
    const { serviceId } = useParams();
    const { user } = useAuth();
    const history = useHistory();


    useEffect(() => {
        fetch(`https://rn-tech-server-side-production.up.railway.app/services/${serviceId}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, []);

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        data.carName = service?.name;
        data.price = service?.price;
        data.img = service?.img;
        data.state = "pending";
        fetch("https://rn-tech-server-side-production.up.railway.app/addEvent", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => console.log(result));
            
        console.log(data);
        
        history.push('/home')
        swal("Congratulation!", "You have added successfully", "success");
        reset();

        
    };

    return (
        <>
        <Header></Header>
            <div className="container my-4">
                <h2 className="my-4 text-center">Order {service?.name}</h2>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card" style={{ width: "18rem" }}>
                            <img src={service?.img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">{service?.name}</h4>
                                <p className="card-text">{(service?.description)?.slice(0,250)}</p>
                                <h3>Price: <span style={{ color: "goldenrod" }}>{service?.price}$</span></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex flex-column align-items-start justify-content-center">
                        <form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-center align-items center flex-column w-50 text-center mx-auto">

                            <input className="mb-2" placeholder="Enter Your Address" {...register("address", { required: true })} />

                            <input className="mb-2" placeholder="Enter the UserName" defaultValue={user?.displayName} {...register("userName", { required: true, maxLength: 100 })} />
                            <input className="mb-2" type="email" placeholder="Enter Your email" defaultValue={user?.email} {...register("email", { required: true, maxLength: 100 })} />
                            <input className="mb-2" type="number" placeholder="Enter Your Phone No" {...register("phone", { required: true, maxLength: 100 })} />
                            <input className="mb-2" placeholder="Travel date" type="date"  {...register("deliverDate", { required: true })} />

                            <input className="btn btn-warning text-white" type="Submit" />
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Order;
