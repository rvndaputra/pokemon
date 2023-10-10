import type { PokeDetailRoot } from '@/app/model/pokeapi/poke-detail'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

interface Dependencies {
  id: number
}
const usePokeAPIDetail = (deps: Dependencies) => {
  const { id } = deps

  const { data, error } = useQuery<PokeDetailRoot>({
    queryKey: [`poke-detail-${id}`],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)

      return res.json()
    },
  })

  return useMemo(() => {
    return {
      data,
      error,
    }
  }, [data, error])
}

export default usePokeAPIDetail
