<template>
<div class="page max-width-1500">
  <div class="max-width-800 mt-3 mb-5">
    <h1 class="mb-3 mt-2 pb-1 border-bottom-pink">
      {{ $t(`home.title`) }}
    </h1>
    <h4 class="font-chatthai intro-text easy-to-read">
      {{ $t(`home.details`) }}
    </h4>
  </div>
  <services />
  <org-chart />
  <contact />
</div>  
</template>

<script>
import Services from '@/components/Services'
import OrgChart from '@/components/OrgChart'
import Contact from '@/components/Contact'

export default {
  name: 'home',
  components: {
    Services,
    OrgChart,
    Contact
  }
}
</script>