<template>
<div class="page-container">
  <titlebar />
  <router-view />
</div>
</template>

<style scoped lang="scss">
.page-container {
  margin-top: 95px;
  padding: 0 30px;
  width: 100%;
  max-width: 2000px;
}
</style>

<script>
import { mapGetters } from 'vuex'

import Titlebar from '@/components/Titlebar.vue'

export default {
  name: 'home',
  components: {
    'titlebar': Titlebar,
  },
  computed: {
    ...mapGetters([
      'lang',
      'intro',
    ])
  },
}
</script>
