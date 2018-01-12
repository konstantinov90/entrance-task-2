<template>
<div class="calendar">
    <calendar-btn direction="left"></calendar-btn>
    <datepicker :value="date" @input="setDate" :format="formatter"
      calendar-class="calendar__select font-normal" :monday-first="true"
      class="calendar__input font-medium" language="ru"></datepicker>
    <calendar-btn></calendar-btn>
</div>  
</template>

<script>
import { addDays, format, isToday, isYesterday, isTomorrow } from 'date-fns';
import ru from 'date-fns/locale/ru';
import Datepicker from 'vuejs-datepicker';
import CalendarBtn from './CalendarBtn.vue';

export default {
  name: 'calendar',
  components: { Datepicker, CalendarBtn },
  computed: {
    date() {
      return this.$store.state.date;
    },
  },
  methods: {
    formatter(date) {
      let suffix;
      if (isToday(date)) suffix = '[⋅ Сегодня]';
      else if (isTomorrow(date)) suffix = '[⋅ Завтра]';
      else if (isYesterday(date)) suffix = '[⋅ Вчера]';
      return format(date, `DD MMM ${suffix || 'YYYY'}`, { locale: ru }).replace('.', '');
    },
    setDate(date) {
      this.$store.commit('setDate', date);
    },
  },
};
</script>

<style>
.calendar {
  display: flex;
  padding: 0px 14px 0 24px;
  height: 46px;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  justify-content: space-between;
  max-width: 207px;
  flex-basis: 207px;
  flex: 1;
}
.calendar__input {
  max-width: 149px;
  min-width: 120px;
  cursor: pointer;
}
.calendar__input input {
  font-size: 15px;
  font-family: inherit;
  border: none;
  text-align: center;
  line-height: 24px;
  width: 100%;
  cursor: pointer;
}
@media (max-width: 800px) {
  .calendar {
    width: 100%;
    height: 56px;
    max-width: unset;
  }
}
</style>
