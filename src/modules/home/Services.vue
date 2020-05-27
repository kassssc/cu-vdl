<template>
  <div id="services">
    <h1 class="mb-4 pb-2 text-primary border-b-gradient">
      <span class="text-primary">฿</span> รายการค่าบริการ
    </h1>
    <div v-for="i in [0,1,2,3,4]" :key="i" class="border-b mb-4 pb-3">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <h3 class="m-none font-weight-bold">
          {{ `${i+1}. ${text[i]}` }}
        </h3>
        <a :href="'/downloads/' + downloads[i]" download target="_blank"
           class="btn btn-secondary mr-1" >
          <i class="fas fa-cloud-download-alt btn-inner-icon"></i>
          ดาวน์โหลด
        </a>
      </div>
      <img :src="servicesImg[i]"
           class="ml-3 img">
    </div>
    <h3 class="mb-5 mt-1 font-weight-bold">
      {{ `6. ${text[5]}` }}
    </h3>
  </div>
</template>

<script>
export default {
  name: 'services',
  data () {
    return {
      text: ['งานโลหิตวิทยา', 'งานแบคทีเรีย', 'งานไวรัสวิทยา', 'งานซีรั่มวิทยา', 'งานอนูชีววิทยา', 'งานทดสอบประสิทธิภาพยาฆ่าเชื้อ - ประเมินราคาก่อนให้บริการ'],
      servicesImg: [
        'https://i.ibb.co/jh444d8/01.png',
        'https://i.ibb.co/pRsWJYs/02.png',
        'https://i.ibb.co/TkMRLzT/03.png',
        'https://i.ibb.co/55CTcdM/04.png',
        'https://i.ibb.co/Xtp2SC7/05.png'
      ],
      downloads: [
        'hermatology.pdf',
        'bacteriology.pdf',
        'virology.pdf',
        'serology.pdf',
        'molecular.pdf'
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.img {
  @include unselectable;
  min-width: 400px;
  max-width: 650px;
  height: auto;
}
</style>