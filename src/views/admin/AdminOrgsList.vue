<template>
<div class="row">
  <div class="col-5 content-height border-right-lighter sticky p-4">
    <h3 class="mb-3">
      <i class="fas fa-sitemap icon-lg mr-1"></i>
      รายการ องค์กร
    </h3>
    <SearchInput class="mb-3" />
    <div class="scroll-outer-container">
      <div class="scroll-container submitters">
        <div class="fade-gradient-top"></div>
        <div  v-for="(i, idx) of [...list, ...list, ...list]"
              :key="idx"
              class="font-chatthai">
          <button class="btn btn-block btn-list"
                  :class="{'active': selectedUser === idx}"
                  @click="selectedUser = idx">
            {{ org.name }}
          </button>
        </div>
        <div class="fade-gradient-bottom"></div>
      </div>
    </div>
  </div>

  <div class="col-7 p-4 mb-5">
    <div class="col-12">
      <h3 class="mb-4">
        <i class="fas fa-user icon-lg mr-1"></i>
        ข้อมูล องค์กร
      </h3>
    </div>

    <div class="col-12 font-chatthai">
      <div class="form-row border-bottom-lighter pb-3">
        <FormInput
          class="col-10"
          input-class="form-control-lg"
          label="ชื่อองค์กร"
          disabled
          :value="org.name" />
        <FormInput
          class="col-10"
          label="ที่อยู่"
          disabled
          :value="org.addr.line1" />
        <FormInput
          class="col-10"
          disabled
          :value="org.addr.line2" />

        <div class="w-100"></div>

        <FormInput
          class="col-4"
          label="เมือง"
          disabled
          :value="org.addr.city" />
        <FormInput
          class="col-4"
          label="จังหวัด"
          disabled
          :value="org.addr.province" />
        <FormInput
          class="col-2"
          label="รหัสไปรษณีย์"
          disabled
          :value="org.addr.zip" />
      </div>

      <div class="form-row border-bottom-lighter py-3">
        <FileView
          class="col-10"
          label="ภ.พ.20"
          file-name="ภพ20_somkuan_farm.pdf"
          icon-class="fa-file-alt" />
        <FileView
          class="col-10"
          label="ใบจดทะเบียนบริษัท"
          file-name="registration_somkuan_farm.pdf"
          icon-class="fa-file-alt" />
      </div>

    </div>

    <div class="col-12 font-chatthai pb-5 mb-5">
      <h4 class="my-3">รายชื่อตัวแทนส่งตัวอย่าง</h4>
      <div  v-for="i of list"
            :key="i"
            class="form-row">
        <FormInput
          class="col-8 mb-2 pr-0"
          disabled 
          :value="`${user.title}${user.firstName} ${user.lastName}`" />
          
        <div class="col-2">
          <router-link  :to="{name: 'admin-users-list'}"
                        tag="button"
                        class="btn btn-secondary btn-block">
            <i class="fa fa-arrow-right btn-inner-icon"></i>
            ดูข้อมูล
          </router-link>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<style lang="scss" scoped>
.scroll-container.submitters {
  height: calc(100vh - #{$titlebar-height} - #{$footer-height} - 210px);
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'admin-orgs-list',
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
      list: [0,1,2,3,4,5,6,7,8,9,10]
    }
  }
}
</script>