<template>
<div class="page d-flex">
  <div class="sidebar">
    <router-link to="/tracksubmissions"
                 tag="button"
                 class="btn back-btn btn-transparent d-flex align-items-center align-self-end">
      <i class="fas fa-chevron-left mr-2" />
      <div class="text">
        {{ $t(`general.back`) }}
      </div>
    </router-link>
  </div>

  <div class="d-flex flex-column w-100 max-width-1300">
    <h3>
      {{ $t(`track.submission`) + ' #' + $route.params.id }}
    </h3>
  
    <div class="font-chatthai w-100 d-flex flex-column pb-5">
      <div class="d-flex justify-content-between border-bottom-pink pr-3 py-3">
        <div class="download-reports flex-grow-1">
          <h3>
            ดาวน์โหลดรายงาน
          </h3>
          <div class="container">
            <div class="row color-dark-grey border-bottom-light py-2">
              <div class="col-2">
                <h5 class="mb-0">
                  เลขที่รายงาน
                </h5>
              </div>
              <div class="col-1">
                <h5 class="mb-0">
                  สถานะ
                </h5>
              </div>
              <div class="col-2">
                <h5 class="mb-0">
                  วันที่
                </h5>
              </div>
              <div class="col-5">
                <h5 class="mb-0">
                  รายละเอียด
                </h5>
              </div>
              <div class="col-2">
                <h5 class="mb-0">
                  Download
                </h5>
              </div>
            </div>

            <div v-for="(report, idx) in submission.reports"
                 :key="idx"
                 class="row py-2">
              <div class="col-2">
                <h5 class="mb-0">
                  {{ report.id }}
                </h5>
              </div>
              <div class="col-1">
                <h5 class="mb-0">
                  {{ report.status }}
                </h5>
              </div>
              <div class="col-2">
                <h5 class="mb-0">
                  {{ report.date }}
                </h5>
              </div>
              <div class="col-5">
                <h5 class="mb-0">
                  {{ report.details }}
                </h5>
              </div>
              <div class="col-2">
                <h5 class="mb-0">
                  Download
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column px-3">
          <h3>
            สิ่งที่ทำได้
          </h3>
          <button class="btn btn-warning mb-2">
            แก้ไขรายละเอียด
          </button>
          <button class="btn btn-danger mb-2">
            ยกเลิก
          </button>
        </div>
      </div>
      <div class="submission-details">

      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.back-btn {
  position: sticky;
  top: 0;
  .text {
    display: block;
  }
}
@media screen and (max-width: 1400px) {
  .sidebar {
    width: 40px;
  }
  .back-btn {
    .text {
      display: none;
    }
  }
}
</style>

<script>
export default {
  name: 'view-submission',
  data () {
    return {
      submission: {
        reports: [
          {
            id: '2000-1001-001',
            date: '01/02/2020',
            details: 'ตัวอย่างที่ 11-20',
            status: 0,
            link: 'https://backend/report-link-pdf'
          },
          {
            id: '2000-1001-002',
            date: '01/02/2020',
            details: 'ตัวอย่างที่ 11-20',
            status: 0,
            link: 'https://backend/report-link-pdf'
          },
          {
            id: '2000-1001-003',
            date: '01/02/2020',
            details: 'ตัวอย่างที่ 11-20',
            status: 0,
            link: 'https://backend/report-link-pdf'
          },
          {
            id: '2000-1001-004',
            date: '01/02/2020',
            details: 'ตัวอย่างที่ 11-20',
            status: 0,
            link: 'https://backend/report-link-pdf'
          },

        ]
      }
    }
  }
}
</script>