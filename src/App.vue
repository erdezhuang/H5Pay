<template>
  <div id="app">
    <show-money :client="client" :money="money" @showKey="showKey"></show-money>
    <key-board :visable.sync="show" :max-money="client.max_money" :money.sync="money" />
  </div>
</template>

<script>
import KeyBoard from './components/KeyBoard'
import ShowMoney from './components/ShowMoney'
export default {
  name: 'App',
  components: {
    ShowMoney,
    KeyBoard
  },
  data() {
    return {
        client: {
          client_id: '12345', // 店铺ID
          client_name: '店铺标题名称', // 店铺名称
          openid: 'hfwegfgdisf', // 用户openid
          device_id: '123898', // 设备ID
          device_name: '', // 设备名称
          table_no: '02', // 桌号
          pay_url: '', // 支付域名(环境域名 beta,dct)
          openid_url: '', // ?
          auth_code: '', // ?
          total: '', // 金额
          order_no: '', // 订单号
          auto_pay: '', //自动支付
          param: '', // 预支付信息
          staff: '', // 服务员
          // max_money: 0 //最大支付金额
        },
      show: true,
      money: '',
      msg: '询问服务员后输入'
    }
  },
  methods: {
    showKey() {
      this.show = true
    },
    inputMoney(val) {
      if (val === -1) return false;
      switch (val) {
        case '.':
          this._handleDecimalPoint();
          break;
        default:
          this._handleNumberKey(val);
          break;
      }
    },
    deleteMoney() {
      let S = this.money;
      //如果没有输入，直接返回
      if (!S.length) return false;
      //否则删除最后一个
      this.money = S.substring(0, S.length - 1);
    },
    //处理小数点函数
    _handleDecimalPoint() {
      //如果包含小数点，直接返回
      if (this.money.indexOf('.') > -1) return false;
      //如果小数点是第一位，补0
      if (!this.money.length)
        this.money = '0.';
      //如果不是，添加一个小数点
      else
        this.money = this.money + '.';
    },
    //处理数字
    _handleNumberKey(num) {
      let S = this.money;
      //如果有小数点且小数点位数不小于2
      if ( S.indexOf('.') > -1 && S.substring(S.indexOf('.') + 1).length < 2)
        this.money = S + num;
      //没有小数点
      if (!(S.indexOf('.') > -1)) {
        //如果第一位是0，只能输入小数点
        if (num === 0 && S.length === 0)
          this.money = '0.';
        else {
          if (S.length && Number(S.charAt(0)) === 0) return;
          this.money = S + num;
        }
      }
    }
  }
}
</script>

<style lang="scss">
  body {
    background: $bg-color;
  }
  *{
    margin:0;
    user-select:none;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
