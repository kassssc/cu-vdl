<template>
  <div>
    <h3 class="mb-2">
      <i class="fas fa-file-contract icon-lg mr-1"></i>
      {{ `รายละเอียดคำขอ ${request.id}` }}
    </h3>
    <!-- <div class="form-row font-chatthai">
      <div class="form-group col-6">
        <label>สถานะ</label>
      </div>
      <div class="form-group col-6">
        
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  name: 'view-request',
  props: ['request']
}
</script>