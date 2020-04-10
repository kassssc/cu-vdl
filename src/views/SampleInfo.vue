<template>
<div class="d-flex flex-column">

  <div id="submit-samples-nav" class="d-flex align-items-center py-3">
    <scrollactive active-class="active"
                  :offset="220"
                  :modifyUrl="false"
                  class="d-flex align-items-center">
      <div class="d-flex align-items-center">
        <a href="#info"
           class="btn btn-transparent btn-sm scrollactive-item">
          ข้อมูลเบื้องต้น
        </a>
        <i class="fas fa-long-arrow-alt-right mx-1" />
      </div>
      <div class="d-flex align-items-center">
        <a href="#report"
           class="btn btn-transparent btn-sm scrollactive-item">
          รายงาน
        </a>
        <i class="fas fa-long-arrow-alt-right mx-1" />
      </div>
      <div v-for="(section, idx) in submission.batches"
           :key="idx"
           class="d-flex align-items-center">
        <a :href="'#batch' + (idx+1)"
            class="btn btn-transparent btn-sm scrollactive-item">
          {{ submission.batches.length > 1 ? `กลุ่ม ${idx+1}` : 'รายการทดสอบ' }}
        </a>
        <i class="fas fa-long-arrow-alt-right mx-1" />
      </div>
    </scrollactive>
    <router-link :to="{name: 'reviewsubmission'}"
                 tag="a"
                 class="btn btn-transparent btn-sm">
      {{ $t(`submit.review`) }}
    </router-link>
  </div>

  <form class="font-chatthai d-flex flex-column px-4 pb-5 mb-5 max-width-1350 transition">    
    
    <div id="info">
      <div class="row w-100 px-4 pt-4">
        <div class="col-2">
          <h3>
            ข้อมูลเบื้องต้น
          </h3>
        </div>
        <div class="col-10">
          <div class="form-row mb-4">
            <div class="form-group col-6 mb-0">
              <h4 class="mb-1">
                ประเภทการตรวจ
              </h4>
              <form-inline-select :options="reportTypes"
                                  v-model="submission.type"
                                  @change="onReportTypeChange()" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-4">
              <label>
                ชื่อผู้ส่ง
              </label>
              <input type="text"
                     class="form-control"
                     v-model="submission.info.submittorName"
                     disabled >
            </div>
            <div class="form-group col-2">
              <label>
                วันที่ส่งตัวอย่าง
              </label>
              <datepicker format="dd/MM/yy"
                          v-model="submission.info.submitDate"
                          :disabled="true"
                          :bootstrap-styling="true">
                <div slot="afterDateInput" class="append-icon">
                  <i class="far fa-calendar-alt" />
                </div>
              </datepicker>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-4">
              <label>
                องค์กรเจ้าของตัวอย่าง <i class="fas fa-star-of-life" />
              </label>
              <select class="form-control"
                      v-model="submission.info.orgId">
                <option>เลือก...</option>
                <option>ฟาร์มสมควร</option>
                <option>ฟาร์มสมหมาย</option>
                <option>ฟาร์มสมคิด</option>
                <option>ฟาร์มสมชาย</option>
              </select>
            </div>
            <div v-if="submission.type === 1" class="form-group col-2">
              <label>
                วันที่เก็บตัวอย่าง
              </label>
              <datepicker format="dd/MM/yy"
                          v-model="submission.info.sampleTakenDate"
                          :bootstrap-styling="true">
                <div slot="afterDateInput" class="append-icon">
                  <i class="far fa-calendar-alt" />
                </div>
              </datepicker>
            </div>
            <div v-if="submission.type === 1" class="form-group col-4">
              <label>
                ชนิดตัวอย่าง <i class="fas fa-star-of-life" />
              </label>
              <select class="form-control"
                      v-model="submission.info.sampleTypeId">
                <option>เลือก...</option>
                <option>เลือด</option>
                <option>นํ้าลาย</option>
              </select>
            </div>
            <div v-if="submission.type === 2" class="form-group col-2">
              <label>
                จำนวนตัวอย่าง <i class="fas fa-star-of-life" />
              </label>
              <input type="number"
                     class="form-control"
                     v-model="submission.info.sampleCount">
            </div>
          </div>

          <div v-if="submission.type === 1" class="form-row">
            <div class="form-group col-3">
              <label>
                ชนิดสัตว์
              </label>
              <select class="form-control"
                      v-model="submission.info.animalTypeId">
                <option>เลือก...</option>
                <option>สุกร</option>
                <option>สุนัข</option>
                <option>กระต่าย</option>
                <option>ม้า</option>
              </select>
            </div>
            <div class="form-group col-3">
              <label>
                พันธุ์
              </label>
              <input type="text"
                     class="form-control"
                     v-model="submission.info.animalSpecies">
            </div>
            <div class="form-group col-4">
              <label>
                อายุ
              </label>
              <input class="form-control"
                     v-model="submission.info.animalAge">
            </div>
            <div class="form-group col-2">
              <label>
                จำนวนที่เลี้ยง
              </label>
              <input type="number"
                     class="form-control"
                     v-model.number="submission.info.animalCount">
            </div>
          </div>

          <div v-if="submission.type === 1" class="form-row">
            <div class="form-group col-6">
              <label>
                ประวัติการป่วย
              </label>
              <textarea type="text"
                        rows="5"
                        class="form-control"
                        v-model="submission.info.illness" />
            </div>
            <div class="form-group col-6">
              <label>
                ประวัติการทำวัคซีน
              </label>
              <textarea type="number"
                        rows="5"
                        class="form-control"
                        v-model="submission.info.vaccinations" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END INFO SECTION -->
  
    <div id="report"
         class="row w-100 border-bottom-pink p-4">
      <div class="col-2">
        <h3>
          รายงาน
        </h3>
      </div>
      <div class="col-10">
        <h4>
          {{ $t(`general.notify`)}}
        </h4>
        <div class="form-row">
          <div class="form-group col-4">
            <label>
              {{ $t(`general.email`)}}
            </label>
            <input type="text"
                   class="form-control"
                   v-model="submission.info.notifyBy.email">
          </div>
          <div class="form-group col-4">
            <label>
              {{ $t(`general.phone`)}}
            </label>
            <input type="number"
                   class="form-control"
                   v-model="submission.info.notifyBy.phone">
          </div>
          <div class="form-group col-4">
            <label>
              {{ $t(`general.fax`)}}
            </label>
            <input type="number"
                   class="form-control"
                   v-model="submission.info.notifyBy.fax">
          </div>
        </div>
  
        <div v-if="submission.type === 2">
          <h4>รายงานเป็นภาษา</h4>
          <div class="form-row">  
            <div class="form-group d-flex col-2">
              <checkbox label="ไทย"
                        class="mr-4"
                        v-model="submission.info.reportLang.thai" />
              <checkbox label="English"
                        v-model="submission.info.reportLang.eng" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END REPORT SECTION -->
  
    <!-- BATCH SECTION -->
    <div v-for="(batch, idxBatch) in submission.batches"
          :key="idxBatch"
          :id="'batch' + (idxBatch+1)"
          class="batch expand-in-batch submission-section position-relative border-bottom-light pb-4 px-4 pt-5">
      <a v-if="submission.batches.length > 1"
          class="btn btn-x batch-section"
          @click="removeBatch(idxBatch)">
        <i class="fas fa-times" />
      </a>

      <!-- GENERAL BATCH -->
      <div v-if="submission.type === 1">
        <div class="row w-100">
          <div class="col-2">
            <h3 class="mb-2">
              {{ submission.batches.length > 1 ? `กลุ่มการทดสอบ ${idxBatch+1}` : 'รายการทดสอบ' }}
            </h3>
            <h5 class="ml-3 color-light-text">
              {{ `งาน${testType(batch.testType).name}`}}
            </h5>
            <h5 v-if="batch.sampleCount" class="ml-3 color-light-text">
              {{ `${batch.sampleCount} ตัวอย่าง` }}
            </h5>
          </div>
          <div class="col-10">
            <h4 class="mb-1">
              เลือกประเภทงานทดสอบ
            </h4>
            <div class="form-row">
              <div class="form-group col-8 mb-0">
                <form-inline-select :options="tests(submission.type)"
                                    v-model="batch.testType"
                                    @change="updateBatchTestInfo(batch)" />
              </div>
            </div>
            <div class="form-row no-gutters mt-3">
              <div class="col-2">
                <h4>
                  เลือกการทดสอบ
                </h4>
              </div>
              <div class="col-10">
                <div class="form-row">
                  <div class="col-6"></div>
                  <div class="col-1 text-right">
                    <h5 class="color-light-text">
                      ราคา
                    </h5>
                  </div>
                  <div class="col-2">
                    <h5 class="color-light-text">
                      จำนวนตัวอย่าง
                    </h5>
                  </div>
                  <div class="col-2">
                    <h5 class="color-light-text text-right">
                      ยอดค่าบริการ
                    </h5>
                  </div>
                </div>
              </div>
            </div>
  
            <div v-for="category in testType(batch.testType).testCategories"
                  :key="category.name"
                  class="row no-gutters border-bottom-lighter">
              <div class="col-2 pt-2 pr-2">
                <h5>
                  {{ category.name }}
                </h5>
              </div>
              <div class="col-10">
                <div v-for="test in testCategory(batch.testType, category.id)"
                      :key="test.id"
                      class="test-row" >
                  <form-test-input :test="test"
                                   :sampleCount="batch.tests[test.id].sampleCount"
                                   v-model="batch.tests[test.id]"
                                   @change="onTestInputChange(batch)"/>
                </div>
              </div>
            </div>
            <div v-if="batch.testType === 4" class="row no-gutters border-bottom-lighter">
              <div class="col-2 pt-2 pr-2">
                <h5>
                  รายการอื่นๆ
                </h5>
              </div>
              <div class="col-10 position-relative">
                <div v-for="(customTest, idx) of batch.customTests"
                      :key="idx"
                      class="position-relative">
                  <form-other-test-input v-model="batch.customTests[idx]"
                                         @change="onTestInputChange(batch)"
                                         @delete="removeCustomTest(batch.customTests, idx)" />
                </div>
                <a class="btn btn-primary btn-sm my-2"
                    @click="addCustomTest(batch.customTests)">
                  เพิ่มรายการ
                </a>
                <div v-if="batch.customTests.length > 0"
                     class="custom-test-price">
                  <h5>รอประเมินราคา</h5>
                </div>
              </div>
            </div>
    
            <div class="form-row no-gutters mt-2">
              <div class="col-2"></div>
              <div class="col-10">
                <div class="form-row">
                  <div class="col-5"></div>
                  <div class="col-2 text-right">
                    <h5 class="color-light-text mt-2">
                      รวมเป็น
                    </h5>
                  </div>
                  <div class="col-2 text-right">
                    <h2 class="text-primary w-75">
                      {{ batch.sampleCount }}
                    </h2>
                    <h5 class="color-light-text w-75">
                      ตัวอย่าง
                    </h5>
                  </div>
                  <div class="col-2 text-right">
                    <h2 class="text-primary">
                      {{ `${batch.totalPrice.toLocaleString()}฿` }}
                    </h2>
                    <h5 class="color-light-text">
                      ค่าบริการ
                    </h5>
                    <h6 v-if="batch.testType === 4" class="color-muted">
                      *ไม่รวมรายการอื่นๆ
                    </h6>
                  </div>
                </div>
              </div>
            </div>
  
            <div v-if="includesSensitivityTest(batch)"
                  class="form-row no-gutters mt-4 py-3 border-bottom-lighter border-top-lighter">
              <div class="col-2">
                <h5 class="mb-2">
                  เลือกยาต้านจุลชีพเพื่อการทดสอบความไว
                </h5>
                <h5>
                  (เลือกได้ถึง 8 รายการ)
                </h5>
              </div>
              <div class="col-10">
                <form-antibiotics-sensitivity :options="testType(batch.testType).sensitivityTestOptions"
                                              v-model="batch.sensitivityTests" />
              </div>
            </div>
  
          </div>
        </div>
  
        <div class="row w-100 mt-5">
          <div class="col-2">
            <h4>
              รายละเอียดตัวอย่าง
            </h4>
          </div>
  
          <div v-if="batch.sampleCount <= 0" class="col-10">
            <h4 class="text-primary">
              กรุณาเลือกรายการทดสอบและใส่จำนวนตัวอย่างก่อน
            </h4>
          </div>
  
          <div v-if="batch.sampleCount > 0" class="col-10">
  
            <div class="form-row w-100">
              <div class="form-group form-group-sm col-1">
                <h5>หมายเลข</h5>
              </div>
              <div class="form-group form-group-sm col-2">
                <h5>ข้อมูล</h5>
              </div>
              <div class="form-group form-group-sm col-2">
                <h5>ข้อมูล</h5>
              </div>
              <div class="form-group form-group-sm col-2">
                <h5>ข้อมูล</h5>
              </div>
              <div class="form-group form-group-sm col-5">
                <h5>ข้อมูล</h5>
              </div>
            </div>
            <div v-for="(sample, idxSet) in batch.samples"
                  :key="idxSet"
                  :id="`batch${idxBatch+1}-set${idxSet+1}`"
                class="form-row w-100">
              <div class="form-group form-group-sm col-1">
                <h5>{{ idxSet+1 }}</h5>
              </div>
              <div class="form-group form-group-sm col-2">
                <input type="text" class="form-control form-control-sm">
              </div>
              <div class="form-group form-group-sm col-2">
                <input type="text" class="form-control form-control-sm">
              </div>
              <div class="form-group form-group-sm col-2">
                <input type="text" class="form-control form-control-sm">
              </div>
              <div class="form-group form-group-sm col-5">
                <input type="text" class="form-control form-control-sm">
              </div>
            </div>
            <a type="button" data-toggle="modal" data-target="#sampleInfoModal" class="btn btn-secondary">
              เติมข้อมูลทีละหลายช่อง
            </a>
          </div>
        </div>
      </div>
      <!-- END GENERAL BATCH -->

      <!-- DISINFECTANT BATCH -->
      <div v-if="submission.type === 2">
        <div class="row w-100">
          <div class="col-2">
            <h3 class="mb-2">
              {{ submission.batches.length > 1 ? `กลุ่มการทดสอบ ${idxBatch+1}` : 'รายการทดสอบ' }}
            </h3>
            <h5 class="ml-3 color-light-text">
              {{ `${testType(batch.testType).name}`}}
            </h5>
          </div>
          <div class="col-10">
            <h4 class="mb-1">
              เลือกการทดสอบประสิทธิภาพยาฆ่าเชื้อ
            </h4>
            <div class="form-row">
              <div class="form-group col-6 mb-0">
                <form-inline-select :options="tests(submission.type)"
                                    v-model="batch.testType"
                                    @change="updateBatchTestInfo(batch)" />
              </div>
            </div>
            <div class="form-row no-gutters mt-3">
              <div class="col-5">
                <h4>เลือกการทดสอบ</h4>
              </div>
              <div class="col-2 text-right">
                <h5>ราคา/นาที</h5>
              </div>
              <div class="col-2 text-right">
                <h5 class="w-75">ที่เวลา</h5>
              </div>
              <div class="col-2 text-right">
                <h5>ยอดค่าบริการ</h5>
              </div>
            </div>
  
            <div class="row no-gutters border-bottom-lighter">
              <div class="col-12">
                <div v-for="test in testType(batch.testType).testInfo"
                      :key="test.id"
                      class="test-row" >
                  <form-disinfectant-test-input :test="test"
                                                :sampleCount="batch.tests[test.id].sampleCount"
                                                v-model="batch.tests[test.id]"
                                                @change="onTestInputChange(batch)"/>
                </div>
              </div>
            </div>
    
            <div class="form-row no-gutters mt-2">
              <div class="col-8"></div>
              <div class="col-1 text-right">
                <h5 class="color-light-text mt-2">
                  รวมเป็น
                </h5>
              </div>
              <div class="col-2 text-right">
                <h2 class="text-primary">
                  {{ `${batch.totalPrice.toLocaleString()}฿` }}
                </h2>
                <h5 class="color-light-text">
                  ค่าบริการ
                </h5>
              </div>
            </div>  
          </div>
        </div>
      </div>
      <!-- END DISINFECTANT BATCH -->
    </div>
    <!-- END BATCH SECTION -->
  
    <a class="btn btn-primary btn-width-md align-self-center my-4"
       @click="addBatch()">
      เพิ่มกลุ่มการทดสอบ
    </a>

    <!-- <div class="row p-4">
      <div class="col-2">
        <h3>สรุปการส่งตัวอย่าง</h3>
      </div>
      <div class="col-10">

      </div>
    </div> -->
  </form>

  <!-- <div class="modal fade" id="sampleInfoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <h5>เลขที่ตัวอย่าง</h5>
          <div class="form-row">
            <div class="form-group col-1 mb-0">
              <h5 class=" color-dark-grey">
                จาก
              </h5>
            </div>
            <div class="form-group col-1 mb-0">
              <h5 class=" color-dark-grey">
                ถึง
              </h5>
            </div>
            <div class="form-group col-2 mb-0">
              <h5 class=" color-dark-grey">
                ชื่อตัวอย่าง
              </h5>
            </div>
            <div class="form-group col-5 mb-0">
              <h5 class=" color-dark-grey">
                รายละเอียด
              </h5>
            </div>
          </div>
          <div class="form-row w-100 position-relative">
            <div class="form-group form-group-sm col-1">
              <input type="number"
                    class="form-control form-control-sm" />
            </div>
            <div class="form-group form-group-sm col-1">
              <input type="number"
                    class="form-control form-control-sm" />
            </div>
            <div class="form-group form-group-sm col-2">
              <input type="text"
                    class="form-control form-control-sm" />
            </div>
            <div class="form-group form-group-sm col-5">
              <input type="text"
                    class="form-control form-control-sm" />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div> -->

</div>
</template>

<style lang="scss" scoped>
.sample-set {
  height: 47px;
  display: flex;
  align-items: center;
}
.sample-set, .batch {
  overflow: hidden;
}

.test-row {
  &:not(:last-child) {
    border-bottom: 1px solid $light-accent
  }
}

a.btn.btn-x {
  position: absolute;
  height: 35px;
  width: 35px;
  &:hover {
    color: $chula;
    background: transparent;
  }
  &.batch-section {
    right: 15px;
    top: 15px;
  }
}

.expand-in-batch {
  max-height: 2000px;
  opacity: 1;
  animation: expand-in-batch 300ms cubic-bezier(0.1, 1, 0.2, 1) forwards;
}
.shrink-out-batch {
  max-height: 0;
  opacity: 0;
  animation: shrink-out-batch 300ms linear forwards;
}

.expand-in {
  height: 47px;
  opacity: 1;
  animation: expand-in 200ms linear forwards;
}
.shrink-out {
  height: 0;
  opacity: 0;
  animation: shrink-out 200ms linear forwards;
}

.custom-test-price {
  position: absolute;
  top: 10px;
  right: 70px;
  text-align: right;
}


#submit-samples-nav {
  position: sticky;
  top: 70px;
  background: $bg;
  border-bottom: 1px solid $light-accent;
  z-index: 9999;
  box-shadow: 0 5px 5px -5px #333;
  a {
    &.button {
      font-size: 1.1rem;
      padding: 0.1em 0.3em;
    }
    &.active {
      background: $light-accent;
      color: $chula;
    }
  }
}
@keyframes expand-in {
  0% {
    opacity: 0;
    height: 0px;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    height: 47px;
  }
}
@keyframes shrink-out {
  0% {
    opacity: 1;
    height: 47px;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    height: 0px;
  }
}
@keyframes expand-in-batch {
  0% {
    opacity: 0;
    height: 0px;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    max-height: 2000px;
  }
}
@keyframes shrink-out-batch {
  0% {
    opacity: 1;
    max-height: 2000px;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    max-height: 0px;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import FormTestInput from '@/util/FormTestInput.vue'
import FormOtherTestInput from '@/util/FormOtherTestInput.vue'
import FormDisinfectantTestInput from '@/util/FormDisinfectantTestInput.vue'
import FormAntibioticsSensitivity from '@/util/FormAntibioticsSensitivity.vue'

export default {
  name: 'sample-info',
  components: {
    FormTestInput,
    FormOtherTestInput,
    FormDisinfectantTestInput,
    FormAntibioticsSensitivity
  },
  data () {
    return {
      submission: {
        type: 1,
        info: {},
        batches: [{}]
      }
    }
  },
  computed: {
    ...mapGetters([
      'reportTypes',
      'tests',
      'testType',
      'testCategory'
    ]),
  },
  beforeMount () {
    this.onReportTypeChange()
  },
  methods: {
    onReportTypeChange () {
      // General type
      if (this.submission.type === 1) {
        this.submission.info = {
          submittorName: 'สมควร สมสกุล',
          submitDate: '04/04/20',
          orgId: null,
          sampleTakenDate: '',
          sampleTypeId: null,
          animalTypeId: null,
          animalSpecies: '',
          animalAge: '',
          animalCount: null,
          illness: '',
          vaccinations: '',
          notifyBy: {
            phone: null,
            fax: null,
            email: null
          }
        }
        this.submission.batches = [
          {
            testType: 1,
            sampleCount: 0,
            totalPrice: 0,
            tests: {},
            samples: [],
          }
        ]
      // Disinfectant Type
      } else if (this.submission.type === 2) {
        this.submission.info = {
          submittorName: 'สมควร สมสกุล',
          submitDate: '04/04/20',
          orgId: null,
          notifyBy: {
            phone: null,
            fax: null,
            email: null
          },
          reportLang: {
            thai: true,
            eng: false
          }
        }
        this.submission.batches = [
          {
            testType: 5,
            sampleCount: 0,
            totalPrice: 0,
            tests: {},
            samples: []
          }
        ]
      }
      this.updateBatchTestInfo(this.submission.batches[0])
    },
    updateBatchTestInfo (batch) {
      batch.sampleCount = 0
      batch.totalPrice = 0
      batch.tests = {}
      batch.samples = []
      batch.sensitivityTests = undefined
      // Initialize test selection data
      for (let test of this.testType(batch.testType).testInfo) {
        batch.tests[test.id] = {
          id: test.id,
          selected: false,
          sampleCount: null
        }
      }
      // Bacteria test
      if (batch.testType === 4) {
        batch.customTests = []
      }
    },
    onTestInputChange (batch) {
      const activeTests = Object.values(batch.tests).filter( test => test.sampleCount !== null )

      // Update total sample count for batch
      batch.sampleCount = activeTests.reduce( (acc, test) => acc + test.sampleCount, 0 )
      // If there is a custom sample (for bacteria)
      if (batch.testType === 4) {
        batch.sampleCount += batch.customTests.reduce( (acc, test) => acc + test.sampleCount, 0 )
      }

      // Update Batch total price
      batch.totalPrice = activeTests.reduce( (acc, test) => {
        const price = this.testType(batch.testType).testInfo.find(t => t.id === test.id).price
        return acc + (test.sampleCount * price)
      }, 0)

      // Update batch samples list
      const diff = Math.abs(batch.sampleCount - batch.samples.length)
      if (batch.sampleCount > batch.samples.length) {
        const arr = Array(diff).fill({
          // sample template goes there
        })
        batch.samples.push(...arr)
      } else if (batch.sampleCount < batch.samples.length) {
        batch.samples.splice(batch.samples.length - diff, diff)
      }
      // It won't update without force for whatever reason
      this.$forceUpdate()
    },
    includesSensitivityTest (batch) {
      // Bad code, fix later
      let sensitivityTestIds = this.testType(batch.testType).testInfo
        .filter( test => test.category === 12 || test.category === 999 )
        .map( test => test.id )
      let sensitivityTests = Object.values(batch.tests)
        .filter( test => sensitivityTestIds.includes(test.id) )
      return sensitivityTests.reduce( (acc, test) => acc || test.selected, false)
    },
    addCustomTest (customTests) {
      customTests.push({
        name: '', sampleCount: null
      })
      // It won't update without force for whatever reason
      this.$forceUpdate()
    },
    removeCustomTest (customTests, idx) {
      customTests.splice(idx, 1)
      // It won't update without force for whatever reason
      this.$forceUpdate()
    },
    addBatch () {
      // General type
      if (this.submission.type === 1) {
        this.submission.batches.push({
          testType: 1,
          sampleCount: 0,
          totalPrice: 0,
          tests: {},
          samples: [],
        })
      // Disinfectant Type
      } else if (this.submission.type === 2) {
        this.submission.batches.push({
          testType: 5,
          sampleCount: 0,
          totalPrice: 0,
          tests: {},
          samples: []
        })
      }
      this.updateBatchTestInfo(this.submission.batches[this.submission.batches.length-1])
      this.$nextTick( () => {
        setTimeout( () => {
          const batch = document.getElementById(`${this.submission.batches.length}`)
          batch.classList.remove('expand-in-batch')
        }, 400)
        this.$scrollTo(
          `#batch${this.submission.batches.length}`,
          500,
          {
            offset: -200
          }
        )
      })
    },
    removeBatch (idx) {
      const batch = document.getElementById(`batch${idx+1}`)
      batch.classList.add('shrink-out-batch')
      setTimeout( () => {
        batch.classList.remove('shrink-out-batch')
        this.submission.batches.splice(idx, 1)
      }, 400)
      this.$nextTick( () => {
        this.$scrollTo(
          `#batch${idx}`,
          500,
          {
            offset: 0
          }
        )
      })
    },
    /* addSampleSet (batch, idxBatch) {
      batch.samples.push({})
      const sampleSet = document.getElementById(`batch${idxBatch+1}-set${batch.samples.length-1}`)
      setTimeout( () => {
        sampleSet.classList.remove('expand-in')
      }, 300)
      //window.scrollBy(0, 100)
    },
    removeSampleSet (batch, idxBatch, idxSet) {
      const sampleSet = document.getElementById(`batch${idxBatch+1}-set${idxSet+1}`)
      sampleSet.classList.add('shrink-out')
      setTimeout( () => {
        sampleSet.classList.remove('shrink-out')
        batch.samples.splice(idxSet, 1)
      }, 300)
    }, */
  }
}
</script>
