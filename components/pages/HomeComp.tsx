import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getAxies, getETHPrice } from '../../utils/getData'
import Axies from '../axies/Axies'
import Controls from '../controls/Controls'
import { getTime } from '../../utils/time'

const HomeComp = () => {
    
  const [intervalId, setintervalId] = useState<NodeJS.Timer>()
  const [axieDetails, setAxieDetails] = useState<object>({})
  const [ETHPrice, setETHPrice] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<string[]>([])

  const getAxiesCallback = useCallback(async()=>{
    const axie = await getAxies({ from: 0, sort: "PriceAsc", parts: null, bodyShapes: null, classes: null }).catch(r=>console.log(r))
    const results_ = Object.values(axie.results).filter((item: any)=>{
      return item.order.timeLeft != 0
    })

    const timeLeft_ = Object.values(results_).map((item: any)=>{
      return getTime(item.order.timeLeft)
    })
    setTimeLeft(timeLeft_)
    setAxieDetails(results_)
  },[])

  const getETHPriceCallback = useCallback(async()=>{
    const currentETH_ = await getETHPrice()
    setETHPrice(currentETH_)
  }, [])

  useEffect(()=>{

      getETHPriceCallback()
      getAxiesCallback()

      const intID = setInterval(()=>{
          getETHPriceCallback()
          getAxiesCallback()
      }, 1000)
      setintervalId(intID)

    return ()=> clearInterval(intID)
    
  }, [])

  return (
    <>
      <Axies axieDetails={axieDetails} timeLeft={timeLeft} ETHPrice={ETHPrice} />
      <Controls/>
    </>
  )
}

export default HomeComp