import React, { useContext, useEffect} from 'react';
import { Slider }  from 'antd';
import {Country, State, City} from 'country-state-city';
import { MARRIAGE_TIMELINE, RELATIONSHIP_STATUS } from '../../../../shared/constants';
import UserStore from '../../../../contexts/UserStore';
import InputGroup from '../../Form/InputGroup';
import SelectGroup from '../../Form/SelectGroup';
import ControlledSelect from '../../Form/ControlledSelect';


const PersonalSection = () => {
    const { user, errors, editProfileValues, setEditProfileValues } = useContext(UserStore);
    const { selectedLocations, heightAndWeight, handpicked } = editProfileValues;
    const [addresses, setAddresses] = useState({ states: [], cities: []});
   const countries = [{isoCode:'none', name: 'Select'}, ...Country.getAllCountries()];

    

    const handleSelectedLocation = (location, locationValue) => {
        setEditProfileValues((prev) => ({...prev, selectedLocations: {...prev.selectedLocations, [location]:locationValue}}));
    }

    const handleCountryChange = (countryId) => {
        if(countryId !== 'none'){
            const states = [{isoCode: 'none', name: 'Select'}, ...State.getStatesOfCountry(countryId)];
            const selectedCountry = Country.getCountryByCode(countryId);
            handleSelectedLocation('country', selectedCountry.isoCode);
            setAddresses((prev) => ({...prev, states}));
        }else{
            handleSelectedLocation('country', 'none');
            setAddresses((prev) => ({...prev, states:[{isoCode: 'none',name:'Select'}], cities: [{name: 'none'}]}))
        }
    };

    const handleStateChange = (stateId) => {
       if(stateId !== 'none'){
            const cities =[{name: 'none'}, ...City.getCitiesOfState(selectedLocations.country,stateId)];
            const selectedState = State.getStateByCodeAndCountry(stateId, selectedLocations.country);
            handleSelectedLocation('state', selectedState?.isoCode);
            setAddresses((prev) => ({...prev, cities}));
       }else{
        handleSelectedLocation('state','none');
        setAddresses((prev) => ({...prev, cities:[{name:'none'}]}));
       }
    }

    const handleCityChange = (cityName) => {
        handleSelectedLocation('city',cityName);
    }

    useEffect(() => {
        setEditProfileValues((prev) => ({...prev, 
            heightAndWeight: {height: user?.personal?.height, weight: user?.personal?.weight}
        }));
        if(user?.address?.country_id){
            handleCountryChange(user?.address?.country_id);
            if(user?.address?.state_id){
                handleStateChange(user?.address?.state_id);
                handleSelectedLocation('state', user?.address?.state_id);
            }
            if(user?.address?.city){
                const cities =[{name: 'none'}, ...City.getCitiesOfState(user?.address?.country_id, user?.address?.state_id)];
                setAddresses((prev) => ({...prev, cities}));
                handleSelectedLocation('city', user?.address?.city)
            }
        }
       
    },[user]);

    return (
        <>
            <div className="w-full flex flex-col gap-2">
                <div className="w-full flex flex-col gap-3">
                    <InputGroup name={'full_name'} label={'Full name'} type={'text'}/>  
                </div>
                <div className="space-y-3 w-full">
                    <InputGroup name={'dob'} label={'Date of birth'} type={'date'} disabled={user?.verification?.status === 'verified'}/>
                </div>
            </div>
            <div className="w-full flex flex-col gap-1">
                <InputGroup label={'Email'} type={'email'} name={'email'}/>
            </div>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex flex-col gap-1">
                    <span htmlFor="height" className='flex justify-between'>
                        <label htmlFor="height" className='text-md font-medium text-gray-700' >Height</label>
                        <span className='text-gray-500'>{heightAndWeight.height} cm</span>
                    </span>
                    <Slider max={300} value={heightAndWeight.height} disabled={user?.verification?.status === 'verified'}
                        onChange={(e) => setEditProfileValues((prev) => ({...prev, heightAndWeight:{...prev.heightAndWeight, height:e}}))}/>
                    {errors?.height && <span className='text-red-400'>{errors?.height}</span>}
                </div>
                <div className="w-full flex flex-col gap-1">
                    <span htmlFor="height" className='flex justify-between'>
                        <label htmlFor="weight" className='text-md font-medium text-gray-700' >Weight</label>
                        <span className='text-gray-500'>{heightAndWeight.weight} kg</span>
                    </span>
                    <Slider max={200} value={heightAndWeight.weight} onChange={(e) => setEditProfileValues((prev) => ({...prev, heightAndWeight:{...prev.heightAndWeight, weight:e}}))}/>
                    {errors?.weight && <span className='text-red-400'>{errors?.weight}</span>}
                </div>
            </div>
            <div className="w-full flex flex-col gap-1">
                <SelectGroup name={'relationship_status'} label={'Relationship status'} valueArray={RELATIONSHIP_STATUS}/>
            </div>
            <div className="flex gap-2 flex-col">
                <div className=" flex flex-col gap-3">
                    <ControlledSelect 
                        label={'Country'} 
                        name={'country'} 
                        value={selectedLocations?.country} 
                        onChange={handleCountryChange} 
                    >
                        {
                            countries?.map((item, index) => (
                                <option key={index} value={item?.isoCode}>{item.name}</option>
                            ))
                        }

                    </ControlledSelect>
                </div>
                <div className=" flex flex-1 flex-col gap-3">
                    <ControlledSelect
                        label={'State'} 
                        name={'state'} 
                        value={selectedLocations?.state}
                        onChange={handleStateChange} 
                        disabled={addresses.states.length === 0 && !editProfileValues?.selectedLocations?.state}
                    >
                        {
                            addresses.states.map((item, index) => (
                                    <option key={index} value={item.isoCode}>{item.name}</option>
                            ))
                        }
                    </ControlledSelect>
                </div>
                <div className=" flex flex-1 flex-col gap-3">
                    <ControlledSelect
                        label={'City'} 
                        name={'city'} 
                        value={selectedLocations?.city}
                        onChange={handleCityChange} 
                        disabled={addresses.cities.length === 0 && !editProfileValues?.selectedLocations?.city}
                    >
                        {
                            addresses.cities.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                            ))
                        }
                    </ControlledSelect>
                </div>
                <div className=" flex flex-1 flex-col gap-3">
                    <SelectGroup label={'Marriage timeline'} name={'marriage_timeline'} valueArray={MARRIAGE_TIMELINE}/>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="tobe_handpicked" className='text-md font-medium text-gray-700'>Make my profile to be handpicked</label>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value={handpicked} className="sr-only peer" onChange={()=>setEditProfileValues((prev) => ({...prev, handpicked: !handpicked}))} checked={handpicked}/>
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-brandRed dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brandRed"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{handpicked ? 'Allowed' : 'Not allowed'}</span>
                </label>
            </div>
        </>
    )
};

export default PersonalSection;