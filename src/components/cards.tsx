import { router } from 'expo-router'
import {
  FlatList,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import { StockDTO } from '@/services/dtos/stockDTO'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card'

export type Props = TouchableOpacityProps & {
  stock: StockDTO[]
}

export function Cards({ stock, ...rest }: Props) {
  function renderItem({ item }: { item: StockDTO }) {
    return (
      <TouchableOpacity
        onPress={() => router.navigate(`/stock/${item.name}`)}
        {...rest}
      >
        <Card>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>{item.stock}</CardDescription>
          </CardHeader>
          <CardFooter>
            <CardDescription>A partir de R${item.close}</CardDescription>
          </CardFooter>
        </Card>
      </TouchableOpacity>
    )
  }

  return (
    <View className="flex-1 w-full">
      <FlatList
        data={stock}
        keyExtractor={(item) => item.stock}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 12 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
