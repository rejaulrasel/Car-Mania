import React from 'react';
import img from '../../images/Screenshot 2021-11-18 025948.png'
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Contact = () => {
    return (
            <div>
            <div className="mx-auto text-center m-4 py-4"><h1 style={{color:"goldenrod"}}>Contact</h1></div>
            <div className="container contact-container container-fluid">
                <div className="contact-info">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Contact Info:</h2>
                            <br />
                            <hr />
                            <h3>Postal Address:</h3>
                            <p>466,East Goran, Dhaka ,Bangladesh</p>
                            <hr />
                            <div className="row">
                                <div className="col-md-6">
                                    <h3>Phone Number:</h3>
                                    <p>+9873645374</p>
                                    <p>+9873645375</p>
                                </div>
                                <div className="col-md-6">
                                    <h3>Email:</h3>
                                    <p>rejaulhasanrasel28@gmail.com</p>
                                    <p>car.mania01100@gmail.com</p>
                                </div>
                                <hr />
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <h3>Facebook :</h3>
                                    <p>www.faccebook.com/Car-Mania</p>
                                </div>
                                <div className="col-md-6">
                                    <h3>Skype:</h3>
                                    <p>www.skype.com/Car-Mania</p>
                                </div>
                                <hr />
                            </div>

                        </div>
                        <div className="col-md-6">
                            <h2 className="map">Location Info :</h2>
                            <br />
                            <img className="img-fluid" src={img} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-center bold" style={{color:"goldenrod"}}>Contact With Us</h2>
                <div className="w-50 mt-4 mx-auto text-center">
                        <div class="form-floating mt-3 mb-2">
                            <input type="email" name="email" id="floatingInput" placeholder="name@example.com" class="form-control" />
                            <label for="floatingInput">Email address</label>
                        </div>

                        <div class="form-floating mb-2">
                            <input type="Name" name="Name" id="floatingName" placeholder="Name" class="form-control" />
                            <label for="floatingName">Name</label>
                        </div>
                        <div>
                            <textarea placeholder="Type Your Problem" name="instruction" id="" cols="40" rows="4"></textarea>
                        </div>
                    <button class=" btn btn-lg btn-primary mb-4" type="submit">Submit </button>
                </div>
            </div>
        </div >
    );
};

export default Contact;