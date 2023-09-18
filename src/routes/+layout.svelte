<script lang="ts">
  import '../globals.css'
</script>

<main>
  <slot />
</main>

<style lang="scss">
  main {
    display: grid;
    align-items: center;
    height: 100vh;
  }
</style>
