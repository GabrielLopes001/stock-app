import { matchFont } from '@shopify/react-native-skia'
import { Platform, View } from 'react-native'
import { CartesianChart, Line } from 'victory-native'

import { HistoryDTO } from '@/dtos/historyDTO'

type Props = {
  historyStock: HistoryDTO[]
}

export function Chart({ historyStock }: Props) {
  const fontFamily = Platform.select({ ios: 'Helvetica', default: 'serif' })
  const font = matchFont(fontFamily)

  function formatDate(timestamp: number) {
    const date = new Date(timestamp * 1000)
    return `${date.getDate().toString()}/${date.getMonth() + 1}`
  }

  return (
    <View className="w-full h-48 mb-6 mt-6">
      <CartesianChart
        data={historyStock}
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
          <Line points={points.adjustedClose} color="gray" strokeWidth={3} />
        )}
      </CartesianChart>
    </View>
  )
}
