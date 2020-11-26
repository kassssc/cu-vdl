<template>
<div class="row border-t pt-3">
  <div class="col-2">
    <h5 class="mb-2">เลือกยาต้านจุลชีพเพื่อการทดสอบความไว</h5>
    <h5 class="text-muted">(เลือกได้ถึง 8 รายการ)</h5>
  </div>
  <div class="col-10">
    <div class="items-container">
      <div v-for="group of options"
          :key="group.group_name"
          class="category-container mr-3 d-flex flex-column">
        <h5 class="w-100 mb-2 border-b">{{ group.group_name }}</h5>
        <div class="form-group">
          <checkbox
            v-for="antibiotic of group.antibiotics"
            :key="antibiotic"
            :label="antibiotic"
            :color="color"
            :disabled="max_selected && !antibiotic_selection[antibiotic]"
            v-model="antibiotic_selection[antibiotic]"
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
      antibiotic_selection: undefined,
      max_selection: 8
    }
  },
  beforeMount () {
    const selections = {}
    for (const group of this.options) {
      group.antibiotics.forEach( antibiotic => selections[antibiotic] = false )
    }
    if (this.$attrs.value) {
      for (const chosen_antibiotic of this.$attrs.value.split(',')) {
        selections[chosen_antibiotic] = true
      }
    }
    this.antibiotic_selection = { ...selections }
  },
  computed: {
    parsed_value () {
      return Object.keys(this.antibiotic_selection).filter(antibiotic =>
        this.antibiotic_selection[antibiotic]
      ).join(',')
    },
    num_selected () {
      return Object.values(this.antibiotic_selection).reduce( (count, selected) => count + (selected? 1:0), 0)
    },
    max_selected () {
      return this.num_selected >= this.max_selection
    }
  },
  methods: {
    onCheckboxChange () {
      this.$emit('input', this.parsed_value)
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