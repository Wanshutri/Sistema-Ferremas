import React from 'react'
import { BiNotification, BiSearch } from 'react-icons/bi'
import s from './Content.module.css'

const ContentHeader = () => {
  return (
    <div className={s.contentHeader}>
        <h1 className={s.headerTitle}>Dashboard</h1>
        <div className={s.headerActividad}>
            <div className={s.searchBox}>
                <input type="text" placeholder='Buscar algo...' />
                <BiSearch  className={s.icon}/>
            </div>
        </div>

        <div className={s.notificar}>
            <BiNotification className={s.icon}/>
        </div>

    </div>
  )
}

export default ContentHeader