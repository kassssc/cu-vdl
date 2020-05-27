<template>
<div class="page page-lg d-flex align-items-start">
  <div class="sub-nav overflow-visible sticky pl-4">
    <router-link  :to="{name: 'submissionslist'}"
                  tag="button"
                  exact
                  class="btn btn-transparent back-btn mb-3">
      <i class="fas fa-chevron-left mr-2" />กลับไป
    </router-link>
    <h3 class="mb-4 ml-2">ติดตามการส่งตัวอย่าง</h3>
    <scrollactive active-class="scrollactive-active"
                  :offset="200"
                  :modify-url="false"
                  highlight-first-item>
      <a  href="#info"
          class="btn btn-transparent btn-block btn-lg scrollactive-item">
        <i class="fas fa-file-alt btn-inner-icon-lg" />
        ข้อมูลเบื้องต้น
      </a>
      <a  href="#reports"
          class="btn btn-transparent btn-block btn-lg scrollactive-item">
        <i class="fas fa-file-invoice btn-inner-icon-lg" />
        รายงาน
      </a>
      <a  href="#payment"
          class="btn btn-transparent btn-block btn-lg scrollactive-item">
        <i class="fas fa-file-invoice-dollar btn-inner-icon-lg" />
        การชำระเงิน
      </a>
      <a  href="#contact"
          class="btn btn-transparent btn-block btn-lg scrollactive-item">
        <i class="fas fa-address-book btn-inner-icon-lg" />
        ข้อมูลการติดต่อ
      </a>
      <template v-if="userIsAdmin">
        <div class="w-100 border-b mb-3"></div>
        <h3 class="mb-3">Admin</h3>
        <router-link  :to="{ name: 'editsubmission', params: { id: 123456 } }"
                      tag="a"
                      class="btn btn-transparent btn-block btn-lg">
          <i class="fas fa-edit btn-inner-icon-lg" />
          แก้ไขการส่งตัวอย่าง          
        </router-link>
        <a  class="btn btn-transparent btn-block btn-lg"
            @click="showCancelSubmissionModal()">
          <i class="fas fa-window-close btn-inner-icon-lg" />
          ยกเลิก
        </a>
      </template>
    </scrollactive>
  </div>
  
  <div class="sub-nav-content">
    <div id="info"
         class="section">
      <h2 class="mb-4">
        <i class="fas fa-file-alt icon-lg" />
        การส่งตัวอย่างหมายเลข <span class="text-primary">{{ `${$route.params.id}` }}</span>
      </h2>

      <div class="row">
        <div class="col-2">
          <h4>สถานะ</h4>
        </div>
        <div class="col-10 pt-1">
          <div class="form-row">
            <div class="form-group col-6">
              <ColorTag
                class="d-block"
                :color="submissionStatusData[submission.status].color"
                :label="submissionStatusData[submission.status].label"
                size="lg" />
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
            <FileView
              class="col-6"
              btn-class="btn-secondary"
              :file-name="`${$route.params.id}_submission_form.pdf`"
              icon-class="fa-file-alt" />
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-2">
          <h4>ข้อมูลการส่งตัวอย่าง</h4>
        </div>
        <div class="col-10 pt-1">
          <div class="form-row">
            <div class="col-6 mb-3">
              <ColorTag
                class="d-block"
                :color="submissionTypeData[submission.type].color"
                :label="submissionTypeData[submission.type].label"
                size="lg" />
            </div>
            <div class="w-100"></div>
            <FormInput
              class="col-4"
              label="หมายเลขการส่งตัวอย่าง"
              :value="submission.id"
              disabled />
            <FormInput
              class="col-4"
              label="หมายเลขรับตัวอย่าง"
              :value="submission.receptionNum"
              disabled />
            <div class="w-100"></div>
            <FormDateInput
              class="col-4"
              label="วันที่ส่งตัวอย่าง"
              format="dd/MM/yy"
              disabled
              :value="submission.submitDate" />
            <FormDateInput  
              class="col-4"
              label="วันที่รับตัวอย่าง"
              format="dd/MM/yy"
              disabled
              :value="submission.receivedDate" />

            <FormInput
              class="col-8"
              label="ชื่อผู้ส่ง"
              disabled
              :value="`${submission.submitter.title}${submission.submitter.firstName} ${submission.submitter.lastName}`" />
            <FormInput
              class="col-8"
              label="องค์กรเจ้าของตัวอย่าง"
              disabled
              :value="submission.org.name" />
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
        <div class="row color-dark-grey border-b py-2">
          <div class="col-2">
            <h4 class="mb-0">เลขที่รายงาน</h4>
          </div>
          <div class="col-1">
            <h4 class="mb-0">สถานะ</h4>
          </div>
          <div class="col-2">
            <h4 class="mb-0">วันที่</h4>
          </div>
          <div class="col-4">
            <h4 class="mb-0">รายละเอียด</h4>
          </div>
          <div class="col-1">
            <h4 class="mb-0">ดูไฟล์</h4>
          </div>
          <div class="col-2">
            <h4 class="mb-0">ดาวน์โหลด</h4>
          </div>
        </div>

        <div  v-for="(report, idx) in submission.reports"
              :key="idx"
              class="row py-1 border-b">
          <div class="col-2 d-flex align-items-center">
            <h5 class="mb-0">{{ report.id }}</h5>
          </div>
          <div class="col-1 d-flex align-items-center">
            <h5 class="mb-0">{{ report.status }}</h5>
          </div>
          <div class="col-2 d-flex align-items-center">
            <h5 class="mb-0">{{ report.date }}</h5>
          </div>
          <div class="col-4 d-flex align-items-center">
            <h5 class="mb-0">{{ report.details }}</h5>
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
            <button class="btn btn-primary"
                    @click="downloadAllReports()">
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
            <FormInput
              class="col-4"
              label="อีเมล"
              disabled
              :value="submission.submitter.email" />
            <FormInput
              class="col-4"
              label="หมายเลขโทรศัพท์"
              disabled
              :value="submission.submitter.phone" />
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
              <ColorTag
                class="d-block"
                :color="submissionInvoiceStatusData[submission.invoiceStatus].color"
                :label="submissionInvoiceStatusData[submission.invoiceStatus].label"
                size="lg" />
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
            <FileView
              class="col-6"
              btn-class="btn-secondary"
              :file-name="`${$route.params.id}_invoice.pdf`"
              icon-class="fa-file-invoice-dollar" />
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
              <h1 class="text-primary">
                {{ `${submission.finalPrice.toLocaleString()}฿` }}
              </h1>
              <h4 class="text-medium">*ค่าบริการโดยประมาน</h4>
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
            <FormInput
              class="col-8"
              label="ชื่อ-นามสกุล"
              disabled
              :value="`${submission.submitter.title}${submission.submitter.firstName} ${submission.submitter.lastName}`" />
            <div class="w-100"></div>
            <FormInput
              class="col-4"
              label="อีเมล"
              disabled
              :value="submission.submitter.email" />
            <FormInput
              class="col-4"
              label="หมายเลขโทรศัพท์"
              disabled
              :value="submission.submitter.phone" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <h4>ติดต่อองค์กร</h4>
        </div>
        <div class="col-10">
          <div class="form-row">
            <FormInput
              class="col-8"
              label="ชื่อองค์กร"
              disabled
              :value="submission.org.name" />
            <FormTextarea
              class="col-8"
              label="ที่อยู่"
              rows="3"
              disabled
              :value="submission.org.addr" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal  modal-id="cancelSubmissionModal"
          modal-dialog-class="modal-sm modal-dialog-centered"
          x-close>
    <template #modal-header>
      <h3 class="text-danger">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ยืนยันการยกเลิก
      </h3>
    </template>
    <template #modal-body>
      <h4>ท่านกำลังจะยกเลิกการส่งตัวอย่าง</h4>
      <h3 class="mt-2 text-center text-danger">{{ `#${$route.params.id}` }}</h3>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button"
                class="btn btn-secondary w-50"
                data-dismiss="modal">
          กลับไป
        </button>
        <button type="button"
                class="btn btn-danger ml-2 w-100"
                @click="adminCancelSubmission()">
          ยืนยันว่าจะยกเลิก
        </button>
      </div>
    </template>
  </Modal>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  name: 'view-submission',
  computed: {
    ...mapGetters([
      'userIsAdmin',
      'submissionTypeData',
      'submissionStatusData',
      'submissionInvoiceStatusData'
    ])
  },
  data () {
    return {
      submission: {
        id: 44556677,
        org: {
          id: 1,
          name: 'ฟาร์มสมควร',
          phone: '087-654-3210',
          addr: '123 ทองหล่อ ซ.12 ถนนสุขุมวิท\nแขวงคลองตันเหนือ เขตวัฒนา\nกรุงเทพฯ 10110',
        },
        submitter: {
          id: 1,
          accountType: 1,
          org: 1,
          customerList: [],
          title: 'นาย',
          firstName: 'สมควร',
          lastName: 'สมสกุล',
          email: 'mr.somkuan@gmail.com',
          phone: '081-234-5678',
          nationalId: null
        },
        type: 1,
        status: 3,
        invoiceStatus: 2,
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
      },
    }
  },
  methods: {
    downloadAllReports () {
    },
    adminCancelSubmission () {
      $('#cancelSubmissionModal').modal('hide')
    },
    showCancelSubmissionModal () {
      $('#cancelSubmissionModal').modal('show')
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  font-family: 'CS ChatThai';
  border-bottom: 1px solid $accent;
  padding: 2em 1em;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    margin-bottom: 55vh;
  }
}
.btn.back-btn {
  @include media-breakpoint-up(xl) {
    position: absolute;
    top: 15px;
    left: -100px;
  }
}
</style>