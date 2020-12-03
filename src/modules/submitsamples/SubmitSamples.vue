<template>
<div class="page page-md d-flex flex-column">
  <template v-if="!$apollo.queries.auth.loading && (!edit_mode || (!$apollo.queries.submission_raw.loading && !$apollo.queries.user_detail.loading))">
    
    <div class="pt-5 pb-2 position-relative">
      <button v-if="edit_mode && auth.is_admin"
              class="btn back-btn btn-transparent"
              @click="$router.go(-1)">
        <i class="fas fa-chevron-left mr-2" />ยกเลิก
      </button>
      <i class="fas fa-vial icon-lg"></i>
      <h3 class="d-inline">
        {{ edit_mode? `แก้ไขการส่งตัวอย่าง #${$route.params.id}` : 'ส่งตัวอย่าง'}}
      </h3>
    </div>
  
    <div class="sticky-submenu d-flex align-items-center p-2">
      <scrollactive active-class="scrollactive-active"
                    :offset="250"
                    :modify-url="false"
                    highlight-first-item
                    class="d-flex align-items-center">
        <a  href="#info"
            class="btn btn-transparent btn-sm scrollactive-item">
          ข้อมูลเบื้องต้น
        </a>
        <i class="fas fa-long-arrow-alt-right mx-2" />
        <a  href="#report"
            class="btn btn-transparent btn-sm scrollactive-item">
          รายงาน
        </a>
        <i class="fas fa-long-arrow-alt-right mx-2" />
        <a  href="#submission_type"
            class="btn btn-transparent btn-sm scrollactive-item">
          ประเภทการทดสอบ
        </a>
        <i class="fas fa-long-arrow-alt-right mx-2" />
        <div  v-for="(section, idx) of submission.submission_batches"
              :key="idx"
              class="d-flex align-items-center">
          <a  :href="'#batch' + (idx+1)"
              class="btn btn-transparent btn-sm scrollactive-item">
            {{ get_batch_label(idx) }}
          </a>
          <i class="fas fa-long-arrow-alt-right mx-2" />
        </div>
      </scrollactive>
      <button class="btn btn-transparent btn-sm"
              @click="enter_review_mode()">
        {{ review_and_submit_label }}
      </button>
    </div>
  
    <div  id="sample-info-form"
          class="font-chatthai d-flex flex-column align-items-center px-3 py-0 max-width-1250 position-relative">    
      <div id="info" class="border-b row w-100 pt-4 pt-xl-5">
        <div class="col-md-2 col-12">
          <h3 class="mb-2">ข้อมูลเบื้องต้น</h3>
        </div>
        <div class="col-12 col-md-10 border-b mb-4 pb-4">
          <div class="form-row mb-3">
            <FormSelect
              v-if="auth.is_admin && !edit_mode"
              class="col-4 mb-2"
              form-label="ผู้ส่งตัวอย่าง"
              label="name"
              :reduce="o => o.index"
              :get-option-label="o => o.default_contact.name"
              :options="all_users"
              :clearable="false"
              :invalid="is_validated && !submission.backuser"
              error-msg="จำเป็นต้องเลือก"
              @input="on_submitter_change($event)"
              required
              v-model="submission.backuser" />
            <FormInput
              v-else-if="selected_submitter"
              class="col-4 mb-2"
              label="ผู้ส่งตัวอย่าง"
              disabled
              :value="submission.english_report? selected_submitter.name_eng : selected_submitter.name" />
            <FormDateInput
              class="col-2 mb-2"
              label="วันที่ส่งตัวอย่าง"
              format="dd/MM/yy"
              disabled
              :value="new Date()" />
            <div class="w-100"></div>
            <FormInput
              v-if="auth.is_admin && submission.english_report && !edit_mode"
              class="col-4 mb-2"
              disabled
              :value="selected_submitter.name_eng" />
            <div class="w-100"></div>
            <FormTextarea
              v-if="selected_submitter"
              class="col-4"
              disabled
              :value="submission.english_report? selected_submitter.address_eng : selected_submitter.address" />
          </div>

          <div class="form-row">
            <div class="form-group mb-0 col-6">
              <label class="text-medium">เจ้าของตัวอย่าง/ฟาร์ม
                <i class="fas fa-star-of-life" />
              </label>
              <div class="row no-gutters">
                <button class="btn radio-btn col-4"
                        :class="{'chosen': sample_owner_choice === 'self'}"
                        @click="sample_owner_self()"
                        :disabled="!submission.backuser">
                  <div  class="box">
                    <div class="box-chosen"></div>
                  </div>
                  {{ auth.is_admin? 'ผู้ส่งตัวอย่าง' : 'ตนเอง (ผู้ส่งตัวอย่าง)'}}
                </button>
                <button class="btn radio-btn col-4 pl-2"
                        :class="{'chosen': sample_owner_choice === 'other'}"
                        @click="sample_owner_other()"
                        :disabled="!submission.backuser">
                  <div  class="box">
                    <div class="box-chosen"></div>
                  </div>
                  อื่นๆ (เลือก)
                </button>
              </div>
              <div  v-if="is_validated && !sample_owner_choice && submission.backuser"
                    class="row no-gutters">
                <div class="col-12">
                  <ErrorBox msg="จำเป็นต้องเลือก" />
                </div>
              </div>
            </div>
            <template v-if="sample_owner_choice === 'other'">
              <div class="w-100"></div>
              <FormSelect
                class="col-6 my-2"
                placeholder="เลือก เจ้าของตัวอย่าง/ฟาร์ม..."
                label="name"
                :clearable="false"
                :reduce="o => o.index"
                :options="select_contacts"
                :invalid="is_validated && !submission.sample_owner"
                error-msg="จำเป็นต้องเลือก"
                @input="on_sample_owner_change($event)"
                v-model="submission.sample_owner" />
              <template v-if="submission.sample_owner && submission.sample_owner !== -1">
                <div class="w-100"></div>
                <FormTextarea
                  v-if="!submission.english_report"
                  class="col-6"
                  rows="3"
                  disabled
                  :value="selected_sample_owner.address" />
                <template v-else>
                  <template v-if="needs_english_info_sample_owner">
                    <div class="form-group col-6 font-cu">
                      <button   class="btn btn-secondary btn-block"
                                @click="show_add_english_info_modal(selected_sample_owner)">
                        <i class="fas fa-globe-americas btn-inner-icon"></i> เพิ่มข้อมูลภาษาอังกฤษ
                      </button>
                      <ErrorBox msg="ท่านต้องเพิ่มข้อมูลภาษาอังกฤษให้ Contact นี้" />
                    </div>
                  </template>
                  <template v-else>
                    <FormInput
                      class="col-6 mb-2"
                      disabled
                      :value="selected_sample_owner.name_eng" />
                    <div class="col-6"></div>
                    <FormTextarea
                      class="col-6"
                      rows="3"
                      disabled
                      :value="selected_sample_owner.address_eng" />
                  </template>
                </template>
              </template>
            </template>
          </div>
        </div>

        <div class="col-md-2 col-12">
          <!-- <h4 class="text-medium">Invoice</h4> -->
        </div>
        <div class="col-md-10 col-12 pb-4">
          <div class="form-row mb-4">
            <div class="form-group mb-0 col-6">
              <label class="text-medium">Invoice ไปที่
                <i class="fas fa-star-of-life" />
              </label>
              <div class="row no-gutters">
                <button class="btn radio-btn col-4"
                        :class="{'chosen': invoice_to_choice === 'self'}"
                        @click="invoice_to_self()"
                        :disabled="!submission.backuser">
                  <div  class="box">
                    <div class="box-chosen"></div>
                  </div>
                  {{ auth.is_admin? 'ผู้ส่งตัวอย่าง' : 'ตนเอง (ผู้ส่งตัวอย่าง)'}}
                </button>
                <button class="btn radio-btn col-5 pl-2"
                        :class="{'chosen': invoice_to_choice === 'owner'}"
                        :disabled="!submission.sample_owner || !submission.backuser || sample_owner_choice === 'self'"
                        @click="invoice_to_owner()">
                  <div  class="box">
                    <div class="box-chosen"></div>
                  </div>
                  เจ้าของตัวอย่าง/ฟาร์ม
                </button>
                <button class="btn radio-btn col-3"
                        :class="{'chosen': invoice_to_choice === 'other'}"
                        @click="invoice_to_other()"
                        :disabled="!submission.backuser">
                  <div  class="box">
                    <div class="box-chosen"></div>
                  </div>
                  อื่นๆ (เลือก)
                </button>
              </div>
              <div  v-if="is_validated && !invoice_to_choice && submission.backuser"
                    class="row no-gutters">
                <div class="col-12">
                  <ErrorBox msg="จำเป็นต้องเลือก" />
                </div>
              </div>
            </div>
            <div class="w-100"></div>
            <template v-if="invoice_to_choice === 'other'">
              <FormSelect
                class="col-6 my-2"
                placeholder="เลือก Invoice ไปที่..."
                label="name"
                :clearable="false"
                :reduce="o => o.index"
                :options="select_contacts"
                :invalid="is_validated && !submission.invoice_to"
                error-msg="จำเป็นต้องเลือก"
                @input="on_invoice_to_change($event)"
                v-model="submission.invoice_to" />
              <template v-if="submission.invoice_to && submission.invoice_to !== -1">
                <div class="w-100"></div>
                <FormTextarea
                  class="col-6"
                  rows="3"
                  disabled
                  :value="selected_invoice_to.address" />
              </template>
            </template>
          </div>

          <div class="form-row">
            <div class="form-group col-6">
              <label>ส่ง Invoice ทางไปรษณีย์</label>
              <checkbox
                label="ต้องการรับ Invoice ทางไปรษณีย์ (มีค่าใช้จ่ายเพิ่มเติม)"
                label-class="label-lg"
                v-model="submission.mail_invoice" />
            </div>
          </div>          
        </div>
      </div>

      <div  id="report"
            class="row w-100 border-b py-4">
        <div class="col-md-2 col-12 nowrap">
          <h3 class="mb-2">รายงาน</h3>
        </div>
        <div class="col-md-10 col-12">
          <div class="form-row mb-2">
            <div class="form-group col-6">
              <label class="text-medium">
                รายงานเป็นภาษา <i class="fas fa-star-of-life" />
              </label>
              <div class="row no-gutters">
                <button class="btn radio-btn col-4"
                        :class="{'chosen': !submission.english_report}"
                        @click="submission.english_report = false">
                  <div  class="box">
                    <div class="box-chosen"></div>
                  </div>
                  ไทย
                </button>
                <button class="btn radio-btn col-4 pl-2"
                        :class="{'chosen': submission.english_report}"
                        :disabled="!has_english_info_submitter"
                        @click="submission.english_report = true">
                  <div  class="box">
                    <div class="box-chosen"></div>
                  </div>
                  English
                </button>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-6">
              <label>ส่งรายงานทางไปรษณีย์</label>
              <checkbox
                label="ส่งรายงานให้ ผู้ส่งตัวอย่าง ทางไปรษณีย์ (มีค่าใช้จ่ายเพิ่มเติม)"
                label-class="label-lg"
                v-model="submission.mail_report_to_submitter" />
              <checkbox
                class="mt-2"
                v-if="submission.sample_owner && sample_owner_choice !== 'self'"
                label="ส่งรายงานให้ เจ้าของตัวอย่าง/ฟาร์ม ทางไปรษณีย์ (มีค่าใช้จ่ายเพิ่มเติม)"
                label-class="label-lg"
                v-model="submission.mail_report_to_sample_owner" />
            </div>
          </div>
        </div>
      </div>

      <div  id="submission_type"
            class="row w-100 border-b py-4">
        <div class="col-md-2 col-12 nowrap">
          <h3 class="mb-2">ประเภทการทดสอบ</h3>
        </div>
        <div class="col-md-10 col-12">
          <div class="form-row">
            <FormInlineSelect
              class="col-8 col-lg-6 mb-0"
              :btn-class-list="['primary', 'blue']"
              v-model="submission.submission_type"
              :options="submission_types"
              :disabled="edit_mode"
              :warn-before-change="form_has_information()"
              warning-msg="ข้อมูลที่ถูกกรอกไว้แล้วด้านล่างจะหายไปถ้าท่านเปลี่ยนตัวเลือกนี้"
              @change="on_submission_type_change()" />
          </div>
        </div>
        <transition name="fade-no-delay">
          <div v-if="is_general" class="row pt-4">
            <div class="col-md-2 col-12">
              <h4 class="mb-2 text-medium">ข้อมูลตัวอย่าง</h4>
            </div>
            <div class="col-12 col-md-10">
              <div class="form-row">
                <FormSuggestInput
                  v-if="suggest_lists"
                  class="col-4"
                  label="ประเภทตัวอย่าง"
                  :min-length="0"
                  :list="suggest_lists.sample_type"
                  filter-by-query
                  v-model="submission.sample_details.sample_type" />
                <FormDateInput
                  class="col-2"
                  label="วันที่เก็บตัวอย่าง"
                  format="dd/MM/yy"
                  v-model="submission.sample_details.sample_taken_date" />
                <div class="w-100"></div>
                <FormSuggestInput
                  v-if="suggest_lists"
                  class="col-4"
                  label="ชนิดสัตว์"
                  :min-length="0"
                  :list="suggest_lists.animal_type"
                  filter-by-query
                  v-model="submission.sample_details.animal_type" />
                <FormInput
                  class="col-4"
                  type="text"
                  label="พันธุ์"
                  v-model="submission.sample_details.animal_species" />
                <FormInput
                  class="col-2"
                  type="text"
                  label="อายุสัตว์"
                  v-model="submission.sample_details.animal_age" />
                <FormInput
                  class="col-2"
                  type="number"
                  label="จำนวนที่เลี้ยง"
                  v-model.number="submission.sample_details.animal_count" />
                <FormTextarea 
                  class="col-6"
                  type="text"
                  label="ประวัติการป่วย"
                  rows="2"
                  resizable
                  v-model="submission.sample_details.illness" />
                <FormTextarea
                  class="col-6"
                  type="text"
                  label="ประวัติการทำวัคซีน"
                  rows="2"
                  resizable
                  v-model="submission.sample_details.vaccinations" />
              </div>
            </div>
          </div>
        </transition>
      </div>
    
      <template v-if="is_general">
        <GeneralBatch
          v-for="(batch, idx_batch) of submission.submission_batches"
          :key="idx_batch"
          :id="`batch${idx_batch+1}`"
          :idx="idx_batch"
          :multiple_batches="multiple_batches"
          :batch="batch"
          :edit_mode="edit_mode"
          :is_validated="is_validated"
          @delete-batch="delete_batch(idx_batch)" />
      </template>
      <template v-else-if="is_disinfectant">
        <DisinfectantBatch
          v-for="(batch, idx_batch) of submission.submission_batches"
          :key="idx_batch"
          :id="`batch${idx_batch+1}`"
          :idx="idx_batch"
          :multiple_batches="multiple_batches"
          :batch="batch"
          :english_report="submission.english_report"
          :edit_mode="edit_mode"
          :is_validated="is_validated"
          @delete-batch="delete_batch(idx_batch)" />
      </template>

      <div  id="add_batch"
            class="row w-100 border-b py-4 font-cu">
        <div class="col-md-2 col-12"></div>
        <div class="col-md-10 col-12">
          <div class="form-row">
            <div class="form-group col-6 mb-0">
              <button class="btn btn-secondary btn-block"
                      :disabled="!batch_has_info(submission.submission_batches[submission.submission_batches.length-1])"
                      @click="add_batch()">
                  <i class="fas fa-plus btn-inner-icon" />
                {{ add_batch_label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div  id="remarks"
            class="row w-100 border-b py-4">
        <template v-if="multiple_batches">
          <div class="col-md-2 col-12">
            <h3 class="mb-2">ข้อมูลสรุป</h3>
          </div>
          <div class="col-md-10 col-12">
            <div class="form-row border-b mb-5">
              <div class="col-1 form-group text-right nowrap">
                <template v-if="is_general">
                  <h2 class="text-primary">
                    {{ submission_sample_count }}
                  </h2>
                  <h5 class="text-medium">ตัวอย่าง</h5>
                </template>
                <template v-else-if="is_disinfectant">
                  <h2 class="text-primary">
                    {{ submission.submission_batches.length }}
                  </h2>
                  <h5 class="text-medium">นํ้ายาฆ่าเชื้อ</h5>
                </template>
              </div>
              <div class="col-2 form-group text-right">
                <h2 class="text-primary">
                  {{ submission_test_count }}
                </h2>
                <h5 class="text-medium">รายการทดสอบ</h5>
              </div>
              <div class="col-1 form-group text-right nowrap">
                <h5 class="text-medium mt-2 ml-3">รวมเป็น</h5>
              </div>
              <div class="col-2 form-group text-right">
                <h2 class="text-primary">
                  {{ to_display_price(submission_price) }}
                </h2>
                <h5 class="text-medium">ค่าบริการ</h5>
              </div>
            </div>
          </div>
        </template>
        <div class="col-md-2 col-12">
          <h3 class="mb-2">หมายเหตุอื่นๆ</h3>
        </div>
        <div class="col-md-10 col-12">
          <div class="form-row">
            <FormTextarea
              class="col-6"
              type="text"
              rows="4"
              resizable
              v-model="submission.remarks" />
          </div>
        </div>
      </div>

      <div class="row w-100 font-cu py-5">
        <div class="col-12">
          <button class="btn btn-primary btn-lg btn-block"
                  @click="enter_review_mode()">
            <i class="fas fa-check btn-inner-icon" />
            {{ review_and_submit_label }}
          </button>
        </div>
        <div  v-if="is_validated && !form_complete()"
              class="col-12 mt-2">
          <ErrorBox msg="ข้อมูลในแบบฟอร์มมีปัญหา" />
        </div>
      </div>
    </div>
  
    <transition name="fade">
      <ReviewSubmission
        v-if="in_review_mode"
        :submission="submission"
        :user="user_detail"
        :sample_owner="selected_sample_owner"
        :invoice_to="selected_invoice_to"
        :edit_mode="edit_mode"
        @back="in_review_mode = false"
        @submit="on_submit()" />
    </transition>
  
    <ContactModal
      v-if="show_sample_owner_contact_modal"
      :user="user_detail"
      :submitter-contacts="select_contacts"
      :english-report="submission.english_report"
      @modal-close="on_sample_owner_contact_modal_close($event)" />
    <ContactModal
      v-if="show_invoice_to_contact_modal"
      :user="user_detail"
      :submitter-contacts="select_contacts"
      :english-report="submission.english_report"
      @modal-close="on_invoice_to_contact_modal_close($event)" />

    <Modal  modal-id="add-english-info-modal"
            data-backdrop="static"
            v-if="contact_to_add_english_info"
            x-close>
      <template #modal-header>
        <h3>เพิ่มข้อมูลภาษาอังกฤษ</h3>
      </template>
      <template #modal-body>
        <div class="form-row">
          <FormInput
            class="col-12"
            disabled
            :value="contact_to_add_english_info.name" />
          <FormTextarea
            class="col-12 mb-4"
            rows="3"
            disabled
            :value="contact_to_add_english_info.address" />
          <FormContactNameInput
            class="col-12 p-0"
            :contact-type="contact_to_add_english_info.contact_type"
            english
            v-model="add_english_info_modal.name_eng" />
          <FormAddressInput
            class="col-12 p-0"
            english
            v-model="add_english_info_modal.address_eng" />
        </div>
        <div class="form-row mt-4">
          <div class="form-group col-6 mb-0">
            <button type="button"
                    class="btn btn-secondary btn-block"
                    data-dismiss="modal">
              ยกเลิก
            </button>
          </div>
          <div class="form-group col-6 mb-0">
            <button type="button" class="btn btn-primary btn-block"
                    @click="submit_update_contact_english_info()">
              <i class="fas fa-check btn-inner-icon"></i>บันทึกข้อมูล
            </button>
          </div>
        </div>
      </template>
    </Modal>

    <Modal  modal-id="submitted-modal"
            data-backdrop="static">
      <template #modal-body>
        <div class="d-flex flex-column align-items-center justify-content-center w-100">
          <template v-if="!submitting">
            <h3 class="text-dark text-center mb-4">
              {{ edit_mode? 'การแก้ไขถูกบันทึกเรียบร้อยแล้ว' : 'การส่งแบบฟอร์มเสร็จเรียบร้อย' }}
            </h3>
            <i class="fas fa-check icon-huge text-success mb-4" />
            <template v-if="!edit_mode">
              <h4 class="text-medium text-center mx-5 px-4">
                กรุณาปริ้นสลิปการส่งตัวอย่างลงกระดาษ และแนบมากับตัวอย่างที่ส่งมาเพื่อตรวจ
              </h4>
              <DownloadSlip
                class="w-100 mt-4"
                btn-class="btn-primary"
                :submission-key="new_submission_key" />
            </template>
            <button class="btn btn-secondary w-100 mt-2"
                    @click="go_to_submissions_list()">
              เรียบร้อย
            </button>
          </template>
          <template v-else>
            <h3 class="mb-4 text-dark">กำลังส่งข้อมูลเข้าระบบ</h3>
            <LoadingAnimation class="mb-4" color="primary" size="lg" />
          </template>
        </div>
      </template>
    </Modal>
  
    <div class="font-chatthai">
      <h3>JSON Form Data</h3>
      <h4 class="text-default pre font-chatthai">
        {{ JSON.stringify(submission, null, '\t') }}
      </h4>
    </div>
  </template>

</div>
</template>

<script>
import $ from 'jquery'
import uniq from 'lodash/uniq'
//import smoothReflow from 'vue-smooth-reflow'
import { AUTH_DATA } from '@/graphql/local'
import { SEND_SUBMISSION, UPDATE_SUBMISSION, SUBMISSION_DETAIL } from '@/graphql/submission'
import { UPDATE_CONTACT_ENG_INFO } from '@/graphql/contact'
import { USERS_LIST, USER_DETAIL, SUBMITTERS_LIST } from '@/graphql/user'
import { SUGGEST_LIST } from '@/graphql/suggest_list'

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
    ),
    ContactModal: () => import(/* webpackChunkName: "group-submitsamples" */
      './ContactModal'
    ),
  },
  //mixins: [smoothReflow],
  data () {
    return {
      submission: {
        submission_type: 'การตรวจทั่วไป',
        backuser: null,
        submitter: null,
        sample_owner: null,
        invoice_to: null,
        english_report: false,
        mail_invoice: false,
        mail_report_to_submitter: false,
        mail_report_to_sample_owner: false,
        remarks: null,
        sample_details: null,
        submission_batches: []
      },
      is_validated: false,
      submitting: false,
      sample_owner_choice: null,
      invoice_to_choice: null,
      show_sample_owner_contact_modal: false,
      show_invoice_to_contact_modal: false,
      in_review_mode: false,
      contact_to_add_english_info: null,
      add_english_info_modal: {
        name_eng: null,
        address_eng: null
      },
      new_submission_key: '',
      submission_types: ['การตรวจทั่วไป', 'ทดสอบประสิทธิภาพยาฆ่าเชื้อ'],
    }
  },
  computed: {
    is_general () {
      return this.submission.submission_type === 'การตรวจทั่วไป'
    },
    is_disinfectant () {
      return this.submission.submission_type === 'ทดสอบประสิทธิภาพยาฆ่าเชื้อ'
    },
    multiple_batches () {
      return this.submission.submission_batches.length > 1
    },
    edit_mode () {
      return !!this.$route.params.id
    },
    submission_price () {
      return this.submission.submission_batches.reduce(
        (price, batch) => price += batch.price, 0
      )
    },
    submission_test_count () {
      return this.submission.submission_batches.reduce(
        (test_count, batch) => test_count += batch.test_count, 0
      )
    },
    submission_sample_count () {
      return this.submission.submission_batches.reduce(
        (sample_count, batch) => sample_count += batch.sample_count || 0, 0
      )
    },
    has_english_info_submitter () {
      if (!this.user_detail) return false
      return this.user_detail.default_contact.name_eng && this.user_detail.default_contact.address_eng
    },
    needs_english_info_sample_owner () {
      return this.submission.english_report && !this.contact_has_english_info(this.submission.sample_owner)
    },
    select_contacts () {
      return [ ...this.user_detail.contact_list, { index: -1, name: '* ไม่มีในรายชื่อนี้ *' } ]
    },
    selected_submitter () {
      return this.user_detail && this.user_detail.default_contact
    },
    selected_sample_owner () {
      if (this.submission.sample_owner === this.submission.submitter) return this.user_detail.default_contact
      return this.user_detail.contact_list.find(c => c.index === this.submission.sample_owner)
    },
    selected_invoice_to () {
      if (this.submission.invoice_to === this.submission.submitter) return this.user_detail.default_contact
      return this.user_detail.contact_list.find(c => c.index === this.submission.invoice_to)
    },
    email_suggest_list () {
      if (!this.user_detail) return []
      return [ this.user_detail.email ]
    },
    phone_suggest_list () {
      if (!this.user_detail) return []
      return [ this.user_detail.phone ]
    },
    add_batch_label () {
      return  this.is_general? 'เพิ่มกลุ่มการทดสอบ' :
              this.is_disinfectant? 'เพิ่มยาฆ่าเชื้อ' : 'ERROR'
    },
    review_and_submit_label () {
      return `สรุปและ${this.edit_mode? 'บันทึก' : 'ส่ง'}`
    },
  },
  watch: {
    in_review_mode () {
      if (this.in_review_mode) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    }
  },
  mounted () {
    if (!this.edit_mode) {
      this.on_submission_type_change()
    }
    //this.$smoothReflow({el: '#info'})
    //this.$smoothReflow({el: '#report'})
  },
  methods: {
    on_submission_type_change () {
      this.is_validated = false
      // General type
      if (this.is_general) {
        this.submission.sample_details = {
          sample_taken_date: null,
          sample_type: null,
          animal_type: null,
          animal_species: null,
          animal_age: null,
          animal_count: null,
          illness: null,
          vaccinations: null,
        }
      // Disinfectant Type
      } else if (this.is_disinfectant) {
        this.submission.sample_details = null
      }
      this.submission.submission_batches = [this.generate_new_batch()]
    },
    generate_new_batch () {
      let new_batch
      // General type
      if (this.is_general) {
        new_batch = {
          sample_count: null,
          price: 0,
          test_count: 0,
          tests: {
            'แบคทีเรียวิทยา': null,
            'อณูชีววิทยา': null,
            'ซีรั่มวิทยา': null,
            'ไวรัสวิทยา': null
          },
          samples: []
        }
      // Disinfectant Type
      } else if (this.is_disinfectant) {
        new_batch = {
          test_type: null,
          disinfectant_name: null,
          price: 0,
          test_count: 0,
          toxicity_test_cost: 0,
          unique_cells: {},
          tests: {}
        }
      }
      return new_batch
    },
    add_batch () {
      this.is_validated = false
      this.submission.submission_batches.push(this.generate_new_batch())
      this.$nextTick( () => {
        setTimeout( () => {
          const batch = document.getElementById(`${this.submission.submission_batches.length}`)
          if (batch) batch.classList.remove('expand-in-batch')
        }, 400)
        this.$scrollTo(
          `#batch${this.submission.submission_batches.length}`,
          500,
          { offset: -200 }
        )
      })
    },
    delete_batch (idx) {
      const batch = document.getElementById(`batch${idx+1}`)
      if (batch) {
        batch.classList.add('shrink-out-batch')
        setTimeout( () => {
          batch.classList.remove('shrink-out-batch')
          this.submission.submission_batches.splice(idx, 1)
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
    get_batch_label (number) {
      return  (!this.multiple_batches)? 'รายการทดสอบ' :
              (this.is_general)? `กลุ่ม ${number+1}` :
              (this.is_disinfectant)? this.submission.submission_batches[number].disinfectant_name || `ยาฆ่าเชื้อ ${number+1}` : '???'
    },
    form_has_information () {
      const submission_detail_has_info = this.is_general && 
        Object.values(this.submission.sample_details).reduce(
          (has_info, info) => has_info || !!info, false
        )
      const batchesHaveInfo = this.submission.submission_batches
        .reduce( (has_info, batch) => has_info || this.batch_has_info(batch), false)
      return submission_detail_has_info || batchesHaveInfo
    },
    batch_has_info (batch) {
      if (this.is_general) {
        return !!batch.sample_count || batch.price > 0
      }
      if (this.is_disinfectant) {
        return !!batch.disinfectant_name && batch.price > 0
      }
      return false
    },
    go_to_submissions_list () {
      $('#submitted-modal').modal('toggle')
      this.$router.push({ name: 'submissions-list' })
    },
    go_to_view_submission (submission_key) {
      $('#submitted-modal').modal('toggle')
      this.$router.push({ name: 'view-submission', params: { id: submission_key } })
    },
    sample_owner_self () {
      this.sample_owner_choice = 'self'
      this.submission.sample_owner = this.user_detail.default_contact.index
      this.submission.mail_report_to_sample_owner = false
      this.on_sample_owner_change(this.submission.sample_owner)
      if (this.invoice_to_choice === 'owner') {
        this.invoice_to_choice = 'self'
        this.submission.invoice_to = this.user_detail.default_contact.index
        this.on_invoice_to_change(this.submission.invoice_to)
      }
    },
    sample_owner_other () {
      if (this.sample_owner_choice !== 'other') {
        this.sample_owner_choice = 'other'
        this.submission.sample_owner = null
      }
    },
    invoice_to_owner () {
      this.invoice_to_choice = 'owner'
      this.submission.invoice_to = this.submission.sample_owner
      this.on_invoice_to_change(this.submission.invoice_to)
    },
    invoice_to_self () {
      this.invoice_to_choice = 'self'
      this.submission.invoice_to = this.user_detail.default_contact.index
      this.on_invoice_to_change(this.submission.invoice_to)
    },
    invoice_to_other () {
      if (this.invoice_to_choice !== 'other') {
        this.invoice_to_choice = 'other'
        this.submission.invoice_to = null
      }
    },
    on_submitter_change (index) {
      this.submission.sample_owner = null
      this.submission.invoice_to = null
      this.sample_owner_choice = null
      this.invoice_to_choice = null
      this.submission.english_report = false
      this.mail_report_to_sample_owner = false
    },
    on_sample_owner_change (index) {
      if (this.invoice_to_choice === 'owner') {
        this.submission.invoice_to = index
        this.on_invoice_to_change(index)
      }
      if (index === this.submission.invoice_to) {
        this.invoice_to_choice = 'owner'
      }
      if (index === -1) {
        this.show_sample_owner_contact_modal = true
      }
    },
    on_invoice_to_change (index) {
      if (index === this.submission.sample_owner &&
          this.sample_owner_choice === 'other') {
        this.invoice_to_choice = 'owner'
      }
      if (index === -1) {
        this.show_invoice_to_contact_modal = true
      }
    },
    form_complete () {
      this.is_validated = true
      const { backuser, submitter, sample_owner, invoice_to } = this.submission
      const basic_info_complete = !!backuser && !!submitter && !!sample_owner && !!invoice_to && !this.needs_english_info_sample_owner
      let batches_complete
      if (this.is_general) {
        batches_complete = this.submission.submission_batches.reduce( (batches_complete, batch) => {
          let complete = batches_complete && !!batch.sample_count && (batch.price > 0)
          complete &&= batch.samples.reduce( (has_id, sample) => has_id && !!sample.sample_id, true)
          if (batch.tests['แบคทีเรียวิทยา']) {
            complete &&= batch.tests['แบคทีเรียวิทยา'].custom_bacteria_tests
              .reduce( (all_filled, bacteria) => all_filled && bacteria, true)
          }
          return complete
        }, true)
        
      } else if (this.is_disinfectant) {
        batches_complete = this.submission.submission_batches.reduce( (batches_complete, batch) => {
          return batches_complete && !!batch.disinfectant_name && (batch.test_count > 0)
        }, true)
      }
      return basic_info_complete && batches_complete
    },
    async on_sample_owner_contact_modal_close (contact_index_to_select) {
      this.submission.sample_owner = contact_index_to_select
      if (contact_index_to_select) {
        await this.$apollo.queries.user_detail.refetch()
        this.on_sample_owner_change(this.submission.sample_owner)
      }
      this.show_sample_owner_contact_modal = false
    },
    async on_invoice_to_contact_modal_close (contact_index_to_select) {
      this.submission.invoice_to = contact_index_to_select
      if (contact_index_to_select) {
        await this.$apollo.queries.user_detail.refetch()
        this.on_invoice_to_change(this.submission.invoice_to)
      }
      this.show_invoice_to_contact_modal = false
    },
    contact_has_english_info (index) {
      const { name_eng, address_eng } = this.select_contacts.find(e => e.index === index)
      return name_eng && address_eng
    },
    enter_review_mode () {
      this.clean_form()
      if (this.form_complete()) {
        this.in_review_mode = true
      }
    },
    clean_form () {
      for (const batch of this.submission.submission_batches) {
        if (this.is_general) {
          for (const [department, tests] of Object.entries(batch.tests)) {
            if (tests) {
              if (tests.test_list.length <= 0) {
                batch.tests[department] = null
              }
            }
          }
        }
      }
    },
    show_add_english_info_modal (contact) {
      this.contact_to_add_english_info = contact
      this.$nextTick( () => $('#add-english-info-modal').modal('show') )
    },
    async submit_update_contact_english_info () {
      try {
        let res = await this.$apollo.mutate({
          mutation: UPDATE_CONTACT_ENG_INFO,
          variables: {
            index: this.contact_to_add_english_info.index,
            ...this.add_english_info_modal
          }
        })
        await this.$apollo.queries.user_detail.refetch()
        this.contact_to_add_english_info = null
        this.add_english_info_modal.name_eng = null
        this.add_english_info_modal.address_eng = null
        $('#add-english-info-modal').modal('hide')
      } catch (err) {
        console.log(err)
      }
    },
    on_submit() {
      this.in_review_mode = false
      this.submitting = true
      $('#submitted-modal').modal('toggle')
      if (this.edit_mode) {
        this.update_submission()
      } else {
        this.send_submission()
      }
    },
    async send_submission () {
      const {
        backuser,
        submission_type,
        english_report,
        submitter,
        sample_owner,
        invoice_to,
        mail_invoice,
        mail_report_to_submitter,
        mail_report_to_sample_owner,
        remarks
      } = this.submission
      const sample_details = JSON.stringify(this.submission.sample_details)
      const submission_batches = JSON.stringify(this.submission.submission_batches)
      try {
        let res = await this.$apollo.mutate({
          mutation: SEND_SUBMISSION,
          variables: {
            backuser,
            submission_type,
            english_report,
            submitter,
            sample_owner,
            invoice_to,
            mail_invoice,
            mail_report_to_submitter,
            mail_report_to_sample_owner,
            remarks,
            sample_details,
            submission_batches
          }
        })
        this.submitting = false
        const keys = res.data.send_submission.result
        this.new_submission_key = keys.submission_BestLIMS_key? keys.submission_BestLIMS_key : keys.submission_backend_key
        
      } catch (err) {
        console.log(err)
        this.submitting = false
      }
    },
    async update_submission () {
      const {
        backend_key,
        english_report,
        sample_owner,
        invoice_to,
        mail_invoice,
        mail_report_to_submitter,
        mail_report_to_sample_owner,
        remarks
      } = this.submission
      const sample_details = JSON.stringify(this.submission.sample_details)
      const submission_batches = JSON.stringify(this.submission.submission_batches)
      try {
        let res = await this.$apollo.mutate({
          mutation: UPDATE_SUBMISSION,
          variables: {
            backend_key,
            english_report,
            sample_owner,
            invoice_to,
            mail_invoice,
            mail_report_to_submitter,
            mail_report_to_sample_owner,
            sample_details,
            submission_batches
          }
        })
        this.submitting = false
        const keys = res.data.update_submission.result
        this.new_submission_key = keys.submission_BestLIMS_key? keys.submission_BestLIMS_key : keys.submission_backend_key
        
      } catch (err) {
        console.log(err)
        this.submitting = false
      }
    }
  },
  apollo: {
    auth: {
      query: AUTH_DATA,
      update: data => data.auth,
      result (res) {
        if (!res.data.auth.is_admin) {
          this.submission.backuser = res.data.auth.index
        }
      }
    },
    user_detail: {
      query: USER_DETAIL,
      variables () {
        return {
          index: this.submission.backuser
        }
      },
      update: data => data.get_backuser.result,
      result (res) {
        if (res.data) {
          this.submission.submitter = res.data.get_backuser.result.default_contact.index
        }
      },
      skip () {
        return !this.submission.backuser
      }
    },
    all_users: {
      query: SUBMITTERS_LIST,
      update: data => data.search_backuser.result,
      skip () {
        return !this.auth || !this.auth.is_admin
      }
    },
    suggest_lists: {
      query: SUGGEST_LIST,
      update: data => data.suggest_list.result,
      result (res) {
        if (res.data) {
          const processed = { }
          for (const list of res.data.suggest_list.result) {
            processed[list.field_name] = list.suggest_list
          }
          this.suggest_lists = { ...processed }
        }
      }
    },
    submission_raw: {
      query: SUBMISSION_DETAIL,
      variables () {
        return {
          key: this.$route.params.id
        }
      },
      update: data => data.get_submission.result,
      result (res) {
        if (!res.data) return
        const {
          backend_key,
          backuser,
          submission_type,
          submitter,
          english_report,
          sample_owner,
          invoice_to,
          mail_invoice,
          mail_report_to_submitter,
          mail_report_to_sample_owner,
          remarks,
          sample_details,
          submission_batches
        } = res.data.get_submission.result
        this.submission = {
          backend_key,
          submission_type,
          english_report,
          mail_invoice,
          mail_report_to_submitter,
          mail_report_to_sample_owner,
          remarks,
          backuser: backuser.index,
          submitter: submitter.index,
          sample_owner: sample_owner.index,
          invoice_to: invoice_to.index,
          sample_details: JSON.parse(sample_details),
          submission_batches: JSON.parse(submission_batches)
        }
        if (this.submission.sample_owner == this.submission.submitter) {
          this.sample_owner_choice = 'self'
        } else if (this.submission.sample_owner == this.submission.submitter) {
          this.sample_owner_choice = 'self'
        } else {
          this.sample_owner_choice = 'other'
        }
        if (this.submission.invoice_to == this.submission.submitter) {
          this.invoice_to_choice = 'self'
        } else if (this.submission.invoice_to == this.submission.sample_owner) {
          this.invoice_to_choice = 'owner'
        } else {
          this.invoice_to_choice = 'other'
        }
      },
      skip () { return !this.edit_mode }
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
  top: 3rem;
  left: -120px;
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