<template>
<div>
  <Titlebar/>
  <transition name="fade">
    <router-view />
  </transition>
</div>
</template>

<script>
import Titlebar from './Titlebar'

export default {
  name: 'main-content',
  components: {
    Titlebar,
  }
}
</script>