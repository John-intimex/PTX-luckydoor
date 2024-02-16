<template>
    <!-- <el-calendar class="ins-calendar" v-model="date" @click.native="onDate" lang="en"></el-calendar> -->
    <el-calendar class="ins-calendar" :first-day-of-week="7" v-model="currentDate">
        <template
            slot="dateCell"
            slot-scope="{date, data}">
            <!-- <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(2).join('') }} {{ data.isSelected ? '' : ''}}
            </p> -->

            <div @click="onDate(data.day,data.type)">
                <div class="calendar-day">{{ data.day.split('-').slice(2).join() }}</div>
                <div class="timetable-item" v-if="dealEventDate(data.day)">
                    <span class="timetable-color"></span>
                    <p class="num">{{dealEventDate(data.day)}}</p>
                </div>
            </div>
        </template>
    </el-calendar>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class InsCalendar extends Vue {
    currentDate: Date = new Date();

    eventList: any[] = [];

    getCalendarEvents () {
      let year = this.currentDate.getFullYear();
      let month = this.currentDate.getMonth() + 1;
      this.$Api.calendar.GetListByCond({ Month: month, Year: year }).then(result => {
        if (result.Succeeded) {
          this.eventList = result.ReturnValue.Data;
        }
      });
    }

    // 处理显示当日活动数量
    dealEventDate (v) {
    //   let dateStart = new Date(v + 'T00:00:00');
    //   let dateEnd = new Date(v + 'T24:00:00');
      let num = 0;
      for (let i = 0; i < this.eventList.length; i++) {
        // if (new Date(this.eventList[i].start) < new Date(v) && new Date(v) < new Date(this.eventList[i].end)) {
        //   num++;
        // } else if ((new Date(this.eventList[i].start) >= dateStart && new Date(this.eventList[i].start) < dateEnd) || (new Date(this.eventList[i].end) >= dateStart && new Date(this.eventList[i].end) < dateEnd)) {
        //   num++;
        // }

        if (new Date(this.eventList[i].start.split(' ')[0]) <= new Date(v) && new Date(v) <= new Date(this.eventList[i].end.split(' ')[0])) {
          num++;
        }
      }

      return num;
    }

    onDate (date, type) {
      console.log(this.currentDate, 'currentDate');
      if (type === 'current-month') {
        this.$router.push({ name: 'eventList', params: { date } });
      }
    }

    created () {
      this.getCalendarEvents();
    }

    mounted () {
      (document.querySelector('.el-calendar__header .el-button--plain:first-child span') as any).innerHTML = '❮';
      (document.querySelector('.el-calendar__header .el-button--plain:last-child span') as any).innerHTML = '❯';
    }

    @Watch('currentDate', { deep: true })
    onDayChange () {
      this.getCalendarEvents();
      console.log(this.currentDate, 'currentDate');
    }
}
</script>

<style lang="less">
.ins-calendar {
    .is-selected {
        background-color: #5bcbf5;
        color: #8ddbf8;
    }

    .el-calendar-table:not(.is-range) td.next, .el-calendar-table:not(.is-range) td.prev {
        color: #C0C4CC !important;
    }
}

.ins-calendar {
    background-color: #0061af;
    text-align: center;
    box-sizing: border-box;
    padding: 2.5rem 1.8rem;
    .el-calendar__header {
        border-bottom: 0;
        padding: 0;
        position: relative;
        justify-content: center;

        .el-calendar__title {
            display: inline-block;
            color: #dfdc81;
            font-size: 2.2rem;
        }

        .el-calendar__button-group {
            position: absolute;
            width: 100%;
            height: 100%;
            .el-button-group {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .el-button--plain {
                    background-color: unset;
                    border: 0;
                    padding: 0;
                    margin: 0 1rem;
                    &:nth-child(2) {
                        visibility: hidden;
                    }

                    span {
                        font-size: 2.8rem;
                        color: #fff;
                    }
                }
            }
        }
    }

    .el-calendar__body {
        padding: 0;
        .el-calendar-table {
            thead th {
                font-size: 1.6rem;
                color: #fff;
            }

            tbody {
                td {
                    background-color: #5bcbf5;
                    font-size: 1.4rem;
                    color: #8ddbf8;

                    .el-calendar-day {
                        padding: 0;
                        height: 5rem;
                        &:hover {
                            background-color: unset;
                        }

                        .timetable-item {
                            text-align: left;
                            color: #111;
                            background-color: #dfdc81;
                            display: flex;
                            align-items: center;
                            padding: 0 5px;
                            margin: 0.3rem 0;
                            .timetable-color {
                                width: 7px;
                                height: 7px;
                                border-radius: 15px;
                                margin-right: 5px;
                                display: inline-block;
                                flex-shrink: 0;
                                background: #ff5050;
                                color: #666666;
                            }
                        }

                        > div {
                            padding: 6px;
                            height: 100%;
                            text-align: right;
                            box-sizing: border-box;
                        }
                    }

                    &.is-today {
                        background-color: #2e687a;
                        .calendar-day {
                            color: #fff;
                            background-color: transparent;
                        }
                    }

                    // 隐藏上下个月信息
                    .hide {
                        .el-calendar-day {
                        display: none;
                        }
                    }

                    &.prev {
                        .hide();
                    }

                    &.next {
                        .hide();
                    }
                }
            }
        }
    }
}

</style>
