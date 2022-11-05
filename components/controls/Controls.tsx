import React, { useState } from 'react'
import s from './Controls.module.scss'
import arrow from '../../public/arrow.svg'
import Image from 'next/image'
import Classes from './classes/Classes'

type Props = {}

const Controls = (props: Props) => {

const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className={ open ? s.container : s.containerClosed} >
        <Classes/>
      </div>
      <div className={s.imgBox}>
        <span className={open ? s.imgC : s.imgCClosed} onClick={()=>setOpen(prev=> !prev)}>
          <Image src={arrow} width={45} height={45} alt="arrow" />
        </span>
      </div>
    </>
  )
}

export default Controls