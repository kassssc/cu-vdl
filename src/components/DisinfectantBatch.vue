<template>
<div class="batch w-100 position-relative border-bottom-medium py-5">
  <a  v-if="hasMultipleBatches"
      class="btn btn-x batch-section"
      @click="$emit('delete-batch')">
    <i class="fas fa-times" />
  </a>
  <div class="row w-100">
    <div class="col-xl-2 col-12">
      <h3 class="mb-2">การทดสอบ</h3>
      <h5 v-if="hasMultipleBatches"
          class="text-medium">
        {{ batch.disinfectantName }}
      </h5>
    </div>

    <div class="col-xl-10 col-12">

      <h4>ชื่อนํ้ายาฆ่าเชื้อ</h4>
      
      <div  v-show="reportLang.thai"
            class="form-row">
        <FormInput
          class="form-group col-6 mb-2"
          label="ภาษาไทย"
          v-model="batch.disinfectantName" />
      </div>
      <div  v-show="reportLang.eng"
            class="form-row">
        <FormInput
          class="form-group col-6 mb-2"
          label="English"
          v-model="batch.disinfectantNameEng" />
      </div>

      <div class="mt-3 form-row">
        <FormInlineSelect
          class="col-6"
          label="ทดสอบประสิทธิภาพยาฆ่าเชื้อต่อ"
          label-class="label-lg"
          :options="tests(2)"
          v-model="batch.testType"
          @change="onBatchTestTypeChange()" />
      </div>

      <h3 class="mt-3 mb-1">รายการทดสอบ</h3>
      <div class="form-row border-bottom-lighter px-3 pb-2 mb-1">
        <div class="col-4">
          <h5 class="text-medium">
            ชื่อ{{ isBacteriaTestBatch? 'แบคทีเรีย' : 'ไวรัส' }}
          </h5>
        </div>
        <div class="col-6">
          <div class="form-row">
            <div class="col-4">
              <h5 class="text-medium">ความเข้มข้น</h5>
            </div>
            <div class="col-8">
              <div class="form-row">
                <div class="col-6">
                  <h5 class="text-medium">ระยะสัมผัส</h5>
                </div>
                <div  v-show="isBacteriaTestBatch"
                      class="col-6">
                  <h5 class="text-medium">ระยะหลังการเจือจาง</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div  v-for="(info, test) in batch.tests"
            :key="test"
            class="form-row test-row border-bottom-lighter position-relative px-3">
        <a class="btn btn-sm btn-x disinfectant-test"
            @click="deleteDisinfectantTest(test)">
          <i class="fas fa-times" />
        </a>

        <div class="col-4 pr-5">
          <h4 class="d-inline">{{ test }}</h4>
        </div>

        <div class="col-6">
          <div v-for="dilution of info.dilutions"
                :key="dilution"
                class="form-row test-row">
            <div class="col-4 position-relative">
              <h4 class="d-inline">{{ dilution }}</h4>
            </div>

            <div  v-if="!isBacteriaTestBatch"
                  class="col-4">
              <div v-for="time of info.contactTimes"
                    :key="time"
                    class="test-row position-relative">
                <h5 class="d-inline">{{ time }}</h5>
                <h5 class="d-inline ml-1">นาที</h5>
              </div>
            </div>

            <div  v-else-if="isBacteriaTestBatch"
                  class="col-8">
              <div  v-for="time of info.contactTimes"
                    :key="time"
                    class="form-row test-row">
                <div class="col-6">
                    <h5 class="d-inline">{{ time }}</h5>
                    <h5 class="d-inline ml-1">นาที</h5>
                </div>
                <div class="col-6">
                  <div  v-for="dt of info.dilutionTimes"
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
          <h5>{{ `${info.price.toLocaleString()}฿` }}</h5>
          <h6 class="text-muted squeeze-up">ต่อรายการ</h6>
          <h5 class="mt-1">
            <i class="fas fa-times icon-sm"></i>
            {{ info.numTests }}
          </h5>
          <h6 class="text-muted squeeze-up">รายการ</h6>
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
            <div  v-show="!isBacteriaTestBatch"
                  class="text-right position-relative cost-container">
              <h4 class="text-primary">
                <i class="fas fa-plus icon-sm"></i>
                {{ `${batch.dilutionCost.toLocaleString()}฿` }}
              </h4>
              <h5 class="text-medium">ค่า Dilution</h5>
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
              <h5 class="text-medium">ค่าประเมินผล</h5>
            </div>
          </template>
        </div>
        <div class="col-1 d-flex flex-column align-items-end justify-content-end">
          <h5 class="text-medium mb-4">รวมเป็น</h5>
        </div>
        <div class="col-2 pr-4 d-flex flex-column align-items-end justify-content-end">
          <h2 class="text-primary">
            {{ totalPriceLabel }}
          </h2>
          <h5 class="text-medium">ค่าบริการ</h5>
        </div>
      </div>

      <FormDisinfectantTestInput
        class="mt-4"
        :testType="batch.testType"
        :tests="testType(batch.testType).testInfo"
        @add="addDisinfectantTest($event)" />

    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import union from 'lodash/union'

export default {
  name: 'disinfectant-batch',
  components: {
    FormDisinfectantTestInput: () => import(/* webpackChunkName: "group-submitsamples" */
      '@/util/FormDisinfectantTestInput'
    ),
  },
  props: {
    batch: {
      type: Object,
      default: () => {}
    },
    hasMultipleBatches: {
      type: Boolean,
      default: false
    },
    idx: {
      type: Number,
      default: 0
    },
    reportLang: {
      type: Object,
      default: () => {}
    },
    isEditMode: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'testType',
      'tests'
    ]),
    isBacteriaTestBatch () {
      return this.batch.testType === 6
    },
    uniqueCells () {
      if (this.isBacteriaTestBatch) return {}
      const cells = {}
      Object.values(this.batch.tests).forEach( t => {
        cells[t.cellName] = (t.cellName in cells)?
          union(cells[t.cellName], t.dilutions) : [...t.dilutions]
      })
      return cells      
    },
    dilutionCost () {
      if (this.isBacteriaTestBatch) return 0
      return Object.values(this.uniqueCells)
        .reduce( (acc, curr) => acc + 3000 * curr.length, 0)
    },
    totalPrice () {
      let testsPrice = Object.values(this.batch.tests)
        .reduce( (acc, curr) => acc + curr.totalPrice, 0)
      if (!this.isBacteriaTestBatch) {
        testsPrice += this.dilutionCost
      }
      return 3000 + testsPrice
    },
    totalPriceLabel () {
      return Object.values(this.batch.tests).length > 0? `${this.batch.totalPrice.toLocaleString()}฿` : 'N/A'
    }
  },
  watch: {
    totalPrice (val) {
      this.batch.totalPrice = val
    },
    uniqueCells (val) {
      this.batch.uniqueCells = val
    },
    dilutionCost (val) {
      this.batch.dilutionCost = val
    }
  },
  methods: {
    onBatchTestTypeChange () {
      this.batch.totalPrice = 0
      this.batch.dilutionCost = 0
      this.batch.uniqueCells = {}
      this.batch.tests = {}
    },
    addDisinfectantTest (payload) {
      this.batch.tests = {...this.batch.tests, ...payload}
    },
    deleteDisinfectantTest (testKey) {
      this.$delete(this.batch.tests, testKey)
    },
  },
  beforeMount () {
    this.onBatchTestTypeChange()
  }
}
</script>

<style lang="scss" scoped>
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
a.btn.btn-x {
  &.batch-section {
    position: absolute;
    height: 35px;
    width: 35px;
    right: 15px;
    top: 20px;
    i { font-size: 1.25rem; }
  }
  &.disinfectant-test {
    position: absolute;
    height: 25px;
    width: 25px;
    top: 6px;
    right: 10px;
  }
}
</style>