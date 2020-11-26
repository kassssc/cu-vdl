<template>
<div id="contact">
  <h1 class="mb-5 pb-2 text-primary border-b-gradient">
    <i class="fas fa-phone-volume mr-2"></i>ติดต่อสอบถาม
  </h1>

  <div class="row font-chatthai">
    <div class="col-8">
      <div class="form-group row">
        <div class="col-sm-2 col-form-label" />
        <div class="col-sm-10">
          <h2 class="mb-0 font-cu">แบบฟอร์มติดต่อ</h2>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">
          ถึง
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">
          ชื่อผู้ติดต่อ
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">
          บริษัท
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">
          เบอร์ติดต่อ
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">
          อีเมล
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">
          หัวข้อ
        </label>
        <div class="col-sm-10">
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">
          รายละเอียด
        </label>
        <div class="col-sm-10">
          <textarea class="form-control" rows="10" />
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-2 col-form-label" />
        <div class="col-sm-10">
          <button type="submit" class="btn btn-primary btn-lg btn-block font-cu">
            <i class="fas fa-paper-plane btn-inner-icon"></i> ส่งข้อความ
          </button>
        </div>
      </div>
    </div>
    <div class="col-4 pl-4">
      <h2 class="mb-3 font-cu">ข้อมูลการติดต่อ</h2>
      <div class="row no-gutters mb-3">
        <div class="col-4">
          <h4>
            <i class="fas fa-map-marked-alt mr-3"></i>ที่อยู่:
          </h4>
        </div>
        <div class="col pl-2">
          <h4 class="mb-1">ถนนอังรีดูนังต์</h4>
          <h4 class="mb-1">แขวงวังใหม่ เขตพญาไท</h4>
          <h4>กรุงเทพฯ 10330</h4>
        </div>
      </div>
      <div class="row no-gutters mb-3">
        <div class="col-4">
          <h4>
            <i class="fas fa-phone mr-3"></i>โทร:
          </h4>
        </div>
        <div class="col pl-2">
          <h4 class="mb-1">02-218-9604</h4>
          <h4>02-218-9606</h4>
        </div>
      </div>
      <div class="row no-gutters mb-3">
        <div class="col-4">
          <h4>
            <i class="fas fa-fax mr-3"></i>แฟ็กซ์:
          </h4>
        </div>
        <div class="col pl-2">
          <h4>02-218-9532</h4>
        </div>
      </div>
      <div class="row no-gutters mb-3">
        <div class="col-4">
          <h4>
             <i class="fas fa-envelope mr-3"></i>อีเมล:
          </h4>
        </div>
        <div class="col pl-2">
          <h4>cuvdl.thailand@gmail.com</h4>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'contact'
}
</script>

<style lang="scss" scoped>
#contact {
  margin-bottom: 20vh;
}
</style>