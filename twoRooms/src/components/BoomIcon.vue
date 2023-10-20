<template lang="pug">
.bomb-container
  .bomb
    .spark
</template>
<style lang="scss" scoped>
$lighten-grey: #919191;
$mid-grey: #353535;
$dark-grey: #222222;

@keyframes swing {
  0%, 100% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes sparkFlicker {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.bomb-container {
  position: relative;
  animation: swing 2s infinite;
  width: 100%;
  height: 100%; // Apply the swing animation to the container
}
.bomb {
  position: relative;
  background-color: $dark-grey;
  border-radius: 50%;
  border: 5px solid $lighten-grey;
  width: 100%;
  height: 100%;
  animation: heartbeat 0.5s infinite; // Apply both swing and heartbeat animations
}

.bomb::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 40px;
  background-color: $lighten-grey;
  border-radius: 5px;
}

.bomb::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
  height: 20px;
  background-color: $lighten-grey;
  border-radius: 5px;
}

.bomb .spark {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background-color: #f00;
  border-radius: 50%;
  animation: sparkFlicker 0.3s infinite; // Apply the sparkFlicker animation
}
</style>
