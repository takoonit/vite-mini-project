import React, { useContext } from 'react';
import Chart from './Chart'
import { AppContext } from '../contexts';
import {carDetails} from '../common';

const calculateFactors = (factors: any) => {
  const recomendedExpense = factors.monthlyIncome * (factors.monthlyExpense / 100)
  const ttf = Number((((factors.timeSpendUsingPublicTransport - factors.timeSpendUsingCar) / factors.timeSpendUsingPublicTransport)).toFixed(2))
  return {
    ttf: ttf,
    cf: Number((((factors.convenienceOfLoanignCar - factors.convenienceOfPublicTransport) / 10)).toFixed(2)),
    if: Number((((factors.monthlyIncome - recomendedExpense) / factors.monthlyIncome)).toFixed(2)),
  }
}

const interests: any = {
  Used: 0.06,
  New: 0.02,
}

const Result: React.FC = () => {
  const factors = useContext(AppContext).factors
  const longTermCost = []
  const insuranceFactor = carDetails[factors.carModel][factors.carType].insurance;
  const priceFactor = carDetails[factors.carModel][factors.carType].price
  const downPayment = priceFactor * (factors.downPayment/100)
  const maintenanceFactor = carDetails[factors.carModel][factors.carType].maintenance;
  const resultFactors = calculateFactors(factors);
  for (let i = 0; i < 120; i++) {
    let down = 0;
    if (i < 12) {
      down = Math.round(downPayment / 12)
    }
    let installment = 0
    if (i < factors.loanTerm) {
      const loanTotal = priceFactor - downPayment
      installment = (loanTotal * interests[factors.carType] * (factors.loanTerm / 12) + loanTotal) / factors.loanTerm
    }
    const insurance = Math.round(insuranceFactor / 12)
    const distanceInKM = factors.carDistance
    const gas = (((distanceInKM / 10) * 33 * 2) * (factors.daysInOffice * 4)) + (((factors.distanceForLifeStyle / 10) * 33) * (factors.daysForLifeStyle * 4))
    const maintenance = Math.round(maintenanceFactor / 12)

    const publicTransport = factors.ticketCost + factors.extraTravelCost
    console.log('resultFactors', resultFactors)
    const totalCarCost = down + installment + insurance + gas + factors.parking + maintenance
    console.log(totalCarCost, resultFactors.cf, resultFactors.if, resultFactors.ttf)
    const weightedCar = Math.round(totalCarCost / (Number(resultFactors.cf) + Number(resultFactors.if) + Number(resultFactors.ttf)))
    console.log(weightedCar)
    const cost = {
      month: i + 1,
      year: Math.floor(i / 12) + 1,
      down,
      installment,
      insurance,
      gas,
      parking: factors.parking,
      maintenance,
      totalCarCost,
      car: weightedCar,
      publicTransport,
    }
    longTermCost.push(cost)
  }
  console.log('LongTermCost', longTermCost)
  const results: any = []
  for (let i = 0; i < longTermCost.length; i++) {
    const lastIndex = results.length - 1
    const last = results[lastIndex]
    const item = longTermCost[i]
    if (last && last.year === item.year) {
      last.car += item.car
      last.down += item.down
      last.installment += item.installment
      last.insurance += item.insurance
      last.gas += item.gas
      last.parking += item.parking
      last.maintenance += item.maintenance
      last.publicTransport += item.publicTransport
      last.totalCarCost += item.totalCarCost
    } else {
      results.push({ ...item })
    }
  }
  console.log('fac', factors)
  console.log('resi', results)
  return (
    <div>
      <Chart rawData={results} ttf={resultFactors.ttf} cf={resultFactors.cf} ifVal={resultFactors.if} />
    </div>
  )
}

export default Result;

