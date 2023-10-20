<template lang="pug">
p 我是遊戲設置區
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'GameConfigurationSection',
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

<style scoped>
/* 你可以在這裡加入你的樣式 */
h1 {
  color: #333;
}
p {
  color: #666;
}
</style>
