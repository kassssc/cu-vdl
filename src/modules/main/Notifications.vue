<template>
<div>
  <div id="notifications-dropdown" class="dropdown mr-3">
      <button class="btn btn-transparent btn-icon focusable"
              type="button" id="notifications-dropdown-button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-bell"></i>
      </button>
      <div  v-if="new_notifications.length > 0"
            class="notifications-badge">
        <p>{{ new_notifications.length }}</p>
      </div>
      <div  class="dropdown-menu dropdown-menu-right mt-3 scroll-container"
            aria-labelledby="notifications-dropdown-button">
        <div class="p-3">
          <h5 class="font-cu"><i class="fas fa-bell icon-md text-center mr-3"></i>แจ้งเตือน</h5>
        </div>
        <router-link  :to="notification.target"
                      v-for="notification of notifications"
                      :key="notification.notification_id"
                      class="dropdown-item d-flex align-items-center"
                      :disabled="!notification.target">
          <div class="mr-3 align-self-start mt-1 text-center">
              <i class="text-default icon-md" :class="notification_icons[notification.notification_type]"></i>
          </div>
          <div class="w-100">
            <h5 class="pre-line text-default">
              {{ notification.text }}
            </h5>
            <p class="text-muted mb-0">
              {{ to_display_datetime(notification.date) }}
            </p>
          </div>
          <div class="ml-3">
            <div v-if="!notification.seen" class="small-square primary"></div>
          </div>
        </router-link>
        <div v-if="notifications && notifications.length <= 0" class="text-center p-3 border-t text-muted">
          <h5>ไม่มีการแจ้งเตือนใหม่</h5>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery'
import {
  USER_NOTIFICATIONS,
  SET_NOTIFICATIONS_SEEN,
  CLEAN_NOTIFICATIONS
} from '@/graphql/user'

export default {
  name: 'notifications',
  computed: {
    new_notifications () {
      if (!this.notifications) return []
      return this.notifications.filter(n => !n.seen)
    }
  },
  data () {
    return {
      notification_icons: {
        new_report: 'fas fa-file-invoice',
        new_invoice: 'fas fa-file-invoice-dollar',
        reworked_report: 'fas fa-edit',
        cancelled_invoice: 'fas fa-times',
        updated_submission: 'fas fa-edit',
        updated_status_submission: 'fas fa-file-alt',
        updated_status_invoice: 'fas fa-file-invoice-dollar',
        paid_invoice: 'fas fa-hand-holding-usd',
        sample_received_submission: 'fas fa-paper-plane',
        completed_submission: 'fas fa-check',
        cancelled_submission: 'fas fa-times',
      }
    }
  },
  methods: {
    async set_notifications_seen_and_clean () {
      if (this.new_notifications.length > 0) {
        await this.$apollo.mutate({
          mutation: SET_NOTIFICATIONS_SEEN,
          variables: {
            notification_ids: this.new_notifications.map(n => n.notification_id)
          }
        })
      }

      await this.$apollo.mutate({
        mutation: CLEAN_NOTIFICATIONS
      })
      
      await this.$apollo.queries.notifications.refetch()
    }
  },
  mounted () {
    // Set notifications to seen on dropdown close
    $('#notifications-dropdown').on('hidden.bs.dropdown', async () => {
      await this.set_notifications_seen_and_clean()
    })
    
    // Refetch notifications at interval
    setInterval(
      () => { this.$apollo.queries.notifications.refetch() },
      36000 // 10 minutes (36000ms)
    )
  },
  apollo: {
    notifications: {
      query: USER_NOTIFICATIONS,
      update: data => data.get_backuser.result.notifications
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown.show {
  background: $accent;
  border-radius: $border-radius;
}

.dropdown-menu.show {
  @include dropdown-menu;
  width: 375px;
  max-height: 80vh;
}

.dropdown-item {
  white-space: normal;
  font-weight: bold;
  &:last-child {
   border-radius: 0 0 $border-radius $border-radius; 
  }
  padding: .7em 1em .4em 1em;
  border-top: 1px solid $accent-dark;
  &:hover {
    background: $accent;
  }
}

.notifications-badge {
  position: absolute;
  right: -.5em;
  top: -.5em;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  padding: 0 0.4em;
  border-radius: 5px;
  height: 1.55em;
  background: $danger;
  color: $light;
  p {
    font-size: 1.1em;
    margin-bottom: 0px;
  }
}
</style>