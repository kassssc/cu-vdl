<template>
<div class="batch w-100 position-relative border-bottom-medium py-5">
  <a  v-if="hasMultipleBatches"
      class="btn btn-x batch-section"
      @click="$emit('delete-batch')">
    <i class="fas fa-times" />
  </a>
  <div class="row w-100">
    <div class="col-xl-2 col-12">
      <h3 class="mb-2">
        {{ batchLabel }}
      </h3>
      <h5 class="ml-3 text-medium d-xl-block d-none">
        {{ batchSecondaryLabel }}
      </h5>
      <h5 v-if="batch.sampleCount"
          class="ml-3 text-medium d-xl-block d-none">
        {{ `${this.batch.sampleCount} ตัวอย่าง` }}
      </h5>
    </div>
    <div class="col-xl-10 col-12">
      <div class="form-row mb-3">
        <FormInput
          class="col-2"
          input-class="text-right"
          type="number"
          label="จำนวนตัวอย่าง"
          label-class="label-lg"
          required
          :value="batch.sampleCount"
          @focus="$event.target.select()"
          @blur="updateSampleCount($event.target.value)" />
      </div>
      <div class="form-row mb-3">
        <FormInlineSelect
          class="col-8"
          label="เลือกประเภทงานทดสอบ"
          label-class="label-lg"
          :options="tests(1)"
          v-model="batch.testType"
          :warn-before-change="false"
          warning-msg="..."
          @change="onBatchTestTypeChange()" />
      </div>

      <div class="form-row no-gutters border-bottom-lighter pb-1">
        <div class="col-2 text-dark">
          <h4>เลือกการทดสอบ</h4>
        </div>
        <div class="col-10 mt-2">
          <div class="form-row">
            <div class="col-6"></div>
            <div class="col-2 text-right">
              <h5 class="text-muted">ราคา/ตัวอย่าง</h5>
            </div>
            <div class="col-1"></div>
            <div class="col-2">
              <h5 class="text-muted text-right">ยอดค่าบริการ</h5>
            </div>
          </div>
        </div>
      </div>

      <div  v-for="category of testType(batch.testType).testCategories"
            :key="category.name"
            class="row no-gutters test-row">
        <div class="col-2 pr-2 text-dark">
          <h5>{{ category.name }}</h5>
        </div>
        <div class="col-10">
          <div  v-for="test of testCategory(batch.testType, category.id)"
                :key="test.id"
                class="test-row form-row align-items-end">
            <div class="form-group mb-0 col-6">
              <checkbox :label="test.name"
                        :disabled="
                          (test.min && batch.sampleCount < test.min) ||
                          (test.max && batch.sampleCount > test.max)
                        "
                        :secondary-label="test.constraint"
                        v-model="batch.tests[test.id]"/>
            </div>
            <div class="form-group text-right mb-0 col-2">
              <h5>{{ `${test.price}฿` }}</h5>
            </div>
            <div class="form-group col-1 mb-0 text-right text-muted">
              <div v-if="batch.tests[test.id] && batch.sampleCount"
                    class="nowrap">
                <i class="fas fa-times icon-sm d-inline"></i>
                <h5 class="mx-1 d-inline">{{ batch.sampleCount }}</h5>
                <i class="fas fa-equals icon-sm d-inline"></i>
              </div>
            </div>
            <div class="form-group col-2 mb-0 text-right">
              <div v-if="batch.tests[test.id] && batch.sampleCount">
                <h5>{{ `${(test.price * batch.sampleCount).toLocaleString()}฿` }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isBacteriaTestBatch"
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
                <div class="form-group col-12 mb-0">
                  <input
                    v-focus-on-create
                    class="form-control form-control-sm"
                    type="text"
                    v-model="batch.customTests[idx]" />
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
                    @click="deleteCustomTest(idx)">
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
                {{ `~${customTestPrice}฿` }}
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
              <h5 class="text-medium">ตัวอย่าง</h5>
            </div>
            <div class="col-2 text-right">
              <h2 class="text-primary">
                {{ activeTestCount + batch.customTests.length }}
              </h2>
              <h5 class="text-medium">รายการทดสอบ</h5>
            </div>
            <div class="col-1 text-right nowrap">
              <h5 class="text-medium mt-2 ml-3">รวมเป็น</h5>
            </div>
            <div class="col-2 text-right">
              <h2 class="text-primary">
                {{ totalPriceLabel }}
              </h2>
              <h5 class="text-medium">ค่าบริการ</h5>
              <h6 v-if="batch.customTests.length > 0"
                  class="text-muted">
                *เป็นราคาโดยประมานเท่านั้น
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div v-if="includesSensitivityTest"
            class="form-row no-gutters pt-4 border-bottom-lighter">
        <div class="col-2">
          <h5 class="mb-2">เลือกยาต้านจุลชีพเพื่อการทดสอบความไว</h5>
          <h5 class="text-medium">(เลือกได้ถึง 8 รายการ)</h5>
        </div>
        <div class="col-10">
          <FormAntibioticsSensitivity
            :options="testType(batch.testType).sensitivityTestOptions"
            v-model="batch.sensitivityTests" />
        </div>
      </div>

    </div>
  </div>

  <div class="row w-100 mt-5">
    <div class="col-xl-2 col-12">
      <h4 class="mb-2">รายละเอียดตัวอย่าง</h4>
    </div>

    <div v-show="batch.sampleCount <= 0" class="col-10 mt-1">
      <i class="fas fa-exclamation-triangle mr-2 text-primary d-inline" />
      <h5 class="text-primary d-inline">กรุณาใส่จำนวนตัวอย่างก่อน</h5>
    </div>

    <div v-show="batch.sampleCount > 0" class="col-xl-10 col-12">

      <div v-show="batch.sampleCount > 1" class="form-row w-100 mb-3">
        <div class="col-1 mr-3"></div>
        <div class="col-10 p-0">
          <FormSampleInfoMultifill
            :max-samples="batch.sampleCount"
            @add="updateSampleDetails($event)" />
        </div>
      </div>

      <div class="form-row w-100 text-medium">
        <div class="form-group mb-2 px-1 col-1 text-right mr-3">
          <h5>หมายเลข</h5>
        </div>
        <div class="form-group mb-2 px-1 col-5">
          <h5>ID ตัวอย่าง</h5>
        </div>
        <div class="form-group mb-2 px-1 col-5">
          <h5>ข้อมูลเพิ่มเติม</h5>
        </div>
      </div>

      <div  v-for="(sample, idxSample) of batch.samples"
            :key="idxSample"
            :id="`batch${idx+1}-set${idxSample+1}`"
            class="form-row w-100">
        <div class="form-group mb-2 px-1 col-1 text-right mr-3">
          <h5 class="text-medium">{{ idxSample+1 }}</h5>
        </div>
        <FormInput
          class="col-5 mb-2 px-1"
          input-class="form-control-sm"
          type="text"
          v-model="sample.sampleId" />
        <FormInput
          class="col-5 mb-2 px-1"
          input-class="form-control-sm"
          type="text"
          v-model="sample.extraInfo" />
      </div>

    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
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
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'general-batch',
  components: {
    FormAntibioticsSensitivity: () => import(/* webpackChunkName: "group-submitsamples" */
      '@/util/FormAntibioticsSensitivity'
    ),
    FormSampleInfoMultifill: () => import(/* webpackChunkName: "group-submitsamples" */
      '@/util/FormSampleInfoMultifill'
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
    }
  },
  computed: {
    ...mapGetters([
      'testType',
      'testCategory',
      'tests',
      'sensitivityTestIds'
    ]),
    batchLabel () {
      return this.hasMultipleBatches? `กลุ่มการทดสอบ ${this.idx+1}` : 'รายการทดสอบ'
    },
    batchSecondaryLabel () {
      return `งาน${this.testType(this.batch.testType).name}`
    },
    totalPriceLabel () {
      const hasActiveTests = this.activeTestCount > 0
      const hasCustomTests = this.batch.customTests.length > 0
      const shouldDisplayPrice = (hasActiveTests || hasCustomTests) && !!this.batch.sampleCount
      return shouldDisplayPrice? `${hasCustomTests? '~':''}${this.batch.totalPrice.toLocaleString()}฿` : 'N/A'
    },
    isBacteriaTestBatch () {
      return this.batch.testType === 4
    },
    activeTestCount () {
      return Object.values(this.batch.tests).reduce( (count, test) => count + (test? 1:0), 0)
    },
    includesSensitivityTest () {
      if (!this.isBacteriaTestBatch) return false
      const sensitivityTestActive = Object.keys(this.batch.tests)
        .map( testId => parseInt(testId) )
        .filter( testId => this.sensitivityTestIds().includes(testId) )
        .reduce( (active, testId) => active || this.batch.tests[testId], false )
      return sensitivityTestActive || this.batch.customTests.length > 0
    },
    totalPrice () {
      let totalPrice = this.testType(this.batch.testType).testInfo
        .filter( t => this.batch.tests[t.id] )
        .reduce( (acc, t) => acc + (t.price * this.batch.sampleCount), 0 )
      // Custom test prices
      if (this.isBacteriaTestBatch) {
        totalPrice += this.customTestPrice
      }
      return totalPrice
    },
    customTestPrice () {
      return this.batch.customTests.length * this.batch.sampleCount * 500
    },
    hasInfo () {
      return this.activeTestCount > 0 || this.batch.customTests.length > 0
    }
  },
  watch: {
    totalPrice (val) {
      this.batch.totalPrice = val
    }
  },
  methods: {
    onBatchTestTypeChange () {
      this.batch.totalPrice = 0
      this.batch.customTests = []
      this.batch.sensitivityTests = null
      const newTests = {}
      for (const test of this.testType(this.batch.testType).testInfo) {
        newTests[test.id] = false
      }
      this.batch.tests = {...newTests}
    },
    updateSampleCount (val) {
      // Floor to not allow decimals
      this.batch.sampleCount = Math.floor(val)
      // Set to null if left empty or negative or 0
      if (!this.batch.sampleCount || this.batch.sampleCount <= 0) {
        this.batch.sampleCount = null
      // Set to 100 if larger than 100
      } else if (this.batch.sampleCount > 100) {
        this.batch.sampleCount = 100
      }

      // Check for max/min sample counts
      this.testType(this.batch.testType).testInfo
        .forEach( t => {
          if ( (t.max && this.batch.sampleCount > t.max) ||
               (t.min && this.batch.sampleCount < t.min) ) {
            this.batch.tests[t.id] = false
          }
        })
      
      // Update this.batch samples list
      const diff = Math.abs(this.batch.sampleCount - this.batch.samples.length)
      if (this.batch.sampleCount > this.batch.samples.length) {
        for (let i = this.batch.samples.length; i < this.batch.sampleCount; i++) {
          this.batch.samples[i] = { sampleId: null, extraInfo: null }
        }
      } else if (this.batch.sampleCount < this.batch.samples.length) {
        this.batch.samples.splice(this.batch.samples.length - diff, diff)
      }
    },
    addCustomTest () {
      this.batch.customTests.push('')
    },
    deleteCustomTest (idx) {
      this.batch.customTests.splice(idx, 1)
    },
    updateSampleDetails ({ranges, sampleId, extraInfo}) {
      for (const range of ranges) {
        const start = range[0] - 1
        const end = range.length > 1? range[1] : range[0]
        for (let i = start; i < end; i++) {
          this.batch.samples.splice(i, 1, {
            sampleId: sampleId? sampleId : this.batch.samples[i].sampleId,
            extraInfo: extraInfo? extraInfo : this.batch.samples[i].extraInfo
          })
        }
      }
    },
  },
  beforeMount () {
    this.onBatchTestTypeChange()
  }
}
</script>