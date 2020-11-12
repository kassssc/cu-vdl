<template>                                                            
<div v-if="auth" class="page page-xxl d-flex align-items-start">
  <div class="sidebar content-height"
       :class="{'folded': sidebar_folded}">
    <button class="btn btn-transparent fold-btn align-self-end"
            @click="toggle_sidebar()">
      <i class="fas fa-chevron-left"
         :class="{'flip-x': sidebar_folded}"/>
    </button>
    <div class="content">
      <h6 class="mb-1 text-medium">ค้นหาด้วยหมายเลขการส่ง</h6>
      <SearchInput
        class="d-block"
        placeholder="ใส่หมายเลขการส่ง..."
        @search="search($event)" />
      <!-- <template v-if="auth.is_admin">
        <h6 class="mb-1 mt-3 text-medium">กรองโดยผู้ส่ง</h6>
        <FormSelect
          class="mb-2"
          v-model="active_submitter_filter"
          label="name"
          placeholder="ค้นหาผู้ส่ง..."
          :reduce="o => o.index"
          :get-option-label="o => o.default_contact.name"
          :options="users"
          @input="filter_by_submitter($event)" />
      </template> -->
      <template>
        <h6 class="mb-1 mt-3 text-medium">กรองโดยบุคคล/องค์กรที่เกี่ยวข้อง</h6>
        <FormSelect
          class="mb-2"
          label="name"
          placeholder="ค้นหา..."
          :reduce="o => o.index"
          :options="contact_list"
          v-model="active_contact_filter"
          @input="filter_by_contact($event)" />
      </template>
      <h6 class="mb-1 mt-4 text-medium">สถานะการส่งตัวอย่าง</h6>
      <div class="d-flex flex-column">
        <button class="filter-btn btn btn-sm btn-block text-left primary"
                :class="{'active': active_status_filter === null}"
                :disabled="active_status_filter === null"
                @click="filter_by_status(null)">
          <i  v-if="active_status_filter === null"
              class="fas fa-check btn-inner-icon" />
          <div v-else class="small-square mr-1" />
          ทั้งหมด
        </button>
        <button v-for="filter of submission_statuses"
                :key="filter"
                class="filter-btn btn btn-sm btn-block text-left"
                :class="[
                  submission_status_colors[filter],
                  {'active': active_status_filter === filter}
                ]"
                :disabled="active_status_filter === filter"
                @click="filter_by_status(filter)">
          <i  v-if="active_status_filter === filter"
              class="fas fa-check btn-inner-icon" />
          <div  v-else
                class="small-square mr-1"
                :class="submission_status_colors[filter]" />
          {{ filter }}
        </button>
      </div>
      <!-- <h6 class="mb-1 mt-4 text-medium">สถานะการชำระค่าใช่จ่าย</h6>
      <div class="d-flex flex-column">
        <button class="filter-btn btn btn-sm btn-block text-left primary"
                :class="{'active': active_invoice_status_filter === 0}"
                @click="filter_by_invoice_status(0)">
          <i  v-if="active_invoice_status_filter === 0"
              class="fas fa-check btn-inner-icon" />
          <div v-else class="small-square mr-1" />
          ทั้งหมด
        </button>
        <button v-for="filter of invoice_statuses"
                :key="filter"
                class="filter-btn btn btn-sm btn-block text-left"
                :class="[
                  invoice_status_colors[filter],
                  {'active': active_invoice_status_filter === filter}
                ]"
                @click="filter_by_invoice_status(filter)">
          <i  v-if="active_invoice_status_filter === filter"
            class="fas fa-check btn-inner-icon" />
          <div  v-else
                class="small-square mr-1"
                :class="invoice_status_colors[filter]" />
          {{ filter }}
        </button>
      </div> -->
    </div>
  </div>

  <div class="flex-1 d-flex flex-column align-items-center content-height pl-4 border-l">
    <div id="table-container" class="w-100 scroll-container">
      <transition name="fade">
        <table  v-if="!loading"
                key="submissions">
          <thead>
            <tr>
              <th>
                เลขที่ส่ง<div class="shadow-th"></div>
              </th>
              <th>
                สถานะ<div class="shadow-th"></div>
              </th>
              <th>
                สถานะ Invoice<div class="shadow-th"></div>
              </th>
              <th>
                วันที่ส่ง<div class="shadow-th"></div>
              </th>
              <th v-if="auth.is_admin">
                ผู้ส่งตัวอย่าง<div class="shadow-th"></div>
              </th>
              <th>
                เจ้าของตัวอย่าง<div class="shadow-th"></div>
              </th>
              <th>
                ประเภทการทดสอบ<div class="shadow-th"></div>
              </th>
              <th>
                จำนวน Report<div class="shadow-th"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <router-link  :to="{
                            name: 'view-submission',
                            params: {
                              id: resolve_key(submission)
                            }
                          }"
                          tag="tr"
                          class="clickable"
                          v-for="submission of submissions"
                          :key="submission.backend_key">
              <td>
                <div class="my-1">{{ resolve_key(submission) }}</div>
              </td>
              <td>
                <ColorTag
                  :color="submission_status_colors[submission.submission_status]"
                  :label="submission.submission_status" />
              </td>
              <td>
                <ColorTag
                  :color="invoice_status_colors[submission.invoice.invoice_status] || 'grey'"
                  :label="submission.invoice.invoice_status || 'ยังไม่ออก Invoice'" />
              </td>
              <td>{{ to_display_date(submission.submission_submit_date) }}</td> 
              <td v-if="auth.is_admin">{{ submission.submitter? submission.submitter.name : '' }}</td>
              <td>{{ submission.sample_owner? submission.sample_owner.name : '' }}</td>
              <td>
                <ColorTag
                  :color="submission_type_colors[submission.submission_type]"
                  :label="submission.submission_type" />
              </td>
              <td>
                <h5>{{ submission.reports.length > 0? submission.reports.length : '-' }}</h5>
              </td>
            </router-link>
          </tbody>
        </table>
        <div v-else key="loading" class="w-100 pt-5 mt-5 text-center">
          <LoadingAnimation color="primary" size="lg" />
        </div>
      </transition>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination mt-3">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true"><i class="fas fa-angle-double-left"></i></span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">4</a></li>
        <li class="page-item"><a class="page-link" href="#">5</a></li>
        <li class="page-item"><a class="page-link" href="#">6</a></li>
        <li class="page-item"><a class="page-link" href="#">7</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true"><i class="fas fa-angle-double-right"></i></span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>  
</template>

<script>
import { get_jwt } from '@/vue-apollo'
import { AUTH_DATA } from '@/graphql/local'
import { SUBMISSION_LIST } from '@/graphql/submission'
import { USERS_LIST, USER_DETAIL } from '@/graphql/user'
import { CONTACTS_LIST } from '@/graphql/contact'

export default {
  name: 'submissions-list',
  computed: {
    contact_list () {
      if (this.auth.is_admin) {
        return this.all_contacts
      } else if (this.user_detail) {
        return [...this.user_detail.contact_list, this.user_detail.default_contact ]
      }
      return []
    }
  },
  data () {
    return {
      loading: true,
      search_query: null,
      active_status_filter: null,
      active_invoice_status_filter: null,
      active_submitter_filter: null,
      active_contact_filter: null,
      sidebar_folded: false,
      submission_type_colors: {
        'การตรวจทั่วไป': 'primary',
        'ทดสอบประสิทธิภาพยาฆ่าเชื้อ': 'blue'
      },
      submission_status_colors: {
        'ส่งแล้ว': 'grey',
        'กำลังดำเนินการ': 'yellow',
        'เสร็จสิ้น': 'green',
        'ยกเลิก': 'red',
      },
      submission_statuses: [
        'ส่งแล้ว',
        'กำลังดำเนินการ',
        'เสร็จสิ้น',
        'ยกเลิก',
      ],
      invoice_statuses: [
        'ยังไม่ออก Invoice',
        'รอการชำระเงิน',
        'ชำระเงินแล้ว',
      ],
      invoice_status_colors: {
        'ยังไม่ออก Invoice': 'grey',
        'รอการชำระเงิน': 'yellow',
        'ชำระเงินแล้ว': 'green'
      },
    }
  },
  methods: {
    resolve_key (submission) {
      if (submission.BestLIMS_key) {
        return submission.BestLIMS_key
      }
      return submission.backend_key
    },
    filter_by_status (filter) {
      this.loading = true
      this.active_status_filter = filter
    },
    filter_by_invoice_status (filter) {
      this.active_invoice_status_filter = filter
    },
    filter_by_submitter (filter) {
    },
    filter_by_contact (filter) {
      this.loading = true
      this.active_contact_filter = filter
    },
    search (query) {
      this.loading = true
      this.search_query = query
    },
    toggle_sidebar () {
      this.sidebar_folded = !this.sidebar_folded
    },
    download () {

    },
  },
  apollo: {
    auth: {
      query: AUTH_DATA,
      update: data => data.auth,
    },
    user_detail: {
      query: USER_DETAIL,
      variables () {
        return {
          jwt: get_jwt()
        }
      },
      update: data => data.get_backuser.result
    },
    users: {
      query: USERS_LIST,
      variables () {
        return {
          jwt: get_jwt(),
          search_query: '',
          accountActive: true
        }
      },
      update: data => data.search_backuser.result,
      skip () {
        return !this.auth || !this.auth.is_admin
      }
    },
    submissions: {
      query: SUBMISSION_LIST,
      variables () {
        return {
          jwt: get_jwt(),
          search_query: this.search_query,
          contact: this.active_contact_filter,
          submission_status: this.active_status_filter
        }
      },
      update: data => data.search_submission.result,
      debounce: 200,
      result () {
        this.loading = false
      },
      skip () {
        return !this.user_detail
      }
    },
    all_contacts: {
      query: CONTACTS_LIST,
      variables () {
        return {
          jwt: get_jwt(),
          search_query: ''
        }
      },
      update: data => data.search_contact.result,
      skip () {
        return !this.auth || !this.auth.is_admin
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#table-container {
  height: calc(100vh - #{$titlebar-height} - #{$footer-height} - 30px);
  padding-bottom: 1.5rem;
  padding-right: .75rem;
}
</style>