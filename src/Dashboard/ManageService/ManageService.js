import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import useAuth from '../../Hooks/useAuth';
import Service from '../../Pages/Services/Service/Service';

const ManageService = () => {

    const [services, setServices] = useState([]);
    const { admin } = useAuth();

    useEffect(() => {
        fetch('http://localhost:8000/services')
            .then(res => res.json())
            .then(data => {
                setServices(data);
                console.log(data);
            })
    }, [])

    const handleDelete = id => {
        // console.log(id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    fetch(`http://localhost:8000/deleteService/${id}`, {
                        method: "Delete",
                        headers: { "content-type": "application/json" },
                    }, [])
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount) {
                                const rest = services.filter((item) => item._id !== id);
                                setServices(rest);
                            }
                        })



                    swal("Your file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your file is safe!");
                }
            });
    }

    return (
        <div className="my-4">
            <h1 className="text-center">Explore Bikes</h1>
            <div className="row container-fluid container mx-auto">
                {
                    services.map(service => <Service
                        key={service._id}
                        service={service}
                        admin={admin}
                        handleDelete={handleDelete}
                    ></Service>)
                }
            </div>
        </div>
    );
};

export default ManageService;