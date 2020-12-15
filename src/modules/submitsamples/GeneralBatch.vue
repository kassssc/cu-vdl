<template>
<div  v-if="!$apollo.loading"
      class="batch w-100 position-relative border-b pt-5">
  <a  v-if="multiple_batches"
      class="btn btn-x batch-section"
      @click="$emit('delete-batch')">
    <i class="fas fa-times" />
  </a>
  <div class="row w-100 pb-5">
    <div class="col-md-2 col-12">
      <h3 class="mb-2">
        {{ batch_label }}
      </h3>
      <h5 v-if="batch.sample_count"
          class="ml-3 text-medium d-lg-block d-none">
        {{ batch.sample_count }} ตัวอย่าง
      </h5>
    </div>
    <div class="col-md-10 col-12">
      <div class="form-row mb-3">
        <FormInput
          class="col-2"
          input-class="text-right"
          type="number"
          label="จำนวนตัวอย่าง"
          label-class="label-lg"
          required
          :value="batch.sample_count"
          :invalid="is_validated && !batch.sample_count"
          error-msg="จำเป็นต้องใส่"
          @focus="$event.target.select()"
          @blur="update_sample_count($event.target.value)" />
      </div>

      <div class="form-row border-b">
        <div class="col-12">
          <h4 class="mb-1 text-dark">เลือกรายการทดสอบ</h4>
        </div>
      </div>

      <div  v-for="(tests, department) in test_methods"
            :key="department">
        
        <div  class="form-row py-1"
              :class="{'border-b': !batch.tests[department]}">
          <div class="form-group col-2 mb-0 text-dark d-flex overflow-visible nowrap">
            <checkbox :value="!!batch.tests[department]"
                      :color="department_colors[department]"
                      @input="on_department_toggle(department, $event)">
              <template #label>
                <h3 class="ml-2">งาน{{ department }}</h3>
              </template>
            </checkbox>
          </div>
        </div>

        <transition name="fade-no-delay">
          <div v-if="batch.tests[department]">
            <div class="row row-header border-b py-2">
              <div class="col-2">
                <h5>กลุ่ม</h5>
              </div>
              <div class="col-10">
                <div class="form-row">
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
  
            <FormMethodSelection
              :department="department"
              :test_methods="tests"
              :sample_count="batch.sample_count"
              :color="department_colors[department]"
              :is_validated="is_validated"
              v-model="batch.tests[department]" />
          </div>

        </transition>
      </div>

      <div class="form-row py-3 border-b">
        <div class="col-2"></div>
        <div class="col-10">
          <div class="row">
            <div class="col-6"></div>
            <div class="col-1 text-right">
              <h2 class="text-primary">
                {{ batch.sample_count? batch.sample_count : 'N/A' }}
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
                {{ batch.sample_count? to_display_price(batch.price) : 'N/A' }}
              </h2>
              <h5 class="text-medium">ค่าบริการ</h5>
              <!-- <h6 v-if="custom_bacteria_test_count > 0"
                  class="text-medium">
                *เป็นราคาโดยประมานเท่านั้น
              </h6> -->
            </div>
          </div>
        </div>
      </div>

      <div  v-if="is_validated && (test_count <= 0)"
            class="form-row py-2">
        <div class="form-group col-12 mb-0">
          <ErrorBox msg="จำเป็นต้องเลือกอย่างน้อย 1 รายการทดสอบ" />
        </div>
      </div>

    </div>
  </div>

  <div v-if="batch.sample_count > 0" class="row pb-5">
    <div class="col-md-2 col-12">
      <h4 class="text-medium mb-2">รายละเอียดตัวอย่าง</h4>
    </div>
    <div class="col-md-10 col-12">
      <div class="form-row text-medium">
        <div class="form-group mb-2 col-1 text-right">
          <h5>หมายเลข</h5>
        </div>
        <div class="form-group col-4 mb-2 pl-3 pr-1">
          <h5 class="d-inline">ID ตัวอย่าง</h5>
          <i class="fas fa-star-of-life text-primary icon-sm ml-1" />
        </div>
        <div class="form-group col-7 mb-2 px-1">
          <h5>ข้อมูลเพิ่มเติม</h5>
        </div>
      </div>

      <div  v-for="(sample, idx_sample) of batch.samples"
            :key="idx_sample"
            :id="`batch${idx+1}-set${idx_sample+1}`"
            class="form-row">
        <div class="form-group mb-2 col-1 text-right">
          <h5 class="text-medium">{{ idx_sample+1 }}</h5>
        </div>
        <FormInput
          class="col-4 mb-2 pl-3 pr-1"
          input-class="form-control-sm"
          type="text"
          v-model="sample.sample_id" />
        <FormInput
          class="col-7 mb-2 px-1"
          input-class="form-control-sm"
          type="text"
          v-model="sample.extra_info" />
      </div>
      <div  v-if="is_validated && !all_sample_id_filled"
            class="form-row">
        <div class="col-1 form-group"></div>
        <div class="col-4 form-group mb-0 pl-3 pr-1">
          <ErrorBox msg="จำเป็นต้องใส่ ID ให้ครบ" />
        </div>
      </div>

      <div class="form-row mt-3">
        <div class="col-1"></div>
        <div class="form-group col-4 mb-2 pl-3 pr-1">
          <button class="btn font-cu btn-secondary btn-block"
                  @click="show_sample_info_multifill_modal()">
            <i class="fas fa-list-ol btn-inner-icon"></i>เติมข้อมูลทีละหลายช่อง
          </button>
        </div>
      </div>

    </div>
  </div>

  <FormSampleInfoMultifillModal
    :max_samples="batch.sample_count"
    @add="update_sample_info($event)" />
</div>
</template>

<script>
import $ from 'jquery'
import groupBy from 'lodash/groupBy'
import { GENERAL_TEST_METHODS } from '@/graphql/tests'

export default {
  name: 'general-batch',
  components: {
    FormMethodSelection: () => import(/* webpackChunkName: "group-submitsamples" */
      './FormMethodSelection'
    ),
    FormSampleInfoMultifillModal: () => import(/* webpackChunkName: "group-submitsamples" */
      './FormSampleInfoMultifillModal'
    ),
  },
  props: {
    batch: {
      type: Object,
      required: true
    },
    multiple_batches: {
      type: Boolean,
      required: true
    },
    idx: {
      type: Number,
      required: true
    },
    edit_mode: {
      type: Boolean,
      required: true
    },
    is_validated: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    test_methods () {
      return groupBy(this.test_methods_raw, 'department')
    },
    batch_label () {
      return this.multiple_batches? `กลุ่มการทดสอบ ${this.idx+1}` : 'การทดสอบ'
    },
    includes_bacteria_test () {
      return !!this.batch.tests['แบคทีเรียวิทยา']
    },
    test_count () {
      let test_count = Object.values(this.batch.tests).reduce( (count, category) => {
        if (category) {
          let curr_count = category.test_list.length
          if (category.custom_bacteria_tests) {
            curr_count += category.custom_bacteria_tests.length
          }
          return count += curr_count
        }
        return count
      }, 0)
      return test_count
    },
    custom_bacteria_test_count () {
      if (!this.includes_bacteria_test) return 0
      return this.batch.tests['แบคทีเรียวิทยา'].custom_bacteria_tests.length
    },
    price () {
      return Object.values(this.batch.tests).reduce( (price, category) => {
        if (category) return price += category.price
        return price
      }, 0)
    },
    all_sample_id_filled () {
      return this.batch.samples.reduce( (has_id, sample) => has_id && !!sample.sample_id, true)
    }
  },
  data () {
    return {
      department_colors: {
        'แบคทีเรียวิทยา': 'pink',
        'อณูชีววิทยา': 'red',
        'ซีรั่มวิทยา': 'orange',
        'ไวรัสวิทยา': 'yellow'
      },
      // department_icons: {
      //   แบคทีเรียวิทยา: 'fas fa-bacterium',
      //   อณูชีววิทยา: 'fas fa-atom',
      //   ซีรั่มวิทยา: 'fas fa-eye-dropper',
      //   ไวรัสวิทยา: 'fas fa-virus'
      // }
    }
  },
  watch: {
    price (val) {
      this.batch.price = val
    },
    test_count (val) {
      this.batch.test_count = val
    }
  },
  methods: {
    on_department_toggle (category, active) {
      if (active) {
        this.batch.tests[category] = category === 'แบคทีเรียวิทยา'?
        { test_list: [], price: 0, custom_bacteria_tests: [], sensitivity_tests: null } : { test_list: [], price: 0 }
      } else {
        this.batch.tests[category] = null
      }
    },
    update_sample_count (val) {
      // Floor to not allow decimals
      this.batch.sample_count = Math.floor(val)
      // Set to null if left empty or negative or 0
      if (!this.batch.sample_count || this.batch.sample_count <= 0) {
        this.batch.sample_count = null
      // Set to 100 if larger than 100
      } else if (this.batch.sample_count > 100) {
        this.batch.sample_count = 100
      }
      
      // Update batch samples list
      const diff = Math.abs(this.batch.sample_count - this.batch.samples.length)
      if (this.batch.sample_count > this.batch.samples.length) {
        for (let i = this.batch.samples.length; i < this.batch.sample_count; i++) {
          this.batch.samples.splice(i, 1, { sample_id: null, extra_info: null })
        }
      } else if (this.batch.sample_count < this.batch.samples.length) {
        this.batch.samples.splice(this.batch.samples.length - diff, diff)
      }
    },
    update_sample_info ({ ranges, sample_id, extra_info }) {
      for (const range of ranges) {
        const start = range[0] - 1
        const end = range.length > 1? range[1] : range[0]
        for (let i = start; i < end; i++) {
          this.batch.samples.splice(i, 1, {
            sample_id: sample_id? sample_id : this.batch.samples[i].sample_id,
            extra_info: extra_info? extra_info : this.batch.samples[i].extra_info
          })
        }
      }
      $('#sample-info-multifill-modal').modal('hide')
    },
    show_sample_info_multifill_modal () {
      $('#sample-info-multifill-modal').modal('show')
    }
  },
  apollo: {
    test_methods_raw: {
      query: GENERAL_TEST_METHODS,
      update: data => data.test_method_general.result,
      result () {
        if (!this.edit_mode) {
          const new_tests = {}
          for (let department of Object.keys(this.test_methods)) {
            new_tests[department] = null
          }
          this.batch.tests = { ...new_tests }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a.btn.btn-x.batch-section {
  position: absolute;
  height: 35px;
  width: 35px;
  right: 15px;
  top: 20px;
  i { font-size: 1.25rem; }
}
</style>