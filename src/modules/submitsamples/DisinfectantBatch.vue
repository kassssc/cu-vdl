<template>
<div class="batch w-100 position-relative border-b py-5">
  <a  v-if="multiple_batches"
      class="btn btn-x batch-section"
      @click="$emit('delete-batch')">
    <i class="fas fa-times" />
  </a>
  <div class="row w-100">
    <div class="col-xl-2 col-12">
      <h3 class="mb-2">การทดสอบ</h3>
      <h5 v-if="multiple_batches"
          class="text-medium">
        {{ batch.disinfectant_name }}
      </h5>
    </div>

    <div class="col-xl-10 col-12">
      <h4>ชื่อนํ้ายาฆ่าเชื้อ <span v-if="english_report">(English)</span></h4>
      <transition name="fade-no-delay">
        <div class="form-row mb-2">
          <FormInput
            class="form-group col-6"
            required
            :invalid="is_validated && !batch.disinfectant_name"
            error-msg="จำเป็นต้องใส่ชื่อนํ้ายาฆ่าเชื้อ"
            v-model="batch.disinfectant_name" />
        </div>
      </transition>

      <div class="form-row mb-2">
        <FormInlineSelect
          class="col-9"
          label="ทดสอบประสิทธิภาพยาฆ่าเชื้อต่อ"
          label-class="label-lg"
          :btn-class-list="['yellow', 'pink', 'red']"
          :options="disinfectant_tests"
          @change="on_test_type_change()"
          v-model="batch.test_type" />
      </div>

      <h3>รายการทดสอบ</h3>
      <div class="form-row border-b px-3 py-2">
        <div class="col-4">
          <h5 class="text-medium">
            ชื่อ{{ is_virus? 'ไวรัส' : 'แบคทีเรีย'  }}
          </h5>
        </div>
        <div class="col-6">
          <div class="form-row">
            <div class="col-4">
              <h5 class="text-medium">ความเข้มข้น</h5>
            </div>
            <div class="col-8">
              <div class="form-row">
                <div v-if="is_CP" class="col-6">
                  <h5 class="text-medium">ระยะหลังการเจือจาง</h5>
                </div>
                <div class="col-6">
                  <h5 class="text-medium">ระยะสัมผัสเชื้อ</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div  v-for="(test_detail, test_name) in batch.tests"
            :key="test_name"
            class="form-row test-row border-b position-relative px-3 py-2">
        <a class="btn btn-sm btn-x disinfectant-test"
            @click="delete_test(test_name)">
          <i class="fas fa-times" />
        </a>

        <div class="col-4 pr-5">
          <h4 class="mb-1">{{ test_detail.display_name }}</h4>
          <h5 v-if="is_virus" class="text-muted">[ {{ test_detail.cell_name }} ]</h5>
        </div>

        <div class="col-6">
          <div  v-for="dilution of test_detail.dilutions"
                :key="dilution"
                class="form-row test-row">
            <div class="col-4 pl-3 position-relative">
              <h4 class="d-inline">{{ dilution }}</h4>
            </div>

            <div  v-if="!is_CP" class="col-4">
              <div  v-for="time of test_detail.contact_times"
                    :key="time"
                    class="test-row pl-2 position-relative">
                <h5 class="d-inline">{{ time }}</h5>
                <h5 class="d-inline ml-1">นาที</h5>
              </div>
            </div>

            <div v-else class="col-8">
              <div  v-for="dt of test_detail.dilution_times"
                    :key="dt"
                    class="form-row test-row pl-2">
                <div class="col-6">
                    <h5 class="d-inline">{{ dt }}</h5>
                    <h5 class="d-inline ml-1">วัน</h5>
                </div>
                <div class="col-6">
                  <div  v-for="time of test_detail.contact_times"
                        :key="time"
                        class="form-row test-row pl-1">
                    <div class="col-12">
                      <h5 class="d-inline">{{ time }}</h5>
                      <h5 class="d-inline ml-1">นาที</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="col-2 d-flex flex-column align-items-end justify-content-end pr-4">
          <h5>3,000฿</h5>
          <h6 class="text-muted squeeze-up">ต่อรายการ</h6>
          <h5 class="mt-1">
            <i class="fas fa-times icon-sm"></i>
            {{ test_detail.test_count }}
          </h5>
          <h6 class="text-muted squeeze-up">รายการ</h6>
          <h4 class="mt-1 text-primary">
            <i class="fas fa-equals mr-1 icon-sm"></i>
            {{ to_display_price(test_detail.price) }}
          </h4>
        </div>
      </div>

      <div  v-show="Object.keys(batch.tests).length <= 0"
            class="border-b">
        <h4 class="text-muted my-3 ml-3">
          ยังไม่มีรายการทดสอบ
        </h4>
      </div>

      <div class="form-row py-3 border-b">
        <div class="col-9 d-flex justify-content-end align-items-end">
          <template v-if="Object.keys(batch.tests).length > 0">
            <div  v-if="is_virus"
                  class="text-right position-relative cost-container">
              <h4 class="text-primary">
                <i class="fas fa-plus icon-sm"></i>
                {{ to_display_price(batch.toxicity_test_cost) }}
              </h4>
              <h5 class="text-medium">ค่า Toxicity Test</h5>
              <div class="hint-box">
                <h4 class="text-primary mb-1">การคำนวณค่า Toxicity Test</h4>
                <h5>คำนวณจากจำนวนความเข้มข้นของแต่ละประเภท cell ไวรัส ซึ่งระบุไว้ใน [ ] หลังชื่อไวรัส หากไวรัสหลายตัวภายใต้ cell ประเภทเดียวกันใช้ความเข้มข้นซํ้ากัน จะคิดราคาแค่รอบเดียวเท่านั้น</h5>
                <div  v-for="(dilutions, cell) in batch.unique_cells"
                      :key="cell">
                  <div class="d-flex">
                    <h5 class="text-primary">[ {{ cell }} ]</h5>
                    <h5 v-for="dilution of dilutions"
                        :key="dilution"
                        class="ml-2 text-muted">
                      {{ dilution }}
                    </h5>
                  </div>
                  <h5 class="ml-2">
                    3,000฿
                    <i class="fas fa-times icon-sm" />
                    {{ dilutions.length }} ความเข้มข้น
                    <i class="fas fa-equals icon-sm" />
                    <span class="text-primary ml-1">{{ to_display_price(3000 * dilutions.length) }}</span>
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
            {{ has_tests? to_display_price(batch.price) : 'N/A' }}
          </h2>
          <h5 class="text-medium">ค่าบริการ</h5>
        </div>
      </div>

      <div  v-if="is_validated && !has_tests"
            class="form-row py-2">
        <div class="form-group col-12 mb-0">
          <ErrorBox msg="จำเป็นต้องเพิ่มการทดสอบอย่างน้อย 1 รายการ" />
        </div>
      </div>

      <FormDisinfectantTestInput
        v-if="batch.test_type"
        class="mt-5"
        :test_type="batch.test_type"
        :test_count="Object.keys(batch.tests).length"
        @add="add_test($event)" />

    </div>
  </div>
</div>
</template>

<script>
import union from 'lodash/union'

export default {
  name: 'disinfectant-batch',
  components: {
    FormDisinfectantTestInput: () => import(/* webpackChunkName: "group-submitsamples" */
      './FormDisinfectantTestInput'
    ),
  },
  props: {
    batch: {
      type: Object,
      required: true
    },
    multiple_batches: {
      type: Boolean,
      required: true
    },
    idx: {
      type: Number,
      required: true
    },
    english_report: {
      type: Boolean,
      required: true
    },
    edit_mode: {
      type: Boolean,
      required: true
    },
    is_validated: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    is_virus () {
      return this.batch.test_type === 'ไวรัส'
    },
    is_CP () {
      return this.batch.test_type === 'แบคทีเรีย (CP Protocol)'
    },
    unique_cells () {
      if (!this.is_virus) return { }
      const cells = {}
      Object.values(this.batch.tests).forEach( t => {
        cells[t.cell_name] = (t.cell_name in cells)?
          union(cells[t.cell_name], t.dilutions) : [...t.dilutions]
      })
      return cells      
    },
    toxicity_test_cost () {
      if (!this.is_virus) return 0
      return Object.values(this.unique_cells)
        .reduce( (tox_cost, cells) => tox_cost + 3000 * cells.length, 0)
    },
    price () {
      let price = Object.values(this.batch.tests)
        .reduce( (price, batch) => price + batch.price, 0)
      if (this.is_virus) {
        price += this.toxicity_test_cost
      }
      return 3000 + price
    },
    test_count () {
      return Object.values(this.batch.tests)
        .reduce( (count, batch) => count += batch.test_count, 0)
    },
    has_tests () {
      return Object.values(this.batch.tests).length > 0
    },
  },
  data () {
    return {
      disinfectant_tests: [
        'ไวรัส',
        'แบคทีเรีย',
        'แบคทีเรีย (CP Protocol)',
      ]
    }
  },
  watch: {
    price (val) {
      this.batch.price = val
    },
    test_count (val) {
      this.batch.test_count = val
    },
    unique_cells (val) {
      this.batch.unique_cells = val
    },
    toxicity_test_cost (val) {
      this.batch.toxicity_test_cost = val
    }
  },
  methods: {
    on_test_type_change () {
      this.batch.price = 0
      this.batch.tests = {}
      if (this.is_virus) {
        this.batch.toxicity_test_cost = 0
        this.batch.unique_cells = {}        
      }
    },
    add_test (payload) {
      this.batch.tests = {...this.batch.tests, ...payload}
    },
    delete_test (test_key) {
      this.$delete(this.batch.tests, test_key)
    },
  },
  beforeMount () {
    this.on_test_type_change()
  }
}
</script>

<style lang="scss" scoped>
.cost-container {
  cursor: pointer;
  &:hover .hint-box {
    transform: scale(1);
  }
  .hint-box {
    width: 20rem;
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