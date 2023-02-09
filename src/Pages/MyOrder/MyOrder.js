import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import swal from 'sweetalert';
import useAuth from '../../Hooks/useAuth';

const MyOrder = () => {

    const [events,setEvents] = useState([]);
    console.log(events)
    const {user} = useAuth();

    useEffect(() => {
        fetch(`https://rn-tech-server-side-production.up.railway.app/myEvents/${user?.email}`)
        .then(res => res.json())
        .then(data => setEvents(data));
    },[user.email]);


    const handleDelete = id => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    fetch(`https://rn-tech-server-side-production.up.railway.app/deleteEvents/${id}`, {
                        method: "Delete",
                        headers: { "content-type": "application/json" },
                    }, [])
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount) {
                                const remaining = events.filter(event => event._id !== id);
                                setEvents(remaining);
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
        <div className="container-fluid">
            <h2>My Events</h2>

            <Table striped bordered>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name Name</th>
                        <th scope="col">Product Name Image</th>
                        <th scope="col">User Name</th>
                        <th scope="col">User Email</th>
                        <th scope="col">Deliver Date</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Cancel</th>


                    </tr>
                </thead>
                {
                    events.map((event, index) => (
                        <tbody key={event?._id}>
                            <tr>
                            <td>{index + 1}</td>
                                <td>{event?.carName}</td>
                                <td><img src={event?.img} width="100px" style={{borderRadius:"50%"}} className="img-fluid" alt="" /> </td>
                                <td>{event?.userName}</td>
                                <td>{event?.email}</td>
                                <td>{event?.deliverDate}</td>
                                <td>{event?.address}</td>
                                <td>{event?.phone}</td>
                                <td><button onClick={() => handleDelete(event._id)} className="btn btn-danger text-white" >Delete</button></td>
                            </tr>
                        </tbody>
                    ))
                }

            </Table>
        </div>
    );
};

export default MyOrder;