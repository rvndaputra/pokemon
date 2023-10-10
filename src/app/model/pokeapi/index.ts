export interface PokeAPIRoot {
  count: number
  next: string
  previous: any
  results: Result[]
}

export interface Result {
  name: string
  url: string
}

export interface PokeAPIVariables {
  limit: number
  offset: number
}
