import React, { useContext, useEffect } from 'react';
import { InputNumber, Select, Slider } from 'antd';
import { AppContext } from '../contexts';
import { carModels, carTypes, downOptions, terms, getCarPrice } from '../common';

const Page2: React.FC = () => {
  const {factors, setFactors} = useContext(AppContext)
  useEffect(() => {
    setFactors((prevFactors: any) => ({...prevFactors, carPrice: getCarPrice({carModel: factors.carModel, carType: factors.carType}) }))
  }, [factors.carType, factors.carModel, setFactors])
  return (
    <div>
      <div className="-mx-3 md:flex mb-3">
        <div className="md:w-1/2 px-3 mb-6 md:mx-2 md:flex">
          <div className="md:w-1/2">
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
          <div className="md:w-1/2 md:mx-2">
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
        <div className="md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Car price
          </label>
          <InputNumber
            className="block w-full bg-grey-lighter text-grey-darker border border-red rounded mb-3"
            type="Number"
            value={factors.carPrice}
            onChange={(v) => setFactors({...factors, carPrice: v})}
            addonAfter={<span>baht</span>}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-3">
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

