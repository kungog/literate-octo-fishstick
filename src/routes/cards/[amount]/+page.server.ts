import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'

const shuffle = (array: number[]) => {
  let counter = array.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const index = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--

    // And swap the last element with it
    const temp = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
}

const getAmountOfCards = (cards: number) => {
  const number = cards / 2

  const arrayWithNumbers: number[] = []
  for (let x = 0; x <= 2; x += 2) {
    ;[...Array(Number(number))].map((_, i) => arrayWithNumbers.push(i + 1))
  }

  return shuffle(arrayWithNumbers)
}

export const load = (async ({ params }) => {
  const { amount } = params as { amount: string }

  console.log(isNaN(parseInt(amount)))

  if (isNaN(parseInt(amount))) {
    throw error(404, 'is not a number')
  }

  const amountOfCards = getAmountOfCards(Number(amount))

  return { amountOfCards, amount }
}) satisfies PageServerLoad
