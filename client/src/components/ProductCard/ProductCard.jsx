import React, { useEffect, useState } from 'react'
import styles from './ProductCard.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const ProductCard = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          'https://6bf6-2a00-cc47-232c-1101-00-11aa.ngrok-free.app/products'
        )
        res.data && setProducts(res.data.slice(0, 20))
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  const handleNavigate = (id) => {
    navigate(`/product/details/${id}`)
  }

  return (
    <div className={styles.container}>
      {products &&
        products.map((item) => (
          <div
            onClick={() => handleNavigate(item?.id)}
            className={styles.card}
            key={item.id}>
            <img src={item?.image} alt={item?.label} />
            <div className={styles.cardContent}>
              <p onClick={() => handleNavigate(item.id)}>{item?.label}</p>
              <p className={styles.price}>
                {item?.currency} {item?.price}
              </p>
              <p>{item?.description}</p>
            </div>

            <button>Details</button>
          </div>
        ))}
    </div>
  )
}

export default ProductCard
