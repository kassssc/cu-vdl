 <template>
<div class="form-row py-1">
  <div class="form-group mb-0 col-6">
    <checkbox :label="test.name"
              v-model="internalValue.selected"
              @change="onCheckboxChange" />
  </div>
  <div class="form-group text-right mb-0 col-1">
    <h5>
      {{ `${test.price}฿` }}
    </h5>
  </div>
  <div class="form-group mb-0 col-2">
    <input type="number" min="0" ref="sampleCountInput"
           class="form-control form-control-sm text-right w-75"
           :class="{'invalid': isInvalid }"
           v-model.number="internalValue.sampleCount"
           @focus="$event.target.select()"
           @blur="onInputBlur()">
  </div>
  <div class="form-group col-2 mb-0 text-right">
    <h5>
      {{ (totalPrice) > 0? `${totalPrice.toLocaleString()}฿` : '' }}
    </h5>
  </div>
</div>
</template>

<script>
export default {
  name: 'form-test-input',
  props: [
    'test',
  ],
  computed: {
    totalPrice () {
      return this.test.price * this.internalValue.sampleCount
    },
    isInvalid () {
      return this.internalValue.selected && !this.internalValue.sampleCount
    }
  },
  data () {
    return {
      internalValue: {
        id: this.test.id,
        selected: false,
        sampleCount: null
      }
    }
  },
  methods: {
    onCheckboxChange () {
      if (!this.internalValue.selected) {
        this.internalValue.sampleCount = null
      } else {
        this.$refs.sampleCountInput.focus()
      }
      this.$emit('input', this.internalValue)
      this.$emit('change')
    },
    onInputBlur () {
      // Floor to not allow decimals
      let newCount = Math.floor(this.internalValue.sampleCount)
      // Set to null if left empty or negative
      if (!newCount || newCount <= 0) {
        newCount = null
      // Set to 100 if larger than 100
      } else if (newCount > 100) {
        newCount = 100
      }
      this.internalValue.sampleCount = newCount
      if (!this.internalValue.selected && this.internalValue.sampleCount) {
        this.internalValue.selected = true
      }
      this.$emit('input', this.internalValue)
      this.$emit('change')
    }
  }
}
</script>