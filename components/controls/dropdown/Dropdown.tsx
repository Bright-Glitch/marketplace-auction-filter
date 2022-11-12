import Image from 'next/image'
import React, { ChangeEvent, use, useEffect, useRef, useState } from 'react'
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
const inputRef = useRef<HTMLInputElement>(null)

const [filterParts, setFilterParts] = useState<partKeys>()
const [selectedParts, setSelectedParts] = useState<partKeys>()
const [isFocused, setIsFocused] = useState<boolean>()

const [searchFilter, setSearchFilter] = useState<partKeys>()
const [inputValue, setInputValue] = useState<string>()

const [,setParts] = useAtom(partsAtom)

useEffect(() => {
  
  const filterParts_ = data.filter((item: objectParts)=> item.type == part && classList?.filter(value=> item?.sample.includes(value[0]?.toString().toLowerCase()))?.[0]?.[0])

  setFilterParts(filterParts_)
  setSearchFilter(filterParts_)

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

const handleSearch = (event: any)=>{

  setInputValue(event.target.value)

  if(event.target && event.target.value && filterParts){
    const searchFilter_ = Object.values(filterParts)?.filter(value =>{
      if(value.name.toLowerCase().includes(event.target.value.toLowerCase())){
        return value
      }
    })
    setSearchFilter(searchFilter_)
  }

}


const handleSelect = (selectedPart: objectParts)=>{

  if(searchFilter?.filter(value => value != selectedPart).length == 0){
    setIsFocused(false)
  } else {
    inputRef.current?.focus()
  }

  setFilterParts((prev)=>{
    return prev?.filter(value => value != selectedPart)
  })

  setSearchFilter((prev)=>{
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

  setSearchFilter((prev)=>{
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
        <input ref={inputRef} value={inputValue} type="search" placeholder={`Search for ${part}...`} onFocus={()=> setIsFocused(true)} onChange={(e)=>handleSearch(e)} />
        <span className={s.imgContainer} onClick={()=> setInputValue('')} >
        <Image src={`/part-icon-svg/0-${part}.svg`} width={20} height={20} alt={part} />
        </span>
      </div>

        <div className={isFocused ? s.filterContainer : s.unfocused } >
          { searchFilter &&
            Object.values(searchFilter)?.map((item, id)=>(
              <div key={id} className={s.filteredPart} onClick={()=>handleSelect(item)} >
              <Image src={`/part-icon-svg/${
                classList?.filter(value=> item?.sample.includes(value[0]?.toString().toLowerCase()))?.[0]?.[0].toString().toLowerCase()
              }-${part}.svg`} blurDataURL='blur' width={25} height={25} alt='' />
                { item?.key.replace('-','').replace(/\s/g, '').replace(part,'').replace('-',' ') }
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
                { item?.key.replace('-','').replace(/\s/g, '').replace(part,'').replace('-',' ') }
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