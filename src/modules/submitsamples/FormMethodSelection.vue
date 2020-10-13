<template>
<div class="method-selection-box border-b py-2 mb-4">
  <div  v-for="(tests, category) in testMethodsByCategory"
        :key="category"
        class="row no-gutters test-row">
    <div class="col-2 px-2 text-dark">
      <h5>{{ category }}</h5>
    </div>
    <div class="col-10">
      <div  v-for="test of tests"
            :key="test.test_key"
            class="test-row form-row align-items-end">
        <div class="form-group mb-0 col-6">
          <checkbox :label="test.display_name"
                    :secondary-label="test.constraint_label"
                    :disabled="
                      (test.min && sampleCount < test.min) ||
                      (test.max && sampleCount > test.max)
                    "
                    v-model="testSelection[test.test_key]"
                    :color="color"
                    @change="emitInput()" />
        </div>
        <div class="form-group text-right mb-0 col-2">
          <h5>{{ `${test.price}฿` }}</h5>
        </div>
        <div class="form-group col-1 mb-0 text-right text-muted">
          <div  v-if="testSelection[test.test_key] && sampleCount"
                class="nowrap">
            <i class="fas fa-times icon-sm d-inline"></i>
            <h5 class="mx-1 d-inline">{{ sampleCount }}</h5>
            <i class="fas fa-equals icon-sm d-inline"></i>
          </div>
        </div>
        <div class="form-group col-2 mb-0 text-right">
          <div v-if="testSelection[test.test_key] && sampleCount">
            <h5>{{ `${(test.price * sampleCount).toLocaleString()}฿` }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div  v-if="isBacteriaTest"
        class="row no-gutters py-3">
    <div class="col-2 px-2">
      <h5 class="text-dark">รายการแบคทีเรียอื่นๆ</h5>
    </div>
    <div class="col-10">
      <div class="form-row">
        <div class="col-8">
          <div  v-for="(customTest, idx) of customBacteriaTests"
                :key="idx"
                class="form-group d-block mb-2 position-relative">
              <input
                v-focus-on-create
                class="form-control form-control-sm input-pink"
                type="text"
                v-model.lazy="customBacteriaTests[idx]"
                @blur="emitInput()" />
              <a  class="btn btn-sm btn-x custom-test"
                @click="deleteCustomBacteriaTest(idx)">
              <i class="fas fa-times" />
            </a>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <button class="btn btn-pink btn-sm"
                    :disabled="customBacteriaTests.length >= 5"
                    @click="addCustomBacteriaTest()">
              เพิ่มรายการแบคทีเรีย
            </button>
            <h5>รอประเมินราคา (ประมาน 500฿ ต่อรายการ ต่อตัวอย่าง)</h5>
          </div>
        </div>
        <div  v-if="customBacteriaTests.length > 0 && sampleCount > 0"
              class="col-4 d-flex align-items-end justify-content-end pt-2">
          <!-- <h5>~500฿</h5>
          <h5><i class="fas fa-times icon-sm" /> {{ batch.sampleCount }}</h5>
          <h6 class="text-muted squeeze-up">ตัวอย่าง</h6>
          <h5><i class="fas fa-times icon-sm" /> {{ customBacteriaTests.length }}</h5>
          <h6 class="text-muted squeeze-up">รายการอื่นๆ</h6> -->
          <h4>
            <!-- <i class="fas fa-equals icon-sm" /> -->
            {{ `~${customBacteriaTestPrice}฿` }}
          </h4>
        </div>
      </div>
    </div>
  </div>
  <div  v-if="includesSensitivityTest"
        class="row no-gutters pt-3 border-t">
    <div class="col-12 px-2">
      <FormAntibioticsSensitivity
        v-if="!$apollo.loading"
        :options="sensitivityTestOptions"
        :color="color"
        v-model="sensitivityTests"
        @change="emitInput()" />
    </div>
  </div>
</div>
</template>

<script>
import groupBy from 'lodash/groupBy'
import { BACTERIA_ANTIBIOTICS } from '@/graphql/tests'

export default {
  name: 'form-method-selection',
  components: {
    FormAntibioticsSensitivity: () => import(/* webpackChunkName: "group-submitsamples" */
      './FormAntibioticsSensitivity'
    )
  },
  computed: {
    testMethodsByCategory () {
      const processed = this.testMethods.map( test => {
        let constraint_label = ''
        if (test.min && test.max) {
          constraint_label = `(${test.min}-${test.max} ต.ย.)`
        } else if (test.min) {
          constraint_label = `(≥ ${test.min} ต.ย.)`
        } else if (test.max) {
          constraint_label = `(≤ ${test.max} ต.ย.)`
        }
        return {...test, constraint_label}
      })
      return groupBy(processed, 'category')
    },
    formValue () {
      let testList = []
      for (const [test, active] of Object.entries(this.testSelection)) {
        if (active) testList.push(test)
      }
      let price = this.testMethods.reduce( (totalPrice, test) => {
        if (this.testSelection[test.test_key]) {
          return totalPrice + (test.price * this.sampleCount)
        } else {
          return totalPrice
        }
      }, 0)
      if (this.isBacteriaTest) {
        price += this.customBacteriaTestPrice
      }
      let val = { testList, price }
      if (this.isBacteriaTest) {
        const customBacteriaTests = [...this.customBacteriaTests]
        const sensitivityTests = this.sensitivityTests
        val = {...val, customBacteriaTests, sensitivityTests}
      }
      return val
    },
    isBacteriaTest () {
      return this.department === 'แบคทีเรียวิทยา'
    },
    customBacteriaTestPrice () {
      return this.customBacteriaTests.length * 500
    },
    includesSensitivityTest () {
      if (!this.isBacteriaTest) return false
      const sensitivityTestActive = this.testMethodsByCategory['Sensitivity Test']
        .reduce( (includes, test) => includes || !!this.testSelection[test.test_key], false)
      return sensitivityTestActive || this.customBacteriaTests.length > 0
    },
  },
  props: {
    sampleCount: {
      required: true
    },
    department: {
      required: true,
      type: String
    },
    testMethods: {
      type: Array,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      testSelection: {},
      sensitivityTests: null,
      customBacteriaTests: []
    }
  },
  methods: {
    emitInput () {
      this.$emit('input', this.formValue)
    },
    addCustomBacteriaTest () {
      this.customBacteriaTests.push('')
      this.emitInput()
    },
    deleteCustomBacteriaTest (idx) {
      this.customBacteriaTests.splice(idx, 1)
      this.emitInput()
    },
  },
  watch: {
    sampleCount (newSampleCount) {
      this.testMethods.forEach( test => {
        const violatesConstraint = (
          (!!test.max && (newSampleCount > test.max)) ||
          (!!test.min && (newSampleCount < test.min))
        )
        if (this.testSelection[test.test_key] && violatesConstraint) {
          this.testSelection[test.test_key] = false
        }
      })
      this.emitInput()
    },
    /* includesSensitivityTest (newIncludesSensitivityTest) {
      if (!newIncludesSensitivityTest) {
        this.sensitivityTests = null
      } else {
        this.sensitivityTests = ''
      }
      this.emitInput()
    } */
  },
  mounted () {
    const newTests = {}
    for (const test of this.testMethods) {
      newTests[test.test_key] = false
    }
    for (const activeTest of this.$attrs.value.testList) {
      newTests[activeTest] = true
    }
    this.testSelection = {...newTests}
    if (this.$attrs.value.customBacteriaTests) {
      this.customBacteriaTests = this.$attrs.value.customBacteriaTests
    }
    this.sensitivityTests = this.$attrs.value.sensitivityTests
  },
  apollo: {
    sensitivityTestOptions: {
      query: BACTERIA_ANTIBIOTICS,
      update: data => JSON.parse(data.test_method_bacteria_antibiotic_get.result.json),
      skip () { return !this.isBacteriaTest }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn.btn-x.custom-test {
  position: absolute;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  right: -25px;
  width: 25px;
  height: 1.5em;
  &:hover {
    color: $pink;
  }
}
button.btn.btn-pink {
  background: $pink;
  color: $light;
}
input.form-control.input-pink:focus {
  box-shadow: 0 0 0 .2rem $pink;
}
</style>