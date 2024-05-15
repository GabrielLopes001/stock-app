import { HistoryDTO } from './historyDTO'

export type StockDTO = {
  stock: string
  name: string
  longName: string
  symbol: string
  summaryProfile: {
    longBusinessSummary: string
  }
  history: HistoryDTO[]
}
