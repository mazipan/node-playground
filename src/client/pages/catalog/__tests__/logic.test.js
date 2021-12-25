import { sumCartPriceAndQty, updateCart } from '../logic';

describe('sumCartPriceAndQty', () => {
  test.each([
    ['price 100, qty 1', [{ price: 100, qty: 1 }], { "price": 100, "qty": 1 }],
    ['price 100, qty 2', [{ price: 100, qty: 2 }], { "price": 200, "qty": 2 }],
    ['price 100, qty 2 + price 200, qty 3', [{ price: 100, qty: 2 }, { price: 200, qty: 3 }], { "price": 800, "qty": 5 }],
  ])('%s', (_, input, expected) => {
    expect(sumCartPriceAndQty(input)).toStrictEqual(expected);
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
