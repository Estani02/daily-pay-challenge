import DATA from './data.json'
import { type Ballot } from './types'

const api = {
  ballot: {
    list: async (): Promise<Ballot[]> => DATA.items as Ballot[]
  }
}

export default api
