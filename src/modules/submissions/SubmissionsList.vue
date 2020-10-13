<template>                                                            
<div v-if="currUser" class="page page-xxl d-flex align-items-start">
  <div class="sidebar content-height"
       :class="{'folded': sidebarFolded}">
    <button class="btn btn-transparent fold-btn align-self-end"
            @click="toggleSidebar()">
      <i class="fas fa-chevron-left"
         :class="{'flip-x': sidebarFolded}"/>
    </button>
    <div class="content">
      <h6 class="mb-1 text-medium">ค้นหาด้วยหมายเลขการส่ง</h6>
      <SearchInput
        class="d-block"
        placeholder="ใส่หมายเลขการส่ง..."
        @debounced-search="search($event)" />
      <template v-if="currUser.isAdmin">
        <h6 class="mb-1 mt-3 text-medium">กรองโดยผู้ส่ง</h6>
        <FormSelect
          class="mb-2"
          v-model="activeSubmitterFilter"
          label="name"
          placeholder="ค้นหาผู้ส่ง..."
          :reduce="opt => opt.index"
          :get-option-label="opt => `${opt.title}${opt.first_name} ${opt.last_name}`"
          :options="users"
          @input="filterBySubmitter($event)" />
      </template>
      <template>
        <h6 class="mb-1 mt-3 text-medium">กรองโดยองค์กรเจ้าของ</h6>
        <FormSelect
          class="mb-2"
          label="name"
          placeholder="ค้นหาองค์กร..."
          :reduce="option => option.index"
          :get-option-label="option => option.name"
          :options="selectOrgs"
          v-model="activeOrgFilter"
          @input="filterByOrg($event)" />
      </template>
      <h6 class="mb-1 mt-4 text-medium">สถานะการส่งตัวอย่าง</h6>
      <div class="d-flex flex-column">
        <button class="filter-btn btn btn-sm btn-block text-left primary"
                :class="{'active': activeStatusFilter === 0}"
                @click="filterByStatus(0)">
          <i  v-if="activeStatusFilter === 0"
              class="fas fa-check btn-inner-icon" />
          <div v-else class="small-square mr-1" />
          ทั้งหมด
        </button>
        <!-- <button v-for="filter of submissionStatuses"
                :key="filter.id"
                class="filter-btn btn btn-sm btn-block text-left"
                :class="[
                  submissionStatusColor[filter.id].color,
                  {'active': activeStatusFilter === filter.id}
                ]"
                @click="filterByStatus(filter.id)">
          <i  v-if="activeStatusFilter === filter.id"
              class="fas fa-check btn-inner-icon" />
          <div  v-else
                class="small-square mr-1"
                :class="submissionStatusColor[filter.id].color" />
          {{ filter.label }}
        </button> -->
      </div>
      <h6 class="mb-1 mt-4 text-medium">สถานะการชำระค่าใช่จ่าย</h6>
      <div class="d-flex flex-column">
        <button class="filter-btn btn btn-sm btn-block text-left primary"
                :class="{'active': activeInvoiceStatusFilter === 0}"
                @click="filterByInvoiceStatus(0)">
          <i  v-if="activeInvoiceStatusFilter === 0"
              class="fas fa-check btn-inner-icon" />
          <div v-else class="small-square mr-1" />
          ทั้งหมด
        </button>
        <!-- <button v-for="filter of submissionInvoiceStatuses"
                :key="filter.id"
                class="filter-btn btn btn-sm btn-block text-left"
                :class="[
                  submissionInvoiceStatusData[filter.id].color,
                  {'active': activeInvoiceStatusFilter === filter.id}
                ]"
                @click="filterByInvoiceStatus(filter.id)">
          <i  v-if="activeInvoiceStatusFilter === filter.id"
            class="fas fa-check btn-inner-icon" />
          <div  v-else
                class="small-square mr-1"
                :class="submissionInvoiceStatusData[filter.id].color" />
          {{ filter.label }}
        </button> -->
      </div>
    </div>
  </div>

  <div class="flex-1 d-flex flex-column align-items-center content-height pl-4 border-l">
    <div id="table-container" class="w-100 scroll-container">
      <transition name="fade">
        <table  v-if="!$apollo.queries.submissions.loading"
                key="submissions">
          <thead>
            <tr>
              <th>
                สถานะ<div class="shadow-th"></div>
              </th>
              <th>
                Invoice<div class="shadow-th"></div>
              </th>
              <th>
                เลขที่ส่ง<div class="shadow-th"></div>
              </th>
              <th>
                วันที่ส่ง<div class="shadow-th"></div>
              </th>
              <th v-if="currUser.isAdmin">
                ชื่อผู้ส่ง<div class="shadow-th"></div>
              </th>
              <th>
                องค์กรเจ้าของ<div class="shadow-th"></div>
              </th>
              <th>
                ประเภทการตรวจ<div class="shadow-th"></div>
              </th>
              <th>
                ใบส่งตัวอย่าง<div class="shadow-th"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <router-link  :to="{
                            name: 'viewsubmission',
                            params: { id: submission.backend_key }
                          }"
                          tag="tr"
                          class="clickable"
                          v-for="submission of submissions"
                          :key="submission.backend_key">
              <td>
                <ColorTag
                  :color="submissionStatusColor[submission.submission_status]"
                  :label="submission.submission_status" />
              </td>
              <td>
                <!-- <ColorTag
                  :color="submissionInvoiceStatusData[row.invoiceStatus].color"
                  :label="submissionInvoiceStatusData[row.invoiceStatus].label" /> -->
              </td>
              <td>{{ submission.backend_key }}</td>
              <td>{{ parseDate(submission.submit_date) }}</td>
              <td v-if="currUser.isAdmin">{{ `${submission.submitter[0].title}${submission.submitter[0].first_name} ${submission.submitter[0].last_name}` }}</td>
              <td>{{ submission.sample_owner_name }}</td>
              <td>
                <ColorTag
                  :color="submissionTypeColor[submission.submission_type]"
                  :label="submission.submission_type" />
              </td>
              <td>
                <button class="btn btn-transparent btn-icon"
                        @click.stop="download()">
                  <i class="fas fa-file-pdf"></i>
                </button>
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
import moment from 'moment/src/moment'
import { getJWT } from '@/vue-apollo'
import { AUTH_DATA } from '@/graphql/local'
import { SUBMISSION_LIST } from '@/graphql/submission'
import { USERS_LIST, USER_ORGS } from '@/graphql/user'
import { ORGS_LIST } from '@/graphql/org'

export default {
  name: 'submissions-list',
  computed: {
    selectOrgs () {
      return this.currUser.isAdmin? this.allOrgs : this.submitterOrgs
    }
  },
  data () {
    return {
      activeStatusFilter: 0,
      activeInvoiceStatusFilter: 0,
      activeSubmitterFilter: null,
      activeOrgFilter: null,
      sidebarFolded: false,
      submissionTypeColor: {
        'การตรวจทั่วไป': 'teal',
        'ทดสอบประสิทธิภาพยาฆ่าเชื้อ': 'blue'
      },
      submissionStatusColor: {
        'ส่งแล้ว': 'grey',
        'กำลังดำเนินการ': 'orange',
        'เสร็จสิ้น': 'green',
        'ยกเลิก': 'red',
      },
      table: {
        head: [
          'สถานะ',
          'การชำระเงิน',
          'เลขที่ส่ง',
          'วันที่ส่ง',
          'ประเภทการตรวจ',
          'ผู้จัดส่ง',
          'องค์กร',
          'ใบส่งตัวอย่าง',
        ]
      }
    }
  },
  methods: {
    filterByStatus (filterId) {
      this.activeStatusFilter = filterId
    },
    filterByInvoiceStatus (filterId) {
      this.activeInvoiceStatusFilter = filterId
    },
    filterBySubmitter (filterId) {
    },
    filterByOrg (filterId) {
    },
    search (query) {
    },
    toggleSidebar () {
      this.sidebarFolded = !this.sidebarFolded
    },
    download () {

    },
    parseDate(epoch) {
      return moment(new Date(parseInt(epoch))).format("DD/MM/YY")
    },
  },
  apollo: {
    currUser: {
      query: AUTH_DATA,
      update: data => data.auth
    },
    users: {
      query: USERS_LIST,
      variables () {
        return {
          jwt: getJWT(),
          searchQuery: '',
          accountActive: true
        }
      },
      update: data => data.search_backuser.result,
      skip () {
        return !this.currUser || !this.currUser.isAdmin
      }
    },
    submissions: {
      query: SUBMISSION_LIST,
      variables () {
        return {
          jwt: getJWT(),
          pageNumber: 1,
          nPerPage: 20
        }
      },
      update: data => data.search_submission.result
    },
    allOrgs: {
      query: ORGS_LIST,
      variables () {
        return {
          jwt: getJWT(),
          searchQuery: '',
          orgType: null
        }
      },
      update: data => data.search_org.result,
      skip () {
        return !this.currUser || !this.currUser.isAdmin
      }
    },
    submitterOrgs: {
      query: USER_ORGS,
      variables () {
        return {
          jwt: getJWT(),
          index: [this.currUser.index]
        }
      },
      update: data => data.get_backuser.result[0].submitter_of,
      skip () {
        return !this.currUser || this.currUser.isAdmin
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