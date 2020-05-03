<template>
<div id="contact">
  <h1 class="mb-5 pb-2 text-primary thick-border-bottom-gradient">
    ติดต่อสอบถาม
  </h1>

  <div class="row font-chatthai">
    <div class="col-8">
      <div class="form-group row">
        <div class="col-sm-2 col-form-label" />
        <div class="col-sm-10">
          <h2 class="mb-0">
            แบบฟอร์มติดต่อ
          </h2>
        </div>
      </div>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">
          ถึง
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">
          ชื่อผู้ติดต่อ
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">
          บริษัท
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">
          เบอร์ติดต่อ
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">
          อีเมล
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">
          หัวข้อ
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-2 col-form-label">
          รายละเอียด
        </label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="10" />
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-2 col-form-label" />
        <div class="col-sm-10">
          <button type="submit" class="btn btn-primary btn-width-md">
            ส่งข้อความ
          </button>
        </div>
      </div>
    </div>
    <div class="col-4 pl-5">
      <h2 class="mb-3">
        ที่อยู่
      </h2>
      <h4 class="mb-4">
        ถนนอังรีดูนังต์ ปทุมวัน กรุงเทพฯ 10330
      </h4>
      <h4 class="mb-2">
        <i class="fas fa-phone mr-3"></i>
        โทร: 02-218-9606
      </h4>
      <h4>
        <i class="fas fa-fax mr-3"></i>
        แฟ็กซ์: 02-218-9532
      </h4>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
#contact {
  margin-bottom: 20vh;
}
</style>

<script>
export default {
  name: 'contact'
}
</script>
