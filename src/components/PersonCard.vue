<template>
<div class="person-card">
  <div class="portrait"
       :style="{'background-image': gen_URL(img)}">
  </div>
  <h6 class="name mb-0 font-weight-bold">
    {{ name }}
  </h6>
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
