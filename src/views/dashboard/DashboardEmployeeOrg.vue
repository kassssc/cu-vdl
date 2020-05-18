<template>
  <div class="p-4">
    <div class="row mb-3">
      <div class="col-12">
        <h2>
          <i class="fas fa-sitemap icon-lg mr-1"></i>
          ข้อมูลองค์กร {{ org.name }}
        </h2>
      </div>
    </div>
    <div class="row font-chatthai border-bottom-lighter w-100 py-3 mb-3">
      <div class="col-12">
        <div class="form-row">
          <FormTextarea
            class="col-8"
            label="ที่อยู่"
            rows="3"
            disabled
            :value="org.addr" />
          <div class="w-100"></div>
          <FileView
            class="col-4"
            label="ภ.พ.20"
            file-name="ภพ20_somkuan_farm.pdf"
            icon-class="fa-file-alt" />
          <FileView
            class="col-4"
            label="ใบจดทะเบียนบริษัท"
            file-name="registration_somkuan_farm.pdf"
            icon-class="fa-file-alt" />
        </div>
      </div>
    </div>

    <div class="row py-3 mb-3">
      <div class="col-12">
        <h3>
          <i class="fas fa-users icon-lg mr-1"></i>
          รายชื่อตัวแทนส่งตัวอย่าง
        </h3>
      </div>
      <div class="col-12 font-chatthai py-3">
        <table>
          <thead>
            <tr>
              <th> 
                <h4>ชื่อ-นามสกุล</h4>
                <div class="shadow-th"></div>
              </th>
              <th> 
                <h4>ประเภท Account</h4>
                <div class="shadow-th"></div>
              </th>
              <th> 
                <h4>อีเมล</h4>
                <div class="shadow-th"></div>
              </th>
              <th> 
                <h4>หมายเลขโทรศัพท์</h4>
                <div class="shadow-th"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(_, idx) of [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]"
                :key="idx">
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
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard-employee-org',
  computed: {
    ...mapGetters([
      'org',
      'user'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>