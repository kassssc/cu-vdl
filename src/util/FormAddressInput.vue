<template>
  <div class="form-group">
    <div class="form-row m-0">
      <FormInput
        class="col-12"
        type="text"
        :label="english? 'Address (English)' : 'ที่อยู่'"
        :placeholder="english? 'Address Line 1' : 'เลขที่ ซอย ถนน'"
        @change="emit_input()"
        required
        v-model="addr1" />
      <FormInput
        class="col-12"
        type="text"
        :placeholder="english? 'Address Line 2' : 'แขวง เขต / ตำบล อำเภอ'"
        @change="emit_input()"
        required
        v-model="addr2" />
      <FormInput
        class="col-4 mb-0"
        :placeholder="english? 'City' : 'เมือง'"
        @change="emit_input()"
        type="text"
        v-model="city" />
      <FormSelect
        class="col-5 mb-0"
        :placeholder="english? 'Province' : 'จังหวัด'"
        :clearable="false"
        :options="english? provincesEng : provinces"
        @change="emit_input()"
        required
        v-model="province" />
      <FormInput
        class="col mb-0"
        :placeholder="english? 'Zip' : 'รหัสไปรษณีย์'"
        type="number"
        maxlength="5"
        required
        @change="emit_input()"
        v-model="zip" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-address-input',
  props: {
    english: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    invalid () {
      return !this.addr1 || !this.addr2 || !this.province || !this.zip
    },
    address () {
      if (this.invalid) return null
      if (this.city) {
        return `${this.addr1}\n${this.addr2}\n${this.city} ${this.province} ${this.zip}`
      }
      return `${this.addr1}\n${this.addr2}\n${this.province} ${this.zip}`
    }
  },
  data () {
    return {
      addr1: '',
      addr2: '',
      city: '',
      province: '',
      zip: '',
      provinces: [
        'กรุงเทพฯ',
        'กระบี่',
        'กาญจนบุรี',
        'กาฬสินธุ์',
        'กำแพงเพชร',
        'ขอนแก่น',
        'จันทบุรี',
        'ฉะเชิงเทรา',
        'ชลบุรี',
        'ชัยนาท',
        'ชัยภูมิ',
        'ชุมพร',
        'เชียงใหม่',
        'เชียงราย',
        'ตรัง',
        'ตราด',
        'ตาก',
        'นครนายก',
        'นครปฐม',
        'นครพนม',
        'นครราชสีมา',
        'นครศรีธรรมราช',
        'นครสวรรค์',
        'นนทบุรี',
        'นราธิวาส',
        'น่าน',
        'บึงกาฬ',
        'บุรีรัมย์',
        'ปทุมธานี',
        'ประจวบคีรีขันธ์',
        'ปราจีนบุรี',
        'ปัตตานี',
        'พระนครศรีอยุธยา',
        'พะเยา',
        'พังงา',
        'พัทลุง',
        'พิจิตร',
        'พิษณุโลก',
        'เพชรบุรี',
        'เพชรบูรณ์',
        'แพร่',
        'ภูเก็ต',
        'มหาสารคาม',
        'มุกดาหาร',
        'แม่ฮ่องสอน',
        'ยโสธร',
        'ยะลา',
        'ร้อยเอ็ด',
        'ระนอง',
        'ระยอง',
        'ราชบุรี',
        'ลพบุรี',
        'ลำปาง',
        'ลำพูน',
        'เลย',
        'ศรีสะเกษ',
        'สกลนคร',
        'สงขลา',
        'สตูล',
        'สมุทรปราการ',
        'สมุทรสงคราม',
        'สมุทรสาคร',
        'สระแก้ว',
        'สระบุรี',
        'สิงห์บุรี',
        'สุโขทัย',
        'สุพรรณบุรี',
        'สุราษฎร์ธานี',
        'สุรินทร์',
        'หนองคาย',
        'หนองบัวลำภู',
        'อ่างทอง',
        'อำนาจเจริญ',
        'อุดรธานี',
        'อุตรดิตถ์',
        'อุทัยธานี',
        'อุบลราชธานี',
      ],
      provincesEng: [
        'Bangkok',
        'Krabi',
        'Kanchanaburi',
        'Kalasin',
        'Kamphaengphet',
        'Khonkaen',
        'Chanthaburi',
        'Chachoengsao',
        'Chonburi',
        'Chainat',
        'Chaiyaphum',
        'Chumphon',
        'Chiangmai',
        'Chiangrai',
        'Trang',
        'Trat',
        'Tak',
        'Nakhonnayok',
        'Nakhonpathom',
        'Nakhonphanom',
        'Nakhonratchasima',
        'Nakhonsithammarat',
        'Nakhonsawan',
        'Nonthaburi',
        'Narathiwat',
        'Nan',
        'Buengkan',
        'Buriram',
        'Pathumthani',
        'Prachuapkhirikhan',
        'Prachinburi',
        'Pattani',
        'Pyutthaya',
        'Phayao',
        'Phangnga',
        'Phatthalung',
        'Phichit',
        'Phitsanulok',
        'Phetchaburi',
        'Phetchabun',
        'Phrae',
        'Phuket',
        'Mahasarakham',
        'Mukdahan',
        'Maehongson',
        'Yasothon',
        'Yala',
        'Roi-et',
        'Ranong',
        'Rayong',
        'Ratchaburi',
        'Lopburi',
        'Loei',
        'Lampang',
        'Lamphun',
        'Sisaket',
        'Sakonnakhon',
        'Songkhla',
        'Satun',
        'Samutprakan',
        'Samutsongkhram',
        'Samutsakhon',
        'Sakaeo',
        'Saraburi',
        'Singburi',
        'Sukhothai',
        'Suphanburi',
        'Suratthani',
        'Surin',
        'Nongkhai',
        'Nongbualamphu',
        'Angthong',
        'Amnatcharoen',
        'Udonthani',
        'Uttaradit',
        'Uthaithani',
        'Ubonratchathani',
      ]
    }
  },
  methods: {
    emit_input () {
      this.$emit('input', this.address)
    }
  }
}
</script>