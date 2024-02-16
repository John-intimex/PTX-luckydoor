// 設備判斷

import Vue from 'vue';
import Settings from '@/settings';
import store from '@/store';

export function disDevices () {
  /*
   *  桌面: ≥992px
   *  平板: ≥768px
   *  手機: <768px
   */

  if (Settings.responsive) {
    console.log('自適應設備判斷');

    if (window.innerWidth < 992) {
      store.dispatch('setIsMobile', true);
      if (window.innerWidth < 768) {
        setRem(320);
      } else {
        setRem(640);
      }
    } else {
      store.dispatch('setIsMobile', false);
      document.documentElement.style.fontSize = '';
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth < 992) {
        store.dispatch('setIsMobile', true);

        if (window.innerWidth < 768) {
          setRem(320);
        } else {
          setRem(640);
        }
      } else {
        store.dispatch('setIsMobile', false);
        document.documentElement.style.fontSize = '';
      }
    });
  } else {
    console.log('非自適應設備判斷');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      store.dispatch('setIsMobile', true);
      setRem(320);
    } else {
      store.dispatch('setIsMobile', false);
      document.documentElement.style.fontSize = '';
    }
  }
}

// 设置 rem 函数
function setRem (base) {
  let width = document.documentElement.clientWidth;
  const newFont = (width / base) * 10;
  document.documentElement.style.fontSize = newFont + 'px';
}
