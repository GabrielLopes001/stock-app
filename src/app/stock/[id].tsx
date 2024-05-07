import { matchFont } from '@shopify/react-native-skia'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Platform, Text, View } from 'react-native'
import { CartesianChart, Line } from 'victory-native'

import { Button } from '@/components/Button'
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
  const [stock, setStock] = useState([])
  const [history, setHistory] = useState([])
  const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' })
  const font = matchFont(fontFamily)
  const { id } = useLocalSearchParams()

  async function fetchStockHistory() {
    try {
      const response = await api.get(
        `/quote/${id}?range=5d&interval=1d&fundamental=true&modules=summaryProfile`,
      )
      const data = response.data.results
      setStock(data)
      // console.log(stock[0].historicalDataPrice)
      setHistory(data[0].historicalDataPrice)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStockHistory()
  }, [])

  function formatDate(timestamp: number) {
    const date = new Date(timestamp * 1000)
    return `${date.getDate().toString()}/${date.getMonth() + 1}`
  }

  return (
    <View className="flex-1 p-8">
      {stock.length > 0 &&
        stock.map((stocks) => {
          return (
            <>
              <View key={stocks.symbol} className="items-center mt-10  px-3">
                <Text className="text-white font-bold text-3xl tracking-tight">
                  {stocks.symbol}
                </Text>
                <Text className="text-gray-300 text-xl tracking-tight">
                  {stocks.longName}
                </Text>
                <Text className="text-base text-gray-400 tex-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis repellendus et reiciendis a aut, veniam aliquid
                  architecto dolore quos minima laboriosam aspernatur
                  necessitatibus cum consequatur non enim nulla quo unde.
                </Text>
              </View>

              <View className="w-full h-48 mb-6 mt-6">
                <CartesianChart
                  data={history}
                  xKey="date"
                  yKeys={['adjustedClose']}
                  axisOptions={{
                    tickCount: 5,
                    font,
                    labelOffset: { x: 3, y: 2 },
                    labelPosition: 'outset',
                    formatYLabel: (value) =>
                      `${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
                    formatXLabel: (value) => formatDate(value),
                    labelColor: { x: 'white', y: 'white' },
                  }}
                >
                  {({ points }) => (
                    <Line
                      points={points.adjustedClose}
                      color="red"
                      strokeWidth={3}
                    />
                  )}
                </CartesianChart>
              </View>
            </>
          )
        })}

      <View className="bg-red-300 flex flex-row items-center justify-center rounded-md h-12 px-8">
        <Button
          label="Voltar"
          variant="secondary"
          onPress={() => router.back()}
        />
      </View>
    </View>
  )
}
