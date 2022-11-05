import React, { useEffect, useState } from 'react'
import { getAxies, getETHPrice } from '../../utils/getData'
import Axies from '../axies/Axies'
import Controls from '../controls/Controls'
import { getTime } from '../../utils/time'
import Handler from '../pageHandler/Handler'
import { PuffLoading } from '../puff-loading/PuffLoading'
import { partsAtom, classesAtom } from '../../atoms/atoms'
import { useAtom } from 'jotai'


const HomeComp = () => {
    
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>()
  const [axieDetails, setAxieDetails] = useState<object>({})
  const [totalAxies, setTotalAxies] = useState<number>(0)
  const [ETHPrice, setETHPrice] = useState<number>(0)
  const [timeLeft, setTimeLeft] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [controller, setController] = useState<AbortController | null>()

 const [parts] = useAtom(partsAtom) 
 const [classes] = useAtom(classesAtom)

  const callData = async(from: number | 0, parts: string[] | null, classes: string[] | null)=>{

    if(controller){
      controller.abort()
    }

    const controller_ = new AbortController()
    
    setController(controller_)

    clearInterval(intervalId)
    setAxieDetails({})
    setIsLoading(true)

    const getETH = async()=>{
      const price = await getETHPrice()
      setETHPrice(price)
    }

    const getAxiesDetails = async()=>{
      const axie_ = await getAxies({ from, sort: "PriceAsc", parts, bodyShapes: null, classes, controller: controller_ })

      if(typeof axie_ == 'undefined' ){
        return
      }

      setIsLoading(false)
      const results_ = Object.values(axie_.results).filter((item: any)=>{
        return item.order.timeLeft != 0
      })
  
      const timeLeft_ = Object.values(results_).map((item: any)=>{
        return getTime(item.order.timeLeft)
      })
  
      setTotalAxies(axie_.total)
      setTimeLeft(timeLeft_)
      setAxieDetails(results_)
    }
    
    await getETH()
    await getAxiesDetails()

    const intID_ = setInterval(()=>{
      getETH()
      getAxiesDetails()
    }, 1000)

    setIntervalId(intID_)

  }

  useEffect(()=>{

    callData(0, parts, classes)

    console.log("called")

    return ()=> clearInterval(intervalId)
    
  }, [])

  const handleNext = ()=>{
    if(currentPage + 100 < totalAxies / 100){
      callData(currentPage + 100, null, null)
      setCurrentPage(prev => prev + 100)
    }
  }

  const handlePrev = ()=>{
    if(currentPage != 0){
      callData(currentPage - 100, null, null)
      setCurrentPage(prev => prev - 100)
    }
  }

  return (
    <>
      { isLoading ? (<PuffLoading/>) : ( <></> ) }
      <Axies axieDetails={axieDetails} timeLeft={timeLeft} ETHPrice={ETHPrice} />
      <Controls/>
      <Handler totalAxies={totalAxies} isLoading={isLoading} currentPage={currentPage} setCurrentPage={setCurrentPage} handlePrev={handlePrev} handleNext={handleNext} />
    </>
  )
}

export default HomeComp