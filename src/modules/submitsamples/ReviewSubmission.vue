<template>
<div class="preview-bg">
  <button class="back-to-form btn btn-lg back-btn btn-transparent"
          @click="$emit('back')">
    <i class="fas fa-chevron-left btn-inner-icon-lg text-left mr-0" />กลับไปแก้ไข
  </button>
  <div class="right-btn-container">
    <button class="submit btn btn-lg btn-success btn-block mb-4"
            @click="$emit('submit')">
      <i class="fas fa-paper-plane btn-inner-icon-lg text-left mr-0" />
      {{ edit_mode? 'ยืนยันและบันทึก' : 'ยืนยันและส่งตัวอย่าง' }}
    </button>
    <button class="submit btn btn-lg btn-secondary btn-block"
            @click="createPDF()">
      <i class="fas fa-file-pdf btn-inner-icon-lg text-left mr-0" />
      ดาวน์โหลดไฟล์ PDF
    </button>
  </div>
  <div class="d-flex flex-column w-100 align-items-center pt-3 fill-height scroll-container">

    <div  class="A4-page-wrapper"
          id="printableArea">
      <div  class="A4-page"
            id="page-1">
        <div class="page-header page-item">
          <div class="logo mr-3"></div>
          <div class="d-flex flex-column justify-content-between">
            <h2>{{ `ใบรับตัวอย่าง${submission.submission_type}` }}</h2>
            <h5>หน่วยชันสูตรโรคสัตว์กลาง คณะสัตวแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</h5>
            <h6>ถนนอังรีดูนังต์ แขวงวังใหม่ เขตพญาไท กทม. 10330 โทร.02-218-9606-6 email: cuvdl.thailand@gmail.com</h6>
          </div>
        </div>
        <div class="page-item box row no-gutters">
          <div class="col-6 border-r">
            <div class="row no-gutters border-b">
              <h5 class="col-3">ผู้ส่งตัวอย่าง</h5>
              <h5 class="col ink">{{ user.name }}</h5>
            </div>
            <div class="row no-gutters tall border-b">
              <h5 class="col-3">ที่อยู่</h5>
              <h5 class="col ink pre-line">{{ sample_owner.address }}</h5>
            </div>
            <div class="row no-gutters border-b">
              <h5 class="col-3">อีเมล</h5>
              <h5 class="col ink">{{ user.email }}</h5>
            </div>
            <div class="row no-gutters">
              <h5 class="col-3">โทรศัพท์</h5>
              <h5 class="col ink">{{ user.phone }}</h5>
            </div>
          </div>
          <div class="col-6">
            <div class="row no-gutters border-b">
              <h5 class="col-12 text-center">สำหรับเจ้าหน้าที่</h5>
            </div>
            <div class="row no-gutters border-b">
              <h5 class="col-6 border-r">วันที่ส่ง</h5>
              <h5 class="col">วันที่รับ</h5>
            </div>
            <div class="row no-gutters border-b">
              <h5 class="col-3">เลขที่ส่งตัวอย่าง</h5>
              <h5 class="col"></h5>
            </div>
            <div class="row no-gutters">
              <h5 class="col-12 border-b">ผู้รับ</h5>
            </div>
          </div>
        </div>

        <div class="page-item box row no-gutters">
          <div class="col-6 border-r">
            <div class="row no-gutters border-b">
              <h5 class="col-3">เจ้าของตัวอย่าง</h5>
              <h5 class="col-9 ink">{{ sample_owner.name }}</h5>
            </div>
            <div class="row no-gutters no-border-b tall">
              <h5 class="col-3">ที่อยู่</h5>
              <h5 class="col-9 ink pre-line">{{ sample_owner.address }}</h5>
            </div>
          </div>
          <div class="col-6">
            <div class="row no-gutters border-b">
              <h5 class="col-3">Invoice ไปที่</h5>
              <h5 class="col-9 ink">{{ invoice_to.name }}</h5>
            </div>
            <div class="row no-gutters tall">
              <h5 class="col-3">ที่อยู่</h5>
              <h5 class="col-9 ink pre-line">{{ invoice_to.address }}</h5>
            </div>
          </div>
        </div>

        <div class="page-item box row no-gutters">
          <div class="col-6 border-r">
            <div class="row no-gutters">
              <h5 class="col-3 border-r">แจ้งผลโดย</h5>
              <h5 class="col-2">โทรศัพท์</h5>
              <h5 class="col-7 ink">{{ submission.notify_to_phone }}</h5>
            </div>
          </div>
          <div class="col-6">
            <div class="row no-gutters">
              <h5 class="col-3">อีเมล</h5>
              <h5 class="col ink">{{ submission.notify_to_email }}</h5>
            </div>
          </div>
        </div>

        <div  v-if="submission.submission_type === 'การตรวจทั่วไป'"
              class="page-item box row no-gutters">
          <div  class="col-12">
            <div class="row no-gutters border-b">
              <h5 class="col-2">
                ชนิดตัวอย่าง
              </h5>
              <h5 class="col-2 ink border-r">
                {{ submission.sample_details.sample_type }}
              </h5>
              <h5 class="col-2">
                จำนวนตัวอย่าง
              </h5>
              <h5 class="col-2 ink border-r">
                {{ 20 }}
              </h5>
              <h5 class="col-2">
                วันที่เก็บตัวอย่าง
              </h5>
              <h5 class="col-2 ink">
                {{ to_display_date(submission.sample_details.sample_taken_date) }}
              </h5>
            </div>
            <div class="row no-gutters border-b">
              <h5 class="col-2">
                ชนิดสัตว์
              </h5>
              <h5 class="col-2 border-r">
                {{ submission.sample_details.animal_type }}
              </h5>
              <h5 class="col-2">
                พันธุ์
              </h5>
              <h5 class="col-2 border-r">
                {{ submission.sample_details.animal_species }}
              </h5>
              <h5 class="col-2">
                อายุ
              </h5>
              <h5 class="col-2">
                {{ submission.sample_details.animal_age }}
              </h5>
            </div>
            <div class="row no-gutters tall">
              <div class="col-6 border-r">
                <div class="row no-gutters">
                  <h5 class="col-3">
                    ประวัติการป่วย
                  </h5>
                  <h5 class="ink col pre-line">
                    {{ submission.sample_details.illness }}
                  </h5>
                </div>
              </div>
              <div class="col-6">
                <div class="row no-gutters">
                  <h5 class="col-3">
                    ประวัติวัคซีน
                  </h5>
                  <h5 class="ink col pre-line">
                    {{ submission.sample_details.vaccinations }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="page-item box row no-gutters">
          <div class="col-12">
            <div class="row no-gutters border-b">
              <h5 class="col-2">รายการตรวจวิเคราะห์</h5>
              <div class="col">
                <div class="row no-gutters">
                  <h5 class="col-2"></h5>
                  <div class="col">
                    <div class="row no-gutters">
                      <h5 class="col-7"></h5>
                      <h5 class="col-3">ราคาต่อตัวอย่าง</h5>
                      <h5 class="col-2">ค่าบริการ</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          <div class="col-12">
            <div class="row no-gutters border-b">
              <h5 class="col-2">งานไวรัสวิทยา</h5>
              <div class="col">
                <div class="row no-gutters">
                  <h5 class="col-2">Serum Neutralization</h5>
                  <div class="col">
                    <div class="row no-gutters">
                      <h5 class="col-7">TEST METHOD NAME</h5>
                      <h5 class="col-3">300฿</h5>
                      <h5 class="col-2">4000฿</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  name: 'review-submission',
  props: {
    submission: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    },
    sample_owner: {
      type: Object,
      required: true
    },
    invoice_to: {
      type: Object,
      required: true
    },
    edit_mode: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    download () {
      
    },
    createPDF () {
      // const file_name = 'test'
      // const doc = new jsPDF()
      // doc.text("Hello World", 10, 10);
      // doc.save(file_name + '.pdf');
      // var printContents = document.getElementById('printableArea').innerHTML;
      // var originalContents = document.body.innerHTML;

      // document.body.innerHTML = printContents;

      // window.print();

      // document.body.innerHTML = originalContents;

      const w = window.open();
      const content = document.getElementById('printableArea').innerHTML
      w.document.body.innerHTML = content;
      w.print();
      //w.close();
    }
  }
}
</script>

<style lang="scss" scoped>
$ink: #455280;
$row-height: 28px;

.preview-bg {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  overflow: hidden;
  background: rgba($black, .55);
  z-index: 1000;
  @include backdrop-blur;
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
.right-btn-container {
  position: fixed;
  right: 90px;
  top: 90px;
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
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background: $white;
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
  h5 {
    font-size: 19px;
  }
  h5.ink {
    color: $ink;
    font-size: 20px;
  }
  &:not(:last-child) {
    margin-bottom: $row-height;
  }
  &.box {
    border: 2px solid $default;
  }
  .row {
    height: $row-height;
    &.tall {
      height: calc(#{$row-height}*3);
    }
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