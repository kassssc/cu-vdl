<template>
<div class="d-flex">
  <div class="list-view sub-nav-content content-height">
    <h3 class="mb-3">
      <i class="fas fa-users icon-lg mr-1" />
      รายการ User Account
    </h3>
    <SearchInput class="mb-2" @search="setSearchQuery($event)" />
    <div class="d-flex mb-2">
      <button class="filter-btn btn btn-sm primary w-100"
              :class="{'active': activeUserTypeFilter === null && userActiveFilter}"
              :disabled="loading"
              @click="setUserTypeFilter(null)">
        <i  v-if="activeUserTypeFilter === null && userActiveFilter"
            class="fas fa-check btn-inner-icon" />
        ทั้งหมด
      </button>
      <button v-for="filter of userTypeFilters"
              :key="filter.id"
              class="filter-btn btn btn-sm w-100 ml-2 px-2"
              :class="[
                userTypeCSS[filter.id],
                {'active': activeUserTypeFilter === filter.id}
              ]"
              :disabled="loading"
              @click="setUserTypeFilter(filter.id)">
        <i  v-if="activeUserTypeFilter === filter.id"
            class="fas fa-check btn-inner-icon" />
        <div  v-else
              class="small-square mr-1"
              :class="userTypeCSS[filter.id]" />
        {{ filter.name }}
      </button>
      <button class="filter-btn btn btn-sm ml-2 w-100 grey"
              :class="{'active': !userActiveFilter}"
              :disabled="loading"
              @click="setDeactivatedUserFilter()">
        <i class="fas fa-ban btn-inner-icon" />
        ถูกระงับ
      </button>
    </div>

    <transition name="fade">
      <div  v-if="!loading"
            key="list" 
            class="scroll-container">
        <div class="fade-gradient-top"></div>
        <ul class="item-list font-chatthai">
          <router-link  :to="{
                          name: 'admin-users-list',
                          params: { id: user.index }
                        }"
                        tag="li"
                        v-for="(user, idx) of users"
                        :key="idx"
                        class="clickable"
                        :class="{
                          'active': $route.params.id == user.index,
                          'faded': activeUserTypeFilter === -1
                        }">
            <div class="row no-gutters">
              <div class="col-8 d-flex align-items-center">
                <i  v-if="activeUserTypeFilter === -1"
                    class="fas fa-ban btn-inner-icon mr-2" />
                <h4>{{ `${user.title}${user.first_name} ${user.last_name}` }}</h4>
              </div>
              <div class="col-4">
                <ColorTag
                  :label="userTypeLabel[user.account_type]"
                  :color="userTypeCSS[user.account_type]" />
              </div>
            </div>
          </router-link>
        </ul>
        <div class="fade-gradient-bottom" />
      </div>
      <div v-else key="loading" class="w-100 pt-5 text-center">
        <LoadingAnimation color="primary" size="lg" />
      </div>
    </transition>
  </div>

  <div class="sub-nav-content content-height d-flex flex-column">
    <transition name="fade">
      <AdminUserInfo
        v-if="$route.params.id"
        @deactivate-account="onDeactivateAccount()"
        @reactivate-account="onReactivateAccount()" />
    </transition>
  </div>
</div>
</template>

<script>
import AdminUserInfo from './AdminUserInfo'
import { getJWT } from '@/vue-apollo'
import { USERS_LIST, DEACTIVATED_USERS_LIST } from '@/graphql/user'

export default {
  name: 'admin-users-list',
  components: {
    AdminUserInfo
  },
  data () {
    return {
      searchQuery: '',
      loading: true,
      activeUserTypeFilter: null,
      userActiveFilter: true,
      userTypeFilters: [
        { id: 201, name: 'ผู้ส่งตัวอย่าง'},
        { id: 101, name: 'แอดมิน'}
      ],
      userTypeCSS: {
        201: 'purple',
        101: 'pink'
      },
      userTypeLabel: {
        201: 'ผู้ส่งตัวอย่าง',
        101: 'แอดมิน'
      }
    }
  },
  methods: {
    setSearchQuery (query) {
      this.loading = true
      this.searchQuery = query
    },
    setUserTypeFilter (filter) {
      this.loading = true
      this.activeUserTypeFilter = filter
      this.userActiveFilter = true
      this.clearSelectedUser()
    },
    setDeactivatedUserFilter () {
      this.loading = true
      this.activeUserTypeFilter = null,
      this.userActiveFilter = false
      this.clearSelectedUser()
    },
    clearSelectedUser () {
      if (this.$route.params.id) {
        this.$router.push({ name: 'admin-users-list' })
      }
    },
    onDeactivateAccount () {
      this.loading = true
      this.activeUserTypeFilter = null
      this.userActiveFilter = false
    },
    onReactivateAccount () {
      this.loading = true
      this.activeUserTypeFilter = null
      this.userActiveFilter = true
    }
  },
  apollo: {
    users: {
      query: USERS_LIST,
      variables () {
        return {
          jwt: getJWT(),
          searchQuery: this.searchQuery,
          accountType: this.activeUserTypeFilter,
          accountActive: this.userActiveFilter
        }
      },
      update: data => data.search_backuser.result,
      debounce: 500,
      result () {
        this.$nextTick( () => this.loading = false )
      }
    }
  }
}
</script>