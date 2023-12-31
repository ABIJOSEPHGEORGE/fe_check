import React from 'react';
import Header from "../../../components/V3/Header";
import HeroSection from './Hero';
import WelcomeSection from './Welcome';
import WhoJoinsSection from './WhoJoins';
import HowSection from './How';
import JoinCoupleSquad from './JoinSection';
import DatrimonySection from './Datrimony';
import DatrimonyAdvantages from './DatrimonyAdvantage';
import FAQSection from './FAQ';
import Footer from '../../../components/V3/Footer';



const HomePage = () => {
    return (
        <>
            <Header/>
            <HeroSection/>
            <WelcomeSection/>
            <WhoJoinsSection/>
            <HowSection/>
            <JoinCoupleSquad/>
            <DatrimonySection/>
            <DatrimonyAdvantages/>
            <FAQSection/>
            <Footer/>
        </>
    )
}

export default HomePage;