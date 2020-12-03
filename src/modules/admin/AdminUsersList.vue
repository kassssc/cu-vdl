<template>
<div class="page page-lg d-flex py-0 pr-2 position-relative"> 
  <div class="list-view list-sticky border-r pt-4 pr-4 content-height-with-subnav">
    <SearchInput
      class="mb-2"
      placeholder="ค้นหา User Account..."
      @search="set_search_query($event)" />
    <div class="d-flex mb-2">
      <button v-for="filter of user_type_filters"
              :key="filter.id"
              class="filter-btn filter-btn-sm btn w-100 mr-2 px-2"
              :class="[
                user_type_colors[filter.id],
                {'active': active_user_type_filter === filter.id}
              ]"
              :disabled="loading || active_user_type_filter === filter.id"
              @click="set_user_type_filter(filter.id)">
        <i  v-if="active_user_type_filter === filter.id"
            class="fas fa-check btn-inner-icon" />
        <div  v-else
              class="small-square mr-1"
              :class="user_type_colors[filter.id]" />
        {{ filter.name }}
      </button>
      <button class="filter-btn filter-btn-sm btn w-100 grey"
              :class="{'active': !user_active_filter}"
              :disabled="loading || !user_active_filter"
              @click="set_deactivated_user_filter()">
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
                          params: { id: user.index }
                        }"
                        tag="li"
                        v-for="(user, idx) of users"
                        :key="idx"
                        class="clickable"
                        :class="{
                          'active': $route.params.id == user.index,
                          'faded': !user_active_filter
                        }">
            <div class="row no-gutters">
              <div class="col-8 d-flex align-items-center">
                <i  v-if="!user_active_filter"
                    class="fas fa-ban btn-inner-icon mr-2" />
                <h5>{{ user.default_contact.name }}</h5>
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
import AdminUserInfo from './AdminUserInfo'
import { USERS_LIST } from '@/graphql/user'

export default {
  name: 'admin-users-list',
  components: {
    AdminUserInfo
  },
  data () {
    return {
      search_query: '',
      loading: true,
      active_user_type_filter: 201,
      user_active_filter: true,
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
  methods: {
    set_search_query (query) {
      this.loading = true
      this.search_query = query
    },
    set_user_type_filter (filter) {
      this.loading = true
      this.active_user_type_filter = filter
      this.user_active_filter = true
      this.clear_selected_user()
    },
    set_deactivated_user_filter () {
      this.loading = true
      this.active_user_type_filter = null,
      this.user_active_filter = false
      this.clear_selected_user()
    },
    clear_selected_user () {
      if (this.$route.params.id) {
        this.$router.push({ name: 'admin-users-list' })
      }
    },
    on_deactivate_account () {
      this.loading = true
      this.active_user_type_filter = null
      this.user_active_filter = false
    },
    on_reactivate_account () {
      this.loading = true
      this.active_user_type_filter = 201
      this.user_active_filter = true
    }
  },
  apollo: {
    users: {
      query: USERS_LIST,
      variables () {
        return {
          search_query: this.search_query,
          account_type: this.active_user_type_filter,
          account_active: this.user_active_filter
        }
      },
      debounce: 200,
      update: data => data.search_backuser.result,
      result () {
        this.$nextTick( () => this.loading = false )
      }
    }
  }
}
</script>