<template>
<div class="p-4">
  <div class="row">
    <div class="col-12">
      <h3 class="mb-4">
        <i class="fas fa-user-plus icon-lg mr-1"></i>
        ส่งคำขอเป็นตัวแทนองค์กร
      </h3>
    </div>
  </div>

  <div class="font-chatthai">

    <div class="border-bottom-lighter row w-100 py-4">
      <div class="col-xl-3 col-12">
        <h4>
          ข้อมูลองค์กร
        </h4>
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <FormInput
            class="col-7"
            label="ชื่อองค์กร"
            type="text" />
          <FormInput
            class="col-7"
            label="ชื่อ-นามสกุล ผู้ติดต่อ"
            type="text" />
          <FormInput
            class="col-7"
            label="เบอร์โทรศัพท์ / อีเมล ผู้ติดต่อ"
            type="text" />
        </div>
      </div>
    </div>

    <div class="border-bottom-lighter row w-100 py-4">
      <div class="col-xl-3 col-12">
        <h4>หมายเหตุอื่นๆ</h4>
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <FormTextarea
            class="col-7"
            type="text"
            rows="4" />
        </div>
      </div>
    </div>

    <div class="row w-100 py-4">
      <div class="col-xl-3 col-12">
      </div>
      <div class="col-xl-9 col-12">
        <div class="form-row">
          <div class="form-group col-7">
            <button class="btn btn-primary btn-block">
              <i class="fas fa-paper-plane btn-inner-icon"></i>
              ส่งคำขอเป็นตัวแทนองค์กร
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
  name: 'dashboard-freelance-addorg',
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