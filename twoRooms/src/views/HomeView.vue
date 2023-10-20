<template>
  <div class="home">
    <GameDashboard/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import GameDashboard from '@/components/GameDashboard.vue'
@Options({
  components: {
    GameDashboard
  }
})
export default class HomeView extends Vue {}
</script>
