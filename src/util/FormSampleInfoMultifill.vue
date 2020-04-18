<template>
<div  class="subcontainer p-3 mt-3"
      :class="{'folded': folded}">
  <div  class="fold-section w-100 d-flex justify-content-between align-items-center mb-3"
        @click="folded = !folded">
    <h4 class="w-100">
      เติมข้อมูลทีละหลายช่อง
    </h4>
    <a class="btn btn-icon">
      <i  class="fas fa-chevron-up"
          :class="{'rotate': folded}"/>
    </a>
  </div>
  <div class="form-row">
    <div class="form-group col-4 mb-2">
      <label>หมายเลขตัวอย่าง</label>
      <input  type="text"
              class="form-control"
              placeholder="ex. 1-4, 6, 7, 9-10"
              v-model="sampleRange"
              @blur="processRawSampleRange()">
      <div class="hint">
        <i class="fas fa-question color-text-light"></i>
        <div class="hint-container">
          <h5>
            ให้ใส่ระยะหมายเลขตัวอย่างที่ต้องการใส่ข้อมูล หรือสามารถใส่เลขตัวอย่างเฉยๆก็ได้ โดยขั้นทุกอย่างด้วย คอมม่า ( , )
            <br>ยกตัวอย่างเช่น
            <span class="text-primary">
              1-3, 5, 7, 9-10
            </span>
          </h5>
          <h5>
            จะใส่ข้อมูลทับช่องของตัวอย่างหมายเลข
            <span class="text-primary">
              1,2,3,5,7,9, และ 10
            </span>
          </h5>
        </div>
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-6">
      <label>ID ตัวอย่าง</label>
      <input  type="text"
              class="form-control"
              v-model.lazy="sampleId">
    </div>
    <div class="form-group col-6">
      <label>ข้อมูลเพิ่มเติม</label>
      <input  type="text"
              class="form-control"
              v-model.lazy="extraInfo"
              @keyup.enter="submit()">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group mb-0 col-4">
      <a  class="btn btn-primary btn-block"
          @click="submit()">
        เพิ่มข้อมูล
      </a>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.subcontainer {
  transition: height 125ms linear;
  overflow: hidden;
  &.folded {
    height: 75px;
  }
  height: 310px;
}
.fold-section {
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    a.btn {
      background: $accent;
      color: $primary;
    }
  }
}
.hint-container {
  width: 450px;
  bottom: -7px;
  right: -460px;
  transform-origin: 0% 85%;
}
</style>

<script>
import { uniq } from 'lodash'

export default {
  name: 'form-sample-info-multifill',
  props: ['maxSamples'],
  data () {
    return {
      folded: true,
      sampleRange: '',
      sampleId: null,
      extraInfo: null,
      rangeArr: []
    }
  },
  methods: {
    processRawSampleRange () {
      const ranges = uniq(this.sampleRange
        .split(',')
        .filter( s => /^\s*\d+\s*-\d+\s*$|^\s*\d+\s*$/g.test(s) )
      )
      this.rangeArr = ranges
        .map( r => r.split('-').map( n => parseInt(n) ) )
        .filter( arr => {
          if (arr.length > 1) {
            return arr[0] < arr[1] && arr[1] <= this.maxSamples
          } else {
            return arr[0] <= this.maxSamples
          }
        })
      this.sampleRange = this.rangeArr.map( r => 
        r.length > 1? `${r[0]}-${r[1]}` : `${r[0]}`
      ).join(', ')
    },
    submit () {
      //this.sampleRange = null
      //this.sampleId = null
      //this.extraInfo = null
      this.$emit('add', {
        ranges: this.rangeArr,
        sampleId: this.sampleId,
        extraInfo: this.extraInfo
      })
    }
  }
}
</script>