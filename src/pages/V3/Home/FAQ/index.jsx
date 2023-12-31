import React, { useState } from 'react'
import { FAQQuestion } from './FAQQuestion'

const FAQSection = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [openIndex, setOpenIndex] = useState(null);
    const toggleAccordion = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

  return (
    <>
    <div className="w-full h-fit lg:flex flex-col justify-center items-center gap-3 p-6 hidden">
        <h2 className='text-4xl font-bold '>Any other Questions?</h2>
        <div className="w-3/4 flex justify-center p-3">
            <div className="flex flex-1 flex-col gap-3 border-r-4 border-gray-300">
                {
                    FAQQuestion.map((item, index) => (   
                        <h3 key={index} className={`text-lg cursor-pointer ${activeQuestion === index ? 'font-semibold' : 'font-light'}`} onClick={()=>setActiveQuestion(index)}>{item.question}</h3>
                    ))
                }
            </div>
            <div className="flex flex-1 p-4 justify-center">
                {
                    <p className='text-lg leading-snug'>{FAQQuestion[activeQuestion].answer}</p>
                }
            </div>
        </div>
    </div>
    <div className="container mx-auto p-4 lg:hidden space-y-4">
        <h2 className='text-2xl font-semibold text-center'>Any other Questions?</h2>
      {FAQQuestion.map((item, index) => (
        <div key={index} className="mb-4">
          <div
            className="p-2 cursor-pointer focus:ring-0 focus:ring-tra"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">{item.question}</p>
              <svg
                className={`w-6 h-6 ${openIndex === index ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {openIndex === index && (
            <div className="bg-gray-100 p-4 rounded-b-2xl">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  )
}

export default FAQSection