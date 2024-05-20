import React from 'react'
import ContentHeader from './ContentHeader'
import s from './Content.module.css'
import AdminCard from './ContadorCard'
import ListaPagosCrud from './ListaPagosCrud'

const CrudC = () => {
  return (
    <div className={s.content1}>
      
        <ListaPagosCrud />
    </div>
  )
}

export default CrudC;