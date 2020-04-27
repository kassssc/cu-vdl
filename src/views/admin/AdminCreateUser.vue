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
            <div class="form-group col-10">
              <form-inline-select 
                :options="userTypeOptions" 
                v-model="userFormData.accountType" />
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
            <div class="form-group col-5">
              <label>
                ชื่อจริง
              </label>
              <input  type="text"
                      class="form-control"
                      v-model="userFormData.firstName">
            </div>
            <div class="form-group col-5">
              <label>
                นามสกุล
              </label>
              <input  type="text"
                      class="form-control"
                      v-model="userFormData.lastName">
            </div>
            <div class="form-group col-5">
              <label>
                อีเมล
              </label>
              <input  type="text"
                      class="form-control"
                      v-model="userFormData.email">
            </div>
            <div class="form-group col-5">
              <label>
                เบอร์โทรศัพท์
              </label>
              <input  type="text"
                      class="form-control"
                      v-model="userFormData.phone">
            </div>
            <div class="form-group col-5">
              <label>
                สำเนาบัตรประชาชน
              </label>
              <form-file-upload />
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="userFormData.accountType !== null" class="row w-100 py-4">
        <div class="col-xl-3 col-12">
          <h4>องค์กร</h4>
        </div>

        <div class="col-xl-9 col-12">
          <div class="form-row">
            <div class="form-group col-10">
              <form-inline-select
                v-if="userFormData.accountType === 1"
                :options="createOrgOptions" 
                v-model="willCreateOrg" />
              <form-select-input 
                v-else-if="userFormData.accountType === 2"
                class="custom"
                v-model="userFormData.orgs"
                label="name"
                track-by="id"
                placeholder="ค้นหาองค์กร..."
                :tabindex="0"
                :show-labels="false"
                :options="orgOptions"
                :multiple="true"
                :serchable="true"
                :hide-selected="true"
                :close-on-select="false">
                <div slot="caret" class="dd-icon">
                  <i class="fas fa-chevron-down" />
                </div>
              </form-select-input>
            </div>
          </div>
        </div>
      </div>

      <template v-if="userFormData.accountType === 1">
        <template v-if="willCreateOrg === true">
          <div class="row w-100 pb-4">
            <div class="col-xl-3 col-12">
              <h4>
                ข้อมูลองค์กร
              </h4>
            </div>
            <div class="col-xl-9 col-12">
              <div class="form-row">
                <div class="form-group col-10 mb-2">
                  <label>
                    ชื่อองค์กร <i class="fas fa-star-of-life" />
                  </label>
                  <input  type="text"
                          class="form-control"
                          v-model.number="userFormData.org.name">
                </div>
                <div class="form-group col-10 mb-2">
                  <label>
                    เลขที่ ซอย ถนน <i class="fas fa-star-of-life" />
                  </label>
                  <input  type="text"
                          class="form-control"
                          v-model.number="userFormData.org.addr1">
                </div>
                <div class="form-group col-10 mb-2">
                  <label>
                    แขวง เขต / ตำบล อำเภอ
                  </label>
                  <input  type="text"
                          class="form-control"
                          v-model.number="userFormData.org.addr2">
                </div>
                <div class="form-group col-4">
                  <label>
                    เมือง <i class="fas fa-star-of-life" />
                  </label>
                  <input  type="text"
                          class="form-control"
                          v-model.number="userFormData.org.city">
                </div>
                <div class="form-group col-4">
                  <label>
                    จังหวัด <i class="fas fa-star-of-life" />
                  </label>
                  <input  type="text"
                          class="form-control"
                          v-model.number="userFormData.org.province">
                </div>
                <div class="form-group col-2">
                  <label>
                    รหัสไปรษณีย์ <i class="fas fa-star-of-life" />
                  </label>
                  <input  type="number"
                          class="form-control"
                          v-model.number="userFormData.org.zip">
                </div>
              </div>
            </div>
          </div>
    
          <div class="row mb-2">
            <div class="col-xl-3 col-12">
              <h4>อัพโหลดเอกสาร</h4>
            </div>
            <div class="col-xl-9 col-12">
              <div class="form-row">
                <div class="form-group col-5">
                  <label>
                    ภ.พ.20 <i class="fas fa-star-of-life" />
                  </label>
                  <form-file-upload />
                </div>
                <div class="form-group col-5">
                  <label>
                    ใบจดทะเบียนบริษัท <i class="fas fa-star-of-life" />
                  </label>
                  <form-file-upload />
                </div>
              </div>
            </div>
          </div>
        </template>
  
        <div  v-else-if="willCreateOrg === false"
              class="row w-100 pb-4">
          <div class="col-xl-3 col-12">
            <h4>เลือกองค์กร</h4>
          </div>
          <div class="col-xl-9 col-12">
            <div class="form-row">
              <div class="form-group col-10">
                <select 
                        class="form-control"
                        v-model="userFormData.org">
                  <option>เลือก...</option>
                  <option>ฟาร์มสมควร</option>
                  <option>ฟาร์มสมหมาย</option>
                  <option>ฟาร์มสมคิด</option>
                  <option>ฟาร์มสมชาย</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="row w-100 py-4 border-top-lighter">
        <div class="col-xl-3 col-12">
        </div>
        <div class="col-xl-9 col-12">
          <div class="form-row">
            <div class="form-group col-5">
              <button class="btn btn-primary btn-lg btn-block">
                <i class="fas fa-user-plus btn-inner-icon"></i>
                สร้าง Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'admin-create-user',
  computed: {
    ...mapGetters(['orgOptions'])
  },
  data () {
    return {
      willCreateOrg: null,
      userFormData: {
        accountType: null,
        org: 0,
        orgs: [],
        customerList: [],
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
        nationalId: null
      },
      userTypeOptions: [
        { id: 1, name: 'พนักงานประจำ'},
        { id: 2, name: 'Freelance'}
      ],
      createOrgOptions: [
        { id: true, name: 'สร้างองค์กรด้วย'},
        { id: false, name: 'เพิ่มให้องค์กรที่มีอยู่แล้ว'}
      ]
    }
  }
}
</script>