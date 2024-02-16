import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import { Store } from 'vuex';

// 扩充
declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter;
        $route: Route;
        $store: Store<any>;
        $Api: any;
        $Inform : any;
        $Notice : any;
        $Confirm : any;
        $ShowLayer : any;
        $HiddenLayer : any;
        $SingtonConfirm : any;
        $ClearSingtonConfirm : any;
        $Login : any;
        $LoginClose : any;
        $Storage : any;
        $LoadScript: any;
        $pay: Function;
        vw : number;
        Shake : Function;
        Reload : Function;
        userAgent : string;
        $Settings: any;
    }
}
