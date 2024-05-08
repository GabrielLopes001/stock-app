import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { Button } from '@/components/Button'
import { Chart } from '@/components/chart'
import { StockCard } from '@/components/stock'
import { StockDTO } from '@/dtos/stockDTO'
import { api } from '@/services/api'

// const historicalDataPrice = [
//   {
//     date: 1699621200, // Data em UNIX timestamp (epoch) -> new Date(date * 1000)
//     open: 34.66, // Preço de abertura
//     high: 35.06, // Preço máximo
//     low: 34.51, // Preço mínimo
//     close: 34.72, // Preço de fechamento
//     volume: 40004800, // Volume
//     adjustedClose: 34.72, // Preço de fechamento ajustado
//   },
//   {
//     date: 1699880400,
//     open: 34.68,
//     high: 35.75,
//     low: 34.67,
//     close: 35.69,
//     volume: 44120000,
//     adjustedClose: 35.69,
//   },
//   {
//     date: 1699966800,
//     open: 35.69,
//     high: 36.24,
//     low: 35.49,
//     close: 36.18,
//     volume: 50888600,
//     adjustedClose: 36.18,
//   },
//   {
//     date: 1700139600,
//     open: 35.98,
//     high: 36.49,
//     low: 35.5,
//     close: 35.55,
//     volume: 72361200,
//     adjustedClose: 35.55,
//   },
//   {
//     date: 1700226000,
//     open: 35.83,
//     high: 36.92,
//     low: 35.82,
//     close: 36.71,
//     volume: 87666300,
//     adjustedClose: 36.71,
//   },
// ]

export default function Stock() {
  const [stock, setStock] = useState<StockDTO[]>([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const { id } = useLocalSearchParams()

  async function fetchStockHistory() {
    try {
      const response = await api.get(
        `/quote/${id}?range=5d&interval=1d&fundamental=true&modules=summaryProfile`,
      )
      const data = response.data.results
      setLoading(true)
      setStock(data)
      setHistory(data[0].historicalDataPrice)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStockHistory()
  }, [])

  return (
    <View className="flex-1 p-8">
      {loading ? (
        <ActivityIndicator
          color="red"
          style={{ alignContent: 'center', justifyContent: 'center' }}
        />
      ) : (
        stock.map((stocks) => {
          return (
            <>
              <StockCard stock={stocks} />

              <Chart historyStock={history} />

              <View className="flex-row items-center justify-center rounded-md h-12 px-8 bg-gray-200">
                <Button
                  label="Voltar"
                  variant="secondary"
                  onPress={() => router.back()}
                />
              </View>
            </>
          )
        })
      )}
    </View>
  )
}
