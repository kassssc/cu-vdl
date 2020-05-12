<template>
<div class="preview-bg">
  <button class="back-to-form btn btn-lg back-btn btn-transparent"
          @click="$emit('back')">
    <i class="fas fa-chevron-left btn-inner-icon-lg text-left mr-0" />กลับไปแก้ไข
  </button>
  <button class="submit btn btn-lg btn-success"
          @click="$emit('submit')">
    <i class="fas fa-paper-plane btn-inner-icon-lg text-left mr-0" />
    ยืนยันและส่งตัวอย่าง
  </button>
  <div class="d-flex flex-column w-100 align-items-center pt-3 scroll-container">

    <div class="A4-page-wrapper">
      <div class="A4-page">
        <div class="page-header page-item">
          <div class="logo mr-3"></div>
          <div class="d-flex flex-column justify-content-between">
            <h2>{{ `ใบรับตัวอย่าง${submission.type === 1? 'งานตรวจทั่วไป' : 'ส่งตรวจน้ำยาฆ่าเชื้อ'}` }}</h2>
            <h5>หน่วยชันสูตรโรคสัตว์กลาง คณะสัตวแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</h5>
            <h6>ถนนอังรีดูนังต์ แขวงวังใหม่ เขตพญาไท กทม. 10330 โทร.02-218-9606-6 email: cuvdl.thailand@gmail.com</h6>
          </div>
        </div>
        <div class="page-item box row no-gutters">
          <div class="col-6 border-r">
            <div class="row no-gutters border-b">
              <h5 class="col-3">ชื่อผู้ส่ง</h5>
              <h5 class="col-9 ink">{{ `${user.title}${user.firstName} ${user.lastName}` }}</h5>
            </div>
            <div class="row no-gutters border-b">
              <h5 class="col-3">โทรศัพท์</h5>
              <h5 class="col-9 ink">{{ user.phone }}</h5>
            </div>
            <div class="row no-gutters">
              <h5 class="col-3">อีเมล</h5>
              <h5 class="col-9 ink">{{ user.email }}</h5>
            </div>
          </div>
          <div class="col-6">
            <div class="row no-gutters border-b">
              <h5 class="col-12 text-center">สำหรับเจ้าหน้าที่</h5>
            </div>
            <div class="row no-gutters border-b">
              <h5 class="col-6 border-r">เลขที่รับ</h5>
              <h5 class="col-6">วันที่รับ</h5>
            </div>
            <div class="row no-gutters">
              <h5 class="col-6 border-r">ผู้รับ</h5>
              <h5 class="col-6">เวลา</h5>
            </div>
          </div>
        </div>
        <div class="page-item box row no-gutters">
          <div class="col-6 border-r">
            <div class="row no-gutters border-b">
              <h5 class="col-3">องค์กรเจ้าของ</h5>
              <h5 class="col-9 ink">{{ org.name }}</h5>
            </div>
            <div class="row no-gutters no-border-b">
              <h5 class="col-3">ที่อยู่</h5>
              <h5 class="col-9 ink">{{ org.addr.line1 }}</h5>
            </div>
            <div class="row no-gutters no-border-b">
              <h5 class="col-3"></h5>
              <h5 class="col-9 ink">{{ org.addr.line2 }}</h5>
            </div>
            <div class="row no-gutters border-b">
              <h5 class="col-3"></h5>
              <h5 class="col-9 ink">{{ `${org.addr.city} ${org.addr.province} ${org.addr.zip}`}}</h5>
            </div>
            <div class="row no-gutters">
              
            </div>
          </div>
          <div v-if="submission.type === 1" class="col-6">
            <div class="row no-gutters border-b">
              <h5 class="col-6 border-r">
                วันที่เก็บตัวอย่าง
                <span class="ink ml-1">
                  {{ getDate(submission.sampleInfo.sampleTakenDate) }}
                </span>
              </h5>
              <h5 class="col-6">จำนวนตัวอย่าง</h5>
            </div>
            <div class="row no-gutters border-b">
              <h5 class="col-6 border-r">
                ชนิดตัวอย่าง
                <span class="ink ml-1">{{ submission.sampleInfo.sampleType }}</span>
              </h5>
              <h5 class="col-6">
                ชนิดสัตว์
                <span class="ink ml-1">{{ submission.sampleInfo.animalType }}</span>
              </h5>
            </div>
            <div class="row no-gutters border-b">
              <h5 class="col-6 border-r">
                พันธุ์
                <span class="ink ml-1">{{ submission.sampleInfo.animalSpecies }}</span>
              </h5>
              <h5 class="col-6">
                อายุ
                <span class="ink ml-1">{{ submission.sampleInfo.animalAge }}</span>
              </h5>
            </div>
            <div class="row no-gutters border-b">
              <h5 class="col-12">
                ประวัติการป่วย
                <span class="ink ml-1">{{ submission.sampleInfo.illness }}</span>
              </h5>
            </div>
            <div class="row no-gutters">
              <h5 class="col-12">
                ประวัติการทำวัคซีน
                <span class="ink ml-1">{{ submission.sampleInfo.vaccinations }}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.preview-bg {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  overflow: hidden;
  background: rgba($black, .55);
  backdrop-filter: blur(20px);
  z-index: 1000;
}
.back-to-form {
  position: fixed;
  left: 90px;
  top: 90px;
  color: $light;
  &:hover {
    color: $default;
  }
}
.submit {
  position: fixed;
  right: 90px;
  top: 90px;
}
$ink: #455280;
.ink {
  color: $ink;
}
.border-b {
  border-bottom: 1px solid $medium;
}
.border-r {
  border-right: 1px solid $medium;
}
.no-border-b {
  border-bottom: 1px solid transparent;
}
.review-label {
  color: $medium;
}
.info-row {
  padding: .5em 0;
  &:not(:last-child) {
    border-bottom: 1px solid $accent;
  }
}
.A4-page-wrapper {
  border: 1px solid $medium;
  margin-bottom: 1.5em;
}
.A4-page {
  // actual width/height of A4
  // width: 595px;
  // height: 842px;
  // scale by 1.5 for readability
  background: $white;
  font-size: 1rem;
  width: 893px;
  height: 1263px;
  padding: 2.5em;
  font-family: 'CS ChatThai';
}
.page-item {
  width: 100%;
  h1, h2, h3, h4, h5, h6 {
    padding: 2px 4px;
  }
  &:not(:last-child) {
    margin-bottom: 1.5em;
  }
  &.box {
    border: 2px solid $default;
  }
}
.page-header {
  display: flex;
  .logo {
    width: 100px;
    height: 97px;
    background-size: 100px 97px;
    @include logo;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment/src/moment'
//import jsPDF from 'jspdf'

export default {
  name: 'review-submission',
  props: ['submission'],
  computed: {
    ...mapGetters(['user', 'org'])
  },
  methods: {
    getDate(iso) {
      return moment(iso).format("DD/MM/YY")
    }
    /* createPDF () {
      const fileName = 'test'
      const doc = new jsPDF()
      doc.text("Hello World", 10, 10);
      doc.save(fileName + '.pdf');
    } */
  }
}
</script>