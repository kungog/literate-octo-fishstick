import type { PageServerLoad } from './$types'

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
    ;[...Array(number)].map((_, i) => arrayWithNumbers.push(i + 1))
  }

  return shuffle(arrayWithNumbers)
}

export const load = (async () => {
  const cards = 16
  const amountOfCards = getAmountOfCards(cards)
  return { amountOfCards, amount: cards }
}) satisfies PageServerLoad
