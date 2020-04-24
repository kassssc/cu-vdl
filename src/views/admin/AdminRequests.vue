<template>
<div class="page d-flex max-width-1650">
  <div  class="sidebar content-height"
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
      <h5 class="mb-2 text-medium">กรองโดยสถานะ</h5>
      <div class="d-flex flex-column mb-4">
        <button class="filter-btn btn btn-sm btn-block text-left pink"
                :class="{'active': activeStatusFilter === 0}"
                @click="activeStatusFilter = 0">
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
          <div  class="color-tag d-inline-block mr-2"
                :class="requestStatusCSS[filter.id]">
            <i class="fas" :class="requestStatusIcon[filter.id]"></i>
          </div>
          {{ filter.name }}
        </button>
      </div>
      <h5 class="mb-2 text-medium">กรองโดยประเภทคำขอ</h5>
      <div class="d-flex flex-column">
        <button class="filter-btn btn btn-sm btn-block text-left pink"
                :class="{'active': activeTypeFilter === 0}"
                @click="activeTypeFilter = 0">
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
          <div  class="color-tag d-inline-block mr-2"
                :class="requestTypeCSS[filter.id]">
            {{ filter.key }}
          </div>
          {{ filter.name }}
        </button>
      </div>
    </div>
  </div>
  <div class="row no-gutters requests content-height">
    <div class="col-6 col-lg-5 border-right-lighter pr-4">
      <h3 class="mb-2">
        <i class="fas fa-scroll icon-lg mr-1"></i>
        รายการคำขอ
      </h3>
      <div class="row mb-2 text-medium font-chatthai mr-5 mt-3 pt-2">
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
          <h5>ชื่อผู้ส่ง</h5>
        </div>
      </div>
      <div class="subcontainer font-chatthai pr-2">
        <div id="requests-list" class="scroll-container requests orgs">
          <div  v-for="(i, idx) of [...list]"
                :key="idx"
                class="pointer row no-gutters list-item"
                :class="{'active': selectedRequest === idx}"
                @click="selectedRequest = idx">
            <div class="col-2 pl-3">
              <h5>
                X
              </h5>
            </div>
            <div class="col-2 pl-3">
              <h5>
                0
              </h5>
            </div>
            <div class="col-3">
              <h5>
                04/04/20
              </h5>
            </div>
            <div class="col-4">
              <h5>
                {{ user.firstName }}
              </h5>
            </div>
            <div class="col-1">
              <i class="fas fa-chevron-right icon-md mr-1 hide-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-6 col-lg-7 pt-5 pl-4">
      <h3 class="mb-2">
        <i class="fas fa-file-contract icon-lg mr-1"></i>
        รายละเอียดคำขอ
      </h3>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.requests {
  flex-grow: 2;
}
.content-width {
  width: calc(100% - 275px);
}
.scroll-container.requests {
  height: calc(100vh - #{$titlebar-height} - #{$footer-height} - 145px);
}
.list-item {
  padding-top: .75em;
  padding-bottom: .75em;
  border-bottom: 1px solid $accent;
  border-radius: 5px;
  &.active {
    color: $primary;
    background: $accent-dark;
    cursor: default;
    i.hide-icon {
      display: block;
    }
  }
  &:not(.active):hover {
    background: $accent;
  }
  i.hide-icon {
    display: none;    
  }
  &.unread {

  }
}
.filter-btn {
  color: $default;
  background: $secondary;
  padding-left: 2em;
  position: relative;
  padding-top: .3em;
  padding-bottom: .3em;
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
  .color-tag {
    position: absolute;
    left: .4em;
    top: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    width: 25px;
    height: 1.4em;
  }
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'admin-membership',
  computed: {
    ...mapGetters([
      'user',
      'requestTypes',
      'requestStatuses'
    ])
  },
  data () {
    return {
      activeTypeFilter: 0,
      activeStatusFilter: 0,
      selectedRequest: 0,
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
      list: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
    }
  }
}
</script>