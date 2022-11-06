import React, { useEffect, useRef, useState } from 'react'
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
    //Prevent animation on elements sizes when resizing the window
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

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //Close menu when click outside the div
    function handleClickOutside(event: any) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);

    return () => {  document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
  //Hide sidebar when menu is open    
  document.body.style.position = open ? "fixed" : "static";
  document.body.style.overflowY = open ? "scroll" : "unset";
    
 }, [open]);


  const handleSearch = ()=>{
    callData(0, parts, classes)
    setCurrentPage(1)
    setOpen(prev=> !prev)
  }
  
  return (
    <>
      <div ref={menuRef} style={isResize ? {transition: 'none'} : {} } className={ open ? s.container : s.containerClosed} >
        <div className={s.controlsBox}>
        <Classes/>
        <Dropdown key='' />
        <button onClick={handleSearch} className={s.btn} >Search Axie \(^▿^)/</button>
        </div>
      </div>
      <div className={ open ? s.background : s.backgroundClosed}></div>
      <span style={isResize ? {transition: 'none'} : {} } className={open ? s.imgC : s.imgCClosed} onClick={()=>setOpen(prev=> !prev)}>
        <Image src={arrow} width={45} height={45} alt="arrow" />
      </span>
    </>
  )
}

export default Controls