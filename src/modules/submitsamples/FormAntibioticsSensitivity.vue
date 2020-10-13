<template>
<div class="form-row no-gutters">
  <div class="col-2">
    <h5 class="mb-2">เลือกยาต้านจุลชีพเพื่อการทดสอบความไว</h5>
    <h5 class="text-medium">(เลือกได้ถึง 8 รายการ)</h5>
  </div>
  <div class="col-10">
    <div class="items-container">
      <div v-for="(antibiotics, category) in options"
          :key="category"
          class="category-container mr-3 d-flex flex-column">
        <h5 class="w-100 mb-2 border-b">{{ category }}</h5>
        <div class="form-group">
          <checkbox v-for="antibiotic of antibiotics"
                    :key="antibiotic"
                    :label="antibiotic"
                    :color="color"
                    :disabled="maxSelected"
                    v-model="antibioticSelection[antibiotic]"
                    @change="onCheckboxChange()" />
        </div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'form-antibiotics-sensitivity',
  props: [
    'options',
    'color'
  ],
  data () {
    return {
      antibioticSelection: undefined,
      maxSelection: 8
    }
  },
  beforeMount () {
    const selections = {}
    for (const [category, antibiotics] of Object.entries(this.options)) {
      antibiotics.forEach( antibiotic => 
        selections[antibiotic] = false
      )
    }
    if (this.$attrs.value) {
      for (const chosenAntibiotic of this.$attrs.value.split(',')) {
        selections[chosenAntibiotic] = true
      }
    }
    this.antibioticSelection = { ...selections }
  },
  computed: {
    parsedValue () {
      return Object.keys(this.antibioticSelection).filter( antibiotic =>
        this.antibioticSelection[antibiotic]
      ).join(',')
    },
    numSelected () {
      return Object.values(this.antibioticSelection).reduce( (count, selected) => count + (selected? 1:0), 0)
    },
    maxSelected () {
      return this.numSelected >= this.maxSelection
    }
  },
  methods: {
    onCheckboxChange () {
      this.$emit('input', this.parsedValue)
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
.items-container {
  display: flex;
  flex-flow: column wrap;
  max-height: 500px;
}
.category-container {
  width: 140px;
}
</style>