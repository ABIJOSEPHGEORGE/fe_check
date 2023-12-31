import React, { useContext, useEffect, useReducer, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
// import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import * as Yup from 'yup';
import ProfileEditCard from '../../../../components/V3/ProfileEditing/index';
import UserStore from '../../../../contexts/UserStore';
import { sections } from './Sections';
import { Spinner } from "@material-tailwind/react";


import { toast, ToastContainer } from 'react-toastify';
import { editProfileValidation } from '../../../../utils/validations/profileEdit';
import { updateUserData } from '../../../../apis/users/'

const ProfilePage = () => {
    const { user,session, setErrors, editProfileValues, setProfilePicture, setEditProfileValues, setUser } = useContext(UserStore);

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setProfilePicture(user?.photo);
            setEditProfileValues((prev) => ({...prev, 
                contactPreferences: user?.contact_preferences,
                personalityTraits: user?.misc?.personality_traits,
                interests: user?.misc?.hobbies_and_interests,
                lifestyleChoices:{diet: user?.misc?.diet, drinking: user?.misc?.drinking, smoking: user?.misc?.smoking, workout: user?.misc?.workout},
            }));
    },[user, session]);

    const {
        contactPreferences,
        interests,
        lifestyleChoices,
        handpicked,
        heightAndWeight,
        selectedLocations,
        personalityTraits,
    } = editProfileValues;

    const methods = useForm({
        defaultValues:{
            full_name: user?.name,
            email: user?.email,
            dob: new Date(user?.personal?.dob).toISOString().split('T')[0],
            relationship_status_status: user?.personal?.relationship_status,
            highest_qualification: user?.personal?.educational_qualification,
            university_or_institute:  user?.personal?.university_or_institute,
            occupation: user?.personal?.occupation,
            company_name: user?.personal?.company_name,
            short_bio: user?.personal?.short_bio,
            detailed_bio: user?.personal?.detailed_bio,
            marriage_timeline: user?.personal?.marriage_timeline,
            father_name: user?.family?.father?.name,
            father_occupation: user?.family?.father?.occupation,
            mother_name: user?.family?.mother?.name,
            mother_occupation: user?.family?.mother?.occupation,
            about_family: user?.family?.about,
            family_background: user?.family?.family_background,
            family_location: user?.family?.location,
            how_often_pray: user?.misc?.how_often_pray,
        }
    });

    const toggleReducers = (state, action) => {
        switch(action.type){
            case 'PERSONAL':
                return { personal: !state.personal};
            case 'EDUCATION_AND_PROFESSION':
                return { education_and_profession: !state.education_and_profession};
            case 'BIO':
                return { bio: !state.bio};
            case 'RELIGION_AND_FAITH':
                return { religion_and_faith: !state.religion_and_faith};
            case 'LIFESTYLE_CHOICES':
                return { lifestyle_choices: !state.lifestyle_choices};
            case 'INTERESTS_AND_HOBBIES':
                return { interests_and_hobbies: !state.interests_and_hobbies};
            case 'PERSONALITY_TRAITS':
                return { personality_traits: !state.personality_traits};
            case 'CONTACT_PREFERENCES':
                return {contact_preferences: !state.contact_preferences};
            case 'FAMILY_INFORMATION':
                return {family_information: !state.family_information};
            case 'PHOTOS':
                return { photos: !state.photos};
            default:
                return state;
        }
    };

    const [toggle, dispatch] = useReducer(toggleReducers, 
        {
            personal: true, 
            education_and_profession: false, 
            bio: false, 
            religion_and_faith: false, 
            lifestyle_choices: false,
            personality_traits: false,
            contact_preferences: false,
            family_information: false,
            photos:false,
        });

   
    

    async function onSubmit (values) {
        const data = {
            ...values,
            height: heightAndWeight.height,
            weight: heightAndWeight.weight,
            country: selectedLocations.country,
            state: selectedLocations.state,
            city: selectedLocations.city,
            handpicked,
            lifestyle_choices: lifestyleChoices,
            interests_and_hobbies: interests,
            personality_traits: personalityTraits,
            contact_preferences: contactPreferences,
            religion: editProfileValues?.religionAndCaste?.religion,
            caste: editProfileValues?.religionAndCaste?.castes,
        };

        
        try{
            setLoading(true)
            await editProfileValidation.validate(data, {abortEarly:false});
            
            const body = {
                name: values.full_name,
                email: values.email,
                personal: {
                    dob: values.dob,
                    relationship_status: values.relationship_status,
                    religion_id: editProfileValues?.religionAndCaste?.religion ?? user?.personal?.religion_id,
                    caste_id: editProfileValues?.religionAndCaste?.castes,
                    height: heightAndWeight.height,
                    weight: heightAndWeight.weight,
                    educational_qualification: values.highest_qualification,
                    university_or_institute: values.university_or_institute,
                    occupation: values.occupation,
                    company_name: values.company_name,
                    short_bio: values.short_bio,
                    detailed_bio: values.detailed_bio,
                    marriage_timeline: values.marriage_timeline,
                    allow_handpicked: handpicked,
                },
                family: {
                    father: {
                        name: values.father_name,
                        occupation: values.father_occupation,
                    },
                    mother: {
                        name: values.mother_name,
                        occupation: values.mother_occupation,
                    },
                    about: values.about_family,
                    family_background: values.family_background,
                    location: values.family_location,
                },
                contact_preferences: contactPreferences,
                misc: {
                    diet: lifestyleChoices.diet,
                    drinking: lifestyleChoices.drinking,
                    smoking: lifestyleChoices.smoking,
                    workout: lifestyleChoices.workout,
                    hobbies_and_interests: interests,
                    personality_traits:personalityTraits,
                    how_often_pray: values.how_often_pray,
                },
                address: {
                    country_id: selectedLocations.country,
                    state_id: selectedLocations.state,
                    city: selectedLocations.city,
                },
            };

            const res = await updateUserData(body);
            if(res){
                setUser(res);
                toast.success('Updated successfully');
                setLoading(false);
            }
        }catch(errors){
            setLoading(false);
            if(errors instanceof Yup.ValidationError){
                setErrors({ [errors.inner[0].path]: errors.inner[0].message})
                toast.error(errors.inner[0].message);
            }else{
                toast.error('Something went wrong');
            }
        }
    }

    return (
            <div className="w-full flex flex-col items-center">
            <ToastContainer position='top-right'/>
            <FormProvider {...methods}>
            <div className="w-full lg:py-4 gap-3 h-full flex flex-col justify-start ">
                <div className="w-full flex flex-col items-center">
                    
                    <form className='w-full space-y-3' onSubmit={methods.handleSubmit(onSubmit)}>
                        {
                            sections.map((comp, index) => (
                                <ProfileEditCard key={index} Icon={comp.Icon} toggleState={toggle?.[comp.toggleState]} toggleName={comp.toggleName} dispatch={dispatch} title={comp.title} >
                                    { comp.component }
                                </ProfileEditCard>
                            ))
                        }
                        <div className="w-full flex flex-col gap-1 items-center justify-center">
                            {
                                loading ?
                                <button className={`w-fit text-white font-medium text-center bg-brandRed px-3 py-3 rounded-3xl text-xl`} disabled={loading} onClick={onSubmit}>
                                    <Spinner color="white" className="w-6 h-6"/>
                                </button>
                                :
                                <button className='w-fit text-white px-8 text-lg py-2 text-center bg-brandRed bg-opacity-85 rounded-full' type='submit'>Save</button>
                            }
                            
                        </div>
                    </form>
                
                </div>
            </div>
            </FormProvider>
            </div>
    )
};

export default ProfilePage;