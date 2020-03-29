<template>
  <div class="show_money">
    <div class="title">
      {{ client.client_name }}
    </div>
    <div class="client_info">
      {{ client.device_id }}
    </div>
    <div class="money_box">
      <p>消费总额</p>
      <div class="money" @click="clickMoney">
        <span>￥</span>
        <div v-if="money" class="moneyContent"> {{ money }}</div>
        <div v-else class="pay_info">{{ msg }}</div>
      </div>
      <div class="mark">
        <div class="hr"></div>
        <div class="mark-title">添加备注</div>
      </div>
    </div>
    <div class="btn">
      <Button type="primary" :loading="btnLoading" loading-text="加载中..." size="large" @click="micropay">确认买单</Button>
    </div>
  </div>
</template>

<script>
  import {Button} from 'vant';

  export default {
    name: "ShowMoney",
    components: {Button},
    props: {
      client: Object,
      money: String
    },
    data() {
      return {
        msg: '询问服务员后输入',
        btnLoading: false
      }
    },
    methods: {
      clickMoney() {
        this.$emit('showKey', true)
      },
      micropay() {
        this.btnLoading = true
        let that = this
        setTimeout(function () {
          that.btnLoading = false
        }, 2000)
      }
    }
  }
</script>

<style lang="scss">
  .show_money {
    text-align: center;
    padding-top: 24px;

    .title {
      color: $title;
      font-size: 38px;
    }

    .client_info {
      color: $info;
      font-size: $client_info_fontsize;
    }

    .money_box {
      background: #fff;
      width: 90%;
      margin: 20px auto;
      height: 220px;
      border: 1px solid #EBEEF5;
      text-align: left;

      p {
        padding: 20px 20px 10px;
        font-size: $client_info_fontsize;
        color: $info;
      }

      .money {
        padding: 20px 20px 0;
        display: flex;
        align-items: flex-end;
        height: 60px;

        .moneyContent {
          font-size: 60px;
          font-weight: normal;
          line-height: 1;
        }

        div {
          margin-left: 10px;
        }

        span {
          font-size: $nothink;
        }

        .pay_info {
          color: $nothink;
          font-size: 38px;
        }
      }

      .mark {
        padding: 10px 20px;

        .hr {
          width: 100%;
          height: 1px;
          margin-bottom: 10px;
          background: $border;
        }

        .mark-title {
          font-size: $client_info_fontsize;
          color: $ali_font-color;
        }
      }
    }

    .btn {
      width: 90%;
      margin: 20px auto;
    }
  }
</style>
