<template>
  <div class="keyboard">
    <number-keyboard
      :show="show"
      extra-key="."
      safe-area-inset-bottom
      close-button-text="完成"
      @input="inputMoney"
      @delete="deleteMoney"
      @close="closeKeyboard"
    >
      <div
        slot="delete"
        class="back"
      >
      </div>
    </number-keyboard>
  </div>
</template>

<script>
  import { NumberKeyboard } from 'vant'
  export default {
    name: "KeyBoard",
    components: {
      NumberKeyboard
    },
    props: {
      money: String,
      visable: {
        type: Boolean,
        default: true
      },
      maxMoney: {
        type: Number,
        default: 10000
      }
    },
    data() {
      return {
        keyMoney: '',
        show: this.visable
      }
    },
    watch: {
      keyMoney(val) {
        this.$emit('update:money', val)
      },
      visable(val) {
        this.show = val
      }
    },
    methods: {
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
      closeKeyboard(){
        this.show = !this.show
        this.$emit('update:visable', this.show)
      },
      deleteMoney() {
        let S = this.money;
        //如果没有输入，直接返回
        if (!S.length) return false;
        //否则删除最后一个
        this.keyMoney = S.substring(0, S.length - 1);
      },
      //处理小数点函数
      _handleDecimalPoint() {
        //如果包含小数点，直接返回
        if (this.keyMoney.indexOf('.') > -1) return false;
        //如果小数点是第一位，补0
        if (!this.keyMoney.length)
          this.keyMoney = '0.';
        //如果不是，添加一个小数点
        else {
          if (parseFloat(this.keyMoney) >= this.maxMoney) return false
          this.keyMoney = this.keyMoney + '.';
        }
      },
      //处理数字
      _handleNumberKey(num) {
        let S = this.keyMoney, money;
        //如果有小数点且小数点位数不小于2
        if ( S.indexOf('.') > -1 && S.substring(S.indexOf('.') + 1).length < 2)
          money = S + num;
        //没有小数点
        if (!(S.indexOf('.') > -1)) {
          //如果第一位是0，只能输入小数点
          if (num === 0 && S.length === 0)
            money = '0.';
          else {
            if (S.length && Number(S.charAt(0)) === 0) return;
            money = S + num;
          }
        }
        this.keyMoney = parseFloat(money) <= this.maxMoney ? money : S
      }
    }
  }
</script>

<style lang="scss">
  .keyboard{
    .back {
      width: 55px; height: 55px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1026 1024' xmlns='http://www.w3.org/2000/svg' width='200.391' height='200'%3E%3Cpath d='M968.704 197.632q23.552 0 38.912 15.36t15.36 36.864V778.24q0 21.504-15.36 36.864t-38.912 15.36H310.272q-5.12 0-14.848-2.048t-14.848-6.144l-1.024-1.024-1.024-1.024L16.384 563.2v-1.024q-18.432-15.36-18.432-48.128 0-15.36 4.608-27.648t12.8-20.48l262.144-256q2.048-2.048 10.24-6.144 10.24-6.144 25.6-6.144h655.36zm-134.144 460.8q9.216-14.336 3.072-25.6t-20.48-25.6q-17.408-17.408-47.616-45.056t-65.024-59.392q37.888-35.84 69.632-66.56t49.152-48.128q12.288-11.264 12.288-26.112t-13.312-26.112q-2.048-2.048-6.144-5.632t-6.144-4.608q-14.336-9.216-28.16-7.168t-25.088 13.312q-17.408 17.408-49.152 47.104T640 442.368q-31.744-29.696-58.88-55.808t-44.544-43.52q-19.456-20.48-34.816-23.552t-27.648 4.096q-2.048 2.048-9.728 7.168t-9.728 7.168q-13.312 11.264-8.704 28.16t30.208 42.496q16.384 15.36 43.008 40.448t57.344 54.784q-32.768 30.72-60.416 56.832t-45.056 43.52q-14.336 13.312-23.04 29.696t1.536 29.696q2.048 2.048 8.704 8.192t8.704 8.192q14.336 11.264 32.256 7.68t35.328-20.992 45.056-44.544T640 564.224q34.816 32.768 64.512 60.928t48.128 46.592q13.312 12.288 30.72 16.384t28.672-4.096l4.096-4.096 7.68-8.704 6.656-8.192 4.096-4.608z' data-spm-anchor-id='a313x.7781069.0.i0' fill='%232c3e50'/%3E%3C/svg%3E") no-repeat center/100%;;
    }
    img{
        width: 40px;
    }
  }
</style>
