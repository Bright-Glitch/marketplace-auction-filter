import React from 'react'
import s from './Classes.module.scss'
import { classList } from './classesList'
import Image from 'next/image'
import { classesAtom } from '../../../atoms/atoms'
import { useAtom } from 'jotai'

type Props = {}

const Classes = (props: Props) => {

  const [classes, setClasses] = useAtom(classesAtom)

  const handleChecked = (item: string , e: any)=>{

    if(e.target.checked){

      setClasses(prev=> {
        if(prev){
          return[ ...prev, item ]
        } else{
          return [item]
        }
      })

    } else {
      const classes_ = classes?.filter(value => value != item )
      if(classes_)
      setClasses(classes_)
    }
  }

  return (
    <div className={s.container} >
        <div className={s.classContainer} >
        {
            classList.map((item, i)=>(
              <>
                <input id={item[0].toString()} className={s.input} type='checkbox' onChange={(e)=> handleChecked(item[0].toString(), e)} />
                <label htmlFor={item[0].toString()} className={s.class} key={i}>
                    <Image src={item[1]} width={30} height={30} quality={100} alt={item[0].toString()} />
                    <span> { item[0].toString() } </span>
                </label>
              </>
            ))
        }
        </div>
    </div>
  )
}

export default Classes