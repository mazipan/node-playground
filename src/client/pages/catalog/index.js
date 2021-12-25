import React, { useState } from 'react';

import useCatalog from '../../fetcher/useCatalog';
import { updateCart } from './logic';

import './styles.css';

const initialCart = {
  total: 0,
  totalProduct: 0,
  promos: [],
  products: []
};

const Catalog = () => {
  const [cart, setCart] = useState(initialCart)
  const { data } = useCatalog()

  const handleChangeinput = (e, product) => {
    const val = e.target.value;

    const newCart = updateCart({ cart, qty: val, product });

    setCart(newCart);
  }

  return (
    <div className="Catalog">
      <div className="Catalog-header">
        <h2>Catalog</h2>
      </div>
      <div className="Catalog-content">
        <div className="Catalog-product-list">
          {data && data.catalog && data.catalog.map(product => (
            <div key={product.sku} className='Catalog-product-card'>
              <img
                className="Catalog-product-card-image"
                alt={product.name}
                src={product.thumbnail} />

              <div className="Catalog-product-card-info">
                <h3 className="Catalog-product-name">{product.name}</h3>
                <strong className="Catalog-product-price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</strong>
                <div className="Catalog-form-qty">
                  <label htmlFor={`qty-${product.sku}`}>Quantity:</label>
                  <input id={`qty-${product.sku}`} type="number" min="0" max={product.stock} onChange={(e) => {
                    handleChangeinput(e, product)
                  }} />
                </div>
                {product.havePromotion && (
                  <small className="Catalog-product-promo">{product.promo.label}</small>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="Catalog-summary">
          <b>Ringkasan Belanja</b>
          <section>
            <span>Total product</span>
            <b>{cart.totalProduct}</b>
          </section>
          <section>
            <span>Total</span>
            <b>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cart.total)}</b>
          </section>
          <button>Beli sekarang</button>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
