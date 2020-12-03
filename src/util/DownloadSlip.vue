<template>
<div class="form-group">
  <button class="btn btn-block font-cu"
          :class="btnClass"
          @click="download_slip()">
    <i  v-if="iconClass"
        class="mr-2"
        :class="iconClass" />
    {{ label }}
  </button>
</div>
</template>

<script>
import { get_jwt } from '@/vue-apollo'

export default {
  name: 'download-slip',
  props: {
    label: {
      type: String,
      default: 'Download สลิปส่งตัวอย่าง'
    },
    submissionKey: {
      type: String,
      required: true
    },
    btnClass: {
      type: String,
      default: 'btn-secondary'
    },
    iconClass: {
      type: String,
      default: 'fas fa-print btn-inner-icon'
    }
  },
  methods: {
    async download_slip () {
      try {
        const res = await fetch(
          'http://127.0.0.1:16888/api/download',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${get_jwt()}`
            },
            body: JSON.stringify({
              file_type: 'slip',
              args: { submission_key: this.submissionKey }
            })
          }
        )
        const blob = await res.blob()
        let a = document.createElement('a') 
        let url = URL.createObjectURL(blob)
        a.download = `submission_slip_${this.submissionKey}.pdf`
        a.href = url
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        //window.open(url)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>