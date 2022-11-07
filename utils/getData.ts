import axios from "axios"

type getAxiesArgs = {
  from: number,
  sort: "PriceAsc" | "Latest",
  parts: string[] | null,
  bodyShapes: string[] | null,
  classes: string[] | null,
  controller: any
}

export const getAxies = async ({ from, sort, parts, bodyShapes, classes, controller }: getAxiesArgs) =>{

  try{
    const data = await axios.post('/api/getAxies', {
      from,
      size: 100,
      sort,
      auctionType: "Sale",
      owner: null,
      criteria: {
      region: null,
      parts,
      bodyShapes,
      classes,
      stages: [4],
      numMystic: null,
      pureness: null,
      title: null,
      breedable: null,
      breedCount: null,
      hp: [],
      skill: [],
      speed: [],
      morale: [],
      purity: [],
      numJapan: null,
      numXmas: null,
      numShiny: null,
      numSummer: null,
      ppBeast: null,
      ppAquatic: null,
      ppPlant: null,
      ppBug: null,
      ppBird: null,
      ppReptile: null,
      ppMech: null,
      ppDawn: null,
      ppDusk: null
      }
    }, {
      signal: controller.signal
   })
    return data.data
  } catch {
    return
  }
        
}

export const getETHPrice = async () =>{
  const data = await axios.post('/api/getToken')
  return data.data.data.exchangeRate.eth.usd
  // const price = await axios.get('/api/getToken')
  // return price.data.market_data.current_price.usd
}