<template>
<div class="page page-md d-flex flex-column content-height-min">
  <template v-if="!$apollo.loading">
    
    <div class="my-2 position-relative">
      <button v-if="isEditMode"
              class="btn back-btn btn-transparent"
              @click="$router.go(-1)">
        <i class="fas fa-chevron-left mr-2" />กลับไป
      </button>
      <i class="fas fa-vial icon-lg"></i>
      <h3 class="d-inline">
        {{ isEditMode? `แก้ไขการส่งตัวอย่าง #${$route.params.id}` : 'ส่งตัวอย่าง'}}
      </h3>
    </div>
  
    <div class="submit-samples-nav d-flex align-items-center p-2">
      <scrollactive active-class="scrollactive-active"
                    :offset="250"
                    :modify-url="false"
                    highlight-first-item
                    class="d-flex align-items-center">
        <a  href="#info"
            class="btn btn-transparent btn-sm scrollactive-item">
          ข้อมูลเบื้องต้น
        </a>
        <i class="fas fa-long-arrow-alt-right mx-1" />
        <a  href="#report"
            class="btn btn-transparent btn-sm scrollactive-item">
          รายงาน
        </a>
        <i class="fas fa-long-arrow-alt-right mx-1" />
        <div  v-for="(section, idx) of submission.batches"
              :key="idx"
              class="d-flex align-items-center">
          <a  :href="'#batch' + (idx+1)"
              class="btn btn-transparent btn-sm scrollactive-item">
            {{ getBatchNavLabel(idx + 1) }}
          </a>
          <i class="fas fa-long-arrow-alt-right mx-1" />
        </div>
      </scrollactive>
      <button class="btn btn-transparent btn-sm"
              @click="inReviewMode = true">
        {{ reviewAndSubmitLabel }}
      </button>
    </div>
  
    <div  id="sample-info-form"
          class="font-chatthai d-flex flex-column align-items-center px-3 py-0 max-width-1250">    
      
      <div id="info" class="border-b row w-100 pt-4 pt-xl-5">
        <div class="col-xl-2 col-12">
          <h3 class="mb-2">ข้อมูลเบื้องต้น</h3>
        </div>
        <div class="col-12 col-xl-10">
          <div class="form-row mb-4">
            <FormInput
              class="col-4"
              label="ชื่อผู้ส่ง"
              disabled  
              :value="submitterNameValue" />
            <FormDateInput
              class="col-2"
              label="วันที่ส่งตัวอย่าง"
              format="dd/MM/yy"
              disabled
              :value="submission.submitDate" />
          </div>
          <div class="form-row mb-4">
            <FormSelect
              class="col-6"
              label="name"
              form-label="องค์กร/ฟาร์ม เจ้าของตัวอย่าง"
              :clearable="false"
              :reduce="option => option.index"
              :get-option-label="option => option.name"
              :options="selectSampleOwner"
              @input="onOwnerOrgChange($event)"
              required
              v-model="submission.sampleOwnerOrg" />
            <FormInput
              v-if="submission.sampleOwnerOrg === null"
              class="col-6"
              label="ระบุชื่อ องค์กร/ฟาร์ม"
              required
              v-model="submission.sampleOwnerOrgName" />
            <div class="w-100"></div>
            <div class="form-group mb-0 pb-4 col-6">
              <label>Invoice ไปที่
                <i class="fas fa-star-of-life" />
              </label>
              <div class="d-flex justify-content-between">
                <button class="btn radio-btn"
                        :disabled="submission.sampleOwnerOrg === null"
                        @click="invoiceToOwner()">
                  <div  class="box"
                        :class="{'chosen': invoiceTo === 1}">
                    <div class="box-chosen"></div>
                  </div>
                  องค์กร/ฟาร์ม เจ้าของตัวอย่าง
                </button>
                <button class="btn radio-btn"
                        @click="invoiceToSelf()">
                  <div  class="box"
                        :class="{'chosen': invoiceTo === 2}">
                    <div class="box-chosen"></div>
                  </div>
                  ตนเอง
                </button>
                <button class="btn radio-btn"
                        @click="invoiceToCompany()">
                  <div  class="box"
                        :class="{'chosen': invoiceTo === 3}">
                    <div class="box-chosen"></div>
                  </div>
                  บริษัท
                </button>
              </div>
            </div>
            <FormSelect
              v-if="invoiceTo === 3"
              class="col-6"
              label="name"
              form-label="เลือกบริษัท"
              :clearable="false"
              :reduce="option => option.index"
              :get-option-label="option => option.name"
              :options="companyOrgs"
              required
              v-model="submission.invoiceTo" />
          </div>
          <div class="form-row mb-4">
            <FormInlineSelect
              class="col-8 col-xl-6"
              label="ประเภทการตรวจ"
              label-class="label-lg"
              :btn-class-list="['teal', 'blue']"
              v-model="submission.type"
              :options="reportTypes"
              :disabled="isEditMode"
              :warn-before-change="wholeFormHasInformation()"
              warning-msg="ข้อมูลที่ถูกกรอกไว้แล้วด้านล่างจะหายไปถ้าท่านเปลี่ยนตัวเลือกนี้"
              @change="onReportTypeChange()" />
          </div>
  
  
          <transition name="fade-no-delay">
            <div  v-if="isGeneralSubmission"
                  class="form-row mb-4">
              <FormSuggestInput
                class="col-4"
                label="ประเภทตัวอย่าง"
                :list="['เลือด', 'เสมหะ', 'นํ้าลาย', 'เนื้อ']"
                filter-by-query
                v-model="submission.submissionDetails.sampleType" />
              <FormDateInput
                v-if="isGeneralSubmission"
                class="col-2"
                label="วันที่เก็บตัวอย่าง"
                format="dd/MM/yy"
                required
                v-model="submission.submissionDetails.sampleTakenDate" />
              <div class="w-100"></div>
              <FormSuggestInput
                class="col-3"
                label="ชนิดสัตว์"
                :list="['สุกร', 'สุนัข', 'กระต่าย', 'ม้า']"
                filter-by-query
                v-model="submission.submissionDetails.animalType" />
              <FormInput
                class="col-3"
                type="text"
                label="พันธุ์"
                v-model="submission.submissionDetails.animalSpecies" />
              <FormInput
                class="col-4"
                type="text"
                label="อายุสัตว์"
                v-model="submission.submissionDetails.animalAge" />
              <FormInput
                class="col-2"
                type="number"
                label="จำนวนที่เลี้ยง"
                v-model.number="submission.submissionDetails.animalCount" />
              <FormTextarea 
                class="col-6"
                type="text"
                label="ประวัติการป่วย"
                resizable
                rows="2"
                v-model="submission.submissionDetails.illness" />
              <FormTextarea
                class="col-6"
                type="text"
                label="ประวัติการทำวัคซีน"
                resizable
                rows="2"
                v-model="submission.submissionDetails.vaccinations" />
            </div>
          </transition>
        </div>
      </div>
      <!-- END INFO SECTION -->
    
      <div  id="report"
            class="row w-100 border-b-md-primary py-4">
        <div class="col-xl-2 col-12">
          <h3 class="mb-2">รายงาน</h3>
        </div>
        <div class="col-xl-10 col-12">
          <h4 class="text-dark">ช่องทางการแจ้งเตือน</h4>
          
          <div class="form-row mb-3 mt-1">
            <div class="form-group col-4">
              <checkbox label="อีเมล"
                        label-class="label-lg"
                        v-model="submission.reportNotifications.email" />
              <input  type="text"
                      class="form-control"
                      :class="{'text-muted': !submission.reportNotifications.email}"
                      :value="user.email"
                      disabled >
            </div>
            <div class="form-group col-4">
              <checkbox label="โทรศัพท์"
                        label-class="label-lg"
                        v-model="submission.reportNotifications.phone" />
              <input  type="text"
                      class="form-control"
                      :class="{'text-muted': !submission.reportNotifications.phone}"
                      :value="user.phone"
                      disabled >
            </div>
          </div>
  
          <div v-if="isDisinfectantSubmission">
            <h4 class="d-inline">รายงานเป็นภาษา </h4>
            <i class="fas fa-star-of-life text-primary icon-sm d-inline" />
            <div class="form-row mt-1">  
              <div class="form-group d-flex col-4">
                <checkbox label="ไทย"
                          class="mr-4"
                          label-class="label-lg"
                          v-model="submission.reportLang.thai" />
                <checkbox label="English"
                          label-class="label-lg"
                          v-model="submission.reportLang.eng" />
              </div>
              <div  v-if="noLang"
                    class="form-group d-flex align-items-center">
                <i class="fas fa-exclamation-triangle mr-1 text-primary" />
                <h5 class="text-primary">
                  กรุณาเลือกภาษารายงานอย่างน้อย 1 ภาษา
                </h5>              
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END REPORT SECTION -->
    
      <template v-if="isGeneralSubmission">
        <GeneralBatch
          v-for="(batch, idxBatch) of submission.batches"
          :key="idxBatch"
          :id="`batch${idxBatch+1}`"
          :idx="idxBatch"
          :has-multiple-batches="hasMultipleBatches"
          :batch="batch"
          :is-edit-mode="isEditMode"
          @delete-batch="deleteBatch(idxBatch)" />
      </template>
      <template v-else-if="!isGeneralSubmission && !noLang">
        <DisinfectantBatch
          v-for="(batch, idxBatch) of submission.batches"
          :key="idxBatch"
          :id="`batch${idxBatch+1}`"
          :idx="idxBatch"
          :has-multiple-batches="hasMultipleBatches"
          :batch="batch"
          :report-lang="submission.reportLang"
          :is-edit-mode="isEditMode"
          @delete-batch="deleteBatch(idxBatch)" />
      </template>
    </div>
  
    <button class="btn btn-secondary align-self-center mt-4 font-chatthai"
            :disabled="!submission.batches[submission.batches.length-1].hasInfo"
            @click="addBatch()">
        <i class="fas fa-plus btn-inner-icon" />
      {{ addBatchLabel }}
    </button>
  
    <button class="btn btn-primary align-self-center px-5 my-5 btn-lg"
            @click="inReviewMode = true">
      <i class="fas fa-check btn-inner-icon" />
      {{ reviewAndSubmitLabel }}
    </button>
  
    <transition name="fade">
      <ReviewSubmission
        v-if="inReviewMode"
        :submission="submission"
        :is-edit-mode="isEditMode"
        @back="inReviewMode = false"
        @submit="submit()" />
    </transition>
  
    <Modal  modal-id="submittedModal"
            data-backdrop="static">
      <template #modal-header>
        <h3 class="text-primary">
          <i class="fas fa-check icon-lg mr-2" />
          {{ isEditMode? 'การแก้ไขถูกบันทึกเรียบร้อยแล้ว' : 'การส่งแบบฟอร์มสำเร็จเรียบร้อย' }}
        </h3>
      </template>
      <template #modal-footer>
        <div class="d-flex flex-nowrap w-100">
          <button class="btn btn-secondary w-100 mr-3"
                  @click="goToSubmissionsList()">
            ไปหน้ารายการการส่งตัวอย่าง
          </button>
          <button class="btn btn-primary w-100"
                  @click="goToViewSubmission()">
            ไปดูข้อมูลการส่งตัวอย่าง
          </button>
        </div>
      </template>
    </Modal>
  
    <div class="font-chatthai">
      <button class="btn btn-lg mb-4 btn-dark font-chatthai align-self-center"
              @click="DEV_VIEW_JSON = !DEV_VIEW_JSON">
        DEV: {{DEV_VIEW_JSON? 'Hide' : 'View'}} JSON Form Data
      </button>
      <div v-if="DEV_VIEW_JSON">
        <h3>JSON Form Data</h3>
          <h4 class="text-default pre font-chatthai">
            {{ JSON.stringify(submission, null, '\t') }}
          </h4>
      </div>
    </div>
  </template>

</div>
</template>

<script>
import $ from 'jquery'
import smoothReflow from 'vue-smooth-reflow'
import { getJWT } from '@/vue-apollo'
import { USER_INDEX } from '@/graphql/local'
import { USER_DETAIL } from '@/graphql/user'

export default {
  name: 'submit-samples',
  components: {
    GeneralBatch: () => import(/* webpackChunkName: "group-submitsamples" */
      './GeneralBatch'
    ),
    DisinfectantBatch: () => import(/* webpackChunkName: "group-submitsamples" */
      './DisinfectantBatch'
    ),
    ReviewSubmission: () => import(/* webpackChunkName: "group-submitsamples" */
      './ReviewSubmission'
    )
  },
  //mixins: [smoothReflow],
  data () {
    return {
      submission: {
        type: 'general',
        submitter: null,
        submitDate: null,
        sampleOwnerOrg: undefined,
        sampleOwnerOrgName: null,
        invoiceTo: null,
        reportNotifications: {},
        submissionDetails: {},
        reportLang: null,
        batches: [{}]
      },
      invoiceTo: null,
      inReviewMode: false,
      reportTypes: [
        { id: 'general',      name: 'การตรวจทั่วไป' },
        { id: 'disinfectant', name: 'ทดสอบประสิทธิภาพยาฆ่าเชื้อ' }
      ],
      DEV_VIEW_JSON: false
    }
  },
  computed: {
    isGeneralSubmission () {
      return this.submission.type === 'general'
    },
    isDisinfectantSubmission () {
      return this.submission.type === 'disinfectant'
    },
    hasMultipleBatches () {
      return this.submission.batches.length > 1
    },
    noLang () {
      return this.isDisinfectantSubmission && !this.submission.reportLang.thai && !this.submission.reportLang.eng
    },
    isEditMode () {
      return !!this.$route.params.id
    },
    addBatchLabel () {
      return  this.isGeneralSubmission? 'เพิ่มกลุ่มการทดสอบ' :
              this.isDisinfectantSubmission? 'เพิ่มรายการนํ้ายาฆ่าเชื้อ' : ''
    },
    reviewAndSubmitLabel () {
      return `สรุปและ${this.isEditMode? 'บันทึก' : 'ส่ง'}`
    },
    submitterNameValue () {
      return this.isEditMode? this.submission.submitterName : `${this.user.title}${this.user.first_name} ${this.user.last_name}`
    },
    ownerOrgs () {
      return this.user.submitter_of.filter(org => org.org_type == 1)
    },
    companyOrgs () {
      return this.user.submitter_of.filter(org => org.org_type == 2)
    },
    selectSampleOwner () {
      return [...this.ownerOrgs, { index: null, name: '* องค์กร/ฟาร์ม อื่นๆที่ไม่มีชื่อในระบบ *'}]
    }
  },
  watch: {
    inReviewMode () {
      if (this.inReviewMode) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    }
  },
  mounted () {
    if (this.isEditMode) {
      this.submission = this.mockSubmission
    } else {
      this.submission.submitDate = new Date().toISOString()
      this.onReportTypeChange()
    }
    //this.$smoothReflow({el: '#info'})
    //this.$smoothReflow({el: '#report'})
  },
  methods: {
    onReportTypeChange () {
      // General type
      if (this.isGeneralSubmission) {
        this.submission.submissionDetails = {
          sampleTakenDate: null,
          sampleType: null,
          animalType: null,
          animalSpecies: null,
          animalAge: null,
          animalCount: null,
          illness: null,
          vaccinations: null,
        }
        this.submission.reportLang = null
      // Disinfectant Type
      } else if (this.isDisinfectantSubmission) {
        this.submission.submissionDetails = null
        this.submission.reportLang = {
          thai: true,
          eng: false
        }
      }
      this.submission.reportNotifications = {
        email: true,
        phone: false
      }
      this.submission.batches = []
      this.submission.batches.push(this.generateNewBatch())
    },

    generateNewBatch () {
      let newBatch
      // General type
      if (this.isGeneralSubmission) {
        newBatch = {
          sampleCount: null,
          totalPrice: 0,
          tests: {},
          samples: [],
          customTests: [],
          sensitivityTests: null,
          hasInfo: false
        }
      // Disinfectant Type
      } else if (this.isDisinfectantSubmission) {
        newBatch = {
          testType: null,
          disinfectantName: null,
          disinfectantNameEng: null,
          totalPrice: 0,
          toxicityTestCost: 0,
          uniqueCells: {},
          tests: {},
          hasInfo: false
        }
      }
      return newBatch
    },

    addBatch () {
      this.submission.batches.push(this.generateNewBatch())
      this.$nextTick( () => {
        setTimeout( () => {
          const batch = document.getElementById(`${this.submission.batches.length}`)
          if (batch) batch.classList.remove('expand-in-batch')
        }, 400)
        this.$scrollTo(
          `#batch${this.submission.batches.length}`,
          500,
          { offset: -200 }
        )
      })
    },

    deleteBatch (idx) {
      const batch = document.getElementById(`batch${idx+1}`)
      if (batch) {
        batch.classList.add('shrink-out-batch')
        setTimeout( () => {
          batch.classList.remove('shrink-out-batch')
          this.submission.batches.splice(idx, 1)
        }, 400)
        this.$nextTick( () => {
          this.$scrollTo(
            `#batch${idx}`,
            500,
            { offset: 0 }
          )
        })
      }
    },

    getBatchNavLabel (number) {
      return  (!this.hasMultipleBatches)? 'รายการทดสอบ' :
              (this.isGeneralSubmission)? `กลุ่ม ${number}` :
              (this.isDisinfectantSubmission)? `นํ้ายาฆ่าเชื้อ ${number}` : '???'
    },
    wholeFormHasInformation () {
      const sampleInfoSectionHasInfo = this.isGeneralSubmission && 
        Object.values(this.submission.submissionDetails).reduce( (hasInfo, info) => hasInfo || !!info, false)
      const batchesHaveInfo = this.submission.batches
        .reduce( (hasInfo, b) => hasInfo || b.hasInfo, false)
      return sampleInfoSectionHasInfo || batchesHaveInfo
    },
    submit () {
      this.inReviewMode = false
      $('#submittedModal').modal('toggle')
    },
    goToSubmissionsList () {
      $('#submittedModal').modal('toggle')
      this.$router.push({ name: 'submissionslist' })
    },
    goToViewSubmission () {
      $('#submittedModal').modal('toggle')
      this.$router.push({ name: 'viewsubmission', params: { id: 123456 } })
    },
    invoiceToOwner () {
      this.invoiceTo = 1
      this.submission.invoiceTo = this.submission.sampleOwnerOrg
    },
    invoiceToSelf () {
      this.invoiceTo = 2
      this.submission.invoiceTo = null
    },
    invoiceToCompany () {
      this.invoiceTo = 3
      this.submission.invoiceTo = null
    },
    onOwnerOrgChange (newOwnerOrg) {
      // Invoice to owner
      if (this.invoiceTo === 1) {
        // Deselect invoice option, null invoiced org
        if (newOwnerOrg === null) {
          this.invoiceTo = null
          this.submission.invoiceTo = null
        } else {
          this.submission.invoiceTo = newOwnerOrg
        }
      }

      if (newOwnerOrg === null) {
        this.submission.sampleOwnerOrgName = ''
      } else {
        this.submission.sampleOwnerOrgName = this.ownerOrgs.find(o => o.index === newOwnerOrg).name
      }
    }
  },
  apollo: {
    userIndex: {
      query: USER_INDEX,
      update: data => data.auth.userIndex,
      result (res, key) {
        this.submission.submitter = res.data.auth.userIndex
      }
    },
    user: {
      query: USER_DETAIL,
      variables () {
        return {
          jwt: getJWT(),
          index: this.userIndex
        }
      },
      update: data => data.get_backuser.result[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: 25vh;
}
.expand-in-batch {
  max-height: 8000px;
  opacity: 1;
  animation: expand-in-batch 700ms cubic-bezier(0.1, 1, 0.2, 1) forwards;
}
.shrink-out-batch {
  max-height: 0;
  opacity: 0;
  animation: shrink-out-batch 700ms cubic-bezier(0.1, 1, 0.2, 1) forwards;
}

.back-btn {
  position: absolute;
  top: 0;
  left: -120px;
}

.submit-samples-nav {
  position: sticky;
  top: $titlebar-height-scrolled;
  background: $light;
  border-bottom: 1px solid $accent;
  z-index: 99;
  box-shadow: 0 5px 5px -5px #333;
}
@keyframes expand-in-batch {
  0% {
    opacity: 0;
    height: 0px;
  }
  100% {
    opacity: 1;
    max-height: 8000px;
  }
}
@keyframes shrink-out-batch {
  0% {
    opacity: 1;
    max-height: 8000px;
  }
  100% {
    opacity: 0;
    max-height: 0px;
  }
}
</style>