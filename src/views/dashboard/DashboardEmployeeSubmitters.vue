<template>
<div class="d-flex align-items-start">
  <div class="w-50 content-height border-right-lighter p-4">
    <h3 class="mb-4">
      <i class="fas fa-users icon-lg mr-1"></i>
      รายชื่อ ตัวแทนส่งตัวอย่าง
    </h3>
    <SearchInput class="mb-3" />
    <FormInlineSelect
      class="mb-3"
      :options="filterOptions"
      v-model="filter"
      btnClass="btn-sm" />
    <div class="scroll-outer-container">
      <div class="scroll-container submitters">
        <div class="fade-gradient-top"></div>
        <div  v-for="(i, idx) of [...list, ...list]"
              :key="idx"
              class="font-chatthai">
          <button class="btn btn-block btn-list"
                  :class="{'active': selectedSubmitter === idx}"
                  @click="selectedSubmitter = idx">
            {{ `${user.firstName} ${user.lastName}` }}
          </button>
        </div>
        <div class="fade-gradient-bottom"></div>
      </div>
    </div>
  </div>

  <div class="row w-50 p-4 mt-5">
    <div class="col-12">
      <h3 class="mb-4 mt-2">
        <i class="fas fa-user icon-lg mr-1"></i>
        ข้อมูล ตัวแทนส่งตัวอย่าง
      </h3>
    </div>

    <div class="col-12 font-chatthai">
      <div class="form-row">
        <FormInput
          class="col-12 mb-4"
          input-class="form-control-lg text-primary"
          label="ประเภท Account"
          value="พนักงานประจำ"
          disabled />
        <FormInput
          class="col-12"
          input-class="form-control-lg"
          label="ชื่อจริง"
          :value="`${user.title}${user.firstName}`"
          disabled />
        <FormInput
          class="col-12"
          input-class="form-control-lg"
          label="นามสกุล"
          :value="user.lastName"
          disabled />
        <FormInput
          class="col-12"
          input-class="form-control-lg"
          label="อีเมล"
          :value="user.email"
          disabled />
        <FormInput
          class="col-12"
          input-class="form-control-lg"
          label="หมายเลขโทรศัพท์"
          :value="user.phone"
          disabled />
      </div>

      <div class="form-row mt-4">
        <div class="form-group col-12">
          <button class="btn btn-primary btn-lg btn-block ">
            <i class="fas fa-user-slash btn-inner-icon"></i>
            ยกเลิกการให้เป็นตัวแทนส่งตัวอย่าง
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.scroll-container.submitters {
  height: calc(100vh - #{$titlebar-height} - #{$footer-height} - 230px);
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard-employee-submitters',
  computed: {
    ...mapGetters(['user'])
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
      list: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    }
  }
}
</script>