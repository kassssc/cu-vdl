<template>
<div class="d-flex flex-column align-items-center full-width">
  <Titlebar/>
  <router-view />
  <FooterSection />
</div>
</template>

<script>
import Titlebar from '@/components/Titlebar.vue'
import FooterSection from '@/components/FooterSection.vue'

export default {
  name: 'main-content',
  components: {
    'Titlebar': Titlebar,
    'FooterSection': FooterSection
  }
}
</script>
