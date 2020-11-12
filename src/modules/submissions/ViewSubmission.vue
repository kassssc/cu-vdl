<template>
<div class="page page-lg">
  <transition name="fade">
    <div  v-if="!$apollo.loading"
          class="d-flex align-items-start content-height-min">
      <div class="sub-nav overflow-visible sticky pl-4">
        <router-link  :to="{name: 'submissions-list'}"
                      tag="button"
                      exact
                      class="btn btn-transparent back-btn mb-3">
          <i class="fas fa-chevron-left mr-2" />กลับไป
        </router-link>
        <scrollactive active-class="scrollactive-active"
                      :offset="250"
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
          <a  v-if="submission.submission_type === 'การตรวจทั่วไป'"
              href="#sample-details"
              class="btn btn-transparent btn-block btn-lg scrollactive-item">
            <i class="fas fa-vial btn-inner-icon-lg" />
            ข้อมูลตัวอย่าง
          </a>
          <a  href="#test-details"
              class="btn btn-transparent btn-block btn-lg scrollactive-item">
            <i class="fas fa-microscope btn-inner-icon-lg" />
            การทดสอบ
          </a>
          <template v-if="is_admin">
            <h4 class="text-medium border-t pt-4 pb-2">แอดมิน</h4>
            <router-link  :to="{
                            name: 'edit-submission',
                            params: { id: submission_key }
                          }"
                          tag="a"
                          class="btn btn-transparent btn-block btn-lg">
              <i class="fas fa-edit btn-inner-icon-lg" />
              แก้ไขข้อมูล         
            </router-link>
            <!-- <a  class="btn btn-transparent btn-block btn-lg"
                @click="showCancelSubmissionModal()">
              <i class="fas fa-window-close btn-inner-icon-lg" />
              ยกเลิก
            </a> -->
          </template>
        </scrollactive>
      </div>
      
      <div class="sub-nav-content">
        <div  id="info"
              class="section">
          <h3 class="mb-4 mt-2 font-cu">
            <i class="fas fa-file-alt icon-lg" />
            การส่งตัวอย่างหมายเลข #<span class="text-primary">{{ $route.params.id }}</span>
          </h3>
    
          <div class="row">
            <div class="col-3">
              <h4>สถานะ</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <div class="form-group col-6">
                  <ColorTag
                    class="d-block"
                    :color="submission_status_colors[submission.submission_status]"
                    :label="submission.submission_status"
                    size="lg" />
                </div>
              </div>
            </div>
          </div>
    
          <div class="row mb-4">
            <div class="col-3">
              <h4>ใบส่งตัวอย่าง</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <FileView
                  class="col-6"
                  btn-class="btn-secondary"
                  :file-name="`${$route.params.id}_submission_form.pdf`"
                  icon-class="fas fa-file-alt" />
                <div class="w-100"></div>
                <div class="col-6 form-group">
                  <button class="btn btn-secondary btn-block font-cu">
                    <i class="fas fa-print btn-inner-icon"></i> ปริ้นสลิปการส่งตัวอย่าง
                  </button>
                </div>
              </div>
            </div>
          </div>
    
          <div class="row mb-4">
            <div class="col-3">
              <h4>ข้อมูลการส่งตัวอย่าง</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <div class="col-6 form-group">
                  <label>ประเภทการทดสอบ</label>
                  <ColorTag
                    class="d-block"
                    size="lg"
                    :color="submission_type_colors[submission.submission_type]"
                    :label="submission.submission_type" />
                </div>
                <div class="w-100"></div>
                <FormInput
                  class="col-3"
                  label="หมายเลขการส่งตัวอย่าง"
                  :value="submission_key"
                  disabled />
                <FormInput
                  class="col-3"
                  label="ภาษารายงาน"
                  disabled
                  :value="submission.english_report? 'English' : 'ภาษาไทย'" />
                <div class="w-100"></div>
                <FormDateInput
                  class="col-3"
                  label="วันที่ส่งตัวอย่าง"
                  format="dd/MM/yy"
                  disabled
                  :value="to_date_object(submission.submission_submit_date)" />
                <FormDateInput  
                  v-if="submission.sample_received_date"
                  class="col-3"
                  label="วันที่รับตัวอย่าง"
                  format="dd/MM/yy"
                  disabled
                  :value="to_date_object(submission.sample_received_date)" />
                <FormInput
                  v-else
                  class="col-3"
                  label="วันที่รับตัวอย่าง"
                  type="text"
                  disabled
                  value="ยังไม่ได้รับตัวอย่าง" />
              </div>
            </div>
          </div>
  
          <div class="row mb-4">
            <div class="col-3">
              <h4>ช่องทางการแจ้งผล</h4>
            </div>
            <div class="col">
              <div class="form-row">
                <FormInput
                  class="col-6"
                  label="อีเมล"
                  disabled
                  :value="submission.notify_to_email" />
                <FormInput
                  class="col-3"
                  label="หมายเลขโทรศัพท์"
                  disabled
                  :value="submission.notify_to_phone" />
              </div>
            </div>
          </div>
  
          <div class="row mb-4">
            <div class="col-3">
              <h4>บุคคล/องค์กรที่เกี่ยวข้่อง</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <div class="col-6">
                  <div class="form-row">
                    <FormInput
                      class="col-12"
                      label="ผู้ส่งตัวอย่าง"
                      disabled
                      :value="submission.on_sent_record_submitter_name" />
                    <FormTextarea
                      class="col-12"
                      rows="3"
                      disabled
                      :value="submission.on_sent_record_submitter_address" />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-row">
                    <FormInput
                      class="col-12"
                      label="เจ้าของตัวอย่าง/ฟาร์ม"
                      disabled
                      :value="submission.on_sent_record_owner_name" />
                    <FormTextarea
                      class="col-12"
                      rows="3"
                      disabled
                      :value="submission.on_sent_record_owner_address" />
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          <div v-if="submission.remarks" class="row mb-4">
            <div class="col-3">
              <h4>หมายเหตุอื่นๆ</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <div class="col-12">
                  <div class="form-row">
                    <FormTextarea
                      class="col-12"
                      disabled
                      :value="submission.remarks" />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
    
        <div id="reports"
              class="section">
          <h3 class="mb-4 font-cu">
            <i class="fas fa-file-invoice icon-lg" />
            รายงาน
          </h3>
          <div class="row">
            <div class="col-10">
              <div class="download-reports mb-2">
                <div class="row color-dark-grey border-b py-2">
                  <div class="col-4">
                    <h5 class="mb-0">เลขที่รายงาน</h5>
                  </div>
                  <div class="col-2">
                    <h5 class="mb-0">วันที่ออก</h5>
                  </div>
                  <div class="col-2">
                    <h5 class="mb-0">Version</h5>
                  </div>
                  <div class="col-2">
                    <h5 class="mb-0">ดูไฟล์</h5>
                  </div>
                  <div class="col-2">
                    <h5 class="mb-0">ดาวน์โหลด</h5>
                  </div>
                </div>
        
                <template v-if="submission.reports.length > 0">
                  <div  v-for="(report, idx) in submission.reports"
                        :key="idx"
                        class="row py-1 border-b">
                    <div class="col-4 d-flex align-items-center">
                      <h5 class="mb-0">{{ report.report_no }}</h5>
                    </div>
                    <div class="col-2 d-flex align-items-center">
                      <h5 class="mb-0">{{ to_display_date(report.date) }}</h5>
                    </div>
                    <div class="col-2 d-flex align-items-center">
                      <h5 class="mb-0">{{ report.report_version }}</h5>
                    </div>
                    <div class="col-2">
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
                </template>
                <div  v-else
                      class="py-3 text-center">
                  <h5 class="text-muted font-cu"><i class="far fa-frown mr-2"></i>ยังไม่มีรายงาน</h5>
                </div>
                
                <div  v-if="submission.reports.length > 0"
                      class="row mt-3">
                  <div class="col-12 d-flex justify-content-end">
                    <button class="btn btn-primary font-cu"
                            @click="download_all_reports()">
                      <i class="fas fa-file-archive btn-inner-icon"></i>
                      ดาวน์โหลดทั้งหมด (เป็น zip)
                    </button>
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
    
        <div  id="payment"
              class="section">
          <h3 class="mb-4 font-cu">
            <i class="fas fa-file-invoice-dollar icon-lg" />
            การชำระเงิน
          </h3>
    
          <div class="row">
            <div class="col-3">
              <h4>สถานะ Invoice</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <div class="form-group col-6">
                  <ColorTag
                    class="d-block"
                    size="lg"
                    :color="invoice_status_colors[submission.invoice.invoice_status] || 'grey'"
                    :label="submission.invoice.invoice_status || 'ยังไม่ออก Invoice'" />
                </div>
              </div>
            </div>
          </div>
  
          <div class="row">
            <div class="col-3">
              <h4>หมายเลข Invoice</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <FormInput
                  class="col-6"
                  disabled
                  :value="submission.invoice.invoice_ID" />
              </div>
            </div>
          </div>
  
          <div class="row mb-4">
            <div class="col-3">
              <h4>ใบ Invoice</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <FileView
                  class="col-6"
                  btn-class="btn-secondary"
                  :file-name="`${$route.params.id}_invoice.pdf`"
                  icon-class="fas fa-file-invoice-dollar" />
              </div>
            </div>
          </div>
    
          <div class="row mb-4">
            <div class="col-3">
              <h4>Invoice ไปที่</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <FormInput
                  class="col-6"
                  disabled
                  :value="submission.on_sent_record_invoice_to_name" />
                <div class="w-100"></div>
                <FormTextarea
                  class="col-6"
                  rows="3"
                  disabled
                  :value="submission.on_sent_record_invoice_to_address" />
              </div>
            </div>
          </div>
  
          <div class="row mb-4">
            <div class="col-3">
              <h4>ค่าบริการ</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <div class="form-group col-6 text-right pr-4">
                  <h1 class="text-primary">
                    {{ to_display_price(estimated_price) }}
                  </h1>
                  <h4 class="text-muted">*ค่าบริการโดยประมาน</h4>
                </div>
              </div>
            </div>
          </div>
    
        </div>
        <div  v-if="is_general"
              id="sample-details"
              class="section">
          <h3 class="mb-4 font-cu">
            <i class="fas fa-vial icon-lg"></i> ข้อมูลตัวอย่าง
          </h3>
          <div class="row">
            <div class="col-12">
              <div class="form-row">
                <FormInput
                  class="col-4"
                  label="ประเภทตัวอย่าง"
                  disabled
                  :value="processed_submission_data.sample_details.sample_type" />
                <FormDateInput
                  class="col-2"
                  label="วันที่เก็บตัวอย่าง"
                  format="dd/MM/yy"
                  disabled
                  :value="processed_submission_data.sample_details.sample_taken_date" />
                <div class="w-100"></div>
                <FormInput
                  class="col-4"
                  label="ชนิดสัตว์"
                  disabled
                  :value="processed_submission_data.sample_details.animal_type" />
                <FormInput
                  class="col-4"
                  type="text"
                  label="พันธุ์"
                  disabled
                  :value="processed_submission_data.sample_details.animal_species" />
                <FormInput
                  class="col-2"
                  type="text"
                  label="อายุสัตว์"
                  disabled
                  :value="processed_submission_data.sample_details.animal_age" />
                <FormInput
                  class="col-2"
                  type="number"
                  label="จำนวนที่เลี้ยง"
                  disabled
                  :value="processed_submission_data.sample_details.animal_count" />
                <FormTextarea 
                  class="col-6"
                  type="text"
                  label="ประวัติการป่วย"
                  rows="3"
                  disabled
                  :value="processed_submission_data.sample_details.illness" />
                <FormTextarea
                  class="col-6"
                  type="text"
                  label="ประวัติการทำวัคซีน"
                  rows="3"
                  disabled
                  :value="processed_submission_data.sample_details.vaccinations" />
              </div>
            </div>
          </div>
        </div>
    
        <div id="test-details" class="section">
          <h3 class="mb-4 font-cu">
            <i class="fas fa-microscope icon-lg"></i>
            รายละเอียดการทดสอบ
          </h3>
          <div v-if="processed_submission_data" class="row">
            <div class="col-12">
              <div  v-for="(batch, idx) of processed_submission_data.batches"
                    :key="idx"
                    class="mb-3 pb-5 border-b d-flex">

                <template v-if="is_general">
                  <div v-if="multiple_batches" class="batch-sidebar general">
                    <h3 class="mb-3">กลุ่ม {{ idx+1 }}</h3>
                    <h4 class="text-medium">{{ batch.sample_count }} ตัวอย่าง</h4>
                  </div>
                  <div class="w-100">
                    <template v-for="(test_department, department) in batch.tests">
                      <div  v-if="test_department"
                            :key="department"
                            class="mb-4">
                        <div class="row test-row border-b py-1">
                          <div class="col-2 nowrap p-0">
                            <div  class="light-tag department-tag"
                                  :class="department_colors[department]">
                              <h4>งาน{{ department }}</h4>
                            </div>
                          </div>
                          <div class="col">
                            <div class="row">
                              <div class="col-7"></div>
                              <div class="col-2 text-right">
                                <h5 class="text-muted mt-3">ราคา/ตัวอย่าง</h5>
                              </div>
                              <div class="col-1"></div>
                              <div class="col-2">
                                <h5 class="text-muted text-right mt-3">ยอดค่าบริการ</h5>
                              </div>
                            </div>
                          </div>
                        </div>
              
                        <div  v-for="(tests, category) in test_department.test_list"
                              :key="category"
                              class="row test-row border-b pb-1">
                          <div class="col-2 text-dark">
                            <h5 class="text-dark py-1">{{ category }}</h5>
                          </div>
                          <div v-if="tests" class="col">
                            <div  v-for="test of tests"
                                  :key="test.test_key"
                                  class="row test-row py-1">
                              <div class="col-7">
                                <h5>{{ test.display_name }}</h5>
                              </div>
                              <div class="text-right col-2">
                                <h5>{{ to_display_price(test.price) }}</h5>
                              </div>
                              <div class="col-1 text-left text-muted nowrap">
                                <i class="fas fa-times icon-sm d-inline"></i>
                                <h5 class="mx-1 d-inline">{{ batch.sample_count }}</h5>
                                <i class="fas fa-equals icon-sm d-inline"></i>
                              </div>
                              <div class="col-2 text-right">
                                <h5>{{ to_display_price(test.price * batch.sample_count) }}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
            
                        <div  v-if="test_department.custom_bacteria_tests && test_department.custom_bacteria_tests.length > 0"
                              class="row test-row border-b">
                          <div class="col-2 text-dark">
                            <h5 class="text-medium py-1">แบคทีเรียอื่นๆ</h5>
                          </div>
                          <div class="col">
                            <div  v-for="(custom_bacteria, idx) of test_department.custom_bacteria_tests"
                                  :key="idx"
                                  class="row test-row py-1">
                              <div class="col-7">
                                <h5>{{ custom_bacteria }}</h5>
                              </div>
                              <div class="col-5 text-right">
                                <h5>~{{ to_display_price(500 * batch.sample_count) }}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div  v-if="test_department.sensitivity_tests"
                              class="row test-row border-b">
                          <div class="col-2 text-dark py-1">
                            <h5 class="text-medium">ยาต้านจุลชีพเพื่อการทดสอบความไว</h5>
                          </div>
                          <div class="col py-1">
                            <div class="row test-row">
                              <div class="col-8 py-1">
                                <h5 v-for="antibiotic of test_department.sensitivity_tests.split(',')"
                                    :key="antibiotic">
                                  {{ antibiotic }}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> 
                    </template>

                    <div class="row test-row py-3 border-b">
                      <div class="col-2"></div>
                      <div class="col">
                        <div class="row test-row">
                          <div class="col-6"></div>
                          <div class="col-1 text-right">
                            <h2 class="text-primary">
                              {{ batch.sample_count }}
                            </h2>
                            <h5 class="text-medium">ตัวอย่าง</h5>
                          </div>
                          <div class="col-2 text-right">
                            <h2 class="text-primary">
                              {{ batch.test_count }}
                            </h2>
                            <h5 class="text-medium">รายการทดสอบ</h5>
                          </div>
                          <div class="col-1 text-right nowrap">
                            <h5 class="text-medium mt-2 ml-3">รวมเป็น</h5>
                          </div>
                          <div class="col-2 text-right">
                            <h2 class="text-primary">
                              {{ to_display_price(batch.price) }}
                            </h2>
                            <h5 class="text-medium">ค่าบริการ</h5>
                            <!-- <h6 class="text-muted">*เป็นราคาโดยประมานเท่านั้น</h6> -->
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-1 mt-4">
                      <div class="col-12">
                        <h4>รายละเอียดตัวอย่าง</h4>
                      </div>
                    </div>
                    <div class="row border-b py-1">
                      <div class="col-3">
                        <h5 class="text-muted">ID ตัวอย่าง</h5>
                      </div>
                      <div class="col-6">
                        <h5 class="text-muted">ข้อมูลเพิ่มเติม</h5>
                      </div>
                    </div>
                    <div  v-for="(sample, idx) of batch.samples"
                          :key="idx"
                          class="row py-1 border-b">
                      <div class="col-3">
                        <h5 class="pl-2">{{ sample.sample_id }}</h5>
                      </div>
                      <div class="col-6">
                        <h5 class="pl-2">{{ sample.extra_info }}</h5>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else-if="is_disinfectant">
                  <div v-if="multiple_batches" class="batch-sidebar disinfectant">
                    <h5 class="text-medium mt-2 ">นํ้ายาฆ่าเชื้อ</h5>
                    <h4>{{ batch.disinfectant_name }}</h4>
                  </div>
                  <div class="w-100">
                    <div class="form-row border-b py-2">
                      <div class="col-12 p-0">
                        <div  class="light-tag department-tag mb-2"
                              :class="disinfectant_test_type_colors[batch.test_type]">
                          <h4>ทดสอบต่อ {{ batch.test_type  }}</h4>
                        </div>
                      </div>
                    </div>
                    <div class="form-row border-b px-3 py-2">
                      <div class="col-4">
                        <h5 class="text-muted">
                          ชื่อ{{ batch.test_type === 'ไวรัส'? 'ไวรัส' : 'แบคทีเรีย'  }}
                        </h5>
                      </div>
                      <div class="col-6">
                        <div class="form-row">
                          <div class="col-4">
                            <h5 class="text-muted">ความเข้มข้น</h5>
                          </div>
                          <div class="col-8">
                            <div class="form-row">
                              <div v-if="batch.test_type === 'แบคทีเรีย (CP Protocol)'" class="col-6">
                                <h5 class="text-muted">ระยะหลังการเจือจาง</h5>
                              </div>
                              <div class="col-6">
                                <h5 class="text-muted">ระยะสัมผัสเชื้อ</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div  v-for="(test_detail, test_name) in batch.tests"
                          :key="test_name"
                          class="form-row test-row border-b px-3 py-1">
                      <div class="col-4 pr-5">
                        <h4 class="mb-1">{{ test_detail.display_name }}</h4>
                        <h5 v-if="batch.test_type === 'ไวรัส'"
                            class="text-muted">
                          [ {{ test_detail.cell_name }} ]
                        </h5>
                      </div>
  
                      <div class="col-6">
                        <div  v-for="dilution of test_detail.dilutions"
                              :key="dilution"
                              class="form-row test-row">
                          <div class="col-4 pl-3 position-relative">
                            <h4 class="d-inline">{{ dilution }}</h4>
                          </div>
  
                          <div  v-if="batch.test_type !== 'แบคทีเรีย (CP Protocol)'"
                                class="col-4">
                            <div  v-for="time of test_detail.contact_times"
                                  :key="time"
                                  class="test-row pl-2 position-relative">
                              <h5 class="d-inline">{{ time }}</h5>
                              <h5 class="d-inline ml-1">นาที</h5>
                            </div>
                          </div>
  
                          <div v-else class="col-8">
                            <div  v-for="dt of test_detail.dilution_times"
                                  :key="dt"
                                  class="form-row test-row pl-2">
                              <div class="col-6">
                                  <h5 class="d-inline">{{ dt }}</h5>
                                  <h5 class="d-inline ml-1">วัน</h5>
                              </div>
                              <div class="col-6">
                                <div  v-for="time of test_detail.contact_times"
                                      :key="time"
                                      class="form-row test-row pl-1">
                                  <div class="col-12">
                                    <h5 class="d-inline">{{ time }}</h5>
                                    <h5 class="d-inline ml-1">นาที</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
  
                        </div>
                      </div>
  
                      <div class="col-2 d-flex flex-column align-items-end justify-content-end pr-4">
                        <h5>3,000฿</h5>
                        <h6 class="text-muted squeeze-up">ต่อรายการ</h6>
                        <h5 class="mt-1">
                          <i class="fas fa-times icon-sm"></i>
                          {{ test_detail.test_count }}
                        </h5>
                        <h6 class="text-muted squeeze-up">รายการ</h6>
                        <h4 class="mt-1 text-primary">
                          <i class="fas fa-equals mr-1 icon-sm"></i>
                          {{ to_display_price(test_detail.price) }}
                        </h4>
                      </div>
                    </div>

                    <div class="form-row p-3 border-b">
                      <div class="col-9 d-flex justify-content-end align-items-end">
                        <div  v-if="batch.test_type === 'ไวรัส'"
                              class="text-right position-relative cost-container">
                          <h4 class="text-primary">
                            <i class="fas fa-plus icon-sm"></i>
                            {{ to_display_price(batch.toxicity_test_cost) }}
                          </h4>
                          <h5 class="text-medium">ค่า Toxicity Test</h5>
                          <div class="hint-box">
                            <h4 class="text-primary mb-1">การคำนวณค่า Toxicity Test</h4>
                            <h5>คำนวณจากจำนวนความเข้มข้นของแต่ละประเภท cell ไวรัส ซึ่งระบุไว้ใน [ ] หลังชื่อไวรัส หากไวรัสหลายตัวภายใต้ cell ประเภทเดียวกันใช้ความเข้มข้นซํ้ากัน จะคิดราคาแค่รอบเดียวเท่านั้น</h5>
                            <div  v-for="(dilutions, cell) in batch.unique_cells"
                                  :key="cell">
                              <h5 class="text-primary">{{ cell }}</h5>
                              <h5 class="ml-2">
                                3,000฿
                                <i class="fas fa-times icon-sm" />
                                {{ dilutions.length}} ความเข้มข้น
                                <i class="fas fa-equals icon-sm" />
                                <span class="text-primary ml-1">{{ to_display_price(3000 * dilutions.length) }}</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div class="text-right ml-4">
                          <h4 class="text-primary">
                            <i class="fas fa-plus icon-sm"></i>
                            3,000฿
                          </h4>
                          <h5 class="text-medium">ค่าประเมินผล</h5>
                        </div>
                      </div>
                      <div class="col-1 d-flex flex-column align-items-end justify-content-end">
                        <h5 class="text-medium mb-4">รวมเป็น</h5>
                      </div>
                      <div class="col-2 pr-4 d-flex flex-column align-items-end justify-content-end">
                        <h2 class="text-primary">
                          {{ to_display_price(batch.price) }}
                        </h2>
                        <h5 class="text-medium">ค่าบริการ</h5>
                      </div>
                    </div>

                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </div>
    <div v-else class="w-100 pt-5 mt-5 text-center content-height-min">
      <LoadingAnimation color="primary" size="lg" />
    </div>
  </transition>
</div>
</template>

<script>
import $ from 'jquery'
import groupBy from 'lodash/groupBy'
import { get_jwt } from '@/vue-apollo'
import { AUTH_DATA } from '@/graphql/local'
import { SUBMISSION_DETAIL, SUBMISSION_FORM_DATA } from '@/graphql/submission'
import { GENERAL_TEST_METHODS } from '@/graphql/tests'

export default {
  name: 'view-submission',
  computed: {
    submission_key () {
      if (this.submission.BestLIMS_key) {
        return this.submission.BestLIMS_key
      }
      return this.submission.backend_key
    },
    test_methods_grouped () {
      const grouped_by_department = groupBy(this.test_methods_raw, 'department')
      const grouped = {}
      for (const [department, tests] of Object.entries(grouped_by_department)) {
        grouped[department] = groupBy(tests, 'category')
      }
      return grouped
    },
    processed_submission_data () {
      const processed = JSON.parse(this.submission_data)
      if (this.is_general) {
        for (const batch of processed.batches) {
          for (const test of Object.values(batch.tests)) {
            if (test) {
              test.test_list = groupBy(test.test_list.map(
                test_key => this.test_methods_raw.find(
                  test => test.test_key == test_key
                )
              ), 'category')
            }
          }
        }
      }
      return processed
    },
    is_general () {
      return this.submission.submission_type === 'การตรวจทั่วไป'
    },
    is_disinfectant () {
      return this.submission.submission_type === 'ทดสอบประสิทธิภาพยาฆ่าเชื้อ'
    },
    multiple_batches () {
      return this.processed_submission_data.batches.length > 1
    },
    estimated_price () {
      return this.processed_submission_data.batches
        .reduce( (total, batch) => total += batch.price, 0)
    }
  },
  data () {
    return {
      submission_status_colors: {
        'ส่งแล้ว': 'grey',
        'กำลังดำเนินการ': 'yellow',
        'เสร็จสิ้น': 'green',
        'ยกเลิก': 'red',
      },
      submission_type_colors: {
        'การตรวจทั่วไป': 'teal',
        'ทดสอบประสิทธิภาพยาฆ่าเชื้อ': 'blue'
      },
      invoice_status_colors: {
        'ยังไม่ออก Invoice': 'grey',
        'รอการชำระเงิน': 'yellow',
        'ชำระเงินแล้ว': 'green'
      },
      department_colors: {
        'แบคทีเรียวิทยา': 'pink',
        'อณูชีววิทยา': 'red',
        'ซีรั่มวิทยา': 'orange',
        'ไวรัสวิทยา': 'yellow'
      },
      disinfectant_test_type_colors: {
        'ไวรัส': 'yellow',
        'แบคทีเรีย': 'pink',
        'แบคทีเรีย (CP Protocol)': 'red',
      }
    }
  },
  methods: {
    download_all_reports () {
    },
  },
  apollo: {
    is_admin: {
      query: AUTH_DATA,
      update: data => data.auth.is_admin
    },
    submission: {
      query: SUBMISSION_DETAIL,
      variables () {
        return {
          jwt: get_jwt(),
          key: this.$route.params.id
        }
      },
      update: data => data.get_submission.result
    },
    submission_data: {
      query: SUBMISSION_FORM_DATA,
      variables () {
        return {
          jwt: get_jwt(),
          key: this.$route.params.id
        }
      },
      update: data => data.get_submission.result.submission_data
    },
    test_methods_raw: {
      query: GENERAL_TEST_METHODS,
      update: data => data.test_method_general_get.result
    }
  }
}
</script>

<style lang="scss" scoped>
.section {
  font-family: 'CS ChatThai';
  border-bottom: 1px solid $accent;
  padding: 1.5rem 0;
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
    top: 0;
    left: -100px;
  }
}
.batch-sidebar {
  padding: .5em;
  &.general {
    min-width: 8rem;
    max-width: 8rem;
  }
  &.disinfectant {
    min-width: 15rem;
    max-width: 15rem;
  }
}
.department-tag {
  padding: .25em .75em;
}
</style>