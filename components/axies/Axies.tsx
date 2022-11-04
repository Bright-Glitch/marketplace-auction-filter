import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import s from './Axies.module.scss'
import eth from '../../public/eth.png'


type Props = {
  axieDetails: object,
  timeLeft: string[],
  ETHPrice: number
}



const Axies = ({ axieDetails, timeLeft, ETHPrice }: Props) => {



  return (
    <div className={s.container}>
      {
        Object.values(axieDetails).map((item, index)=>(
          <a href={`https://app.axieinfinity.com/marketplace/axies/${item.id}`} target="_blank" rel="noreferrer" key={index} className={s.axieContainer} >
            <div className={item.class.toLowerCase() + "ImgContainer " + s.imgContainer}>
              <div className={item.class.toLowerCase() + "AxieId " + s.axieId} >
                <Image src={`/classes/${item.class.toLowerCase()}.png`} width={20} height={20} alt='axie' />
                <span> 
                  #{ item.id } 
                </span>
              </div>
              <Image src={`https://axiecdn.axieinfinity.com/axies/${item.id}/axie/axie-full-transparent.png`} width={200} height={150} alt='axie' />
            </div>
            <div className={item.class.toLowerCase() + "DataContainer " + s.dataContainer}>

              <div className={s.info}>
                Current:

                <div className={s.ethPrice}>
                  <Image src={eth} width={25} height={25} alt='eth' />
                  <span>
                    { (Number(item.order.currentPrice) / 10e17).toFixed(8) }
                  </span>
                </div>

                <span className={s.usdPrice}>
                    ${ Number(item.order.currentPriceUsd).toFixed(2) }
                </span>

              </div>

              <div className={s.info}>
                Ends at: 

                <div className={s.ethPrice}>
                  <Image src={eth} width={25} height={25} alt='eth' />
                  <span>
                    { (Number(item.order.endedPrice) / 10e17).toFixed(5) }
                  </span>
                </div>

                <span className={s.usdPrice}>
                  ${ ((Number(item.order.endedPrice) / 10e17) * ETHPrice).toFixed(2) }
                </span>

              </div>

              <div className={s.info}>
                { timeLeft?.[index] }
              </div>
            </div>  
          </a>
        ))
      }
    </div>
  )
}

export default Axies