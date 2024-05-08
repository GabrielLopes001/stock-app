import { Text, View } from 'react-native'

import { StockDTO } from '@/dtos/stockDTO'

type Props = {
  stock: StockDTO
}

export function StockCard({ stock }: Props) {
  return (
    <View key={stock.symbol} className="items-center mt-10  px-3">
      <Text className="text-white font-bold text-3xl tracking-tight">
        {stock.symbol}
      </Text>
      <Text className="text-gray-300 text-xl tracking-tight">
        {stock.longName}
      </Text>
      <Text className="text-base text-gray-400 tex-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        repellendus et reiciendis a aut, veniam aliquid architecto dolore quos
        minima laboriosam aspernatur necessitatibus cum consequatur non enim
        nulla quo unde.
      </Text>
    </View>
  )
}
