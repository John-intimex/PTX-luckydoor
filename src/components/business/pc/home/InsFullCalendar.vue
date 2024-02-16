<template>
  <div class="ins-fullCalendar">
    <FullCalendar defaultView="dayGridMonth" timeFormat="H:mm" contentHeight="auto" :firstDay="0" :fixedWeekCount="false" :showNonCurrentDates="false" :displayEventTime="false" :locale="locale" :header="header" :plugins="calendarPlugins" :events="getCalendarEvents" @dateClick="handleDateClick"  @eventClick="handleEventClick" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  components: {
    FullCalendar
  }
})
export default class InsFullCalendar extends Vue {
    calendarPlugins: object[] = [
      dayGridPlugin,
      interactionPlugin // needed for dateClick
    ];
    locale: string = 'en';
    header: object={
      left: 'prevYear, prev',
      center: 'title',
      right: 'next,nextYear'
    };

    getCalendarEvents (info, successCallback, failureCallback) {
      console.log(info.start.getFullYear(), 'getCalendarEvents');
      let year = info.start.getFullYear();
      let month = info.start.getMonth() + 1;
      this.$Api.calendar.GetListByCond({ Month: month, Year: year }).then(result => {
        if (result.Succeeded) {
          let events = result.ReturnValue.Data;
          successCallback(events);
        }
      });
    }

    DayRender (date, cell) {
    //   console.log(date, cell, 'DayRender');

    //   if (a.Day.IsOtherMonth) {
    //     a.Cell.Controls.Clear();
    //   }
    }

    handleDateClick (info) {
      console.log(info, 'handleDateClick');
      if (info.dayEl.className.indexOf('fc-other-month') === -1) {
        let date = info.dateStr;
        this.$router.push({ name: 'eventList', params: { date } });
      }
    }

    handleEventClick (info) {
      console.log(info, 'EventClick');
      // this.$router.push({ name: 'eventDetail', params: { id: info.event.id } });
    }

    get lang () {
      return this.$Storage.get('locale');
    }

    created () {
      console.log(this.lang, 'this.lang');

      switch (this.lang) {
        case 'S' :
          this.locale = 'zh-cn';
          break;
        case 'C' :
          this.locale = 'zh-hk';
          break;
        default :
          this.locale = 'en';
      }
    }

    mounted () {

    }
}
</script>

<style lang="less">
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

.ins-fullCalendar {
    .fc-button-group > .fc-button:not(:first-child) {
        border-top-left-radius: 0.25em;
        border-bottom-left-radius: 0.25em;
    }

    .fc-button-group > .fc-button:not(:last-child) {
        border-top-right-radius: 0.25em;
        border-bottom-right-radius: 0.25em;
        margin-right: 0.75em;
    }

    .fc-dayGrid-view .fc-other-month .fc-day-number {
        display: none;
    }

    .fc {
      .fc-content {
        cursor: pointer;
      }

      td {
        // &.fc-day {
        //   cursor: pointer;
        // }

        // &.fc-day-top {
        //   cursor: pointer;
        // }

        &.fc-other-month {
          cursor: default;
        }

        .fc-content {
          cursor: default;
        }
      }
    }
}
</style>
