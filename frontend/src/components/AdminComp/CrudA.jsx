import React from 'react'
import ContentHeader from './ContentHeader'
import s from './Content.module.css'
import AdminCard from './AdminCard'
import ListaEmpleadosCrud from './ListaEmpleadosCrud'

const CrudA = () => {
  return (
    <div className={s.content1}>
      
        <ListaEmpleadosCrud />
    </div>
  )
}

export default CrudA;