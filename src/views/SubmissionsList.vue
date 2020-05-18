<template>                                                            
<div class="page d-flex align-items-start">
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
          :reduce="option => option.id "
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
                  submissionStatusCSS[filter.id],
                  {'active': activeStatusFilter === filter.id}
                ]"
                @click="filterByStatus(filter.id)">
          <i  v-if="activeStatusFilter === filter.id"
              class="fas fa-check btn-inner-icon" />
          <div  v-else
                class="small-square mr-1"
                :class="submissionStatusCSS[filter.id]" />
          {{ filter.name }}
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
                  submissionInvoiceStatusCSS[filter.id],
                  {'active': activeInvoiceStatusFilter === filter.id}
                ]"
                @click="filterByInvoiceStatus(filter.id)">
          <i  v-if="activeInvoiceStatusFilter === filter.id"
            class="fas fa-check btn-inner-icon" />
          <div  v-else
                class="small-square mr-1"
                :class="submissionInvoiceStatusCSS[filter.id]" />
          {{ filter.name }}
        </button>
      </div>
    </div>
  </div>

  <div class="submission-list pl-4 border-left-lighter">
    <!-- <div class="row no-gutters w-100">
      <div class="col-8">
        <h2>ติดตามผลและรายงาน</h2>
      </div>
      <SearchInput
        class="col-4"
        placeholder="ค้นหาด้วยหมายเลขการส่ง..."
        @debounced-search="search($event)" />
    </div> -->
    <div id="table-container" class="scroll-container">
      <table>
        <thead id="table-header">
          <tr>
            <th v-for="(col, idx) in table.head"
                :key="idx"
                class="p-0">
              <button class="btn btn-transparent sort-btn"
                      :class="{'selected': sortField === idx}"
                      @click="setSortField(idx)">
                {{ col }}
                <i class="fas fa-chevron-down icon-sm"
                   :class="{
                      'rotate': sortDirection === 1 && sortField === idx,
                      'show': sortField === idx
                   }"/>
              </button>
              <div class="shadow-th"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <router-link  :to="{name: 'viewsubmission', params: { id: row.orderNum }}"
                        tag="tr"
                        class="clickable"
                        v-for="(row, idx) in [...table.body, ...table.body, ...table.body, ...table.body, ...table.body]"
                        :key="idx">
            <td>
              <div  class="light-tag"
                    :class="submissionStatusCSS[row.status]">
                <div  class="small-square mr-1"
                      :class="submissionStatusCSS[row.status]" />
                {{ row.statusDisplay }}
              </div>
            </td>
            <td>
              <div  class="light-tag"
                    :class="submissionInvoiceStatusCSS[row.invoiceStatus]">
                <div  class="small-square mr-1"
                      :class="submissionInvoiceStatusCSS[row.invoiceStatus]" />
                {{ row.invoiceStatusDisplay }}
              </div>
            </td>
            <td>{{ row.orderNum }}</td>
            <td>{{ row.submittedDate }}</td>
            <td>{{ row.receiptNum }}</td>
            <td>{{ row.receivedDate }}</td>
            <td>{{ row.person }}</td>
            <td>{{ row.organization }}</td>
            <td>
              <button class="btn btn-transparent btn-icon"
                      @click="e => e.stopPropagation()">
                <i class="fas fa-file-download"></i>
              </button>
            </td>
            <!-- <td>
              <button class="btn btn-transparent download"
                      @click="e => e.stopPropagation()">
                <i class="fas fa-file-download"></i>
              </button>
            </td> -->
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
      'submissionInvoiceStatuses'
    ])
  },
  data () {
    return {
      sortField: 2,
      sortDirection: 0,
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
          'เลขที่รับ',
          'วันที่รับ',
          'ผู้จัดส่ง',
          'องค์กร',
          'ใบส่งตัวอย่าง',
        ],
        body: [
          {
            status: 1,
            statusDisplay: 'ส่งแล้ว',
            invoiceStatus: 1,
            invoiceStatusDisplay: 'ยังไม่ออก Invoice',
            orderNum: 123456,
            submittedDate: '05/05/2020',
            receiptNum: 654321,
            receivedDate: '-',
            person: 'สมควร สมสกุล',
            organization: 'ฟาร์มสมควร',
            sampleQuantity: 40,
            price: 2000,
            submissionForm: 'https://backend/path-to-form',
            report: 'https://backend/path-to-report'
          },
          {
            status: 2,
            statusDisplay: 'ได้รับแล้ว',
            invoiceStatus: 2,
            invoiceStatusDisplay: 'ออก Invoice แล้ว',
            orderNum: 223344,
            submittedDate: '05/05/2020',
            receiptNum: 654321,
            receivedDate: '06/06/2020',
            person: 'สมควร สมสกุล',
            organization: 'ฟาร์มสมศรี',
            sampleQuantity: 40,
            price: 2000,
            submissionForm: 'https://backend/path-to-form',
            report: 'https://backend/path-to-report'
          },
          {
            status: 3,
            statusDisplay: 'เสร็จสิ้น',
            invoiceStatus: 3,
            invoiceStatusDisplay: 'ชำระค่าบริการแล้ว',
            orderNum: 787878,
            submittedDate: '05/05/2020',
            receiptNum: 654321,
            receivedDate: '06/06/2020',
            person: 'สมควร สมสกุล',
            organization: 'ฟาร์มสมปอง',
            sampleQuantity: 40,
            price: 2000,
            submissionForm: 'https://backend/path-to-form',
            report: 'https://backend/path-to-report'
          },
          {
            status: 4,
            statusDisplay: 'ยกเลิก',
            invoiceStatus: 1,
            invoiceStatusDisplay: 'ยังไม่ออก Invoice',
            orderNum: 555555,
            submittedDate: '05/05/2020',
            receiptNum: 654321,
            receivedDate: '06/06/2020',
            person: 'สมควร สมสกุล',
            organization: 'ฟาร์มสมควร',
            sampleQuantity: 40,
            price: 2000,
            submissionForm: 'https://backend/path-to-form',
            report: 'https://backend/path-to-report'
          },
        ],
      },
      submissionStatusCSS: {
        1: 'grey',
        2: 'orange',
        3: 'green',
        4: 'red'
      },
      submissionInvoiceStatusCSS: {
        1: 'grey',
        2: 'orange',
        3: 'green',
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
    setSortField (idx) {
      if (idx === this.sortField) {
        this.sortDirection = this.sortDirection === 0? 1 : 0
      } else {
        this.sortField = idx
        this.sortDirection = 0
      }
    },
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
    }
  }
}
</script>

<style lang="scss" scoped>
.submission-list {
  flex-grow: 100;
}
button.sort-btn {
  padding: .1em .4em 0 .4em;
  font-size: 1em;
  &.selected {
    color: $primary;
    background: $accent;
  }
  &:hover i { opacity: 1; }
  i {
    opacity: 0; 
    transition: transform 100ms ease-in-out;
    &.show { opacity: 1; }
  }
}
#table-container {
  height: calc(100vh - #{$titlebar-height} - #{$footer-height});
  position: relative;
}
</style>