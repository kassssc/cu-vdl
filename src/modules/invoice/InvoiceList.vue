<template>
<div  v-if="auth"
      class="page page-lg d-flex position-relative"
      :class="auth.is_admin && 'py-0'"> 
  <div  class="list-view border-r pr-4 py-4"
        :class="auth.is_admin?
          'content-height-with-subnav list-sticky' :
          'content-height list-sticky-no-subnav'
        ">
    <h3 v-if="!auth.is_admin"
        class="mb-3">
      ฿ รายการ Invoice
    </h3>
    <SearchInput
      class="mb-2"
      placeholder="ค้นหา Invoice..."
      @search="set_search_query($event)" />
    <div class="d-flex mb-2">
      <button class="filter-btn filter-btn-sm btn btn-sm primary w-100"
              :class="{'active': active_invoice_status_filter === null}"
              :disabled="active_invoice_status_filter === null"
              @click="set_invoice_status_filter(null)">
        <i  v-if="active_invoice_status_filter === null"
            class="fas fa-check btn-inner-icon" />
        ทั้งหมด
      </button>
      <button v-for="filter of invoice_status_filters"
              :key="filter"
              class="filter-btn filter-btn-sm btn btn-sm w-100 ml-2 px-2"
              :class="[
                invoice_status_colors[filter],
                {'active': active_invoice_status_filter === filter}
              ]"
              :disabled="active_invoice_status_filter === filter"
              @click="set_invoice_status_filter(filter)">
        <i  v-if="active_invoice_status_filter === filter"
            class="fas fa-check btn-inner-icon" />
        <div  v-else
              class="small-square mr-1"
              :class="invoice_status_colors[filter]" />
        {{ filter }}
      </button>
    </div>

    <transition name="fade">
      <div  v-if="!loading && invoice_list"
            key="list"
            class="scroll-container">
        <div class="fade-gradient-top"></div>
        <ul v-if="invoice_list.length > 0"
            class="item-list font-chatthai">
          <router-link  :to="{
                          name: auth.is_admin? 'admin-invoice-list' : 'invoice-list',
                          params: { id: invoice.invoice_no }
                        }"
                        tag="li"
                        v-for="invoice of invoice_list"
                        :key="invoice.invoice_no"
                        class="clickable"
                        :class="{'active': $route.params.id == invoice.invoice_no}">
            <div class="row no-gutters">
              <div class="col-7 d-flex align-items-center">
                <h5>{{ invoice.invoice_no }}</h5>
              </div>
              <div class="col">
                <ColorTag
                  :label="invoice.invoice_status"
                  :color="invoice_status_colors[invoice.invoice_status]" />
              </div>
            </div>
          </router-link>
        </ul>
        <div v-else class="w-100 py-3 text-center border-b border-t">
          <h5 class="text-muted">
            <i class="far fa-frown mr-2"></i>ไม่มี Invoice ที่จะแสดง
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
  
  <div class="w-100 scroll-container p-4">
    <transition name="fade">
      <div v-if="selected_invoice">
        <div class="d-block d-md-flex align-items-center mb-3">
          <h3 class="mr-3 d-block d-md-inline-block mb-md-0 mb-3">
            <i class="fas fa-file-invoice-dollar icon-lg"></i> {{ selected_invoice.invoice_no }}
          </h3>
          <ColorTag
            class="d-block d-md-inline-block"
            size="lg"
            :label="selected_invoice.invoice_status"
            :color="invoice_status_colors[selected_invoice.invoice_status]" />
        </div>
    
        <div class="font-chatthai">
          <div class="form-row border-b pb-4">
            <FileView
              class="col-12 col-md-6"
              label="ไฟล์ Invoice"
              icon-class="fas fa-file-invoice-dollar"
              :file="selected_invoice.invoice_file" />
            <div class="w-100"></div>
            <FormDateInput
              class="col-12 col-md-6"
              label="วันที่ออก Invoice"
              format="dd/MM/yy"
              disabled
              :value="to_date_object(selected_invoice.invoice_date)" />
            <div class="w-100"></div>
            <FormInput
              class="col-12 col-md-6 mb-2"
              label="Invoice ไปที่"
              disabled
              :value="selected_invoice.invoice_to.name" />
            <div class="w-100"></div>
            <FormTextarea
              class="col-12 col-md-6"
              disabled
              :value="selected_invoice.invoice_to.address" />
            <div class="w-100"></div>
            <div class="form-group col-12 mt-3 pl-3">
              <h5>
                <i  v-if="selected_invoice.mail_invoice"
                    class="fas fa-check icon-md text-primary mr-1" />
                <i  v-else
                    class="fas fa-times icon-md text-danger mr-1" />
                ส่งใบ Invoice ทางไปรษณีย์
              </h5>
            </div>
          </div>

          <div class="form-row border-b py-4">
            <div class="col-12 col-md-6">
              <div class="row no-gutters">
                <template v-if="selected_invoice.submissions.length > 1">
                  <div class="col-4 text-right">
                    <h1 class="text-primary">
                      {{ selected_invoice.submissions.length }}
                    </h1>
                    <h5 class="text-medium nowrap">การส่งตัวอย่าง</h5>
                  </div>
                  <div class="col-2 text-right nowrap pl-4">
                    <h5 class="text-medium mt-2 ml-3">รวมเป็น</h5>
                  </div>
                </template>
                <div v-else class="col"></div>
                <div class="col-6 text-right pr-3">
                  <h1 class="text-primary">
                    {{ to_display_price(selected_invoice.invoice_amount) }}
                  </h1>
                  <h5 class="text-medium">ค่าใช้จ่ายทั้งหมด</h5>
                </div>
              </div>
            </div>
          </div>

          <h4 class="font-cu mt-4 mb-3">
            <i class="fas fa-file-invoice mr-3"></i>การส่งตัวอย่างที่เกี่ยวข้อง
          </h4>
          <div class="form-row border-b pb-4">
            <div class="form-group col-12">
              <table class="small-font">
                <thead>
                  <tr>
                    <th>หมายเลข</th>
                    <th>สถานะ</th>
                    <th>วันที่ส่ง</th>
                    <th v-if="auth.is_admin">ผู้ส่งตัวอย่าง</th>
                    <th v-else>เจ้าของตัวอย่าง</th>
                    <th>ประเภทการทดสอบ</th>
                  </tr>
                </thead>
                <tbody class="border-t">
                  <router-link  v-for="submission of selected_invoice.submissions"
                                :key="submission.BestLIMS_key"
                                :to="{ 
                                    name: 'view-submission',
                                    params: { id: submission.BestLIMS_key }
                                }"
                                tag="tr"
                                class="clickable">
                    <td>
                      {{ submission.BestLIMS_key }}
                    </td>
                    <td>
                      <ColorTag
                        :color="submission_status_colors[submission.submission_status]"
                        :label="submission.submission_status" />
                    </td>
                    <td>
                      {{ to_display_date(submission.submission_submit_date) }}
                    </td>
                    <td v-if="auth.is_admin" class="py-2 nowrap">
                      {{ submission.on_sent_record_submitter_name }}
                    </td>
                    <td v-else>
                      {{ submission.on_sent_record_owner_name }}
                    </td>
                    <td>
                      <ColorTag
                        :color="submission_type_colors[submission.submission_type]"
                        :label="submission.submission_type" />
                    </td>
                  </router-link>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
import { AUTH_DATA } from '@/graphql/local'
import { INVOICE_LIST, INVOICE_DETAIL } from '@/graphql/invoice'

export default {
  name: 'admin-invoice-list',
  data () {
    return {
      search_query: '',
      loading: true,
      active_invoice_status_filter: null,
      invoice_status_filters: [
        'รอการชำระเงิน',
        'ชำระเงินแล้ว'
      ],
      invoice_status_colors: {
        'รอการชำระเงิน': 'yellow',
        'ชำระเงินแล้ว': 'green',
      },
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
      /* invoice_mocks: [
        { invoice_no: 'INV00001', invoice_status: 'รอการชำระเงิน',  invoice_amount: 45000, submissions: [1,2,3,4]},
        { invoice_no: 'INV00002', invoice_status: 'รอการชำระเงิน',  invoice_amount: 45000, submissions: [1,2,3,4]},
        { invoice_no: 'INV00003', invoice_status: 'ชำระเงินแล้ว',    invoice_amount: 45000, submissions: [1,2,3,4]},
        { invoice_no: 'INV00004', invoice_status: 'รอการชำระเงิน',  invoice_amount: 45000, submissions: [1,2,3,4]},
        { invoice_no: 'INV00005', invoice_status: 'ชำระเงินแล้ว',    invoice_amount: 45000, submissions: [1,2,3,4]},
        { invoice_no: 'INV00006', invoice_status: 'รอการชำระเงิน',  invoice_amount: 45000, submissions: [1,2,3,4]},
      ],
      selected_invoice: {
        invoice_no: 'INV00002',
        invoice_status: 'รอการชำระเงิน',
        invoice_amount: 45000,
        invoice_date: new Date(),
        invoice_to: {
          name: 'นาย สมควร สมสกุล',
          address: '333 ถนนสมควร\nแขวงสมควร เขตสมควร\nกรุงเทพฯ 33333'
        },
        submissions: [1,2,3,4]} */
    }
  },
  methods: {
    set_invoice_status_filter (filter) {
      this.loading = true
      this.active_invoice_status_filter = filter
    },
    set_search_query (query) {
      this.loading = true
      this.search_query = query
    }
  },
  apollo: {
    auth: {
      query: AUTH_DATA,
      update: data => data.auth
    },
    invoice_list: {
      query: INVOICE_LIST,
      variables () {
        return {
          search_query: this.search_query,
          invoice_status: this.active_invoice_status_filter
        }
      },
      debounce: 200,
      update: data => data.search_invoice.result,
      result () {
        this.$nextTick( () => this.loading = false )
      }
    },
    selected_invoice: {
      query: INVOICE_DETAIL,
      variables () {
        return {
          invoice_no: this.$route.params.id
        }
      },
      update: data => data.get_invoice.result,
      skip () {
        return !this.$route.params.id
      }
    }
  }
}
</script>