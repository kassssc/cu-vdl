<template>
  <Modal  modal-id="contact-modal"
          modal-dialog-class="modal-lg"
          data-backdrop="static"
          x-close>
    <template #modal-header>
      <h4>{{ create_contact? 'สร้าง Contact ใหม่' : 'ค้นหารายชื่อ Contact' }}</h4>
    </template>
    <template #modal-body>
      <div class="modal-div">
        <template v-if="!create_contact">
          <h5 class="mb-1 text-dark">กรุณาค้นหารายชื่อ Contact ในระบบก่อน</h5>
          <h5 class="mb-3 text-dark">หากไม่พบรายชื่อที่ท่านต้องการในระบบ ท่านสามารถสร้าง Contact ขึ้นมาใหม่ได้</h5>
          <SearchInput
            placeholder="ค้นหารายชื่อในระบบ..."
            @search="set_search_query($event)" />
          <div class="subcontainer my-3">
            <transition name="fade">
              <ul v-if="!contacts_loading && contacts_list.length > 0"
                  key="list"
                  class="item-list p-0">
                <li  v-for="contact of contacts_list"
                      :key="contact.index"
                      class="no-top-btm-border d-flex justify-content-between align-items-center pr-0">
                  <h5>{{ contact.name }}</h5>
                  <button class="btn btn-primary btn-sm"
                          @click="add_contact_and_close_modal(contact.index)">
                    <template v-if="submitting_add_contact && contact_to_add === contact.index">
                      <LoadingAnimation />
                    </template>
                    <template v-else>
                      <i class="fas fa-check btn-inner-icon"></i>เลือกรายชื่อนี้
                    </template>
                  </button>
                </li>
              </ul>
              <div  v-else-if="!contacts_loading"
                    key="no-contacts"
                    class="w-100 py-3 text-center">
                <h4 class="text-muted">
                  <i class="far fa-frown mr-2"></i>ไม่มีรายชื่อที่จะแสดง
                </h4>
              </div>
              <div v-else key="loading" class="w-100 py-4 text-center">
                <LoadingAnimation color="primary" size="lg" />
              </div>
            </transition>
          </div>
          <div class="form-row">
            <div class="form-group col-12 mt-3 mb-0">
              <button class="btn btn-block btn-secondary"
                      @click="create_contact = true">
                ไม่พบรายชื่อในระบบ
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <button class="btn btn-transparent mb-4"
                  @click="create_contact = false">
            <i class="fas fa-chevron-left mr-2" />กลับไปค้นหา
          </button>
          <div class="form-row">
            <FormInlineSelect
              class="col-12"
              :btn-class-list="['red', 'orange']"
              :options="contact_types"
              v-model="form.contact_type" />
            <FormContactNameInput
              class="col-12 p-0"
              :contact-type="form.contact_type"
              v-model="form.name" />
            <FormAddressInput
              class="form-group col-12 p-0"
              v-model="form.address" />
            <div class="form-group mt-3 col-9">
              <checkbox
                label="เพิ่มข้อมูลภาษาอังกฤษ"
                secondary-label="(ใช้เมื่อต้องการออกรายงานเป็นภาษาอังกฤษ)"
                v-model="include_english" />
            </div>
            <template v-if="include_english">
              <FormContactNameInput
                class="col-12 p-0"
                :contact-type="form.contact_type"
                english
                v-model="form.name_eng" />
              <FormAddressInput
                class="form-group col-12 p-0"
                english
                v-model="form.address_eng" />
            </template>
            <div class="form-group col-12 mt-3 mb-0">
              <button class="btn btn-primary btn-block"
                      @click="submit_create_contact_and_close_modal()">
                <i class="fas fa-plus btn-inner-icon" /> สร้างรายชื่อในระบบ
              </button>
            </div>
          </div>
        </template>
      </div>
    </template>
  </Modal>
</template>

<script>
import $ from 'jquery'
import differenceWith from 'lodash/differenceWith'
import {
  CONTACTS_LIST,
  CREATE_CONTACT,
  ADD_CONTACT_TO_USER
} from '@/graphql/contact'

export default {
  name: 'contact-modal',
  props: {
    user: {
      type: Object,
      required: true
    },
    submitterContacts: {
      type: Array,
      required: true
    },
    englishReport: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    $('#contact-modal').on('hidden.bs.modal', () => this.close_modal() )
    $('#contact-modal').modal('show')
  },
  computed: {
    contacts_include_default () {
      return [...this.submitterContacts, this.user.default_contact]
    },
    contacts_list () {
      if (!this.contact_search_query) {
        return []
      }
      return differenceWith(
        this.contacts_list_raw,
        this.contacts_include_default,
        (contact, other) => contact.index === other.index
      )
    }
  },
  data () {
    return {
      contact_search_query: '',
      contacts_loading: false,
      contact_to_add: null,
      submitting_add_contact: false,
      submitting_create_contact: false,
      create_contact: false,
      include_english: this.englishReport,
      form: {
        contact_type: 'องค์กร',
        name: '',
        address: '',
        name_eng: '',
        address_eng: ''
      },
      contact_types: ['องค์กร', 'บุคคล']
    }
  },
  methods: {
    set_search_query (query) {
      this.contacts_loading = true
      this.contact_search_query = query
    },
    add_contact_and_close_modal (index) {
      this.contact_to_add = index
      this.submit_add_contact_to_user()
    },
    close_modal () {
      this.$emit('modal-close', this.contact_to_add)
    },
    async submit_add_contact_to_user () {
      this.submitting_add_contact = true
      try {
        let res = await this.$apollo.mutate({
          mutation: ADD_CONTACT_TO_USER,
          variables: {
            user_index: this.user.index,
            contact_index: this.contact_to_add
          }
        })
        console.log(res)
        $('#contact-modal').modal('hide')
      } catch (err) {
        console.log(err)
        this.submitting_add_contact = false
      }
    },
    async submit_create_contact_and_close_modal () {
      this.submitting_create_contact = true
      try {
        let res = await this.$apollo.mutate({
          mutation: CREATE_CONTACT,
          variables: {
            user_index: this.user.index,
            ...this.form
          }
        })
        console.log(res)
        this.contact_to_add = res.data.create_contact.result.index
        $('#contact-modal').modal('hide')
      } catch (err) {
        console.log(err)
        this.submitting_create_contact = false
      }
    }
  },
  apollo: {
    contacts_list_raw: {
      query: CONTACTS_LIST,
      variables () {
        return {
          search_query: this.contact_search_query,
          contact_type: 'องค์กร'
        }
      },
      debounce: 500,
      update: data => data.search_contact.result,
      result () {
        this.$nextTick( () => this.contacts_loading = false )
      }
    },
  }
}
</script>

<style scoped lang="scss">
.subcontainer {
  height: 50vh;
}
</style>