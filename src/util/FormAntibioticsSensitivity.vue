<template>
  <div class="items-container">
    <div v-for="(category, idxCategory) in options"
         :key="idxCategory"
         class="category-container d-flex flex-column">
      <h5 class="w-100 mb-2 border-bottom-lighter">{{ category.name }}</h5>
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
</template>

<style lang="scss" scoped>
.items-container {
  display: flex;
  flex-flow: column wrap;
  max-height: 500px;
}
.category-container {
  width: 150px;
}
</style>

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
    this.options.forEach( (category) => {
      this.values.push(new Array(category.items.length).fill(false))
    })
  },
  computed: {
    parsedValue () {
      let list = []
      this.values.forEach( (category, idxCategory) => {
        category.forEach( (item, idxItem) => {
          if (item) {
            list.push(this.options[idxCategory].items[idxItem])
          }
        })
      })
      return list.join(',')
    },
    numSelected () {
      return this.values.flat().reduce( (acc, curr) => {
        return acc + (curr? 1:0)
      }, 0)
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