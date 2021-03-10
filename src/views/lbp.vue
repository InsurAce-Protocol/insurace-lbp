<i18n src="./lbp.json"></i18n>

<template>
  <div class="page">
    <div class="page-top">
      <Row>
        <Col :sm="12">
          <a class="logo" target="_blank" href="https://insurace.io">
            <img src="@/assets/logo.svg" />
            <span>InsurAce</span>
          </a>
        </Col>
        <Col :sm="12" :style="{ textAlign: 'right' }">
          <div class="locale">
            <span
              :class="{ 'locale-option': true, 'locale-selected': $root.$i18n.locale === 'en' }"
              @click="$root.$i18n.locale = 'en'"
            >
              English
            </span>
            <span> | </span>
            <span
              :class="{ 'locale-option': true, 'locale-selected': $root.$i18n.locale === 'zh' }"
              @click="$root.$i18n.locale = 'zh'"
            >
              中文
            </span>
          </div>
        </Col>
      </Row>
      <div class="title">
        <div class="title-main">{{ $t('title') }}</div>
        <div class="title-sub">{{ $t('subtitle') }}</div>
        <div v-if="!hasStarted" class="title-countdown">
          <span class="countdown-text">{{ $t('countdown') }}</span>
          <span class="countdown-time">{{ remainingStartTimeHour }}</span>
          <span class="countdown-separator"> : </span>
          <span class="countdown-time">{{ remainingStartTimeMinute }}</span>
          <span class="countdown-separator"> : </span>
          <span class="countdown-time">{{ remainingStartTimeSecond }}</span>
        </div>
      </div>
    </div>
    <div class="page-body">
      <Row :gutter="15">
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card-top">
            <div class="card-value">UTC {{ startTime.format('ha DD/MM/YY') }} | 48H</div>
            <div class="card-title">{{ $t('data.startEndTime') }}</div>
          </div>
        </Col>
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card-top">
            <div class="card-value">2MM INSUR | 1MM USDC</div>
            <div class="card-title">{{ $t('data.tradingPair') }}</div>
          </div>
        </Col>
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card-top">
            <div class="card-value">$4.5 USD/INSUR</div>
            <div class="card-title">{{ $t('data.startingPrice') }}</div>
          </div>
        </Col>
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card-top">
            <div class="card-value">90% : 10% | 50% : 50%</div>
            <div class="card-title">{{ $t('data.startEndRatio') }}</div>
          </div>
        </Col>
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card-bottom background-purple">
            <div class="card-value">
              <span v-if="hasStarted">{{ remainingEndTimeString }}</span>
              <span v-else>N.A.</span>
            </div>
            <div class="card-title">{{ $t('data.lbpTimeRemaining') }}</div>
          </div>
        </Col>
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card-bottom background-red">
            <div class="card-value">
              <span v-if="hasStarted">{{ currentPriceString }} USD/INSUR</span>
              <span v-else>N.A.</span>
            </div>
            <div class="card-title">{{ $t('data.currentPrice') }}</div>
          </div>
        </Col>
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card-bottom background-blue">
            <div class="card-value">
              <span v-if="hasStarted">{{ tokensRemainingString }}</span>
              <span v-else>N.A.</span>
            </div>
            <div class="card-title">{{ $t('data.insurTokensRemaining') }}</div>
          </div>
        </Col>
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card-bottom background-orange">
            <div class="card-value">
              <span v-if="hasStarted">{{ marketCapString }} USD</span>
              <span v-else>N.A.</span>
            </div>
            <div class="card-title">{{ $t('data.marketCap') }}</div>
          </div>
        </Col>
      </Row>
      <div class="buy">
        <button @click="handleBuyButton">{{ $t('button.buyToken') }}</button>
      </div>
      <div class="guide">
        <div>
          <span>{{ $t('guide.instruction') }}</span>
          <a target="_blank" href="#">English</a>
          <a target="_blank" href="#">中文</a>
        </div>
      </div>
      <div class="chart">
        <div class="chart-title">{{ $t('chart.title') }}</div>
        <div class="chart-wrapper">
          <div v-if="!hasStarted" class="chart-empty">{{ $t('chart.notStarted') }}</div>
          <div id="chart"></div>
        </div>
      </div>
      <div class="notice">
        <div class="notice-icon">
          <Icon type="ios-warning-outline" />
        </div>
        <div class="notice-messages">
          <div class="notice-message">
            <img src="@/assets/forbidden.svg" />
            <span>{{ $t('notice.notTooEarly') }}</span>
          </div>
          <div class="notice-message">
            <img src="@/assets/forbidden.svg" />
            <span>{{ $t('notice.watchCost') }}</span>
          </div>
          <div class="notice-message">
            <img src="@/assets/forbidden.svg" />
            <span>{{ $t('notice.noNewPool') }}</span>
          </div>
          <div class="notice-message">
            <img src="@/assets/forbidden.svg" />
            <span>{{ $t('notice.correctInsurAddress') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page-footer">
      <div class="copyright">© 2021 InsurAce All Rights Reserved</div>
      <div class="contacts">
        <a target="_blank" href="https://t.me/insurace_protocol">
          <img src="@/assets/contact/telegram.png" />
        </a>
        <a target="_blank" href="https://twitter.com/insur_ace">
          <img src="@/assets/contact/twitter.png" />
        </a>
        <a target="_blank" href="https://discord.gg/vCZMjuH69F">
          <img src="@/assets/contact/discord.png" />
        </a>
        <a target="_blank" href="https://medium.com/insurace">
          <img src="@/assets/contact/medium.png" />
        </a>
        <a href="mailto:contact@insurace.io">
          <img src="@/assets/contact/email.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { constants } from 'ethers';
import { init as initEcharts } from 'echarts';
import ethersManager from '@/util/EthersManager';
import FormatUtil from '@/util/FormatUtil';
import RestApi from '@/util/RestApi';

const ECHARTS_TIME_FORMAT = 'YYYY/MM/DD HH:mm:ss';
const NUM_INSUR_TOKENS = 100000000;
const TIME_START = moment.utc('20210315 14:00:00', 'YYYYMMDD HH:mm:ss');
const TIME_END = TIME_START.clone().add(2, 'day');

const initialOption = {
  xAxis: {
    type: 'time',
    min: TIME_START.format(ECHARTS_TIME_FORMAT),
    max: TIME_END.format(ECHARTS_TIME_FORMAT),
  },
  yAxis: {
    type: 'value',
  },
  series: [{
    type: 'line',
    data: [],
    showSymbol: false,
  }],
};

export default {
  name: 'lbp',
  data() {
    return {
      chartInstance: null,
      timerIdSecond: null,
      timerIdMinute: null,
      startTime: TIME_START,
      endTime: TIME_END,
      currentTime: moment(),
      remainingTokens: constants.Zero,
      currentPrice: constants.Zero,
    };
  },
  computed: {
    hasStarted() {
      return this.currentTime.isSameOrAfter(this.startTime);
    },
    remainingStartTime() {
      return moment.duration(this.startTime.diff(this.currentTime)).locale(this.$i18n.locale);
    },
    remainingStartTimeHour() {
      return Math.floor(this.remainingStartTime.asHours()).toString().padStart(2, '0');
    },
    remainingStartTimeMinute() {
      return this.remainingStartTime.minutes().toString().padStart(2, '0');
    },
    remainingStartTimeSecond() {
      return this.remainingStartTime.seconds().toString().padStart(2, '0');
    },
    remainingEndTimeString() {
      return this.formatRemainingTime(this.endTime);
    },
    currentPriceString() {
      return Number(FormatUtil.formatUnits(this.currentPrice, 6)).toFixed(4);
    },
    tokensRemainingString() {
      return FormatUtil.formatCommify(this.remainingTokens, 18, 0);
    },
    marketCapString() {
      return FormatUtil.formatCommify(this.currentPrice.mul(NUM_INSUR_TOKENS), 18, 0);
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    window.clearInterval(this.timerIdSecond);
    window.clearInterval(this.timerIdMinute);
  },
  methods: {
    init() {
      this.initChart();

      this.queryData();

      this.timerIdSecond = window.setInterval(this.updateTime, 1000);
      this.timerIdMinute = window.setInterval(this.queryData, 60 * 1000);
    },
    initChart() {
      this.chartInstance = initEcharts(document.getElementById('chart'));

      this.chartInstance.setOption(initialOption);
    },
    queryData() {
      this.queryRemainingTokens();
      this.queryCurrentPrice();
      this.queryChartData();
    },
    async queryRemainingTokens() {
      try {
        this.remainingTokens = await ethersManager.getBalance('INSUR');
      } catch (error) {
        console.log(error);
      }
    },
    async queryCurrentPrice() {
      try {
        this.currentPrice = await ethersManager.getSpotPrice();
      } catch (error) {
        console.log(error);
      }
    },
    async queryChartData() {
      try {
        const result = await RestApi.getPrices();

        const data = result.data.data.map(({ time, price }) => {
          const timeString = moment(time).format(ECHARTS_TIME_FORMAT);
          return [timeString, price];
        });

        this.chartInstance.setOption({
          series: [{
            data,
          }],
        });
      } catch (error) {
        console.log(error);
      }
    },
    handleBuyButton() {
      if (this.currentTime.isSameOrAfter(this.startTime)) {
        // TODO
      } else {
        this.$Message.info(this.$t('notStarted'));
      }
    },
    updateTime() {
      this.currentTime = moment();
    },
    formatRemainingTime(targetTime) {
      const remainingTime = moment.duration(targetTime.diff(this.currentTime)).locale(this.$i18n.locale);
      const days = remainingTime.days();
      const hours = remainingTime.hours();
      const minutes = remainingTime.minutes();

      return `${days} ${this.$tc('time.day', days)} ${hours} ${this.$tc('time.hour', hours)} ${minutes} ${this.$tc('time.minute', minutes)}`;
    },
  },
}
</script>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  .page-top {
    background-color: #06062C;
    background-image: url("../assets/background.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right top;
    padding: 20px 100px 10px 100px;
    @media screen and (max-width: 1200px) {
      padding: 10px 50px 10px 50px;
    }
    .logo {
      img {
        vertical-align: middle;
        margin-right: 10px;
      }
      span {
        color: white;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .locale {
      display: inline;
      background-color: white;
      color: rgba(0, 0, 0, 0.3);
      font-size: 16px;
      font-weight: bold;
      border-radius: 4px;
      padding: 10px;
      .locale-option {
        cursor: pointer;
      }
      .locale-selected {
        color: #1DB371;
      }
    }
    .title {
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title-main {
        color: white;
        font-size: 32px;
        font-weight: bold;
      }
      .title-sub {
        color: #1DB371;
        font-size: 20px;
        font-weight: bold;
      }
      .title-countdown {
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
        .countdown-text {
          color: white;
          margin-right: 10px;
        }
        .countdown-time {
          color: #1DB371;
          padding: 5px 10px 5px 10px;
          border: 1px solid #1DB371;
          border-radius: 4px;
        }
        .countdown-separator {
          color: #1DB371;
        }
      }
    }
  }
  .page-body {
    flex-grow: 1;
    padding: 30px 100px 30px 100px;
    @media screen and (max-width: 1200px) {
      padding: 30px 50px 30px 50px;
    }
    .card-top {
      background-color: rgba(29, 179, 113, 0.3);
      border: 1px solid #1DB371;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
      .card-value {
        color: #1DB371;
        font-size: 18px;
        font-weight: bold;
      }
      .card-title {
        color: #666666;
        font-size: 14px;
      }
    }
    .card-bottom {
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
      .card-value {
        color: white;
        font-size: 18px;
        font-weight: bold;
      }
      .card-title {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
      }
    }
    .guide {
      text-align: center;
      font-size: 20px;
      margin-top: 10px;
      div {
        display: inline-block;
        a {
          margin-left: 10px;
        }
      }
    }
    .buy {
      text-align: center;
      button {
        background-color: #1DB371;
        color: white;
        font-size: 22px;
        font-weight: bold;
        border: none;
        border-radius: 6px;
        padding: 20px 40px 20px 40px;
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .chart {
      background-color: #F6F8F9;
      padding: 20px;
      margin-top: 20px;
      .chart-title {
        font-size: 18px;
        padding-left: 10px;
        border-left: 2px solid #1DB371;
      }
      .chart-wrapper {
        position: relative;
        .chart-empty {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 500px;
          z-index: 1;
          background-color: #F6F8F9;
          text-align: center;
          line-height: 500px;
          font-size: 20px;
        }
        #chart {
          height: 500px;
          &.hidden {
            display: none;
          }
        }
      }
    }
    .notice {
      display: flex;
      justify-content: flex-start;
      border: 1px solid #E5EBF5;
      border-radius: 6px;
      padding: 20px;
      margin-top: 20px;
      .notice-icon {
        padding-right: 20px;
        i {
          font-size: 60px;
        }
      }
      .notice-messages {
        .notice-message {
          color: #525273;
          font-size: 16px;
          font-weight: bold;
          span {
            margin-left: 10px;
          }
        }
      }
    }
  }
  .page-footer {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #E5EBF5;
    padding: 10px 0px 10px 0px;
    margin: 0px 100px 0px 100px;
    @media screen and (max-width: 1200px) {
      margin: 0px 50px 0px 50px;
    }
    .contacts {
      a {
        margin-left: 10px;
        img {
          width: 30px;
        }
      }
    }
  }
}

.background-purple {
  background: url("../assets/background-purple.svg") no-repeat left top;
  background-size: cover;
}

.background-red {
  background: url("../assets/background-red.svg") no-repeat left top;
  background-size: cover;
}

.background-blue {
  background: url("../assets/background-blue.svg") no-repeat left top;
  background-size: cover;
}

.background-orange {
  background: url("../assets/background-orange.svg") no-repeat left top;
  background-size: cover;
}
</style>
