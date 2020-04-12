<template>
<div class="form-row subcontainer">
  <div class="col-12">
    <h4 class="mb-1">เพิ่มรายการทดสอบ</h4>
  </div>
  <div class="form-group col-4 mb-0">
    <label>
      เลือกไวรัส
    </label>
    <select class="form-control" v-model="testName">
      <option v-for="test in tests"
              :key="test.id"
              :value="test.name">
        {{ test.name }}
      </option>
    </select>
  </div>
  <div class="form-group col-4 mb-0">
    <label>ระดับความเข้มข้น</label>
    <input type="text"
           placeholder="ex. undiluted, 1:200,1:400"
           v-model="dilutions"
           class="form-control pr-4"
           @keyup.enter="parseOutput()">
    <div class="hint">
      <i class="fas fa-question"></i>
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
    <input type="text"
            placeholder="ex. 5, 10, 15"
            v-model="contactTimes"
            class="form-control pr-4"
            @keyup.enter="parseOutput()">
    <div class="hint">
      <i class="fas fa-question"></i>
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
  <div class="form-group col-1 mb-0 align-items-end d-flex">
    <a class="btn btn-primary btn-block"
       @click="parseOutput()">
      เพิ่ม
    </a>
  </div>
</div>
</template>

<style lang="scss" scoped>
.form-group {
  i {
    font-size: 0.8em;
    margin-top: 0.4em;
  }
}

.hint {
  width: 25px;
  padding-top: 3px;
  position: absolute;
  right: 0.5em;
  top: 28px;
  cursor: pointer;
  i {
    font-size: 1rem;
    color: $light-text;
  }
  &:hover {
    .hint-container {
      transform: scale(1);
    }
    i {
      color: $chula;
    }
  }
  .hint-container {
    text-align: left;
    padding: 1em;
    z-index: 1000;
    width: 250px;
    position: absolute;
    top: -150px;
    right: 0px;
    transition: transform 100ms ease-in-out;
    transform-origin: 100% 100%;
    transform: scale(0);
    background: $light-accent;
    border-radius: 5px;
  }
}
</style>

<script>
import { uniq } from 'lodash'

export default {
  name: 'form-disinfectant-test-input',
  props: [
    'tests'
  ],
  data () {
    return {
      testName: null,
      dilutions: null,
      contactTimes: null
    }
  },
  methods: {
    parseOutput () {
      if (!this.testName || !this.dilutions || !this.contactTimes) {
        return
      }
      let parsedOutput = {}
      parsedOutput[this.testName] = {}
      let dilutionArr = this.dilutions.split(',')
        .map( s => s.trim().toLowerCase() )
        .filter( s => s )
      let contactTimeArr = this.contactTimes.split(',')
        .map( s => s.trim().toLowerCase() )
        .filter( s => s )
      dilutionArr = uniq(dilutionArr)
      contactTimeArr = uniq(contactTimeArr)
      if (dilutionArr.length < 1 || contactTimeArr.length < 1) {
        return
      }
      dilutionArr.forEach( d => {
        parsedOutput[this.testName][d] = []
        contactTimeArr.forEach( t => parsedOutput[this.testName][d].push(t))
      })
      this.testName = null
      this.dilutions = null
      this.contactTimes = null
      this.$emit('add', parsedOutput)
    }
  }
}
</script>