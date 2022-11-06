import React from 'react'
import s from './Dropdown.module.scss'

type Props = {
  key: string
}

const Dropdown = ({ key }: Props) => {
  return (
    <div className={s.container} >
      <div className={s.searchBarContainer} >
        <input type="search" placeholder={`Search for ${key}...`} />
        <div className={s.list} >List displayed</div>
      </div>
      <div className={s.selected}>
        Selected
      </div>
    </div>
  )
}

export default Dropdown