import React, { useState, useEffect, useContext } from 'react';
import { InputNumber, Slider } from 'antd';
import { AppContext } from '../contexts';
import { percentOptions } from '../common';

const Page3: React.FC = () => {
  const {factors, setFactors} = useContext(AppContext)
  return (
    <div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Tickets Cost
          </label>
          <InputNumber
            className="block w-full bg-grey-lighter text-grey-darker border border-red rounded px-3 mb-3"
            type="Number"
            value={factors.ticketCost}
            onChange={(v) => setFactors({...factors, ticketCost: v})}
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Extra Travel Cost
          </label>
          <InputNumber
            className="block w-full bg-grey-lighter text-grey-darker border border-red rounded px-3 mb-3"
            type="Number"
            value={factors.extraTravelCost}
            onChange={(v) => setFactors({...factors, extraTravelCost: v})}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Time Spend Using Public Transport
          </label>
          <InputNumber
            className="block w-full bg-grey-lighter text-grey-darker border border-red rounded px-3 mb-3"
            type="Number"
            value={factors.timeSpendUsingPublicTransport}
            onChange={(v) => setFactors({...factors, timeSpendUsingPublicTransport: v})}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-full px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            How would you rate your experience with public transportation?
          </label>
          <Slider
            min={1}
            max={10}
            tooltip={{ open: true }}
            onChange={(v) => setFactors({...factors, convenienceOfPublicTransport: v})}
            value={factors.convenienceOfPublicTransport}
          />
          <p className="mt-2 opacity-50 contrast-more:opacity-100 text-slate-600 text-sm">
            On a scale of 1 to 10, with 1 being extremely inconvenient and 10 being extremely convenient
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page3;

