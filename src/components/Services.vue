<template>
  <div>
    <h2 class="mb-1 font-weight-bold">
      {{ $t(`services.title`)}}
    </h2>
    <div class="h-line mb-3"></div>
    <div v-for="i in [0,1,2,3,4]" :key="i">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <h3 class="m-none font-weight-bold">
          {{ (i + 1) + '. ' + $t(`services.list[${i}]`) }}
        </h3>
        <a :href="'/downloads/' + downloads[i]" download target="_blank"
           class="button mr-1 grey unselectable" >
          <i class="fas fa-cloud-download-alt mr-1 mt-1"></i>
          {{ $t(`services.download`) }}
        </a>
      </div>
      <img :src="require(`../assets/0${i+1}.png`)"
           class="ml-3 dummy-img unselectable">
      <div class="h-line grey my-4"></div>
    </div>
    <h3 class="mb-5 mt-1 font-weight-bold">
      {{ '6. ' + $t(`services.list[5]`) }}
    </h3>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'services',
  computed: {
    ...mapGetters([
      'lang',
      'downloads'
    ])
  },
  data: () => {
    return {
      text: ['งานโลหิตวิทยา', 'งานแบคทีเรีย', 'งานไวรัสวิทยา', 'งานซีรั่มวิทยา', 'งานอนูชีววิทยา']
    }
  },
}
</script>