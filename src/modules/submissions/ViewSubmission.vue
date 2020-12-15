<template>
<div class="page page-lg pt-0 position-relative">
  <transition name="fade">
    <div  v-if="!$apollo.loading"
          class="d-flex align-items-start">
      <div class="sidebar-nav overflow-visible sticky content-height-with-scroll">
        <router-link  :to="{name: 'submissions-list'}"
                      tag="button"
                      exact
                      class="btn btn-transparent back-btn mb-3">
          <i class="fas fa-chevron-left mr-2" />กลับไป
        </router-link>
        <scrollactive active-class="scrollactive-active"
                      :offset="150"
                      :modify-url="true"
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
          <template v-if="auth.is_admin">
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
          </template>
        </scrollactive>
      </div>
      
      <div class="sidebar-nav-content pt-5 mt-5">
        <div  id="info"
              class="section">
          <h3 class="mb-4 mt-2 font-cu">
            <i class="fas fa-file-alt icon-lg" />
            การส่งตัวอย่างหมายเลข #{{ $route.params.id }}
          </h3>
    
          <div class="row">
            <div class="col-2">
              <h4>สถานะ</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <div class="form-group col-6">
                  <ColorTag
                    class="d-block font-cu"
                    :color="submission_status_colors[submission.submission_status]"
                    :label="submission.submission_status"
                    size="lg" />
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-2">
              <!-- <h4>ใบส่งตัวอย่าง</h4> -->
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <!-- <FileView
                  class="col-6"
                  btn-class="btn-secondary"
                  :file="{
                    file_name: `${$route.params.id}_submission_form.pdf`,
                    S3_key: 'submission_form.pdf'
                  }"
                  icon-class="fas fa-file-alt" /> -->
                <div class="w-100"></div>
                <DownloadSlip
                  v-if="submission.submission_status === 'ส่งแล้ว'"
                  class="col-6"
                  :submission-key="submission_key" />
                <!-- <div class="col-6 form-group">
                  <button class="btn btn-secondary btn-block font-cu">
                    <i class="fas fa-print btn-inner-icon"></i> ปริ้นสลิปการส่งตัวอย่าง
                  </button>
                </div> -->
              </div>
            </div>
          </div>

          <div class="row mb-2">
            <div class="col-2">
              <h4>ประเภทการทดสอบ</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <div class="form-group col-6">
                  <ColorTag
                    class="d-block font-cu"
                    size="lg"
                    :color="submission_type_colors[submission.submission_type]"
                    :label="submission.submission_type" />
                </div>
              </div>
            </div>
          </div>
    
          <div class="row mb-4">
            <div class="col-2">
              <h4>ข้อมูลเบื้องต้น</h4>
            </div>
            <div class="col pt-1">
              <div class="form-row">
                <!-- <div class="col-6 form-group">
                  <label>ประเภทการทดสอบ</label>
                  <ColorTag
                    class="d-block font-cu"
                    size="lg"
                    :color="submission_type_colors[submission.submission_type]"
                    :label="submission.submission_type" />
                </div>
                <div class="w-100"></div> -->
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
                <div class="w-100"></div>
                <div class="col-6">
                  <div class="form-row">
                    <FormInput
                      class="col-12 mb-2"
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
                      class="col-12 mb-2"
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
  
          <!-- <div class="row mb-4">
            <div class="col-2">
              <h4>บุคคล/องค์กรที่เกี่ยวข้อง</h4>
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
          </div> -->

          <div v-if="submission.remarks" class="row mb-4">
            <div class="col-2">
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
          <div class="row mb-3">
            <div class="col-12">
              <table class="mb-4">
                <thead>
                  <tr>
                    <th>หมายเลขรายงาน</th>
                    <th class="text-right">Version</th>
                    <th>วันที่ออก</th>
                    <th>รายละเอียด</th>
                    <th>ไฟล์รายงาน (PDF)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(report, idx) in submission.reports"
                      :key="idx">
                    <td>{{ report.report_no }}</td>
                    <td class="text-right">{{ report.report_version }}</td>
                    <td>{{ to_display_date(report.report_date) }}</td>
                    <td class="small-font pre-line">{{ report.report_description }}</td>
                    <td>
                      <div class="form-row">
                        <FileView
                          class="col-12 mb-0"
                          btn-class="btn-secondary btn-sm"
                          :file="report.report_file"
                          icon-class="fas fa-file-invoice" />
                      </div>
                    </td>
                  </tr>
                  <tr v-if="submission.reports.length <= 0">
                    <td class="text-center" colspan="5">
                      <h5 class="text-muted font-cu py-2">
                        <i class="far fa-frown mr-2"></i>ยังไม่มีรายงาน
                      </h5>
                    </td>
                  </tr>
                </tbody>
              </table>
                
              <!-- <div  v-if="submission.reports.length > 0"
                    class="row mt-3">
                <div class="col-7"></div>
                <div class="col">
                  <button class="btn btn-primary btn-block font-cu"
                          @click="download_all_reports()">
                    <i class="fas fa-file-archive btn-inner-icon"></i>
                    ดาวน์โหลดทั้งหมด (เป็น zip)
                  </button>
                </div>  
              </div> -->
            </div>

          </div>

          <div class="row mb-3">
            <div class="col-2">
              <h5>ภาษารายงาน</h5>
            </div>
            <div class="col">
              <div class="form-row w-100">
                <FormInput
                  class="col-4"
                  disabled
                  :value="submission.english_report? 'English' : 'ภาษาไทย'" />
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-2">
              <h5>ส่งรายงานทางไปรษณีย์</h5>
            </div>
            <div class="col">
              <div class="form-row w-100">
                <div class="form-group col-12">
                  <h5>
                    <i  v-if="submission.mail_report_to_submitter"
                        class="fas fa-check icon-md text-center text-primary mr-1" />
                    <i  v-else
                        class="fas fa-times icon-md text-center text-danger mr-1" />
                    ส่งรายงานให้ ผู้ส่งตัวอย่าง ทางไปรษณีย์
                  </h5>
                </div>
                <div  v-if="submission.submitter.index !== submission.sample_owner.index"
                      class="form-group col-12">
                  <h5>
                    <i  v-if="submission.mail_report_to_sample_owner"
                        class="fas fa-check icon-md text-center text-primary mr-1" />
                    <i  v-else
                        class="fas fa-times icon-md text-center text-danger mr-1" />
                    ส่งรายงานให้ เจ้าของตัวอย่าง/ฟาร์ม ทางไปรษณีย์
                  </h5>
                </div>
                <h5></h5>
              </div>
            </div>
          </div>
          <!-- <div class="row">
            <div class="col-2">
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
          </div> -->
        </div>
    
        <div  id="payment"
              class="section">
          <h3 class="mb-4 font-cu">
            <i class="fas fa-file-invoice-dollar icon-lg" />
            การชำระเงิน
          </h3>
    
          <div class="row">
            <div class="col-2">
              <h4>สถานะ Invoice</h4>
            </div>
            <div class="col">
              <div class="form-row">
                <div class="form-group col-6">
                  <ColorTag
                    class="d-block font-cu"
                    size="lg"
                    :color="submission.invoice? invoice_status_colors[submission.invoice.invoice_status] : 'grey'"
                    :label="submission.invoice? submission.invoice.invoice_status : 'ยังไม่ออก Invoice'" />
                </div>
              </div>
            </div>
          </div>
  
          <div  v-if="submission.invoice"
                class="row">
            <div class="col-2">
              <h4>หมายเลข Invoice</h4>
            </div>
            <div class="col">
              <div class="form-row">
                <FormInput
                  class="col-6"
                  disabled
                  :value="submission.invoice.invoice_no" />
              </div>
            </div>
          </div>
    
          <div class="row mb-4">
            <div class="col-2">
              <h4>Invoice ไปที่</h4>
            </div>
            <div class="col">
              <div class="form-row">
                <FormInput
                  class="col-6 mb-2"
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

          <div v-if="submission.invoice" class="row mb-4">
            <div class="col-2"></div>
            <div class="col">
              <div class="form-row">
                <div class="form-group col-6 text-right">
                  <router-link  :to="{
                                  name: auth.is_admin? 'admin-invoice-list' : 'invoice-list',
                                  params: { id: submission.invoice.invoice_no }
                                }"
                                tag="button"
                                class="btn btn-secondary btn-block font-cu">
                    <i class="fas fa-arrow-right btn-inner-icon"></i> ไปดูรายละเอียด Invoice
                  </router-link>
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
                  :value="submission.sample_details.sample_type" />
                <FormDateInput
                  class="col-2"
                  label="วันที่เก็บตัวอย่าง"
                  format="dd/MM/yy"
                  disabled
                  :value="submission.sample_details.sample_taken_date" />
                <div class="w-100"></div>
                <FormInput
                  class="col-4"
                  label="ชนิดสัตว์"
                  disabled
                  :value="submission.sample_details.animal_type" />
                <FormInput
                  class="col-4"
                  type="text"
                  label="พันธุ์"
                  disabled
                  :value="submission.sample_details.animal_species" />
                <FormInput
                  class="col-2"
                  type="text"
                  label="อายุสัตว์"
                  disabled
                  :value="submission.sample_details.animal_age" />
                <FormInput
                  class="col-2"
                  type="number"
                  label="จำนวนที่เลี้ยง"
                  disabled
                  :value="submission.sample_details.animal_count" />
                <FormTextarea 
                  class="col-6"
                  type="text"
                  label="ประวัติการป่วย"
                  rows="3"
                  disabled
                  :value="submission.sample_details.illness" />
                <FormTextarea
                  class="col-6"
                  type="text"
                  label="ประวัติการทำวัคซีน"
                  rows="3"
                  disabled
                  :value="submission.sample_details.vaccinations" />
              </div>
            </div>
          </div>
        </div>
    
        <div id="test-details" class="section">
          <h3 class="mb-4 font-cu">
            <i class="fas fa-microscope icon-lg"></i>
            รายละเอียดการทดสอบ
          </h3>
          <div v-if="submission.submission_batches" class="row">
            <div class="col-12 px-4">
              <div  v-for="(batch, idx) of submission.submission_batches"
                    :key="idx"
                    class="mb-3 pb-5 d-flex"
                    :class="{'border-b': multiple_batches}">

                <template v-if="is_general">
                  <div v-if="multiple_batches" class="batch-sidebar general pt-3 px-2">
                    <h3 class="mb-3">กลุ่ม {{ idx+1 }}</h3>
                    <h4 class="text-medium">{{ batch.sample_count }} ตัวอย่าง</h4>
                  </div>
                  <div class="w-100">
                    <template v-for="(test_department, department) in batch.tests">
                      <div  v-if="test_department"
                            :key="department"
                            class="mb-4">
                        <div class="row no-gutters py-3">
                          <div class="col-12">
                            <div  class="light-tag lg font-cu"
                                  :class="department_colors[department]">
                              งาน{{ department }}
                            </div>
                          </div>
                        </div>
                        <div class="row test-row row-header py-2">
                          <div class="col-2 nowrap">
                            <h5>กลุ่ม</h5>
                          </div>
                          <div class="col">
                            <div class="row">
                              <div class="col-7">
                                <h5>รายการทดสอบ</h5>
                              </div>
                              <div class="col-2 text-right">
                                <h5>ราคา/ตัวอย่าง</h5>
                              </div>
                              <div class="col-1"></div>
                              <div class="col-2 text-right">
                                <h5>ยอดค่าบริการ</h5>
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
                                <h5>
                                  {{ to_display_price(test.price * batch.sample_count) }}
                                </h5>
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
                          <div class="col"></div>
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
                          <div class="col-3 text-right">
                            <h2 class="text-primary">
                              {{ to_display_price(batch.price) }}
                            </h2>
                            <h5 class="text-medium">ค่าบริการ</h5>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-2 mt-5 no-gutters">
                      <div class="col-12">
                        <h4>รายละเอียดตัวอย่าง</h4>
                      </div>
                    </div>
                    <div class="row row-header py-2">
                      <div class="col-3">
                        <h5>ID ตัวอย่าง</h5>
                      </div>
                      <div class="col-6">
                        <h5>ข้อมูลเพิ่มเติม</h5>
                      </div>
                    </div>
                    <div  v-for="(sample, idx) of batch.samples"
                          :key="idx"
                          class="row py-1 border-b">
                      <div class="col-3">
                        <h5>{{ sample.sample_id }}</h5>
                      </div>
                      <div class="col-6">
                        <h5>{{ sample.extra_info? sample.extra_info : '-' }}</h5>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else-if="is_disinfectant">
                  <div v-if="multiple_batches" class="batch-sidebar pt-3 px-2 disinfectant">
                    <h5 class="text-medium">ยาฆ่าเชื้อ</h5>
                    <h4>{{ batch.disinfectant_name }}</h4>
                  </div>
                  <div class="w-100">
                    <div class="form-row py-3">
                      <FormInput
                        v-if="!multiple_batches"
                        class="col-5 px-0"
                        label="ชื่อยาฆ่าเชื้อ"
                        disabled
                        :value="batch.disinfectant_name" />
                      <div class="w-100"></div>  
                      <div class="col-5 form-group px-0">
                        <div  class="light-tag lg d-block font-cu"
                              :class="disinfectant_test_type_colors[batch.test_type]">
                          ทดสอบต่อ {{ batch.test_type  }}
                        </div>
                      </div> 
                      <!-- <div class="col-12 p-0">
                        <div v-if="!multiple_batches" class="d-flex">
                          <h3 class="mb-3">
                            <span class="text-medium">ชื้อนํ้ายาฆ่าเชื้อ: </span>
                            {{ batch.disinfectant_name }}
                          </h3>
                        </div>
                        <div  class="light-tag department-tag font-cu"
                              :class="disinfectant_test_type_colors[batch.test_type]">
                          <h4>ทดสอบต่อ {{ batch.test_type  }}</h4>
                        </div>
                      </div> -->
                    </div>
                    <div class="form-row row-header px-3 py-2">
                      <div class="col-4">
                        <h5>
                          ชื่อ{{ batch.test_type === 'ไวรัส'? 'ไวรัส' : 'แบคทีเรีย'  }}
                        </h5>
                      </div>
                      <div class="col-6">
                        <div class="form-row">
                          <div class="col-4">
                            <h5>ความเข้มข้น</h5>
                          </div>
                          <div class="col-8">
                            <div class="form-row">
                              <div v-if="batch.test_type === 'แบคทีเรีย (CP Protocol)'" class="col-6">
                                <h5>ระยะหลังการเจือจาง</h5>
                              </div>
                              <div class="col-6">
                                <h5>ระยะสัมผัสเชื้อ</h5>
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
                        <h6 class="text-medium squeeze-up">ต่อรายการ</h6>
                        <h5 class="mt-1">
                          <i class="fas fa-times icon-sm"></i>
                          {{ test_detail.test_count }}
                        </h5>
                        <h6 class="text-medium squeeze-up">รายการ</h6>
                        <h4 class="mt-1 text-primary">
                          <i class="fas fa-equals mr-1 icon-sm"></i>
                          {{ to_display_price(test_detail.price) }}
                        </h4>
                      </div>
                    </div>

                    <div class="form-row p-3 border-b">
                      <div class="col d-flex justify-content-end align-items-end">
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
                      <div class="col-1">
                        <h5 class="text-medium mt-2">รวมเป็น</h5>
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

              <div v-if="multiple_batches" class="d-flex pt-3 pr-4">
                <div class="batch-sidebar general px-2">
                  <h3>ข้อมูลสรุป</h3>
                </div>
                <div class="w-100 form-row">
                  <div class="col"></div>
                  <div class="col-2 form-group text-right nowrap">
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
                      <h5 class="text-medium">รายการยาฆ่าเชื้อ</h5>
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

            </div>
          </div>
        </div>
      
      </div>
    </div>
    <div v-else class="w-100 pt-5 mt-5 text-center content-height-with-scroll">
      <LoadingAnimation color="primary" size="lg" />
    </div>
  </transition>
</div>
</template>

<script>
import $ from 'jquery'
import groupBy from 'lodash/groupBy'
import cloneDeep from 'lodash/cloneDeep'
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
    is_general () {
      return this.submission.submission_type === 'การตรวจทั่วไป'
    },
    is_disinfectant () {
      return this.submission.submission_type === 'ทดสอบประสิทธิภาพยาฆ่าเชื้อ'
    },
    multiple_batches () {
      return this.submission.submission_batches.length > 1
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
    auth: {
      query: AUTH_DATA,
      update: data => data.auth
    },
    test_methods: {
      query: GENERAL_TEST_METHODS,
      update: data => groupBy(data.test_method_general.result, 'department'),
    },
    submission: {
      query: SUBMISSION_DETAIL,
      variables () {
        return {
          key: this.$route.params.id
        }
      },
      update (data) {
        const submission = cloneDeep(data.get_submission.result)
        submission.submission_batches = JSON.parse(submission.submission_batches)
        if (submission.submission_type === 'การตรวจทั่วไป') {
          submission.sample_details = JSON.parse(submission.sample_details)
          for (const batch of submission.submission_batches) {
            for (const [department, tests] of Object.entries(batch.tests)) {
              if (tests) {
                tests.test_list = groupBy(tests.test_list.map(
                  test => this.test_methods[department].find(
                    test_info => test_info.test_key == test
                  )
                ), 'category')
              }
            }
          }
        }
        return submission
      },
      skip () {
        return !this.test_methods
      }
    },
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
  &.general {
    min-width: 9rem;
    max-width: 9rem;
  }
  &.disinfectant {
    min-width: 15rem;
    max-width: 15rem;
  }
}
</style>