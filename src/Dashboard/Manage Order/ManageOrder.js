import React, { useEffect, useState } from 'react';
import axios from "axios";

import swal from 'sweetalert';
import useAuth from '../../Hooks/useAuth'
import { Table } from 'react-bootstrap';

const ManageOrder = () => {

    const [orders, setOrders] = useState([]);
    console.log(orders)
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:8000/allEvents`)
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [user.email]);

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

                    fetch(`http://localhost:8000/deleteEvents/${id}`, {
                        method: "Delete",
                        headers: { "content-type": "application/json" },
                    }, [])
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount) {
                                const restOrder = orders.filter((item) => item._id !== id);
                                setOrders(restOrder);
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


    const statusChange = (id, order) => {
        console.log(order?.state);

        if (order?.state === "pending") {
            axios
                .put(`http://localhost:8000/updateState/${id}`, {
                    state: "Shipped",
                })
                .then((res) => {
                    if (res.data.modifiedCount) {
                        console.log(res.data);
                        order.state = "Shipped";
                        const modified = orders.map((item) =>
                            item._id === id ? order : item
                        );
                        setOrders(modified);
                        swal("Congratulations!", "Your Order is Shipped successfully", "success");
                    }
                });
        }
    };

    return (
        <div className="container-fluid">
            <h2>All Events</h2>

            <Table striped bordered>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Products</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        <th scope="col">Confirm</th>

                    </tr>
                </thead>
                {
                    orders.map((event, index) => (
                        <tbody>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{event?.carName}</td>
                                <td>{event?.userName}</td>
                                <td>{event?.email}</td>

                                <td>{event?.address}</td>
                                <td>{event?.state}</td>
                                <td><button onClick={() => handleDelete(event._id)} className="btn btn-danger text-white" >Delete</button></td>
                                <td><button onClick={() => statusChange(event?._id,event)} className="btn btn-primary">Payment</button></td>
                            </tr>
                        </tbody>
                    ))
                }

            </Table>
        </div>
    );
};

export default ManageOrder;