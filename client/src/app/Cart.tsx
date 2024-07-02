'use client'
import React, { useRef, useState } from 'react'

const BikeStock: React.FC = () => {
  const cartRef = useRef<HTMLSpanElement>(null)
  const [cartShake, setCartShake] = useState(false)

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const item = e.currentTarget.closest('.item') as HTMLElement
    const img = item.querySelector('img') as HTMLImageElement

    if (img && cartRef.current) {
      const imgClone = img.cloneNode() as HTMLImageElement
      document.body.appendChild(imgClone)

      const imgRect = img.getBoundingClientRect()
      const cartRect = cartRef.current.getBoundingClientRect()

      imgClone.style.position = 'absolute'
      imgClone.style.top = `${imgRect.top}px`
      imgClone.style.left = `${imgRect.left}px`
      imgClone.style.width = `${imgRect.width}px`
      imgClone.style.height = `${imgRect.height}px`
      imgClone.style.opacity = '0.5'
      imgClone.style.zIndex = '100'

      const animation = imgClone.animate(
        [
          {
            top: `${imgRect.top}px`,
            left: `${imgRect.left}px`,
            width: `${imgRect.width}px`,
            height: `${imgRect.height}px`,
          },
          {
            top: `${cartRect.top + 10}px`,
            left: `${cartRect.left + 10}px`,
            width: '75px',
            height: '75px',
          },
        ],
        {
          duration: 1000,
          easing: 'ease-in-out',
        }
      )

      animation.onfinish = () => {
        imgClone.style.width = '0'
        imgClone.style.height = '0'
        imgClone.style.opacity = '0'
        setTimeout(() => {
          document.body.removeChild(imgClone)
          setCartShake(true)
          setTimeout(() => setCartShake(false), 200)
        }, 300)
      }
    }
  }

  return (
    <div className="wrapper">
      <h1>Bike Stock</h1>
      <span ref={cartRef}>
        <i className={`fas fa-shopping-cart  ${cartShake ? 'animate-shake' : ''}`}>a</i>
      </span>
      <div className="clear-both"></div>
      <div>
        {[
          'http://img.tjskl.org.cn/pic/z2577d9d-200x200-1/pinarello_lungavita_2010_single_speed_bike.jpg',
          'http://img.tjskl.org.cn/pic/z2577d9d-200x200-1/pinarello_lungavita_2010_single_speed_bike.jpg',
          'http://img1.exportersindia.com/product_images/bc-small/dir_55/1620613/cannondale-jekyll-1-2011-mountain-bike-309779.jpg',
        ].map((src, index) => (
          <div className="item " key={index}>
            <img src={src} alt="item" />
            <h2>Item {index + 1}</h2>
            <p>
              Price: <em>$449</em>
            </p>
            <button
              className="add-to-cart btn btn-info mt-2"
              type="button"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BikeStock
