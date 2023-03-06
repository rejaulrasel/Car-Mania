import React from 'react';
import { Carousel } from 'react-bootstrap';
import banner1 from '../../../images/banner(3).jpg'
import banner2 from '../../../images/banner (2).jpg'
import banner3 from '../../../images/banner (1).jpg'


const Banner = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <img
                        style={{height:'95vh'}} 
                        className="d-block w-100"
                        src={banner1}
                        alt="Royal Enfield Classic 350"
                    />
                    <Carousel.Caption style={{color:"white"}}>
                        <h1>JOIN OUR TECH WORLD</h1>
                        <p>Originally launched in 2009, this Royal Enfield vehicle has since managed to find its way into the bucket list for most prospective bike buyers.the 5-speed manual gearbox of the bike provides plenty of freedom to riders.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{height:'80vh'}}
                        className="d-block w-100"
                        src={banner2}
                        alt="KTM RC 125"
                    />

                    <Carousel.Caption style={{color:"white"}}>
                        <h1>BUY PRODUCTS AND MAKE YOUR TECH JOURNEY</h1>
                        <p>Originally, the car was available in two primary colours. However, with the BS-VI variant rollout, KTM is offering three new livery colour options as well.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{height:'80vh'}}
                        className="d-block w-100"
                        src={banner3}
                        alt="Third slide"
                    />

                    <Carousel.Caption style={{color:"white"}}>
                        <h1>QUALITY PRODUCT WITH BEST PRICE</h1>
                        <p>The last name on the list is the Apache RTR 160 from TVS. In February 2020, the bike sold 32033 units. The single-cylinder, air-cooled and fuel-injected engine can generate a peak torque of 13.9Nm. </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
};

export default Banner;