import React from 'react';
import ProfileImage from './ProfileImage';
import MultiImages from './MultiImages';

const PhotosPage = () => {

    return (
        <div className="bg-white shadow-md shadow-gray-200 rounded-xl p-4 flex justify-center xl:justify-start flex-wrap xl:flex-nowrap xl:flex-row gap-8">
            <ProfileImage/>
            <MultiImages/>
        </div>
    )
};

export default PhotosPage;