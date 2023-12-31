import React from 'react'
import { HIGHEST_EDUCATION_QUALIFICATION, OCCUPATIONS } from '../../../../shared/constants';
import SelectGroup from '../../Form/SelectGroup';
import InputGroup from '../../Form/InputGroup';

const EducationAndProfession = () => {
  return (
    <>
    <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col gap-1">
            <SelectGroup label={'Highest Qualification'} name={'highest_qualification'} valueArray={HIGHEST_EDUCATION_QUALIFICATION}/>
        </div>
        <div className="w-full flex flex-col gap-1">
            <InputGroup type={'text'} name='university_or_institute' label={'University/Institute'} />
        </div>
    </div>
    <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col gap-1">
            <SelectGroup label="Occupation" name='occupation' valueArray={OCCUPATIONS} />
        </div>
        <div className="w-full flex flex-col gap-1">
            <InputGroup type={'text'}  name='company_name' label={'Company name'}/>
        </div>
    </div>
    </>
  )
}

export default EducationAndProfession