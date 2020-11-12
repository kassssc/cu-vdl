<template>
  <FormInput
    label="หมายเลขโทรศัพท์"
    type="text"
    maxlength="10"
    ref="PhoneInput"
    :required="required"
    @focus="on_phone_focus($event)"
    @input="clean_input()"
    @blur="format_phone()"
    v-model="phone" />
</template>

<script>
export default {
  name: 'form-phone-input',
  props: {
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    invalid () {
      return !this.phone.match(/^(\d{3})-(\d{3})-(\d{4})$/) && !this.phone.match(/^(\d{2})-(\d{3})-(\d{4})$/)
    }
  },
  data () {
    return {
      phone: ''
    }
  },
  methods: {
    emit_input () {
      this.$emit('input', this.phone)
    },
    clean_input () {
      if (this.phone) {
        this.phone = this.phone.replace(/\D/g, '')
        this.emit_input()
      }
    },
    format_phone () {
      if (!this.phone) return
      if (this.phone.length < 9 || this.phone.length > 10) {
        return
      }
      let match
      if (this.phone.length === 10) {
        match = this.phone.match(/^(\d{3})(\d{3})(\d{4})$/)
      } else if (this.phone.length === 9) {
        match = this.phone.match(/^(\d{2})(\d{3})(\d{4})$/)
      }
      this.phone = match[1] + '-' + match[2] + '-' + match[3]
      this.emit_input()
    },
    on_phone_focus (ev) {
      this.clean_input()
      ev.target.select()
    }
  },
  mounted () {
    this.phone = this.$attrs.value
  }
}
</script>