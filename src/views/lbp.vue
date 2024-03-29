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
        <button @click="handleBuyButton" :disabled="isButtonDisabled" >{{ buttonText }}</button>
      </div>
      <div class="guide">
        <div>
          <span>{{ $t('guide.instruction') }}</span>
          <a target="_blank" href="https://medium.com/insurace/insurace-initial-token-launch-ea7ac31cc3c1">English</a>
          <a target="_blank" href="https://forum.insurace.io/t/insurace-balancer-lbp/235">中文</a>
        </div>
      </div>
      <Row :gutter="10">
        <Col :xs="24" :lg="18" :style="{ marginTop: '20px' }">
          <div class="chart">
            <div class="chart-title">{{ $t('chart.title') }}</div>
            <div class="chart-wrapper">
              <div v-if="!hasStarted" class="chart-empty">{{ $t('chart.notStarted') }}</div>
              <div id="chart"></div>
            </div>
          </div>
        </Col>
        <Col :xs="24" :lg="6" :style="{ marginTop: '20px' }">
          <Table
            :columns="columns"
            :data="swaps"
            :no-data-text="$t('table.noData')"
          />
        </Col>
      </Row>
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
import { gql } from 'graphql-request';
import { init as initEcharts } from 'echarts';
import config from '@/config';
import ethersManager from '@/util/EthersManager';
import FormatUtil from '@/util/FormatUtil';
import graphqlClient from '@/util/GraphqlClient';
import RestApi from '@/util/RestApi';
import ChartData from '@/data/ChartData.json';

const ECHARTS_TIME_FORMAT = 'YYYY/MM/DD HH:mm:ss';
const TOTAL_TOKEN_OUT = 100000000;
const TIME_START = moment.utc('20210315 14:00:00', 'YYYYMMDD HH:mm:ss');
const TIME_END = moment.utc('20210317 14:00:00', 'YYYYMMDD HH:mm:ss');
const DECIMALS_TOKEN_IN = 6;
const DECIMALS_TOKEN_OUT = 18;
const BALANCER_URL = 'https://balancer.exchange/#/swap/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0x544c42fBB96B39B21DF61cf322b5EDC285EE7429';

const INITIAL_TOKEN_IN = 1000000;
const INITIAL_TOKEN_OUT = 2000000;
const INITIAL_PRICE = 4.5;

const FINAL_TOKEN_IN = 6.023334;
const FINAL_TOKEN_OUT = 1.046172558455603138;
const FINAL_PRICE = 5.777721;

const initialOption = {
  xAxis: {
    type: 'time',
    min: TIME_START.clone().local().format(ECHARTS_TIME_FORMAT),
    max: TIME_END.clone().local().format(ECHARTS_TIME_FORMAT),
  },
  yAxis: {
    type: 'value',
  },
  series: [{
    type: 'line',
    data: [],
    symbolSize: 2,
    markLine: {
      data: [],
      animation: false,
      lineStyle: {
        type: 'dashed',
        color: '#90CC75',
      },
    },
  }],
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: function({ name, value }) {
      if (Array.isArray(value)) {
        return `<strong>${value[1].toFixed(4)}</strong>`;
      }

      return `${name} <strong>${value}</strong>`;
    },
  },
};

export default {
  name: 'lbp',
  data() {
    return {
      chartInstance: null,
      timerIdSecond: null,
      timerIdMinute: null,
      startTime: TIME_START.clone(),
      endTime: TIME_END.clone(),
      currentTime: moment(),
      remainingTokenIn: FormatUtil.parseUnits(INITIAL_TOKEN_IN, DECIMALS_TOKEN_IN),
      remainingTokenOut: FormatUtil.parseUnits(INITIAL_TOKEN_OUT, DECIMALS_TOKEN_OUT),
      currentPrice: FormatUtil.parseUnits(INITIAL_PRICE, DECIMALS_TOKEN_OUT),
      swaps: [],
      estimatedFinalPrice: 0,
    };
  },
  computed: {
    locale() {
      return this.$root.$i18n.locale;
    },
    columns() {
      return [{
        title: this.$t('table.time'),
        key: 'time',
      }, {
        title: this.$t('table.in'),
        key: 'in',
      }, {
        title: this.$t('table.out'),
        key: 'out',
      }];
    },
    hasStarted() {
      return this.currentTime.isSameOrAfter(this.startTime);
    },
    hasEnded() {
      return this.currentTime.isSameOrAfter(this.endTime);
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
      return Number(FormatUtil.formatUnits(this.currentPrice, DECIMALS_TOKEN_IN)).toFixed(4);
    },
    tokensRemainingString() {
      return FormatUtil.formatCommify(this.remainingTokenOut, DECIMALS_TOKEN_OUT, 0);
    },
    marketCapString() {
      return FormatUtil.formatCommify(this.currentPrice.mul(TOTAL_TOKEN_OUT), DECIMALS_TOKEN_IN, 0);
    },
    buttonText() {
      if (this.hasEnded) {
        return this.$t('hasEnded');
      }

      return this.$t('button.buyToken');
    },
    isButtonDisabled() {
      return this.hasEnded;
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    window.clearInterval(this.timerIdSecond);
    window.clearInterval(this.timerIdMinute);
  },
  watch: {
    locale: function() {
      this.updateChartMarkLine();
    },
    estimatedFinalPrice: function() {
      this.updateChartMarkLine();
    },
  },
  methods: {
    updateChartMarkLine() {
      this.chartInstance.setOption({
        series: [{
          markLine: {
            data: [{
              name: this.$t('chart.estimatedFinalPrice'),
              yAxis: this.estimatedFinalPrice.toFixed(4),
            }],
          },
        }],
      });
    },
    init() {
      this.initChart();

      this.queryData();

      this.timerIdSecond = window.setInterval(this.updateTime, 1000);
      this.timerIdMinute = window.setInterval(this.queryDataIfNotEnded, 3 * 60 * 1000);
    },
    initChart() {
      this.chartInstance = initEcharts(document.getElementById('chart'));

      this.chartInstance.setOption(initialOption);
    },
    queryData() {
      if (!this.hasStarted) {
        return;
      }

      this.querySwaps();

      if (this.hasEnded) {
        this.queryStaticRemainingTokens();
        this.queryStaticCurrentPrice();
        this.queryStaticChartData();
      } else {
        this.queryRemainingTokens();
        this.queryCurrentPrice();
        this.queryChartData();
      }
    },
    queryDataIfNotEnded() {
      if (!this.hasEnded) {
        this.queryData();
      }
    },
    async queryRemainingTokens() {
      try {
        [this.remainingTokenIn, this.remainingTokenOut] = await Promise.all([
          ethersManager.getTokenInBalance(),
          ethersManager.getTokenOutBalance(),
        ]);

        this.estimatedFinalPrice = this.calcEstimatedFinalPrice(this.remainingTokenIn, this.remainingTokenOut);
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
    async querySwaps() {
      try {
        const query = gql`{
          swaps (where: {poolAddress: "${config.address.BPool.toLowerCase()}"}, first: 10, skip: 0, orderBy: "timestamp", orderDirection: "desc") {
            tokenInSym
            tokenAmountIn
            tokenOutSym
            tokenAmountOut
            timestamp
          }
        }`;

        const result = await graphqlClient.query(query);

        const filterStartTime = TIME_START.clone().subtract(1, 'hour').unix();
        const filterEndTime = TIME_END.clone().add(1, 'hour').unix();

        this.swaps = result.swaps
          .filter((swap) => (filterStartTime <= swap.timestamp && swap.timestamp <= filterEndTime))
          .map((swap) => ({
            time: moment.unix(swap.timestamp).format('HH:mm:ss'),
            in: `${Number(swap.tokenAmountIn).toFixed(0)} ${swap.tokenInSym}`,
            out: `${Number(swap.tokenAmountOut).toFixed(0)} ${swap.tokenOutSym}`,
          }));
      } catch (error) {
        console.log(error);
      }
    },
    queryStaticRemainingTokens() {
      this.remainingTokenIn = FormatUtil.parseUnits(FINAL_TOKEN_IN, DECIMALS_TOKEN_IN);
      this.remainingTokenOut = FormatUtil.parseUnits(FINAL_TOKEN_OUT, DECIMALS_TOKEN_OUT);

      this.estimatedFinalPrice = this.calcEstimatedFinalPrice(this.remainingTokenIn, this.remainingTokenOut);
    },
    queryStaticCurrentPrice() {
      this.currentPrice = FormatUtil.parseUnits(FINAL_PRICE, DECIMALS_TOKEN_IN);
    },
    queryStaticChartData() {
      const data = ChartData.data.map(({ time, price }) => {
        const timeString = moment(time).format(ECHARTS_TIME_FORMAT);
        return [timeString, price];
      });

      this.chartInstance.setOption({
        series: [{
          data,
        }],
      });
    },
    handleBuyButton() {
      window.open(BALANCER_URL, '_blank');
    },
    updateTime() {
      this.currentTime = moment();
    },
    calcEstimatedFinalPrice(remainingTokenIn, remainingTokenOut) {
      return Number(FormatUtil.formatUnits(remainingTokenIn, DECIMALS_TOKEN_IN)) / Number(FormatUtil.formatUnits(remainingTokenOut, DECIMALS_TOKEN_OUT))
    },
    formatRemainingTime(targetTime) {
      const remainingTime = moment.duration(targetTime.diff(this.currentTime)).locale(this.$i18n.locale);
      const days = Math.max(remainingTime.days(), 0);
      const hours = Math.max(remainingTime.hours(), 0);
      const minutes = Math.max(remainingTime.minutes(), 0);

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
        &:disabled {
          background-color: #CCCCCC;
          color: #999999;
          text-decoration: none;
        }
      }
    }
    .chart {
      background-color: #F6F8F9;
      padding: 20px;
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
