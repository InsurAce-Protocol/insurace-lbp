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
            <div class="card-value">{{ currentPriceString }}</div>
            <div class="card-title">{{ $t('data.insurTokensRemaining') }}</div>
          </div>
        </Col>
        <Col :xs="24" :sm="12" :xl="6">
          <div class="card background-orange">
            <div class="card-value">{{ currentPriceString }}</div>
            <div class="card-title">{{ $t('data.marketCap') }}</div>
          </div>
        </Col>
      </Row>
      <div class="buy">
        <button>{{ $t('button.buyToken') }}</button>
      </div>
    </div>
    <div class="page-footer">
      <div class="copyright">© 2021 InsurAce All Rights Reserved</div>
      <div class="contacts">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lbp',
  data() {
    return {

    };
  },
  computed: {
    remainingTimeString() {
      return '';
    },
    currentPriceString() {
      return '';
    },
    tokensRemainingString() {
      return '';
    },
    marketCapString() {
      return '';
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
      height: 150px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title-main {
        color: white;
        font-size: 26px;
        font-weight: bold;
      }
      .title-sub {
        color: #1DB371;
        font-size: 16px;
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
        border-radius: 6px;
        padding: 10px 30px 10px 30px;
      }
    }
  }
  .page-footer {
    border-top: 1px solid grey;
    padding: 10px 0px 10px 0px;
    margin: 0px 50px 0px 50px;
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
