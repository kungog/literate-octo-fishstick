<script lang="ts">
  export let turnAround = false
  export let match = false
  export let number: number
  export let handleClick: any
</script>

<button on:click={handleClick} disabled={match}>
  <div class={turnAround ? 'turnaround' : null}>
    {number}
  </div>
  <div class={turnAround ? 'turnaround' : null} />
</button>

<style lang="scss">
  button {
    background-color: transparent;
    border: 0;
    padding: 0;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  }

  %shared {
    top: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    color: var(--color-background);
    display: grid;
    align-items: center;
    justify-content: center;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
    transition: 0.25s all;
  }

  div:first-child {
    @extend %shared;
    background: #a6a377;
    transform: rotateY(185deg);
    font-size: 50px;

    &.turnaround {
      transform: rotateY(0deg);
    }
  }

  div:last-child {
    @extend %shared;
    background: #283540;
    transform: rotateY(0deg);

    &:hover {
      opacity: 0.7;
    }
    &:hover {
      opacity: 0.7;
    }

    &.turnaround {
      transform: rotateY(180deg);
    }
  }

  button[disabled] {
    > div:last-child:hover {
      opacity: 1;
    }
  }
</style>
