<template>
<div class="header">
    <div class="header__logo"></div>
    <router-link to="/event/" tag='div' class="header__btn font-medium" v-if="$route.fullPath === '/'">Создать встречу</router-link>
</div>
</template>

<script>
export default {
  name: 'app-header',
};
</script>

<style>
.font-normal {
  font-family: HelveticaNeue, 'Open Sans', Helvetica, Arial, sans-serif;
  font-weight: 400;
}
.font-medium {
  font-family: HelveticaNeue, 'Open Sans', Helvetica, Arial, sans-serif;
  font-weight: 600;
}
.font-bold {
  font-family: HelveticaNeue, 'Open Sans', Helvetica, Arial, sans-serif;
  font-weight: 700;
}
body {
  margin: 0;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  height: 71px;
}
.header__logo {
  margin-left: 25px;
  height: 71px;
  width: 175px;
  background: url(/assets/logo.svg) no-repeat center;
}
.header__btn {
  font-size: 13px;
  background: #007dff;
  margin: 18px 24px 17px 0px;
  width: 140px;
  height: 36px;
  line-height: 36px;
  border-radius: 4px;
  text-align: center;
  color: #ffffff;
}
.header__btn:hover {
  background: #0059ff;
  cursor: pointer;
}
.header__btn:active {
  background: rgba(11, 0, 255, 0.8);
}
.calendar__select {
  box-shadow: 0 1px 8px 0 rgba(0, 44, 92, 0.28);
  border-radius: 4px;
  left: -24px;
  padding: 16px;
  font-size: 15px;
}
.calendar__select .selected {
  background: #007dff !important;
  color: white;
}
.calendar__select .day,
.calendar__select > header > span {
  border-radius: 2px;
}
.calendar__select > header > span:hover {
  background: url(/assets/arrow.svg) no-repeat center #e9ecef !important;
}
.calendar__select > header > .prev::after,
.calendar__select > header > .next::after {
  content: none !important;
}
.calendar__select > header > .prev {
  background: url(/assets/arrow.svg) no-repeat center;
  transform: rotate(180deg);
}
.calendar__select > header > .next {
  background: url(/assets/arrow.svg) no-repeat center;
}
.calendar__select .day:hover {
  background-color: #e9ecef !important;
  border: 1px solid #e9ecef !important;
  color: black;
}
@media (max-width: 800px) {
  .header__btn {
    display: none;
  }
  .header__logo {
    background-size: 149px 21px;
    height: 21px;
    width: 149px;
    margin-left: 20px;
  }
  .header {
    height: 48px;
  }
  .calendar__select {
    position: fixed !important;
    width: 100% !important;
    left: 0;
  }
}
</style>
