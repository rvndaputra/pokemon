import type { PokeAPIRoot, PokeAPIVariables } from '@/app/model/pokeapi'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

interface Dependencies {
  variables: PokeAPIVariables
}

const usePokeAPI = (deps: Dependencies) => {
  const { variables } = deps

  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery({
  //   queryKey: ['pokeapi'],
  //   queryFn: fetchProjects,
  //   getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  // })

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [`poke-${variables.limit}`],
    queryFn: async ({ pageParam = 0 }) => {
      console.log('variables', variables)
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${variables.limit}&offset=${variables.offset}`
      )
      return res.json()
    },
    getNextPageParam: (lastPage, pages) => {
      return 40
    },
  })

  // const { isLoading, isError, data, error } = useQuery<PokeAPIRoot>({
  //   queryKey: ['todos'],
  //   queryFn: async () => {
  //     const res = await fetch(
  //       `https://pokeapi.co/api/v2/pokemon?limit=${variables.limit}&offset=0`
  //     )

  //     return res.json()
  //   },
  // })

  return useMemo(() => {
    return {
      data,
      error,
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
    }
  }, [data, error, fetchNextPage, hasNextPage, isFetchingNextPage])
}

export default usePokeAPI
