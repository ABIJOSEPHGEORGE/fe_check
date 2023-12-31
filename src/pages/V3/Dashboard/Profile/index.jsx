import React from 'react';
import {Profile, PhotosCard, LookingFor, Interests, About, Who, EducationAndProfession, Family, Bio, ReligionAndFaith, LifeStyle} from '../../../../components/V3/Dashboard';

const ProfilePage = () => {
    return(
        <>
            <Profile/>
            <PhotosCard/>
            <Bio/>
            <About/>
            <EducationAndProfession/>
            <LifeStyle/>
            <Interests/>
            <LookingFor/>
            <Who/>
            <ReligionAndFaith/>
            <Family/>
        </>
    )
};

export default ProfilePage;