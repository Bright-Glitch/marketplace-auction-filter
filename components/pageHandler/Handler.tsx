import Image from 'next/image'
import React from 'react'
import s from './Handler.module.scss'
import leftArrow from '../../public/left-arrow.svg'
import rightArrow from '../../public/right-arrow.svg'

type Props = {
    totalAxies: number,
    isLoading: boolean,
    handleNext: ()=> void,
    handlePrev: ()=> void,
    currentPage: number,
    setCurrentPage: (CurrentPage: number)=> void,
}

const Handler = ({ totalAxies, currentPage, handlePrev, handleNext, isLoading }: Props) => {
  return (
    <div className={s.container} style={ isLoading ? { display:'none' } : {  } } >

        <div onClick={handlePrev} className={ currentPage == 0 ? s.arrowNone : s.arrow }>
            <Image src={leftArrow} width={24} height={24} alt='left arrow'/>
        </div>

        <span>
            { currentPage / 100 + " / " + Math.ceil(totalAxies / 100) }
        </span>

        <div onClick={handleNext} className={ currentPage + 100 < totalAxies / 100 ? s.arrow : s.arrowNone }>
            <Image src={rightArrow} width={24} height={24} alt='right arrow'/>
        </div>

    </div>
  )
}

export default Handler