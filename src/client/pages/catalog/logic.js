export const calculatePriceWithPromo = (product) => {
  if (product.havePromotion) {
    // Eligible for promo when meet w "promo.minQty"
    // Attribute "qty" is ONLY exist from Cart object
    if (product.qty >= product.promo.minQty) {
      if (product.promo.rule.type === 'free' && product.promo.rule.product === 'existing') {
        return (product.price * product.qty) - (product.price * product.promo.rule.qty);
      } else if (product.promo.rule.type === 'discount' && product.promo.rule.product === 'existing') {
        return (product.price * product.qty) - ((product.price * product.qty) * product.promo.rule.percent / 100);
      }
    }
  }

  return (product.price * product.qty);
}

export const sumCartPriceAndQty = (cartProducts) => {
  return cartProducts.reduce(function (previousValue, product) {
    return {
      price: previousValue.price + (product.price * product.qty),
      afterPromo: previousValue.afterPromo + calculatePriceWithPromo(product),
      qty: previousValue.qty + product.qty
    }
  }, { price: 0, afterPromo: 0, qty: 0 })
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

      const { price: totalPrice, qty: totalQty, afterPromo } = sumCartPriceAndQty(newProducts);

      const result = {
        total: totalPrice,
        totalAfterPromo: afterPromo,
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

      const { price: totalPrice, qty: totalQty, afterPromo } = sumCartPriceAndQty(newProducts);

      const result = {
        total: totalPrice,
        totalAfterPromo: afterPromo,
        totalProduct: totalQty,
        promos: [],
        products: newProducts
      }

      return result;
    }
  }

  const { price: totalPrice, qty: totalQty, afterPromo } = sumCartPriceAndQty(withoutCurrentProduct);

  return {
    total: totalPrice,
    totalAfterPromo: afterPromo,
    totalProduct: totalQty,
    promos: [],
    products: withoutCurrentProduct
  }
}