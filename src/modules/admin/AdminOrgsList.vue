<template>
<div class="d-flex">
  <div class="list-view sub-nav-content content-height">
    <h3 class="mb-3">
      <i class="fas fa-sitemap icon-lg mr-1" />
      รายการ องค์กร
    </h3>
    <SearchInput class="mb-2" @search="setSearchQuery($event)" />
    <div class="d-flex mb-2">
      <button class="filter-btn btn btn-sm primary w-100"
              :class="{'active': activeOrgTypeFilter === null}"
              :disabled="loading || activeOrgTypeFilter === null"
              @click="setOrgTypeFilter(null)">
        <i  v-if="activeOrgTypeFilter === null"
            class="fas fa-check btn-inner-icon" />
        ทั้งหมด
      </button>
      <button v-for="filter of orgTypeFilters"
              :key="filter.id"
              class="filter-btn btn btn-sm w-100 ml-2 px-2"
              :class="[
                orgTypeCSS[filter.id],
                {'active': activeOrgTypeFilter === filter.id}
              ]"
              :disabled="loading || activeOrgTypeFilter === filter.id"
              @click="setOrgTypeFilter(filter.id)">
        <i  v-if="activeOrgTypeFilter === filter.id"
            class="fas fa-check btn-inner-icon" />
        <div  v-else
              class="small-square mr-1"
              :class="orgTypeCSS[filter.id]" />
        {{ filter.name }}
      </button>
    </div>

    <transition name="fade">
      <div  v-if="!loading"
            key="list"
            class="scroll-container">
        <div class="fade-gradient-top"></div>
        <ul class="item-list font-chatthai">
          <router-link  :to="{
                          name: 'admin-orgs-list',
                          params: { id: org.index }
                        }"
                        tag="li"
                        v-for="org of orgs"
                        :key="org.index"
                        class="clickable"
                        :class="{'active': $route.params.id == org.index}">
            <div class="row no-gutters">
              <div class="col-8 d-flex align-items-center">
                <h4>{{ org.name }}</h4>
              </div>
              <div class="col-4">
                <ColorTag
                  :label="orgTypeLabel[org.org_type]"
                  :color="orgTypeCSS[org.org_type]" />
              </div>
            </div>
          </router-link>
        </ul>
        <div class="fade-gradient-bottom"></div>
      </div>
      <div v-else key="loading" class="w-100 pt-5 text-center">
        <LoadingAnimation color="primary" size="lg" />
      </div>
    </transition>

  </div>

  <div class="col-7 sub-nav-content content-height d-flex flex-column">
    <transition name="fade">
      <div v-if="selectedOrg">
        <div class="d-block d-lg-flex align-items-center mb-3">
          <h3 class="mr-3 d-block d-lg-inline-block mb-lg-0 mb-3">{{ selectedOrg.name }}</h3>
          <ColorTag
            class="d-block d-lg-inline-block"
            size="lg"
            :label="orgTypeLabel[selectedOrg.org_type]"
            :color="orgTypeCSS[selectedOrg.org_type]" />
        </div>
    
        <div class="font-chatthai">
          <div class="form-row border-b pb-3">
            <FormTextarea
              class="col-12 col-lg-6"
              label="ที่อยู่"
              rows="3"
              disabled
              :value="selectedOrg.address" />
            <div class="col-12 col-lg-6">
              <div class="form-row">
                <FileView
                  class="col-12 mb-2"
                  btn-class="btn-sm btn-secondary"
                  label="ภ.พ.20"
                  file-name="ภพ20.pdf"
                  icon-class="fa-file-alt" />
                <FileView
                  class="col-12"
                  btn-class="btn-sm btn-secondary"
                  label="ใบจดทะเบียนบริษัท"
                  file-name="registration.pdf"
                  icon-class="fa-file-alt" />
              </div>
            </div>
          </div>
        </div>
    
        <div  v-if="selectedOrg.submitters.length > 0"
              class="font-chatthai scroll-container mt-3 pr-2">
          <table>
            <thead>
              <tr>
                <th class="w-100"> 
                  รายชื่อตัวแทนส่งตัวอย่าง
                  <div class="shadow-th" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="submitter of selectedOrg.submitters"
                  :key="submitter.index">
                <router-link  :to="{
                                name: 'admin-users-list',
                                params: { id: submitter.index }
                              }"
                              tag="td"
                              class="nowrap clickable py-1">
                  {{ `${submitter.title}${submitter.first_name} ${submitter.last_name}` }}
                </router-link>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="mt-3">
          <h4 class="font-chatthai text-medium">
            ยังไม่มีตัวแทนส่งตัวอย่าง<i class="far fa-frown ml-2 vertical-align-middle"></i>
          </h4>
        </div>
      </div>
    </transition>

  </div>

  <Modal  modal-id="removeSubmitterModal"
          x-close>
    <template #modal-header>
      <h3 class="text-danger">
        <i class="fas fa-exclamation-triangle icon-lg mr-2" />ยืนยันว่าถอนสิทธิในการเป็นตัวแทน
      </h3>
    </template>
    <template #modal-body>
      <h4 class="my-2">
        ท่านกำลังจะถอนสิทธิของ <span class="text-danger">{{ 'yyy' }}</span>
        จากการเป็นตัวแทนส่งตัวอย่างให้ <span class="text-danger">{{ 'xxx' }}</span>
      </h4>
    </template>
    <template #modal-footer>
      <div class="d-flex flex-nowrap w-100">
        <button type="button" class="btn btn-secondary w-50" data-dismiss="modal">
          ยกเลิก
        </button>
        <button type="button" class="btn btn-danger ml-2 w-100"
                @click="submitRemoveSubmissionPermission()">
          ยืนยันว่าจะถอนสิทธิ
        </button>
      </div>
    </template>
  </Modal>

</div>
</template>

<script>
import $ from 'jquery'
import { getJWT } from '@/vue-apollo'
import { ORGS_LIST, ORG_DETAIL } from '@/graphql/org'
import { USER_UPDATE_SUBMISSION_PERMISSION } from '@/graphql/user'

export default {
  name: 'admin-orgs-list',
  data () {
    return {
      searchQuery: '',
      loading: true,
      activeOrgTypeFilter: null,
      userToRemove: null,
      orgTypeFilters: [
        { id: 1, name: 'ฟาร์ม'},
        { id: 2, name: 'บริษัทสัตวแพทย์'}
      ],
      orgTypeCSS: {
        1: 'orange',
        2: 'red'
      },
      orgTypeLabel: {
        1: 'ฟาร์ม',
        2: 'บริษัทสัตวแพทย์'
      }
    }
  },
  methods: {
    setSearchQuery (query) {
      this.loading = true
      this.searchQuery = query
    },
    setOrgTypeFilter (filter) {
      this.activeOrgTypeFilter = filter
      this.loading = true
      if (this.$route.params.id) {
        this.$router.push({ name: 'admin-orgs-list' })
      }
    },
    async submitRemoveSubmissionPermission () {
      try {
        const submitterOf = this.submitterOfIndices.filter(
          index => index !== this.org.index
        )
        let res = this.$apollo.mutate({
          mutation: USER_UPDATE_SUBMISSION_PERMISSION,
          variables: {
            jwt: getJWT(),
            index: this.userToRemove,
            submitterOf
          }
        })
        await this.$apollo.queries.orgs.refetch()
        this.userToRemove = null
        $('#removeSubmitterModal').modal('hide')
      } catch (err) {
        console.log(err)
      }
    },
    showRemoveSubmitterModal (userIndex) {
      this.userToRemove = userIndex
      $('#removeSubmitterModal').modal('show')
    }
  },
  apollo: {
    orgs: {
      query: ORGS_LIST,
      variables () {
        return {
          jwt: getJWT(),
          searchQuery: this.searchQuery,
          orgType: this.activeOrgTypeFilter
        }
      },
      update: data => data.search_org.result,
      debounce: 500,
      result () {
        this.$nextTick( () => this.loading = false )
      }
    },
    selectedOrg: {
      query: ORG_DETAIL,
      variables () {
        return { 
          jwt: getJWT(),
          index: [parseInt(this.$route.params.id)],
        }
      },
      update: data => data.get_org.result[0]
    }
  }
}
</script>