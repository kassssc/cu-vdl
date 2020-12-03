<template>
  <div id="orgchart" class="no-wrap">
    <!-- <h1 class="mb-5 pb-2 text-primary border-b-gradient">
      <i class="fas fa-user-graduate mr-2"></i> บุคลากร
    </h1> -->

    <h3  class="pb-3 border-b mb-4">
      <i class="fas fa-sitemap mr-2"></i> ผังองค์กร หน่วยชันสูตรโรคสัตว์กลาง จุฬาฯ
    </h3>

    <div class="d-flex flex-column align-items-center">
      
      <div class="d-flex justify-content-center">
        <div class="d-flex flex-column justify-content-evenly align-items-center align-items-center mx-2 mb-3">
          <div class="label-tag gradient-bg">
            {{ org_chart.boss.title }}
          </div>
          <person-card
            :name="org_chart.boss.name"
            :img="org_chart.boss.img" />
        </div>
      </div>

      <div class="grid-2">
        <div  v-for="person of org_chart.vets"
              :key="person.name"
              class="d-flex flex-column justify-content-evenly align-items-center">
          <div class="label-tag">
            {{ person.title }}  
          </div>
          <person-card
            :name="person.name"
            :img="person.img" />
        </div>
      </div>

      <div class="label-tag mt-4">
        {{ org_chart.lab_employees.title }}
      </div>
      <div class="grid-4">
        <div  v-for="person of org_chart.lab_employees.top"
              :key="person.name"
              class="d-flex flex-column justify-content-evenly align-items-center">
          <div class="label-tag outline">
            {{ person.title }}
          </div>
          <person-card
            :name="person.name"
            :img="person.img" />
        </div>
      </div>

      <div class="grid-3">
        <div  v-for="person of org_chart.lab_employees.bottom"
              :key="person.name"
              class="d-flex flex-column justify-content-evenly align-items-center">
          <div class="label-tag outline">
            {{ person.title }}
          </div>
          <person-card
            :name="person.name"
            :img="person.img" />
        </div>
      </div>

      <div class="grid-3">
        <div  v-for="person of org_chart.employees"
              :key="person.name"
              class="d-flex flex-column justify-content-evenly align-items-center">
          <div class="label-tag">
            {{ person.title }}
          </div>
          <person-card
            :name="person.name"
            :img="person.img" />
        </div>
      </div>
    </div>

    <!-- <div class="grid-main pt-4">
      <div class="d-flex flex-column align-items-center">
        <div class="d-flex flex-column justify-content-evenly align-items-center mx-2 mb-3">
          <div class="label-tag gradient-bg">
            {{ org_chart.left.boss.title }}
          </div>
          <person-card
            :name="org_chart.left.boss.name"
            :img="org_chart.left.boss.img" />
        </div>
        <div  v-for="person of org_chart.left.vets"
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

      <div class="d-flex flex-column align-items-center">
        <div class="label-tag mb-3">
          {{ org_chart.middle.title }}
        </div>

        <div class="grid-2">
          <div  v-for="person of org_chart.middle.top"
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
          <div  v-for="person of org_chart.middle.middle"
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

        <div class="grid-3 pt-3">
          <div  v-for="person of org_chart.middle.bottom"
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
        <div  v-for="person of org_chart.right.people"
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

    </div> -->
  </div>
</template>

<script>
import PersonCard from './PersonCard.vue'

export default {
  name: 'org-chart',
  components: {
    'person-card': PersonCard,
  },
  data () {
    return {
      org_chart: {
        boss: {
          title: 'หัวหน้าหน่วยชันสูตรโรคสัตว์กลาง',
          name: 'ผศ.น.สพ.ดร.สว่าง  เกษแดงสกลวุฒิ',
          img: 'https://i.ibb.co/KrcGxKJ/boss.jpg'
        },
        vets: [
          {
            title: 'สัตวแพทย์',
            name: 'น.สพ.รชฎ ตันติเลิศเจริญ',
            img: 'https://i.ibb.co/GM8S577/vet1.png'
          },
          {
            title: 'สัตวแพทย์',
            name: 'สพ.ญ.นภวัลย์ บรรพพงศ์',
            img: 'https://i.ibb.co/T0z5kjN/vet2.png'
          },
        ],
        lab_employees: {
          title: 'เจ้าหน้าที่บริการวิทยาศาสตร์',
          top: [
            {
              title: 'งานไวรัสวิทยา',
              name: 'นางพอจิต ชูใจ',
              img: 'https://i.ibb.co/QmkCcY2/virus.png'
            },
            {
              title: 'งานซีรั่มวิทยา',
              name: 'นางผุสดี มาคุ้ม',
              img: 'https://i.ibb.co/t3Z9Cmr/serum.png'
            },
            {
              title: 'งานแบคทีเรีย',
              name: 'นายพงษ์ไทย บุญคำ',
              img: 'https://i.ibb.co/RYGSCJk/bacteria.png'
            },
            {
              title: 'งานอณูชีววิทยา',
              name: 'นางสาวนันทิยา เอี่ยมประภาศ',
              img: 'https://i.ibb.co/dWYtw3S/bio.png'
            },
          ],
          bottom: [
            {
              title: 'งานโลหิตวิทยา',
              name: 'นางเกษร เอี่ยมละออ',
              img: 'https://i.ibb.co/VQJGGSZ/blood1.png'
            },
            {
              title: 'งานโลหิตวิทยา',
              name: 'นางวันเพ็ญ อดุลยานุภาพ',
              img: 'https://i.ibb.co/7vnjSKV/blood2.png'
            },
            {
              title: 'งานโลหิตวิทยา',
              name: 'นายกฤษณ์ หัสเขตร์',
              img: 'https://i.ibb.co/zR7DZGM/blood3.png'
            },
          ]
        },
        employees: [
          {
            title: 'พนักงานบริการ',
            name: 'นางสาวศศิกานต์ สินโทต้อม',
            img: 'https://i.ibb.co/wYKrPzT/service.png'
          },
          {
            title: 'เจ้าหน้าที่สำนักงาน (ธุรการ)',
            name: 'นางสาวธันยาภัทร์ พัฒน์สินศิริ',
            img: 'https://i.ibb.co/n3yYwMj/staff.png'
          },
          {
            title: 'พนักงานห้องทดลอง',
            name: 'นางสาวจีรภรณ์ สุขชูศรี',
            img: 'https://i.ibb.co/3ByBS3y/lab.png'
          },
        ]
      },
      org_chart_old: {

        left: {
          boss: {
            title: 'หัวหน้าหน่วยชันสูตรโรคสัตว์กลาง',
            name: 'ผศ.น.สพ.ดร.สว่าง  เกษแดงสกลวุฒิ',
            img: 'https://i.ibb.co/KrcGxKJ/boss.jpg'
          },
          vets: [
            {
              title: 'สัตวแพทย์',
              name: 'น.สพ.รชฎ ตันติเลิศเจริญ',
              img: 'https://i.ibb.co/GM8S577/vet1.png'
            },
            {
              title: 'สัตวแพทย์',
              name: 'สพ.ญ.นภวัลย์ บรรพพงศ์',
              img: 'https://i.ibb.co/T0z5kjN/vet2.png'
            },
          ]
        },
        middle: {
          title: 'เจ้าหน้าที่บริการวิทยาศาสตร์',
          top: [
            {
              title: 'งานไวรัสวิทยา',
              name: 'นางพอจิต ชูใจ',
              img: 'https://i.ibb.co/QmkCcY2/virus.png'
            },
            {
              title: 'งานซีรั่มวิทยา',
              name: 'นางผุสดี มาคุ้ม',
              img: 'https://i.ibb.co/t3Z9Cmr/serum.png'
            }
          ],
          middle: [
            {
              title: 'งานแบคทีเรีย',
              name: 'นายพงษ์ไทย บุญคำ',
              img: 'https://i.ibb.co/RYGSCJk/bacteria.png'
            },
            {
              title: 'งานอณูชีววิทยา',
              name: 'นางสาวนันทิยา เอี่ยมประภาศ',
              img: 'https://i.ibb.co/dWYtw3S/bio.png'
            },
          ],
          bottom: [
            {
              title: 'งานโลหิตวิทยา',
              name: 'นางเกษร เอี่ยมละออ',
              img: 'https://i.ibb.co/VQJGGSZ/blood1.png'
            },
            {
              title: 'งานโลหิตวิทยา',
              name: 'นางวันเพ็ญ อดุลยานุภาพ',
              img: 'https://i.ibb.co/7vnjSKV/blood2.png'
            },
            {
              title: 'งานโลหิตวิทยา',
              name: 'นายกฤษณ์ หัสเขตร์',
              img: 'https://i.ibb.co/zR7DZGM/blood3.png'
            },
          ]
        },
        right: {
          people: [
            {
              title: 'เจ้าหน้าที่สำนักงาน (ธุรการ)',
              name: 'นางสาวธันยาภัทร์ พัฒน์สินศิริ',
              img: 'https://i.ibb.co/n3yYwMj/staff.png'
            },
            {
              title: 'พนักงานบริการ',
              name: 'นางสาวศศิกานต์ สินโทต้อม',
              img: 'https://i.ibb.co/wYKrPzT/service.png'
            },
            {
              title: 'พนักงานห้องทดลอง',
              name: 'นางสาวจีรภรณ์ สุขชูศรี',
              img: 'https://i.ibb.co/3ByBS3y/lab.png'
            },
          ]
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.grid-main {
  display: grid;
  grid-template-columns: 1fr 1.75fr 1fr;
}
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 6em;
  grid-row-gap: 1em;
  padding: 1em;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 6em;
  grid-row-gap: 1em;
  padding: 1em;
}
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 6em;
  grid-row-gap: 1em;
  padding: 1em;
}
.label-tag {
  background: $primary;
  color: $light;
  border-radius: $border-radius;
  padding: .1em 0.4em;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: center;
  min-width: 150px;
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