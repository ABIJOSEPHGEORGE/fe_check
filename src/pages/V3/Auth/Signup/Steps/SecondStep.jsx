import React, { useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { RELATIONSHIP_STATUS } from '../../../../../shared/constants';
import ProfilePicUpload from '../../../../../components/V3/Signup/ProfileImage';
import UserStore from '../../../../../contexts/UserStore';


const SecondStep = () => {
  const { setValue, getValues } = useFormContext();
  const { errors } = useContext(UserStore);
  const [status, setStatus] = useState('select');

  const handleRelationShipChange = (value) => {
      setStatus(value)
      setValue('relationship_status', value)
  }

  useEffect(()=>{
    setStatus(getValues('relationship_status'));
  },[status]);

  return (
    <div className="w-full h-full flex flex-col items-start gap-5 md:w-3/4 md:gap-3">
        <ProfilePicUpload/>
        <div className="w-full flex flex-col gap-3">
          <label htmlFor="relationship_status" className='text-lg font-medium'>Marital Status</label>
          <select  name='relationship_status' value={status} onChange={(e)=>handleRelationShipChange(e.target.value)} className='w-full capitalize px-6 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none'>
            {
              ['select',...RELATIONSHIP_STATUS].map((item, index) => (
                <option key={index} value={item} className='capitalize'>{item}</option>
              ))
            }
          </select>
          { status === 'married' && <span className="text-indigo-700 font-medium text-md">Married status? <br/> Welcome to exclusive Couple Squad events – where love takes center stage!</span>}
          {errors?.relationship_status && <span className='text-red-400'>{errors?.relationship_status}</span>}
        </div>
        
    </div>
  )
}

export default SecondStep