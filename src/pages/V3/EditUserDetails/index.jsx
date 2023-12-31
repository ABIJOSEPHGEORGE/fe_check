import React, { useContext } from 'react';
import ProfilePage from './EditProfile';
import EditPartnerPreferences from './PartnerPreferences';
import Dashboard from '../Dashboard';
import UserStore from '../../../contexts/UserStore';
import PhotosPage from './Photos';
import ProfilePreview from '../ProfilePreview';

const EditUserDetails = () => {

    const { editTab, dispatchEditTab, profilePreview, user } = useContext(UserStore);

    const tabItems =  [
        {name: 'Profile', actionName: 'EDIT_PROFILE', state: 'profile'},
        {name: 'Partner preference', actionName: 'EDIT_PARTNER_PREFERENCE', state: 'partner_preference'},
        {name: 'Photos', actionName: 'EDIT_PHOTOS', state: 'photos'}
    ]

    return (
        <Dashboard tabItems={tabItems} tabEdit={editTab} tabDispatch={dispatchEditTab} >
            {
                profilePreview ?
                    <ProfilePreview userId={user?.id}/> 
                :
                editTab?.profile ?
                    <ProfilePage/>
                : editTab?.partner_preference ?
                    <EditPartnerPreferences/>
                : editTab?.photos ?
                    <PhotosPage/>
                : null
            }
        </Dashboard>
    )

};


export default EditUserDetails;