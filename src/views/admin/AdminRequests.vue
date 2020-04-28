<template>
<div class="page d-flex max-width-1650">
  <div  class="sidebar pt-2 content-height"
        :class="{'folded': sidebarFolded}">
    <button class="btn btn-transparent fold-btn align-self-end"
            @click="sidebarFolded = !sidebarFolded">
      <i  class="fas fa-chevron-left"
          :class="{'flip-x': sidebarFolded}"/>
    </button>
    <div class="content pt-3">
      <h5 class="mb-2 mt-1 text-medium">ค้นหาด้วยหมายเลขคำขอ</h5>
      <div class="search-input mb-4">
        <i class="fas fa-search text-muted" />
        <input type="text"
              class="form-control submission-search"
              placeholder=" ใส่หมายเลขคำขอ...">
      </div>
      <!-- <h5 class="mb-2 text-medium">กรองโดยสถานะ</h5>
      <div class="d-flex flex-column mb-4">
        <button class="filter-btn btn btn-sm btn-block text-left pink"
                :class="{'active': activeStatusFilter === 0}"
                @click="activeStatusFilter = 0">
          <i class="fas fa-star-of-life btn-inner-icon" />
          ทั้งหมด
        </button>
        <button v-for="filter of requestStatuses"
                :key="filter.id"
                class="filter-btn btn btn-sm btn-block text-left"
                :class="[
                  requestStatusCSS[filter.id],
                  {'active': activeStatusFilter === filter.id}
                ]"
                @click="activeStatusFilter = filter.id">
          <i class="fas btn-inner-icon" :class="requestStatusIcon[filter.id]"></i>
          {{ filter.name }}
        </button>
      </div> -->
      <h5 class="mb-2 text-medium">กรองโดยประเภทคำขอ</h5>
      <div class="d-flex flex-column">
        <button class="filter-btn btn btn-sm btn-block text-left pink"
                :class="{'active': activeTypeFilter === 0}"
                @click="activeTypeFilter = 0">
          <div class="small-square mr-1"></div>
          ทั้งหมด
        </button>
        <button v-for="filter of requestTypes"
                :key="filter.id"
                class="filter-btn btn btn-sm btn-block text-left"
                :class="[
                  requestTypeCSS[filter.id],
                  {'active': activeTypeFilter === filter.id}
                ]"
                @click="activeTypeFilter = filter.id">
          <div class="small-square mr-1" :class="requestTypeCSS[filter.id]"></div>
          {{ filter.name }}
        </button>
      </div>
    </div>
  </div>
  <div class="row no-gutters requests content-height border-left-lighter pt-2">
    <div class="col-6 col-lg-5 border-right-lighter px-4">
      <h3 class="mb-2">
        <i class="fas fa-scroll icon-lg mr-1"></i>
        รายการคำขอ
      </h3>
      <!-- <div class="row mb-2 text-medium font-chatthai mr-5 mt-3 pt-2">
        <div class="col-2">
          <h5>สถานะ</h5>
        </div>
        <div class="col-2">
          <h5>ประเภท</h5>
        </div>
        <div class="col-3">
          <h5>วันที่</h5>
        </div>
        <div class="col-4">
          <h5>หมายเลขคำขอ</h5>
        </div>
      </div> -->
      
      <div class="font-chatthai pr-2">
        <div class="requests">
          <div  v-for="(requestGroup, idx) of requests"
                :key="idx"
                class="mt-4">
            <h4 class="pb-2 border-bottom-lighter text-medium">{{ requestGroup.name }}</h4>
            <div  v-for="request of requestGroup.list"
                  :key="request.id"
                  class="pointer row list-item"
                  :class="[
                    requestStatusCSS[request.status],
                    {'active': selectedRequest === request}
                  ]"
                  @click="selectedRequest = request">
              <div class="col-2 d-flex align-items-center pl-3">
                <i class="fas" :class="[requestStatusCSS[request.status],requestStatusIcon[request.status]]"></i>
              </div>
              <div class="col-3">
                <h5>
                  {{ request.createdDate }}
                </h5>
              </div>
              <div class="col-4">
                <h5>
                  {{ request.requestNum }}
                </h5>
              </div>
              <div class="col-2 d-flex align-items-center">
                <div  class="small-square"
                      :class="requestTypeCSS[request.type]" />
                <!-- <h6 class="text-muted">
                  {{ requestTypes.find(r => r.id === request.type).name }}
                </h6> -->
              </div>
              <div class="col-1 d-flex align-items-center">
                <i class="fas fa-chevron-right icon-md mr-1 text-primary hide-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-6 col-lg-7 pl-4">
      <view-request :request="selectedRequest" />
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
i.orange { color: $orange; }
i.green { color: $green; }
i.red { color: $red; }
.requests {
  flex-grow: 2;
}
.content-width {
  width: calc(100% - 275px);
}
.scroll-container.requests {
  height: calc(100vh - #{$titlebar-height} - #{$footer-height} - 145px);
}
.small-square {
  width: 15px;
  height: 15px;
  display: inline-block;
  border-radius: 3px;
  &.pink { background: $primary; }
  &.orange { background: $orange; }
  &.green { background: $green; }
  &.teal { background: $teal; }
  &.blue { background: $blue; }
  &.grey { background: $medium; }
  &.red { background: $red; }
}
.list-item {
  padding-top: .75em;
  padding-bottom: .75em;
  //margin-bottom: 2px;
  border-bottom: 1px solid $accent;
  &.active {
    background: $accent;
    cursor: default;
    i.hide-icon {
      display: block;
    }
  }
  &:not(.active):hover {
    background: $accent-light;
  }
  i.hide-icon {
    display: none;    
  }
  &.orange {
    border-left: 4px solid $orange;
    //background: rgba($orange, 0.15);
  }
  &.green {
    border-left: 4px solid $green;
    //background: rgba($green, 0.15);
    }
  &.red {
    border-left: 4px solid $red;
    //background: rgba($red, 0.15);
  }
}
.filter-btn {
  color: $default;
  background: $secondary;
  position: relative;
  padding-top: .3em;
  padding-bottom: .3em;
  vertical-align: center; 
  &:not(.active):hover {
    background: $accent-dark;
  }
  &.active {
    color: $light;
    cursor: default;
    &.pink { background: $primary; }
    &.orange { background: $orange; }
    &.green { background: $green; }
    &.teal { background: $teal; }
    &.blue { background: $blue; }
    &.grey { background: $medium; }
    &.red { background: $red; }
  }
  .filter-btn-filler {
    width: 1.3em;
    font-size: 0.8em;
    display: inline-block;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'

import ViewRequest from '@/components/ViewRequest'

export default {
  name: 'admin-membership',
  components: {
    ViewRequest
  },
  computed: {
    ...mapGetters([
      'user',
      'requestTypes',
      'requestStatuses',
    ])
  },
  created () {
    this.selectedRequest = this.requests[0].list[0]
  },
  data () {
    return {
      activeStatusFilter: 1,
      activeTypeFilter: 0,
      selectedRequest: null,
      sidebarFolded: false,
      requestTypeCSS: {
        1: 'orange',
        2: 'green',
        3: 'teal',
        4: 'blue',
        5: 'grey'
      },
      requestStatusCSS: {
        1: 'orange',
        2: 'green',
        3: 'red'
      },
      requestStatusIcon: {
        1: 'fa-question',
        2: 'fa-check',
        3: 'fa-times'
      },
      requests: [
        {
          name: 'รอการตอบรับ',
          list: [
            {
              id: 1,
              requestNum: 'S000002',
              status: 1,
              type: 1,
              createdDate: '04/05/2020'
            },
            {
              id: 2,
              requestNum: 'S000001',
              status: 1,
              type: 1,
              createdDate: '04/05/2020'
            },
            {
              id: 3,
              requestNum: 'M000003',
              status: 1,
              type: 2,
              createdDate: '02/05/2020'
            },
            {
              id: 4,
              requestNum: 'A000001',
              status: 1,
              type: 3,
              createdDate: '01/05/2020'
            },
          ]
        },
        {
          name: 'เสร็จเรียบร้อย',
          list: [
            {
              id: 5,
              requestNum: 'X000001',
              status: 2,
              type: 5,
              createdDate: '29/04/2020'
            },
            {
              id: 6,
              requestNum: 'M000002',
              status: 3,
              type: 2,
              createdDate: '28/04/2020'
            },
            {
              id: 7,
              requestNum: 'F000001',
              status: 3,
              type: 4,
              createdDate: '25/04/2020'
            },
            {
              id: 8,
              requestNum: 'M000001',
              status: 2,
              type: 2,
              createdDate: '05/04/2020'
            },
          ]
        }
      ]
    }
  }
}
</script>