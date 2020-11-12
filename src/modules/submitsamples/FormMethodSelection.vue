<template>
<div class="border-b py-2 mb-4">
  <div  v-for="(tests, category) in test_methods_by_category"
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
                      (test.min && sample_count < test.min) ||
                      (test.max && sample_count > test.max)
                    "
                    v-model="test_selection[test.test_key]"
                    :color="color"
                    @change="emit_input()" />
        </div>
        <div class="form-group text-right mb-0 col-2">
          <h5>{{ to_display_price(test.price) }}</h5>
        </div>
        <div class="form-group col-1 mb-0 text-right text-muted">
          <div  v-if="test_selection[test.test_key] && sample_count"
                class="nowrap">
            <i class="fas fa-times icon-sm d-inline"></i>
            <h5 class="mx-1 d-inline">{{ sample_count }}</h5>
            <i class="fas fa-equals icon-sm d-inline"></i>
          </div>
        </div>
        <div class="form-group col-2 mb-0 text-right">
          <div v-if="test_selection[test.test_key] && sample_count">
            <h5>{{ to_display_price(test.price * sample_count) }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div  v-if="is_bacteria_test"
        class="row no-gutters py-3">
    <div class="col-2 px-2">
      <h5 class="text-dark">รายการแบคทีเรียอื่นๆ</h5>
    </div>
    <div class="col-10">
      <div class="form-row">
        <div class="col-8">
          <div  v-for="(custom_test, idx) of custom_bacteria_tests"
                :key="idx"
                class="form-group d-block mb-2 position-relative">
              <input
                :ref="`CustomBacteria${idx}`"
                class="form-control form-control-sm input-pink"
                type="text"
                v-model.lazy="custom_bacteria_tests[idx]"
                @blur="emit_input()" />
              <a  class="btn btn-sm btn-x custom-test"
                @click="delete_custom_bacteria_test(idx)">
              <i class="fas fa-times" />
            </a>
          </div>
          <div  v-if="is_validated && !all_custom_bacteria_filled"
                class="form-group d-block mb-3">
            <ErrorBox msg="จำเป็นต้องใส่ชื่อแบคทีเรียให้ครบ" />
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <button class="btn btn-pink btn-sm"
                    :disabled="custom_bacteria_tests.length >= 5"
                    @click="add_custom_bacteria_test()">
              เพิ่มรายการแบคทีเรีย
            </button>
            <h5>รอประเมินราคา (ประมาน 500฿ ต่อรายการ ต่อตัวอย่าง)</h5>
          </div>
        </div>
        <div  v-if="custom_bacteria_tests.length > 0 && sample_count > 0"
              class="col-4 d-flex align-items-end justify-content-end pt-2">
          <h4>~{{ to_display_price(custom_bacteria_test_price) }}</h4>
        </div>
      </div>
    </div>
  </div>
  <div  v-if="includes_sensitivity_test"
        class="row no-gutters pt-3 border-t">
    <div class="col-12 px-2">
      <FormAntibioticsSensitivity
        v-if="!$apollo.loading"
        :options="sensitivity_test_options"
        :color="color"
        v-model="sensitivity_tests"
        @change="emit_input()" />
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
    test_methods_by_category () {
      const processed = this.test_methods.map( test => {
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
    form_value () {
      let test_list = []
      for (const [test, active] of Object.entries(this.test_selection)) {
        if (active) test_list.push(test)
      }
      let price = this.test_methods.reduce( (price, test) => {
        if (this.test_selection[test.test_key]) {
          return price + (test.price * this.sample_count)
        } else {
          return price
        }
      }, 0)
      if (this.is_bacteria_test) {
        price += this.custom_bacteria_test_price
      }
      let val = { test_list, price }
      if (this.is_bacteria_test) {
        const custom_bacteria_tests = [...this.custom_bacteria_tests]
        const sensitivity_tests = this.sensitivity_tests
        val = {...val, custom_bacteria_tests, sensitivity_tests}
      }
      return val
    },
    is_bacteria_test () {
      return this.department === 'แบคทีเรียวิทยา'
    },
    custom_bacteria_test_price () {
      return this.custom_bacteria_tests.length * 500
    },
    includes_sensitivity_test () {
      if (!this.is_bacteria_test) return false
      const sensitivity_test_active = this.test_methods_by_category['Bacterial Identification + Sensitivity Test']
        .reduce( (includes, test) => includes || !!this.test_selection[test.test_key], false)
      return sensitivity_test_active || this.custom_bacteria_tests.length > 0
    },
    all_custom_bacteria_filled () {
      if (!this.is_bacteria_test) return true
      return this.custom_bacteria_tests.reduce( (all_filled, bacteria) => all_filled && bacteria, true)
    }
  },
  props: {
    sample_count: {
      required: true
    },
    department: {
      required: true,
      type: String
    },
    test_methods: {
      type: Array,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    is_validated: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      test_selection: {},
      sensitivity_tests: null,
      custom_bacteria_tests: []
    }
  },
  methods: {
    emit_input () {
      this.$emit('input', this.form_value)
    },
    add_custom_bacteria_test () {
      this.custom_bacteria_tests.push('')
      this.emit_input()
      this.$nextTick( () => {
        this.$refs[`CustomBacteria${this.custom_bacteria_tests.length-1}`][0].focus()
      })
    },
    delete_custom_bacteria_test (idx) {
      this.custom_bacteria_tests.splice(idx, 1)
      this.emit_input()
    },
  },
  watch: {
    sample_count (new_sample_count) {
      this.test_methods.forEach( test => {
        const violates_constraint = (
          (!!test.max && (new_sample_count > test.max)) ||
          (!!test.min && (new_sample_count < test.min))
        )
        if (this.test_selection[test.test_key] && violates_constraint) {
          this.test_selection[test.test_key] = false
        }
      })
      this.emit_input()
    },
  },
  mounted () {
    const new_tests = {}
    for (const test of this.test_methods) {
      new_tests[test.test_key] = false
    }
    for (const active_test of this.$attrs.value.test_list) {
      new_tests[active_test] = true
    }
    this.test_selection = {...new_tests}
    if (this.$attrs.value.custom_bacteria_tests) {
      this.custom_bacteria_tests = this.$attrs.value.custom_bacteria_tests
    }
    this.sensitivity_tests = this.$attrs.value.sensitivity_tests
  },
  apollo: {
    sensitivity_test_options: {
      query: BACTERIA_ANTIBIOTICS,
      update: data => data.test_method_bacteria_antibiotic_get.result,
      skip () { return !this.is_bacteria_test }
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