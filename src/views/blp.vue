<i18n>
{
  "en": {
    "title": "Liquidity Bootstrapping Pool",
    "subtitle": "INSUR Token Public Sale",
    "data": {
      "lbpTimeRemaining": "LBP Time Remaining",
      "currentPrice": "Current Price",
      "insurTokensRemaining": "INSUR Tokens Remaining",
      "marketCap": "Market Cap"
    },
    "button": {
      "buyToken": "Buy INSUR on Balancer"
    },
    "chart": {
      "title": "Real-time Price"
    }
  }
}
</i18n>

<template>
  <div class="page">
    <div class="page-top">
      <div class="logo">
        <img src="@/assets/logo.svg" />
        <span>InsurAce</span>
      </div>
      <div class="title">
        <div class="title-main">{{ $t('title') }}</div>
        <div class="title-sub">{{ $t('subtitle') }}</div>
      </div>
    </div>
    <div class="page-body">
      <Row :gutter="15">
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card background-purple">
            <div class="card-value">{{ remainingTimeString }}</div>
            <div class="card-title">{{ $t('data.lbpTimeRemaining') }}</div>
          </div>
        </Col>
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card background-red">
            <div class="card-value">{{ currentPriceString }}</div>
            <div class="card-title">{{ $t('data.currentPrice') }}</div>
          </div>
        </Col>
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card background-blue">
            <div class="card-value">{{ tokensRemainingString }}</div>
            <div class="card-title">{{ $t('data.insurTokensRemaining') }}</div>
          </div>
        </Col>
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card background-orange">
            <div class="card-value">{{ marketCapString }}</div>
            <div class="card-title">{{ $t('data.marketCap') }}</div>
          </div>
        </Col>
      </Row>
      <div class="buy">
        <button>{{ $t('button.buyToken') }}</button>
      </div>
      <div class="chart-wrapper">
        <div class="chart-title">{{ $t('chart.title') }}</div>
        <div id="chart"></div>
      </div>
    </div>
    <div class="page-footer">
      <Row>
        <Col
      </Row>
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

const option = {
  xAxis: {
    type: 'time',
  },
  yAxis: {
    type: 'value',
  },
  series: {
    type: 'line',
    data: [],
    showSymbol: false,
  },
};

export default {
  name: 'lbp',
  data() {
    return {
      chartInstance: null,
      chartOption: option,
      endTime: moment('20210315', 'YYYYMMDD'),
      remainingTokens: constants.Zero,
      currentPrice: constants.Zero,
    };
  },
  computed: {
    remainingTimeString() {
      return this.endTime.toNow(true);
    },
    currentPriceString() {
      return FormatUtil.formatUnits(this.currentPrice, 6);
    },
    tokensRemainingString() {
      return FormatUtil.commify(this.remainingTokens);
    },
    marketCapString() {
      return FormatUtil.formatUnits(this.currentPrice.mul(1000000), 6);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.queryData();
      this.initChart();
    },
    initChart() {
      this.chartInstance = initEcharts(document.getElementById('chart'));

      this.chartInstance.setOption(this.chartOption);
    },
    queryData() {
      this.queryRemainingTokens();
      this.queryCurrentPrice();
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
    background-color: black;
    background-image: url("../assets/background.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right top;
    padding: 10px 50px 10px 50px;
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
      }
    }
  }
  .page-body {
    flex-grow: 1;
    padding: 30px 50px 30px 50px;
    .card {
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
      .card-value {
        color: white;
        font-size: 16px;
      }
      .card-title {
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
      }
    }
    .buy {
      text-align: center;
      button {
        background-color: #1DB371;
        color: white;
        font-size: 18px;
        border: none;
        border-radius: 6px;
        padding: 10px 30px 10px 30px;
      }
    }
    .chart-wrapper {
      background-color: #F6F8F9;
      padding: 20px;
      margin-top: 20px;
      .chart-title {
        font-size: 18px;
        padding-left: 10px;
        border-left: 2px solid #1DB371;
      }
      #chart {
        height: 500px;
      }
    }
  }
  .page-footer {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #E5EBF5;
    padding: 10px 0px 10px 0px;
    margin: 0px 50px 0px 50px;
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
