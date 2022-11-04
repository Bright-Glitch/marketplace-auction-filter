import axios from "axios";
import { send } from "process";

export default function handler(req: any, res: any): Promise<void> {

  return axios.post('https://graphql-gateway.axieinfinity.com/graphql', {
    operationName: 'GetAxieBriefList',
    variables:req.body,
    query:`query GetAxieBriefList(
      $auctionType: AuctionType
      $criteria: AxieSearchCriteria
      $from: Int
      $sort: SortBy
      $size: Int
      $owner: String
    ) {
      axies(
        auctionType: $auctionType
        criteria: $criteria
        from: $from
        sort: $sort
        size: $size
        owner: $owner
      ) {
        total
        results {
          ...AxieBrief
          __typename
        }
        __typename
      }
    }
    
    fragment AxieBrief on Axie {
      id
      class
      image
      order {
        id
        currentPrice
        currentPriceUsd
        basePrice
        endedPrice
        duration
        timeLeft
        __typename
      }
      __typename
    }`,
  })
  .then((data)=>{
    res.status(200).json(data.data.data.axies)
  }).catch(e=>{
    res.json(e);
    res.status(405).end();
  })

}