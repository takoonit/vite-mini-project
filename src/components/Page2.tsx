import React, { useState, useEffect, useContext } from 'react';
import { InputNumber, Select, Slider } from 'antd';
import { AppContext } from '../contexts';
import { carModels, carTypes, downOptions, terms } from '../common';

const Page2: React.FC = () => {
  const {factors, setFactors} = useContext(AppContext)
  console.log(factors)
  return (
    <div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Car Types
          </label>
          <Select
            labelInValue
            value={factors.carType}
            style={{ width: '100%' }}
            onChange={(v) => setFactors({...factors, carType: v.value})}
            options={carTypes}
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Car Model
          </label>
          <Select
            labelInValue
            value={factors.carModel}
            style={{ width: '100%' }}
            onChange={(v) => setFactors({...factors, carModel: v.value})}
            options={carModels}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            How would you rate your experience with driving car?
          </label>
          <Slider
            min={1}
            max={10}
            tooltip={{ open: true }}
            onChange={(v) => setFactors({...factors, convenienceOfLoanignCar: v})}
            value={factors.convenienceOfLoanignCar}
          />
          <p className="mt-2 opacity-50 contrast-more:opacity-100 text-slate-600 text-sm">
            On a scale of 1 to 10, with 1 being extremely inconvenient and 10 being extremely convenient
          </p>
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            How many days per week do you travel to office?
          </label>
          <InputNumber
            className="block w-full bg-grey-lighter text-grey-darker border border-red rounded mb-3"
            type="Number"
            value={factors.daysInOffice}
            onChange={(v) => setFactors({...factors, daysInOffice: v})}
            addonAfter={<span>days per week</span>}
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            How often do you go out for leisure a week?
          </label>
          <InputNumber
            className="block w-full bg-grey-lighter text-grey-darker border border-red rounded mb-3"
            type="Number"
            value={factors.daysForLifeStyle}
            onChange={(v) => setFactors({...factors, daysForLifeStyle: v})}
            addonAfter={<span>days per week</span>}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Typical Distance of your trip to work?
          </label>
          <InputNumber
            className="block w-full bg-grey-lighter text-grey-darker border border-red rounded mb-3"
            type="Number"
            value={factors.carDistance}
            onChange={(v) => setFactors({...factors, carDistance: v})}
            addonAfter={<span>km</span>}
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Typical Distance of your trip?
          </label>
          <InputNumber
            className="block w-full bg-grey-lighter text-grey-darker border border-red rounded mb-3"
            type="Number"
            value={factors.distanceForLifeStyle}
            onChange={(v) => setFactors({...factors, distanceForLifeStyle: v})}
            addonAfter={<span>km</span>}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Time Spend Using Car
          </label>
          <InputNumber
            className="block w-full bg-grey-lighter text-grey-darker border border-red rounded px-3 mb-3"
            type="Number"
            value={factors.timeSpendUsingCar}
            onChange={(v) => setFactors({...factors, timeSpendUsingCar: v})}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Down Payment
          </label>
          <Select
            labelInValue
            value={factors.downPayment}
            style={{ width: '100%' }}
            onChange={(v) => setFactors({...factors, downPayment: v.value})}
            options={downOptions}
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            How long are you planning to take the car loan for?
          </label>
          <Select
            labelInValue
            value={factors.loanTerm}
            style={{ width: '100%' }}
            onChange={(v) => setFactors({...factors, loanTerm: v.value})}
            options={terms}
          />
        </div>
      </div>
    </div>
  )
}

export default Page2;

