<template>
<div class="d-flex align-items-center h-40 mr-3">
  <router-link :to="nav[0].path"
               tag="a"
               class="btn btn-transparent mr-2"
               exact>
    {{ $t(`nav.${nav[0].name}`) }}
  </router-link>
  <router-link :to="nav[1].path"
               tag="a"
               class="btn btn-transparent mr-2">
    {{ $t(`nav.${nav[1].name}`) }}
  </router-link>
  <router-link :to="nav[2].path"
               tag="a"
               class="btn btn-transparent mr-2">
    {{ $t(`nav.${nav[2].name}`) }}
  </router-link>
</div>
</template>

<style scoped lang="scss">
a.router-link-active {
  color: $chula;
  background: $accent;
  cursor: default;
  &:hover {
    color: $chula;
  }
}
.h-40 { 
  height: 40px;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'nav-bar',
  computed: {
    ...mapGetters([
      'nav',
    ])
  }
}
</script>
