<template>
<div  class="lds-ring"
      :class="[size, color]">
  <div></div><div></div><div></div><div></div>
</div>
</template>

<script>
export default {
  name: 'loading-animation',
  props: {
    size: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  }
}

</script>
<style lang="scss" scoped>
.lds-ring {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 1.2em;
  height: 1.2em;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 1.2em;
    height: 1.2em;
    border-width: .2em;
    border-style: solid;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: $light transparent transparent transparent;
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
  &.primary div {
    border-color: $primary transparent transparent;
  }
  &.lg {
    width: 3em;
    height: 3em;
    div {
      width: 3em;
      height: 3em;
      border-width: .5em;
    }
  }
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>