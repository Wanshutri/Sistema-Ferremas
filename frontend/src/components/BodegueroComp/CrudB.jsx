import React from 'react'
import ContentHeader from './ContentHeader'
import s from './Content.module.css'
import AdminCard from './BodegueroCard'
import ListaProductosCrud from './ListaProductosCrud'

const CrudB = () => {
  return (
    <div className={s.content1}>
      
        <ListaProductosCrud />
    </div>
  )
}

export default CrudB;