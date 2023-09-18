<script lang="ts">
  import Card from '$lib/components/Card.svelte'
  import type { PageData } from './$types'
  export let data: PageData

  $: firstGuess = [] as number[]
  $: secondGuess = [] as number[]
  $: matched = [] as number[]
  $: points = 0
  $: completed = false

  const noDuplication = [...new Set(data.amountOfCards)]

  const sortAndJoin = (array: number[]) => {
    return array.sort((a, b) => a - b).join('')
  }

  const resetGuesses = () => {
    firstGuess = []
    secondGuess = []
  }

  const handleClick = (index: number, card: number) => {
    if (firstGuess.length === 0) {
      return (firstGuess = [index, card])
    }

    if (secondGuess.length === 0) {
      secondGuess = [index, card]

      setTimeout(() => {
        if (firstGuess[1] === secondGuess[1]) {
          points += 1
          matched = [...matched, card].sort((a, b) => a - b)

          const isCompleted =
            sortAndJoin(matched) === sortAndJoin(noDuplication)

          if (isCompleted) {
            completed = true
          }

          return resetGuesses()
        }

        points -= 1
        resetGuesses()
      }, 2000)
    }
  }
</script>

<section>
  <div>
    <p>Points: {points}</p>
    {#if completed}
      <a href="/" data-sveltekit-reload>RESET</a>
    {/if}
  </div>

  {#if completed}
    <h1>Finish</h1>
  {/if}

  {#each data.amountOfCards as card, index}
    <Card
      number={card}
      handleClick={() => handleClick(index, card)}
      turnAround={firstGuess[0] === index ||
        secondGuess[0] === index ||
        matched.includes(card)}
      match={matched.includes(card)}
    />
  {/each}
</section>

<style lang="scss">
  section {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, minmax(50px, 100px));
    gap: 14px;
    grid-template-rows: repeat(4, minmax(100px, 150px));
    margin: auto;

    @media (max-width: 470px) {
      grid-template-columns: repeat(2, minmax(50px, 100px));
      grid-auto-rows: minmax(100px, 150px);
      grid-template-rows: initial;
    }
  }

  div {
    display: flex;
    position: absolute;
    top: 100%;
    gap: 24px;
  }

  h1 {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    font-size: 80px;
  }

  p,
  a {
    margin: 0;
    font-size: 14px;
    padding: 10px 0;
    font-weight: 700;
  }
</style>
