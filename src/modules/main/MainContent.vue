<template>
<div>
  <Titlebar/>
  <transition name="fade">
    <router-view />
  </transition>
  <FooterSection />
</div>
</template>

<script>
import Titlebar from './Titlebar'
import FooterSection from './FooterSection'

export default {
  name: 'main-content',
  components: {
    Titlebar,
    FooterSection
  }
}
</script>