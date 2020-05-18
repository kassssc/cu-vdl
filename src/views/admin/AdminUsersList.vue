<template>
<div class="row">
  <div class="col-5 content-height border-right-lighter p-4">
    <h3 class="mb-3">
      <i class="fas fa-users icon-lg mr-1"></i>
      รายการ User Account
    </h3>
    <SearchInput class="mb-3" />
    <div class="d-flex mb-3">
      <button class="filter-btn btn btn-sm primary w-100"
              :class="{'active': activeFilter === 0}"
              @click="activeFilter = 0">
        <i  v-if="activeFilter === 0"
            class="fas fa-check btn-inner-icon" />
        ทั้งหมด
      </button>
      <button v-for="filter of userTypeFilters"
              :key="filter.id"
              class="filter-btn btn btn-sm w-100 ml-3"
              :class="[
                userTypeFilterCSS[filter.id],
                {'active': activeFilter === filter.id}
              ]"
              @click="activeFilter = filter.id">
        <i  v-if="activeFilter === filter.id"
            class="fas fa-check btn-inner-icon" />
        <div  v-else
              class="small-square mr-1"
              :class="userTypeFilterCSS[filter.id]" />
        {{ filter.name }}
      </button>
    </div>
    <div class="scroll-outer-container">
      <div class="scroll-container submitters">
        <div class="fade-gradient-top"></div>
        <div  v-for="(i, idx) of [...list, ...list]"
              :key="idx"
              class="font-chatthai">
          <button class="btn btn-block btn-list"
                  :class="{'active': selectedUser === idx}"
                  @click="selectedUser = idx">
            {{ `${user.firstName} ${user.lastName}` }}
          </button>
        </div>
        <div class="fade-gradient-bottom"></div>
      </div>
    </div>
  </div>

  <div class="col-7 p-4">
    <div class="col-12">
      <h3 class="mb-4">
        <i class="fas fa-user icon-lg mr-1"></i>
        ข้อมูล Account
      </h3>
    </div>

    <div class="col-12 font-chatthai">
      <div class="form-row pb-3 border-bottom-lighter">
        <FormInput
          class="col-6 mb-4"
          input-class="form-control-lg text-primary"
          label="ประเภท Account"
          disabled
          value="พนักงานประจำ" />

        <div class="w-100"></div>

        <FormInput
          class="col-6"
          label="ชื่อจริง"
          disabled
          :value="`${user.title}${user.firstName}`" />
        <FormInput
          class="col-6"
          label="นามสกุล"
          disabled
          :value="user.lastName" />
        <FormInput
          class="col-6"
          label="อีเมล"
          disabled
          :value="user.email" />
        <FormInput
          class="col-6"
          label="หมายเลขโทรศัพท์"
          disabled
          :value="user.phone" />
        <FileView
          class="col-6"
          label="สำเนาบัตรประชาชน"
          file-name="somkuan_id.pdf"
          icon-class="fa-address-card" />
      </div>

      <div class="form-row py-3">
        <FormInput
          class="col-8"
          input-class="form-control-lg"
          label="องค์กรประจำ"
          disabled
          :value="org.name" />
        <div class="form-group col-4 d-flex align-items-end">
          <router-link  :to="{name: 'admin-orgs-list'}"
                        tag="button"
                        class="btn btn-lg btn-block btn-secondary">
            <i class="fa fa-arrow-right btn-inner-icon"></i>
            ดูข้อมูลองค์กร
          </router-link>
        </div>
      </div>

      <div class="form-row py-4 border-top-lighter">
        <div class="form-group col-6">
          <button class="btn btn-danger btn-block ">
            <i class="fas fa-user-slash btn-inner-icon"></i>
            ระงับการใช้งาน Account
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.scroll-container.submitters {
  height: calc(100vh - #{$titlebar-height} - #{$footer-height} - 255px);
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'admin-users-list',
  computed: {
    ...mapGetters(['user', 'org'])
  },
  data () {
    return {
      selectedUser: 0,
      activeFilter: 0,
      userTypeFilters: [
        { id: 1, name: 'พนักงานประจำ'},
        { id: 2, name: 'Freelance'}
      ],
      userTypeFilterCSS: {
        1: 'purple',
        2: 'pink'
      },
      list: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    }
  }
}
</script>