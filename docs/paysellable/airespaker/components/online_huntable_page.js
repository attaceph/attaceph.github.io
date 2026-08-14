/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

const gv_online_page_text = `  __ _(_)  _ _ ___ ____ __   __ _\| \|_____ _ _ 
 / _\` \| \| \| '_/ -_\|_-< '_ \\ / _\` \| / / -_) '_\|
 \\__,_\|_\| \|_\| \\___/__/ .__/ \\__,_\|_\\_\\___\|_\|  
=====================\|_\|=======================
              AI Response Taker
===============================================

`;

const gv_online_page_text_2 = `
`;

const HuntableOnlinePage = {
  template: `<div v-show="online && page == 'home'" class="online-page"><div class="online-page-inner">=======_==========================<span v-on:click="hide=false">_</span>============<br/>{{ online_page_text }}

<input type="button" class="online-button-2" @click="go_page('login')" value="Login" /> &nbsp; <input  v-show="premium == ''" type="button" class="online-button-2" @click="go_page('register')" value="Register" />
</div>

  </div>
  </div>
  </div>
  <login_page v-show="online && page == 'login'" ref="login_page" @go_page="go_page" @set_token="set_token" @set_username="set_username"></login_page>  
  <dashboard_page v-show="online && page == 'dashboard'" ref="dashboard_page" @go_page="go_page" @set_token="set_token"></dashboard_page>  
  <take_page v-show="online && page == 'take'" ref="take_page" @go_page="go_page" @set_token="set_token"></take_page>  
  <profile_page v-show="online && page == 'profile'" ref="profile_page" @go_page="go_page" @set_token="set_token"></profile_page>  
  <register_page v-show="online && page == 'register'" ref="register_page" @go_page="go_page" @set_token="set_token"></register_page>  
  <aircache_page v-show="online && page == 'aircache'" ref="aircache_page" @go_page="go_page" @set_token="set_token"></aircache_page>  
  <savecache_page v-show="online && page == 'savecache'" ref="savecache_page" @go_page="go_page" @set_token="set_token"></savecache_page>  
`,
  emits: [ 'update_online' ],
  data() {
    return {
      premium: go_premium,
      username: go_premium,
      updated_once: false,
      page: 'home',
      token: '',
      online_page_text: gv_online_page_text,
      online_page_text_2: gv_online_page_text_2,
      online: false,
      hide: go_enable_prelaunch
    };
  },
  methods: {
    check_logged_in() {
        let v_token = localStorage.getItem('paysellable_airespaker_token');
        if (v_token + '' !== 'undefined' && v_token + '' !== '') {
          this.token = v_token;
          this.go_page('dashboard');
        }    
    },
    update_online( value ) {
      this.online = value;
      if (this.updated_once == false) {
        this.updated_once = true;
        this.check_logged_in();
      }
    },
    set_username( username ) {
      if (this.token !== '') {
        this.username = username;
      } else {
        this.username = '';
      }
    },
    set_token( value ) {
      if (value === '' && this.token !== '') {
        gj_text_post( '/airespaker/index.php?method=logout', {'token': this.token}, 'n', function( text ) {
        });      
        localStorage.setItem('paysellable_airespaker_token', '');
      }
      this.token = value;
    },
    go_page( value ) {
      if ( value == 'login' ) {
        this.$refs.login_page.doPrepare();
      } else if ( value == 'take' ) {
        this.$refs.take_page.doPrepare(this.token);      
      } else if ( value == 'register' ) {
        this.$refs.register_page.doPrepare();      
      } else if ( value == 'profile' ) {
        this.$refs.profile_page.doPrepare(this.token);      
      } else if ( value == 'dashboard' ) {
        this.$refs.dashboard_page.doPrepare(this.token);      
      } else if ( value == 'aircache' ) {
        window.open( 'https://respache.is-best.net', '_blank');
        return;
        this.$refs.aircache_page.doPrepare(this.token, this.username);      
      } else if ( value == 'savecache' ) {
        window.open( 'https://respache.is-best.net', '_blank');
        return;
        this.$refs.savecache_page.doPrepare(this.token, this.username);      
      }
      this.page = value;
    },
    doLogout() {
      gj_text_post( '/airespaker/index.php?method=logout', {'token': this.token}, 'n', function( text ) {
      });      
      this.token = '';
    }
  }
};
