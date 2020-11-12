<template>
<div  v-if="auth"
      class="page page-lg"
      :class="auth.is_admin && 'py-0'"> 
  <div  class="d-flex"
        :class="auth.is_admin? 'content-height-with-subnav' : 'content-height'">
    <div  class="list-view border-r pr-4"
          :class="auth.is_admin? 'pt-4' : 'pt-0'">
      <h3 v-if="!auth.is_admin"
          class="mb-3">
        ฿ รายการ Invoice
      </h3>
      <SearchInput
        class="mb-2"
        placeholder="ค้นหา Invoice..."
        @search="set_search_query($event)" />
      <div class="d-flex mb-2">
        <button class="filter-btn btn btn-sm primary w-100"
                :class="{'active': active_invoice_status_filter === null}"
                :disabled="active_invoice_status_filter === null"
                @click="set_invoice_status_filter(null)">
          <i  v-if="active_invoice_status_filter === null"
              class="fas fa-check btn-inner-icon" />
          ทั้งหมด
        </button>
        <button v-for="filter of invoice_status_filters"
                :key="filter"
                class="filter-btn btn btn-sm w-100 ml-2 px-2"
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
        <div  key="list"
              class="scroll-container">
          <div class="fade-gradient-top"></div>
          <ul class="item-list font-chatthai">
            <router-link  :to="{
                            name: auth.is_admin? 'admin-invoice-list' : 'invoice-list',
                            params: { id: invoice.invoice_ID }
                          }"
                          tag="li"
                          v-for="invoice of invoice_mocks"
                          :key="invoice.invoice_ID"
                          class="clickable"
                          :class="{'active': $route.params.id == invoice.invoice_ID}">
              <div class="row no-gutters">
                <div class="col-7 d-flex align-items-center">
                  <h5>{{ invoice.invoice_ID }}</h5>
                </div>
                <div class="col">
                  <ColorTag
                    :label="invoice.invoice_status"
                    :color="invoice_status_colors[invoice.invoice_status]" />
                </div>
              </div>
            </router-link>
          </ul>
          <div class="fade-gradient-bottom"></div>
        </div>
        <!-- <div v-else key="loading" class="w-100 pt-5 text-center">
          <LoadingAnimation color="primary" size="lg" />
        </div> -->
      </transition>
  
    </div>
  
    <div class="w-100 scroll-container"
         :class="auth.is_admin? 'p-4' : 'px-4 pb-4'">
      <transition name="fade">
        <div v-if="selected_invoice">
          <div class="d-block d-lg-flex align-items-center mb-3">
            <h3 class="mr-3 d-block d-lg-inline-block mb-lg-0 mb-3">
              <i class="fas fa-file-invoice-dollar icon-lg mr-2"></i> {{ selected_invoice.invoice_ID }}
            </h3>
            <ColorTag
              class="d-block d-lg-inline-block"
              size="lg"
              :label="selected_invoice.invoice_status"
              :color="invoice_status_colors[selected_invoice.invoice_status]" />
          </div>
      
          <div class="font-chatthai">
            <div class="form-row border-b pb-4">
              <FileView
                class="col-6"
                label="ไฟล์ Invoice"
                icon-class="fas fa-file-invoice-dollar"
                file-name="INV0002.pdf" />
              <div class="w-100"></div>
              <FormDateInput
                class="col-6"
                label="วันที่ออก Invoice"
                format="dd/MM/yy"
                disabled
                :value="selected_invoice.invoice_date" />
              <div class="w-100"></div>
              <FormInput
                class="col-6"
                label="Invoice ไปที่"
                disabled
                :value="selected_invoice.invoice_to.name" />
              <div class="w-100"></div>
              <FormTextarea
                class="col-6"
                disabled
                :value="selected_invoice.invoice_to.address" />
            </div>

            <div class="form-row border-b py-4">
              <div class="col-2 text-right">
                <h1 class="text-primary">
                  {{ selected_invoice.submissions.length }}
                </h1>
                <h5 class="text-medium">การส่งตัวอย่าง</h5>
              </div>
              <div class="col-1 text-right nowrap pl-4">
                <h5 class="text-medium mt-2 ml-3">รวมเป็น</h5>
              </div>
              <div class="col-3 text-right pr-4">
                <h1 class="text-primary">
                  {{ to_display_price(selected_invoice.invoice_amount) }}
                </h1>
                <h5 class="text-medium">ค่าใช้จ่ายทั้งหมด</h5>
              </div>
            </div>

            <h4 class="font-cu mt-4 mb-2">
              <i class="fas fa-file-invoice mr-3"></i>การส่งตัวอย่างที่เกี่ยวข้อง
            </h4>
            <div class="form-row border-b pb-4">
              <div class="form-group col-12">
                <table>
                  <thead>
                    <tr>
                      <th class="nowrap"> 
                        หมายเลขการส่งตัวอย่าง
                        <div class="shadow-th" />
                      </th>
                      <th class="nowrap">
                        สถานะ
                        <div class="shadow-th" />
                      </th>
                      <th class="nowrap">
                        วันที่ส่ง
                        <div class="shadow-th" />
                      </th>
                      <th class="nowrap">
                        เจ้าของตัวอย่าง
                        <div class="shadow-th" />
                      </th>
                      <th class="nowrap">
                        ประเภทการทดสอบ
                        <div class="shadow-th" />
                      </th>
                    </tr>
                  </thead>
                  <tbody class="border-t">
                    <router-link  v-for="submission of selected_invoice.submissions"
                                  :key="submission"
                                  :to="{ 
                                      name: 'view-submission',
                                      params: { id: submission }
                                  }"
                                  tag="tr"
                                  class="nowrap clickable">
                      <td class="py-1 nowrap">
                        {{ submission }}
                      </td>
                      <td class="py-1 nowrap">
                        <!-- <ColorTag
                          :label="contact.contact_type"
                          :color="contact_type_colors[contact.contact_type]" /> -->
                      </td>
                      <td class="py-1 pre-line squeeze-line small-font">
                      </td>
                      <td class="py-1 nowrap">
                      </td>
                      <td class="py-1 pre-line squeeze-line small-font">
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
</div>
</template>

<script>
import { get_jwt } from '@/vue-apollo'
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
      invoice_mocks: [
        { invoice_ID: 'INV00001', invoice_status: 'รอการชำระเงิน',  invoice_amount: 45000, submissions: [1,2,3,4]},
        { invoice_ID: 'INV00002', invoice_status: 'รอการชำระเงิน',  invoice_amount: 45000, submissions: [1,2,3,4]},
        { invoice_ID: 'INV00003', invoice_status: 'ชำระเงินแล้ว',    invoice_amount: 45000, submissions: [1,2,3,4]},
        { invoice_ID: 'INV00004', invoice_status: 'รอการชำระเงิน',  invoice_amount: 45000, submissions: [1,2,3,4]},
        { invoice_ID: 'INV00005', invoice_status: 'ชำระเงินแล้ว',    invoice_amount: 45000, submissions: [1,2,3,4]},
        { invoice_ID: 'INV00006', invoice_status: 'รอการชำระเงิน',  invoice_amount: 45000, submissions: [1,2,3,4]},
      ],
      selected_invoice: {
        invoice_ID: 'INV00002',
        invoice_status: 'รอการชำระเงิน',
        invoice_amount: 45000,
        invoice_date: new Date(),
        invoice_to: {
          name: 'นาย สมควร สมสกุล',
          address: '333 ถนนสมควร\nแขวงสมควร เขตสมควร\nกรุงเทพฯ 33333'
        },
        submissions: [1,2,3,4]}
    }
  },
  methods: {
    set_invoice_status_filter (filter) {
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
    invoiceList: {
      query: INVOICE_LIST,
      variables () {
        return {
          jwt: get_jwt(),
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
          jwt: get_jwt(),
          invoice_ID: this.$route.params.id
        }
      },
      update: data => data.search_invoice.result[0],
      skip () {
        return !this.$route.params.id
      }
    }
  }
}
</script>