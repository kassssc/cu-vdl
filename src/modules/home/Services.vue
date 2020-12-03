<template>
  <div id="services">
    <!-- <h1 class="mb-4 pb-2 text-primary border-b-gradient">
      <span class="text-primary">฿</span> รายการค่าบริการ
    </h1> -->

    <h3  class="pb-3 border-b mb-4">
      <i class="fas fa-microscope mr-2"></i> รายการบริการทดสอบ หน่วยชันสูตรโรคสัตว์กลาง จุฬาฯ
    </h3>

    <div  v-for="(test_department, department, idx) in test_methods"
          :key="department"
          class="pr-md-5 mr-md-5">
      <div class="pb-5 pt-4 pr-5">
        <div class="row pb-3 pr-4">
          <div class="col-10">
            <h2>{{ `${idx+1}. งาน${department}` }}</h2>
          </div>
          <div class="col pr-5 text-right">
            <h6 class="text-muted mt-3">ราคา/ตัวอย่าง</h6>
          </div>
        </div>

        <div class="ml-5 border-t">
          <div  v-for="(tests, category) in test_department"
                :key="category"
                class="row test-row border-b pb-1">
            <div class="col-2 text-dark">
              <h6 class="text-dark py-2">{{ category }}</h6>
            </div>
            <div class="col pr-4">
              <div  v-for="test of tests"
                    :key="test.test_key"
                    class="row test-row py-2">
                <div class="col">
                  <h6>{{ test.display_name }}</h6>
                </div>
                <div v-if="test.constraint_label" class="col-2">
                  <h6 class="text-muted">{{ test.constraint_label }}</h6>
                </div>
                <div class="text-right col-3 pr-5">
                  <h6>{{ to_display_price(test.price) }}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>

    <div class="pb-5 pt-4 pr-5">
      <h2 class="pb-3 pr-4">
        5. งานทดสอบประสิทธิภาพยาฆ่าเชื้อ
      </h2>
      <h5 class="text-muted ml-5">
        ประเมินราคาได้ที่หน้าส่งตัวอย่าง
      </h5>
    </div>
  </div>
</template>

<script>
import { GENERAL_TEST_METHODS } from '@/graphql/tests'
import groupBy from 'lodash/groupBy'

export default {
  name: 'services',
  apollo: {
    test_methods: {
      query: GENERAL_TEST_METHODS,
      update: data => {
        const raw = data.test_method_general.result
        const grouped_by_department = groupBy(raw, 'department')
        const grouped = {}
        for (const [department, tests] of Object.entries(grouped_by_department)) {
          const constraints = tests.map( test => {
            let constraint_label = ''
            if (test.min && test.max) {
              constraint_label = `(${test.min}-${test.max} ต.ย.)`
            } else if (test.min) {
              constraint_label = `(≥ ${test.min} ต.ย.)`
            } else if (test.max) {
              constraint_label = `(≤ ${test.max} ต.ย.)`
            } else {
              constraint_label = null
            }
            return { ...test, constraint_label }
          })
          grouped[department] = groupBy(constraints, 'category')
        }
        return grouped
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  @include unselectable;
  min-width: 400px;
  max-width: 650px;
  height: auto;
}
</style>