import React from 'react'
import s from './Classes.module.scss'
import { classList } from './classesList'
import Image from 'next/image'

type Props = {}

const Classes = (props: Props) => {



  return (
    <div className={s.container} >
        <div className={s.classContainer} >
        {
            classList.map((item, i)=>(
                <div className={s.class} key={i}>
                    <Image src={item[1]} width={30} height={30} quality={100} alt={item[0].toString()} />
                    <span> { item[0].toString() } </span>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default Classes