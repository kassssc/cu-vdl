<template>                                                            
<div class="page d-flex align-items-start">
  <div class="sidebar"
       :class="{'folded': sidebarFolded}">
    <button class="btn btn-transparent fold-btn align-self-end"
            @click="toggleSidebar()">
      <i class="fas fa-chevron-left"
         :class="{'rotate': sidebarFolded}"/>
    </button>
    <h4>
      *Filters go here*
    </h4>
  </div>
  <div class="d-flex flex-column full-width">
    <div class="d-flex justify-content-between align-items-center">
      <h2>
        {{ $t(`track.title`) }}
      </h2>
      <div class="d-flex align-items-center">
        <i class="fas fa-search search-icon mr-3" />
        <input type="text"
               class="form-control submission-search my-1"
               :placeholder="$t(`track.searchPlaceholder`)">
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead id="table-header">
          <tr>
            <th v-for="(col, idx) in table.head"
                :key="idx">
              <button class="btn btn-transparent sort-btn"
                      :class="{'selected': sortField === idx}"
                      @click="setSortField(idx)">
                {{ col }}
                <i class="fas fa-chevron-down"
                   :class="{
                      'rotate': sortDirection === 1 && sortField === idx,
                      'show': sortField === idx
                   }"/>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <router-link :to="{name: 'viewsubmission', params: { id: idx }}"
                        tag="tr"
                        v-for="(row, idx) in [...table.body, ...table.body, ...table.body]"
                        @click.native="scrollToTop()"
              :key="idx">
            <td>
              <div class="order-tag"
                    :class="getTagCSS(row.status)">
                {{ table.status[row.status] }}
              </div>
            </td>
            <td>{{ row.orderNum }}</td>
            <td>{{ row.submittedDate }}</td>
            <td>{{ row.receiptNum }}</td>
            <td>{{ row.receivedDate }}</td>
            <td>{{ row.person }}</td>
            <td>{{ row.organization }}</td>
            <td>{{ row.sampleQuantity }}</td>
            <td>{{ '฿' + row.price }}</td>
            <td>
              <button class="btn btn-transparent download"
                      @click="e => e.stopPropagation()">
                <i class="fas fa-file-download"></i>
              </button>
            </td>
            <td>
              <button class="btn btn-transparent download"
                      @click="e => e.stopPropagation()">
                <i class="fas fa-file-download"></i>
              </button>
            </td>
          </router-link>
        </tbody>
      </table>
    </div>
  </div>
</div>  
</template>

<style lang="scss" scoped>
button.download {
  &:hover {
    color: $chula;
    background: transparent;
  }
}
button.sort-btn {
  padding: 0.1em 0.4em;
  font-size: 1.3rem;
  &.selected {
    color: $chula;
    background: $light-accent;
  }
  &:hover {
    i { opacity: 1; }
  }
  i {
    font-size: 0.9rem;
    opacity: 0; 
    transition: transform 100ms ease-in-out;
    &.show {
      opacity: 1;
    }
  }
}
input.submission-search {
  width: 500px;
}
i.search-icon {
  font-size: 1.3rem;
  color: $muted;
}
.table-container {
  height: calc(100vh - 246px);
  overflow: scroll;
  position: relative;
  margin-bottom: 2em;
}
table {
  font-size: 1.3rem;
  letter-spacing: 0.03em;
  margin-bottom: 10em;
  font-family: 'CS ChatThai';
  font-weight: bold;
  width: 100%;
  thead {
    th {
      position: sticky;
      padding: 0.25em;
      top: 0px;
      height: 60px;
      background: $bg;
      // Drop shadow effect
      &::after {  
        content: '';
        box-shadow: 0 2px 3px 0px $muted;
        height: 2px;
        background: $chula;
        width: 100%;
        position: absolute;
        bottom: 0; left: 0;
      }
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid $medium-accent;
      &:hover {
        background: $light-accent;
        cursor: pointer;
      }
      td {
        color: $light-text;
        padding: 0.3em 0.55em;
      }
    }
  }
}
.order-tag {
  font-size: 1.2rem;
  border-radius: 3px;
  padding: 0.15em 0.3em 0.1em 0.3em;
  color: $bg;
  display: inline;
  @include unselectable;
  &.purple {
    background: #6F638F;
  }
  &.blue {
    background: #60798F;
  }
  &.teal {
    background: #608F8F;
  }
  &.orange {
    background: rgb(204, 157, 82);
  }
  &.green {
    background: #5B8F5D;
  }
  &.red {
    background: #8F564E;
  }
}
</style>

<script>
export default {
  name: 'submissions-list',
  data () {
    return {
      sortField: 2,
      sortDirection: 0,
      sidebarFolded: false,
      table: {
        head: [
          'สถานะ',
          'เลขที่ส่ง',
          'วันที่ส่ง',
          'เลขที่รับ',
          'วันที่รับ',
          'ผู้จัดส่ง',
          'องค์กร',
          'จำนวนตัวอย่าง',
          'ราคา',
          'ใบส่งตัวอย่าง',
          'รายงาน'
        ],
        body: [
          {
            status: 0,
            orderNum: 123456,
            submittedDate: '05/05/2020',
            receiptNum: 654321,
            receivedDate: '06/06/2020',
            person: 'สมควร โดน',
            organization: 'ฟาร์มสมควร',
            sampleQuantity: 40,
            price: 2000,
            submissionForm: 'https://backend/path-to-form',
            report: 'https://backend/path-to-report'
          },
          {
            status: 1,
            orderNum: 123456,
            submittedDate: '05/05/2020',
            receiptNum: 654321,
            receivedDate: '06/06/2020',
            person: 'สมควร โดน',
            organization: 'ฟาร์มสมควร',
            sampleQuantity: 40,
            price: 2000,
            submissionForm: 'https://backend/path-to-form',
            report: 'https://backend/path-to-report'
          },
          {
            status: 2,
            orderNum: 123456,
            submittedDate: '05/05/2020',
            receiptNum: 654321,
            receivedDate: '06/06/2020',
            person: 'สมควร โดน',
            organization: 'ฟาร์มสมควร',
            sampleQuantity: 40,
            price: 2000,
            submissionForm: 'https://backend/path-to-form',
            report: 'https://backend/path-to-report'
          },
          {
            status: 3,
            orderNum: 123456,
            submittedDate: '05/05/2020',
            receiptNum: 654321,
            receivedDate: '06/06/2020',
            person: 'สมควร โดน',
            organization: 'ฟาร์มสมควร',
            sampleQuantity: 40,
            price: 2000,
            submissionForm: 'https://backend/path-to-form',
            report: 'https://backend/path-to-report'
          },
          {
            status: 4,
            orderNum: 123456,
            submittedDate: '05/05/2020',
            receiptNum: 654321,
            receivedDate: '06/06/2020',
            person: 'สมควร โดน',
            organization: 'ฟาร์มสมควร',
            sampleQuantity: 40,
            price: 2000,
            submissionForm: 'https://backend/path-to-form',
            report: 'https://backend/path-to-report'
          },
          {
            status: 5,
            orderNum: 123456,
            submittedDate: '05/05/2020',
            receiptNum: 654321,
            receivedDate: '06/06/2020',
            person: 'สมควร โดน',
            organization: 'ฟาร์มสมควร',
            sampleQuantity: 40,
            price: 2000,
            submissionForm: 'https://backend/path-to-form',
            report: 'https://backend/path-to-report'
          }
        ],
        status: [
          'ส่งแล้ว',
          'ได้รับแล้ว',
          'กำลังดำเนินการ',
          'รอชำระเงิน',
          'เสร็จสิ้น',
          'ยกเลิก'
        ],
      },
      tagCSS: [
        'purple',
        'blue',
        'teal',
        'orange',
        'green',
        'red'
      ]
    }
  },
  methods: {
    getTagCSS (statusId) {
      return this.tagCSS[statusId]
    },
    scrollToTop () {
      window.scrollTo(0,0)
    },
    setSortField (idx) {
      if (idx === this.sortField) {
        this.sortDirection = this.sortDirection === 0? 1 : 0
      } else {
        this.sortField = idx
        this.sortDirection = 0
      }
    },
    toggleSidebar () {
      this.sidebarFolded = !this.sidebarFolded
    }
  }
}
</script>