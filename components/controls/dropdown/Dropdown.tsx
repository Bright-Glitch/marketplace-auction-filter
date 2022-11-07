import Image from 'next/image'
import React, { use, useEffect, useRef, useState } from 'react'
import s from './Dropdown.module.scss'
import { partsAtom } from '../../../atoms/atoms'
import { useAtom } from 'jotai'
import { classList } from '../classes/classesList'

type Props = {
  part: string,
  data: objectParts[]
}

type objectParts = {
  key:string,
  name:string,
  type:string,
  sample:string,
}

type partKeys = objectParts[]

const Dropdown = ({ part, data }: Props) => {

const selectRef = useRef<HTMLInputElement>(null)

const [filterParts, setFilterParts] = useState<partKeys>()
const [selectedParts, setSelectedParts] = useState<partKeys>()
const [isFocused, setIsFocused] = useState<boolean>()

const [,setParts] = useAtom(partsAtom)

useEffect(() => {
  
  const filterParts_ = data.filter((item: objectParts)=> item.type == part && classList?.filter(value=> item?.sample.includes(value[0]?.toString().toLowerCase()))?.[0]?.[0])

  setFilterParts(filterParts_)

}, [])

useEffect(() => {
  //Close menu when click outside the div
  function handleClickOutside(event: any) {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsFocused(false)
    }
  }
  
  document.addEventListener("mousedown", handleClickOutside);

  return () => {  document.removeEventListener("mousedown", handleClickOutside);
  };
}, [selectRef]);


const handleSelect = (selectedPart: objectParts)=>{

  setFilterParts((prev)=>{
    return prev?.filter(value => value != selectedPart)
  })

  setSelectedParts((prev)=>{
    if(prev){
      return [...prev, selectedPart]
    } else {
      return [ selectedPart]
    }
  })

  setParts((prev)=>{
    if(prev){
      return [...prev, selectedPart.key]
    }
    else{
      return [selectedPart.key]
    }
  })

}

const handleDelete = (deletedPart: objectParts)=>{

  setSelectedParts((prev)=>{
    return prev?.filter(value => value != deletedPart)
  })

  setFilterParts((prev)=>{
    if(prev){
      return [...prev, deletedPart]
    } else {
      return [deletedPart]
    }
  })

  setParts((prev)=>{
    if(prev){
      return prev?.filter(value => value != deletedPart.key)
    } else {
      return null
    }
  })

}

  return (
    <div ref={selectRef} className={s.container} >

      <div className={s.searchBarContainer}>
        <input type="search" placeholder={`Search for ${part}...`} onFocus={()=> setIsFocused(true)} />
        <span className={s.imgContainer}>
        <Image src={`/part-icon-svg/0-${part}.svg`} width={20} height={20} alt={part} />
        </span>
      </div>

        <div className={isFocused ? s.filterContainer : s.unfocused } >
          { filterParts &&
            Object.values(filterParts)?.map((item, id)=>(
              <div key={id} className={s.filteredPart} onClick={()=>handleSelect(item)} >
              <Image src={`/part-icon-svg/${
                classList?.filter(value=> item?.sample.includes(value[0]?.toString().toLowerCase()))?.[0]?.[0].toString().toLowerCase()
              }-${part}.svg`} blurDataURL='blur' width={25} height={25} alt='' />
                { item?.key.replace('-',' ').replace('-',' ') }
              </div>
            ))
          }
        </div>

      <div className={s.selectedContainer}>
        { selectedParts &&
          selectedParts?.map((item, id)=>(
            <div key={id} className={s.selectedPart} onClick={()=>handleDelete(item)} >
              <Image src={`/part-icon-svg/${
                classList?.filter(value=> item?.sample.includes(value[0]?.toString().toLowerCase()))?.[0]?.[0].toString().toLowerCase()
              }-${part}.svg`} blurDataURL='blur' width={25} height={25} alt='' />
                { item?.key.replace('-',' ').replace('-',' ') }
                <span className={s.delete} >
              <Image src='/delete.svg' width={15} height={15} alt='' />
                </span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Dropdown