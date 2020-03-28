<template>
<div>
  <div class="about my-3">
    <h2 class="text-bold mb-1 mt-2">
      {{ $t(`home.title`) }}
    </h2>
    <div class="h-line mb-3"></div>
    <h4 class="intro-text">
      {{ $t(`home.details`) }}
    </h4>
  </div>
  <services-section />
  <org-chart-section />
  <contact-section />
</div>  
</template>

<style lang="scss" scoped>
.intro-text {
  letter-spacing: 0.02em;
  line-height: 1.5em !important;
}
.about {
  max-width: 800px;
}
</style>

<script>
import Services from '@/components/Services'
import OrgChart from '@/components/OrgChart'
import Contact from '@/components/Contact'

export default {
  name: 'about',
  components: {
    'services-section': Services,
    'org-chart-section': OrgChart,
    'contact-section': Contact
  }
}
</script>