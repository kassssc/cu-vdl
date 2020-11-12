<template>
<Modal  modal-id="sample-info-multifill-modal"
        x-close>
  <template #modal-header>
    <h4>เติมข้อมูลทีละหลายช่อง</h4>
  </template>
  <template #modal-body>
    <div class="form-row">
      <div class="form-group col-12">
        <label>หมายเลขตัวอย่าง</label>
        <input  type="text"
                class="form-control"
                placeholder="ex. 1-4, 6, 7, 9-10"
                v-model="sample_range"
                @blur="process_raw_sample_range()">
        <div class="hint">
          <i class="fas fa-question color-text-light"></i>
          <div class="hint-box">
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
      <FormInput
        class="col-12"
        label="ID ตัวอย่าง"
        v-model="sample_id" />
      <FormInput
        class="col-12"
        label="ข้อมูลเพิ่มเติม"
        @keyup.enter="submit()"
        v-model="extra_info" />
    </div>
    <div class="form-row mt-3">
      <div class="form-group mb-0 col-12">
        <button class="btn btn-primary btn-block"
                @click="submit()">
          เพิ่มข้อมูล
        </button>
      </div>
    </div>
  </template>
</Modal>
</template>

<script>
import uniq from 'lodash/uniq'

export default {
  name: 'form-sample-info-multifill-modal',
  props: ['max_samples'],
  data () {
    return {
      sample_range: '',
      sample_id: null,
      extra_info: null,
      range_arr: []
    }
  },
  methods: {
    process_raw_sample_range () {
      const ranges = uniq(this.sample_range
        .split(',')
        .filter( s => /^\s*\d+\s*-\d+\s*$|^\s*\d+\s*$/g.test(s) )
      )
      this.range_arr = ranges
        .map( r => r.split('-').map( n => parseInt(n) ) )
        .filter( arr => {
          if (arr.length > 1) {
            return arr[0] < arr[1] && arr[1] <= this.max_samples
          } else {
            return arr[0] <= this.max_samples
          }
        })
      this.sample_range = this.range_arr.map( r => 
        r.length > 1? `${r[0]}-${r[1]}` : `${r[0]}`
      ).join(', ')
    },
    submit () {
      this.$emit('add', {
        ranges: this.range_arr,
        sample_id: this.sample_id,
        extra_info: this.extra_info
      })
      this.sample_range = null
      this.sample_id = null
      this.extra_info = null
    }
  }
}
</script>

<style lang="scss" scoped>
.hint-box {
  width: 450px;
  bottom: -7px;
  right: -460px;
  transform-origin: 0% 85%;
}
</style>