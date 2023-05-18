import React, { useState, useEffect, useContext } from 'react';
import { InputNumber, Select } from 'antd';
import Chart from './Chart'
import { AppContext } from '../contexts';
import { percentOptions } from '../common';

const Page1: React.FC = () => {
  const {factors, setFactors} = useContext(AppContext)
  return (
    <div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Monthly Income
          </label>
          <InputNumber
            className="block w-full bg-grey-lighter text-grey-darker border border-red rounded px-3 mb-3"
            type="Number"
            value={factors.monthlyIncome}
            onChange={(v) => setFactors({...factors, monthlyIncome: v})}
          />
        </div>
        <div className="md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Monthly Expense
          </label>
          <Select
            labelInValue
            value={factors.monthlyExpense}
            style={{ width: '100%' }}
            onChange={(v) => setFactors({...factors, monthlyExpense: v.value})}
            options={percentOptions}
          />
        </div>
      </div>
    </div>
  )
}

export default Page1;

