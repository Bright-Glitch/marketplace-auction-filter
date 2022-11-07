import axios from "axios";

export default function handler(req: any, res: any): Promise<void>{

  return axios.post('https://graphql-gateway.axieinfinity.com/graphql', {
    operationName: 'NewEthExchangeRate',
    query:`query NewEthExchangeRate {
      exchangeRate {
        eth {
          usd
          __typename
        }
        __typename
      }
    }`,
  })
  .then((data)=>{
    res.status(200).json(data.data)
  })

}

// export default function handler(req: any, res: any): Promise<void>{

//   return axios.get('https://api.coingecko.com/api/v3/coins/ethereum')
//   .then((data)=>{
//     res.status(200).json(data.data)
//   }).catch(e=>console.log(e))

// }