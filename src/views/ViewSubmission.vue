<template>
<div class="page max-width-1500 d-flex align-items-start">
  <div id="view-submission-nav" class="sticky p-4">
    <h3 class="mb-4 ml-2">ติดตามการส่งตัวอย่าง</h3>
    <router-link to="/tracksubmissions"
                 tag="button"
                 class="btn back-btn btn-transparent d-flex align-items-center align-self-end">
      <i class="fas fa-chevron-left mr-2" />
      <div class="text">
        {{ $t(`general.back`) }}
      </div>
    </router-link>
    <scrollactive active-class="scrollactive-active"
                  :offset="275"
                  :modifyUrl="false">
      <a  href="#info"
          class="btn btn-transparent btn-block btn-lg scrollactive-item">
        <i class="fas fa-file-alt btn-inner-icon-lg" />
        ข้อมูลเบื้องต้น
      </a>
      <a  href="#payment"
          class="btn btn-transparent btn-block btn-lg scrollactive-item">
        <i class="fas fa-file-invoice-dollar btn-inner-icon-lg" />
        การชำระเงิน
      </a>
      <a  href="#reports"
          class="btn btn-transparent btn-block btn-lg scrollactive-item">
        <i class="fas fa-file-invoice btn-inner-icon-lg" />
        รายงาน
      </a>
      <a  href="#contact"
          class="btn btn-transparent btn-block btn-lg scrollactive-item">
        <i class="fas fa-address-book btn-inner-icon-lg" />
        ข้อมูลการติดต่อ
      </a>
      <div class="w-100 border-bottom-lighter mb-3"></div>
      <a  href="#actions"
          class="btn btn-transparent btn-block btn-lg scrollactive-item">
        <i class="fas fa-edit btn-inner-icon-lg" />
        ส่งคำขอแก้ไข
      </a>
      <a  href="#cancel"
          class="btn btn-transparent btn-block btn-lg scrollactive-item">
        <i class="fas fa-window-close btn-inner-icon-lg" />
        ยกเลิก
      </a>
    </scrollactive>
  </div>
  <div  id="view-submission-content"
        class="p-4">
    <div id="info"
         class="section">
      <h2 class="mb-4">
        <i class="fas fa-file-alt icon-lg" />
        การส่งตัวอย่างหมายเลข <span class="text-primary">{{ ` ${$route.params.id}` }}</span>
      </h2>

      <div class="row ">
        <div class="col-2">
          <h4>สถานะ</h4>
        </div>
        <div class="col-10 pt-1">
          <div class="form-row">
            <div class="form-group col-6">
              <div class="order-tag red form-control form-control-lg">
                X - Cancelled
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-2">
          <h4>ใบส่งตัวอย่าง</h4>
        </div>
        <div class="col-10 pt-1">
          <div class="form-row">
            <div class="form-group col-6">
              <button class="btn btn-secondary btn-lg btn-block">
                <i class="fas fa-file-alt btn-inner-icon mr-2" />ใบส่งตัวอย่าง.pdf
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-2">
          <h4>ข้อมูลเบื้องต้น</h4>
        </div>
        <div class="col-10 pt-1">
          <div class="form-row">
            <div class="form-group col-8">
              <label>
                ประเภทการทดสอบ
              </label>
              <input  type="text"
                      class="form-control"
                      disabled >
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-4">
              <label>
                หมายเลขการส่งตัวอย่าง
              </label>
              <input  type="text"
                      class="form-control"
                      :value="submission.id"
                      disabled >
            </div>
            <div class="form-group col-4">
              <label>
                หมายเลขรับตัวอย่าง
              </label>
              <input  type="text"
                      class="form-control"
                      :value="submission.receptionNum"
                      disabled >
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-4">
              <label>
                วันที่ส่งตัวอย่าง
              </label>
              <datepicker format="dd/MM/yy"
                          :value="submission.submitDate"
                          :disabled="true"
                          :bootstrap-styling="true">
                <div slot="afterDateInput" class="append-icon">
                  <i class="far fa-calendar-alt" />
                </div>
              </datepicker>
            </div>
            <div class="form-group col-4">
              <label>
                วันที่รับตัวอย่าง
              </label>
              <datepicker format="dd/MM/yy"
                          :value="submission.receivedDate"
                          :disabled="true"
                          :bootstrap-styling="true">
                <div slot="afterDateInput" class="append-icon">
                  <i class="far fa-calendar-alt" />
                </div>
              </datepicker>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-8">
              <label>
                ชื่อผู้ส่ง
              </label>
              <input  type="text"
                      class="form-control"
                      :value="submission.submitter.firstName"
                      disabled >
            </div>
            <div class="form-group col-8">
              <label>
                องค์กรเจ้าของตัวอย่าง
              </label>
              <input  type="text"
                      class="form-control"
                      :value="submission.org.name"
                      disabled >
            </div>
          </div>

        </div>
      </div>

    </div>

    <div id="payment"
         class="section">
      <h2 class="mb-4">
        <i class="fas fa-file-invoice-dollar icon-lg" />
        การชำระเงิน
      </h2>

      <div class="row">
        <div class="col-2">
          <h4>สถานะ</h4>
        </div>
        <div class="col-10 pt-1">
          <div class="form-row">
            <div class="form-group col-6">
              <div class="order-tag grey form-control form-control-lg">
                N - Not Invoiced
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-2">
          <h4>Invoice</h4>
        </div>
        <div class="col-10 pt-1">
          <div class="form-row">
            <div class="form-group col-6">
              <button class="btn btn-secondary btn-lg btn-block">
                <i class="fas fa-file-invoice-dollar btn-inner-icon mr-2" />Invoice.pdf
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-2">
          <h4>ค่าบริการ</h4>
        </div>
        <div class="col-10 pt-1">
          <div class="form-row">
            <div class="form-group col-3 text-right">
              <h1 class="text-primary">{{`${submission.finalPrice.toLocaleString()}฿`}}</h1>
              <h4 class="text-medium">*ค่าบริการโดยประมาน</h4>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div id="reports"
         class="section">
      <h2 class="mb-4">
        <i class="fas fa-file-invoice icon-lg" />
        รายงาน
      </h2>
      <div class="download-reports mb-2 p-3 flex-grow-1">
        <div class="row color-dark-grey border-bottom-lighter py-2">
          <div class="col-2">
            <h4 class="mb-0">
              เลขที่รายงาน
            </h4>
          </div>
          <div class="col-1">
            <h4 class="mb-0">
              สถานะ
            </h4>
          </div>
          <div class="col-2">
            <h4 class="mb-0">
              วันที่
            </h4>
          </div>
          <div class="col-4">
            <h4 class="mb-0">
              รายละเอียด
            </h4>
          </div>
          <div class="col-1">
            <h4 class="mb-0">
              ดูไฟล์
            </h4>
          </div>
          <div class="col-2">
            <h4 class="mb-0">
              ดาวน์โหลด
            </h4>
          </div>
        </div>

        <div v-for="(report, idx) in submission.reports"
              :key="idx"
              class="row py-1 border-bottom-lighter">
          <div class="col-2 d-flex align-items-center">
            <h5 class="mb-0">
              {{ report.id }}
            </h5>
          </div>
          <div class="col-1 d-flex align-items-center">
            <h5 class="mb-0">
              {{ report.status }}
            </h5>
          </div>
          <div class="col-2 d-flex align-items-center">
            <h5 class="mb-0">
              {{ report.date }}
            </h5>
          </div>
          <div class="col-4 d-flex align-items-center">
            <h5 class="mb-0">
              {{ report.details }}
            </h5>
          </div>
          <div class="col-1">
            <button class="btn btn-icon">
              <i class="fas fa-file-invoice"></i>
            </button>
          </div>
          <div class="col-2">
            <button class="btn btn-icon">
              <i class="fas fa-file-download"></i>
            </button>
          </div>
        </div>
        
        <div class="row mt-3">
          <div class="col-12 d-flex justify-content-end">
            <button class="btn btn-primary">
              <i class="fas fa-download btn-inner-icon" />
              ดาวน์โหลดทั้งหมด (เป็น zip)
            </button>
          </div>  
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-2">
          <h4 class="mb-2 mt-3">ช่องทางการแจ้งผล</h4>
        </div>
        <div class="col-10">
          <div class="form-row">
            <div class="form-group col-4">
              <label>อีเมล</label>
              <input  type="text"
                      class="form-control"
                      :value="submission.submitter.email"
                      disabled >
            </div>
            <div class="form-group col-4">
              <label>เบอร์โทรศัพท์</label>
              <input  type="text"
                      class="form-control"
                      :value="submission.submitter.phone"
                      disabled >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="contact" class="section">
      <h2 class="mb-4">
        <i class="fas fa-address-book icon-lg" />
        ข้อมูลการติดต่อ
      </h2>
      <div class="row mb-4">
        <div class="col-2">
          <h4>ติดต่อผู้ส่ง</h4>
        </div>
        <div class="col-10 pt-1">
          <div class="form-row">
            <div class="form-group col-8">
              <label>ชื่อ-นามสกุล</label>
              <input  type="text"
                      class="form-control"
                      :value="submission.submitter.firstName"
                      disabled >
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-4">
              <label>อีเมล</label>
              <input  type="text"
                      class="form-control"
                      :value="submission.submitter.email"
                      disabled >
            </div>
            <div class="form-group col-4">
              <label>เบอร์โทรศัพท์</label>
              <input  type="text"
                      class="form-control"
                      :value="submission.submitter.phone"
                      disabled >
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <h4>ติดต่อองค์กร</h4>
        </div>
        <div class="col-10 pt-1">
          <div class="form-row">
            <div class="form-group col-8">
              <label>ชื่อองค์กร</label>
              <input  type="text"
                      class="form-control"
                      :value="submission.org.name"
                      disabled >
            </div>
            <div class="form-group col-8">
              <label>เบอร์โทรศัพท์</label>
              <input  type="text"
                      class="form-control"
                      :value="submission.org.phone"
                      disabled >
            </div>
            <div class="form-group col-8">
              <label>ที่อยู่</label>
              <input  type="text"
                      class="form-control"
                      :value="submission.org.addr.line1"
                      disabled >
            </div>
            <div class="form-group col-8">
              <input  type="text"
                      class="form-control"
                      :value="submission.org.addr.line2"
                      disabled >
            </div>
            <div class="w-100"></div>
            <div class="form-group col-3">
              <label>เมือง</label>
              <input  type="text"
                      class="form-control"
                      :value="submission.org.addr.city"
                      disabled >
            </div>
            <div class="form-group col-3">
              <label>จังหวัด</label>
              <input  type="text"
                      class="form-control"
                      :value="submission.org.addr.province"
                      disabled >
            </div>
            <div class="form-group col-2">
              <label>รหัสไปรษณีย์</label>
              <input  type="number"
                      class="form-control"
                      :value="submission.org.addr.zip"
                      disabled >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="actions"
         class="section">
      <h2 class="mb-4">
        <i class="fas fa-edit icon-lg" />
          ส่งคำขอแก้ไข
      </h2>
      <div class="row">
        <div class="col-2">
          <h4>ข้อความ</h4>
        </div>
        <div class="col-10 pt-1">
          <div class="form-row">
            <div class="form-group col-8">
              <textarea rows="6"
                        class="form-control" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-4">
              <button class="btn btn-primary btn-block">
                <i class="fas fa-paper-plane btn-inner-icon"></i>
                ส่งคำขอแก้ไข
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<style lang="scss" scoped>
$nav-width: 300px;
#view-submission-nav {
  width: $nav-width;
  border-right: 1px solid $accent;
  height: calc(100vh - #{$titlebar-height} - #{$footer-height});
  overflow-x: visible;
  a {
    text-align: left;
    margin-bottom: .75em;
  }
}
#view-submission-content {
  width: calc(100% - #{$nav-width});
  min-height: calc(100vh - #{$titlebar-height} - #{$footer-height});
}
.section {
  font-family: 'CS ChatThai';
  border-bottom: 1px solid $accent;
  padding: 2em 1em 2em 1em;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    margin-bottom: 45vh;
  }
}
.btn.back-btn {
  position: absolute;
  top: 25px;
  left: -100px;
  .text {
    display: block;
  }
}
@media screen and (max-width: 1400px) {
  .sidebar {
    width: 40px;
  }
  .back-btn {
    .text {
      display: none;
    }
  }
}
</style>

<script>
export default {
  name: 'view-submission',
  data () {
    return {
      submission: {
        id: 44556677,
        org: {
          id: 1,
          name: 'ฟาร์มสมควร',
          phone: '087-654-3210',
          addr: {
            line1: '123 ทองหล่อ ซ.12 ถนนสุขุมวิท',
            line2: 'คลองตันเหนือ วัฒนา',
            city: 'กรุงเทพ',
            province: 'กรุงเทพ',
            zip: '10110'
          },
        },
        submitter: {
          id: 1,
          accountType: 1,
          org: 1,
          customerList: [],
          firstName: 'สมควร',
          lastName: 'สมสกุล',
          email: 'mr.somkuan@gmail.com',
          phone: '081-234-5678',
          nationalId: null
        },
        type: 1,
        status: 1,
        invoiceStatus: 1,
        finalPrice: 85000,
        submitDate: '01/05/2020',
        bestLimsSubmissionNum: '',
        receivedDate: '04/05/2020',
        receptionNum: '04052020',
        submissionForm: '', // PDF of form data
        reports: [
          {
            id: '2000-1001-001',
            date: '01/02/2020',
            details: 'ตัวอย่างที่ 11-20',
            status: 0,
            link: 'https://backend/report-link-pdf'
          },
          {
            id: '2000-1001-002',
            date: '01/02/2020',
            details: 'ตัวอย่างที่ 11-20',
            status: 0,
            link: 'https://backend/report-link-pdf'
          },
          {
            id: '2000-1001-003',
            date: '01/02/2020',
            details: 'ตัวอย่างที่ 11-20',
            status: 0,
            link: 'https://backend/report-link-pdf'
          },
          {
            id: '2000-1001-004',
            date: '01/02/2020',
            details: 'ตัวอย่างที่ 11-20',
            status: 0,
            link: 'https://backend/report-link-pdf'
          },

        ]
      }
    }
  }
}
</script>