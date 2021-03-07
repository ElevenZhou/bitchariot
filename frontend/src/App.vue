<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      flat
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="/favicon.ico"
          transition="scale-transition"
          width="40"
        />
        <span class="mr-2">比特战车</span>
      </div>
      <v-tabs
          centered
          class="ml-n7"
          color="grey darken-1"
      >
        <v-tab
            v-for="link in links"
            :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-spacer></v-spacer>

      <v-btn
          depressed
          color="secondary"
          target="_blank"
          @click="connectMetaMask"
      >
        <span class="mr-2">{{ metamask_msg }}</span>
<!--        <v-icon>mdi-open-in-new</v-icon>-->
      </v-btn>
    </v-app-bar>

    <v-main style="padding-top: 100px;">
      <v-alert
          dense
          type="error"
          :value="alert_error"
      >
        <v-row align="center">
          <v-col class="grow">
            {{ alert_error_msg }}
          </v-col>
          <v-col class="shrink">
            <v-btn @click="alert_error = !alert_error"><v-icon>mdi-close</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
          dense
          type="info"
          :value="alert_info"
      >
        <v-row align="center">
          <v-col class="grow">
            {{ alert_info_msg }}
          </v-col>
          <v-col class="shrink">
            <v-btn @click="alert_info = !alert_info"><v-icon>mdi-close</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <div class="d-flex justify-center mb-6">

        <v-card
            class="mx-auto"
            max-width="400"
        >
          <v-img
              class="white--text align-end"
              height="200px"
              src="/common/chenshen_pool.jpeg"
          >
            <v-card-title style="color: black;">战车车体池</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>由很多特性的车体存储在车体池中，具有各种属性；</div>
            <div>质押BNB即可随机获取一枚，质押越久，质押越多，获取NFT更多~</div>
            <div>血量：10~100</div>
          </v-card-text>
          <v-card-text class="text--primary">
            <v-progress-linear
                color="light-green darken-4"
                height="20"
                value="20"
                striped
            ></v-progress-linear>
            离收取还有7天~
          </v-card-text>

          <v-card-actions>
            <v-btn
                color="orange"
                text
            >
              继续抵押
            </v-btn>

            <v-btn
                color="orange"
                text
            >
              解除抵押
            </v-btn>

            <v-btn
                color="orange"
                text
                @click="buyCarBody(web3_handler)"
            >
              直接购买
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card
            class="mx-auto"
            max-width="400"
        >
          <v-img
              class="white--text align-end"
              height="200px"
              :src="current_car_body.img"
          >
            <v-card-title style="color: black;">{{ current_car_body.title }}</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>{{ current_car_body.desc }}</div>
            <div>血量：{{ current_car_body.blood }}</div>
            <br><br><br><br><br>
          </v-card-text>

          <v-card-actions>
            <v-btn
                color="orange"
                text
            >
              卖掉它！
            </v-btn>

            <v-btn
                color="orange"
                text
            >
              下一个收藏
            </v-btn>

            <v-btn
                color="orange"
                text
            >
              总数量：{{ car_body_number }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import getWeb3 from './utils/getWeb3';
import CardBodies from './contracts/CarBodies.json'

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },
  data: () => ({
    web3_handler: {},
    alert_error: false,
    alert_error_msg: "err mag~",
    alert_info: false,
    alert_info_msg: "err mag~",
    metamask_msg: "链接MetaMask",
    car_body_number: 0,
    current_car_body: {
      img: "/common/empty_wallet.png",
      title: "没有任何收藏品",
      desc: "没有任何收藏品",
      blood: 0,
    },
    links: [
      '车体',
      '武器',
      '英雄',
      '战车',
    ],
  }),
  mounted() {
    this.resetCurrentCarBody();
  },
  methods: {
    resetCurrentCarBody: function () {
      this.current_car_body = {
        img: "/common/empty_wallet.png",
        title: "没有任何收藏品",
        desc: "没有任何收藏品",
        blood: 0,
      };
      this.car_body_number = 0;
    },
    connectMetaMask : function () {
      console.log("connectMetaMask start...")
      getWeb3().then(result => {
        console.log("connect metamask success...", result);
        this.metamask_msg = result.short_account;
        result.carBodies = new result.web3.eth.Contract(CardBodies.abi, "0xDf477807b0ea0342c637b1117aE4592Eb8A267E8");
        this.web3_handler = result;
        this.loadCarBodies(this, this.web3_handler, this.web3_handler.carBodies);
      }).catch(e => {
        console.log("connect metamask error...", e);
        this.alert_error_msg = e;
        this.alert_error = true;
      })
    },
    loadCarBodies: async (data, web3_handler, carBodies) => {
      let res = await carBodies.methods.balanceOf(web3_handler.account).call()
      console.log('carBodies.balanceOf', res);
      data.car_body_number = res;
      if (res > 0) {
        let res2 = await carBodies.methods.tokenOfOwnerByIndex(web3_handler.account, 0).call()
        console.log('carBodies.tokenOfOwnerByIndex', res2);
        data.current_car_body.title = "一号车型";
        data.current_car_body.desc = "一号车型，";
        data.current_car_body.img = "/carbodies/"+res2+'.jpg';
        data.current_car_body.blood = 30;
      }
    },
    buyCarBody: async (web3_handler) => {
      let carBodies = web3_handler.carBodies;
      let account = web3_handler.account;
      let res = await carBodies.methods.fetch(1).send({
        from: account,
        value: 11 * 1e15,
      })
      console.log('carBodies.methods.fetch', res);
    }
  }
};
</script>
