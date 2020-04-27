<template>
<div class="page max-width-1250 d-flex flex-column align-items-center">
  <div class="home-section d-flex justify-content-between align-items-center">
    <div class="intro">
      <h4 class="mb-2 text-muted">
        เกี่ยวกับเรา
      </h4>
      <h1 class="text-primary mb-2">
        หน่วยชันสูตรโรคสัตว์กลาง
      </h1>
      <h4 class="text-primary mb-3">
        คณะสัตวแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
      </h4>
      <div class="thick-border-left ml-2">
        <h4 class="font-chatthai text-dark">
          เราเป็นหน่วยงานบริการวิชาการ ที่ทำหน้าที่ในการดูแลรับผิดชอบงานบริการด้านการตรวจวินิจฉัยโรคทางห้องปฏิบัติการทางสัตวแพทย์
        </h4>
        <button class="btn btn-gradient mt-3 home-section-btn"
                v-scroll-to="{el: '#contact', duration: 1000, offset: -100}">
          <i class="fas fa-info btn-inner-icon mr-2"></i> ติดต่อสอบถาม
        </button>
      </div>
    </div>
    <div class="faded-logo" />
  </div>
  
  <div class="home-section text-center">
    <h4 class="text-muted mb-3">งานของเราครอบคลุมด้าน...</h4>
    <div class="d-flex w-100 justify-content-center">
      <h1 class="text-primary mr-4">โลหิตวิทยา</h1>
      <h1 class="text-primary mr-4">ซีรัมวิทยา</h1>
      <h1 class="text-primary mr-4">ไวรัสวิทยา</h1>
      <h1 class="text-primary mr-4">แบคทีเรียวิทยา</h1>
      <h1 class="text-primary">อณูชีววิทยา</h1>
    </div>
    <button class="btn btn-gradient mt-4 home-section-btn"
            v-scroll-to="{el: '#services', duration: 1000, offset: -100}">
      ฿ รายการค่าบริการ
    </button>
  </div>

  <div class="home-section">
    <i class="fa fa-vial icon-lg d-inline mr-3   text-primary"></i>
    <h2 class="text-primary d-inline">ส่งตัวอย่างตรวจ</h2>
    <h5 class="text-muted mt-2">ด้วยระบบ Online ใหม่ของเรา</h5>
    <div class="d-flex my-4 align-items-center justify-content-between text-center">
      <div>
        <i class="fa fa-user icon-lg mr-1 mb-3"></i>
        <h5>สมัครสมาชิก /<br/>login</h5>
      </div>
      <i class="fa fa-chevron-right icon-lg mx-3"></i>

      <div>
        <i class="fa fa-file-signature icon-lg mr-1 mb-3"></i>
        <h5>กรอกแบบฟอร์ม<br/>ส่งตัวอย่างบนเวป</h5>
      </div>
      <i class="fa fa-chevron-right icon-lg mx-3"></i>

      <div>
        <i class="fa fa-paper-plane icon-lg mr-1 mb-3"></i>
        <h5>ส่งตัวอย่างทาง<br/>ไปรษณีย์</h5>
      </div>
      <i class="fa fa-chevron-right icon-lg mx-3"></i>

      <div>
        <i class="fa fa-bell icon-lg mr-1 mb-3"></i>
        <h5>ได้รับการแจ้งเตือน<br/>เมื่อการตรวจเสร็จสิ้น</h5>
      </div>
      <i class="fa fa-chevron-right icon-lg mx-3"></i>

      <div>
        <i class="fa fa-file-pdf icon-lg mr-1 mb-3"></i>
        <h5>รับผลรายงาน<br/>ทางเวป</h5>
      </div>
    </div>

    <div class="d-flex w-100 justify-content-center">
      <router-link  v-if="loggedIn"
                    :to="{name: 'submitsamples'}"
                    tag="button"
                    class="btn btn-primary mt-3 home-section-btn">
        <i class="fas fa-vial btn-inner-icon mr-2"></i> ส่งตัวอย่าง
      </router-link>
      <template v-else>
        <router-link  :to="{name: 'signup'}"
                      tag="button"
                      class="btn btn-primary mt-3 home-section-btn mr-4">
          <i class="fas fa-user-plus btn-inner-icon mr-2"></i> สมัครสมาชิก
        </router-link>
        <router-link  :to="{name: 'login'}"
                      tag="button"
                      class="btn btn-secondary home-section-btn mt-3">
          <i class="fas fa-sign-in-alt btn-inner-icon mr-2"></i> เข้าสู่ระบบ
        </router-link>
      </template>
    </div>
  </div>

  <div class="home-section row w-100">
    <div class="col-7 pr-4">
      <h4 class="text-muted mb-3">
        ภารกิจของเรา
      </h4>
      <div class="font-chatthai text-dark thick-border-left ml-2">
        <h4 class="mb-2 text-dark">ให้คำปรึกษาในการวินิจฉัยโรคและการแปลผลการตรวจทางห้องปฏิบัติการ</h4>
        <h4 class="mb-2 text-dark">ให้ความรู้เกี่ยวกับโรคสัตว์และการตรวจวินิจฉัยโรคแก่ประชาชนและหน่วยงานต่างๆ</h4>
        <h4 class="mb-2 text-dark">สนับสนุนการเรียนการสอนและงานวิจัยที่เกี่ยวข้องกับโรคสัตว์ที่สำคัญของคณะสัตวแพทย์ศาสตร์ รวมถึงการเป็นแหล่งอ้างอิงในการชันสูตรโรคสัตว์ที่สำคัญ</h4>
        <h4 class="mb-2 text-dark">ให้ผู้ใช้บริการมีความพึงพอใจและมั่นใจในบริการมากที่สุด</h4>
      </div>
    </div>
    <div class="col-5">
      <h4 class="text-muted mb-3">
        คณาจารย์และบุคลากร ที่หน่วยชันสูตรโรคสัตว์กลาง
      </h4>
      <div class="text-dark thick-border-left ml-2">
        <h4 class="mb-2 text-dark font-chatthai">มีความรู้ความชำนาญในหลายด้าน</h4>
        <h4 class="mb-2 text-dark font-chatthai">มีความพร้อมในการให้บริการด้านวิชาการ</h4>
        <h4 class="text-dark font-chatthai">มีการพัฒนาความสามารถในการตรวจวินิจฉัยโรคให้หลากหลายและทันสมัยอยู่เสมอ</h4>
        <button class="btn btn-sm btn-gradient mt-3 px-5 py-1"
                v-scroll-to="{el: '#orgchart', duration: 1500, offset: -200}">
          <i class="fas fa-user-graduate btn-inner-icon mr-2"></i>
          รู้จักกับบุคลกรของเรา
        </button>
      </div>
    </div>
  </div>

  <services class="w-100 my-5" />
  <org-chart class="w-100 my-5" />
  <contact class="w-100 my-5" />
</div>  
</template>

<style lang="scss" scoped>
.home-section {
  width: 100%;
  margin: 4rem 0;
}
.home-section-btn {
  width: 230px;
}
.thick-border-left {
  /* border-left: 4px solid $primary; */
  position: relative;
  padding-left: 1.5em;
  &::before {
    content: '';
    width: 4px;
    position: absolute;
    top: 0; bottom: 0; left: 0;
    background: linear-gradient(to top, $primary, $placeholder);
  }
}
.intro {
  max-width: 550px;
}
.faded-logo {
  @include logo;
  background-size: 305px 300px;
  width: 320px;
  height: 300px;
  opacity: .15;
}
</style>

<script>
import { mapGetters } from 'vuex'

import Services from '@/components/Services'
import OrgChart from '@/components/OrgChart'
import Contact from '@/components/Contact'

export default {
  name: 'home',
  components: {
    Services,
    OrgChart,
    Contact
  },
  computed: {
    ...mapGetters(['loggedIn'])
  }
}
</script>