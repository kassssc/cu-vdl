<template>

<div class="d-flex flex-column w-100 align-items-center">

  <button class="back-to-form btn back-btn btn-transparent d-flex align-items-center align-self-end"
          @click="$emit('back')">
    <i class="fas fa-chevron-left mr-2" />
    <div class="text">
      กลับไปแก้ไข
    </div>
  </button>
  
  <div class="A4-page-wrapper">
    <div class="A4-page">
      <div class="page-header page-item">
        <div class="logo mr-3"></div>
        <div class="d-flex flex-column justify-content-between">
          <h2>ใบรับตัวอย่างงานตรวจทั่วไป</h2>
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
        <div class="col-6">
          <div class="row no-gutters border-b">
            <h5 class="col-6 border-r">วันที่เก็บตัวอย่าง</h5>
            <h5 class="col-6">จำนวนตัวอย่าง</h5>
          </div>
          <div class="row no-gutters border-b">
            <h5 class="col-6 border-r">ชนิดตัวอย่าง</h5>
            <h5 class="col-6">ชนิดสัตว์</h5>
          </div>
          <div class="row no-gutters border-b">
            <h5 class="col-6 border-r">พันธุ์</h5>
            <h5 class="col-6">อายุ</h5>
          </div>
          <div class="row no-gutters border-b">
            <h5 class="col-12">ประวัติการป่วย</h5>
          </div>
          <div class="row no-gutters">
            <h5 class="col-12">ประวัติการทำวัคซีน</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.back-to-form {
  position: fixed;
  left: 50px;
  top: 90px;
}
$ink: #455280;
.ink {
  color: $ink;
}
.border-b {
  border-bottom: 1px solid $default;
}
.border-r {
  border-right: 1px solid $default;
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
}
.A4-page {
  // actual width/height of A4
  // width: 595px;
  // height: 842px;
  // scale by 1.5 for readability
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
//import jsPDF from 'jspdf'

export default {
  name: 'review-submission',
  props: ['submission'],
  computed: {
    ...mapGetters(['user', 'org'])
  },
  methods: {
    /* createPDF () {
      const fileName = 'test'
      const doc = new jsPDF()
      doc.text("Hello World", 10, 10);
      doc.save(fileName + '.pdf');
    } */
  }
}
</script>