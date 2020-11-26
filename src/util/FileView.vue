<template>
<div class="form-group">
  <label  v-if="label"
          :class="labelSize">
    {{ label }}
  </label>
  <div class="d-flex hover-appear-wrapper font-cu">
    <h6 class="hover-appear view-file-label text-medium">ดูไฟล์</h6>
    <button class="btn btn-block text-left btn-file"
            :class="btnClass"
            @click="view_file()">
      <i  v-if="iconClass"
          class="mr-2"
          :class="iconClass" />
      {{ file.file_name }}
    </button>
  </div>
</div>
</template>

<script>
import { GET_FILE_URL } from '@/graphql/file';
import { get_jwt } from '@/vue-apollo';

export default {
  name: 'file-view',
  props: {
    label: {
      type: String,
      default: ''
    },
    labelSize: {
      type: String,
      default: ''
    },
    file: {
      type: Object,
      required: true
    },
    btnClass: {
      type: String,
      default: 'btn-secondary'
    },
    iconClass: {
      type: String,
      default: 'fas fa-file-pdf'
    }
  },
  methods: {
    async view_file () {
      try {
        const res = await this.$apollo.query({
          query: GET_FILE_URL,
          variables: {
            jwt: get_jwt(),
            S3_key: this.file.S3_key
          }
        })
        const url = res.data.get_file_url.result.signed_url
        window.open(url, '_blank')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.view-file-label {
  position: absolute;
  top: 0;
  bottom: 0;
  right: .5em;
  margin: auto;
  height: 50%;
  pointer-events: none;
}
/* .btn.btn-file {
  &:hover {
    background: $primary;
    color: $light;
  }
} */
</style>