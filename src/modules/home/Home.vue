<template>
<div class="page page-md d-flex flex-column align-items-center">
  <div  id="home"
        class="w-100 d-flex flex-column align-items-center pb-5">
    <div class="home-section">
      <div class="faded-logo" />
      <div class="w-100 intro">
        <h4 class="mb-2 text-muted">เกี่ยวกับเรา</h4>
        <h1 class="text-primary mb-2">หน่วยชันสูตรโรคสัตว์กลาง</h1>
        <h4 class="text-primary mb-3">คณะสัตวแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</h4>
        <ul class="info-text">
          <li class="text">
            เราเป็นหน่วยงานบริการวิชาการ ที่ทำหน้าที่ในการดูแลรับผิดชอบงานบริการด้านการตรวจวินิจฉัยโรคทางห้องปฏิบัติการทางสัตวแพทย์
          </li>
          <li>
            <button class="btn btn-gradient home-section-btn"
                    v-scroll-to="{ el: '#contact', duration: 1000, offset: -80 }">
              <i class="fas fa-info btn-inner-icon"></i> ติดต่อสอบถาม
            </button>
          </li>
        </ul>
        
      </div>
    </div>
    
    <div class="test d-flex align-items-center justify-content-center">
      <div class="inner">
        <h4 class="text-medium mb-3">ขอบข่ายงานบริการ</h4>
        <div class="d-flex w-100 justify-content-center">
          <h1 class="text-primary mr-4">โลหิตวิทยา</h1>
          <h1 class="text-primary mr-4">ซีรัมวิทยา</h1>
          <h1 class="text-primary mr-4">ไวรัสวิทยา</h1>
          <h1 class="text-primary mr-4">แบคทีเรียวิทยา</h1>
          <h1 class="text-primary">อณูชีววิทยา</h1>
        </div>
        <button class="btn btn-gradient mt-4 home-section-btn"
                v-scroll-to="{el: '#services', duration: 1000, offset: -80}">
          ฿ รายการค่าบริการ
        </button>
      </div>
    </div>
  
    <div class="home-section">
      <i class="fa fa-vial icon-lg d-inline mr-3   text-primary"></i>
      <h2 class="text-primary d-inline">ส่งตัวอย่างตรวจ</h2>
      <h5 class="text-muted mt-2">ด้วยระบบ Online ใหม่ของเรา</h5>
      <div class="d-flex my-4 align-items-center justify-content-between text-center">
        <div>
          <i class="fa fa-user icon-lg mb-3"></i>
          <h5>สมัครสมาชิก /<br/>login</h5>
        </div>
        <i class="fa fa-chevron-right icon-lg mx-3"></i>
  
        <div>
          <i class="fa fa-file-signature icon-lg mb-3"></i>
          <h5>กรอกแบบฟอร์ม<br/>ส่งตัวอย่างบนเวป</h5>
        </div>
        <i class="fa fa-chevron-right icon-lg mx-3"></i>
  
        <div>
          <i class="fa fa-paper-plane icon-lg mb-3"></i>
          <h5>ส่งตัวอย่าง<br/>ให้เรา</h5>
        </div>
        <i class="fa fa-chevron-right icon-lg mx-3"></i>
  
        <div>
          <i class="fa fa-bell icon-lg mb-3"></i>
          <h5>ได้รับการแจ้งเตือน<br/>เมื่อการตรวจเสร็จสิ้น</h5>
        </div>
        <i class="fa fa-chevron-right icon-lg mx-3"></i>
  
        <div>
          <i class="fa fa-file-pdf icon-lg mb-3"></i>
          <h5>รับผลรายงาน<br/>ทางเวป</h5>
        </div>
      </div>
  
      <div class="d-flex w-100 justify-content-center">
        <router-link  v-if="logged_in"
                      :to="{name: 'submit-samples'}"
                      tag="button"
                      class="btn btn-primary mt-3 home-section-btn">
          <i class="fas fa-vial btn-inner-icon"></i> ส่งตัวอย่าง
        </router-link>
        <template v-else>
          <router-link  :to="{name: 'signup'}"
                        tag="button"
                        class="btn btn-secondary mt-3 home-section-btn mr-4">
            <i class="fas fa-user-plus btn-inner-icon"></i> สมัครสมาชิก
          </router-link>
          <router-link  :to="{name: 'login'}"
                        tag="button"
                        class="btn btn-primary home-section-btn mt-3">
            <i class="fas fa-sign-in-alt btn-inner-icon"></i> เข้าสู่ระบบ
          </router-link>
        </template>
      </div>
    </div>
  
    <div class="d-flex align-self-end my-5">
      <div class="mission-img"></div>
      <div class="mission py-5">
        <h4 class="text-muted mb-3">
          ภารกิจของเรา
        </h4>
        <ul class="info-text">
          <li class="text">ให้คำปรึกษาในการวินิจฉัยโรคและการแปลผลการตรวจทางห้องปฏิบัติการ</li>
          <li class="text">ให้ความรู้เกี่ยวกับโรคสัตว์และการตรวจวินิจฉัยโรคแก่ประชาชนและหน่วยงานต่างๆ</li>
          <li class="text">สนับสนุนการเรียนการสอนและงานวิจัยที่เกี่ยวข้องกับโรคสัตว์ที่สำคัญของคณะสัตวแพทย์ศาสตร์ รวมถึงการเป็นแหล่งอ้างอิงในการชันสูตรโรคสัตว์ที่สำคัญ</li>
          <li class="text">ให้ผู้ใช้บริการมีความพึงพอใจและมั่นใจในบริการมากที่สุด</li>
        </ul>
      </div>
    </div>
  
    <div class="d-flex align-self-start my-5">
      <div class="personel py-5">
        <h4 class="text-muted mb-3">
          คณาจารย์และบุคลากร ที่หน่วยชันสูตรโรคสัตว์กลาง
        </h4>
        <ul class="info-text">
          <li class="text">มีความรู้ความชำนาญในหลายด้าน</li>
          <li class="text">มีความพร้อมในการให้บริการด้านวิชาการ</li>
          <li class="text">มีการพัฒนาความสามารถในการตรวจวินิจฉัยโรคให้หลากหลายและทันสมัยอยู่เสมอ รวมถึงการเป็นแหล่งอ้างอิงในการชันสูตรโรคสัตว์ที่สำคัญ</li>
          <li>
            <button class="btn btn-sm btn-gradient px-5 py-1"
                    v-scroll-to="{el: '#orgchart', duration: 1500, offset: -80}">
              <i class="fas fa-user-graduate btn-inner-icon"></i>
              รู้จักกับบุคลากรของเรา
            </button>
          </li>
        </ul>
      </div>
      <div class="personel-img"></div>
    </div>
  </div>

  <Services v-once class="w-100 py-5" />
  <OrgChart v-once class="w-100 py-5" />
  <Contact class="w-100 py-5" />
</div>  
</template>

<script>
import Services from './Services'
import OrgChart from './OrgChart'
import Contact from './Contact'
import { AUTH_DATA } from '@/graphql/local'

export default {
  name: 'home',
  components: {
    Services,
    OrgChart,
    Contact
  },
  apollo: {
    logged_in: {
      query: AUTH_DATA,
      update: data => data.auth.logged_in
    }
  }
}
</script>

<style lang="scss" scoped>
ul.info-text {
  position: relative;
  padding: 0 0 0 1.5rem;
  margin: 0 0 0 .5rem;
  list-style: none;
  &::before {
    content: '';
    width: 4px;
    position: absolute;
    top: 0; bottom: 0; left: 0;
    background: linear-gradient(to top, $primary, $placeholder);
  }
  li {
    &:not(.text):last-child {
      margin-top: 1rem;
    }
    &.text {
      margin-bottom: .7rem;
      font-family: 'CS ChatThai';
      font-weight: bold;
      font-size: 1.5rem;
      line-height: 1.1em;
      color: $dark;
    }
  }
}
.home-section-btn {
  width: 230px;
}
.home-section {
  width: 100%;
  margin: 4rem 0;
  position: relative;
  .intro {
    z-index: 2;
    max-width: 550px;
  }
  .faded-logo {
    @include logo;
    background-size: 305px 300px;
    width: 320px;
    height: 300px;
    position: absolute;
    top: 0; bottom: 0; right: 0;
    opacity: .15;
    z-index: -1;
  }
}
.mission {
  margin-left: 5em;
  width: 640px;
}
.mission-img {
  width: 43vw;
  border-radius: $border-radius;
  background-image: url('https://i.ibb.co/jvtdL1g/ACT-118.jpg');
  background-repeat: no-repeat;
  background-position: left;
  background-size: cover;
}
.personel {
  width: 475px;
  margin-right: 5em;
}
.personel-img {
  width: 52vw;
  border-radius: $border-radius;
  background-image: url('https://i.ibb.co/1ssFNJk/IP3.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: contrast(70%);
}
.test {
  width: 99vw;
  height: 550px;
  margin: 4em 0;
  background-image: url('https://i.ibb.co/2vcL6NQ/ACT-186-e1505924519238.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .inner {
    max-width: 1250px;
    text-align: center;
    border-radius: $border-radius-lg;
    padding: 2em;
    backdrop-filter: blur(20px) brightness(110%);
  }
}
</style>