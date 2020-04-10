<template>
<div class="d-flex flex-column align-items-center full-width">
  <titlebar />
  <router-view />
  <footer-section />
</div>
</template>

<script>
import Titlebar from '@/components/Titlebar.vue'
import FooterSection from '@/components/FooterSection.vue'

export default {
  name: 'main-content',
  components: {
    'titlebar': Titlebar,
    'footer-section': FooterSection
  }
}
</script>
