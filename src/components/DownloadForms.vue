<template>
  <div class="content left-margin">
    <h2 class="m-b-xs">
      {{lang === 0? 'Download Forms' : 'เดาว์นโหลดแบบฟอร์ม'}}
    </h2>
    <div class="h-line m-b-md"></div>
    <div v-for="(document, idx) in downloadables" :key="idx">
      <div class="download-item p-t-xs">
        <h4 class="m-sm">
          {{ document.title }}
        </h4>
        <div class="icon-container m-x-sm">
          <i class="fas fa-cloud-download-alt"></i>
        </div>
      </div>
      <div class="h-line-grey"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'download-forms',
  components: { },
  computed: {
    ...mapGetters([
      'lang',
      'downloadables',
    ])
  },
  data: () => {
    return {
    }
  },
}
</script>