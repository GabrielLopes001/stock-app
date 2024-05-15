import { router } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/Card'
import { StockDTO } from '@/dtos/stockDTO'

type CardListProps = {
  stock: StockDTO
}

export function CardList({ stock }: CardListProps) {
  return (
    <Card className=" bg-white">
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
}
