<template>
  <div class="form-row m-0">
    <template v-if="contactType === 'บุคคล'">
      <FormSelect
        v-if="!english"
        class="col-3"
        form-label="คำนำหน้า"
        :searchable="false"
        required
        :options="nameTitles"
        @change="emitInput()"
        v-model="title" />
      <FormInput
        :class="english? 'col-6' : 'col-4'"
        :label="english? 'First Name (English)' : 'ชื่อจริง'"
        type="text"
        required
        @change="emitInput()"
        v-model="firstName" />
      <FormInput
        :class="english? 'col-6' : 'col-5'"
        :label="english? 'Last Name (English)' : 'นามสกุล'"
        type="text"
        required
        @change="emitInput()"
        v-model="lastName" />
    </template>
    <template v-else-if="contactType === 'องค์กร'">
      <FormSelect
        v-if="!english"
        class="col-3"
        form-label="ประเภทองค์กร"
        :searchable="false"
        required
        :options="orgTitles"
        @change="emitInput()"
        v-model="title" />
      <FormInput
        class="col"
        :label="english? 'Organization Name (English)' : 'ชื่อองค์กร'"
        type="text"
        required
        @change="emitInput()"
        v-model="orgName" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'form-contact-name-input',
  props: {
    english: {
      type: Boolean,
      default: false
    },
    contactType: {
      type: String,
      required: true,
      validator: function (value) {
        return ['บุคคล', 'องค์กร'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    name () {
      if (this.title) {
        if (this.contactType === 'บุคคล') {
          return `${this.title}${this.firstName} ${this.lastName}`
        } else if (this.contactType === 'องค์กร') {
          return `${this.title} ${this.orgName}`
        }
      }
      if (this.contactType === 'บุคคล') {
        return `${this.firstName} ${this.lastName}`
      } else if (this.contactType === 'องค์กร') {
        return this.orgName
      }
      return ''
    }
  },
  data () {
    return {
      title: '',
      firstName: '',
      lastName: '',
      orgName: '',
      nameTitles: [
        'นาย',
        'นาง',
        'น.ส.',
        'น.สพ.',
        'สพ.ญ.',
        'อ.',
        'ดร.',
        'ผศ.',
        'รศ.',
        'ศ.'
      ],
      orgTitles: [
        'ฟาร์ม',
        'บริษัท',
        'บจก.',
        'บจ.',
        'บมจ.',
        'รพ.',
        'รพ.ส.',
      ]
    }
  },
  methods: {
    emitInput () {
      this.$emit('input', this.name)
    }
  }
}
</script>