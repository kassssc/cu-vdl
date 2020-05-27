<template>
<div class="form-row no-gutters pt-3 border-t">
  <div class="col-2">
    <h5 class="mb-2">เลือกยาต้านจุลชีพเพื่อการทดสอบความไว</h5>
    <h5 class="text-medium">(เลือกได้ถึง 8 รายการ)</h5>
  </div>
  <div class="col-10">
    <div class="items-container">
      <div v-for="(category, idxCategory) in options"
          :key="idxCategory"
          class="category-container mr-3 d-flex flex-column">
        <h5 class="w-100 mb-2 border-b">{{ category.name }}</h5>
        <div class="form-group">
          <checkbox v-for="(item, idxItem) in category.items"
                    :key="idxItem"
                    :label="item"
                    :disabled="maxSelected && !values[idxCategory][idxItem]"
                    v-model="values[idxCategory][idxItem]"
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
    'options'
  ],
  data () {
    return {
      values: undefined,
      maxSelection: 8
    }
  },
  beforeMount () {
    this.values = []
    this.options.forEach( (category) =>
      this.values.push(new Array(category.items.length).fill(false))
    )
  },
  computed: {
    parsedValue () {
      let list = []
      this.values.forEach( (category, idxCategory) => {
        category.forEach( (item, idxItem) => {
          if (item) list.push(this.options[idxCategory].items[idxItem])
        })
      })
      return list.join(',')
    },
    numSelected () {
      return this.values.flat().reduce( (acc, curr) => acc + (curr? 1:0), 0)
    },
    maxSelected () {
      return this.numSelected >= this.maxSelection
    }
  },
  methods: {
    onCheckboxChange () {
      this.$emit('input', this.parsedValue)
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