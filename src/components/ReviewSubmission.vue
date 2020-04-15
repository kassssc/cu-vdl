<template>
<div>
  <div class="row">
    <div class="col-2">
      <button class="btn back-btn btn-transparent d-flex align-items-center align-self-end"
              @click="$emit('back')">
        <i class="fas fa-chevron-left mr-2" />
        <div class="text">
          กลับไปแก้ไข
        </div>
      </button>
    </div>
    <div class="col-10">
      <h2>
        สรุปและส่ง
      </h2>
    </div>
  </div>
  <div class="font-chatthai max-width-1300 px-3 py-4">
    <div class="row">
      <div class="col-2">
        <h3>
          ข้อมูลเบื้องต้น
        </h3>
      </div>
      <div class="col-10">
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              ประเภทการตรวจ
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.type }}
            </h4>
          </div>
        </div>
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              ชื่อผู้ส่ง
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.info.submittorName }}
            </h4>
          </div>
        </div>
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              วันที่ส่งตัวอย่าง
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.info.submitDate }}
            </h4>
          </div>
        </div>
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              องค์กรเจ้าของตัวอย่าง
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.info.orgId }}
            </h4>
          </div>
        </div>
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              วันที่เก็บตัวอย่าง
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.info.sampleTakenDate }}
            </h4>
          </div>
        </div>
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              ชนิดตัวอย่าง
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.info.sampleTypeId }}
            </h4>
          </div>
        </div>
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              ชนิดสัตว์
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.info.animalTypeId }}
            </h4>
          </div>
        </div>
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              พันธุ์
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.info.animalSpecies }}
            </h4>
          </div>
        </div>
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              อายุ
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.info.animalAge }}
            </h4>
          </div>
        </div>
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              จำนวนที่เลี้ยง
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.info.animalCount }}
            </h4>
          </div>
        </div>
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              ประวัติการป่วย
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.info.illness }}
            </h4>
          </div>
        </div>
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              ประวัติการทำวัคซีน
            </h4>
          </div>
          <div class="col-9">
            <h4>
              {{ submission.info.vaccinations }}
            </h4>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-2">
        <h3>
          รายงาน
        </h3>
      </div>
      <div class="col-10">
        <div class="row info-row">
          <div class="col-3">
            <h4 class="review-label">
              แจ้งผลโดย
            </h4>
          </div>
          <div class="col-9 pl-0">
            <div class="row info-row">
              <div class="col-3">
                <h5 class="review-label">
                  อีเมล
                </h5>
              </div>
              <div class="col-9">
                <h4>
                  {{ submission.info.notifyBy.email }}
                </h4>
              </div>
            </div>
            <div class="row info-row">
              <div class="col-3">
                <h5 class="review-label">
                  โทรศัพท์
                </h5>
              </div>
              <div class="col-9">
                <h4>
                  {{ submission.info.notifyBy.phone }}
                </h4>
              </div>
            </div>
            <div class="row info-row">
              <div class="col-3">
                <h5 class="review-label">
                  โทรสาร
                </h5>
              </div>
              <div class="col-9">
                <h4>
                  {{ submission.info.notifyBy.fax }}
                </h4>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.review-label {
  color: $text-light;
}
.info-row {
  margin-bottom: 1em;
  padding-bottom: 0.2em;
  border-bottom: 1px solid $accent;
}
</style>

<script>
export default {
  name: 'review-submission',
  props: ['submission']
}
</script>