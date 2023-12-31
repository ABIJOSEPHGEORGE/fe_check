import React from 'react';

const DisplayItems = ({title, data}) => {
    if(data){
        return (
            <div className="flex flex-col gap-3">
                <h3 className='text-lg text-gray-700'>{title}</h3>
                <div className="w-full flex items-center justify-start gap-4 lg:gap-20 flex-wrap ">
                    {
                        data?.map((itm, inx) => (
                            <p key={inx} className='px-4 py-1 rounded-full border-2 border-brandRed'>{itm}</p>
                        ))
                    }
                </div>
            </div>
        )
    }
    
};

const SectionTwo = ({ user }) => {
    
    const lifestyle_choices = [user?.misc?.diet ?? '',user?.misc?.drinking ?? '',user?.misc?.workout ?? '',user?.misc?.smoking ?? ''];

    return (
        <div className="flex flex-col gap-4 px-4 mt-5">
            <DisplayItems title={`${user?.name} Interests`} data={user?.misc?.hobbies_and_interests}/>
            <DisplayItems title={`Personality Traits`} data={user?.misc?.personality_traits}/>
            <DisplayItems title={`Lifestyle choices`} data={lifestyle_choices}/>
        </div>
    )
};

export default SectionTwo;