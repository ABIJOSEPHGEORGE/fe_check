import React from 'react'
import StepOneSvg from '../../../../assets/registerStep1.svg';
import StepTwoSvg from '../../../../assets/registerStep2.svg';
import StepThreeSvg from '../../../../assets/registerStep3.svg';

const registrationSteps = [
    {
        step:"Registration",
        subheading:"Sign Up and Share What Makes You, You",
        description: `Begin your journey to connection with a simple sign-up process. Share your passions, interests, and what you're seeking in a relationship. At CoupleSquad, we celebrate your individuality and help you find someone who truly gets you.`,
        svg: StepOneSvg,

    },
    {
        step:"Search",
        subheading:"Discover With Precision",
        description: `Navigate through an array of profiles with our intelligent search feature. Filter by interests, lifestyle, and values for a more focused approach to finding your match. At CoupleSquad, we believe in quality over quantity.`,
        svg: StepTwoSvg,
    },
    {
        step:"Matches",
        subheading:"Connect With Heart",
        description: `When two people click, it's magic. Our platform is all about those moments when you just know. Get to know your matches with in-depth profiles and start building a connection that could last a lifetime.`,
        svg: StepThreeSvg,
    }
]


const HowSection = () => {
  return (
    <div className='w-full h-fit flex flex-col items-end justify-center'>
                <div className='w-full lg:w-11/12 h-full flex flex-col justify-center gap-3 lg:gap-5 p-4 lg:p-12 bg-gray-100 lg:bg-transparent lg:bg-svg-background bg-contain lg:bg-cover bg-no-repeat bg-center'>
                    <h2 className='capitalize text-4xl leading-snug font-bold '>How couple squad works</h2>
                    <h4 className=' capitalize text-xl lg:text-2xl font-normal'>Making meaningfull matches at couple squad</h4>
                    <div className=' flex flex-col lg:flex-row items-center gap-8 pe-5'>
                        {
                            registrationSteps.map((step, index) => (
                                <div className='space-y-3' key={index}>
                                    <div className='flex items-center gap-2'>
                                        <img src={step.svg} alt={step.step} />
                                        <h6 className='font-semibold text-2xl'>{step.step}</h6>
                                    </div>
                                    <p className='font-semibold'>{step.subheading}</p>
                                    <p className='font-light text-md leading-relaxed text-justify'>
                                        {step.description}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
  )
}

export default HowSection