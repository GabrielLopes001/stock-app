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
        {stock.summaryProfile.longBusinessSummary.length > 242
          ? stock.summaryProfile.longBusinessSummary.slice(0, 242) + '...'
          : stock.summaryProfile.longBusinessSummary}
      </Text>
    </View>
  )
}
