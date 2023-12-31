import React, { useCallback, useEffect, useContext, useState } from 'react'
import { casteData } from '../../../../apis/caste';
import { HOW_OFTEN_PRAY } from '../../../../shared/constants';
import { religionData } from '../../../../apis/religions';
import UserStore from '../../../../contexts/UserStore';
import SelectGroup from '../../Form/SelectGroup';
import ControlledSelect from '../../Form/ControlledSelect';

const ReligionAndFaith = () => {
    const { editProfileValues, setEditProfileValues, user } = useContext(UserStore);

    const [religionAndCastes, setReligionCastes] = useState({
        religions: [],
        castes: [],
    })

    const handleReligionChange = async (religionId) => {
        setEditProfileValues((prev) => ({...prev, religionAndCaste:{religion: religionId, caste: 'Select'}}));
        if(religionId !=='Select'){
            const data = await casteData(religionId);
            if(data){
                setReligionCastes((prev) => ({...prev, castes: [{name:'None', value:'none'},...data ?? []]}));
            }
        }
    };

    const handleCasteChange = (value) => {
        setEditProfileValues((prev) => ({...prev, religionAndCaste:{religion: prev.religionAndCaste.religion, castes: value}}));
    };

    const fetchReligions = useCallback( async () => {
        const data = await religionData();
        setReligionCastes(() => ({religions:[{name: 'Select', religionId: ''},...data ?? []]}));
        if(user?.personal?.religion_id?._id){
            handleReligionChange(user.personal.religion_id?._id);
            setEditProfileValues((prev)=> ({...prev, religionAndCaste:{religion: user?.personal?.religion_id?._id, castes: user?.personal?.caste_id}}))
        }
    },[]);

    useEffect(() => {
        fetchReligions();
    },[user]);


  return (
    <>
        <div className="w-full flex flex-col gap-2">
            <div className="w-full flex flex-col gap-1">
                <ControlledSelect
                    name={'religion'}
                    value={editProfileValues?.religionAndCaste?.religion}
                    onChange={handleReligionChange}
                    label={'Religion'}
                    disabled={user?.verification?.status === 'verified'}
                >
                        {
                            religionAndCastes?.religions?.map((ele, index) => (
                                <option key={index} value={ele?._id}>{ele?.name.split('-').join(' ')}</option>
                            ))
                        }
                </ControlledSelect>
            </div>
            
            <div className="w-full flex flex-col gap-1">
                <ControlledSelect
                    name={'caste'}
                    value={editProfileValues?.religionAndCaste?.castes}
                    label={'Caste'}
                    onChange={handleCasteChange}
                >
                        {
                            religionAndCastes?.castes?.map((ele, index) => (
                                <option key={index} value={ele?._id}>{ele?.name.split('-').join(' ')}</option>
                            ))
                        }
                </ControlledSelect>
            </div>
            <div className="w-full flex flex-col gap-1">
                <SelectGroup label={'How often do you pray'} name='how_often_pray' valueArray={HOW_OFTEN_PRAY}/>
            </div>
            
        </div>
        </>
  )
}

export default ReligionAndFaith