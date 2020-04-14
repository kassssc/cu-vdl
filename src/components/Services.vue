<template>
  <div class="mb-5">
    <h2 class="mb-3 pb-1 border-bottom-pink">
      {{ $t(`services.title`)}}
    </h2>
    <div v-for="i in [0,1,2,3,4]" :key="i" class="border-bottom-light mb-4">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <h3 class="m-none font-weight-bold">
          {{ (i + 1) + '. ' + $t(`services.list[${i}]`) }}
        </h3>
        <a :href="'/downloads/' + downloads[i]" download target="_blank"
           class="btn btn-grey mr-1" >
          <i class="fas fa-cloud-download-alt mr-1 mt-1"></i>
          {{ $t(`services.download`) }}
        </a>
      </div>
      <img :src="servicesImg[i]"
           class="ml-3 img unselectable">
    </div>
    <h3 class="mb-5 mt-1 font-weight-bold">
      {{ '6. ' + $t(`services.list[5]`) }}
    </h3>
  </div>
</template>

<style lang="scss" scoped>
.img {
  min-width: 500px;
  max-width: 700px;
  height: auto;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'services',
  computed: {
    ...mapGetters([
      'downloads',
      'servicesImg'
    ])
  },
  data: () => {
    return {
      text: ['งานโลหิตวิทยา', 'งานแบคทีเรีย', 'งานไวรัสวิทยา', 'งานซีรั่มวิทยา', 'งานอนูชีววิทยา']
    }
  },
}
</script>