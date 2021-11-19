import React from 'react';
import About from '../../About/About';
import CommentSection from '../../CommentSection/CommentSection';
import Contact from '../../Contact/Contact';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';
import Banner from '../Banner/Banner';
import HomeService from '../HomeService/HomeService';

const Home = () => {
    return (
        <div className='overflow-hidden'>
            <Header></Header>
            <Banner></Banner>
            <HomeService></HomeService>
            <CommentSection></CommentSection>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
};

export default Home;
