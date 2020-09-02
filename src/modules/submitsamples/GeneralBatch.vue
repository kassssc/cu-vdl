<template>
<div class="batch w-100 position-relative border-b-md py-5">
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
      <h5 v-if="batch.sampleCount"
          class="ml-3 text-medium d-xl-block d-none">
        {{ `${batch.sampleCount} ตัวอย่าง` }}
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

      <div class="form-row">
        <div class="col-12">
          <h4 class="mb-3 text-dark">เลือกการทดสอบ</h4>
        </div>
      </div>

      <div  v-for="testCategory of generalTests"
            :key="testCategory.id"
            class="pb-2">
        <div class="form-row no-gutters border-b pb-1">
          <div class="form-group col-2 mb-0 text-dark d-flex overflow-visible nowrap">
            <checkbox
              label-class="label-xl"
              :label="`งาน${testCategory.name}`"
              :value="!!batch.tests[testCategory.id]"
              @input="onTestCategoryToggle(testCategory.id, $event)" />
          </div>
          <div v-if="batch.tests[testCategory.id]" class="col-10">
            <div class="form-row mt-2">
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

        <transition name="fade-no-delay">
          <FormMethodSelection
            v-if="batch.tests[testCategory.id]"
            :test-category="testCategory"
            :sample-count="batch.sampleCount"
            v-model="batch.tests[testCategory.id]" />
        </transition>

      </div>

      <div  v-if="activeTestCount > 0 && !!batch.sampleCount"
            class="form-row no-gutters pt-2 pb-4 border-b">
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
                {{ activeTestCount + (batch.tests[4]? batch.tests[4].customBacteriaTests.length : 0) }}
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
          <h5 class="d-inline">ID ตัวอย่าง</h5>
          <i class="fas fa-star-of-life text-primary icon-sm ml-1" />
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

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'general-batch',
  components: {
    FormMethodSelection: () => import(/* webpackChunkName: "group-submitsamples" */
      './FormMethodSelection'
    ),
    FormSampleInfoMultifill: () => import(/* webpackChunkName: "group-submitsamples" */
      './FormSampleInfoMultifill'
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
    isEditMode: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters(['generalTests']),
    batchLabel () {
      return this.hasMultipleBatches? `กลุ่มการทดสอบ ${this.idx+1}` : 'รายการทดสอบ'
    },
    totalPriceLabel () {
      const shouldDisplayPrice = (this.activeTestCount > 0 || this.customTestCount.length > 0) && !!this.batch.sampleCount
      return shouldDisplayPrice? `${this.customTestCount.length > 0? '~':''}${this.batch.totalPrice.toLocaleString()}฿` : 'N/A'
    },
    includesBacteriaTest () {
      return !!this.batch.tests[4]
    },
    activeTestCount () {
      let testCount = Object.values(this.batch.tests).reduce( (count, category) => {
        if (category) {
          let currCount = category.testList.length
          if (category.customBacteriaTests) {
            currCount += category.customBacteriaTests.length
          }
          return currCount
        }
        return count
      }, 0)
      return testCount
    },
    customTestCount () {
      if (!this.includesBacteriaTest) return 0
      return this.batch.tests[4].customBacteriaTests.length
    },
    totalPrice () {
      return Object.values(this.batch.tests).reduce( (batchPrice, category) => {
        if (category) return batchPrice += category.price
        return batchPrice
      }, 0)
    },
    hasInfo () {
      return this.activeTestCount > 0 || this.customTestCount > 0 || !!this.batch.sampleCount
    }
  },
  watch: {
    totalPrice (val) {
      this.batch.totalPrice = val
    },
    hasInfo (val) {
      this.batch.hasInfo = val
    }
  },
  methods: {
    onTestCategoryToggle (categoryId, active) {
      this.batch.tests[categoryId] = active? { testList: [], price: 0 } : null
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
      
      // Update batch samples list
      const diff = Math.abs(this.batch.sampleCount - this.batch.samples.length)
      if (this.batch.sampleCount > this.batch.samples.length) {
        for (let i = this.batch.samples.length; i < this.batch.sampleCount; i++) {
          this.batch.samples[i] = { sampleId: null, extraInfo: null }
        }
      } else if (this.batch.sampleCount < this.batch.samples.length) {
        this.batch.samples.splice(this.batch.samples.length - diff, diff)
      }
    },
    updateSampleDetails ({ ranges, sampleId, extraInfo }) {
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
  mounted () {
    const newTests = {}
    for (let testCategory of this.generalTests) {
      newTests[testCategory.id] = null
    }
    this.batch.tests = { ...newTests }
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