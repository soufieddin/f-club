import React, {useState, useEffect} from 'react';

import { StyleSheet, StatusBar } from 'react-native';
import Screen from '../components/general/Screen';
import colors from '../config/colors'
import TopicCard from '../components/crypto/TopicCard'
import MidSection from '../components/crypto/MidSection'
import MainSection from '../components/crypto/MainSection'
import { getData } from '../hooks/useFetch';
export default function CryptoDetailScreen({ route }) {
  const crypto = route.params;
  const id = crypto.id
  const [days, setDays] = useState("1")
  const [label, setLabel] = useState("all")
  const cryptoUrl = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&developer_data=false`
  const historyUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
  const [result, setResult] = useState({});
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState("chart");
  const [isFetching, setIsFetching] = useState(false);

  let newsItems = [
    {
        "news_url": "https://www.coindesk.com/tech/2022/06/07/argo-blockchain-to-build-intel-based-bitcoin-mining-rigs-with-epic-blockchain/",
        "image_url": "https://crypto.snapi.dev/images/v1/f/j/urbtcifzabg5tlqofkwfdopdge-150286.jpg",
        "title": "Argo Blockchain to Build Intel-Based Bitcoin Mining Rigs With ePIC Blockchain",
        "text": "The partnership is an extension of a 2021 deal in which Argo agreed to buy $8 million worth of ePIC's miners.",
        "source_name": "Coindesk",
        "date": "Tue, 07 Jun 2022 10:13:29 -0400",
        "topics": [
            "mining"
        ],
        "sentiment": "Neutral",
        "type": "Article",
        "tickers": [
            "BTC"
        ]
    },
    {
        "news_url": "https://coingape.com/?p=114386",
        "image_url": "https://crypto.snapi.dev/images/v1/t/i/cryptocurrency-bitcoin-digital-tokens-e1633384435262-150275.webp",
        "title": "Why Crypto Bill Is A Boon For Bitcoin and Doom For Altcoins?",
        "text": "The bipartisan bill on crypto regulation released on Tuesday already raises many a doubt in investors' mind. At the centre of the bill's recommendations is the plan to regulate various cryptocurrencies in separate categories.",
        "source_name": "Coingape",
        "date": "Tue, 07 Jun 2022 09:49:09 -0400",
        "topics": [],
        "sentiment": "Neutral",
        "type": "Article",
        "tickers": [
            "BTC"
        ]
    },
    {
        "news_url": "https://www.coindesk.com/policy/2022/06/07/human-rights-leaders-urge-congress-to-take-open-minded-view-on-bitcoin/",
        "image_url": "https://crypto.snapi.dev/images/v1/v/e/ejazoa2mirgjtc6ajaopksgxj4-150276.jpg",
        "title": "Human Rights Leaders Urge Congress to Take 'Open-Minded' View on Bitcoin",
        "text": "Human rights activists have urged Congress to learn about bitcoin and its use in nations suffering conflict and hyperinflation.",
        "source_name": "Coindesk",
        "date": "Tue, 07 Jun 2022 09:44:05 -0400",
        "topics": [],
        "sentiment": "Neutral",
        "type": "Article",
        "tickers": [
            "BTC"
        ]
    },
    {
        "news_url": "https://cryptopotato.com/bitcoin-rollercoaster-continues-but-is-26k-retest-coming-btc-price-analysis/",
        "image_url": "https://crypto.snapi.dev/images/v1/4/h/202206072e9b7c3a07fd3c0de-150130-150265.jpg",
        "title": "Bitcoin Rollercoaster Continues But is $26K Retest Coming? (BTC Price Analysis)",
        "text": "In the big picture, Bitcoin has been forming an expanding wedge pattern – a common technical pattern in forex markets. The price has touched the upper trendline twice at the $65K and $69K levels.",
        "source_name": "CryptoPotato",
        "date": "Tue, 07 Jun 2022 09:33:46 -0400",
        "topics": [
            "tanalysis"
        ],
        "sentiment": "Negative",
        "type": "Article",
        "tickers": [
            "BTC"
        ]
    },
    {
        "news_url": "https://cryptoslate.com/investors-flock-bitcoin-as-ethereum-records-ninth-week-of-outflow/",
        "image_url": "https://crypto.snapi.dev/images/v1/n/e/image-2022-06-07-175138516-150261.png",
        "title": "Investors flock to Bitcoin as Ethereum records 9 consecutive weeks of outflow",
        "text": "Digital assets investment products saw $100 million in inflows during the week of May 30 as investors pumped money into Bitcoin, according to the latest CoinShares report. The post Investors flock to Bitcoin as Ethereum records 9 consecutive weeks of outflow appeared first on CryptoSlate.",
        "source_name": "CryptoSlate",
        "date": "Tue, 07 Jun 2022 09:31:17 -0400",
        "topics": [],
        "sentiment": "Negative",
        "type": "Article",
        "tickers": [
            "BTC",
            "ETH"
        ]
    },
    {
        "news_url": "https://coinpedia.org/bitcoin/bitcoin-btc-primed-for-a-50-drop-soon-whats-awaited-in-the-crypto-space-ahead/",
        "image_url": "https://crypto.snapi.dev/images/v1/x/g/kanchanara-5ixvd22x22o-unsplas-149582-149763-150259.jpg",
        "title": "Huge Bearish Signal Flashed Out For Bitcoin, The Red Gaussian Channel Could Drag the BTC Price Lower by 50% Soon!",
        "text": "Bitcoin price had registered 9 bearish candles in a row, for the first time in its history. The surge that recently elevated the BTC price above $32,200 had raised some hopes of accumulating a couple of bullish candles. However, the fresh drop that dragged the asset back around $29,500 is not only confirming yet another …",
        "source_name": "CoinPedia",
        "date": "Tue, 07 Jun 2022 09:28:54 -0400",
        "topics": [],
        "sentiment": "Negative",
        "type": "Article",
        "tickers": [
            "BTC"
        ]
    },
    {
        "news_url": "https://bitcoinmagazine.com/culture/bitcoin-and-martin-luther-king-jr",
        "image_url": "https://crypto.snapi.dev/images/v1/m/x/bitcoin-renaissance-art-painting-150258.png",
        "title": "Bitcoin Is Venice: A King Among Us",
        "text": "Like Bitcoin, the work of Dr. Martin Luther King Jr. offers an example of how to foster social networks, rather depend upon centralized powers.",
        "source_name": "Bitcoin Magazine",
        "date": "Tue, 07 Jun 2022 09:25:40 -0400",
        "topics": [],
        "sentiment": "Positive",
        "type": "Article",
        "tickers": [
            "BTC"
        ]
    },
    {
        "news_url": "https://www.coinspeaker.com/bitcoin-btc-tanks-under-30000/",
        "image_url": "https://crypto.snapi.dev/images/v1/v/s/crypto19-150272.jpg",
        "title": "Bitcoin (BTC) Tanks 7% Under $30,000, Risks of Further Correction Still Alive",
        "text": "Coinspeaker Bitcoin (BTC) Tanks 7% Under $30,000, Risks of Further Correction Still Alive",
        "source_name": "Coinspeaker",
        "date": "Tue, 07 Jun 2022 09:25:21 -0400",
        "topics": [],
        "sentiment": "Negative",
        "type": "Article",
        "tickers": [
            "BTC"
        ]
    },
    {
        "news_url": "https://news.bitcoin.com/bitcoin-ethereum-technical-analysis-eth-plunges-below-1800-as-red-wave-intensifies/",
        "image_url": "https://crypto.snapi.dev/images/v1/6/x/shutterstock-2143123957-150256.jpg",
        "title": "Bitcoin, Ethereum Technical Analysis: ETH Plunges Below $1,800 as Red Wave Intensifies",
        "text": "Following a move towards $32,000 to start the week, BTC was fighting to stay above $29,000 during Tuesday's session. The red wave which captured bitcoin bulls, also overcame ETH, pushing prices nearly 8% lower, as of writing. Bitcoin Following a strong start to the week, bitcoin was once again trading lower, as prices dropped below […]",
        "source_name": "Bitcoin",
        "date": "Tue, 07 Jun 2022 09:17:37 -0400",
        "topics": [
            "tanalysis"
        ],
        "sentiment": "Negative",
        "type": "Article",
        "tickers": [
            "BTC",
            "ETH"
        ]
    },
    {
        "news_url": "https://insidebitcoins.com/news/bitcoin-price-prediction-for-today-june-7-btc-begins-fresh-decline-below-30000",
        "image_url": "https://crypto.snapi.dev/images/v1/8/k/should-i-buy-bitcoin-now-149766-150255.jpg",
        "title": "Bitcoin Price Prediction for Today, June 7: BTC Begins Fresh Decline Below $30,000",
        "text": "The Bitcoin price prediction reveals that BTC is showing signs of market correction as its price moves below $30,000. Bitcoin Prediction Statistics Data: Bitcoin price [.",
        "source_name": "Inside Bitcoins",
        "date": "Tue, 07 Jun 2022 09:16:40 -0400",
        "topics": [
            "tanalysis"
        ],
        "sentiment": "Negative",
        "type": "Article",
        "tickers": [
            "BTC"
        ]
    }
]

if(label==="+"){
  newsItems = newsItems.filter((item)=> item.sentiment === "Positive")
}else if(label==="-"){
  newsItems = newsItems.filter((item)=> item.sentiment === "Negative")
}else if(label==="="){
  newsItems = newsItems.filter((item)=> item.sentiment === "Neutral")
}else{
  newsItems = newsItems;
}
  const fetchCryptoData = async () => {
    if(isFetching){
      return;
    }
    setIsFetching(true)
    const detail = await getData(cryptoUrl);
    setResult(detail);
    setIsFetching(false);
  }

  useEffect(()=> {
    fetchCryptoData();
  }, [id])

  const fetchCryptoHistory = async () => {
    const historyData = await getData(historyUrl);
    setHistory(historyData.prices);
  }
  useEffect(()=> {
    fetchCryptoHistory();
  }, [days, id])
  return (
    <Screen style={styles.container}>
      <TopicCard 
        name={crypto.name || result?.name}
        price={crypto.current_price || result?.market_data?.current_price?.usd}
        percent={ crypto.price_change_percentage_24h || result.market_data?.price_change_percentage_24h }
        image={crypto.image || result?.image?.large}
        id={crypto.id}
      />
      <MidSection setSelected={setSelected} selected={selected} />
      <MainSection days={days} setDays={setDays} selected={selected} label={label} setLabel={setLabel} history={history} price={result ? result.market_data?.current_price?.usd : crypto.current_price} lastUpdate={result?.market_data?.last_updated} result={result} newsItems={newsItems}/>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  }
})
