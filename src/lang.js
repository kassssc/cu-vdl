import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    title: 'Veterinary Diagnostic Laboratory, Chulalongkorn University',
    nav: {
      about: 'Home',
      trackSubmissions: 'Track Submissions',
      submitSamples: 'Submit Samples',
    },
    general: {
      email: 'Email',
      password: 'Password',
      remember: 'Remember Me',
      login: 'Login',
      back: 'Back'
    },
    home: {
      title: 'About Us',
      details: 'หน่วยชันสูตรโรคสัตว์กลาง คณะสัตวแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย เป็นหน่วยงานบริการวิชาการ ทำหน้าที่ในการดูแลรับผิดชอบงานบริการด้านการตรวจวินิจฉัยโรคทางห้องปฏิบัติการทางสัตวแพทย์ ซึ่งมีขอบข่ายครอบคลุมงานด้านโลหิตวิทยา ซีรัมวิทยา ไวรัสวิทยา แบคทีเรียวิทยา และอณูชีววิทยา นอกจากนี้ยังให้บริการให้คำปรึกษาในการวินิจฉัยโรคและการแปลผลการตรวจทางห้องปฏิบัติการ การให้ความรู้เกี่ยวกับโรคสัตว์และการตรวจวินิจฉัยโรคแก่ประชาชนและหน่วยงานต่างๆ สนับสนุนการเรียนการสอนและงานวิจัยที่เกี่ยวข้องกับโรคสัตว์ที่สำคัญของคณะสัตวแพทย์ศาสตร์ รวมถึงการเป็นแหล่งอ้างอิงในการชันสูตรโรคสัตว์ที่สำคัญ หน่วยชันสูตรโรคสัตว์กลางดำเนินงานโดยคณาจารย์และบุคลากรที่มีความรู้ความชำนาญในด้านต่างๆ มีความพร้อมในการให้บริการด้านวิชาการ และมีการพัฒนาความสามารถในการตรวจวินิจฉัยโรคให้หลากหลายและทันสมัยอยู่เสมอ เพื่อให้ผู้ใช้บริการมีความพึงพอใจและมั่นใจในบริการมากที่สุด',
    },
    services: {
      title: 'Service Fees',
      download: 'DOWNLOAD',
      list: [
        'Hermatology',
        'Bacteriology',
        'Virology',
        'Serology',
        'Molecular',
        'งานทดสอบประสิทธิภาพยาฆ่าเชื้อ - ประเมินราคาก่อนให้บริการ',
      ]
    },
    org: {
      title: 'Organization Chart',
      left: {
        boss: {
          title: 'Head of VDL',
          name: 'Dr. Sawang Napawan Kesdangsakonwut',
        },
        vets: {
          title: 'Veterinarian',
          people: [
            {
              name: 'Rachod Tantilertcharoen',
            },
            {
              name: 'Napawan Bunpapong',
            },
          ]
        }
      },
      middle: {
        title: 'Scientist',
        people: [
          {
            title: 'Virology',
            name: 'Porjit Choojai',
          },
          {
            title: 'Serology',
            name: 'Pusadee Makum',
          },
          {
            title: 'Bacteriology',
            name: 'Pongthai Boonkham',
          },
          {
            title: 'Molecular',
            name: 'Nanthiya Iampraphat',
          },
          {
            title: 'Hematology',
            name: 'Kesorn Aiamlaall',
          },
          {
            title: 'Hematology',
            name: 'Wanpen Adulyanubap',
          },
          {
            title: 'Hematology',
            name: 'Khrid​ Hutsaket',
          },
        ]
      },
      right: {
        people: [
          {
            title: 'Administrator',
            name: 'Thunyapat Patsinsiri',
          },
          {
            title: 'Staff',
            name: 'Jerapon Sukchusri',
          },
          {
            title: 'Staff',
            name: 'Sasikarn Sintotom',
          },
        ]
      }
    },
    contact: {
      title: 'Contact Us',
      form: {
        to: 'To',
        name: 'Your Name',
        company: 'Company',
        tel: 'Phone Number',
        email: 'Email',
        subject: 'Subject',
        details: 'Details',
        send: 'Send Message'
      },
      addr: {
        title: 'Address',
        addr: 'ถนนอังรีดูนังต์ ปทุมวัน กรุงเทพฯ 10330',
        tel: 'Tel: 02-218-9606',
        fax: 'Fax: 02-218-9532'
      },
    }
  },
  th: {
    title: 'หน่วยชันสูตรโรคสัตว์กลาง จุฬาลงกรณ์มหาวิทยาลัย',
    nav: {
      about: 'หน้าหลัก',
      trackSubmissions: 'ติดตามผลและรายงาน',
      submitSamples: 'ส่งตัวอย่าง',
    },
    general: {
      email: 'อีเมล',
      password: 'รหัสผ่าน',
      remember: 'จำไว้ในระบบ',
      login: 'เข้าสู่ระบบ',
      back: 'กลับไป'
    },
    home: {
      title: 'เกี่ยวกับเรา',
      details: 'หน่วยชันสูตรโรคสัตว์กลาง คณะสัตวแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย เป็นหน่วยงานบริการวิชาการ ทำหน้าที่ในการดูแลรับผิดชอบงานบริการด้านการตรวจวินิจฉัยโรคทางห้องปฏิบัติการทางสัตวแพทย์ ซึ่งมีขอบข่ายครอบคลุมงานด้านโลหิตวิทยา ซีรัมวิทยา ไวรัสวิทยา แบคทีเรียวิทยา และอณูชีววิทยา นอกจากนี้ยังให้บริการให้คำปรึกษาในการวินิจฉัยโรคและการแปลผลการตรวจทางห้องปฏิบัติการ การให้ความรู้เกี่ยวกับโรคสัตว์และการตรวจวินิจฉัยโรคแก่ประชาชนและหน่วยงานต่างๆ สนับสนุนการเรียนการสอนและงานวิจัยที่เกี่ยวข้องกับโรคสัตว์ที่สำคัญของคณะสัตวแพทย์ศาสตร์ รวมถึงการเป็นแหล่งอ้างอิงในการชันสูตรโรคสัตว์ที่สำคัญ หน่วยชันสูตรโรคสัตว์กลางดำเนินงานโดยคณาจารย์และบุคลากรที่มีความรู้ความชำนาญในด้านต่างๆ มีความพร้อมในการให้บริการด้านวิชาการ และมีการพัฒนาความสามารถในการตรวจวินิจฉัยโรคให้หลากหลายและทันสมัยอยู่เสมอ เพื่อให้ผู้ใช้บริการมีความพึงพอใจและมั่นใจในบริการมากที่สุด',
    },
    services: {
      title: 'รายการค่าบริการหน่วยชันสูตรโรคสัตว์กลาง',
      download: 'ดาวน์โหลด',
      list: [
        'งานโลหิตวิทยา',
        'งานแบคทีเรีย',
        'งานไวรัสวิทยา',
        'งานซีรั่มวิทยา',
        'งานอนูชีววิทยา',
        'งานทดสอบประสิทธิภาพยาฆ่าเชื้อ - ประเมินราคาก่อนให้บริการ',
      ]
    },
    org: {
      title: 'ผังองค์กร',
      left: {
        boss: {
          title: 'หัวหน้าหน่วยชันสูตรโรคสัตว์กลาง',
          name: 'ผศ.น.สพ.ดร.สว่าง  เกษแดงสกลวุฒิ',
        },
        vets: {
          title: 'สัตวแพทย์',
          people: [
            {
              name: 'นายสัตวแพทย์รชฎ ตันติเลิศเจริญ',
            },
            {
              name: 'สัตวแพทย์หญิงนภวัลย์ บรรพพงศ์',
            },
          ]
        }
      },
      middle: {
        title: 'เจ้าหน้าที่บริการวิทยาศาสตร์',
        people: [
          {
            title: 'งานไวรัสวิทยา',
            name: 'นางพอจิต ชูใจ',
          },
          {
            title: 'งานซีรั่มวิทยา',
            name: 'นางผุสดี มาคุ้ม',
          },
          {
            title: 'งานแบคทีเรีย',
            name: 'นายพงษ์ไทย บุญคำ',
          },
          {
            title: 'งานอณูชีววิทยา',
            name: 'นางสาวนันทิยา เอี่ยมประภาศ',
          },
          {
            title: 'งานโลหิตวิทยา',
            name: 'นางเกษร เอี่ยมละออ',
          },
          {
            title: 'งานโลหิตวิทยา',
            name: 'นางวันเพ็ญ อดุลยานุภาพ',
          },
          {
            title: 'งานโลหิตวิทยา',
            name: 'นายกฤษณ์ หัสเขตร์',
          },
        ]
      },
      right: {
        people: [
          {
            title: 'เจ้าหน้าที่สำนักงาน (ธุรการ)',
            name: 'นางสาวธันยาภัทร์ พัฒน์สินศิริ',
          },
          {
            title: 'พนักงานบริการทั่วไป',
            name: 'นางสาวศศิกานต์ สินโทต้อม',
          },
          {
            title: 'พนักงานห้องทดลอง',
            name: 'นางสาวจีรภรณ์ สุขชูศรี',
          },
        ]
      }
    },
    contact: {
      title: 'ติดต่อเรา',
      form: {
        to: 'ถึง',
        name: 'ชื่อผู้ติดต่อ',
        company: 'บริษัท',
        tel: 'เบอร์ติดต่อ',
        email: 'อีเมล',
        subject: 'หัวข้อ',
        details: 'รายละเอียด',
        send: 'ส่งข้อความ'
      },
      addr: {
        title: 'ที่อยู่',
        addr: 'ถนนอังรีดูนังต์ ปทุมวัน กรุงเทพฯ 10330',
        tel: 'โทร: 02-218-9606',
        fax: 'แฟ็กซ์: 02-218-9532'
      },
    }
  }
}

const i18n = new VueI18n({
  locale: 'th',
  fallbackLocale: 'th',
  messages: messages
})

export default i18n