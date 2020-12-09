<template>
<div class="form-row subcontainer py-4 font-cu">
  <template v-if="is_virus || test_count < max_bacteria">
    <div class="col-12 d-flex justify-content-between">
      <h4 class="mr-3 mb-3">{{ `เพิ่ม${is_virus? 'ไวรัส' : 'แบคทีเรีย'}เพื่อทดสอบ`}}</h4>
      <button v-if="is_CP"
              class="btn btn-success align-self-start"
              @click="use_CP()">
        ใช้ Default CP Protocol
      </button>
    </div>
    <FormSelect
      v-if="is_virus"
      class="mb-0 col-3"
      label="name"
      form-label="เลือกไวรัส"
      placeholder="เลือก..."
      :clearable="false"
      :searchable="false"
      :options="disinfectant_virus_list"
      :get-option-label="option => option.display_name"
      v-model="virus" />
    <FormInput
      v-else
      class="col-12"
      label="ชื่อแบคทีเรีย"
      type="text"
      v-model.trim="bacteria_name" />
    <div class="form-group col-5">
      <label>ระดับความเข้มข้น</label>
      <input type="text"
              class="form-control pr-4"
              placeholder="ex. undiluted, 1:200, 1:400, 20%"
              v-model="dilutions"
              @blur="process_dilutions()">
      <div class="hint">
        <i class="fas fa-question color-text-light"></i>
        <div class="hint-box">
          <h5>
            ให้ใส่รายการความเข้มข้นทุกระดับที่ต้องการตรวจ โดยขั้นด้วย คอมม่า ( , )
            ยกตัวอย่างเช่น
          </h5>
          <h5 class="text-primary">
            undiluted, 1:200, 1:400, 20%
          </h5>
        <h5>
          ระบบจะกรองทุกอย่างที่ไม่ใช่
          <span class="text-primary">"undiluted"</span>
          หรือเลขในรูปแบบ
          <span class="text-primary">x:y</span>
          หรือ
          <span class="text-primary">z%</span>
          ออกโดยอัตโนมัติ
        </h5>
        </div>
      </div>
    </div>
    <div  v-if="is_CP"
          class="form-group col">
      <label>ระยะหลังการเจือจาง (วัน)</label>
      <input  type="text"
              placeholder="ex. 3, 7, 10"
              class="form-control pr-4"
              v-model.lazy="dilution_times"
              @blur="process_dilution_times()">
      <div class="hint">
        <i class="fas fa-question color-text-light"></i>
        <div class="hint-box">
          <h5>
            ให้ใส่รายการระยะเวลาเจือจางทุกระยะที่ต้องการตรวจ โดยขั้นด้วย คอมม่า ( , )
            ยกตัวอย่างเช่น
          </h5>
          <h5 class="text-primary">
            3, 7, 10
          </h5>
          <h5>
            ระบบจะกรองทุกอย่างที่ไม่ใช่เลขออกโดยอัตโนมัติ
          </h5>
        </div>
      </div>
    </div>
    <div class="form-group col">
      <label>ระยะสัมผัสเชื้อ (นาที)</label>
      <input  type="text"
              class="form-control pr-4"
              placeholder="ex. 0.5, 5, 10"
              v-model.lazy="contact_times"
              @blur="process_contact_times()">
      <div class="hint">
        <i class="fas fa-question color-text-light"></i>
        <div class="hint-box">
          <h5>
            ให้ใส่รายการระยะเวลาสัมผัสเชื้อทุกเวลาที่ต้องการตรวจ โดยขั้นด้วย คอมม่า ( , )
            ยกตัวอย่างเช่น
          </h5>
          <h5 class="text-primary">
            0.5, 5, 10
          </h5>
          <h5>
            ระบบจะกรองทุกอย่างที่ไม่ใช่เลขหรือเลขทศนิยมออกโดยอัตโนมัติ
          </h5>
        </div>
      </div>
    </div>
    <div class="form-group col-1">
      <label></label>
      <button class="btn btn-primary btn-block"
              :disabled="is_virus && !valid_form_virus() || is_CP && !valid_form_bacteria()"
              @click="parse_output()">
        เพิ่ม
      </button>
    </div>
    <div v-if="!is_virus" class="form-group col-12 d-flex mb-0">
      <h5 class="text-medium">
        (สามารถเพิ่มแบคทีเรียได้อีก
        <span class="text-primary mx-1">{{ max_bacteria - test_count }}</span>
        รายการ)
      </h5>
    </div>
  </template>
  <div v-else class="form-group col-12 mb-0">
    <h5 class="text-medium">ท่านได้เพิ่มรายการแบคทีเรียครบถึง 5 รายการแล้ว</h5>
  </div>

  <Modal  modal-id="invalid-input-modal"
          modal-dialog-class="modal-sm modal-dialog-centered"
          x-close>
    <template #modal-header>
      <h5 class="pr-4">ข้อมูลดังนี้ไม่ตรงตามรูปแบบ และจะถูกระบบลบออก</h5>
    </template>
    <template #modal-body>
      <div class="form-row">
        <div class="form-group col-12 text-center mb-0">
          <h4 v-for="invalid of invalid_inputs"
              :key="invalid">
            {{ invalid }}
          </h4>
        </div>
      </div>
      <div class="form-row mt-4">
        <div class="form-group col-12 mb-0">
          <button type="button"
                  class="btn btn-primary btn-block"
                  data-dismiss="modal">
            รับทราบ
          </button>
        </div>
      </div>
    </template>
  </Modal>
</div>
</template>

<script>
import $ from 'jquery'
import uniq from 'lodash/uniq'
import pullAll from 'lodash/pullAll'
import { DISINFECTANT_TEST_METHODS } from '@/graphql/tests'

export default {
  name: 'form-disinfectant-test-input',
  props: {
    test_type: {
      type: String,
      required: true
    },
    test_count: {
      type: Number,
      default: 0
    }
  },
  watch: {
    test_type () {
      this.virus = ''
      this.bacteria_name = ''
      this.dilutions = ''
      this.contact_times = ''
      this.dilution_times = ''
    }
  },
  data () {
    return {
      virus: '',
      bacteria_name: '',
      dilutions: '',
      contact_times: '',
      dilution_times: '',
      dilution_arr: [],
      contact_time_arr: [],
      dilution_time_arr: [],
      max_bacteria: 5,
      invalid_inputs: []
    }
  },
  computed: {
    is_virus () {
      return this.test_type === 'ไวรัส'
    },
    is_CP () {
      return this.test_type === 'แบคทีเรีย (CP Protocol)'
    },
    /* dilution_arr () {
      return this.clean_and_split(this.dilutions.toLowerCase())
        .filter( s => /^([1-9]\d*:(0|[1-9]\d*)|([1-9][0-9]?|100)%|undiluted)$/.test(s) )
        // Matches x:y, z%, or undiluted, no 0s, no leading 0s
    },
    contact_time_arr () {
      return this.clean_and_split(this.contact_times)
        .filter( s => /^((0|[1-9]\d*)(\.\d*[1-9])?)$/.test(s) )
        //.filter( s => /^((0|[1-9]\d*)(\.\d*[1-9])?(วินาที|นาที))$/.test(s) )
        // Matches x, x.y, no leading and trailing 0s
    },
    dilution_time_arr () {
      return this.clean_and_split(this.dilution_times)
        .filter( s => /^[1-9]\d*$/.test(s) )
        // Matches x, no leading 0s
    } */
  },
  methods: {
    clean_and_split (str) {
      return uniq(str
        .split(',')
        .map(s => s.trim())
        .filter(s => s)
      )
    },

    process_dilutions () {
      this.dilution_arr = this.clean_and_split(this.dilutions)
      for (const dilution of this.dilution_arr) {
        if (! /^([1-9]\d*:(0|[1-9]\d*)|([1-9][0-9]?|100)%|undiluted)$/.test(dilution))
        this.invalid_inputs.push(dilution)
      }
      if (this.invalid_inputs.length > 0) {
        pullAll(this.dilution_arr, this.invalid_inputs)
        $('#invalid-input-modal').on('hidden.bs.modal', () => this.invalid_inputs = [] )
        $('#invalid-input-modal').modal('show')
      }
      this.dilutions = this.dilution_arr.join(', ')
    },
    process_contact_times () {
      this.contact_time_arr = this.clean_and_split(this.contact_times)
      for (const contact_time of this.contact_time_arr) {
        if (! /^((0|[1-9]\d*)(\.\d*[1-9])?)$/.test(contact_time))
        this.invalid_inputs.push(contact_time)
      }
      if (this.invalid_inputs.length > 0) {
        pullAll(this.contact_time_arr, this.invalid_inputs)
        $('#invalid-input-modal').on('hidden.bs.modal', () => this.invalid_inputs = [] )
        $('#invalid-input-modal').modal('show')
      }
      this.contact_times = this.contact_time_arr.join(', ')
    },
    process_dilution_times () {
      this.dilution_time_arr = this.clean_and_split(this.dilution_times)
      for (const dilution_time of this.dilution_time_arr) {
        if (! /^[1-9]\d*$/.test(dilution_time))
        this.invalid_inputs.push(dilution_time)
      }
      if (this.invalid_inputs.length > 0) {
        pullAll(this.dilution_time_arr, this.invalid_inputs)
        $('#invalid-input-modal').on('hidden.bs.modal', () => this.invalid_inputs = [] )
        $('#invalid-input-modal').modal('show')
      }
      this.dilution_times = this.dilution_time_arr.join(', ')
    },

    parse_output () {
      if (this.is_virus) {
        this.parse_output_virus()
      } else if (this.is_CP) {
        this.parse_output_CP()
      } else {
        this.parse_output_bacteria()
      }
    },

    parse_output_virus () {
      if (!this.valid_form_virus()) return

      const test_count = this.dilution_arr.length * this.contact_time_arr.length
      const price = this.virus.price * test_count

      const parsed_output = {}
      parsed_output[this.virus.test_key] = {
        display_name: this.virus.display_name,
        dilutions: this.dilution_arr,
        contact_times: this.contact_time_arr,
        cell_name: this.virus.cell_name,
        price: price,
        test_count: test_count
      }
      this.virus = null
      this.$emit('add', parsed_output)
    },
    parse_output_bacteria () {
      if (!this.valid_form_bacteria()) return

      const test_count = this.dilution_arr.length * this.contact_time_arr.length
      const price = 3000 * test_count

      const parsed_output = {}
      parsed_output[this.bacteria_name] = {
        display_name: this.bacteria_name,
        dilutions: this.dilution_arr,
        contact_times: this.contact_time_arr,
        price: price,
        test_count: test_count
      }
      this.$emit('add', parsed_output)
      this.bacteria_name = ''
    },
    parse_output_CP () {
      if (!this.validFormCP()) return

      const test_count = this.dilution_arr.length * this.contact_time_arr.length * this.dilution_time_arr.length
      const price = 3000 * test_count

      const parsed_output = {}
      parsed_output[this.bacteria_name] = {
        display_name: this.bacteria_name,
        dilutions: this.dilution_arr,
        contact_times: this.contact_time_arr,
        dilution_times: this.dilution_time_arr,
        price: price,
        test_count: test_count
      }
      this.$emit('add', parsed_output)
      this.bacteria_name = ''
    },

    valid_form_virus () {
      return (
        this.virus &&
        this.dilutions &&
        this.contact_times &&
        this.dilution_arr.length > 0 &&
        this.contact_time_arr.length > 0
      )
    },
    valid_form_bacteria () {
      return (
        this.bacteria_name &&
        this.dilutions &&
        this.contact_times &&
        this.dilution_arr.length > 0 &&
        this.contact_time_arr.length > 0
      )
    },
    validFormCP () {
      return (
        this.bacteria_name &&
        this.dilutions &&
        this.contact_times &&
        this.dilution_times &&
        this.dilution_arr.length > 0 &&
        this.contact_time_arr.length > 0 &&
        this.dilution_time_arr.length > 0
      )
    },
    use_CP () {
      this.dilutions = '1:200, 1:400'
      this.dilution_times = '1, 2, 7'
      this.contact_times = '0.5, 2, 60'
      this.process_dilutions()
      this.process_dilution_times()
      this.process_contact_times()

      this.bacteria_name = 'E.Coli'
      this.parse_output()
      this.bacteria_name = 'Salmonella'
      this.parse_output()
      
      this.dilutions = ''
      this.dilution_times = ''
      this.contact_times = ''
    }
  },
  apollo: {
    disinfectant_virus_list: {
      query: DISINFECTANT_TEST_METHODS,
      update: data => data.test_method_disinfectant_virus.result,
      skip () {
        return !this.is_virus
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hint-box {
  width: 250px;
  bottom: 43px;
  right: 0px;
  transform-origin: 100% 100%;
}
</style>