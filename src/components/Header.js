import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Link to={"/products/new"}>New Product</Link>
    </div>
  )
}

export default Header