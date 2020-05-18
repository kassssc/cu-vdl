<template>
<div class="p-4 mb-5">
  <div class="row mb-3">
    <div class="col-12">
      <h2>
        <i class="fas fa-sitemap icon-lg mr-1"></i>
        รายการ องค์กรที่เป็นตัวแทน
      </h2>
    </div>
  </div>
  <div id="orgs-table-container" class="scroll-container">
    <table>
      <thead>
        <tr>
          <th> 
            <h4>ชื่อองค์กร</h4>
            <div class="shadow-th"></div>
          </th>
          <th> 
            <h4>ที่อยู่</h4>
            <div class="shadow-th"></div>
          </th>
          <th><div class="shadow-th"></div></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(_, idx) of [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]"
            :key="idx">
          <td class="vertical-align-top">
            <h4>{{ org.name }}</h4>
          </td>
          <td class="pre-line squeeze-line">{{ org.addr }}</td>
          <td class="text-right">
            <button class="btn btn-sm btn-danger"
                    @click="showRemoveOrgModal(idx)">
              <i class="fas fa-user-slash btn-inner-icon"></i>
              ถอนตัวจากการเป็นตัวแทนองค์กร
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Modal  modal-id="removeOrgModal"
          x-close>
    <template #modal-header>
      <h3 class="text-danger">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ท่านกำลังจะถอนตัวจากการเป็นตัวแทนองค์กร
      </h3>
    </template>
    <template #modal-body>
      <h4 class="my-2">ท่านจะสูญเสียสิทธิในการส่งตัวอย่างในนามของ องค์กร:</h4>
      <h3 class="my-2 text-center text-danger">{{ org.name }}</h3>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button" class="btn btn-secondary w-50" data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-danger ml-2 w-100"
                @click="removeOrg()">
          ยืนยันว่าจะถอนตัวจากการเป็นตัวแทน
        </button>
      </div>
    </template>
  </Modal>

</div>
</template>

<style lang="scss" scoped>
#orgs-table-container {
  height: calc(100vh - #{$titlebar-height} - #{$footer-height} - 100px);
}
</style>

<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'

export default {
  name: 'dashboard-freelance-orgs',
  computed: {
    ...mapGetters([
      'org'
    ])
  },
  data () {
    return {
      orgToRemove: null
    }
  },
  methods: {
    showRemoveOrgModal (orgId) {
      this.orgToRemove = orgId
      $('#removeOrgModal').modal('show')
    },
    removeOrg () {
      this.orgToRemove = null
      $('#removeOrgModal').modal('hide')
    }
  }
}
</script>