import React from 'react'
import ContentHeader from './ContentHeader'
import s from './Content.module.css'
import VendedorCard from './VendedorCard'
import ListaPedidos from './ListaPedidos'

const Content = () => {
  return (
    <div className={s.content1}>
        <ContentHeader />
        <VendedorCard />
        <ListaPedidos />
    </div>
  )
}

export default Content