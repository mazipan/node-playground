import { sumCartPriceAndQty, updateCart, calculatePriceWithPromo } from '../logic';

describe('sumCartPriceAndQty', () => {
  test.each([
    ['price 100, qty 1', [{ price: 100, qty: 1 }], { "price": 100, "afterPromo": 100, "qty": 1 }],
    ['price 100, qty 2', [{ price: 100, qty: 2 }], { "price": 200, "afterPromo": 200, "qty": 2 }],
    ['price 100, qty 2 + price 200, qty 3', [{ price: 100, qty: 2 }, { price: 200, qty: 3 }], { "price": 800, "afterPromo": 800, "qty": 5 }],
  ])('%s', (_, input, expected) => {
    expect(sumCartPriceAndQty(input)).toStrictEqual(expected);
  });
});

describe('calculatePriceWithPromo -> free 1 product', () => {
  test.each([
    [1, 50],
    [2, 100],
    [3, 100],
    [4, 150],
    [5, 200],
  ])('Given %i qty should return %i', (input, expected) => {
    const dummyProduct = {
      sku: '123',
      price: 50,
      qty: input,
      havePromotion: true,
      promo: {
        minQty: 3,
        rule: {
          type: 'free',
          product: 'existing',
          qty: 1,
          sku: '123',
        }
      }
    };

    const res = calculatePriceWithPromo(dummyProduct);
    expect(res).toBe(expected);
  });
});

describe('calculatePriceWithPromo -> get discount', () => {
  test.each([
    [1, 50],
    [2, 100],
    [3, 135],
    [4, 180],
    [5, 225],
  ])('Given %i qty should return %i', (input, expected) => {
    const dummyProduct = {
      sku: '123',
      price: 50,
      qty: input,
      havePromotion: true,
      promo: {
        minQty: 3,
        rule: {
          type: 'discount',
          product: 'existing',
          percent: 10,
          qty: 0,
          sku: '123',
        }
      }
    };

    const res = calculatePriceWithPromo(dummyProduct);
    expect(res).toBe(expected);
  });
});

describe('updateCart', () => {
  test('Given 0 qty, should remove existing product', () => {
    const dummyCart = {
      total: 50,
      totalProduct: 1,
      promos: [],
      products: [{
        sku: '123',
        price: 50,
        qty: 1
      }]
    };

    const dummyProduct = {
      sku: '123',
      price: 50,
    }

    const res = updateCart({
      product: dummyProduct,
      qty: 0,
      cart: dummyCart,
    });

    expect(res.products).toHaveLength(0);
  });

  test('Given different qty, should update existing product', () => {
    const dummyCart = {
      total: 50,
      totalProduct: 1,
      promos: [],
      products: [{
        sku: '123',
        price: 50,
        qty: 1
      }]
    };

    const dummyProduct = {
      sku: '123',
      price: 50,
    }

    const res = updateCart({
      product: dummyProduct,
      qty: 5,
      cart: dummyCart,
    });

    expect(res.products).toHaveLength(1);
    expect(res.totalProduct).toBe(5);
    expect(res.total).toBe(250);
  });

  test('Given reduced qty, should update existing product', () => {
    const dummyCart = {
      total: 500,
      totalProduct: 10,
      promos: [],
      products: [{
        sku: '123',
        price: 50,
        qty: 10
      }]
    };

    const dummyProduct = {
      sku: '123',
      price: 50,
    }

    const res = updateCart({
      product: dummyProduct,
      qty: 3,
      cart: dummyCart,
    });

    expect(res.products).toHaveLength(1);
    expect(res.totalProduct).toBe(3);
    expect(res.total).toBe(150);
  });

  test('Given different sku, should add to existing cart', () => {
    const dummyCart = {
      total: 50,
      totalProduct: 1,
      promos: [],
      products: [{
        sku: '123',
        price: 50,
        qty: 1
      }]
    };

    const dummyProduct = {
      sku: '456',
      price: 100
    }

    const res = updateCart({
      product: dummyProduct,
      qty: 2,
      cart: dummyCart,
    });

    expect(res.products).toHaveLength(2);
    expect(res.totalProduct).toBe(3);
    expect(res.total).toBe(250);
  });
});
