<template>
  <div id="orgchart" class="no-wrap mb-5">
    <h1 class="mb-5 pb-2 text-primary thick-border-bottom-gradient">
      {{ $t(`org.title`) }}
    </h1>

    <div class="grid-main font-chatthai">
      <div class="d-flex flex-column align-items-center">
        <div class="label-tag">
          {{ $t(`org.left.boss.title`) }}
        </div>
        <person-card
          :name="$t(`org.left.boss.name`)"
          :img="org_chart.left.boss.img"
        />
        <div class="label-tag mt-3">
          {{ $t(`org.left.vets.title`) }}
        </div>
        <person-card
          v-for="(vet, i) in org_chart.left.vets.people"
          :key="i"
          :name="$t(`org.left.vets.people[${i}].name`)"
          :img="vet.img"
        />
      </div>

      <div class="d-flex flex-column align-items-center">
        <div class="label-tag">
          {{ $t(`org.middle.title`) }}
        </div>

        <div class="grid-2">
          <div v-for="i in [0,1,2,3]" :key="i" class="d-flex flex-column justify-content-evenly">
            <div class="label-tag outline">
              {{ $t(`org.middle.people[${i}].title`) }}
            </div>
            <person-card
              :name="$t(`org.middle.people[${i}].name`)"
              :img="org_chart.middle.people[i].img"
            />
          </div>
        </div>

        <div class="grid-3">
          <div v-for="i in [4,5,6]" :key="i" class="d-flex flex-column justify-content-evenly">
            <div class="label-tag outline">
              {{ $t(`org.middle.people[${i}].title`) }}
            </div>
            <person-card
              :name="$t(`org.middle.people[${i}].name`)"
              :img="org_chart.middle.people[i].img"
            />
          </div>
        </div>

      </div>

      <div class="d-flex flex-column align-items-center">
        <div v-for="(person, i) in org_chart.right.people" :key="i" 
             class="d-flex flex-column justify-content-evenly align-items-center mx-2 mb-3">
          <div class="label-tag">
            {{ $t(`org.right.people[${i}].title`) }}
          </div>
          <person-card
              :name="$t(`org.right.people[${i}].name`)"
              :img="org_chart.right.people[i].img"
            />
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
  color: $white;
  border-radius: 5px;
  border: 2px solid transparent;
  padding: 0em 0.3em;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
  min-width: 125px;
  &::selection {
    color: $primary; /* WebKit/Blink Browsers */
    background: rgba($white, 0.99);
  }
  &::-moz-selection {
    color: $primary; /* Gecko Browsers */
    background: rgba($white, 0.99);
  }
  &.outline {
    border: 2px solid $primary;
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
      'lang',
      'org_chart',
    ])
  },
  data: () => {
    return {
    }
  },
}
</script>
