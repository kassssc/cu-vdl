<template>
<div class="page page-md d-flex flex-column content-height-min">
  <template v-if="!$apollo.queries.auth.loading">
    
    <div class="my-2 position-relative">
      <button v-if="isEditMode || auth.isAdmin"
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
        <div  v-for="(section, idx) of submission.submissionData.batches"
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
            <FormSelect
              v-if="auth.isAdmin && !isEditMode"
              class="col-4"
              form-label="ผู้ส่งตัวอย่าง"
              :clearable="false"
              :reduce="option => option.index"
              :get-option-label="o => `${o.title}${o.first_name} ${o.last_name}`"
              :options="submitters"
              required
              v-model="submission.submitter" />
            <FormInput
              v-else-if="submitterDetail"
              class="col-4"
              label="ผู้ส่งตัวอย่าง"
              disabled  
              :value="submitterFullName" />
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
              form-label="เจ้าของตัวอย่าง/ฟาร์ม"
              :clearable="false"
              :reduce="option => option.index"
              :get-option-label="option => option.name"
              :options="ownerOrgs"
              :disabled="!submission.submitter"
              @input="onOwnerOrgChange($event)"
              required
              v-model="submission.sampleOwnerOrg" />
            <transition name="fade">
              <FormInput
                v-if="submission.sampleOwnerOrg === null"
                class="col-6"
                label="ระบุชื่อ องค์กร/ฟาร์ม"
                required
                v-model="submission.sampleOwnerName" />
            </transition>
            <div class="w-100"></div>
            <div class="form-group mb-0 pb-4 col-6">
              <label>Invoice ไปที่
                <i class="fas fa-star-of-life" />
              </label>
              <div class="d-flex justify-content-between">
                <button class="btn radio-btn"
                        :disabled="!submission.sampleOwnerOrg || !submission.submitter"
                        @click="invoiceToOwner()">
                  <div  class="box"
                        :class="{'chosen': invoiceToChoice === 'owner'}">
                    <div class="box-chosen"></div>
                  </div>
                  เจ้าของตัวอย่าง/ฟาร์ม
                </button>
                <button class="btn radio-btn"
                        @click="invoiceToSelf()"
                        :disabled="!submission.submitter">
                  <div  class="box"
                        :class="{'chosen': invoiceToChoice === 'self'}">
                    <div class="box-chosen"></div>
                  </div>
                  ตนเอง
                </button>
                <button class="btn radio-btn"
                        @click="invoiceToCompany()"
                        :disabled="!submission.submitter">
                  <div  class="box"
                        :class="{'chosen': invoiceToChoice === 'company'}">
                    <div class="box-chosen"></div>
                  </div>
                  บริษัท
                </button>
              </div>
            </div>
            <transition name="fade">
              <FormSelect
                v-if="invoiceToChoice === 'company'"
                class="col-6"
                label="name"
                form-label="เลือกบริษัท"
                :clearable="false"
                :reduce="option => option.index"
                :get-option-label="option => option.name"
                :options="companyOrgs"
                required
                v-model="submission.invoiceTo" />
            </transition>
          </div>
          <div class="form-row mb-4">
            <FormInlineSelect
              class="col-8 col-xl-6"
              label="ประเภทการตรวจ"
              label-class="label-lg"
              :btn-class-list="['teal', 'blue']"
              v-model="submission.submissionType"
              :options="submissionTypes"
              :disabled="isEditMode"
              :warn-before-change="wholeFormHasInformation()"
              warning-msg="ข้อมูลที่ถูกกรอกไว้แล้วด้านล่างจะหายไปถ้าท่านเปลี่ยนตัวเลือกนี้"
              @change="onSubmissionTypeChange()" />
          </div>
  
  
          <transition name="fade-no-delay">
            <div  v-if="isGeneralSubmission"
                  class="form-row mb-4">
              <FormSuggestInput
                class="col-4"
                label="ประเภทตัวอย่าง"
                :list="['เลือด', 'เสมหะ', 'นํ้าลาย', 'เนื้อ']"
                filter-by-query
                v-model="submission.submissionData.submissionDetails.sampleType" />
              <FormDateInput
                v-if="isGeneralSubmission"
                class="col-2"
                label="วันที่เก็บตัวอย่าง"
                format="dd/MM/yy"
                required
                v-model="submission.submissionData.submissionDetails.sampleTakenDate" />
              <div class="w-100"></div>
              <FormSuggestInput
                class="col-3"
                label="ชนิดสัตว์"
                :list="['สุกร', 'สุนัข', 'กระต่าย', 'ม้า']"
                filter-by-query
                v-model="submission.submissionData.submissionDetails.animalType" />
              <FormInput
                class="col-3"
                type="text"
                label="พันธุ์"
                v-model="submission.submissionData.submissionDetails.animalSpecies" />
              <FormInput
                class="col-4"
                type="text"
                label="อายุสัตว์"
                v-model="submission.submissionData.submissionDetails.animalAge" />
              <FormInput
                class="col-2"
                type="number"
                label="จำนวนที่เลี้ยง"
                v-model.number="submission.submissionData.submissionDetails.animalCount" />
              <FormTextarea 
                class="col-6"
                type="text"
                label="ประวัติการป่วย"
                rows="2"
                resizable
                v-model="submission.submissionData.submissionDetails.illness" />
              <FormTextarea
                class="col-6"
                type="text"
                label="ประวัติการทำวัคซีน"
                rows="2"
                resizable
                v-model="submission.submissionData.submissionDetails.vaccinations" />
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
              <checkbox class="mb-1"
                        label="อีเมล"
                        label-class="label-lg"
                        :disabled="!submitterDetail"
                        v-model="submission.notificationEmail" />
              <input  type="text"
                      class="form-control"
                      :class="{'text-muted': !submission.notificationEmail}"
                      :value="submitterDetail? submitterDetail.email : ''"
                      disabled >
            </div>
            <div class="form-group col-4">
              <checkbox class="mb-1"
                        label="โทรศัพท์"
                        label-class="label-lg"
                        :disabled="!submitterDetail"
                        v-model="submission.notificationPhone" />
              <input  type="text"
                      class="form-control"
                      :class="{'text-muted': !submission.notificationPhone}"
                      :value="submitterDetail? submitterDetail.phone : ''"
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
                          v-model="submission.submissionData.reportLang.thai" />
                <checkbox label="English"
                          label-class="label-lg"
                          v-model="submission.submissionData.reportLang.eng" />
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
          v-for="(batch, idxBatch) of submission.submissionData.batches"
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
          v-for="(batch, idxBatch) of submission.submissionData.batches"
          :key="idxBatch"
          :id="`batch${idxBatch+1}`"
          :idx="idxBatch"
          :has-multiple-batches="hasMultipleBatches"
          :batch="batch"
          :report-lang="submission.submissionData.reportLang"
          :is-edit-mode="isEditMode"
          @delete-batch="deleteBatch(idxBatch)" />
      </template>
    </div>
  
    <button class="btn btn-secondary align-self-center mt-4 font-chatthai btn-wide"
            :disabled="!batchHasInfo(submission.submissionData.batches[submission.submissionData.batches.length-1])"
            @click="addBatch()">
        <i class="fas fa-plus btn-inner-icon" />
      {{ addBatchLabel }}
    </button>
  
    <button class="btn btn-success align-self-center px-5 my-5 btn-lg btn-wide"
            @click="inReviewMode = true">
      <i class="fas fa-check btn-inner-icon" />
      {{ reviewAndSubmitLabel }}
    </button>
  
    <transition name="fade">
      <ReviewSubmission
        v-if="inReviewMode"
        :submission="submission"
        :user="submitterDetail"
        :is-edit-mode="isEditMode"
        @back="inReviewMode = false"
        @submit="sendSubmission()" />
    </transition>
  
    <Modal  modal-id="submittedModal"
            data-backdrop="static">
      <template #modal-body>
        <div class="d-flex flex-column align-items-center justify-content-center w-100 px-3">
          <template v-if="!submitting">
            <h3 class="text-dark text-center mb-4">
              {{ isEditMode? 'การแก้ไขถูกบันทึกเรียบร้อยแล้ว' : 'การส่งแบบฟอร์มเสร็จเรียบร้อย' }}
            </h3>
            <i class="fas fa-check icon-huge text-success mb-4" />
            <h4 class="text-medium text-center mx-5 px-4">
              กรุณาปริ้นสลิปการส่งตัวอย่างลงกระดาษ และแนบมากับตัวอย่างที่ส่งมาเพื่อตรวจ
            </h4>
            <button class="btn btn-primary w-100 mt-4">
              <i class="fas fa-print btn-inner-icon"></i>ปริ้นสลิปการส่งตัวอย่าง
            </button>
            <button class="btn btn-secondary w-100 mt-3"
                    @click="goToSubmissionsList()">
              เรียบร้อย
            </button>
          </template>
          <template v-else>
            <h3 class="mb-4 text-dark">กำลังส่งข้อมูลเข้าระบบ</h3>
            <LoadingAnimation color="primary" size="lg" />
          </template>
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
//import smoothReflow from 'vue-smooth-reflow'
import { getJWT } from '@/vue-apollo'
import { SEND_SUBMISSION, SUBMISSION_FORM_DATA } from '@/graphql/submission'
import { AUTH_DATA } from '@/graphql/local'
import { USERS_LIST, USER_DETAIL } from '@/graphql/user'

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
        submissionType: 'การตรวจทั่วไป',
        submitter: null,
        submitDate: null,
        sampleOwnerOrg: undefined,
        sampleOwnerName: null,
        invoiceTo: null,
        notificationEmail: true,
        notificationPhone: false,
        submissionData: {
          batches: [{}]
        },
      },
      submitting: false,
      invoiceToChoice: null,
      inReviewMode: false,
      submissionTypes: [
        { id: 'การตรวจทั่วไป',            name: 'การตรวจทั่วไป' },
        { id: 'ทดสอบประสิทธิภาพยาฆ่าเชื้อ',  name: 'ทดสอบประสิทธิภาพยาฆ่าเชื้อ' }
      ],
      DEV_VIEW_JSON: false
    }
  },
  computed: {
    isGeneralSubmission () {
      return this.submission.submissionType === 'การตรวจทั่วไป'
    },
    isDisinfectantSubmission () {
      return this.submission.submissionType === 'ทดสอบประสิทธิภาพยาฆ่าเชื้อ'
    },
    hasMultipleBatches () {
      return this.submission.submissionData.batches.length > 1
    },
    noLang () {
      return this.isDisinfectantSubmission && !this.submission.submissionData.reportLang.thai && !this.submission.submissionData.reportLang.eng
    },
    isEditMode () {
      return !!this.$route.params.id
    },
    addBatchLabel () {
      return  this.isGeneralSubmission? 'เพิ่มกลุ่มการทดสอบ' :
              this.isDisinfectantSubmission? 'เพิ่มรายการยาฆ่าเชื้อ' : ''
    },
    reviewAndSubmitLabel () {
      return `สรุปและ${this.isEditMode? 'บันทึก' : 'ส่ง'}`
    },
    submitterFullName () {
      return this.isEditMode? this.submission.submitterName : `${this.submitterDetail.title}${this.submitterDetail.first_name} ${this.submitterDetail.last_name}`
    },
    ownerOrgs () {
      if (!this.submitterDetail) return []
      return [ ...this.submitterDetail.submitter_of.filter(org => org.org_type == 1), { index: null, name: '* องค์กร/ฟาร์ม อื่นๆที่ไม่มีชื่อในระบบ *'} ]
    },
    companyOrgs () {
      if (!this.submitterDetail) return []
      return this.submitterDetail.submitter_of.filter(org => org.org_type == 2)
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
    if (!this.isEditMode) {
      this.submission.submitDate = new Date().toISOString()
      this.onSubmissionTypeChange()
    }
    //this.$smoothReflow({el: '#info'})
    //this.$smoothReflow({el: '#report'})
  },
  methods: {
    async sendSubmission () {
      this.inReviewMode = false
      this.submitting = true
      $('#submittedModal').modal('toggle')
      const {
        submissionType,
        submitter,
        sampleOwnerName,
        sampleOwnerOrg,
        invoiceTo,
        notificationEmail,
        notificationPhone
      } = this.submission
      const submissionData = JSON.stringify(this.submission.submissionData)
      try {
        let res = await this.$apollo.mutate({
          mutation: SEND_SUBMISSION,
          variables: {
            jwt: getJWT(),
            submissionType,
            submitter,
            sampleOwnerName,
            sampleOwnerOrg,
            invoiceTo,
            notificationEmail,
            notificationPhone,
            submissionData
          }
        })
        console.log(res)
        this.submitting = false
      } catch (err) {
        console.log(err)
        this.submitting = false
      }
    },

    onSubmissionTypeChange () {
      // General type
      if (this.isGeneralSubmission) {
        this.submission.submissionData = {
          batches: [],
          submissionDetails: {
            sampleTakenDate: null,
            sampleType: null,
            animalType: null,
            animalSpecies: null,
            animalAge: null,
            animalCount: null,
            illness: null,
            vaccinations: null,
          }
        }
      // Disinfectant Type
      } else if (this.isDisinfectantSubmission) {
        this.submission.submissionData = {
          batches: [],
          reportLang: {
            thai: true,
            eng: false
          }
        }
      }
      this.submission.submissionData.batches.push(this.generateNewBatch())
    },

    generateNewBatch () {
      let newBatch
      // General type
      if (this.isGeneralSubmission) {
        newBatch = {
          sampleCount: null,
          totalPrice: 0,
          tests: {
            'แบคทีเรียวิทยา': null,
            'อณูชีววิทยา': null,
            'ซีรั่มวิทยา': null,
            'ไวรัสวิทยา': null
          },
          samples: []
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
          tests: {}
        }
      }
      return newBatch
    },

    addBatch () {
      this.submission.submissionData.batches.push(this.generateNewBatch())
      this.$nextTick( () => {
        setTimeout( () => {
          const batch = document.getElementById(`${this.submission.submissionData.batches.length}`)
          if (batch) batch.classList.remove('expand-in-batch')
        }, 400)
        this.$scrollTo(
          `#batch${this.submission.submissionData.batches.length}`,
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
          this.submission.submissionData.batches.splice(idx, 1)
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
      const submissionDetailSectionHasInfo = this.isGeneralSubmission && 
        Object.values(this.submission.submissionData.submissionDetails).reduce( (hasInfo, info) => hasInfo || !!info, false)
      const batchesHaveInfo = this.submission.submissionData.batches
        .reduce( (hasInfo, batch) => hasInfo || this.batchHasInfo(batch), false)
      return submissionDetailSectionHasInfo || batchesHaveInfo
    },
    batchHasInfo (batch) {
      return !!batch.sampleCount || batch.totalPrice > 0
    },
    goToSubmissionsList () {
      $('#submittedModal').modal('toggle')
      this.$router.push({ name: 'submissionslist' })
    },
    goToViewSubmission (submissionKey) {
      $('#submittedModal').modal('toggle')
      this.$router.push({ name: 'viewsubmission', params: { id: submissionKey } })
    },
    invoiceToOwner () {
      this.invoiceToChoice = 'owner'
      this.submission.invoiceTo = this.submission.sampleOwnerOrg
    },
    invoiceToSelf () {
      this.invoiceToChoice = 'self'
      this.submission.invoiceTo = null
    },
    invoiceToCompany () {
      this.invoiceToChoice = 'company'
      this.submission.invoiceTo = null
    },
    onOwnerOrgChange (newOwnerOrg) {
      // Invoice to owner
      if (this.invoiceToChoice === 'owner') {
        if (newOwnerOrg === null) {
          this.invoiceToChoice = null
          this.submission.invoiceTo = null
        } else {
          this.submission.invoiceTo = newOwnerOrg
        }
      }

      if (newOwnerOrg === null) {
        this.submission.sampleOwnerName = ''
      } else {
        this.submission.sampleOwnerName = this.ownerOrgs.find(o => o.index === newOwnerOrg).name
      }
    }
  },
  apollo: {
    auth: {
      query: AUTH_DATA,
      update: data => data.auth,
      result (res) {
        if (!res.data.auth.isAdmin) {
          this.submission.submitter = res.data.auth.userIndex
        }
      }
    },
    submitterDetail: {
      query: USER_DETAIL,
      variables () {
        return {
          jwt: getJWT(),
          index: this.submission.submitter
        }
      },
      update: data => data.get_backuser.result[0],
      skip () {
        return !this.submission.submitter
      }
    },
    submitters: {
      query: USERS_LIST,
      variables () {
        return {
          jwt: getJWT(),
          searchQuery: '',
          accountActive: true,
          accountType: 201
        }
      },
      update: data => data.search_backuser.result,
      skip () {
        return !this.auth || !this.auth.isAdmin
      }
    },
    submissionRaw: {
      query: SUBMISSION_FORM_DATA,
      variables () {
        return {
          jwt: getJWT(),
          key: [this.$route.params.id]
        }
      },
      update: data => data.get_submission.result[0],
      result (res) {
        const {
          submission_type,
          submitter,
          submit_date,
          sample_owner_org,
          sample_owner_name,
          invoice_to,
          notification_email,
          notification_phone,
          submission_data
        } = res.data.get_submission.result[0]
        this.submission = {
          submissionType: submission_type,
          submitter: submitter.index,
          submitDate: new Date(parseInt(submit_date)),
          sampleOwnerOrg: sample_owner_org[0].index,
          sampleOwnerName: sample_owner_name,
          invoiceTo: invoice_to[0].index,
          notificationEmail: notification_email,
          notificationPhone: notification_phone,
          submissionData: JSON.parse(submission_data)
        }

        if (this.submission.sampleOwnerOrg == this.submission.invoiceTo) {
          this.invoiceToChoice = 'owner'
        } else if (this.submission.invoiceTo) {
          this.invoiceToChoice = 'company'
        } else {
          this.invoiceToChoice = 'self'
        }
      },
      skip () { return !this.isEditMode }
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