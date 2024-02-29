<template>
  <div class="siderbarContainer">
    <div class="bar" @click="showbar"></div>
    <div id="sidebar" v-show="isShow">

      <!-- <a href="javascript:void(0);" @click="show = !show"
        ><img src="/static/Image/mobile/home/down2.png"
      /></a> -->
      <span>
        <a
          href="https://api.whatsapp.com/send?phone=85290826444&text=%E6%88%91%E6%83%B3%E6%9F%A5%E8%AF%A2%E4%B8%80%E4%B8%8B"
          target="_blank"
          ><img src="/static/Image/mobile/home/whatsapp.png"
        /></a>
        <!-- <a href="javascript:;" class="livechat" @click="showLivechat"
          ><img src="/static/Image/mobile/home/facebook.png"
        /></a> -->
        <a href="javascript:;" class="livechat" @click="showLivechat"
          ><img src="/static/Image/mobile/home/WeChat.png"
        /></a>
        <a href="tel:85224927789" class="fb-button" target="_blank"
          ><img src="/static/Image/mobile/home/phone.png"
        /></a>
        <a href="mailto:sales@luckydoor.com.hk" class="fb-button"
          ><img src="/static/Image/mobile/home/news.png"
        /></a>
      </span>
      <a href="javascript:void(0);" class="toTop" @click="toTop"
        ><img src="/static/Image/mobile/home/down.png"
      /></a>
    </div>
    <div class="showWeChat">
      <img src="/static/Image/mobile/home/WeChatcode.jpg"/>
    </div>
    <!-- 显示livechat -->
    <div id="fb-root"></div>
    <div id="fb-customer-chat" class="fb-customerchat"></div>
    <div class="fb-livechat">
      <!-- <div class="ctrlq fb-overlay"></div>
      <div class="fb-widget">
        <div class="ctrlq fb-close"></div>
        <div
          class="fb-page"
          data-href="https://www.facebook.com/hktastefood/"
          data-tabs="messages"
          data-width="360"
          data-height="400"
          data-small-header="true"
          data-hide-cover="true"
          data-show-facepile="false"
        >
          <blockquote
            cite="https://www.facebook.com/hktastefood/"
            class="fb-xfbml-parse-ignore"
          ></blockquote>
        </div>
        <div class="fb-credit">
          <a href="https://www.facebook.com/hktastefood/" target="_blank"
            >Facebook Chat Widget by Style3-New</a
          >
        </div>
        <div id="fb-root"></div>
      </div> -->
      <!-- <a
        href="https://www.facebook.com/hktastefood/"
        title="Send us a message on Facebook"
        class="ctrlq fb-button"
      ></a> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import $ from 'jquery';
@Component
export default class InsSidebar extends Vue {
  isShow: boolean = true;
  showFBMessenger: boolean = false;
  show: boolean = false;
  showLivechat() {
    // $('.fb-livechat').fadeToggle();
    $('.showWeChat').fadeToggle();
  }
  showbar() {
    // $('#sidebar').animate({ 'right': '0' });
    $('#sidebar').fadeToggle();
  }
  toTop() {
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    // window.addEventListener('scroll', () => {
    //   let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    //   let width = (document.documentElement.offsetWidth - 1100) / 2;

    //   if (scrollY > 500) {
    //     this.isShow = true;
    //     let element = document.getElementById('sidebar') as HTMLElement;
    //     if (element) {
    //       if (width > 80) {
    //         element.style.right = (width - 120) + 'px';
    //       } else {
    //         element.style.right = '10px';
    //       }
    //     }
    //   } else {
    //     this.isShow = false;
    //   }
    // });
    let top = document.documentElement.scrollTop;

    const timeTop = setInterval(() => {
      document.documentElement.scrollTop = top -= 50;

      if (top <= 0) {
        clearInterval(timeTop);
      }
    }, 10);
  }

  mounted() {
    // this.showSidebar();
    $('.fb-close').on('click', function() {
      $('.fb-livechat').fadeOut();
      $('.showWeChat').fadeOut();
      $('#sidebar').fadeOut();
    });
    // $('#sidebar').animate({ 'right': '-3.5rem' });
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.setAttribute('rel', 'preload');
    let local = this.$Storage.get('locale') || this.$Settings.defaultLang;
    let lang = {
      E: 'en_US',
      S: 'zh_CN',
      C: 'zh_HK'
    };
    s.src =
      'https://connect.facebook.net/' +
      lang[local] +
      '/sdk.js#xfbml=1&version=v3.0';
    document.body.appendChild(s);

    // chatbox
    var chatbox = document.getElementById('fb-customer-chat') as any;
    chatbox.setAttribute('page_id', '116826922314435');
    chatbox.setAttribute('attribution', 'biz_inbox');
    (function(d, s, id) {
    var js; var fjs = d.getElementsByTagName(s)[0] as any;
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/zh_HK/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  }
}
</script>
<style scoped lang="less">
.siderbarContainer {
  position: relative;

}
.fb-livechat {
  display: none;
  position: fixed;
  right: 0 !important;
  bottom: 60px;
  width: 4rem;
  z-index: 1000000;
  line-height: 0;
}
.showWeChat{
  display: none;
  position: fixed;
  right: 70px !important;
  bottom: 110px;
  width: 350px;
  z-index: 1000000;
  line-height: 0;
  img{
    width: 100%;
    display: block;
  }
}
.fb-widget {
  background: #fff;
  z-index: 2;
  position: absolute;
  width: 360px;
  height: 435px;
  overflow: hidden;
  bottom: 0;
  right: 70px;
  border-radius: 6px;
  -o-border-radius: 6px;
  -webkit-border-radius: 6px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  -o-box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
}

.fb-credit {
  text-align: center;
  margin-top: 8px;
}
.fb-credit a {
  transition: none;
  color: #bec2c9;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
  text-decoration: none;
  border: 0;
  font-weight: 400;
}

.fb-overlay {
  z-index: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  -webkit-transition: opacity 0.4s, visibility 0.4s;
  transition: opacity 0.4s, visibility 0.4s;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.05);
  display: none;
}

.fb-close {
  z-index: 4;
  padding: 0 6px;
  background: #365899;
  font-weight: 700;
  font-size: 11px;
  color: #fff;
  margin: 8px;
  border-radius: 3px;
  width: 10px;
  height: 20px;
  line-height: 20px;
  float: right;
  cursor: pointer;
}

.fb-close::after {
  content: "x";
  font-family: sans-serif;
}
#sidebar {
  img {
    width: 60px;
    display: block;
  }
  position: fixed;
  right: 0;
  bottom: 100px;
  width: 60px;
  z-index: 997;
  line-height: 0;
  text-align: center;
  a{
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }
  .toTop{
    img{
      width: 48px;
      display: block;
    }

  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-href {
  transform: translateY(20px);
  opacity: 0;
}
a {
  line-height: 0;
}
@media screen and (max-width: 768px) {
  .bar{
    width: 19px;
    height: 50px;
    position: fixed;
    right: 0;
    bottom: 2rem;
    background: url(/static/Image/mobile/home/mini_bg.png) no-repeat;
    display: block;
    transform: translateY(-50%);
  }
  #sidebar{
    right: 0;
    width: 3.5rem;
    display: block;
    img{
      width: 3.5rem;
    }
    .toTop{
      img{
        width: 3rem;
      }
    }
    a{
      margin-bottom: 2px;
    }
  }
  .fb-widget {
    width: 300px;
    height: 500px;
    right: 5rem;
  }
  .showWeChat{
    display: none;
    position: fixed;
    right: 4rem !important;
    bottom: 6rem;
    width: 25rem;
    z-index: 1000000;
    line-height: 0;
    img{
      width: 100%;
      display: block;
    }
  }
}
</style>
