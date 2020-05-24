<template>                                                            
<div class="page page-xxl d-flex align-items-start">
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
      <template v-if="!userIsFreelance">
        <h6 class="mb-1 mt-3 text-medium">กรองโดยผู้ส่ง</h6>
        <FormSelect
          class="mb-2"
          v-model="activeSubmitterFilter"
          label="name"
          placeholder="ค้นหาผู้ส่ง..."
          :reduce="option => option.id"
          :options="submitterOptions"
          @input="filterBySubmitter($event)" />
      </template>
      <template v-if="!userIsEmployee">
        <h6 class="mb-1 mt-3 text-medium">กรองโดยองค์กรเจ้าของ</h6>
        <FormSelect
          class="mb-2"
          label="name"
          placeholder="ค้นหาองค์กร..."
          :reduce="option => option.id "
          :options="orgOptions"
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
        <button v-for="filter of submissionStatuses"
                :key="filter.id"
                class="filter-btn btn btn-sm btn-block text-left"
                :class="[
                  submissionStatusData[filter.id].color,
                  {'active': activeStatusFilter === filter.id}
                ]"
                @click="filterByStatus(filter.id)">
          <i  v-if="activeStatusFilter === filter.id"
              class="fas fa-check btn-inner-icon" />
          <div  v-else
                class="small-square mr-1"
                :class="submissionStatusData[filter.id].color" />
          {{ filter.label }}
        </button>
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
        <button v-for="filter of submissionInvoiceStatuses"
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
        </button>
      </div>
    </div>
  </div>

  <div class="flex-1 content-height pl-4 border-left-lighter">
    <div id="table-container" class="scroll-container">
      <table>
        <thead>
          <tr>
            <th>
              สถานะ
              <div class="shadow-th"></div>
            </th>
            <th>
              การชำระเงิน
              <div class="shadow-th"></div>
            </th>
            <th>
              เลขที่ส่ง
              <div class="shadow-th"></div>
            </th>
            <th>
              วันที่ส่ง
              <div class="shadow-th"></div>
            </th>
            <th v-if="!userIsFreelance">
              ชื่อผู้ส่ง
              <div class="shadow-th"></div>
            </th>
            <th v-if="!userIsEmployee">
              องค์กรเจ้าของ
              <div class="shadow-th"></div>
            </th>
            <th>
              ประเภทการตรวจ
              <div class="shadow-th"></div>
            </th>
            <th>
              ใบส่งตัวอย่าง
              <div class="shadow-th"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <router-link  :to="{name: 'viewsubmission', params: { id: row.orderNum }}"
                        tag="tr"
                        class="clickable"
                        v-for="(row, idx) in [...table.body, ...table.body, ...table.body, ...table.body, ...table.body, ...table.body, ...table.body]"
                        :key="idx">
            <td>
              <ColorTag
                :color="submissionStatusData[row.status].color"
                :label="submissionStatusData[row.status].label" />
            </td>
            <td>
              <ColorTag
                :color="submissionInvoiceStatusData[row.invoiceStatus].color"
                :label="submissionInvoiceStatusData[row.invoiceStatus].label" />
            </td>
            <td>{{ row.orderNum }}</td>
            <td>{{ row.submittedDate }}</td>
            <td v-if="!userIsFreelance">{{ row.submitter }}</td>
            <td v-if="!userIsEmployee">{{ row.organization }}</td>
            <td>
              <ColorTag
                :color="submissionTypeData[row.type].color"
                :label="submissionTypeData[row.type].label" />
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
    </div>
  </div>
</div>  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'submissions-list',
  computed: {
    ...mapGetters([
      'userIsAdmin',
      'userIsEmployee',
      'userIsFreelance',
      'orgOptions',
      'submissionStatuses',
      'submissionStatusData',
      'submissionInvoiceStatuses',
      'submissionInvoiceStatusData',
      'submissionTypeData'
    ])
  },
  data () {
    return {
      activeStatusFilter: 0,
      activeInvoiceStatusFilter: 0,
      activeSubmitterFilter: null,
      activeOrgFilter: null,
      sidebarFolded: false,
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
        ],
        body: [
          {
            status: 1,
            type: 1,
            invoiceStatus: 1,
            orderNum: 123456,
            submittedDate: '05/05/2020',
            submitter: 'สมควร สมสกุล',
            organization: 'ฟาร์มสมควร',
          },
          {
            status: 2,
            type: 1,
            invoiceStatus: 2,
            orderNum: 223344,
            submittedDate: '05/05/2020',
            submitter: 'สมควร สมสกุล',
            organization: 'ฟาร์มสมศรี',
          },
          {
            status: 3,
            type: 2,
            invoiceStatus: 3,
            orderNum: 787878,
            submittedDate: '05/05/2020',
            submitter: 'สมควร สมสกุล',
            organization: 'ฟาร์มสมปอง',
          },
          {
            status: 4,
            type: 1,
            invoiceStatus: 1,
            orderNum: 555555,
            submittedDate: '05/05/2020',
            submitter: 'สมควร สมสกุล',
            organization: 'ฟาร์มสมควร',
          },
        ],
      },
      submitterOptions: [
        { id: 1, name: 'สมควร สมสกุล' },
        { id: 2, name: 'สมเดช สมวงศ์สกุล' },
        { id: 3, name: 'สมศักดิ์ สมเดชา' },
        { id: 4, name: 'สมเกียรติ สมบุญชู' },
        { id: 5, name: 'สมชาย สมสุขสกุล' },
      ],
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

    }
  }
}
</script>

<style lang="scss" scoped>
#table-container {
  height: calc(100vh - #{$titlebar-height} - #{$footer-height} - 30px);
  padding-bottom: 1.5rem;
  padding-right: 1rem;
}
</style>