<template>
<div class="d-flex">
  <div class="d-flex align-items-center h-40 mr-3">
    <router-link v-for="(page, idx) in nav"
                 :key="idx"
                 :to="page.path"
                 class="button mr-2">
      {{ $t(`nav.${page.name}`) }}
    </router-link>
  </div>
  <div class="lang-selector d-flex align-items-center h-40 mr-3">
    <button v-for="lang in langs"
            :key="lang"
            class="custom lang text-uppercase"
            :class="{'selected': $i18n.locale === lang}"
            @click="$i18n.locale = lang">
      {{ lang }}
    </button>
  </div>
</div>
</template>

<style scoped lang="scss">
a.router-link-exact-active {
  color: $chula;
  background: $grey;
  cursor: default;
  &:hover {
    color: $chula;
  }
}
button.custom.lang {
  height: 40px;
  color: $chula;
  background: transparent;
  &:hover {
    color: $chula;
  }
  &.selected {
    color: $bg;
    background: $chula;
    cursor: default;
  }
}
.lang-selector {
  border-radius: 5px;
  border: 2px solid $chula;
}
.h-40 { 
  height: 40px;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'nav-bar',
  data() {
    return {
      langs: ['th', 'en'] 
    }
  },
  computed: {
    ...mapGetters([
      'nav',
    ])
  }
}
</script>
