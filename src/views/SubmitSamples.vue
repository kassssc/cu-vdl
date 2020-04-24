<template>
<div class="max-width-1500 page">
  <div class="mb-2">
    <i class="fas fa-vial icon-lg"></i>
    <h2 class="d-inline">
      {{ $t(`submit.title`) }}
    </h2>
  </div>
  <router-view />
</div>
</template>

<script>
export default {
  name: 'submit-samples',
  data () {
    return {
    }
  }
}
</script>