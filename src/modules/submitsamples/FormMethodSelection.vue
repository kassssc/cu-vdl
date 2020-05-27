<template>
<div class="border-b py-2 mb-4">
  <div  v-for="group of testCategory.testGroups"
        :key="group.id"
        class="row no-gutters test-row">
    <div class="col-2 px-2 text-dark">
      <h5>{{ group.name }}</h5>
    </div>
    <div class="col-10">
      <div  v-for="test of testCategory.testInfo.filter(t => t.group === group.id)"
            :key="test.id"
            class="test-row form-row align-items-end">
        <div class="form-group mb-0 col-6">
          <checkbox :label="test.name"
                    :disabled="
                      (test.min && sampleCount < test.min) ||
                      (test.max && sampleCount > test.max)
                    "
                    :secondary-label="test.constraint"
                    v-model="tests[test.id]"
                    @change="emitInput()" />
        </div>
        <div class="form-group text-right mb-0 col-2">
          <h5>{{ `${test.price}฿` }}</h5>
        </div>
        <div class="form-group col-1 mb-0 text-right text-muted">
          <div  v-if="tests[test.id] && sampleCount"
                class="nowrap">
            <i class="fas fa-times icon-sm d-inline"></i>
            <h5 class="mx-1 d-inline">{{ sampleCount }}</h5>
            <i class="fas fa-equals icon-sm d-inline"></i>
          </div>
        </div>
        <div class="form-group col-2 mb-0 text-right">
          <div v-if="tests[test.id] && sampleCount">
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
                class="form-control form-control-sm"
                type="text"
                v-model="customBacteriaTests[idx]" />
              <a  class="btn btn-sm btn-x custom-test"
                @click="deleteCustomBacteriaTest(idx)">
              <i class="fas fa-times" />
            </a>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <button class="btn btn-primary btn-sm"
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
  <FormAntibioticsSensitivity
    v-if="includesSensitivityTest"
    :options="testCategory.sensitivityTestOptions"
    v-model="sensitivityTests" />
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'form-method-selection',
  components: {
    FormAntibioticsSensitivity: () => import(/* webpackChunkName: "group-submitsamples" */
      './FormAntibioticsSensitivity'
    )
  },
  computed: {
    ...mapGetters([
      'sensitivityTestIds'
    ]),
    formValue () {
      let testList = []
      for (const [testId, active] of Object.entries(this.tests)) {
        if (active) testList.push(testId)
      }
      let price = this.testCategory.testInfo.reduce( (totalPrice, test) => {
        if (this.tests[test.id]) {
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
        const customBacteriaTests = this.customBacteriaTests

        val = {...val, customBacteriaTests}
      }
      return val
    },
    isBacteriaTest () {
      return this.testCategory.id === 4
    },
    customBacteriaTestPrice () {
      return this.customBacteriaTests.length * 500
    },
    includesSensitivityTest () {
      if (!this.isBacteriaTest) return false
      const sensitivityTestActive = this.sensitivityTestIds()
        .reduce( (includes, testId) => includes || !!this.tests[testId], false)
      return sensitivityTestActive || this.customBacteriaTests.length > 0
    },
  },
  props: {
    sampleCount: {
      required: true
    },
    testCategory: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tests: {},
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
      this.testCategory.testInfo.forEach( test => {
        const violatesConstraint = (
          (test.max && newSampleCount > test.max) ||
          (test.min && newSampleCount < test.min)
        )
        if (this.tests[test.id] && violatesConstraint) {
          this.tests[test.id] = false
        }
      })
      this.emitInput()
    }
  },
  mounted () {
    const newTests = {}
    for (const test of this.testCategory.testInfo) {
      newTests[test.id] = false
    }
    for (const activeTest of this.$attrs.value.testList) {
      newTests[activeTest] = true
    }
    this.tests = {...newTests}
    if (this.$attrs.value.customBacteriaTests) {
      this.customBacteriaTests = this.$attrs.value.customBacteriaTests
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
}
</style>