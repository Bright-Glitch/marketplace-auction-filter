import axios from "axios";

type getAxiesArgs = {
    from: number,
    sort: "PriceAsc" | "Latest",
    parts: string[] | null,
    bodyShapes: string[] | null,
    classes: string[] | null,
  }

export const getAxieData = async ({ from, sort, parts, bodyShapes, classes }: getAxiesArgs) =>{

    const data = await axios.post('https://graphql-gateway.axieinfinity.com/graphql',{
    query: `query GetAxieBriefList(
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
    variables: {
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
      }
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return data.data.data.axies
  }