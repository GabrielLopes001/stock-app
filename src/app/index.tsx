import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { CardList } from '@/components/card-list'
import { StockDTO } from '@/dtos/stockDTO'
import { api } from '@/services/api'

export default function Home() {
  const [stock, setStock] = useState([] as StockDTO[])
  const [loading, setIsLoading] = useState(true)

  async function fetchStock(value: string) {
    if (value.length >= 3) {
      const response = await api.get(
        `/quote/list?limit=10&search=${value}&sortOrder=desc&type=stock`,
      )
      setIsLoading(true)
      const data = response.data.stocks
      setStock(data)
      setIsLoading(false)
    }
  }
  return (
    <View className="flex-1 mt-36 p-8">
      <View className="justify-between flex-row items-center border border-gray-500 py-1.5 px-4 rounded-lg">
        <TextInput
          className="h-14 text-gray-100"
          placeholder="Buscar"
          onChangeText={fetchStock}
        />
        <TouchableOpacity>
          <Feather name="search" size={28} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 6, paddingVertical: 40 }}
      >
        {loading ? (
          <Text className="text-gray-100 text-2xl text-center font-bold">
            Lista vazia
          </Text>
        ) : stock.length > 0 ? (
          stock.map((stock) => {
            return <CardList key={stock.stock} stock={stock} />
          })
        ) : (
          <Text className="text-gray-100 text-2xl text-center font-bold">
            Ação não encontrada
          </Text>
        )}
      </ScrollView>
    </View>
  )
}
