import React, { useState } from 'react';
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServiceSection";
import FeaturesSection from "../components/home/FeaturesSection";
import StudyTrackSection from "../components/home/StudyTrackSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CTASection from "../components/home/CTASection";
import data from '../data/data.json';
import AdvertisementBanner from "../components/shared/AdvertisementBanner";
import { useNavigate } from 'react-router-dom';
import N5 from './JLPT/N5';


export default function Home() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('jlpt');
    const handleBannerClick=()=>{
        navigate("/vocabulary/n5");
    }

    return (
        <div className="bg-gradient-to-b from-blue-50 to-indigo-50">
            <Header />
            <div className="h-screen items-center justify-center mt-10">
            <HeroSection />
            </div>
            <ServicesSection servicesData={data.servicesForHome} />

            <FeaturesSection features={data.features} />

            <StudyTrackSection activeTab={activeTab} setActiveTab={setActiveTab} />

            <TestimonialsSection testimonials={data.testimonialsForHome} />

            <CTASection />
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                <AdvertisementBanner  onClick={handleBannerClick}/>
            </div>

            <Footer />
        </div>
    );
}