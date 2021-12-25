export const sumCartPriceAndQty = (cartProducts) => {
  return cartProducts.reduce(function (previousValue, currentValue) {
    return {
      price: previousValue.price + (currentValue.price * currentValue.qty),
      qty: previousValue.qty + currentValue.qty
    }
  }, { price: 0, qty: 0 })
}

export const updateCart = ({ product, qty, cart }) => {
  const existingProducts = cart?.products || [];
  const withoutCurrentProduct = existingProducts.filter(p => p.sku !== product.sku);
  const findProduct = existingProducts.find(p => p.sku === product.sku);

  const intQty = parseInt(qty, 10)

  if (qty && !isNaN(intQty) && intQty > 0) {
    if (findProduct) {
      const newProducts = withoutCurrentProduct.concat({
        ...product,
        qty: intQty
      });

      const { price: totalPrice, qty: totalQty } = sumCartPriceAndQty(newProducts);

      const result = {
        total: totalPrice,
        totalProduct: totalQty,
        promos: [],
        products: newProducts
      }

      return result;
    } else {
      const newProducts = existingProducts.concat({
        ...product,
        qty: intQty
      });

      const { price: totalPrice, qty: totalQty } = sumCartPriceAndQty(newProducts);

      const result = {
        total: totalPrice,
        totalProduct: totalQty,
        promos: [],
        products: newProducts
      }

      return result;
    }
  }

  const { price: totalPrice, qty: totalQty } = sumCartPriceAndQty(withoutCurrentProduct);

  return {
    total: totalPrice,
    totalProduct: totalQty,
    promos: [],
    products: withoutCurrentProduct
  }
}