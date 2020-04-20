<template>
<div class="d-flex align-items-center mr-3">
  <router-link :to="nav[0].path"
               tag="a"
               class="btn btn-transparent mr-2"
               exact>
    <i class="fas fa-home btn-inner-icon"></i>
    {{ $t(`nav.${nav[0].name}`) }}
  </router-link> 
  <router-link :to="nav[1].path"
               tag="a"
               class="btn btn-transparent mr-2">
    <i class="fas fa-file-invoice btn-inner-icon"></i>
    {{ $t(`nav.${nav[1].name}`) }}
  </router-link>
  <router-link :to="nav[2].path"
               tag="a"
               class="btn btn-transparent mr-2">
    <!-- <i class="fas fa-paper-plane btn-inner-icon"></i> -->
    <!-- <i class="fas fa-flask btn-inner-icon"></i> -->
    <i class="fas fa-vial btn-inner-icon"></i>
    {{ $t(`nav.${nav[2].name}`) }}
  </router-link>
</div>
</template>

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
