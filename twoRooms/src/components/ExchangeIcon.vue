<template lang="pug">
.container
    i.bi.bi-person-walking.person1
    i.bi.bi-person-walking.person2
    i.bi.bi-person-walking.person3
    i.bi.bi-door-open.door
</template>
<style scoped>
.container {
    position: relative;
    width: 300px;
    height: 100px;
}

.bi {
    font-size: 50px;
    position: absolute;
    bottom: 0;
}

.person1, .person2, .person3 {
    animation: walkOut 5s forwards;
}

.person1 {
    left: 0;
    animation-delay: 0s;
}

.person2 {
    left: 60px;
    animation-delay: 1s;
}

.person3 {
    left: 120px;
    animation-delay: 2s;
}

.door {
    right: 0;
}

@keyframes walkOut {
    to {
        transform: translateX(150px);
    }
}
</style>
