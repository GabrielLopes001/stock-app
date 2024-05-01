import { router, useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

import { Button } from '@/components/Button'

export default function Stock() {
  const { id } = useLocalSearchParams()
  return (
    <View className="flex-1 p-8">
      <View className="items-center mt-10 bg-red-500 px-3">
        <Text className="text-white font-bold text-3xl tracking-tight">
          {id}
        </Text>
        <Text className="text-gray-300 text-xl tracking-tight">Petrobras</Text>
        <Text className="text-base text-gray-400 tex-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum accusamus
          odit, incidunt laudantium odio ex possimus cum inventore natus dolore
          cupiditate ut ullam quos quia ipsam nobis qui! Nihil, ea.
        </Text>
      </View>
      <View className="mb-6 mt-6 bg-blue-500">
        <Text className="text-white">Grafico</Text>
      </View>
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
