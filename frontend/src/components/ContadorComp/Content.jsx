import React from 'react'
import ContentHeader from './ContentHeader'
import s from './Content.module.css'
import ContadorCard from './ContadorCard'
import ListaPagos from './ListaPagos'

const Content = () => {
  return (
    <div className={s.content1}>
        <ContentHeader />
        <ContadorCard />
        <ListaPagos />
    </div>
  )
}

export default Content