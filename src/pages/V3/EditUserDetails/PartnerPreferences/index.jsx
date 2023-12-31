import React, { useContext, useState, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import UserStore from '../../../../contexts/UserStore';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Slider } from 'antd';
import {  FAMILY_BACKGROUND, HIGHEST_EDUCATION_QUALIFICATION, LIFESTYLE_CHOICES, MARRIAGE_TIMELINE, OCCUPATIONS, PERSONALITY_TRAITS, PREFERRED_RELATIONSHIP_STATUS } from '../../../../shared/constants';
import { religionData } from '../../../../apis/religions';
import { casteData } from '../../../../apis/caste';
import SelectGroup from '../../../../components/V3/Form/SelectGroup';
import ControlledSelect from '../../../../components/V3/Form/ControlledSelect';
import { partnerPreferenceValidation } from '../../../../utils/validations/partnerPreference';
import { updatePartnerPreferences } from '../../../../apis/users';
import { Spinner } from "@material-tailwind/react";
import MultiSelect from '../../../../components/V3/Form/MultiSelect';


const EditPartnerPreferences  = () => {
    const { errors, user, setErrors, setUser } = useContext(UserStore);
    const { preferences } = user || {};

    const methods = useForm({ defaultValues:{
        highest_qualification: preferences?.highest_qualification || '',
        occupation: preferences?.occupation || '',
        relationship_status: preferences?.relationship_status || '',
        family_background: preferences?.family_background || '',
        marriage_timeline: preferences?.marriage_timeline || '',
    }});
    
    const [religionAndCaste, setReligionCaste] = useState({
        religions: [],
        castes: [],
    });

    const [selectedReligion, setSelectedReligion] = useState('');
    const [selectedCaste, setSelectedCaste] = useState(preferences?.preferred_caste ?? '');
    const [age, setAge] = useState({ from: preferences?.age_from ?? 23, to: preferences?.age_to ?? 25});
    const [height, setHeight] = useState({ from: preferences?.height_from ?? 20, to: preferences?.height_to ?? user?.personal?.height ?? 150});
    const [lifestyleAndPersonality, setLifestyleAndPersonality] = useState({ diet: preferences?.diet ?? [], drinking: preferences?.drinking, smoking: preferences?.smoking ?? [], workout: preferences?.workout ?? [], personality_traits: preferences?.personality_traits ?? []});
    const [religionCastePreferrence, setReligionCastePreferrence] = useState({ caste: preferences?.no_preferred_caste ?? false, religion: preferences?.no_preferred_religion ?? false});
    const [loading, setLoading] = useState(false);

    const fetchReligions = useCallback( async () => {
        const data = await religionData();
        setReligionCaste((prev) => ({...prev, religions:[{name: 'Select', religionId: 'none'},...data ?? []]}));
    },[]);

    useEffect(() => {
        fetchReligions()
    },[]);


    const handleReligionChange = async (religionId) => {
        setSelectedReligion(religionId);
        const data = await casteData(religionId);
        setReligionCaste((prev) => ({...prev, castes: [{name: 'Select', _id: ''},...data ?? []]}));
    };

    const handleCasteChange = (casteId) => {
        setSelectedCaste(casteId);
    }
    useEffect(() => {
        if(user && preferences?.preferred_religion){
            handleReligionChange(preferences?.preferred_religion);
        }
    },[user])

    const handleLifeStyle = (key,item) => {
        setLifestyleAndPersonality((prev) =>{
            if(!prev?.[key].includes(item)){
                return {...prev, [key]: [...prev?.[key], item]}
            }else{
                return {...prev, [key]: prev?.[key].filter((selectedItem) => selectedItem !== item)}
            }
        });
    };

    const handlePersonalityTraits = (item) => {
        setLifestyleAndPersonality((prev) => {
            if(!prev.personality_traits.includes(item)){
                return {...prev, personality_traits: [...prev?.personality_traits, item]}
            }else{
                return {...prev, personality_traits: prev?.personality_traits.filter((selectedItem) => selectedItem !== item)}
            }
        })
    }

    const handleAgeChange =  (values) => {
        setAge({ from: values[0], to: values[1]})
    }

    const handleHeightChange = (values) => {
        setHeight({ from: values[0], to: values[1]});
    }

    const onSubmit = async (values) => {
        try{
            setLoading(true);
            const data = {
                ...values,
                age_from: age.from,
                age_to: age.to,
                preferred_religion: selectedReligion,
                no_preferred_religion: religionCastePreferrence.religion,
                no_preferred_caste: religionCastePreferrence.caste,
                diet: lifestyleAndPersonality.diet,
                drinking: lifestyleAndPersonality.drinking,
                smoking: lifestyleAndPersonality.smoking,
                workout: lifestyleAndPersonality.workout,
                personality_traits: lifestyleAndPersonality.personality_traits,
                height_from: height?.from,
                height_to: height?.to,
            };
            if(selectedCaste){
                data.preferred_caste=selectedCaste
            }
            await partnerPreferenceValidation.validate(data, { abortEarly: false});
            const res = await updatePartnerPreferences(data);
            if(res){
                setUser(res)
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

    };
    return(
        <div className="w-full h-fit gap-3 " >
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-5'>
            <div className="bg-white shadow-md shadow-gray-200 rounded-xl p-4 flex flex-col gap-5">
                 <div className="w-full flex flex-col gap-3">
                    <label htmlFor="age_range" className='text-md font-medium'>Preferred age range</label>
                    <div className="flex items-center justify-between gap-3 w-full">
                        <p className='text-gray-700 font-medium'>{age?.from}</p>
                        <Slider range defaultValue={[age?.from, age?.to]} min={23} max={50} onChange={handleAgeChange} className='w-full'/>
                        <p className='text-gray-700 font-medium'>{age?.to} Yrs</p>
                    </div>
                    {errors?.age_range && <span className='text-red-400'>{errors?.age_range}</span>}
                </div>
                 <div className="w-full flex flex-col gap-3">
                    <label htmlFor="age_range" className='text-md font-medium'>Preferred height range</label>
                    <div className="flex items-center justify-between gap-3 w-full">
                        <p className='text-gray-700 font-medium'>{height?.from}</p>
                        <Slider range defaultValue={[height?.from, height?.to]} min={20} max={200} onChange={handleHeightChange} className='w-full'/>
                        <p className='text-gray-700 font-medium'>{height?.to} cm</p>
                    </div>
                    {errors?.age_range && <span className='text-red-400'>{errors?.age_range}</span>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <SelectGroup label={'Highest Qualification'} name={'highest_qualification'} valueArray={HIGHEST_EDUCATION_QUALIFICATION}/>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <SelectGroup label={'Occupation'} name={'occupation'} valueArray={OCCUPATIONS}/>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <MultiSelect label={'Preferred relationship statuses'} name={'relationship_status'} valueArray={PREFERRED_RELATIONSHIP_STATUS}/>
                </div>
                <div className="flex flex-col gap-2">
                    <SelectGroup label={'Family background'} name={'family_background'} valueArray={FAMILY_BACKGROUND} />                    
                </div>
                <div className="w-full flex flex-col gap-1">
                    <ControlledSelect name={'preferred_religion'} label={'Preferred Religion'} value={selectedReligion} onChange={handleReligionChange} >
                            {
                                religionAndCaste?.religions?.map((ele, index) => (
                                    <option key={index} value={ele?._id}>{ele?.name}</option>
                                ))
                            }
                    </ControlledSelect>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox"  className="sr-only peer" checked={religionCastePreferrence?.religion} onChange={()=>setReligionCastePreferrence(prev => ({...prev, religion: !prev.religion}))}/>
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-brandRed dark:peer-focus:ring-brandRed dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brandRed"></div>
                        <span className="ms-3 text-sm font-medium  text-gray-700 dark:text-gray-300">No preferred religion</span>
                    </label>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <ControlledSelect label={'Preferred caste'} name={'preferred_caste'}  value={selectedCaste} onChange={handleCasteChange} disabled={!selectedReligion && !religionAndCaste.castes.length}>
                            {
                                religionAndCaste?.castes?.map((ele, index) => (
                                    <option key={index} value={ele?._id}>{ele?.name.split('-').join(' ')}</option>
                                ))
                            }
                    </ControlledSelect>
                </div>
                <div className="flex flex-col gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={religionCastePreferrence.caste} onChange={()=>setReligionCastePreferrence(prev => ({...prev, caste: !prev.caste}))}/>
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-brandRed dark:peer-focus:ring-brandRed dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brandRed"></div>
                        <span className="ms-3 text-sm font-medium text-gray-700  dark:text-gray-300">No preferred caste</span>
                    </label>
                </div>
                <div className="flex flex-col gap-5">
                    {
                        LIFESTYLE_CHOICES.map((item, index) => (
                            <div key={index} className="space-y-5">
                                <div className="space-y-3">
                                    <h4 className='text-sm font-medium text-gray-700'>{item.title}</h4>
                                    <div className="w-full flex gap-2 flex-wrap">
                                        {
                                            item.values.map((choice, index) => (
                                                <span 
                                                key={index} 
                                                className={`
                                                    py-1 px-2 cursor-pointer rounded-full flex gap-2 items-center
                                                `}>
                                                    <p 
                                                    className={`text-md font-md  px-2 py-1 rounded-full ${lifestyleAndPersonality?.[item.key]?.includes(choice) ? 'text-white bg-brandRed' : 'text-black bg-gray-200'}`}
                                                    onClick={() => handleLifeStyle(item?.key, choice)}
                                                    >{choice}</p>
                                                </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {errors?.lifestyle_choices && <span className='text-red-400'>{errors?.lifestyle_choices}</span>}
                </div>
                <div>
                    <div className="flex flex-col gap-5">
                        <h4 className='text-sm font-medium text-gray-700'>Personality traits</h4>
                        <div className="flex flex-wrap gap-2">
                        {
                            PERSONALITY_TRAITS.map((item, index) => (
                                <span 
                                key={index} 
                                className={`
                                py-1 px-2 cursor-pointer rounded-full flex gap-2 items-center flex-wrap w-fit
                                `}>
                                    <p 
                                    className={`text-md font-md px-2 py-1 rounded-full ${lifestyleAndPersonality.personality_traits.includes(item) ? 'text-white bg-brandRed' : 'text-black bg-gray-200'}`}
                                    onClick={()=>handlePersonalityTraits(item)}
                                    >
                                        {item}
                                    </p>
                                    </span>
                                ))
                            }
                            
                        </div>
                        {errors?.personality_traits && <span className='text-red-400'>{errors?.personality_traits}</span>}
                    </div>
                </div>
                <div className=" flex flex-1 flex-col gap-3">
                    <SelectGroup label={'Marriage timeline'} name={'marriage_timeline'} valueArray={MARRIAGE_TIMELINE}/>
                </div>
                </div>
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
            </FormProvider>
        
        </div>
    )
};

export default EditPartnerPreferences;