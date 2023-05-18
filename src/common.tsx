export const percentOptions = [
  { label: '10%', value: 10 },
  { label: '15%', value: 15 },
  { label: '20%', value: 20 },
  { label: '25%', value: 25 },
  { label: '30%', value: 30 },
]

export const downOptions = [
  { label: '0%', value: 0 },
  { label: '10%', value: 10 },
  { label: '15%', value: 15 },
  { label: '20%', value: 20 },
  { label: '25%', value: 25 },
  { label: '30%', value: 30 },
  { label: '40%', value: 40 },
]

export const carTypes = [{label: 'Used', value: 'Used'}, {label: 'New', value: 'New'}]
const usedInterests = [0.05, 0.06, 0.07]
const newInterests = [0.02, 0.03, 0.04]
export const carDetails: any = {
  Mini: {
    Used: { maintenance: 7000, insurance: 18000, price: 300000, interests: usedInterests },
    New: { maintenance: 7000, insurance: 18000, price: 400000, interests: newInterests }
  },
  Subcompact: {
    Used: { maintenance: 7000, insurance: 18000, price: 400000, interests: usedInterests },
    New: { maintenance: 7000, insurance: 18000, price: 600000, interests: newInterests }
  },
  Compact: {
    Used: { maintenance: 7000, insurance: 18000, price: 400000, interests: usedInterests },
    New: { maintenance: 7000, insurance: 18000, price: 600000, interests: newInterests }
  },
  'Mid-size car': {
    Used: { maintenance: 7000, insurance: 20000, price: 1100000, interests: usedInterests },
    New: { maintenance: 7000, insurance: 18000, price: 1500000, interests: newInterests }
  }
}

export const carModels = [
  {
    label: 'Mini',
    value: 'Mini',
  },
  {
    label: 'Subcompact',
    value: 'Subcompact',
  },
  {
    label: 'Compact',
    value: 'Compact'
  },
  {
    label: 'Mid-size car',
    value: 'Mid-size car'
  },
]
export const interests = {
  Used: 0.06,
  New: 0.02,
}

export const terms = [
  {label: '12', value: 12},
  {label: '24', value: 24},
  {label: '36', value: 36},
  {label: '48', value: 48},
  {label: '60', value: 60},
  {label: '72', value: 72},
]
