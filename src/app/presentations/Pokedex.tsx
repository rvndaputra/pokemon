'use client'
import { Button, Grid, GridItem } from '@chakra-ui/react'
import Pokemon from '../components/Pokemon'
import usePokeAPI from '../repository/pokeapi/use-pokeapi'
import { Fragment, useState } from 'react'
import { PokeAPIRoot, Result } from '../model/pokeapi'

type Props = {}

const Pokedex = (props: Props) => {
  const [pagination, setPagination] = useState({ limit: 20, offset: 0 })
  const { data, fetchNextPage } = usePokeAPI({
    variables: pagination,
  })

  const handleOnPagination = async () => {
    await setPagination((prev) => ({
      limit: prev.limit + 20,
      offset: prev.offset + 20,
    }))

    fetchNextPage()
  }

  return (
    <div>
      <Grid templateColumns="repeat(2, 1fr)" gap={3} p={4}>
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((result: Result, idx: number) => (
              <GridItem key={`${idx}-${result.name}`}>
                <Pokemon id={idx + 1} pokemon={result} />
              </GridItem>
            ))}
          </Fragment>
        ))}
      </Grid>
      <Button onClick={handleOnPagination}>Load More</Button>
    </div>
  )
}

export default Pokedex
