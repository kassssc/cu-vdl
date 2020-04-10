<template>
<div class="max-width-1500 page">
  <h2>
    {{ $t(`submit.title`) }}
  </h2>
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