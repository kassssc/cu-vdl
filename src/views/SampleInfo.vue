<template>
<div class="d-flex flex-column">

  <template v-if="!inReviewMode">
    <div class="submit-samples-nav d-flex align-items-center p-2">
      <scrollactive active-class="scrollactive-active"
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
      <button class="btn btn-transparent btn-sm"
              @click="inReviewMode = true">
        {{ $t(`submit.review`) }}
      </button>
    </div>
  
    <div class="font-chatthai d-flex flex-column align-items-center px-3 py-0 max-width-1250">    
      
      <div id="info" class="border-bottom-lighter row w-100 py-4 pt-xl-5">
        <div class="col-xl-2 col-12">
          <h3 class="mb-2">
            ข้อมูลเบื้องต้น
          </h3>
        </div>
        <div class="col-12 col-xl-10">
          <h4 class="mb-1 text-dark">
            ประเภทการตรวจ
          </h4>
          <div class="form-row mb-4">
            <div class="form-group col-8 col-xl-6">
              <form-inline-select :options="reportTypes"
                                  v-model="submission.type"
                                  :warnBeforeChange="wholeFormHasInformation()"
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
                      :value="`${user.firstName} ${user.lastName}`"
                      disabled >
            </div>
            <div class="form-group col-2">
              <label>
                วันที่ส่งตัวอย่าง
              </label>
              <datepicker format="dd/MM/yy"
                          v-model="submission.fixedInfo.submitDate"
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
                องค์กรเจ้าของตัวอย่าง <i v-if="userIsFreelance" class="fas fa-star-of-life" />
              </label>
              <select v-if="userIsFreelance"
                      class="form-control"
                      v-model="submission.info.orgId">
                <option>เลือก...</option>
                <option>ฟาร์มสมควร</option>
                <option>ฟาร์มสมหมาย</option>
                <option>ฟาร์มสมคิด</option>
                <option>ฟาร์มสมชาย</option>
              </select>
              <input  v-else
                      type="text"
                      class="form-control"
                      :value="org.name"
                      disabled >
            </div>
            <div v-if="isGeneralSubmission" class="form-group col-2">
              <label>
                วันที่เก็บตัวอย่าง <i class="fas fa-star-of-life" />
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
                ชนิดตัวอย่าง
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
              <input  type="text"
                      list="animalType"
                      class="form-control"
                      v-model.lazy="submission.info.animalTypeId" />
              <datalist id="animalType">
                <option>สุกร</option>
                <option>สุนัข</option>
                <option>กระต่าย</option>
                <option>ม้า</option>
              </datalist>
              <!-- <select class="form-control"
                      v-model="submission.info.animalTypeId">
                <option>เลือก...</option>
                <option>สุกร</option>
                <option>สุนัข</option>
                <option>กระต่าย</option>
                <option>ม้า</option>
              </select> -->
            </div>
            <div class="form-group col-3">
              <label>
                พันธุ์
              </label>
              <input  type="text"
                      class="form-control"
                      v-model.lazy="submission.info.animalSpecies">
            </div>
            <div class="form-group col-4">
              <label>
                อายุ
              </label>
              <input  class="form-control"
                      v-model.lazy="submission.info.animalAge">
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
                        v-model.lazy="submission.info.illness" />
            </div>
            <div class="form-group col-6">
              <label>
                ประวัติการทำวัคซีน
              </label>
              <textarea type="number" rows="4"
                        class="form-control"
                        v-model.lazy="submission.info.vaccinations" />
            </div>
          </div>
        </div>
      </div>
      <!-- END INFO SECTION -->
    
      <div  id="report"
            class="row w-100 border-bottom-pink py-4">
        <div class="col-xl-2 col-12">
          <h3 class="mb-2">
            รายงาน
          </h3>
        </div>
        <div class="col-xl-10 col-12">
          <h4 class="d-inline text-dark">
            {{ $t(`general.notify`)}}
          </h4>
          <i class="fas fa-star-of-life text-primary icon-sm d-inline" />
          
          <div class="form-row">
            <div class="form-group col-4">
              <label>
                {{ $t(`general.email`)}}
              </label>
              <input  type="text"
                      class="form-control"
                      v-model.trim="submission.report.email">
            </div>
            <div class="form-group col-4">
              <label>
                {{ $t(`general.phone`)}}
              </label>
              <input  type="number"
                      class="form-control"
                      v-model.trim="submission.report.phone">
            </div>
            <div class="form-group col-4">
              <label>
                {{ $t(`general.fax`)}}
              </label>
              <input  type="number"
                      class="form-control"
                      v-model.trim="submission.report.fax">
            </div>
          </div>

          <div v-show="noNotifications" class="mb-3">
            <i class="fas fa-exclamation-triangle mr-1 text-primary d-inline" />
            <h5 class="text-primary mb-3 d-inline">
              กรุณาใส่ช่องทางการแจ้งผลอย่างน้อย 1 ช่องทาง
            </h5>
          </div>
    
          <template v-if="isDisinfectantSubmission">
            <h4 class="d-inline">รายงานเป็นภาษา </h4>
            <i class="fas fa-star-of-life text-primary icon-sm d-inline" />
            <div class="form-row">  
              <div class="form-group d-flex col-4 mb-2">
                <checkbox label="ไทย"
                          class="mr-4"
                          v-model="submission.reportLang.thai" />
                <checkbox label="English"
                          v-model="submission.reportLang.eng" />
              </div>
            </div>
            <div v-show="noLang()">
              <i class="fas fa-exclamation-triangle mr-1 d-inline text-primary" />
              <h5 class="text-primary d-inline">
                กรุณาเลือกภาษารายงานอย่างน้อย 1 ภาษา
              </h5>
            </div>
          </template>
        </div>
      </div>
      <!-- END REPORT SECTION -->
    
      <!-- BATCH SECTION -->
      <div  v-for="(batch, idxBatch) in submission.batches"
            :key="idxBatch"
            :id="'batch' + (idxBatch+1)"
            class="batch expand-in-batch submission-section w-100 position-relative border-bottom-medium py-5">
        <a  v-if="hasMultipleBatches"
            class="btn btn-x batch-section"
            @click="removeBatch(idxBatch)">
          <i class="fas fa-times" />
        </a>
  
        <!-- GENERAL BATCH -->
        <template v-if="isGeneralSubmission">
          <div class="row w-100">
            <div class="col-xl-2 col-12">
              <h3 class="mb-2">
                {{ 
                    hasMultipleBatches?
                    `กลุ่มการทดสอบ ${idxBatch+1}` : 'รายการทดสอบ'
                }}
              </h3>
              <h5 class="ml-3 text-medium d-xl-block d-none">
                {{ `งาน${testType(batch.testType).name}`}}
              </h5>
              <h5 v-if="batch.sampleCount"
                  class="ml-3 text-medium d-xl-block d-none">
                {{ `${batch.sampleCount} ตัวอย่าง` }}
              </h5>
            </div>
            <div class="col-xl-10 col-12">
              <h4 class="mb-1 text-dark">
                เลือกประเภทงานทดสอบ
              </h4>
              <div class="form-row mb-4">
                <div class="form-group col-8">
                  <form-inline-select
                    :options="tests(submission.type)"
                    v-model="batch.testType"
                    @change="updateBatchInfo(batch)" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-2">
                  <h4 class="text-dark">
                    จำนวนตัวอย่าง  <i class="fas fa-star-of-life text-primary icon-sm" />
                  </h4>
                  <input  type="number"
                          class="form-control text-right"
                          v-model.lazy.number="batch.sampleCount"
                          @focus="$event.target.select()"
                          @blur="updateGeneralBatchSampleCount($event.target.value, batch)" >
                </div>
              </div>
              <div class="form-row no-gutters border-bottom-lighter pb-1">
                <div class="col-2 text-dark">
                  <h4>
                    เลือกการทดสอบ
                  </h4>
                </div>
                <div class="col-10 mt-2">
                  <div class="form-row">
                    <div class="col-6"></div>
                    <div class="col-2 text-right">
                      <h5 class="text-dark">
                        ราคา/ตัวอย่าง
                      </h5>
                    </div>
                    <div class="col-1">
                    </div>
                    <div class="col-2">
                      <h5 class="text-dark text-right">
                        ยอดค่าบริการ
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
    
              <div  v-for="category in testType(batch.testType).testCategories"
                    :key="category.name"
                    class="row no-gutters test-row">
                <div class="col-2 pr-2 text-dark">
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
                                v-model="batch.tests[test.id]"
                                @change="updateGeneralBatchTotalPrice(batch)" />
                    </div>
                    <div class="form-group text-right mb-0 col-2">
                      <h5>
                        {{ `${test.price}฿` }}
                      </h5>
                    </div>
                    <div class="form-group col-1 mb-0 text-right text-muted">
                      <div v-if="batch.tests[test.id] && batch.sampleCount"
                           class="nowrap">
                        <i class="fas fa-times icon-sm d-inline"></i>
                        <h5 class="mx-1 d-inline">
                          {{ batch.sampleCount }}
                        </h5>
                        <i class="fas fa-equals icon-sm d-inline"></i>
                      </div>
                    </div>
                    <div class="form-group col-2 mb-0 text-right">
                      <div v-if="batch.tests[test.id] && batch.sampleCount">
                        <h5>
                          {{ `${(test.price * batch.sampleCount).toLocaleString()}฿` }}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div v-if="isBacteriaTest(batch)"
                   class="row no-gutters border-bottom-lighter">
                <div class="col-2 pt-2 pr-2">
                  <h5 class="text-dark">รายการอื่นๆ</h5>
                </div>
                <div class="col-10">
                  <div class="form-row">
                    <div class="col-8 py-1">
                      <div  v-for="(customTest, idx) of batch.customTests"
                            :key="idx"
                            class="form-row py-1">
                        <div class="col-12">
                          <input  v-focus-on-create
                                  type="text"
                                  class="form-control form-control-sm"
                                  v-model.lazy="batch.customTests[idx]">
                        </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-primary btn-sm my-2 pt-1"
                                @click="addCustomTest(batch)">
                          เพิ่มรายการแบคทีเรีย
                        </button>
                        <h5>รอประเมินราคา (ประมาน 500฿ ต่อรายการ ต่อตัวอย่าง)</h5>
                      </div>
                    </div>
                    <div class="col-1 py-1">
                      <div  v-for="(customTest, idx) of batch.customTests"
                            :key="idx"
                            class="form-row py-1">
                        <a  class="btn btn-sm btn-x custom-test"
                            @click="deleteCustomTest(batch, idx)">
                          <i class="fas fa-times" />
                        </a>
                      </div>
                    </div>
                    <div  v-if="batch.customTests.length > 0 && batch.sampleCount > 0"
                          class="col-2 py-1 d-flex align-items-end justify-content-end pt-2">
                      <!-- <h5>~500฿</h5>
                      <h5><i class="fas fa-times icon-sm" /> {{ batch.sampleCount }}</h5>
                      <h6 class="text-muted squeeze-up">ตัวอย่าง</h6>
                      <h5><i class="fas fa-times icon-sm" /> {{ batch.customTests.length }}</h5>
                      <h6 class="text-muted squeeze-up">รายการอื่นๆ</h6> -->
                      <h4 class="mb-2">
                        <!-- <i class="fas fa-equals icon-sm" /> -->
                        {{`~${batch.sampleCount * batch.customTests.length * 500}฿`}}
                      </h4>
                    </div>
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
                        {{ batch.sampleCount? batch.sampleCount : 'N/A' }}
                      </h2>
                      <h5 class="text-medium">
                        ตัวอย่าง
                      </h5>
                    </div>
                    <div class="col-2 text-right">
                      <h2 class="text-primary">
                        {{ activeTestCount(batch) + batch.customTests.length }}
                      </h2>
                      <h5 class="text-medium">
                        รายการทดสอบ
                      </h5>
                    </div>
                    <div class="col-1 text-right nowrap">
                      <h5 class="text-medium mt-2 ml-3">
                        รวมเป็น
                      </h5>
                    </div>
                    <div class="col-2 text-right">
                      <h2 class="text-primary">
                        {{
                            (activeTestCount(batch) > 0 || batch.customTests.length > 0) && batch.sampleCount?
                              `${batch.customTests.length > 0? '~':''}${batch.totalPrice.toLocaleString()}฿` : 'N/A'
                        }}
                      </h2>
                      <h5 class="text-medium">
                        ค่าบริการ
                      </h5>
                      <h6 v-if="batch.customTests.length > 0"
                          class="text-muted">
                        *เป็นราคาโดยประมานเท่านั้น
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
                  <h5 class="text-medium">
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
            <div class="col-xl-2 col-12">
              <h4 class="mb-2">
                รายละเอียดตัวอย่าง
              </h4>
            </div>
    
            <div v-show="batch.sampleCount <= 0" class="col-10 mt-1">
              <i class="fas fa-exclamation-triangle mr-2 text-primary d-inline" />
              <h5 class="text-primary d-inline">
                กรุณาใส่จำนวนตัวอย่างก่อน
              </h5>
            </div>
    
            <div v-show="batch.sampleCount > 0" class="col-xl-10 col-12">

              <div class="form-row w-100 mb-3">
                <div class="col-1 mr-3"></div>
                <div class="col-10 p-0">
                  <form-sample-info-multifill
                    :max-samples="batch.sampleCount"
                    @add="updateSampleDetails(batch, $event)" />
                </div>
              </div>
    
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
  
              <div  v-for="(sample, idxSample) of batch.samples"
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
  
            </div>
          </div>
        </template>
        <!-- END GENERAL BATCH -->
  
        <!-- DISINFECTANT BATCH -->
        <template v-else-if="isDisinfectantSubmission">
          <div class="row w-100">
            <div class="col-xl-2 col-12">
              <h3 class="mb-2">
                การทดสอบ
              </h3>
              <h5 v-if="hasMultipleBatches"
                  class="text-medium">
                {{ batch.disinfectantName }}
              </h5>
            </div>
  
            <div class="col-xl-10 col-12">
              <h5 class="mb-1">
                ทดสอบประสิทธิภาพยาฆ่าเชื้อต่อ
              </h5>
              <div class="form-row">
                <div class="form-group col-6">
                  <form-inline-select
                    :options="tests(submission.type)"
                    v-model="batch.testType"
                    @change="updateBatchInfo(batch)" />
                </div>
              </div>
  
              <h4 class="mt-3">ชื่อนํ้ายาฆ่าเชื้อ</h4>
              
              <div v-show="noLang()">
                <i class="fas fa-exclamation-triangle mr-1 d-inline text-primary" />
                <h5 class="text-primary d-inline">
                  กรุณาเลือกภาษารายงานอย่างน้อย 1 ภาษา
                </h5>
              </div>
              
              <div class="form-row">
                <div  v-show="submission.reportLang.thai"
                      class="form-group col-6 mb-2">
                  <label>ภาษาไทย</label>
                  <input type="text"
                         class="form-control"
                         v-model.lazy="batch.disinfectantName">
                </div>
              </div>
              <div class="form-row">
                <div  v-show="submission.reportLang.eng"
                      class="form-group col-6">
                  <label>English</label>
                  <input type="text"
                          class="form-control"
                          v-model.lazy="batch.disinfectantNameEng">
                </div>
              </div>
  
              <h3 class="mt-3 mb-1">รายการทดสอบ</h3>
              <div class="form-row border-bottom-lighter px-3 pb-2 mb-1">
                <div class="col-4">
                  <h5 class="text-medium">
                    ชื่อ{{ isVirusBatch(batch)? 'ไวรัส' : isBacteriaBatch(batch)? 'แบคทีเรีย' : '' }}
                  </h5>
                </div>
                <div class="col-6">
                  <div class="form-row">
                    <div class="col-4">
                      <h5 class="text-medium">
                        ความเข้มข้น
                      </h5>
                    </div>
                    <div class="col-8">
                      <div class="form-row">
                        <div class="col-6">
                          <h5 class="text-medium">
                            ระยะสัมผัส
                          </h5>
                        </div>
                        <div  v-show="isBacteriaBatch(batch)"
                              class="col-6">
                          <h5 class="text-medium">
                            ระยะหลังการเจือจาง
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div v-for="(info, test) in batch.tests"
                   :key="test"
                   class="form-row test-row border-bottom-lighter position-relative px-3">
                <a class="btn btn-sm btn-x disinfectant-test"
                    @click="deleteDisinfectantTest(batch, test)">
                  <i class="fas fa-times" />
                </a>

                <div class="col-4 pr-5">
                  <h4 class="d-inline">
                    {{ test }}
                  </h4>
                </div>

                <div class="col-6">
                  <div v-for="dilution of info.dilutions"
                       :key="dilution"
                       class="form-row test-row">
                    <div class="col-4 position-relative">
                      <h4 class="d-inline">
                        {{ dilution }}
                      </h4>
                    </div>

                    <div  v-if="isVirusBatch(batch)"
                          class="col-4">
                      <div v-for="time of info.contactTimes"
                            :key="time"
                            class="test-row position-relative">
                        <h5 class="d-inline">{{ time }}</h5>
                        <h5 class="d-inline ml-1">นาที</h5>
                      </div>
                    </div>

                    <div  v-else-if="isBacteriaBatch(batch)"
                          class="col-8">
                      <div  v-for="time of info.contactTimes"
                            :key="time"
                            class="form-row test-row">
                        <div class="col-6">
                            <h5 class="d-inline">{{ time }}</h5>
                            <h5 class="d-inline ml-1">นาที</h5>
                        </div>
                        <div class="col-6">
                          <div  v-for="dt in info.dilutionTimes"
                                :key="dt"
                                class="form-row test-row">
                            <div class="col-12">
                              <h5 class="d-inline">{{ dt }}</h5>
                              <h5 class="d-inline ml-1">วัน</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div class="col-2 d-flex flex-column align-items-end justify-content-end pr-4">
                  <h5>
                    {{ `${info.price.toLocaleString()}฿` }}
                  </h5>
                  <h6 class="text-muted squeeze-up">
                    ต่อรายการ
                  </h6>
                  <h5 class="mt-1">
                    <i class="fas fa-times icon-sm"></i>
                    {{ info.numTests }}
                  </h5>
                  <h6 class="text-muted squeeze-up">
                    รายการ
                  </h6>
                  <h4 class="mt-1 text-primary">
                    <i class="fas fa-equals mr-1 icon-sm"></i>
                    {{ `${info.totalPrice.toLocaleString()}฿` }}
                  </h4>
                </div>
              </div>
  
              <div v-show="Object.keys(batch.tests).length <= 0"
                   class="border-bottom-lighter">
                <h4 class="text-muted my-3 ml-3">
                  ยังไม่มีรายการทดสอบ
                </h4>
              </div>
  
              <div class="form-row mt-4">
                <div class="col-9 d-flex justify-content-end align-items-end">
                  <template v-if="Object.keys(batch.tests).length > 0">
                    <div  v-show="isVirusBatch(batch)"
                          class="text-right position-relative cost-container">
                      <h4 class="text-primary">
                        <i class="fas fa-plus icon-sm"></i>
                        {{ `${batch.dilutionCost.toLocaleString()}฿` }}
                      </h4>
                      <h5 class="text-medium">
                        ค่า Dilution
                      </h5>
                      <div class="hint-container">
                        <h4 class="text-primary mb-1">การคำนวณค่า Dilution</h4>
                        <h5>คำนวณจากจำนวนความเข้มข้นของแต่ละประเภท cell ไวรัส ซึ่งระบุไว้ใน [ ] หลังชื่อไวรัส หากไวรัสหลายตัวภายใต้ cell ประเภทเดียวกันใช้ความเข้มข้นซํ้ากัน จะคิดราคาแค่รอบเดียวเท่านั้น</h5>
                        <div  v-for="(arr, cell) in batch.uniqueCells"
                              :key="cell">
                          <h5 class="text-primary">{{ cell }}</h5>
                          <h5 class="ml-2">
                            3,000฿
                            <i class="fas fa-times icon-sm" />
                            {{ `${arr.length} ความเข้มข้น` }}
                            <i class="fas fa-equals icon-sm" />
                            <span class="text-primary ml-1">{{ `${(3000 * arr.length).toLocaleString()}฿` }}</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="text-right ml-4">
                      <h4 class="text-primary">
                        <i class="fas fa-plus icon-sm"></i>
                        3,000฿
                      </h4>
                      <h5 class="text-medium">
                        ค่าประเมินผล
                      </h5>
                    </div>
                  </template>
                </div>
                <div class="col-1 d-flex flex-column align-items-end justify-content-end">
                  <h5 class="text-medium mb-4">
                    รวมเป็น
                  </h5>
                </div>
                <div class="col-2 pr-4 d-flex flex-column align-items-end justify-content-end">
                  <h2 class="text-primary">
                    {{ 
                        Object.values(batch.tests).length > 0?
                          `${batch.totalPrice.toLocaleString()}฿` : 'N/A'
                    }}
                  </h2>
                  <h5 class="text-medium">
                    ค่าบริการ
                  </h5>
                </div>
              </div>
  
              <form-disinfectant-test-input
                class="mt-4"
                :testType="batch.testType"
                :tests="testType(batch.testType).testInfo"
                @add="addDisinfectantTest($event, batch)" />
  
            </div>
          </div>
        </template>
        <!-- END DISINFECTANT BATCH -->
      </div>
      <!-- END BATCH SECTION -->
    </div>

    <button class="btn btn-secondary align-self-center mt-4 font-chatthai"
          :disabled="!batchHasInformation(submission.batches[submission.batches.length-1])"
          @click="addBatch()">
       <i class="fas fa-plus btn-inner-icon" />
      {{ 
        isGeneralSubmission?      'เพิ่มกลุ่มการทดสอบ' :
        isDisinfectantSubmission? 'เพิ่มรายการนํ้ายาฆ่าเชื้อ' : ''
      }}
    </button>

    <button class="btn btn-primary align-self-center px-5 my-5 btn-lg"
            @click="inReviewMode = true">
      <i class="fas fa-check btn-inner-icon" />
      {{ $t(`submit.review`) }}
    </button>
  </template>

  <review-submission
    v-else
    :submission="submission"
    @back="inReviewMode = false"/>

  <div class="font-chatthai">
    <button class="btn btn-lg mb-4 btn-dark font-chatthai align-self-center"
            @click="DEV_VIEW_JSON = !DEV_VIEW_JSON">
      DEV: {{DEV_VIEW_JSON? 'Hide' : 'View'}} JSON Form Data
    </button>
    <div v-if="DEV_VIEW_JSON">
      <h3>JSON Form Data</h3>
      <pre class="font-chatthai">
        <h4 class="text-default">
          {{ JSON.stringify(submission, null, '\t') }}
        </h4>
      </pre>
    </div>
  </div>

</div>
</template>

<style lang="scss" scoped>
.batch {
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
    height: 30px;
    width: 25px;
    padding-top: 0.1em;
    margin-left: -5px;
  }
  &.disinfectant-test {
    position: absolute;
    height: 25px;
    width: 25px;
    top: 6px;
    right: 10px;
  }
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

.submit-samples-nav {
  position: sticky;
  top: $titlebar-height-scrolled;
  background: $light;
  border-bottom: 1px solid $accent;
  z-index: 99;
  box-shadow: 0 5px 5px -5px #333;
}

.cost-container {
  cursor: pointer;
  &:hover .hint-container {
    transform: scale(1);
  }
  .hint-container {
    width: 300px;
    bottom: 60px;
    right: -10px;
    transform-origin: 90% 100%;
  }
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

<script>
import { mapGetters } from 'vuex'
import FormDisinfectantTestInput from '@/util/FormDisinfectantTestInput.vue'
import FormAntibioticsSensitivity from '@/util/FormAntibioticsSensitivity.vue'
import FormSampleInfoMultifill from '@/util/FormSampleInfoMultifill.vue'
import ReviewSubmission from '@/components/ReviewSubmission.vue'

import { union } from 'lodash'

export default {
  name: 'sample-info',
  components: {
    FormDisinfectantTestInput,
    FormAntibioticsSensitivity,
    FormSampleInfoMultifill,
    ReviewSubmission
  },
  data () {
    return {
      submission: {
        type: 1,
        fixedInfo: {
          submitterName: 'สมควร สมสกุล',
          submitDate: '04/04/20',
        },
        info: {},
        report: {},
        reportLang: null,
        batches: [{}]
      },
      inReviewMode: false,
      DEV_VIEW_JSON: false
    }
  },
  computed: {
    ...mapGetters([
      'userIsFreelance',
      'user',
      'org',
      'reportTypes',
      'tests',
      'testType',
      'testCategory',
      'sensitivityTestIds'
    ]),
    isGeneralSubmission () {
      return this.submission.type === 1
    },
    isDisinfectantSubmission () {
      return this.submission.type === 2
    },
    hasMultipleBatches () {
      return this.submission.batches.length > 1
    },
    noNotifications () {
      return !Object.values(this.submission.report).reduce( (acc, i) => acc || i, false )
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
          orgId: null,
          sampleTakenDate: null,
          sampleTypeId: null,
          animalTypeId: null,
          animalSpecies: null,
          animalAge: null,
          animalCount: null,
          illness: null,
          vaccinations: null,
        }
        this.submission.reportLang = null
      // Disinfectant Type
      } else if (this.isDisinfectantSubmission) {
        this.submission.info = {
          orgId: null,
        }
        this.submission.reportLang = {
          thai: true,
          eng: false
        }
      }

      this.submission.report = {
        phone: null,
        fax: null,
        email: null
      }
      this.submission.batches = []
      this.submission.batches.push(this.generateNewBatch())
    },

    generateNewBatch () {
      let newBatch
      // General type
      if (this.isGeneralSubmission) {
        newBatch = {
          testType: 1,
          sampleCount: null,
          totalPrice: 0,
          tests: {},
          samples: [],
          customTests: [],
          sensitivityTests: null
        }
      // Disinfectant Type
      } else if (this.isDisinfectantSubmission) {
        newBatch = {
          testType: 5,
          disinfectantName: null,
          disinfectantNameEng: null,
          totalPrice: 0,
          dilutionCost: 0,
          uniqueCells: {},
          tests: {}
        }
      }
      this.updateBatchInfo(newBatch)
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

    removeBatch (idx) {
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

    updateBatchInfo (batch) {
      if (this.isGeneralSubmission) {
        batch.totalPrice = 0
        batch.customTests = []
        batch.sensitivityTests = null
        const newTests = {}
        for (const test of this.testType(batch.testType).testInfo) {
          newTests[test.id] = false
        }
        batch.tests = {...newTests}
      } else if (this.isDisinfectantSubmission) {
        batch.totalPrice = 0
        batch.dilutionCost = 0
        batch.uniqueCells = {}
        batch.tests = {}
      }
    },

    updateGeneralBatchTotalPrice (batch) {
      let price = this.testType(batch.testType).testInfo
        .filter( t => batch.tests[t.id] )
        .reduce( (acc, t) => acc + (t.price * batch.sampleCount), 0 )
      // Custom test prices
      if (this.isBacteriaTest(batch)) {
        price += batch.customTests.length * batch.sampleCount * 500
      }
      batch.totalPrice = price
    },

    updateGeneralBatchSampleCount (value, batch) {
      // Floor to not allow decimals
      let newCount = Math.floor(value)
      // Set to null if left empty or negative or 0
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
            batch.tests[t.id] = false
          }
        })
      
      // Update batch samples list
      const diff = Math.abs(batch.sampleCount - batch.samples.length)
      if (batch.sampleCount > batch.samples.length) {
        for (let i = batch.samples.length; i < batch.sampleCount; i++) {
          batch.samples[i] = { sampleId: null, extraInfo: null }
        }
      } else if (batch.sampleCount < batch.samples.length) {
        batch.samples.splice(batch.samples.length - diff, diff)
      }

      this.updateGeneralBatchTotalPrice(batch)
    },

    activeTestCount(batch) {
      return Object.values(batch.tests).reduce( (acc, test) => acc + (test? 1:0), 0)
    },

    addCustomTest(batch) {
      batch.customTests.push('')
      this.updateGeneralBatchTotalPrice(batch)
    },

    deleteCustomTest(batch, idx) {
      batch.customTests.splice(idx, 1)
      this.updateGeneralBatchTotalPrice(batch)
    },

    includesSensitivityTest (batch) {
      const sensitivityTestActive = Object.keys(batch.tests)
        .map( testId => parseInt(testId) )
        .filter( testId => this.sensitivityTestIds().includes(testId) )
        .reduce( (acc, testId) => acc || batch.tests[testId], false )
      return sensitivityTestActive || batch.customTests.length > 0
    },

    updateSampleDetails(batch, payload) {
      for (const range of payload.ranges) {
        const start = range[0] - 1
        const end = range.length > 1? range[1] : range[0]
        for (let i = start; i < end; i++) {
          batch.samples.splice(i, 1, { 
            sampleId: payload.sampleId,
            extraInfo: payload.extraInfo
          })
        }
      }
    },

    updateDisinfectantBatchTotalPrice (batch) {
      let totalPrice = Object.values(batch.tests).reduce( (acc, curr) => acc + curr.totalPrice, 0)
      if (this.isVirusBatch(batch)) {
        const cells = {}
        Object.values(batch.tests).forEach( t => {
          cells[t.cellName] = (t.cellName in cells)?
            union(cells[t.cellName], t.dilutions) : [...t.dilutions]
        })
        batch.uniqueCells = cells
        batch.dilutionCost = Object.values(batch.uniqueCells).reduce( (acc, curr) => acc + 3000 * curr.length, 0)
        totalPrice += batch.dilutionCost
      }
      batch.totalPrice = 3000 + totalPrice
    },

    addDisinfectantTest (payload, batch) {
      batch.tests = {...batch.tests, ...payload}
      this.updateDisinfectantBatchTotalPrice(batch)
    },

    deleteDisinfectantTest (batch, testKey) {
      this.$delete(batch.tests, testKey)
      this.updateDisinfectantBatchTotalPrice(batch)
    },

    getBatchNavLabel (number) {
      return  (!this.hasMultipleBatches)? 'รายการทดสอบ' :
              (this.isGeneralSubmission)? `กลุ่ม ${number}` :
              (this.isDisinfectantSubmission)? `นํ้ายาฆ่าเชื้อ ${number}` : '???'
    },

    isBacteriaTest (batch) {
      return batch.testType === 4
    },
    isVirusBatch(batch) {
      return batch.testType === 5
    },
    isBacteriaBatch(batch) {
      return batch.testType === 6
    },
    batchHasInformation (batch) {
      if (batch) return batch.totalPrice !== 0
      return false
    },
    wholeFormHasInformation () {
      const infoSectionHasInfo = Object.values(this.submission.info).reduce( (acc, info) => acc || !!info, false)
      const reportSectionHasInfo = Object.values(this.submission.report).reduce( (acc, n) => acc || !!n, false)
      const batchesHaveInfo = this.submission.batches.reduce( (acc, b) => acc || this.batchHasInformation(b), false)
      return infoSectionHasInfo || reportSectionHasInfo || batchesHaveInfo
    },
    noLang () {
      return this.isDisinfectantSubmission && !this.submission.reportLang.thai && !this.submission.reportLang.eng
    },
  }
}
</script>
