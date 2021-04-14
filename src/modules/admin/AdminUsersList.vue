<template>
<div class="page page-lg d-flex py-0 pr-2 position-relative"> 
  <div class="list-view list-sticky border-r pt-4 pr-4 content-height-with-subnav">
    <SearchInput
      class="mb-2"
      placeholder="ค้นหา User Account..."
      :initial-query="$route.query.query"
      @search="loading = true"
      @debounced-search="apply_search_query($event)" />
    <div class="d-flex mb-2">
      <button v-for="filter of user_type_filters"
              :key="filter.id"
              class="filter-btn filter-btn-sm btn w-100 mr-2 px-2"
              :class="[
                user_type_colors[filter.id],
                {'active': user_type_filter == filter.id}
              ]"
              :disabled="loading || user_type_filter == filter.id"
              @click="apply_user_type_filter(filter.id)">
        <i  v-if="user_type_filter == filter.id"
            class="fas fa-check btn-inner-icon" />
        <div  v-else
              class="small-square mr-1"
              :class="user_type_colors[filter.id]" />
        {{ filter.name }}
      </button>
      <button class="filter-btn filter-btn-sm btn w-100 grey"
              :class="{'active': !account_active_filter}"
              :disabled="loading || !account_active_filter"
              @click="apply_deactivated_user_filter()">
        <i class="fas fa-ban btn-inner-icon" />
        ถูกระงับ
      </button>
    </div>

    <transition name="fade">
      <div  v-if="!loading && users"
            key="list" 
            class="scroll-container">
        <div class="fade-gradient-top"></div>
        <ul v-if="users.length > 0" class="item-list font-chatthai">
          <router-link  :to="{
                          name: 'admin-users-list',
                          params: { id: user.index },
                          query: {
                            ...($route.query.type && { type: $route.query.type }),
                            ...($route.query.query && { query: $route.query.query }),
                            ...($route.query.active && { active: $route.query.active }),
                          }
                        }"
                        tag="li"
                        v-for="(user, idx) of users"
                        :key="idx"
                        class="clickable"
                        :class="{
                          'active': $route.params.id == user.index,
                          'faded': !account_active_filter
                        }">
            <div class="row no-gutters">
              <div class="col-8 d-flex align-items-center pr-2">
                <i  v-if="!account_active_filter"
                    class="fas fa-ban btn-inner-icon mr-2" />
                <h5 class="ellipsis">{{ user.default_contact.name }}</h5>
              </div>
              <div class="col-4">
                <ColorTag
                  :label="user_type_label[user.account_type]"
                  :color="user_type_colors[user.account_type]" />
              </div>
            </div>
          </router-link>
        </ul>
        <div  v-else class="w-100 py-3 text-center border-b border-t">
          <h5 class="text-muted">
            <i class="far fa-frown mr-2"></i>ไม่มี User Account ที่จะแสดง
          </h5>
        </div>
        <div class="fade-gradient-bottom" />
      </div>
      <div v-else key="loading" class="w-100 pt-5 text-center">
        <LoadingAnimation color="primary" size="lg" />
      </div>
    </transition>
  </div>
  
  <transition name="fade">
    <AdminUserInfo
      v-if="$route.params.id"
      class="p-4 w-100 scroll-container"
      @deactivate-account="on_deactivate_account()"
      @reactivate-account="on_reactivate_account()" />
  </transition>
</div>
</template>

<script>
import debounce from 'lodash/debounce'

import AdminUserInfo from './AdminUserInfo'
import { USERS_LIST } from '@/graphql/user'

export default {
  name: 'admin-users-list',
  components: {
    AdminUserInfo
  },
  data () {
    return {
      loading: true,
      user_type_filters: [
        { id: 201, name: 'ผู้ส่งตัวอย่าง'},
        { id: 101, name: 'แอดมิน'}
      ],
      user_type_colors: {
        201: 'purple',
        101: 'pink'
      },
      user_type_label: {
        201: 'ผู้ส่งตัวอย่าง',
        101: 'แอดมิน'
      }
    }
  },
  computed: {
    account_active_filter () {
      // excludes undefined and null
      if (this.$route.query.active === false) {
        return false
      }
      return true
    },
    user_type_filter () {
      if (!this.$route.query.type) {
        if (this.account_active_filter === false) {
          return null
        }
        return 201
      }
      return parseInt(this.$route.query.type)
    }
  },
  methods: {
    apply_user_type_filter (type) {
      this.loading = true
      this.$router.push({
        name: 'admin-users-list',
        query: {
          ...(this.$route.query.query && { query: this.$route.query.query }),
          ...(type && { type })
        }
      })
    },
    apply_deactivated_user_filter () {
      this.loading = true
      this.$router.push({
        name: 'admin-users-list',
        query: {
          active: false
        }
      })
    },
    apply_search_query (query) {
      if (query == this.$route.query.query) {
        this.loading = false
      } else {
        this.$router.push({
          name: 'admin-users-list',
          params: { id: this.$route.params.id },
          query: {
            ...(this.$route.query.type && { type: this.$route.query.type }),
            ...(this.$route.query.active === false? { active: false } : null),
            ...(query && { query }),
          }
        })
      }
    },
    on_deactivate_account () {
      this.loading = true
      this.$router.push({
        name: 'admin-users-list',
        params: { id: this.$route.params.id },
        query: {
          ...(this.$route.query.query && { active: this.$route.query.query }),
          active: false
        }
      })
    },
    on_reactivate_account () {
      this.loading = true
      this.$router.push({
        name: 'admin-users-list',
        params: { id: this.$route.params.id },
        query: {
          ...(this.$route.query.query && { active: this.$route.query.query }),
        }
      })
    }
  },
  apollo: {
    users: {
      query: USERS_LIST,
      variables () {
        return {
          search_query: this.$route.query.query,
          account_type: this.user_type_filter,
          account_active: this.account_active_filter
        }
      },
      update: data => data.search_backuser.result,
      result () {
        this.$nextTick( () => this.loading = false )
      }
    }
  }
}
</script>