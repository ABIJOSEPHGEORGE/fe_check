import React from 'react';
import qualification_icon from '../../../assets/icons/qualification_icon.svg';
import university_icon from '../../../assets/icons/university_icon.svg';
import height_icon from '../../../assets/icons/height_icon.svg';
import weight_icon from '../../../assets/icons/weight_icon.svg';
import religion_icon from '../../../assets/icons/religion_icon.svg';
import caste_icon from '../../../assets/icons/caste_icon.svg';
import location_icon from  '../../../assets/icons/location_icon.svg';
import company_name_icon from '../../../assets/icons/company_name_icon.svg';
import occupation_icon from '../../../assets/icons/occupation_icon.svg';
import SingleDetailCard from './SingleDetailCard';
// import date_of_birth_icon from '../../../assets/icons/date_of_birth.svg';
// import gender_icon from '../../../assets/icons/gender.svg';

const SectionOne = ({ user }) => {
    
    const userDisplayData = [
        {
            icon: qualification_icon,
            title: 'Qualification',
            data: user?.personal?.educational_qualification,
        },
        {
            icon: university_icon,
            title: 'University',
            data: user?.personal?.university_or_institute,
        },
        {
            icon: religion_icon,
            title: 'Religion',
            data:  user?.personal?.religion_id?.name,
        },
        {
            icon: location_icon,
            title: 'Current Location',
            data: user?.address?.city,
        },
        {
            icon: occupation_icon,
            title: 'Occupation',
            data: user?.personal?.occupation,
        },
        {
            icon: company_name_icon,
            title: 'Company name',
            data: user?.personal?.company_name,
        },
        {
            icon: caste_icon,
            title: 'Caste',
            data: user?.personal?.caste_id?.name?.toString().split('-').join(' ') ? user?.personal?.caste_id?.name?.toString().split('-').join(' ') : user?.personal?.caste_id?.name,
        },
        {
            icon: height_icon,
            title: 'Height',
            data: user?.personal?.height,
        },
        {
            icon: weight_icon,
            title: 'Weight',
            data: user?.personal?.weight,
        },
    ]

    return (
        <div className="w-full flex flex-col items-center mt-20">
            <div className="px-4 flex flex-col items-between w-full gap-5">
               
                <div className="w-full flex flex-wrap lg:flex-nowrap justify-between  gap-3">
                    {
                        userDisplayData.slice(0, 3).map((item, index) => (
                            <SingleDetailCard key={index} icon={item.icon} title={item.title} data={item?.data} />
                        ))
                    }
                </div>    
                <div className="w-full flex  flex-wrap lg:flex-nowrap justify-between gap-3">
                    {
                        userDisplayData.slice(3, 6).map((item, index) => (
                            <SingleDetailCard key={index} icon={item.icon} title={item.title} data={item?.data} />
                        ))
                    }
                </div>  
                <div className="w-full flex  flex-wrap lg:flex-nowrap justify-between gap-3">
                    {
                        userDisplayData.slice(6, 9).map((item, index) => (
                            <SingleDetailCard key={index} icon={item.icon} title={item.title} data={item?.data} />
                        ))
                    }
                </div>  
            </div>
        </div>
    )
};

export default SectionOne;