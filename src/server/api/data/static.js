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

export const activePromo = [{
  name: 'Each sale of a MacBook Pro comes with a free Raspberry Pi B',
  label: 'Free Raspbery Pi B',
  sku: '43N23P',
  minQty: 1,
  rule: {
    type: 'free',
    product: 'additional',
    qty: 1,
    sku: '234234',
  },
}, {
  name: 'Buy 3 Google Homes for the price of 2',
  label: 'Buy 3 for price of 2',
  sku: '120P90',
  minQty: 3,
  rule: {
    type: 'free',
    product: 'existing',
    qty: 1,
    sku: '120P90',
  }
}, {
  name: 'Buying more than 3 Alexa Speakers will have a 10% discount on all Alexa speakers',
  label: 'Buy 3, discount 10%',
  sku: 'A304SD',
  minQty: 3,
  rule: {
    type: 'discount',
    product: 'existing',
    percent: 10,
    qty: 0,
    sku: 'A304SD',
  }
}];

export const catalogWithPromo = catalogData.map(product => {
  const foundPromo = activePromo.find(promo => promo.sku === product.sku);
  const havePromotion = Boolean(foundPromo)
  return {
    ...product,
    havePromotion: havePromotion,
    promo: havePromotion ? foundPromo : null,
  }
})