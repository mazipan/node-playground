export const catalogData = [{
  sku: '120P90',
  thumbnail: '/images/120P90.webp',
  name: 'Google Home',
  price: 49.99,
  stock: 10
},{
  sku: '43N23P',
  thumbnail: '/images/43N23P.webp',
  name: 'Macbook Pro',
  price: 5399.99,
  stock: 5
},{
  sku: 'A304SD',
  thumbnail: '/images/A304SD.webp',
  name: 'Alexa Speaker',
  price: 109.50,
  stock: 10
},{
  sku: '234234',
  thumbnail: '/images/234234.webp',
  name: 'Raspberry Pi B',
  price: 30.00,
  stock: 2
}];

export const promotionRules = [{
  name: 'Each sale of a MacBook Pro comes with a free Raspberry Pi B',
  sku: '43N23P',
  minQty: 1,
  promo: {
    name: 'free',
    rule: 'additional',
    qty: 1,
    sku: '234234',
  },
}, {
  name: 'Buy 3 Google Homes for the price of 2',
  sku: '120P90',
  minQty: 3,
  promo: {
    name: 'free',
    rule: 'existing',
    qty: 1,
    sku: '120P90',
  }
}, {
  name: 'Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers',
  sku: 'A304SD',
  minQty: 3,
  promo: {
    name: 'discount',
    rule: 'existing',
    percent: 10,
    qty: 0,
    sku: 'A304SD',
  }
}];
