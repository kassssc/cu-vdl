<template>
<div class="d-flex align-items-start">
  <div class="w-50 border-right-lighter p-4">
    <h3 class="mb-4">
      <i class="fas fa-users icon-lg mr-1"></i>
      รายชื่อ องค์กรที่เป็นตัวแทน
    </h3>
    <div class="search-input mb-3">
      <i class="fas fa-search text-muted" />
      <input  type="text"
              class="form-control"
              placeholder="ค้นหา...">
    </div>
    <div class="subcontainer pr-2">
      <div class="scroll-container orgs">
        <div  v-for="(i, idx) of [...list]"
              :key="idx"
              class="font-chatthai">
          <button class="btn btn-block btn-list"
                  :class="{'active': selectedSubmitter === idx}"
                  @click="selectedSubmitter = idx">
            {{ org.name }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="row w-50 p-4 mt-5">
    <div class="col-12">
      <h3 class="mb-4 mt-2">
        <i class="fas fa-sitemap icon-lg mr-1"></i>
        ข้อมูล องค์กร
      </h3>
    </div>

    <div class="col-12 font-chatthai">
      <div class="form-row">
        <div class="form-group col-12">
          <label>
            ชื่อองค์กร
          </label>
          <input  type="text"
                  class="form-control"
                  :value="org.name"
                  disabled >
        </div>
        <div class="form-group col-12 mb-1 mt-4">
          <h4>ที่อยู่</h4>
        </div>
        <div class="form-group col-12 mb-2">
          <label>
            เลขที่ ซอย ถนน
          </label>
          <input  type="text"
                  class="form-control"
                  :value="org.addr.line1"
                  disabled >
        </div>
        <div class="form-group col-12 mb-2">
          <label>
            แขวง เขต / ตำบล อำเภอ
          </label>
          <input  type="text"
                  class="form-control"
                  :value="org.addr.line2"
                  disabled >
        </div>
        <div class="form-group col-4">
          <label>
            เมือง
          </label>
          <input  type="text"
                  class="form-control"
                  :value="org.addr.city"
                  disabled >
        </div>
        <div class="form-group col-4">
          <label>
            จังหวัด
          </label>
          <input  type="text"
                  class="form-control"
                  :value="org.addr.province"
                  disabled >
        </div>
        <div class="form-group col-4">
          <label>
            รหัสไปรษณีย์
          </label>
          <input  type="number"
                  class="form-control"
                  :value="org.addr.zip"
                  disabled >
        </div>

        <div class="form-group col-12 mb-1 mt-4">
          <h4>ผู้ติดต่อ</h4>
        </div>
        <div class="form-group col-12">
          <label>
            ชื่อ-นามสกุล
          </label>
          <input  type="text"
                  class="form-control"
                  :value="`${org.mainContactPerson.firstName} ${org.mainContactPerson.lastName}`"
                  disabled >
        </div>
        <div class="form-group col-12">
          <label>
            เบอร์โทรศัพท์ / อีเมล
          </label>
          <input  type="text"
                  class="form-control"
                  :value="org.mainContactPerson.phone"
                  disabled >
        </div>
      </div>

      <div class="form-row mt-4">
        <div class="form-group col-12">
          <button class="btn btn-primary btn-lg btn-block ">
            <i class="fas fa-user-slash btn-inner-icon"></i>
            ถอนตัวจากการเป็นตัวแทนองค์กร
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.scroll-container.orgs {
  height: calc(100vh - #{$titlebar-height} - #{$footer-height} - 205px);
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard-freelance-orgs',
  computed: {
    ...mapGetters([
      'org'
    ])
  },
  data () {
    return {
      selectedSubmitter: 0,
      filter: 0,
      filterOptions: [
        { id: 0, name: 'ทั้งหมด'},
        { id: 1, name: 'พนักงานประจำ'},
        { id: 2, name: 'Freelance'}
      ],
      user: {
        id: 1,
        accountType: 1,
        org: 1,
        firstName: 'สมควร',
        lastName: 'สมสกุล',
        email: 'mr.somkuan@gmail.com',
        phone: '081-234-5678',
        nationalId: null
      },
      list: [0,1,2,3,4,5,6,7,8,9,10]
    }
  }
}
</script>