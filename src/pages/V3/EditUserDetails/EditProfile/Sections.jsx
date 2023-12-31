import React from 'react';
import { GiGlassCelebration } from "react-icons/gi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdFamilyRestroom, MdOutlineInterests } from "react-icons/md";
import { PiGraduationCap, PiHandsPrayingDuotone, PiPersonThin } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
// import { TfiGallery } from "react-icons/tfi";
import {
    BioSection,
    ContactPreferences,
    EducationAndProfession,
    FamilySection,
    InterestAndHobbies,
    LifestyleChoices,
    PersonalSection,
    PersonalityTraits,
    ReligionAndFaith
} from '../../../../components/V3/ProfileEditing/Sections';


export const sections = [
    // {
    //     title: 'My photos',
    //     toggleName: 'PHOTOS',
    //     toggleState: 'photos',
    //     Icon: <TfiGallery size={20}/>,
    //     component: <EditPhotos/>
    // },
    {
        title: 'Personal',
        toggleName: 'PERSONAL',
        toggleState: 'personal',
        Icon: <LiaUserEditSolid size={20}/>,
        component: <PersonalSection/>
    },
    {
        title: 'Bio',
        toggleName: 'BIO',
        toggleState: 'bio',
        Icon: <HiOutlinePencilSquare size={20}/>,
        component: <BioSection/>
    },
    {
        title: 'Education and Profession',
        toggleName: 'EDUCATION_AND_PROFESSION',
        toggleState: 'education_and_profession',
        Icon: <PiGraduationCap size={20}/>,
        component: <EducationAndProfession/>
    },
    {
        title: 'Religion and Faith',
        toggleName: 'RELIGION_AND_FAITH',
        toggleState: 'religion_and_faith',
        Icon: <PiHandsPrayingDuotone size={20}/>,
        component: <ReligionAndFaith/>
    },
    {
        title: 'Lifestyle choices',
        toggleName: 'LIFESTYLE_CHOICES',
        toggleState: 'lifestyle_choices',
        Icon: <GiGlassCelebration size={20}/>,
        component: <LifestyleChoices/>
    },
    {
        title: 'Interests and Hobbies',
        toggleName: 'INTERESTS_AND_HOBBIES',
        toggleState: 'interests_and_hobbies',
        Icon: <MdOutlineInterests size={20}/>,
        component: <InterestAndHobbies/>
    },
    {
        title: 'Personality traits',
        toggleName: 'PERSONALITY_TRAITS',
        toggleState: 'personality_traits',
        Icon: <PiPersonThin size={20}/>,
        component: <PersonalityTraits/>
    },
    {
        title: 'Contact Preferences',
        toggleName: 'CONTACT_PREFERENCES',
        toggleState: 'contact_preferences',
        Icon: <RiUserSettingsLine size={20}/>,
        component: <ContactPreferences/>
    },
    {
        title: 'My family',
        toggleName: 'FAMILY_INFORMATION',
        toggleState: 'family_information',
        Icon: <MdFamilyRestroom size={20}/>,
        component: <FamilySection/>
    },
    
]
