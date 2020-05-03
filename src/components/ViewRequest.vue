<template>
  <div>
    <div class="d-flex mb-4">
      <h3 class="mr-4">
        <i class="fas fa-file-contract icon-lg mr-1"></i>
        {{ `รายละเอียดคำขอ ${request.requestNum}` }}
      </h3>
      <div  class="d-flex align-items-center tag-light"
            :class="requestTypeCSS[request.type]">
        <div  class="small-square mr-2"
              :class="requestTypeCSS[request.type]"></div>
        <h5>{{ request.typeLabel }}</h5>
      </div>
    </div>
    <div class="font-chatthai">
      <div class="form-row mb-2">
        <div class="form-group col-5">
          <div  class="tag-light w-100 d-flex align-items-center"
                :class="requestStatusCSS[request.status]">
            <i  class="fas icon-md mr-3"
                :class="[requestStatusCSS[request.status],requestStatusIcon[request.status]]"></i>
            <h4>{{ request.statusLabel }}</h4>
          </div>
        </div>
      </div>

      <template v-if="request.type === 1">
        <div class="form-row border-bottom-lighter">
          <FormInput
            class="col-5"
            label="ผู้ส่งคำขอ"
            disabled
            :value="request.user.name" />
          <FormInput
            class="col-5"
            label="องค์กร"
            disabled
            :value="request.orgName" />
          <FormInput
            class="col-5"
            label="อีเมล"
            disabled
            :value="request.user.email" />
          <FormInput
            class="col-5"
            label="หมายเลขโทรศัพท์"
            disabled
            :value="request.user.phone" />
        </div>
        <div class="form-row mt-4">
          <FormInput
            class="col-6"
            input-class="form-control-lg"
            label="หมายเลขการส่งตัวอย่าง ที่เกี่ยวข้อง"
            disabled
            :value="request.submissionNum" />
          <div class="form-group col-4 d-flex align-items-end">
            <button class="btn btn-secondary btn-lg btn-block">
              <i class="fa fa-arrow-right mr-2 btn-inner-icon"></i>ไปดูการส่งตัวอย่าง
            </button>
          </div>
        </div>
        <div class="form-row border-bottom-lighter">
          <FormTextarea
            class="col-10"
            input-class="form-control-lg"
            rows="4"
            label="รายละเอียดคำขอ"
            disabled
            :value="request.details" />
        </div>
        <div class="form-row mt-4">
          <div class="form-group col-5">
            <button class="btn btn-danger btn-lg btn-block">
              <i class="fa fa-times btn-inner-icon"></i>
              ปฏิเสธคำขอ
            </button>
          </div>
          <div class="form-group col-5 d-flex align-items-end">
            <button class="btn btn-success btn-lg btn-block">
              <i class="fa fa-check btn-inner-icon"></i>
              ยืนยันว่าแก้ไขให้เรียบร้อยแล้ว
            </button>
          </div>
        </div>
      </template>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.tag-light {
  padding: .2em .7em;
  border-radius: 4px;
  color: $dark;
  &.yellow  { background: rgba($yellow, .2); }
  &.orange  { background: rgba($orange, .2); }
  &.green   { background: rgba($green, .2); }
  &.teal    { background: rgba($teal, .2); }
  &.blue    { background: rgba($blue, .2); }
  &.grey    { background: rgba($medium, .2); }
  &.red     { background: rgba($red, .2); }
}
</style>

<script>
export default {
  name: 'view-request',
  props: ['request'],
  data () {
    return {
      requestTypeCSS: {
        1: 'orange',
        2: 'green',
        3: 'teal',
        4: 'blue',
        5: 'grey'
      },
      requestStatusCSS: {
        1: 'yellow',
        2: 'green',
        3: 'red'
      },
      requestStatusIcon: {
        1: 'fa-question',
        2: 'fa-check',
        3: 'fa-times'
      },
    }
  }
}
</script>