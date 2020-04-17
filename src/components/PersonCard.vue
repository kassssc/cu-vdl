<template>
<div class="person-card">
  <div class="portrait"
       :style="{'background-image': `url(${img})`}">
  </div>
  <h5 class="nowrap">
    {{ name }}
  </h5>
</div>
</template>

<style scoped lang="scss">
.person-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 125px;
  overflow: visible;
  margin-bottom: 0.5em;
}
.portrait {
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  width: 125px;
  height: 150px;
  margin: 0.75em 0;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'person-card',
  props: {
    name: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'lang'
    ])
  },
  data: () => {
    return {
    }
  },
}
</script>
