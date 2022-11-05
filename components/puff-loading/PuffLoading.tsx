import React from 'react'
import img from '../../public/puff-loading/puff-loading.png'
import s from './styles.module.scss'

interface PuffLoadingProps {
  size?: number
}

export const PuffLoading = (props: PuffLoadingProps) => {
  const { size } = props
  return (
    <div className={s.loadingWrapper}>
      <img
        src={img.src}
        style={{ width: 110 }}
        className={s.spin}
        alt="loading"
      />
    </div>
  )
}