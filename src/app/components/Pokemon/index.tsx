import { POKEMON_TYPES_COLORS } from '@/app/constants'
import { PokeAPIRoot, Result } from '@/app/model/pokeapi'
import usePokeAPIDetail from '@/app/repository/pokeapi/use-pokeapi-detail'
import { Badge, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

type Props = {
  id: number
  pokemon: Result
}

const Pokemon = (props: Props) => {
  const { id, pokemon } = props
  const { data } = usePokeAPIDetail({ id })

  const type = data?.types[0].type.name?.toLowerCase() || ''

  return (
    <VStack
      shadow="base"
      bg={`${POKEMON_TYPES_COLORS[type]}.300`}
      color="white"
      p={8}
      rounded="lg"
    >
      <Image
        alt={pokemon.name}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        width={75}
        height={75}
      />
      <Text textTransform="capitalize">{pokemon.name}</Text>
      <HStack>
        {data?.types.map((type, idx) => {
          return <Badge key={idx}>{type.type.name}</Badge>
        })}
      </HStack>
    </VStack>
  )
}

export default Pokemon
