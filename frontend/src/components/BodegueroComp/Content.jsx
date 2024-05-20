import React from 'react'
import ContentHeader from './ContentHeader'
import s from './Content.module.css'
import BodegueroCard from './BodegueroCard'
import ListaProductos from './ListaProductos'

const Content = () => {
  return (
    <div className={s.content1}>
        <ContentHeader />
        <BodegueroCard />
        <ListaProductos />
    </div>
  )
}

export default Content