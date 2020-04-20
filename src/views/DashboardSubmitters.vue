<template>
<div class="d-flex align-items-start">
  <div id="submitters-list" class="p-4">
    <h3 class="mb-4">รายชื่อ ตัวแทนส่งตัวอย่าง</h3>
    <div class="search-input mb-3">
      <i class="fas fa-search search-icon large-icon text-muted" />
      <input  type="text"
              class="form-control"
              placeholder="ค้นหา...">
    </div>
    <form-inline-select
      class="mb-3"
      :options="filterOptions"
      v-model="filter" />
    <div class="subcontainer pr-2">
      <div class="scroll-container">
        <div  v-for="(i, idx) of [...list, ...list]"
              :key="idx"
              class="font-chatthai">
          <button class="btn btn-block btn-list"
                  :class="{'active': selectedSubmitter === idx}"
                  @click="selectedSubmitter = idx">
            {{ `${user.firstName} ${user.lastName}` }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div id="submitter-info" class="row p-4 mt-5">
    <div class="col-12">
      <h3 class="mb-4 mt-2">ข้อมูล ตัวแทนส่งตัวอย่าง</h3>
    </div>

    <div class="col-12 font-chatthai">
      <div class="form-row">
        <div class="form-group col-12 mb-4">
          <label>
            ประเภท Account
          </label>
          <input  type="text"
                  class="form-control form-control-lg text-primary"
                  value="พนักงานประจำ"
                  disabled >
        </div>
        <div class="form-group col-12">
          <label>
            ชื่อจริง
          </label>
          <input  type="text"
                  class="form-control form-control-lg"
                  :value="user.firstName"
                  disabled >
        </div>
        <div class="form-group col-12">
          <label>
            นามสกุล
          </label>
          <input  type="text"
                  class="form-control form-control-lg"
                  :value="user.lastName"
                  disabled >
        </div>
        <div class="form-group col-12">
          <label>
            อีเมล
          </label>
          <input  type="text"
                  class="form-control form-control-lg"
                  :value="user.email"
                  disabled >
        </div>
        <div class="form-group col-12">
          <label>
            เบอร์โทรศัพท์
          </label>
          <input  type="text"
                  class="form-control form-control-lg"
                  :value="user.phone"
                  disabled >
        </div>
      </div>

      <div class="form-row mt-5">
        <div class="form-group col-12">
          <button class="btn btn-primary btn-lg btn-block ">
            <i class="fas fa-user-slash btn-inner-icon"></i>
            ยกเลิกการให้เป็นตัวแทนส่งตัวอย่าง
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
$list-width: 50%;
.scroll-container {
  padding-right: 1em; 
  height: calc(100vh - #{$titlebar-height} - #{$footer-height} - 265px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, .5);
    box-shadow: 0 0 1px rgba(255, 255, 255, .5);
  }
}
#submitters-list {
  width: $list-width;
  border-right: 1px solid $accent;
}
#submitter-info {
  width: calc(100% - #{$list-width});
}
.btn-list {
  text-align: left;
  padding: .25em .75em;
  font-size: 1.6rem;
  border-bottom: 1px solid $accent;
  &:hover {
    background: $accent;
  }
  &.active {
    background: $accent;
    color: $primary;
    cursor: default;
  }
}
</style>

<script>
export default {
  name: 'dashboard-submitters',
  data () {
    return {
      selectedSubmitter: 0,
      filter: 0,
      filterOptions: [
        { id: 0, name: 'ทั้งหมด'},
        { id: 1, name: 'พนักงานประจำ'},
        { id: 2, name: 'Freelance'}
      ],
      user: {
        id: 1,
        accountType: 1,
        org: 1,
        firstName: 'สมควร',
        lastName: 'สมสกุล',
        email: 'mr.somkuan@gmail.com',
        phone: '081-234-5678',
        nationalId: null
      },
      list: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    }
  }
}
</script>