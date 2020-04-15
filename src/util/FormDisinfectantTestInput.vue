<template>
<div class="form-row subcontainer">
  <div class="col-12">
    <h4 class="mb-1">เพิ่มรายการทดสอบ</h4>
  </div>
  <div  v-if="testType === 5"
        class="form-group col-4 mb-0">
    <label>
      เลือกไวรัส
    </label>
    <select class="form-control"
            v-model="virusName">
      <option v-for="test in tests"
              :key="test.id"
              :value="test.name">
        {{ test.name }}
      </option>
    </select>
  </div>
  <div  v-if="testType === 6"
        class="form-group col-6">
    <label>
      ชื่อแบคทีเรีย
    </label>
    <input  type="text"
            v-model.lazy.trim="bacteriaName"
            class="form-control">
  </div>
  <div v-if="testType === 6" class="col-6"></div>
  <div class="form-group col-4 mb-0">
    <label>ระดับความเข้มข้น</label>
    <input type="text"
           placeholder="ex. undiluted, 1:200, 1:400"
           v-model="dilutions"
           class="form-control pr-4"
           @blur="onDilutionsBlur()"
           @keyup.enter="parseOutput()">
    <div class="hint">
      <i class="fas fa-question color-text-light"></i>
      <div class="hint-container">
        <h5>
          ให้ใส่รายการความเข้มข้นทุกระดับที่ต้องการตรวจ โดยขั้นด้วย คอมม่า ( , )
          ยกตัวอย่างเช่น
        </h5>
        <h5 class="text-primary">
          undiluted, 1:200, 1:400
        </h5>
      </div>
    </div>
  </div>
  <div class="form-group col-3 mb-0">
    <label>ระยะสัมผัสเชื้อ (นาที)</label>
    <input  type="text"
            placeholder="ex. 5, 10, 15"
            v-model.lazy="contactTimes"
            class="form-control pr-4"
            @blur="oncontactTimesBlur()"
            @keyup.enter="parseOutput()">
    <div class="hint">
      <i class="fas fa-question color-text-light"></i>
      <div class="hint-container">
        <h5>
          ให้ใส่รายการระยะเวลาสัมผัสเชื้อทุกเวลาที่ต้องการตรวจ โดยขั้นด้วย คอมม่า ( , )
          ยกตัวอย่างเช่น
        </h5>
        <h5 class="text-primary">
          5, 10, 15
        </h5>
      </div>
    </div>
  </div>
  <div v-if="testType === 6" class="form-group col-3 mb-0">
    <label>ระยะหลังการเจือจาง (วัน)</label>
    <input  type="text"
            placeholder="ex. 3, 7, 10"
            class="form-control pr-4"
            @blur="onDilutionTimesBlur()"
            v-model.lazy="dilutionTimes">
    <div class="hint">
      <i class="fas fa-question color-text-light"></i>
      <div class="hint-container">
        <h5>
          ให้ใส่รายการระยะเวลาเจือจางทุกระยะที่ต้องการตรวจ โดยขั้นด้วย คอมม่า ( , )
          ยกตัวอย่างเช่น
        </h5>
        <h5 class="text-primary">
          3, 7, 10
        </h5>
      </div>
    </div>
  </div>
  <div class="form-group col mb-0 align-items-end d-flex">
    <a  class="btn btn-primary btn-block"
        @click="parseOutput()">
      เพิ่ม
    </a>
  </div>
</div>
</template>

<style lang="scss" scoped>
.hint-container {
  width: 250px;
  top: -150px;
  right: 0px;
  transform-origin: 100% 100%;
}
</style>

<script>
import { uniq } from 'lodash'

export default {
  name: 'form-disinfectant-test-input',
  props: [
    'tests',
    'testType'
  ],
  data () {
    return {
      virusName: '',
      bacteriaName: '',
      dilutions: '',
      contactTimes: '',
      dilutionTimes: ''
    }
  },
  computed: {
    dilutionArr () {
      return this.process(this.dilutions)
    },
    contactTimeArr () {
      return this.process(this.contactTimes)
        .filter( s => /^\d+$/.test(s) )
    },
    dilutionTimeArr () {
      return this.process(this.dilutionTimes)
        .filter( s => /^\d+$/.test(s) )
    }
  },
  methods: {
    process (str) {
      return uniq(str
        .split(',')
        .map( s => s.trim() )
        .filter( s => s )
      )
    },

    onDilutionsBlur () {
      this.dilutions = this.dilutionArr.join(', ')
    },
    oncontactTimesBlur () {
      this.contactTimes = this.contactTimeArr.join(', ')
    },
    onDilutionTimesBlur () {
      this.dilutionTimes = this.dilutionTimeArr.join(', ')
    },

    parseOutput () {
      if (this.testType === 5) {
        this.parseOutputVirus()
      } else if (this.testType === 6) {
        this.parseOutputBacteria()
      }
    },

    parseOutputVirus () {
      if (!this.virusName || !this.dilutions || !this.contactTimes) {
        return
      }
      if (this.dilutionArr.length < 1 || this.contactTimeArr.length < 1) {
        return
      }
      let parsedOutput = {}
      parsedOutput[this.virusName] = {}
      this.dilutionArr.forEach( d => {
        parsedOutput[this.virusName][d] = []
        this.contactTimeArr.forEach( t => parsedOutput[this.virusName][d].push(t) )
      })
      this.virusName = ''
      this.$emit('add', parsedOutput)
    },
    parseOutputBacteria () {
      if (!this.bacteriaName || !this.dilutions || !this.contactTimes || !this.dilutionTimes) {
        return
      }
      if (this.dilutionArr.length < 1 || this.contactTimeArr.length < 1 || this.dilutionTimeArr.length < 1) {
        return
      }
      let parsedOutput = {}
      parsedOutput[this.bacteriaName] = {}
      this.dilutionArr.forEach( d => {
        parsedOutput[this.bacteriaName][d] = {}
        this.contactTimeArr.forEach( t => {
          parsedOutput[this.bacteriaName][d][t] = []
          this.dilutionTimeArr.forEach( dt => parsedOutput[this.bacteriaName][d][t].push(dt) )
        })
      })
      this.bacteriaName = ''
      this.$emit('add', parsedOutput)
    }
  }
}
</script>