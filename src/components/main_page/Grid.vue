<template>
  <div class="grid" :class="gridClass">
      <grid-item v-for="(event, index) in items" :key="index" :event="event"
        @gridItemOver="onMouseOver" @gridItemOut="onMouseOut"></grid-item>
  </div>
</template>

<script>
// import gql from 'graphql-tag';
import { isSameDay, compareAsc, isWithinRange } from 'date-fns';
import GridItem from './GridItem.vue';
import { events } from '../../store/mock_data.js';

export default {
  name: 'grid',
  components: {
    GridItem,
  },
  props: {
    room: {
      type: Object,
      required: true,
    },
    firstOfFloor: {
      type: Boolean,
      default: false,
    },
    theVeryFirst: {
      type: Boolean,
      default: false,
    },
  },
  // apollo: {
  //   events: {
  //     query: gql`
  //       {
  //         events {
  //           id
  //           title
  //           dateStart
  //           dateEnd
  //           users {
  //             id
  //           }
  //           room {
  //             id
  //           }
  //         }
  //       }
  //     `,
  //     variables() {
  //       return {
  //         date: this.date,
  //       };
  //     },
  //     update(data) {
  //       return this.filterEvents(data.events);
  //     },
  //   },
  // },
  methods: {
    onMouseOver() {
      this.$store.commit('setHighlightedRoomId', this.room.id);
    },
    onMouseOut() {
      this.$store.commit('setHighlightedRoomId');
    },
    isSlotWithinEvent(slot, event) {
      return (
        isWithinRange(slot.dateStart, event.dateStart, event.dateEnd) &&
        isWithinRange(slot.dateEnd, event.dateStart, event.dateEnd)
      );
    },
    isEventStartWithinSlot(event, slot) {
      return isWithinRange(event.dateStart, slot.dateStart, slot.dateEnd);
    },
    isEventEndWithinSlot(event, slot) {
      return isWithinRange(event.dateEnd, slot.dateStart, slot.dateEnd);
    },
    filterEvents(events) {
      return events.filter(e => isSameDay(e.dateStart, this.date) && this.room.id == e.room.id).map(e => {
        const o = Object.assign({}, e);
        o.dateStart = new Date(e.dateStart);
        o.dateEnd = new Date(e.dateEnd);
        o.type = 'event';
        return o;
      });
    },
  },
  computed: {
    events() {
      return this.filterEvents(events);
    },
    date() {
      return this.$store.getters.getDate;
    },
    slots() {
      return this.$store.getters.getMakeSlots(this.$store.getters.getDate, this.room.id);
    },
    items() {
      if (!this.events) return this.slots;
      const result = this.slots.concat(this.events).sort(function(a, b) {
        return compareAsc(a.dateStart, b.dateStart);
      });
      let slot, event;
      for (let obj of result) {
        if (obj.type === 'slot') slot = obj;
        if (obj.type === 'event') event = obj;
        if (!slot || !event) continue;
        if (this.isSlotWithinEvent(slot, event)) slot.collapsed = true;
        if (this.isEventStartWithinSlot(event, slot)) slot.dateEnd = event.dateStart;
        if (this.isEventEndWithinSlot(event, slot)) slot.dateStart = event.dateEnd;
        if (!slot.duration) slot.collapsed = true;
      }
      return result.filter(e => !e.collapsed);
    },
    gridClass() {
      return {
        grid_the_very_first: this.theVeryFirst,
        grid_first_of_floor: !this.theVeryFirst && this.firstOfFloor,
      };
    },
  },
};
</script>

<style>
.grid {
  display: flex;
  /* width: 100%; */
  flex-flow: row nowrap;
  padding: 12px 0;
}
.grid_first_of_floor,
.grid_the_very_first {
  padding-top: 41px;
}
@media (max-width: 800px) {
  .grid {
    padding: 2px 0;
    width: 1584px;
  }
  .grid_first_of_floor {
    padding-top: 43px;
  }
  .grid_the_very_first {
    padding-top: 31px;
  }
}
</style>
