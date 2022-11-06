import React, { useEffect, useState } from 'react'
import s from './Controls.module.scss'
import arrow from '../../public/arrow.svg'
import Image from 'next/image'
import Classes from './classes/Classes'
import { classesAtom, partsAtom } from '../../atoms/atoms'
import { useAtom } from 'jotai'
import Dropdown from './dropdown/Dropdown'

type Props = {
  callData:(from: number | 0, parts: string[] | null, classes: string[] | null)=>void,
  setCurrentPage: (CurrentPage: number)=> void,
}

const Controls = ({ callData, setCurrentPage }: Props) => {

  const [isResize, setIsResize] = useState<boolean>()
  const [open, setOpen] = useState<boolean>(false)
  const [classes, setClasses] = useAtom(classesAtom)
  const [parts, setParts] = useAtom(partsAtom)

  useEffect(() => {

    let timer: NodeJS.Timeout;

    const handleTransition = ()=> {
      
      setIsResize(true)

      if(timer){
        clearTimeout(timer)
      }
      timer = setTimeout(()=>setIsResize(false),100);
    }

    window.addEventListener('resize', handleTransition)

    return ()=> window.removeEventListener('resize', handleTransition)

  }, [])

  const handleSearch = ()=>{
    callData(0, parts, classes)
    setCurrentPage(1)
    setOpen(prev=> !prev)
  }
  
  return (
    <>
      <div style={isResize ? {transition: 'none'} : {} } className={ open ? s.container : s.containerClosed} >
        <div className={s.controlsBox}>
        <Classes/>
        <Dropdown/>
        <button onClick={handleSearch} className={s.btn} >Search Axie \(^▿^)/</button>
        </div>
      </div>
        <span style={isResize ? {transition: 'none'} : {} } className={open ? s.imgC : s.imgCClosed} onClick={()=>setOpen(prev=> !prev)}>
          <Image src={arrow} width={45} height={45} alt="arrow" />
        </span>
    </>
  )
}

export default Controls