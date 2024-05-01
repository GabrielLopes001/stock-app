import { router } from 'expo-router'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/Card'
import { STOCKS } from '@/utils/stocks'

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center p-4 gap-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 6, paddingVertical: 40 }}
      >
        {STOCKS.length > 0 &&
          STOCKS.map((stock) => {
            return (
              <Card key={stock.stock} className=" bg-white">
                <CardHeader>
                  <CardTitle>{stock.name}</CardTitle>
                  <CardDescription>{stock.stock}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <TouchableOpacity
                    onPress={() => router.navigate(`/stock/${stock.stock}`)}
                  >
                    <Text className="text-black">Mais informações</Text>
                  </TouchableOpacity>
                </CardFooter>
              </Card>
            )
          })}
      </ScrollView>
    </View>
  )
}
