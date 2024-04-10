import { Feather } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

import { CardHeader, CardTitle } from '@/components/Card'

export default function Stock() {
  const { id } = useLocalSearchParams()
  return (
    <View className="flex-1 bg-white p-8">
      <View className="mt-10">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" size={22} />
        </TouchableOpacity>
      </View>
      <CardHeader>
        <CardTitle>{id}</CardTitle>
      </CardHeader>
    </View>
  )
}
