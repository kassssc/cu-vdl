<template>
<div class="p-4">
  <div class="row">
    <div class="col-12">
      <h3 class="mb-4">
        <i class="fas fa-user-plus icon-lg mr-1"></i>
        สร้าง Account ตัวแทนส่งตัวอย่าง
      </h3>
    </div>
  </div>

  <div class="font-chatthai">

    <div class="border-bottom-lighter row w-100 py-4">
      <div class="col-xl-3 col-12">
        <h4>
          ประเภท Account
        </h4>
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <div class="form-group col-7">
            <form-inline-select 
              :options="userTypeOptions" 
              v-model="form.userType" />
          </div>
        </div>
      </div>
    </div>

    <div class="border-bottom-lighter row w-100 py-4">
      <div class="col-xl-3 col-12">
        <h4>
          ข้อมูลตัวแทนส่งตัวอย่าง
        </h4>
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <div class="form-group col-7">
            <label>
              ชื่อจริง
            </label>
            <input  type="text"
                    class="form-control">
          </div>
          <div class="w-100"></div>
          <div class="form-group col-7">
            <label>
              นามสกุล
            </label>
            <input  type="text"
                    class="form-control">
          </div>
          <div class="w-100"></div>
          <div class="form-group col-7">
            <label>
              อีเมล
            </label>
            <input  type="text"
                    class="form-control">
          </div>
          <div class="w-100"></div>
          <div class="form-group col-7">
            <label>
              เบอร์โทรศัพท์
            </label>
            <input  type="text"
                    class="form-control">
          </div>
          <div class="w-100"></div>
          <div class="form-group col-7">
            <label>
              สำเนาบัตรประชาชน
            </label>
            <form-file-upload />
          </div>
        </div>
      </div>
    </div>

    <div class="border-bottom-lighter row w-100 py-4">
      <div class="col-xl-3 col-12">
        <h4>
          หมายเหตุอื่นๆ
        </h4>
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <div class="form-group col-7">
            <textarea type="text" rows="4"
                      class="form-control" />
          </div>
        </div>
      </div>
    </div>

    <div class="row w-100 py-4">
      <div class="col-xl-3 col-12">
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <div class="form-group col-7">
            <button class="btn btn-primary btn-lg btn-block">
              <i class="fas fa-paper-plane btn-inner-icon"></i>
              ส่งแบบฟอร์มขอสร้าง Account
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<style lang="scss" scoped>
.big-ass {
  height: 100vh;
}
</style>

<script>
export default {
  name: 'dashboard-employee-addsubmitter',
  data () {
    return {
      form: {
        userType: null,
      },
      userTypeOptions: [
        { id: 1, name: 'พนักงานประจำ' },
        { id: 2, name: 'Freelance' }
      ]
    }
  }
}
</script>