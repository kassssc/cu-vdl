<template>
  <div id="orgchart" class="no-wrap">
    <h1 class="mb-5 pb-2 text-primary thick-border-bottom-gradient">
      บุคลากร
    </h1>

    <div class="grid-main font-chatthai">
      <div class="d-flex flex-column align-items-center">
        <div class="label-tag gradient-bg">
          {{ orgChart.left.boss.title }}
        </div>
        <person-card
          :name="orgChart.left.boss.name"
          :img="orgChart.left.boss.img"
        />
        <div class="label-tag mt-3">
          {{ orgChart.left.vets.title }}
        </div>
        <person-card
          v-for="vet of orgChart.left.vets.people"
          :key="vet.name"
          :name="vet.name"
          :img="vet.img" />
      </div>

      <div class="d-flex flex-column align-items-center">
        <div class="label-tag">
          {{ orgChart.middle.title }}
        </div>

        <div class="grid-2">
          <div  v-for="person of orgChart.middle.top"
                :key="person.name"
                class="d-flex flex-column justify-content-evenly">
            <div class="label-tag outline">
              {{ person.title }}
            </div>
            <person-card
              :name="person.name"
              :img="person.img" />
          </div>
        </div>
        <div class="grid-2">
          <div  v-for="person of orgChart.middle.middle"
                :key="person.name"
                class="d-flex flex-column justify-content-evenly">
            <div class="label-tag outline">
              {{ person.title }}
            </div>
            <person-card
              :name="person.name"
              :img="person.img" />
          </div>
        </div>

        <div class="grid-3">
          <div  v-for="person of orgChart.middle.bottom"
                :key="person.name"
                class="d-flex flex-column justify-content-evenly">
            <div class="label-tag outline">
              {{ person.title }}
            </div>
            <person-card
              :name="person.name"
              :img="person.img" />
          </div>
        </div>

      </div>

      <div class="d-flex flex-column align-items-center">
        <div  v-for="person of orgChart.right.people"
              :key="person.name" 
              class="d-flex flex-column justify-content-evenly align-items-center mx-2 mb-3">
          <div class="label-tag">
            {{ person.title }}
          </div>
          <person-card
            :name="person.name"
            :img="person.img" />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.grid-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 3em;
    grid-row-gap: 1em;
    padding: 1em;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 3em;
    grid-row-gap: 1em;
    padding-bottom: 3em;
  }
}
.label-tag {
  background: $primary;
  color: $light;
  border-radius: $border-radius;
  padding: .1em 0.4em;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
  min-width: 125px;
  &.gradient-bg {
    background: linear-gradient(to right, $primary, $placeholder);
    border-width: 0;
  }
  &::selection {
    color: $primary; /* WebKit/Blink Browsers */
    background: rgba($white, 0.99);
  }
  &::-moz-selection {
    color: $primary; /* Gecko Browsers */
    background: rgba($white, 0.99);
  }
  &.outline {
    box-shadow:0px 0px 0px 2px $primary inset;
    color: $primary;
    background: transparent;
    &::selection {
      background: rgba($primary,.99); /* WebKit/Blink Browsers */
      color: $white;
    }
    &::-moz-selection {
      background: rgba($primary,.99); /* Gecko Browsers */
      color: $white;
    }
  }
}
</style>

<script>
import { mapGetters } from 'vuex'
import PersonCard from '@/components/PersonCard.vue'

export default {
  name: 'org-chart',
  components: {
    'person-card': PersonCard,
  },
  computed: {
    ...mapGetters([
      'orgChart',
    ])
  }
}
</script>
