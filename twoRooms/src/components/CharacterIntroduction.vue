<template lang="pug">
.char-panel()
  p.title-font-style
  .char-block(v-for='person in member')
    p.font-style(:style='{color: color.colorDark}')
      i.bi.bi-person-vcard-fill.icon-style
      | {{ person.label }}
    p.desc-font-style {{ person.desc }}
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'

// 在這裡先定義好 props 的數據類型
interface Props {
  member: {
    key: string, label: string, desc: string, color: string, selected: boolean
  },
  color: {
    label: string, colorLight: string, colorDark: string
  }
}

export default defineComponent({
  name: 'GameConfigurationSection',
  props: {
    member: {
      type: Object as () => Props['member'], // 使用 Props 中對應的成員類型
      required: true
    },
    color: {
      type: Object as () => Props['color'], // 使用 Props 中對應的顏色類型
      required: true
    }
  },
  setup () {
    const title = ref('這是一個標題')
    const description = ref('這是一段描述文字。')

    return {
      title,
      description
    }
  }
})
</script>
<style scoped lang="scss">
/* :style="{ backgroundColor: color.colorDark}" */
p{
  margin: 0;
  text-align: start;
}
.char-panel {
  padding: 2rem;
  .char-block{
    margin-bottom: 1rem;
  }
}
.desc-font-style{
  color: '5b5b5b';
  font-size: 1rem;
}
.title-font-style{
  font-size: 2.5rem;
}
.font-style{
  width: 200px;
  font-size: 1.5rem;
}
.icon-style {
  margin-right: 8px;
}
</style>
