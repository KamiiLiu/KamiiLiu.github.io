<template lang="pug">
.wrap
  .wrap-color-grey.upper-wrap
    .mx-auto.content-wrap
      GameConfigurationSection
  .wrap-color.down-wrap
    .d-flex.content-wrap.mx-auto
        CharacterIntroduction.w-1-4.bgc-blue( :color='blueTeam.color' :member='blueTeam.teamMember')
        CountdownTimer.w-1-2.bgc-grey
        CharacterIntroduction.w-1-4.bgc-red( :color='redTeam.color' :member='redTeam.teamMember')
    div
        CharacterIntroduction
</template>
<script lang="ts">
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref, defineComponent } from 'vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import GameConfigurationSection from '@/components/GameConfigurationSection.vue'
import CharacterIntroduction from '@/components/CharacterIntroduction.vue'
import charactersData from '@/assets/characters.json'
import colorList from '@/assets/colorList.json'

// 隊伍成員的型別
interface TeamMember {
  key: string
  label: string
  desc: string
  color: string
  selected: boolean
}
interface Color {
  label: string
  colorLight: string
  colorDark: string
}
interface Team {
  color: Color
  teamMember: TeamMember[]
}

export default defineComponent({
  name: 'GameDashboard',
  components: {
    CharacterIntroduction,
    GameConfigurationSection,
    CountdownTimer
  },
  setup () {
    const title = ref('這是一個標題')
    const description = ref('這是一段描述文字。')
    const blueTeam = createTeam('blue')
    const redTeam = createTeam('red')
    function createTeam (color: string) {
      const selectedColor = selectingColor(color)

      return ref<Team>({
        color: selectedColor,
        teamMember: selectingTeam([color, 'both'])
      })
    }

    function selectingTeam (color: Array<string>): TeamMember[] {
      return charactersData.filter(
        (x) => [...color].includes(x.color) && x.selected
      )
    }
    function selectingColor (color: string): Color {
      let _color = colorList.find((x) => x.label === color)
      if (!_color) {
        _color = {
          label: '預設值',
          colorLight: '#666',
          colorDark: '#666'
        }
      }
      return _color
    }

    return {
      title,
      blueTeam,
      redTeam,
      charactersData,
      description
    }
  }
})
</script>

<style lang="scss" scoped>
$blue:#67A0B8;
$red:#DC5258;
$grey:#7B7B7B;
.bgc-grey{
  background-color: lighten($grey,20%);
}
.bgc-blue{
  background-color: lighten($blue,20%);
}
.bgc-red{
  background-color: lighten($red,20%);
}
.w-1-4 {
  width: 25%;
}
.wrap{
  height: 100vh;
}
.wrap-color{
  background: linear-gradient(90deg,lighten($blue,20%) 50%,lighten($red,20%) 50%);
}
.down-wrap{
  width: 100vw;
  height: 80%;
}
.upper-wrap{
  width: 100vw;
  height: 20%;
}
.content-wrap{
  max-width: 1400px;
}
.w-1-2 {
  width: 50%;
}
</style>
