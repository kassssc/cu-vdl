<template>
<div class="page page-lg d-flex py-0 position-relative">
  <div class="list-view list-sticky border-r pt-4 pr-4 content-height-with-subnav">
    <SearchInput
      class="mb-2"
      placeholder="ค้นหา Contact..."
      @search="set_search_query($event)" />
    <div class="d-flex mb-2">
      <button class="filter-btn filter-btn-sm btn btn-sm primary w-100"
              :class="{'active': active_contact_type_filter === null}"
              :disabled="loading || active_contact_type_filter === null"
              @click="set_contact_type_filter(null)">
        <i  v-if="active_contact_type_filter === null"
            class="fas fa-check btn-inner-icon" />
        ทั้งหมด
      </button>
      <button v-for="filter of contact_type_filters"
              :key="filter"
              class="filter-btn filter-btn-sm btn btn-sm w-100 ml-2 px-2"
              :class="[
                contact_type_colors[filter],
                {'active': active_contact_type_filter === filter}
              ]"
              :disabled="loading || active_contact_type_filter === filter"
              @click="set_contact_type_filter(filter)">
        <i  v-if="active_contact_type_filter === filter"
            class="fas fa-check btn-inner-icon" />
        <div  v-else
              class="small-square mr-1"
              :class="contact_type_colors[filter]" />
        {{ filter }}
      </button>
    </div>

    <transition name="fade">
      <div  v-if="!loading && contacts"
            key="list"
            class="scroll-container">
        <div class="fade-gradient-top"></div>
        <ul v-if="contacts.length > 0"
            class="item-list font-chatthai">
          <router-link  :to="{
                          name: 'admin-contacts-list',
                          params: { id: contact.index }
                        }"
                        tag="li"
                        v-for="contact of contacts"
                        :key="contact.index"
                        class="clickable"
                        :class="{'active': $route.params.id == contact.index}"
                        @click="selected_contact = null">
            <div class="row no-gutters">
              <div class="col-8 d-flex align-items-center">
                <h5>{{ contact.name }}</h5>
              </div>
              <div class="col-4 d-flex justify-content-between align-items-center">
                <ColorTag
                  :label="contact.contact_type"
                  :color="contact_type_colors[contact.contact_type]" />
                <i v-if="contact.default_contact_of" class="fas fa-star-of-life icon-sm text-primary"></i>
              </div>
            </div>
          </router-link>
        </ul>
        <div  v-else class="w-100 py-3 text-center border-b border-t">
          <h5 class="text-muted">
            <i class="far fa-frown mr-2"></i>ไม่มี Contact ที่จะแสดง
          </h5>
        </div>
        <div class="fade-gradient-bottom"></div>
      </div>
      <div  v-else
            key="loading"
            class="w-100 pt-5 text-center">
        <LoadingAnimation color="primary" size="lg" />
      </div>
    </transition>

  </div>

  <div class="p-4 w-100 scroll-container">
    <transition name="fade">
      <div v-if="selected_contact">
        <div class="d-block d-md-flex align-items-center mb-3">
          <h3 class="mr-3 d-block d-lg-inline-block mb-md-0 mb-3">
            <i class="fas fa-id-card icon-lg mr-2"></i> {{ selected_contact.name }}
          </h3>
          <ColorTag
            class="d-block d-md-inline-block mb-3 mb-md-0"
            size="lg"
            :label="selected_contact.contact_type"
            :color="contact_type_colors[selected_contact.contact_type]" />
          <div  v-if="selected_contact.default_contact_of"
                class="d-block d-md-inline-block light-tag primary lg ml-md-3 mb-4 mb-md-0">
            <i class="fas fa-star-of-life icon-md text-primary"></i>
            Contact ประจำ Account
          </div>
        </div>
    
        <div class="form-row border-b pb-3 font-chatthai">
          <div class="form-group col-12 col-md-6 col-lg-5 mb-4 mb-md-0">
            <div  v-if="!editing_info"
                  class="form-row">
              <FormInput
                class="col-12"
                label="ชื่อ"
                disabled
                :value="selected_contact.name" />
              <FormTextarea
                class="col-12"
                label="ที่อยู่"
                rows="3"
                disabled
                :value="selected_contact.address" />
              <div class="form-group col-12">
                <button class="btn btn-secondary btn-block font-cu"
                        @click="edit_info()">
                  <i class="fas fa-edit btn-inner-icon"></i>แก้ไขข้อมูล
                </button>
              </div>
            </div>
            <div  v-else
                  class="form-row">
              <FormInput
                class="col-12"
                label="ชื่อ"
                v-model="form_info.name" />
              <FormTextarea
                class="col-12"
                label="ที่อยู่"
                rows="3"
                v-model="form_info.address" />
              <div class="form-group col-10 font-cu">
                <button class="btn btn-primary btn-block"
                        @click="submit_edit_info()">
                  <i class="fas fa-check btn-inner-icon"></i>บันทึกข้อมูล
                </button>
                <ErrorBox v-if="info_error" :msg="info_error" />
              </div>
              <div class="form-group col">
                <button class="btn btn-secondary btn-block font-cu"
                        @click="cancel_edit_info()">
                  <i class="fas fa-times btn-inner-icon mr-0" />
                </button>
              </div>
            </div>
          </div>
          <div class="form-group col-12 col-md-6 col-lg-5 mb-0">
            <div  v-if="!editing_english_info"
                  class="form-row">
              <FormInput
                class="col-12"
                label="ชื่อ (ภาษาอังกฤษ)"
                disabled
                :value="selected_contact.name_eng" />
              <FormTextarea
                class="col-12"
                label="ที่อยู่ (ภาษาอังกฤษ)"
                rows="3"
                disabled
                :value="selected_contact.address_eng" />
              <div class="form-group col-12">
                <button class="btn btn-secondary btn-block font-cu"
                        @click="edit_english_info()">
                  <i class="fas fa-edit btn-inner-icon"></i>แก้ไขข้อมูลภาษาอังกฤษ
                </button>
              </div>
            </div>
            <div  v-else
                  class="form-row">
              <FormInput
                class="col-12"
                label="ชื่อ (ภาษาอังกฤษ)"
                v-model="form_english_info.name_eng" />
              <FormTextarea
                class="col-12"
                label="ที่อยู่ (ภาษาอังกฤษ)"
                rows="3"
                v-model="form_english_info.address_eng" />
              <div class="form-group col-10 font-cu">
                <button class="btn btn-primary btn-block"
                        @click="submit_edit_english_info()">
                  <i class="fas fa-check btn-inner-icon"></i>บันทึกข้อมูล
                </button>
                <ErrorBox v-if="english_info_error" :msg="english_info_error" />
              </div>
              <div class="form-group col">
                <button class="btn btn-secondary btn-block font-cu"
                        @click="cancel_edit_english_info()">
                  <i class="fas fa-times btn-inner-icon mr-0" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div  v-if="selected_contact.default_contact_of"
              class="form-row border-b py-4">
          <div class="form-group col-12 col-md-6 col-lg-5 mb-0">
            <router-link  :to="{
                            name: 'admin-users-list',
                            params: { id: selected_contact.default_contact_of }
                          }"
                          tag="button"
                          class="btn btn-secondary btn-block font-cu">
              <i class="fas fa-arrow-right btn-inner-icon"></i> ไปดูข้อมูล User Account
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
import {
  CONTACTS_LIST,
  CONTACT_DETAIL,
  UPDATE_CONTACT_INFO,
  UPDATE_CONTACT_ENG_INFO,
} from '@/graphql/contact'

export default {
  name: 'admin-contacts-list',
  data () {
    return {
      search_query: '',
      loading: true,
      editing_info: false,
      editing_english_info: false,
      info_error: null,
      english_info_error: null,
      form_info: {
        name: null,
        address: null
      },
      form_english_info: {
        name_eng: null,
        address_eng: null
      },
      active_contact_type_filter: null,
      contact_type_filters: [
        'องค์กร',
        'บุคคล'
      ],
      contact_type_colors: {
        'องค์กร': 'red',
        'บุคคล': 'orange',
      },
    }
  },
  methods: {
    set_search_query (query) {
      this.loading = true
      this.search_query = query
    },
    set_contact_type_filter (filter) {
      this.active_contact_type_filter = filter
      this.loading = true
      if (this.$route.params.id) {
        this.$router.push({ name: 'admin-contacts-list' })
      }
    },
    edit_info () {
      this.editing_info = true
      this.form_info.name = this.selected_contact.name
      this.form_info.address = this.selected_contact.address
    },
    cancel_edit_info () {
      this.info_error = null
      this.editing_info = false
      this.form_info.name = null
      this.form_info.address = null
    },
    edit_english_info () {
      this.editing_english_info = true
      this.form_english_info.name_eng = this.selected_contact.name_eng
      this.form_english_info.address_eng = this.selected_contact.address_eng
    },
    cancel_edit_english_info () {
      this.english_info_error = null
      this.editing_english_info = false
      this.form_english_info.name = null
      this.form_english_info.address = null
    },
    async submit_edit_info () {
      if (!this.form_info.name || !this.form_info.address) {
        this.info_error = 'กรุณากรอกข้อมูลให้ครบ'
        return
      }
      try {
        let res = await this.$apollo.mutate({
          mutation: UPDATE_CONTACT_INFO,
          variables: {
            index: this.selected_contact.index,
            ...this.form_info
          }
        })
        await this.$apollo.queries.selected_contact.refetch()
        await this.$apollo.queries.contacts.refetch()
        // this.$nextTick( () => this.cancel_edit_info() )
        //setTimeout( () => this.cancel_edit_info(), 3000)
      } catch (err) {
        console.log(err)
        this.info_error = 'ระบบขัดข้อง กรุณาลองใหม่ในภายหลัง'
      }
    },
    async submit_edit_english_info () {
      if (!this.form_english_info.name_eng || !this.form_english_info.address_eng) {
        this.english_info_error = 'กรุณากรอกข้อมูลให้ครบ'
        return
      }
      try {
        let res = await this.$apollo.mutate({
          mutation: UPDATE_CONTACT_ENG_INFO,
          variables: {
            index: this.selected_contact.index,
            ...this.form_english_info
          }
        })
        console.log(res)
        await this.$apollo.queries.contacts.refetch()
        await this.$apollo.queries.selected_contact.refetch()
        this.$nextTick( () => this.cancel_edit_english_info() )
      } catch (err) {
        console.log(err)
        this.english_info_error = 'ระบบขัดข้อง กรุณาลองใหม่ในภายหลัง'
      }
    },
  },
/*   watch: {
    // So that the contact info section re-renders when selected contact change
    '$route.params.id': function () {
      this.selected_contact = null
    }
  }, */
  apollo: {
    contacts: {
      query: CONTACTS_LIST,
      variables () {
        return {
          search_query: this.search_query,
          contact_type: this.active_contact_type_filter
        }
      },
      debounce: 200,
      update: data => data.search_contact.result,
      result () {
        this.$nextTick( () => this.loading = false )
      }
    },
    selected_contact: {
      query: CONTACT_DETAIL,
      variables () {
        return { 
          index: parseInt(this.$route.params.id),
        }
      },
      update: data => data.get_contact.result,
      skip () {
        return !this.$route.params.id
      },
      result () {
        this.cancel_edit_info()
        this.cancel_edit_english_info()
      }
    }
  }
}
</script>