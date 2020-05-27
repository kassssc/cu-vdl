<template>
<div class="row flex-1">
  <div class="col-5 sub-nav-content content-height d-flex flex-column">
    <h3 class="mb-3">
      <i class="fas fa-sitemap icon-lg mr-1"></i>
      รายการ องค์กร
    </h3>
    <SearchInput class="mb-3" />

    <div class="scroll-container">
      <div class="fade-gradient-top"></div>
      <ul class="item-list font-chatthai">
        <li v-for="(i, idx) of [...list, ...list, ...list]"
            :key="idx"
            class="clickable"
            :class="{'active': selectedOrg === idx}"
            @click="selectedOrg = idx">
          {{ org.name }}
        </li>
      </ul>
      <div class="fade-gradient-bottom"></div>
    </div>

  </div>

  <div class="col-7 sub-nav-content content-height">
    <h2 class="mb-4">{{ org.name }}</h2>

    <div class="font-chatthai">
      <div class="form-row border-b pb-3">
        <FormTextarea
          class="col-12"
          label="ที่อยู่"
          rows="3"
          disabled
          :value="org.addr" />
        <FileView
          class="col-6"
          label="ภ.พ.20"
          file-name="ภพ20.pdf"
          icon-class="fa-file-alt" />
        <FileView
          class="col-6"
          label="ใบจดทะเบียนบริษัท"
          file-name="registration.pdf"
          icon-class="fa-file-alt" />
      </div>
    </div>

    <div class="font-chatthai py-3 mb-3">
      <h3>รายชื่อตัวแทนส่งตัวอย่าง</h3>
      <table>
        <thead>
          <tr>
            <th> 
              ชื่อ-นามสกุล
              <div class="shadow-th" />
            </th>
            <th> 
              ประเภท Account
              <div class="shadow-th" />
            </th>
            <th><div class="shadow-th" /></th>
          </tr>
        </thead>
        <tbody>
          <router-link  :to="{ name: 'admin-users-list' }"
                        tag="tr"
                        v-for="(_, idx) of [0,0,0,0,0,0,0,0,0,0,0,0,0,0]"
                        :key="idx"
                        class="clickable hover-appear-wrapper">
            <td>{{ `${user.title}${user.firstName} ${user.lastName}` }}</td>
            <td>
              <div v-if="idx % 3 !== 0" class="light-tag pink">
                <div class="small-square pink mr-1"></div>
                Freelance
              </div>
              <div v-else class="light-tag purple">
                <div class="small-square purple mr-1"></div>
                พนักงานประจำ
              </div>
            </td>
            <td class="text-right">
              <h5 class="hover-appear">
                ดูข้อมูล
                <i class="fa fa-arrow-right icon-sm ml-1"></i>
              </h5>
            </td>
          </router-link>
        </tbody>
      </table>
    </div>

  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'admin-orgs-list',
  computed: {
    ...mapGetters([
      'user',
      'org'
    ])
  },
  data () {
    return {
      selectedOrg: 0,
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