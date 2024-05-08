import { HistoryDTO } from './historyDTO'

export type StockDTO = {
  stock: string
  longName: string
  symbol: string
  history: HistoryDTO[]
}
