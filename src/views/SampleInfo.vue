<template>
<div class="d-flex flex-column">

  <div id="submit-samples-nav" class="d-flex align-items-center py-3">
    <scrollactive active-class="active"
                  :offset="220"
                  :modifyUrl="false"
                  class="d-flex align-items-center">
      <div class="d-flex align-items-center">
        <a  href="#info"
            class="btn btn-transparent btn-sm scrollactive-item">
          ข้อมูลเบื้องต้น
        </a>
        <i class="fas fa-long-arrow-alt-right mx-1" />
      </div>
      <div class="d-flex align-items-center">
        <a  href="#report"
            class="btn btn-transparent btn-sm scrollactive-item">
          รายงาน
        </a>
        <i class="fas fa-long-arrow-alt-right mx-1" />
      </div>
      <div  v-for="(section, idx) in submission.batches"
            :key="idx"
            class="d-flex align-items-center">
        <a  :href="'#batch' + (idx+1)"
            class="btn btn-transparent btn-sm scrollactive-item">
          {{ getBatchNavLabel(idx + 1) }}
        </a>
        <i class="fas fa-long-arrow-alt-right mx-1" />
      </div>
    </scrollactive>
    <router-link  :to="{name: 'reviewsubmission'}"
                  tag="a"
                  class="btn btn-transparent btn-sm">
      {{ $t(`submit.review`) }}
    </router-link>
  </div>

  <form class="font-chatthai d-flex flex-column px-4 pb-5 mb-5 max-width-1350 transition">    
    
    <div id="info" class="row w-100 px-4 pt-5">
      <div class="col-2">
        <h3>
          ข้อมูลเบื้องต้น
        </h3>
      </div>
      <div class="col-10">
        <h4 class="mb-1 color-text-medium">
          ประเภทการตรวจ
        </h4>
        <div class="form-row mb-4">
          <div class="form-group col-6">
            <form-inline-select :options="reportTypes"
                                v-model="submission.type"
                                :warnBeforeChange="false"
                                warningMsg="ข้อมูลที่ถูกกรอกไว้แล้วด้านล่างจะหายไปถ้าท่านเปลี่ยนตัวเลือกนี้"
                                @change="onReportTypeChange()" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-4">
            <label>
              ชื่อผู้ส่ง
            </label>
            <input  type="text"
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
          <div v-if="isGeneralSubmission" class="form-group col-2">
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
          <div v-if="isGeneralSubmission" class="form-group col-4">
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
        </div>

        <div v-if="isGeneralSubmission" class="form-row">
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
            <input  type="text"
                    class="form-control"
                    v-model="submission.info.animalSpecies">
          </div>
          <div class="form-group col-4">
            <label>
              อายุ
            </label>
            <input  class="form-control"
                    v-model="submission.info.animalAge">
          </div>
          <div class="form-group col-2">
            <label>
              จำนวนที่เลี้ยง
            </label>
            <input  type="number"
                    class="form-control"
                    v-model.number="submission.info.animalCount">
          </div>
        </div>

        <div v-if="isGeneralSubmission" class="form-row">
          <div class="form-group col-6">
            <label>
              ประวัติการป่วย
            </label>
            <textarea type="text" rows="4"
                      class="form-control"
                      v-model="submission.info.illness" />
          </div>
          <div class="form-group col-6">
            <label>
              ประวัติการทำวัคซีน
            </label>
            <textarea type="number" rows="4"
                      class="form-control"
                      v-model="submission.info.vaccinations" />
          </div>
        </div>
      </div>
    </div>
    <!-- END INFO SECTION -->
  
    <div  id="report"
          class="row w-100 border-bottom-pink p-4">
      <div class="col-2">
        <h3>
          รายงาน
        </h3>
      </div>
      <div class="col-10">
        <h4 class="d-inline color-text-medium">
          {{ $t(`general.notify`)}}
        </h4>
        <i class="fas fa-star-of-life text-primary small-icon d-inline" />
        
        <div class="form-row">
          <div class="form-group col-4">
            <label>
              {{ $t(`general.email`)}}
            </label>
            <input  type="text"
                    class="form-control"
                    v-model="submission.info.notifyBy.email">
          </div>
          <div class="form-group col-4">
            <label>
              {{ $t(`general.phone`)}}
            </label>
            <input  type="number"
                    class="form-control"
                    v-model="submission.info.notifyBy.phone">
          </div>
          <div class="form-group col-4">
            <label>
              {{ $t(`general.fax`)}}
            </label>
            <input  type="number"
                    class="form-control"
                    v-model="submission.info.notifyBy.fax">
          </div>
        </div>
  
        <template v-if="isDisinfectantSubmission">
          <h4 class="d-inline">รายงานเป็นภาษา </h4>
          <i class="fas fa-star-of-life text-primary small-icon d-inline" />
          <div class="form-row">  
            <div class="form-group d-flex col-4 mb-2">
              <checkbox label="ไทย"
                        class="mr-4"
                        v-model="submission.info.reportLang.thai" />
              <checkbox label="English"
                        v-model="submission.info.reportLang.eng" />
            </div>
          </div>
          <h5 v-show="isDisinfectantSubmission && !submission.info.reportLang.thai && !submission.info.reportLang.eng"
              class="text-primary">
            <i class="fas fa-exclamation-triangle mr-2" />กรุณาเลือกภาษารายงานอย่างน้อย 1 ภาษา
          </h5>
        </template>
      </div>
    </div>
    <!-- END REPORT SECTION -->
  
    <!-- BATCH SECTION -->
    <div  v-for="(batch, idxBatch) in submission.batches"
          :key="idxBatch"
          :id="'batch' + (idxBatch+1)"
          class="batch expand-in-batch submission-section position-relative border-bottom-medium px-4 py-5">
      <a  v-if="hasMultipleBatches"
          class="btn btn-x batch-section"
          @click="removeBatch(idxBatch)">
        <i class="fas fa-times" />
      </a>

      <!-- GENERAL BATCH -->
      <div v-if="isGeneralSubmission">
        <div class="row w-100">
          <div class="col-2">
            <h3 class="mb-2">
              {{ 
                  hasMultipleBatches?
                  `กลุ่มการทดสอบ ${idxBatch+1}` : 'รายการทดสอบ'
              }}
            </h3>
            <h5 class="ml-3 color-light-text">
              {{ `งาน${testType(batch.testType).name}`}}
            </h5>
            <h5 v-if="batch.sampleCount" class="ml-3 color-light-text">
              {{ `${batch.sampleCount} ตัวอย่าง` }}
            </h5>
          </div>
          <div class="col-10">
            <h4 class="mb-1 color-text-medium">
              เลือกประเภทงานทดสอบ
            </h4>
            <div class="form-row mb-4">
              <div class="form-group col-8">
                <form-inline-select :options="tests(submission.type)"
                                    v-model="batch.testType"
                                    @change="updateBatchTestInfo(batch)" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-2">
                <h4 class="color-text-medium">จำนวนตัวอย่าง</h4>
                <input  type="number"
                        class="form-control text-right"
                        :value="batch.sampleCount"
                        @focus="$event.target.select()"
                        @blur="onSampleCountInputBlur($event.target.value, batch)" >
              </div>
            </div>
            <div class="form-row no-gutters border-bottom-lighter pb-1">
              <div class="col-2 color-text-medium">
                <h4>
                  เลือกการทดสอบ
                </h4>
              </div>
              <div class="col-10 mt-2">
                <div class="form-row">
                  <div class="col-6"></div>
                  <div class="col-2 text-right">
                    <h5 class="color-text-medium">
                      ราคา/ตัวอย่าง
                    </h5>
                  </div>
                  <div class="col-1">
                  </div>
                  <div class="col-2">
                    <h5 class="color-text-medium text-right">
                      ยอดค่าบริการ
                    </h5>
                  </div>
                </div>
              </div>
            </div>
  
            <div  v-for="category in testType(batch.testType).testCategories"
                  :key="category.name"
                  class="row no-gutters test-row">
              <div class="col-2 pr-2 color-text-medium">
                <h5>
                  {{ category.name }}
                </h5>
              </div>
              <div class="col-10">
                <div  v-for="test in testCategory(batch.testType, category.id)"
                      :key="test.id"
                      class="test-row form-row align-items-end">
                  <div class="form-group mb-0 col-6">
                    <checkbox :label="test.name"
                              :disabled="
                                (test.min && batch.sampleCount < test.min) ||
                                (test.max && batch.sampleCount > test.max)
                              "
                              :secondary-label="test.constraint"
                              v-model="batch.tests[test.id].selected"
                              @change="onTestCheckboxChange(batch, test.id)" />
                  </div>
                  <div class="form-group text-right mb-0 col-2">
                    <h5>
                      {{ `${test.price}฿` }}
                    </h5>
                  </div>
                  <div class="form-group col-1 mb-0 text-right color-muted">
                    <div v-if="batch.tests[test.id].selected && batch.sampleCount"
                         class="d-flex">
                      <i class="fas fa-times mt-1 small-icon"></i>
                      <h5 class="mx-2">
                        {{ batch.sampleCount }}
                      </h5>
                      <i class="fas fa-equals mt-1 small-icon"></i>
                    </div>
                  </div>
                  <div class="form-group col-2 mb-0 text-right">
                    <div v-if="batch.tests[test.id].selected && batch.sampleCount">
                      <h5>
                        {{ `${(test.price * batch.sampleCount).toLocaleString()}฿` }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="batch.testType === 4"
                 class="row no-gutters border-bottom-lighter">
              <div class="col-2 pt-2 pr-2">
                <h5 class="color-text-medium">รายการอื่นๆ</h5>
              </div>
              <div class="col-10 position-relative py-1">
                <div v-for="(customTest, idx) of batch.customTests"
                      :key="idx"
                      class="position-relative form-row py-1">
                  <div class="form-group col-8 mb-0">
                    <input v-focus-on-create
                           type="text"
                           class="form-control form-control-sm"
                           v-model="batch.customTests[idx]">
                  </div>
                  <a class="btn btn-sm btn-x custom-test"
                     @click="batch.customTests.splice(idx, 1)">
                    <i class="fas fa-times" />
                  </a>
                </div>
                <a class="btn btn-primary btn-sm my-2"
                   @click="batch.customTests.push('')">
                  เพิ่มรายการ
                </a>
                <div v-if="batch.customTests.length > 0"
                     class="custom-test-price text-wrap">
                  <h5>รอประเมินราคา</h5>
                  <h6 class="color-muted">(ประมาน 500฿ ต่อรายการ ต่อตัวอย่าง)</h6>
                </div>
              </div>
            </div>
    
            <div class="form-row no-gutters pt-2 pb-4 border-bottom-lighter">
              <div class="col-2"></div>
              <div class="col-10">
                <div class="form-row">
                  <div class="col-5"></div>
                  <div class="col-1 text-right">
                    <h2 class="text-primary">
                      {{ batch.sampleCount? batch.sampleCount : 0 }}
                    </h2>
                    <h5 class="color-light-text">
                      ตัวอย่าง
                    </h5>
                  </div>
                  <div class="col-2 text-right">
                    <h2 class="text-primary">
                      {{
                        Object.values(batch.tests).reduce( (acc,t) => acc + (t.selected? 1:0), 0) +
                          (batch.customTests? batch.customTests.length : 0)
                      }}
                    </h2>
                    <h5 class="color-light-text">
                      รายการทดสอบ
                    </h5>
                  </div>
                  <div class="col-1 text-right nowrap">
                    <h5 class="color-light-text mt-2 ml-3">
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
                    <h6 v-if="batch.testType === 4"
                        class="color-muted">
                      *ไม่รวมรายการอื่นๆ
                    </h6>
                  </div>
                </div>
              </div>
            </div>
  
            <div v-if="includesSensitivityTest(batch)"
                 class="form-row no-gutters pt-4  border-bottom-lighter">
              <div class="col-2">
                <h5 class="mb-2">
                  เลือกยาต้านจุลชีพเพื่อการทดสอบความไว
                </h5>
                <h5 class="color-text-light">
                  (เลือกได้ถึง 8 รายการ)
                </h5>
              </div>
              <div class="col-10">
                <form-antibiotics-sensitivity
                  :options="testType(batch.testType).sensitivityTestOptions"
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
  
          <div v-show="batch.sampleCount <= 0" class="col-10">
            <i class="fas fa-exclamation-triangle mr-2 text-primary d-inline" />
            <h4 class="text-primary d-inline">
              กรุณาใส่จำนวนตัวอย่างก่อน
            </h4>
          </div>
  
          <div v-show="batch.sampleCount > 0" class="col-10">
  
            <div class="form-row w-100">
              <div class="form-group form-group-sm col-1 text-right mr-3">
                <h5>หมายเลข</h5>
              </div>
              <div class="form-group form-group-sm col-5">
                <h5>ID ตัวอย่าง</h5>
              </div>
              <div class="form-group form-group-sm col-5">
                <h5>ข้อมูลเพิ่มเติม</h5>
              </div>
            </div>

            <div v-for="(sample, idxSample) of batch.samples"
                 :key="idxSample"
                 :id="`batch${idxBatch+1}-set${idxSample+1}`"
                 class="form-row w-100">
              <div class="form-group form-group-sm col-1 text-right mr-3">
                <h5>{{ idxSample+1 }}</h5>
              </div>
              <div class="form-group form-group-sm col-5">
                <input  type="text"
                        class="form-control form-control-sm"
                        v-model.lazy="sample.sampleId">
              </div>
              <div class="form-group form-group-sm col-5">
                <input  type="text"
                        class="form-control form-control-sm"
                        v-model.lazy="sample.extraInfo">
              </div>
            </div>

            <div class="form-row w-100">
              <div class="col-1 mr-3"></div>
              <div class="col-10 p-0">
                <form-sample-info-multifill
                  :max-samples="batch.sampleCount"
                  @add="updateSampleDetails(batch, $event)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END GENERAL BATCH -->

      <!-- DISINFECTANT BATCH -->
      <div v-else-if="isDisinfectantSubmission">
        <div class="row w-100">
          <div class="col-2">
            <h3 class="mb-2">
              การทดสอบ
            </h3>
            <h5 v-if="hasMultipleBatches"
                class="color-light-text">
              {{ batch.disinfectantName }}
            </h5>
          </div>

          <div class="col-10">
            <h5 class="mb-1">
              ทดสอบประสิทธิภาพยาฆ่าเชื้อต่อ
            </h5>
            <div class="form-row mb-3">
              <div class="form-group col-6 mb-0">
                <form-inline-select
                  :options="tests(submission.type)"
                  v-model="batch.testType"
                  @change="updateBatchTestInfo(batch)" />
              </div>
            </div>

            <h4>ชื่อนํ้ายาฆ่าเชื้อ</h4>
            <h5 v-show="!submission.info.reportLang.thai && !submission.info.reportLang.eng"
                class="text-primary">
              <i class="fas fa-exclamation-triangle mr-2" />กรุณาเลือกภาษารายงานอย่างน้อย 1 ภาษา
            </h5>
            <div class="form-row">
              <div  v-show="submission.info.reportLang.thai"
                    class="form-group col-6 mb-2">
                <label>ภาษาไทย</label>
                <input type="text"
                       class="form-control"
                       v-model.lazy="batch.disinfectantName">
              </div>
            </div>
            <div class="form-row mb-3">
              <div  v-show="submission.info.reportLang.eng"
                    class="form-group col-6">
                <label>English</label>
                <input type="text"
                        class="form-control"
                        v-model.lazy="batch.disinfectantNameEng">
              </div>
            </div>

            <h3 class="my-3">รายการทดสอบ</h3>
            <div class="form-row border-bottom-lighter px-3 mb-1">
              <div class="col-4">
                <h5 class="color-light-text">
                  ทดสอบต่อไวรัส
                </h5>
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col-4">
                    <h5 class="color-light-text">
                      ความเข้มข้น
                    </h5>
                  </div>
                  <div class="col-8">
                    <h5 class="color-light-text">
                      ระยะสัมผัส
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div v-for="(dilutions, test) in batch.tests"
                 :key="test"
                 class="form-row test-row border-bottom-lighter px-3">
              <div class="col-4 position-relative">
                <h5 class="d-inline">
                  {{ test }}
                </h5>
                <a class="btn btn-sm btn-x disinfectant-test"
                   @click="$delete(batch.tests, test)">
                  <i class="fas fa-times" />
                </a>
              </div>
              <div class="col-8">
                <div v-for="(times, dilution) in dilutions"
                     :key="dilution"
                     class="row test-row">
                  <div class="col-4 position-relative">
                    <h5 class="d-inline">
                      {{ dilution }}
                    </h5>
                    <a class="btn btn-sm btn-x disinfectant-test"
                       @click="$delete(batch.tests[test], dilution)">
                      <i class="fas fa-times" />
                    </a>
                  </div>
                  <div class="col-4">
                    <div v-for="(time, idx) in times"
                         :key="time"
                         class="test-row position-relative">
                      <h5 class="d-inline">{{ time }}</h5>
                      <h5 class="d-inline ml-1">นาที</h5>
                      <a class="btn btn-sm btn-x disinfectant-test"
                         @click="batch.tests[test][dilution].splice(idx, 1)">
                        <i class="fas fa-times" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="Object.keys(batch.tests).length <= 0"
                 class="border-bottom-lighter">
              <h4 class="color-muted my-3 ml-3">
                ยังไม่มีรายการทดสอบ
              </h4>
            </div>

            <div class="form-row mt-3">
              <div class="col-4">
              </div>
              <div class="col-2 text-right">
                <h5 class="color-light-text mt-2 ml-3">
                  รวมเป็น
                </h5>
              </div>
              <div class="col-2 text-right">
                <h2 class="text-primary">
                  {{ 
                    Object.values(batch.tests).reduce( (acc, test) => {
                      return acc + Object.values(test).flat().length
                    }, 0)
                  }}
                </h2>
                <h5 class="color-light-text">
                  รายการตรวจ
                </h5>
              </div>
              <div class="col-1 pt-2 d-flex color-light-text">
                <i class="fas fa-times small-icon mt-1" />
                <h5 class="mx-2">3000฿</h5>
                <i class="fas fa-equals small-icon mt-1" />
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

            <form-disinfectant-test-input
              class="mt-4"
              :tests="testType(batch.testType).testInfo"
              @add="addDisinfectantTest($event, batch)" />

          </div>
        </div>
      </div>
      <!-- END DISINFECTANT BATCH -->
    </div>
    <!-- END BATCH SECTION -->
  
    <a  class="btn btn-primary btn-width-md align-self-center my-4"
        @click="addBatch()">
      {{ 
          isGeneralSubmission?      'เพิ่มกลุ่มการทดสอบ' :
          isDisinfectantSubmission? 'เพิ่มรายการนํ้ายาฆ่าเชื้อ' : ''
      }}
    </a> 

  </form>

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
    border-bottom: 1px solid $accent;
    padding-bottom: 5px;
  }
  &:not(:first-child) {
    padding-top: 5px;
  }
}

a.btn.btn-x {
  &.batch-section {
    position: absolute;
    height: 35px;
    width: 35px;
    right: 15px;
    top: 20px;
    i { font-size: 1.25rem; }
  }
  &.custom-test {
    position: absolute;
    height: 28px;
    width: 28px;
    right: 265px;
    top: 6px;
  }
  &.disinfectant-test {
    height: 25px;
    width: 25px;
    margin-left: 10px;
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
  width: 150px;
}


#submit-samples-nav {
  position: sticky;
  top: 70px;
  background: $bg;
  border-bottom: 1px solid $accent;
  z-index: 999;
  box-shadow: 0 5px 5px -5px #333;
  a {
    &.button {
      font-size: 1.1rem;
      padding: 0.1em 0.3em;
    }
    &.active {
      background: $accent;
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
import { merge } from 'lodash'
import FormDisinfectantTestInput from '@/util/FormDisinfectantTestInput.vue'
import FormAntibioticsSensitivity from '@/util/FormAntibioticsSensitivity.vue'
import FormSampleInfoMultifill from '@/util/FormSampleInfoMultifill.vue'

export default {
  name: 'sample-info',
  components: {
    FormDisinfectantTestInput,
    FormAntibioticsSensitivity,
    FormSampleInfoMultifill
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
    isGeneralSubmission () {
      return this.submission.type === 1
    },
    isDisinfectantSubmission () {
      return this.submission.type === 2
    },
    hasMultipleBatches () {
      return this.submission.batches.length > 1
    }
  },
  beforeMount () {
    this.onReportTypeChange()
  },
  methods: {
    onReportTypeChange () {
      // General type
      if (this.isGeneralSubmission) {
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
            sampleCount: null,
            totalPrice: 0,
            tests: {},
            samples: [],
            customTests: []
          }
        ]
      // Disinfectant Type
      } else if (this.isDisinfectantSubmission) {
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
            disinfectantName: '',
            disinfectantNameEng: '',
            sampleCount: null,
            totalPrice: 0,
            tests: {},
            samples: []
          }
        ]
      }
      this.updateBatchTestInfo(this.submission.batches[0])
    },

    updateBatchTestInfo (batch) {
      batch.sampleCount = null
      batch.totalPrice = 0
      batch.samples = []
      batch.sensitivityTests = ''
      batch.tests = {}
      batch.customTests = []
      // Initialize test selection data
      if (this.isGeneralSubmission) {
        let newTests = {}
        for (let test of this.testType(batch.testType).testInfo) {
          newTests[test.id] = {
            id: test.id,
            selected: false,
          }
        }
        batch.tests = Object.assign({}, batch.tests, newTests)
      } else if (this.isDisinfectantSubmission) {
        batch.disinfectantName = ''
        batch.disinfectantNameEng = ''
        batch.tests = {}
      }
    },

    onSampleCountInputBlur (value, batch) {
      // Floor to not allow decimals
      let newCount = Math.floor(value)
      // Set to null if left empty or negative
      if (!newCount || newCount <= 0) {
        newCount = null
      // Set to 100 if larger than 100
      } else if (newCount > 100) {
        newCount = 100
      }
      batch.sampleCount = newCount

      // Check for max/min sample counts
      this.testType(batch.testType).testInfo
        .filter( t => t.min || t.max )
        .forEach( t => {
          if ( (t.max && batch.sampleCount > t.max) ||
               (t.min && batch.sampleCount < t.min) ) {
            batch.tests[t.id].selected = false
          }
        })
      this.onTestCheckboxChange(batch)
    },

    onTestCheckboxChange (batch) {
      // Update Batch total price
      batch.totalPrice = this.testType(batch.testType).testInfo
        .filter( t => batch.tests[t.id].selected )
        .reduce( (acc, t) => acc + (t.price * batch.sampleCount), 0 )

      // Update batch samples list
      const diff = Math.abs(batch.sampleCount - batch.samples.length)
      if (batch.sampleCount > batch.samples.length) {
        for (let i = batch.samples.length; i < batch.sampleCount; i++) {
          batch.samples[i] = Object.assign(
            {},
            batch.samples[i],
            { sampleId: null, extraInfo: null }
          )
        }
      } else if (batch.sampleCount < batch.samples.length) {
        batch.samples.splice(batch.samples.length - diff, diff)
      }
    },

    includesSensitivityTest (batch) {
      // Bad code, fix later
      let sensitivityTestIds = this.testType(batch.testType).testInfo
        .filter( test => test.category === 12)
        .map( test => test.id )
      let sensitivityTestActive = Object.values(batch.tests)
        .filter( test => sensitivityTestIds.includes(test.id) )
        .reduce( (acc, test) => acc || test.selected, false)
      return sensitivityTestActive || (batch.customTests && batch.customTests.length > 0) 
    },

    updateSampleDetails(batch, payload) {
      for (const range of payload.ranges) {
        if (range.length > 1) {
          for (let i = range[0]-1; i < range[1]; i++) {
            batch.samples.splice(i, 1, { sampleId: payload.sampleId, extraInfo: payload.extraInfo })
          }
        } else {
          batch.samples.splice(range[0]-1, 1, { sampleId: payload.sampleId, extraInfo: payload.extraInfo })
        }
      }
    },

    addBatch () {
      // General type
      if (this.isGeneralSubmission) {
        this.submission.batches.push({
          testType: 1,
          sampleCount: null,
          totalPrice: 0,
          tests: {},
          samples: [],
          customTests: []
        })
      // Disinfectant Type
      } else if (this.isDisinfectantSubmission) {
        this.submission.batches.push({
          testType: 5,
          disinfectantName: '',
          sampleCount: null,
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

    addDisinfectantTest (val, batch) {
      batch.tests = Object.assign({}, batch.tests, merge(batch.tests, val))
      const basePrice = 3000
      // Total tests
      const totalTests = Object.values(batch.tests)
        .reduce( (acc, test) => {
          return acc + Object.values(test).flat().length
        }, 0)
      //const numCells = 1

      // Calculate Total Price
      batch.totalPrice = basePrice + basePrice*(totalTests)
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

    getBatchNavLabel (number) {
      return  (!this.hasMultipleBatches)? 'รายการทดสอบ' :
              (this.isGeneralSubmission)? `กลุ่ม ${number}` :
              (this.isDisinfectantSubmission)? `นํ้ายาฆ่าเชื้อ ${number}` : '???'
    }
  }
}
</script>
