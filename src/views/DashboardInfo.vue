<template>
<div class="p-4">
  <div class="row">
    <div class="col-12">
      <h3 class="mb-4">ข้อมูล Account</h3>
    </div>
  </div>

  <div class="font-chatthai">
    <div class="row w-100 py-3">
      <div class="col-xl-2 col-12">
        <h4>
          ข้อมูลผู้ใช้
        </h4>
      </div>
      <div class="col-xl-10 col-12">
        <div class="form-row">
          <div class="form-group col-5 mb-4">
            <label>
              ประเภท Account
            </label>
            <input  type="text"
                    class="form-control form-control-lg text-primary"
                    value="พนักงานประจำ"
                    disabled >
          </div>
          <div class="col-8"></div>
          <div class="form-group col-5">
            <label>
              ชื่อจริง
            </label>
            <input  type="text"
                    class="form-control"
                    :value="user.firstName"
                    disabled >
          </div>
          <div class="form-group col-5">
            <label>
              นามสกุล
            </label>
            <input  type="text"
                    class="form-control"
                    :value="user.lastName"
                    disabled >
          </div>
          <div class="w-100"></div>
          <div class="form-group col-5">
            <label>
              สำเนาบัตรประชาชน
            </label>
            <button class="btn btn-secondary btn-block text-left">
              <i class="fas fa-address-card btn-inner-icon"></i>
              somkuan_id.pdf
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <div class="border-bottom-lighter row w-100 py-3 mb-3">
      <div class="col-xl-2 col-12">
        <h4>
          ข้อมูลการติดต่อ
        </h4>
      </div>
      <div class="col-xl-10 col-12">
        <div class="form-row">
          <div class="form-group col-5">
            <label>
              อีเมล
            </label>
            <input  type="text"
                    class="form-control"
                    :value="user.email"
                    disabled >
          </div>
          <div class="form-group col-5">
            <label>
              เบอร์โทรศัพท์
            </label>
            <input  type="text"
                    class="form-control"
                    :value="user.phone"
                    disabled >
          </div>
        </div>
      </div>
    </div>
  
    <div class="row w-100 py-3 mb-3">
      <div class="col-xl-2 col-12">
        <h4>
          ข้อมูลองค์กร
        </h4>
      </div>
      <div class="col-xl-10 col-12">
        <div class="form-row">
          <div class="form-group col-10">
            <label>
              ชื่อองค์กร
            </label>
            <input  type="text"
                    class="form-control"
                    :value="org.name"
                    disabled >
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-10">
            <label>
              ที่อยู่
            </label>
            <input  type="text"
                    class="form-control"
                    :value="org.addr.line1"
                    disabled >
          </div>
          <div class="form-group col-10">
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
          <div class="form-group col-2">
            <label>
              รหัสไปรษณีย์
            </label>
            <input  type="text"
                    class="form-control"
                    :value="org.addr.zip"
                    disabled >
          </div>
          <div class="col-2"></div>
          <div class="form-group col-5">
            <label>
              ภ.พ.44
            </label>
            <button class="btn btn-secondary btn-block text-left">
              <i class="fas fa-address-card btn-inner-icon"></i>
              ภพ44_somkuan_farm.pdf
            </button>
          </div>
          <div class="form-group col-5">
            <label>
              ใบจดทะเบียนบริษัท
            </label>
            <button class="btn btn-secondary btn-block text-left">
              <i class="fas fa-address-card btn-inner-icon"></i>
              registration_somkuan_farm.pdf
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <div class="border-bottom-lighter row w-100 py-3 mb-3">
      <div class="col-xl-2 col-12">
        <h4>
          ผู้ติดต่อหลัก
        </h4>
      </div>
      <div class="col-xl-10 col-12">
        <div class="form-row">
          <div class="form-group col-5">
            <label>
              ชื่อ นามสกุล
            </label>
            <input  type="text"
                    class="form-control"
                    :value="`${org.mainContactPerson.firstName} ${org.mainContactPerson.lastName}`"
                    disabled >
          </div>
          <div class="w-100"></div>
          <div class="form-group col-5">
            <label>
              อีเมล
            </label>
            <input  type="text"
                    class="form-control"
                    :value="org.mainContactPerson.email"
                    disabled >
          </div>
          <div class="form-group col-5">
            <label>
              เบอร์โทรศัพท์
            </label>
            <input  type="text"
                    class="form-control"
                    :value="org.mainContactPerson.phone"
                    disabled >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="big-ass"></div>
</div>
</template>

<style lang="scss" scoped>
.big-ass {
  height: 100vh;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard-info',
  computed: {
    ...mapGetters([
      'user',
      'org'
    ])
  },
  data () {
    return {
    }
  }
}
</script>