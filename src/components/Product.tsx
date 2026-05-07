'use client';

import { useState, useEffect, FormEvent, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { checkoutWithStripe } from '@/actions/checkout';
import './styles/Product.css';

interface ProductProps {
  /** Name of the product */
  name: string;
  /** Detailed description of the product */
  description: ReactNode;
  /** Price of the product in dollars */
  price: number;
  /** Array of image URLs for the product */
  images: string[];
  /** Available sizes — key is the size code (S/M/L), value is human-readable */
  sizes: Map<string, string>;
  /** Product slug used for stripe — e.g. 'god-is-love' */
  stripeId: string;
  /** Whether the product is currently sold out */
  isSoldOut: boolean;
}

export default function Product({
  name,
  description,
  price,
  images,
  sizes,
  isSoldOut,
  stripeId,
}: ProductProps) {
  const router = useRouter();

  const [size, setSize] = useState('');
  const [pickupOrShip, setPickupOrShip] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSuccess(params.get('success') === 'true');
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    setErrorMessage('');

    const { checkoutUrl, status } = await checkoutWithStripe(
      `${stripeId}-${size}`,
      pickupOrShip
    );
    if (status === 'out of stock') {
      setErrorMessage('Out of stock');
    } else if (status !== 'success' || !checkoutUrl) {
      setErrorMessage('Internal server error');
    } else {
      router.push(checkoutUrl);
    }
    setSubmitted(false);
  }

  if (success) {
    return (
      <div className="shop-success">
        <p className="eyebrow">Thank You</p>
        <h1 className="shop-success-title">Your order has been placed.</h1>
        <p className="shop-success-body">
          You&apos;ll receive a confirmation email shortly. Reach out to{' '}
          <Link href="mailto:shopspero@gmail.com" className="shop-link-inline">
            shopspero@gmail.com
          </Link>{' '}
          with any questions.
        </p>
        <Link href="/designs" className="cta-link">
          Back to the Collection
        </Link>
      </div>
    );
  }

  return (
    <article className="shop-product">
      <div className="shop-product-grid">
        {/* Gallery */}
        <div className="shop-gallery">
          <div className="shop-gallery-main">
            <Image
              src={images[activeImage]}
              alt={`${name} — image ${activeImage + 1}`}
              fill
              priority
              className="shop-gallery-main-image"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          {images.length > 1 && (
            <div className="shop-gallery-thumbs">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={`shop-gallery-thumb ${i === activeImage ? 'is-active' : ''}`}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="shop-detail">
          <p className="eyebrow">Spero Collection</p>
          <h1 className="shop-name">{name}</h1>
          <p className="shop-price">${price}</p>

          <div className="shop-divider" />

          <div className="shop-description">{description}</div>

          <form className="shop-form" onSubmit={handleSubmit}>
            <fieldset className="shop-field">
              <legend className="shop-field-label">Size</legend>
              <div className="shop-sizes">
                {Array.from(sizes).map(([key, value]) => (
                  <button
                    type="button"
                    key={key}
                    className={`shop-size-pill ${size === key ? 'is-active' : ''}`}
                    onClick={() => setSize(key)}
                    disabled={isSoldOut}
                    aria-pressed={size === key}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="shop-field">
              <legend className="shop-field-label">Delivery</legend>
              <div className="shop-delivery">
                <label className={`shop-delivery-option ${pickupOrShip === 'pickup' ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={pickupOrShip === 'pickup'}
                    onChange={() => setPickupOrShip('pickup')}
                  />
                  <span className="shop-delivery-title">Pickup on Sproul</span>
                  <span className="shop-delivery-meta">Free</span>
                </label>
                <label className={`shop-delivery-option ${pickupOrShip === 'ship' ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="ship"
                    checked={pickupOrShip === 'ship'}
                    onChange={() => setPickupOrShip('ship')}
                  />
                  <span className="shop-delivery-title">Ship to me</span>
                  <span className="shop-delivery-meta">+ $6</span>
                </label>
              </div>
            </fieldset>

            <button
              type="submit"
              className="shop-checkout-btn"
              disabled={isSoldOut || !size || !pickupOrShip || submitted}
            >
              {isSoldOut ? 'Sold Out' : submitted ? 'Loading…' : 'Checkout'}
            </button>

            {errorMessage && <p className="shop-error">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </article>
  );
}
