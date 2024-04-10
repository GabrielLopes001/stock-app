import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { Cards } from '@/components/cards'
import { Input } from '@/components/Input'
import { api } from '@/services/api'
import { StockDTO } from '@/services/dtos/stockDTO'
import { STOCKS } from '@/utils/STOCKS'

export default function Home() {
  const [stocks, setStocks] = useState<StockDTO[]>([] as StockDTO[])

  async function fetchStocks() {
    const response = await api.get('/quote/list?limit=10')
    const data = response.data.stocks
    setStocks(data)
    // console.log(data)
  }

  // useEffect(() => {
  //   fetchStocks()
  // }, [])

  return (
    <View className="flex-1 bg-white justify-center items-center p-8 gap-4">
      <StatusBar style="dark" />
      <Input
        className="w-full gap-4 mt-10"
        placeholder="Buscar ação"
        placeholderTextColor={'black'}
      />

      <Cards stock={STOCKS} />
    </View>
  )
}
