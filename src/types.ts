export interface Ballot {
  id: string
  items: Nominee[]
  title: string
}

export interface Nominee {
  title: string
  photoUrL: string
  id: string
}
