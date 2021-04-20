<template>                                                            
<div  v-if="auth"
      class="page page-xxl d-flex flex-column align-items-center position-relative">
  <div class="row no-gutters w-100 pb-3 pt-1">
    <div class="col-3">
      <FormSelect
        class="mb-0"
        form-label="กรองโดยบุคคล/องค์กรที่เกี่ยวข้อง"
        label-class="label-sm"
        label="name"
        placeholder="ค้นหา บุคคล/องค์กร..."
        :reduce="o => o.index"
        :options="contact_list"
        :value="parseInt($route.query.contact)"
        @input="apply_contact_filter($event)" />
    </div>
    <div class="col pl-4 form-group mb-0">
      <label class="label-sm">สถานะการส่งตัวอย่าง</label>
      <div class="d-flex align-items-end">
        <button  class="filter-btn btn primary"
                      :class="{'active': !$route.query.status}"
                      :disabled="loading || !$route.query.status"
                      @click="apply_status_filter(null)">
          <i  v-if="!$route.query.status"
              class="fas fa-check btn-inner-icon" />
          <div v-else class="small-square mr-1" />
          ทั้งหมด
        </button>
        <button v-for="filter of submission_statuses"
                :key="filter"
                class="filter-btn btn ml-2"
                :class="[
                  submission_status_colors[filter],
                  {'active': $route.query.status === filter}
                ]"
                :disabled="loading || $route.query.status === filter"
                @click="apply_status_filter(filter)">
          <i  v-if="$route.query.status === filter"
              class="fas fa-check btn-inner-icon" />
          <div  v-else
                class="small-square mr-1"
                :class="submission_status_colors[filter]" />
          {{ filter }}
        </button>
      </div>
    </div>
    <div class="col-3 d-flex align-items-end">
      <SearchInput
        class="w-100"
        placeholder="ค้นหา..."
        :initial-query="$route.query.query"
        @search="loading = true"
        @debounced-search="apply_search_query($event)" />
    </div>
  </div>
  <div class="table-height w-100">
    <transition name="fade">
      <div  v-if="!loading"
            key="list">
        <transition name="fade">
          <div  v-if="submissions && submissions.result.length > 0"
                class="w-100 pr-2 table-height scroll-container">
            <table  class="small-font">
              <thead>
                <tr>
                  <th>
                    หมายเลข<div class="shadow-th" /><div class="border-top-th" />
                  </th>
                  <th>
                    สถานะ<div class="shadow-th" /><div class="border-top-th" />
                  </th>
                  <th>
                    สถานะ Invoice<div class="shadow-th" /><div class="border-top-th" />
                  </th>
                  <th>
                    วันที่ส่ง<div class="shadow-th" /><div class="border-top-th" />
                  </th>
                  <th v-if="auth.is_admin">
                    ผู้ส่งตัวอย่าง<div class="shadow-th" /><div class="border-top-th" />
                  </th>
                  <th>
                    เจ้าของตัวอย่าง<div class="shadow-th" /><div class="border-top-th" />
                  </th>
                  <th>
                    Invoice ไปที่<div class="shadow-th" /><div class="border-top-th" />
                  </th>
                  <th>
                    ประเภทการทดสอบ<div class="shadow-th" /><div class="border-top-th" />
                  </th>
                  <th>
                    Reports<div class="shadow-th" /><div class="border-top-th" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <router-link  :to="{
                                name: 'view-submission',
                                params: { id: resolve_key(submission) }
                              }"
                              tag="tr"
                              class="clickable"
                              v-for="submission of submissions.result"
                              :key="submission.backend_key">
                  <td class="limit-width">
                    <div class="my-1">{{ resolve_key(submission) }}</div>
                  </td>
                  <td class="limit-width">
                    <ColorTag
                      :color="submission_status_colors[submission.submission_status]"
                      :label="submission.submission_status" />
                  </td>
                  <td class="limit-width">
                    <ColorTag
                      :color="submission.invoice? invoice_status_colors[submission.invoice.invoice_status] : 'grey'"
                      :label="submission.invoice? submission.invoice.invoice_status : 'ยังไม่ออก Invoice'" />
                  </td>
                  <td class="limit-width">
                    {{ to_display_date(submission.submission_submit_date) }}
                  </td> 
                  <td v-if="auth.is_admin" class="limit-width">
                    {{ submission.submitter.name }}
                  </td>
                  <td class="limit-width">
                    {{ submission.sample_owner.name }}
                  </td>
                  <td class="limit-width">
                    {{ submission.invoice_to.name }}
                  </td>
                  <td class="limit-width">
                    <ColorTag
                      :color="submission_type_colors[submission.submission_type]"
                      :label="submission.submission_type" />
                  </td>
                  <td class="text-center limit-width">
                    <h5>{{ submission.reports.length > 0? submission.reports.length : '-' }}</h5>
                  </td>
                </router-link>
              </tbody>
            </table>
            <div class="fade-gradient-bottom" />
          </div>
          <div v-else class="w-100 py-4 border-b border-t text-center">
            <h5 class="text-muted">
              <i class="far fa-frown mr-2"></i>ไม่มี Submission ที่จะแสดง
            </h5>
          </div>
        </transition>
      </div>
      <div  v-else
            key="loading"
            class="w-100 py-5 text-center">
        <LoadingAnimation color="primary" size="lg" />
      </div>
    </transition>
  </div>

  <nav  v-if="page_count > 1"
        class="d-flex align-items-center mt-4">
    <ul v-if="page_count >= 5"
        class="pagination mr-3">
      <li class="page-item">
        <button class="page-link double-arrow"
                :disabled="curr_page <= 1"
                @click="go_to_page(1)">
          <i class="fas fa-angle-double-left"></i>
        </button>
      </li>
    </ul>
    <ul class="pagination">
      <li class="page-item">
        <button class="page-link arrow"
                :disabled="curr_page <= 1"
                @click="prev_page()">
          <i class="fas fa-chevron-left"></i>
        </button>
      </li>
      <li v-for="page of pages"
          :key="page"
          class="page-item">
        <button class="page-link number"
                :disabled="$route.query.page == page || (page == 1 && !$route.query.page)"
                @click="go_to_page(page)">
          {{ page }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link arrow"
                :disabled="curr_page >= page_count"
                @click="next_page()">
          <i class="fas fa-chevron-right"></i>
        </button>
      </li>
    </ul>
    <ul v-if="page_count >= 5" class="pagination ml-3">
      <li class="page-item">
        <button class="page-link double-arrow"
                :disabled="curr_page >= page_count"
                @click="go_to_page(page_count)">
          <i class="fas fa-angle-double-right"></i>
        </button>
      </li>
    </ul>
  </nav>

</div>  
</template>

<script>
import { AUTH_DATA } from '@/graphql/local'
import { SUBMISSION_LIST } from '@/graphql/submission'
import { USER_DETAIL } from '@/graphql/user'
import { CONTACTS_LIST } from '@/graphql/contact'

export default {
  name: 'submissions-list',
  computed: {
    contact_list () {
      if (this.auth.is_admin) {
        return this.all_contacts
      } else if (this.user_detail) {
        return [ ...this.user_detail.contact_list, this.user_detail.default_contact ]
      }
      return []
    },
    pages () {
      const pages = []
      if (this.curr_page <= 7) {
        for (let i = 1; i <= this.page_count && i <= 15; i++) {
          pages.push(i)
        }
      } else if (this.curr_page >= this.page_count - 7) {
        for (let i = this.page_count; i > this.page_count - 15; i--) {
          pages.unshift(i)
        }
      } else {
        for (let i = this.curr_page - 7; i <= this.curr_page + 7; i++) {
          pages.push(i)
        }
      }
      return pages
    },
    page_count () {
      if (!this.submissions) return 1
      return Math.ceil(this.submissions.filtered_submission_count / this.submissions_per_page)
    },
    curr_page () {
      if (!this.$route.query.page) {
        return 1
      }
      return parseInt(this.$route.query.page)
    }
  },
  data () {
    return {
      loading: true,
      submissions_per_page: 20,
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
    apply_status_filter (status) {
      this.loading = true
      this.$router.push({
        name: 'submissions-list',
        query: {
          ...(this.$route.query.contact && { contact: this.$route.query.contact }),
          ...(this.$route.query.query && { query: this.$route.query.query }),
          ...(status && { status }),
        }
      })
    },
    apply_contact_filter (contact) {
      this.loading = true
      this.$router.push({
        name: 'submissions-list',
        query: {
          ...(this.$route.query.status && { status: this.$route.query.status }),
          ...(this.$route.query.query && { query: this.$route.query.query }),
          ...(contact && { contact }),
        }
      })
    },
    apply_search_query (query) {
      if (query == this.$route.query.query) {
        this.loading = false
      } else {
        this.$router.push({
          name: 'submissions-list',
          query: {
            ...(this.$route.query.status && { status: this.$route.query.status }),
            ...(this.$route.query.contact && { contact: this.$route.query.contact }),
            ...(query && { query }),
          }
        })
      }
    },
    go_to_page (page) {
      this.loading = true
      this.$router.push({
        name: 'submissions-list',
        query: {
          ...(this.$route.query.status && { status: this.$route.query.status }),
          ...(this.$route.query.contact && { contact: this.$route.query.contact }),
          ...(this.$route.query.query && { query: this.$route.query.query }),
          page
        }
      })
    },
    prev_page () {
      this.loading = true
      this.$router.push({
        name: 'submissions-list',
        query: {
          ...(this.$route.query.status && { status: this.$route.query.status }),
          ...(this.$route.query.contact && { contact: this.$route.query.contact }),
          ...(this.$route.query.query && { query: this.$route.query.query }),
          page: this.curr_page - 1
        }
      })
    },
    next_page () {
      this.loading = true
      this.$router.push({
        name: 'submissions-list',
        query: {
          ...(this.$route.query.status && { status: this.$route.query.status }),
          ...(this.$route.query.contact && { contact: this.$route.query.contact }),
          ...(this.$route.query.query && { query: this.$route.query.query }),
          page: this.curr_page + 1
        }
      })
    },
  },
  apollo: {
    auth: {
      query: AUTH_DATA,
      update: data => data.auth,
    },
    user_detail: {
      query: USER_DETAIL,
      update: data => data.get_backuser.result
    },
    submissions: {
      query: SUBMISSION_LIST,
      variables () {
        return {
          search_query: this.$route.query.query ?? null,
          contact: parseInt(this.$route.query.contact) ?? null,
          submission_status: this.$route.query.status ?? null,
          page_number: this.curr_page ?? 1,
          n_per_page: this.submissions_per_page,
        }
      },
      update: data => data.search_submission,
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
.table-height {
  height: calc(100vh - #{$titlebar-height} - 130px);
}
.filters {
  position: sticky;
  top: $titlebar-height-scrolled;
}
</style>