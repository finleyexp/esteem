var fs = require('fs');

var app = angular.module('steem', [
	'ionic',
	'ngStorage',
	'ngCordova',
  'ion-floating-menu',
  'pascalprecht.translate',
  'ja.qr',
  'ion-datetime-picker',
  'highcharts-ng'
]);

if (localStorage.getItem("socketUrl") === null) {
  localStorage.setItem("socketUrl", "wss://steemd.steemit.com");
} else if (localStorage.getItem("socketUrl") == "wss://steemit.com/wspa") {
  localStorage.socketUrl="wss://steemd.steemit.com";
}

localStorage.golosId = "782a3039b478c839e4cb0c941ff4eaeb7df40bdd68bd441afd444b9da763de12";
localStorage.steemId = "0000000000000000000000000000000000000000000000000000000000000000";

window.steem = require('steem');

window.diff_match_patch = require('diff-match-patch');
window.getSymbol = require('currency-symbol-map');

require('./config')(app);
require('./services')(app);
require('./controllers')(app);


app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $sceDelegateProvider, $logProvider, $compileProvider, $animateProvider, $translateProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    template: fs.readFileSync(__dirname + '/templates/menu.html', 'utf8'),
    //templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        //templateUrl: 'templates/settings.html'
        template: fs.readFileSync(__dirname + '/templates/settings.html', 'utf8'),
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        //templateUrl: 'templates/settings.html'
        template: fs.readFileSync(__dirname + '/templates/about.html', 'utf8')
      }
    }
  })

	.state('app.market', {
		url: '/market',
		views: {
			'menuContent': {
				//templateUrl: 'templates/settings.html'
				template: fs.readFileSync(__dirname + '/templates/market.html', 'utf8'),
				controller: 'MarketCtrl'
			}
		}
	})

  .state('app.send', {
    url: '/send',
    views: {
      'menuContent': {
        //templateUrl: 'templates/settings.html'
        template: fs.readFileSync(__dirname + '/templates/send.html', 'utf8'),
        controller: 'SendCtrl'
      }
    }
  })

  .state('app.follow', {
    url: '/follow',
    views: {
      'menuContent': {
        //templateUrl: 'templates/follow.html',
        template: fs.readFileSync(__dirname + '/templates/follow.html', 'utf8'),
        controller: 'FollowCtrl'
      }
    }
  })


  .state('app.exchange', {
    url: '/exchange/:username',
    views: {
      'menuContent': {
      	template: fs.readFileSync(__dirname + '/templates/exchange.html', 'utf8'),
        //templateUrl: 'templates/exchange.html',
        controller: 'ExchangeCtrl'
      }
    }
  })

  .state('app.profile', {
    url: '/profile/:username',
    views: {
      'menuContent': {
        //templateUrl: 'templates/profile.html',
        template: fs.readFileSync(__dirname + '/templates/profile.html', 'utf8'),
        controller: "ProfileCtrl"
      }
    }
  })

  .state('app.posts', {
    url: '/posts/:tags/:renew',
    params: {renew: true},
    views: {
      'menuContent': {
        //templateUrl: 'templates/posts.html',
        template: fs.readFileSync(__dirname + '/templates/posts.html', 'utf8'),
        controller: 'PostsCtrl'
      }
    }
  })

  .state('app.bookmark', {
    url: '/bookmark',
    views: {
      'menuContent': {
        //templateUrl: 'templates/post.html',
        template: fs.readFileSync(__dirname + '/templates/bookmarks.html', 'utf8'),
        controller: 'BookmarkCtrl'
      }
    }
  })

	.state('app.drafts', {
    url: '/drafts',
    views: {
      'menuContent': {
        //templateUrl: 'templates/post.html',
        template: fs.readFileSync(__dirname + '/templates/drafts.html', 'utf8'),
        controller: 'DraftsCtrl'
      }
    }
  })

	.state('app.images', {
    url: '/images',
    views: {
      'menuContent': {
        //templateUrl: 'templates/post.html',
        template: fs.readFileSync(__dirname + '/templates/images.html', 'utf8'),
        controller: 'ImagesCtrl'
      }
    }
  })

  .state('app.notifications', {
    url: '/notifications',
    views: {
      'menuContent': {
        //templateUrl: 'templates/post.html',
        template: fs.readFileSync(__dirname + '/templates/notifications.html', 'utf8'),
        controller: 'NotificationsCtrl'
      }
    }
  })


  .state('app.post', {
    url: '/post/:category/:author/:permlink',
    views: {
      'menuContent': {
        //templateUrl: 'templates/post.html',
        template: fs.readFileSync(__dirname + '/templates/post.html', 'utf8'),
        controller: 'PostCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/posts//true');
  $ionicConfigProvider.navBar.alignTitle('left')
  $ionicConfigProvider.backButton.text('').icon('ion-chevron-left');
  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.views.maxCache(3);

  $animateProvider.classNameFilter( /\banimated\b/ );
  $ionicConfigProvider.scrolling.jsScrolling(false);

  if (window.cordova) {
      $logProvider.debugEnabled(false);
      $compileProvider.debugInfoEnabled(false);
  }

  $translateProvider.translations('en-US', require('./locales/ready/en')); //English
  $translateProvider.translations('ru-RU', require('./locales/ready/ru-RU')); //Russian
  $translateProvider.translations('de-DE', require('./locales/ready/de-DE')); //German
  $translateProvider.translations('fr-FR', require('./locales/ready/fr-FR')); //French
  $translateProvider.translations('es-ES', require('./locales/ready/es-ES')); //Spanish
  $translateProvider.translations('el-GR', require('./locales/ready/el-GR')); //Greek
  $translateProvider.translations('bg-BG', require('./locales/ready/bg-BG')); //Bulgarian
  $translateProvider.translations('nl-NL', require('./locales/ready/nl-NL')); //Dutch
  $translateProvider.translations('hu-HU', require('./locales/ready/hu-HU')); //Hungarian
  $translateProvider.translations('cs-CZ', require('./locales/ready/cs-CZ')); //Czech
  $translateProvider.translations('he-IL', require('./locales/ready/he-IL')); //Hebrew
  $translateProvider.translations('pl-PL', require('./locales/ready/pl-PL')); //Polish
  $translateProvider.translations('pt-PT', require('./locales/ready/pt-PT')); //Portuguese
  $translateProvider.translations('pt-BR', require('./locales/ready/pt-BR')); //Portuguese Brazil
  $translateProvider.translations('id-ID', require('./locales/ready/id-ID')); //Indonesian
  $translateProvider.translations('zh-TW', require('./locales/ready/zh-TW')); //Chinese traditional
  $translateProvider.translations('zh-CN', require('./locales/ready/zh-CN')); //Chinese simplified
  $translateProvider.translations('dolan', require('./locales/ready/dolan')); //Dolan
  $translateProvider.translations('sv-SE', require('./locales/ready/sv-SE')); //Swedish
  $translateProvider.translations('uk-UA', require('./locales/ready/uk-UA')); //Ukrainian
  $translateProvider.translations('ms-MY', require('./locales/ready/ms-MY')); //Malay
  $translateProvider.translations('hr-HR', require('./locales/ready/hr-HR')); //Croatian
  $translateProvider.translations('fa-IR', require('./locales/ready/fa-IR')); //Persian
  $translateProvider.translations('it-IT', require('./locales/ready/it-IT')); //Italian
  $translateProvider.translations('fil-PH', require('./locales/ready/fil-PH')); //Filipino
  $translateProvider.translations('ar-SA', require('./locales/ready/ar-SA')); //Arabic
  $translateProvider.translations('lt-LT', require('./locales/ready/lt-LT')); //Lithuanian
  $translateProvider.translations('lv-LV', require('./locales/ready/lv-LV')); //Latvian
  $translateProvider.translations('ja-JP', require('./locales/ready/ja-JP')); //Japanese

  $translateProvider.useSanitizeValueStrategy(null);

  $translateProvider.preferredLanguage('en-US');
  $translateProvider.fallbackLanguage('en-US');

});

app.run(function($ionicPlatform, $rootScope, $localStorage, $interval, $ionicPopup, $ionicLoading, $cordovaSplashscreen, $ionicModal, $timeout, $cordovaToast, APIs, $state, $log, $ionicScrollDelegate, $filter, $translate, $ionicHistory) {
  $rootScope.$storage = $localStorage;
  $rootScope.log = function(message) {
    $log.info(message);
  };
  window.steem.config.set('websocket',localStorage.socketUrl); 

  /*$ionicPlatform.registerBackButtonAction(function (event) {
  if ( ($state.$current.name=="app.posts") ){
          // H/W BACK button is disabled for these states (these views)
          // Do not go to the previous state (or view) for these states. 
          // Do nothing here to disable H/W back button.
      } else {
          // For all other states, the H/W BACK button is enabled
          navigator.app.backHistory();
      }
  }, 100);
  */
  $ionicPlatform.registerBackButtonAction(function(e){
    if ($rootScope.backButtonPressedOnceToExit) {
      ionic.Platform.exitApp();
    } else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;

      $cordovaToast.showShortBottom("Press back button again to exit").then(function(success) {
        // success
        console.log('exit');
      }, function (error) {
        // error
        console.log('err exit');
      });
      setTimeout(function(){
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
    e.preventDefault();
    return false;
  }, 101);


  $rootScope.user = $rootScope.$storage.user || undefined;
  
  console.log('Account set: '+$rootScope.user.username);

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
      StatusBar.styleLightContent();
    }
    if (!$rootScope.$storage.users) {
      $rootScope.$storage.users = [];
    }
    
    if (!$rootScope.$storage.theme) {
      $rootScope.$storage.theme = 'day';
    }

    if (!$rootScope.$storage.socketgolos) {
      $rootScope.$storage.socketgolos = "wss://ws.golos.io/";
    }
    if (!$rootScope.$storage.socketsteem) {
      $rootScope.$storage.socketsteem = "wss://steemd.steemit.com";
    }

    
    window.steem.config.set('chain_id',localStorage[$rootScope.$storage.chain+"Id"]);
    if ($rootScope.$storage.chain == 'golos') {
      window.steem.config.set('address_prefix','GLS');  
    } else {
      window.steem.config.set('address_prefix','STM');  
    }
    


    //window.ejs.ChainConfig.setChainId(localStorage[$rootScope.$storage.chain+"Id"]);

    if (!angular.isDefined($rootScope.$storage.language)) {
      if(typeof navigator.globalization !== "undefined") {
          navigator.globalization.getPreferredLanguage(function(language) {
              $translate.use(language.value).then(function(data) {
                  console.log("SUCCESS -> " + data);
                  if (language.value.indexOf("en") == 0) {
                    $rootScope.$storage.language = 'en';            
                  }
                  $rootScope.$storage.language = language.value;
              }, function(error) {
                  console.log("ERROR -> " + error);
              });
          }, null);
      } else {
        $rootScope.$storage.language = 'en';
      }
    } else {
      $translate.use($rootScope.$storage.language);
    }
    if (!$rootScope.$storage.chain){
      $rootScope.$storage.platformname = "Steem";
      $rootScope.$storage.platformpower = "Steem Power";
      $rootScope.$storage.platformsunit = "Steem";
      $rootScope.$storage.platformdollar = "Steem Dollar";
      $rootScope.$storage.platformdunit = "SBD";
      $rootScope.$storage.platformpunit = "SP";
      $rootScope.$storage.platformlunit = "STEEM";
      $rootScope.$storage.chain = "steem";
      $rootScope.$storage.currency = "usd";
      $rootScope.$storage.currencyRate = 1;
    }
    $rootScope.$storage.languages = [
      {id:'en', name: 'English'}, 
      {id:'es-ES', name: 'Español'}, 
      {id:'el-GR', name: 'Ελληνικά'}, 
      {id:'fr-FR', name: 'Français'}, 
      {id:'de-DE', name: 'Deutsch'}, 
      {id:'ru-RU', name: 'Русский'}, 
      {id:'bg-BG', name: 'Български'}, 
      {id:'nl-NL', name: 'Nederlands'}, 
      {id:'hu-HU', name: 'Magyar'}, 
      {id:'cs-CZ', name: 'Čeština'}, 
      {id:'he-IL', name: 'עברית‎'}, 
      {id:'pl-PL', name: 'Polski‎'}, 
      {id:'pt-PT', name: 'Português'}, 
      {id:'pt-BR', name: 'Português BR'},
      {id:'sv-SE', name: 'Svensk'},
      {id:'id-ID', name: 'Bahasa Indonesia'}, 
      {id:'zh-CN', name: '简体中文'}, 
      {id:'zh-TW', name: '繁體中文'},
      {id:'dolan', name: 'Dolan'},
      {id:'uk-UA', name: 'Українська'},
      {id:'ms-MY', name: 'Bahasa Melayu'},
      {id:'hr-HR', name: 'Hrvatski'},
      {id:'fa-IR', name: 'Fārsi'},
      {id:'it-IT', name: 'Italiano'},
      {id:'fil-PH', name: 'Wikang Filipino'},
      {id:'ar-SA', name: 'عَرَبِيّ'},
      {id:'lt-LT', name: 'Lietuvių'},
      {id:'lv-LV', name: 'Latviešu'},
      {id:'ja-JP', name: '日本語'}
    ];
    if (!$rootScope.$storage.dir) {
      $rootScope.$storage.dir = 'ltr';
    }
    $rootScope.$storage.chains = [{id:'steem', name: 'Steem'}, {id:'golos', name: 'Golos'}];

    if (!$rootScope.$storage.currencies) {
      $rootScope.$storage.currencies = [
        {id:'btc', name: 'BTC', rate: 0, date: "1/1/2016"}, 
        {id:'usd', name: 'USD', rate: 0, date: "1/1/2016"}, 
        {id:'eur', name: 'EUR', rate: 0, date: "1/1/2016"}, 
        {id:'rub', name: 'RUB', rate: 0, date: "1/1/2016"}, 
        {id:'gbp', name: 'GBP', rate: 0, date: "1/1/2016"}, 
        {id:'jpy', name: 'JPY', rate: 0, date: "1/1/2016"}, 
        {id:'krw', name: 'KRW', rate: 0, date: "1/1/2016"}, 
        {id:'inr', name: 'INR', rate: 0, date: "1/1/2016"}, 
        {id:'cny', name: 'CNY', rate: 0, date: "1/1/2016"}, 
        {id:'uah', name: 'UAH', rate: 0, date: "1/1/2016"}, 
        {id:'sek', name: 'SEK', rate: 0, date: "1/1/2016"}, 
        {id:'try', name: 'TRY', rate: 0, date: "1/1/2016"},
        {id:'cad', name: 'CAD', rate: 0, date: "1/1/2016"},
        {id:'chf', name: 'CHF', rate: 0, date: "1/1/2016"},
        {id:'aud', name: 'AUD', rate: 0, date: "1/1/2016"},
        {id:'nok', name: 'NOK', rate: 0, date: "1/1/2016"},
        {id:'pln', name: 'PLN', rate: 0, date: "1/1/2016"},
        {id:'php', name: 'PHP', rate: 0, date: "1/1/2016"}
      ];
    } else {
      if (!$rootScope.$storage.addition) {
        var x = [
          {id:'cad', name: 'CAD', rate: 0, date: "1/1/2016"},
          {id:'chf', name: 'CHF', rate: 0, date: "1/1/2016"},
          {id:'aud', name: 'AUD', rate: 0, date: "1/1/2016"},
          {id:'nok', name: 'NOK', rate: 0, date: "1/1/2016"},
          {id:'pln', name: 'PLN', rate: 0, date: "1/1/2016"},
          {id:'php', name: 'PHP', rate: 0, date: "1/1/2016"}];
        $rootScope.$storage.currencies = $rootScope.$storage.currencies.concat(x);
        $rootScope.$storage.addition = true;
      } else {
        $rootScope.$storage.addition = true;
      }
    }

    if (window.cordova) {
      if (ionic.Platform.isIPad() || ionic.Platform.isIOS()) {
        MobileAccessibility.isVoiceOverRunning(function(bool) {
          if (bool) {
              $rootScope.log("Screen reader: ON");
              $rootScope.voiceOver = bool;
              //$ionicConfigProvider.navBar.alignTitle('center');
          } else {
              $rootScope.log("Screen reader: OFF");
              $rootScope.voiceOver = bool;
              //$ionicConfigProvider.navBar.alignTitle('left');
          }
        });

      } else {
        $rootScope.voiceOver = false;
      }
    } else {
      $rootScope.voiceOver = false;
    }

    if (!$rootScope.$storage.view) {
      $rootScope.$storage.view = 'compact';
    }
    if (!$rootScope.$storage.filter) {
      $rootScope.$storage.filter = "trending";
    }
    if (navigator.splashscreen) {
      setTimeout(function() {
        console.log('-----hiding splash------');
        navigator.splashscreen.hide();
      }, 1000);
    }
    if (angular.isDefined($cordovaSplashscreen)) {
      setTimeout(function() {
        console.log('-----hide splash------');
        $cordovaSplashscreen.hide();
      }, 1000);
    }
    $rootScope.log("app start ready");
    setTimeout(function() {
      if ($rootScope.$storage.pincode) {
        $rootScope.pincheck = true;
        $rootScope.$broadcast("pin:check");
      }
    }, 1000);
    $rootScope.showAlert = function(title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg
      });
      if (msg.indexOf("error")>-1) {
        //window.Api.initPromise.then(function(response) {
        $rootScope.log("broadcast error");
        //});
      }
      return alertPopup/*.then(function(res) {
        $rootScope.log('Thank you ...');
      });*/
    };
    $rootScope.showMessage = function(title, msg) {
      if (title) {
        if (window.cordova) {
          $cordovaToast.showLongBottom(title+": "+msg).then(function(success) {
            // success
            $rootScope.log("toast"+success);
          }, function (error) {
            // error
            $rootScope.log("toast"+error);
          });
        } else {
          $rootScope.showAlert(title, msg);
        }
      }
    };
    $rootScope.$on('show:loading', function(event, args){
      $rootScope.log('show:loading');
      $ionicLoading.show({
        noBackdrop : true,
        template: '<ion-spinner icon="ripple" class="spinner-energized"></ion-spinner>'
      });
    });
    $rootScope.$on('hide:loading', function(event, args){
      $rootScope.log('hide:loading');
      setTimeout(function() {
        $ionicLoading.hide();
      }, 1000);
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      $rootScope.log("from "+fromState.name+" to "+toState.name);
    });

    $ionicPlatform.on('resume', function(){
      $rootScope.log("app resume");
      //var steemRPC = require("steem-rpc");
      /*if (localStorage.getItem("socketUrl") === null) {
        localStorage.setItem("socketUrl", "wss://steemd.steemit.com");
      }*/
      //window.Api = steemRPC.Client.get({url:localStorage.socketUrl}, true);
      //window.steemJS = require("steemjs-lib");
      //window.golosJS = require("golosjs-lib");

      //if (!angular.isDefined($rootScope.timeint)) {
      /*window.Api.initPromise.then(function(response) {
        $rootScope.log("Api ready state change: "+angular.toJson(response));
        $rootScope.timeint = $interval(function(){
          window.Api.database_api().exec("get_dynamic_global_properties", []).then(function(response){
            $rootScope.log("get_dynamic_global_properties " + response.head_block_number);
          });
        }, 15000);
      });*/
      //}

      if ($rootScope.$storage.pincode) {
        $rootScope.pincheck = true;
        $rootScope.$broadcast("pin:check");
      }

      if (window.cordova) {
        if (ionic.Platform.isIPad() || ionic.Platform.isIOS()) {

          MobileAccessibility.isVoiceOverRunning(function(bool) {
            if (bool) {
                $rootScope.log("Screen reader: ON");
                $rootScope.voiceOver = bool;
                //$ionicConfigProvider.navBar.alignTitle('center');
            } else {
                $rootScope.log("Screen reader: OFF");
                $rootScope.voiceOver = bool;
                //$ionicConfigProvider.navBar.alignTitle('left');
            }
          });
        } else {
          $rootScope.voiceOver = false;
        }
      } else {
        $rootScope.voiceOver = false;
      }

    });
    $ionicPlatform.on('pause', function(){
      $rootScope.log("app pause");
      if (angular.isDefined($rootScope.timeint)) {
        $rootScope.log("cancel interval");
        $interval.cancel($rootScope.timeint);
        $rootScope.timeint = undefined;
        //window.Api.close();
      }
    });

    $ionicPlatform.on('offline', function(){
      $rootScope.log("app offline");
    });

    $rootScope.init = function() {
      $rootScope.passcode = "";
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    };

    $rootScope.add = function(value) {
      $rootScope.pinerror = "";
      if($rootScope.passcode.length < 4) {
        $rootScope.passcode = $rootScope.passcode + value;
        if($rootScope.passcode.length == 4) {
          $timeout(function() {
            $rootScope.log("PIN "+$rootScope.passcode);
            if ($rootScope.pintype == 3) {
              if ($rootScope.$storage.pincode == $rootScope.passcode) {
                $rootScope.passcode = "";
                $rootScope.closePin();
              } else {
                $rootScope.pintry += 1;
                $rootScope.pinerror = $filter('translate')('NOT_MATCH')+"("+$rootScope.pintry+")";
                if ($rootScope.pintry>3) {
                  $rootScope.$storage.pincode = undefined;
                  $rootScope.pintry = 0;
                  $rootScope.$broadcast("pin:failed");
                  $rootScope.closePin();
                }
              }
            }
            if ($rootScope.pintype == 0) {
              $rootScope.log("type 0: set pin");
              if ($rootScope.$storage.pincode) {
                $rootScope.pincheck = true;
                $rootScope.$broadcast("pin:check");
                $rootScope.closePin();
              } else {
                $rootScope.$storage.pincode = $rootScope.passcode;
                $rootScope.pinsubtitle = $filter('translate')('CONFIRM_PIN');
                $rootScope.passcode = "";
                $rootScope.pintype = 3;
                $rootScope.pintry = 0;
              }
            }
            if ($rootScope.pintype == 1) {
              $rootScope.log("type 1: check pin");
              if ($rootScope.$storage.pincode == $rootScope.passcode){
                $rootScope.$broadcast('pin:correct');
                $rootScope.passcode = "";
                $rootScope.closePin();
              } else {
                $rootScope.pintry += 1;
                $rootScope.pinerror = $filter('translate')('INCORRECT')+"("+$rootScope.pintry+")";
                if ($rootScope.pintry>3) {
                  $rootScope.$storage.$reset();
                  $rootScope.closePin();
                }
              }
            }

          }, 50);
        }
      }
    };

    $rootScope.delete = function() {
      $rootScope.pinerror = "";
      if($rootScope.passcode.length > 0) {
        $rootScope.passcode = $rootScope.passcode.substring(0, $rootScope.passcode.length - 1);
      }
    }

    $ionicModal.fromTemplateUrl('templates/pincode.html', {
      scope: $rootScope
    }).then(function(modal) {
      $rootScope.pinmodal = modal;
    });
    $rootScope.closePin = function() {
      $rootScope.pinmodal.hide();
      if ($rootScope.pinenabled) {
        if ($rootScope.$storage.notifData) {
          var alertPopup = $ionicPopup.confirm({
            title: $rootScope.$storage.notifData.title,
            template: $rootScope.$storage.notifData.body + $filter('translate')('OPENING_POST')
          });
          alertPopup.then(function(res) {
            $rootScope.log('Thank you for seeing alert from tray');
            if (res) {
              $rootScope.getContentAndOpen({author:$rootScope.$storage.notifData.author, permlink:$rootScope.$storage.notifData.permlink});
              $rootScope.$storage.notifData = undefined;
            } else {
              $rootScope.log("not sure to open alert");
              $rootScope.$storage.notifData = undefined;
            }
            $rootScope.pinenabled = false;
          });
        }
      }
    };
    $rootScope.openPin = function(type) {
      $rootScope.passcode = "";
      if (type == 0) {
        $rootScope.pintype = 0;
        $rootScope.pintitle = $filter('translate')('SET_PIN');
        $rootScope.pinsubtitle = $filter('translate')('SET_PIN');
      }
      if (type == 1) {
        $rootScope.pintype = 1;
        $rootScope.pintry = 0;
        $rootScope.pintitle = $filter('translate')('ENTER_PIN');
        $rootScope.pinsubtitle = $filter('translate')('ENTER_PIN');
      }
      $rootScope.pinmodal.show();
    };
    $rootScope.$on("pin:new", function(){
      $rootScope.pincheck = false;
      $rootScope.openPin(0);
    });
    $rootScope.$on("pin:check", function(){
      $rootScope.pincheck = true;
      $rootScope.openPin(1);
    });


    $ionicModal.fromTemplateUrl('templates/info.html', {
      scope: $rootScope
      //animation: "null"
    }).then(function(modal) {
      $rootScope.infomodal = modal;
    });

    $rootScope.openInfo = function(xx) {
      //console.log(xx);
      if (xx.active_votes.length==0) {
        window.steem.api.getActiveVotes(xx.author, xx.permlink, function(err, dd) {
          //console.log(err, dd);
          xx.active_votes = dd;
        });
      }
      $rootScope.voters = xx;
      setTimeout(function() {
        $rootScope.infomodal.show();  
      }, 5);
    };

    $rootScope.closeInfo = function() {
      $rootScope.infomodal.hide();
      //$rootScope.infomodal.remove();
    };

    $rootScope.openAccount = function(account) {
      $rootScope.infomodal.hide();
      $state.go("app.profile", {username: account});
    };

    String.prototype.replaceAt=function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
    }
		$rootScope.openDraft = function(item){
			item.operation_type = item.post_type;
			$rootScope.$storage.spost = item;
			$state.go('app.posts');
			$rootScope.$broadcast('openPostModal');
		}
    $rootScope.getContentAndOpen = function(item) {
      window.steem.api.getContent(item.author, item.permlink, function(err, result) {
        console.log(err, result);
        var _len = result.active_votes.length;
          for (var j = _len - 1; j >= 0; j--) {
            if (result.active_votes[j].voter === $rootScope.user.username) {
              if (result.active_votes[j].percent > 0) {
                result.upvoted = true;
              } else if (result.active_votes[j].percent < 0) {
                result.downvoted = true;
              } else {
                result.downvoted = false;
                result.upvoted = false;
              }
            }
          }
          result.json_metadata = angular.fromJson(result.json_metadata);
          var item = result;
          $rootScope.sitem = item;
          setTimeout(function() {
            //$state.go('app.post');
            $state.go('app.post', {category: item.category, author: item.author, permlink: item.permlink});

          }, 5);

          if (!$rootScope.$$phase) {
            $rootScope.$apply();
          }
      });
      $rootScope.$broadcast('hide:loading');
    };

    $rootScope.reBlog = function(author, permlink) {
      var confirmPopup = $ionicPopup.confirm({
        title: $filter('translate')('ARE_YOU_SURE'),
        template: $filter('translate')('REBLOG_TEXT')
      });
      confirmPopup.then(function(res) {
        if(res) {
          $rootScope.log('You are sure');
          $rootScope.$broadcast('show:loading');
          if ($rootScope.user) {
            var json = ["reblog",{account:$rootScope.user.username, author:author, permlink:permlink}];

            const wif = $rootScope.user.password
                  ? window.steem.auth.toWif($rootScope.user.username, $rootScope.user.password, 'posting')
                  : $rootScope.user.privatePostingKey;

            window.steem.broadcast.customJson(wif, [], [$rootScope.user.username], "follow", angular.toJson(json), function(err, result) {
              console.log(err, result);
              if (err) {
                $rootScope.showAlert($filter('translate')('ERROR'), $filter('translate')('REBLOG_TEXT')+" "+err)
              } else {
                //$scope.refreshFollowers();
                $rootScope.showMessage($filter('translate')('SUCCESS'), $filter('translate')('REBLOGGED_POST'));
              }
              $rootScope.$broadcast('hide:loading');
            });
            //$rootScope.showMessage($filter('translate')('ERROR'), $filter('translate')('LOGIN_FAIL'));
            $rootScope.$broadcast('hide:loading');
          } else {
            $rootScope.$broadcast('hide:loading');
            $rootScope.showAlert($filter('translate')('WARNING'), $filter('translate')('LOGIN_TO_X'));
          }
        } else {
          $rootScope.log('You are not sure');
        }
      });
    };

    $rootScope.votePost = function(post, type, afterward) {
      post.invoting = true;
      var tt = 1;
      if (type === "upvote") {
        tt = 1;
      }
      if (type === "downvote") {
        tt = -1;
      }
      if (type === "unvote") {
        tt = 0;
      }
      $rootScope.log('voting '+tt);
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
      if ($rootScope.user) {
        const wif = $rootScope.user.password
                  ? window.steem.auth.toWif($rootScope.user.username, $rootScope.user.password, 'posting')
                  : $rootScope.user.privatePostingKey;

        window.steem.broadcast.vote(wif, $rootScope.user.username, post.author, post.permlink, $rootScope.$storage.voteWeight*tt || 10000*tt, function(err, result) {
          //console.log(err, result);
          post.invoting = false;
          if (err) {
            $rootScope.showAlert($filter('translate')('ERROR'), $filter('translate')('BROADCAST_ERROR')+" "+localStorage.errormessage)
          } else {
            if (tt>0){
              post.upvoted = true;
            } else if (tt<0) {
              post.downvoted = true;
            } else {
              post.upvoted = false;
              post.downvoted = false;
            }
            if (afterward === 'fetchContent') {
              $rootScope.$broadcast(afterward, { any: {author: post.author, permlink: post.permlink} });
            } else {
              $rootScope.$broadcast(afterward);
            }
          }
          if (!$rootScope.$$phase) {
            $rootScope.$apply();
          }
          $rootScope.$broadcast('hide:loading');
        });
      } else {
        $rootScope.$broadcast('hide:loading');
        post.invoting = false;
        $rootScope.showAlert($filter('translate')('WARNING'), $filter('translate')('LOGIN_TO_X'));
      }
    };

    $rootScope.isWitnessVoted = function() {
      if ($rootScope.user && $rootScope.user.witness_votes.indexOf("good-karma")>-1) {
        return true;
      } else {
        return false;
      }
    };
    $rootScope.voteWitness = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: $filter('translate')('ARE_YOU_SURE'),
          template: $filter('translate')('VOTE_FOR_WITNESS')+" @good-karma"
        });
        confirmPopup.then(function(res) {
          if(res) {
            $rootScope.log('You are sure');
            $rootScope.$broadcast('show:loading');
            if ($rootScope.user) {
              if ($rootScope.user.password || $rootScope.user.privateActiveKey) {
                
                const wif = $rootScope.user.password
                  ? window.steem.auth.toWif($rootScope.user.username, $rootScope.user.password, 'active')
                  : $rootScope.user.privateActiveKey;

                window.steem.broadcast.accountWitnessVote(wif, $rootScope.user.username, "good-karma", true, function(err, result) {
                  console.log(err, result);
                  if (err === 1) {
                    $rootScope.showAlert($filter('translate')('ERROR'), $filter('translate')('BROADCAST_ERROR')+" "+localStorage.errormessage)
                  } else {
                    //$scope.refreshFollowers();
                    $rootScope.showMessage($filter('translate')('SUCCESS'),$filter('translate')('VOTED_FOR_WITNESS')+' @good-karma');
                    $rootScope.$broadcast('refreshLocalUserData');
                  }
                });
              } else {
                $rootScope.showMessage($filter('translate')('ERROR'), $filter('translate')('LOGIN_FAIL'));
              }
              $rootScope.$broadcast('hide:loading');
            } else {
              $rootScope.$broadcast('hide:loading');
              $rootScope.showAlert($filter('translate')('WARNING'), $filter('translate')('LOGIN_TO_X'));
            }
          } else {
            $rootScope.log('You are not sure');
          }
        });
    };

    $rootScope.following = function(xx, mtype) {
      $rootScope.$broadcast('show:loading');
      $rootScope.log(xx);
      if ($rootScope.user) {
          var json;
          if (mtype === "follow") {
            json = ['follow',{follower:$rootScope.user.username, following:xx, what: ["blog"]}];
          } else {
            json = ['follow',{follower:$rootScope.user.username, following:xx, what: []}];
          }
          const wif = $rootScope.user.password
                ? window.steem.auth.toWif($rootScope.user.username, $rootScope.user.password, 'posting')
                : $rootScope.user.privatePostingKey;

          window.steem.broadcast.customJson(wif, [], [$rootScope.user.username], "follow", angular.toJson(json), function(err, result) {
            //console.log(err, result);
            if (err) {
              $rootScope.showAlert($filter('translate')('ERROR'), $filter('translate')('BROADCAST_ERROR')+" "+err)
            } else {
              $rootScope.$broadcast('current:reload');
            }
            $rootScope.$broadcast('hide:loading');
          });
        $rootScope.$broadcast('hide:loading');
      } else {
        $rootScope.$broadcast('hide:loading');
        $rootScope.showAlert($filter('translate')('WARNING'), $filter('translate')('LOGIN_TO_X'));
      }
    };

    setTimeout(function() {
      window.steem.api.getFeedHistory(function(err, r) {
        //console.log(err, r);
        $rootScope.$storage.base = r.current_median_history.base.split(" ")[0];
        window.steem.api.getDynamicGlobalProperties(function(err, r) {
          //console.log(err, r);
          $rootScope.log(r);
          $rootScope.$storage.steem_per_mvests = (Number(r.total_vesting_fund_steem.substring(0, r.total_vesting_fund_steem.length - 6)) / Number(r.total_vesting_shares.substring(0, r.total_vesting_shares.length - 6))) * 1e6;
        });
      });
    }, 10);
    if (!angular.isDefined($rootScope.$storage.notifications)) {
      $rootScope.$storage.notifications = [];
    }
    $rootScope.$on('changedChain', function(){
      console.log('chain differs');
      localStorage.socketUrl = $rootScope.$storage["socket"+$rootScope.$storage.chain];
      
      console.log(localStorage.socketUrl, $rootScope.$storage.chain);

      window.steem.config.set('websocket',localStorage.socketUrl);
      window.steem.config.set('chain_id',localStorage[$rootScope.$storage.chain+"Id"]);
      if ($rootScope.$storage.chain == 'golos') {
        window.steem.config.set('address_prefix','GLS');  
      } else {
        window.steem.config.set('address_prefix','STM');  
      }
      window.steem.api.stop();

      angular.forEach($rootScope.$storage.users, function(v,k){
        if (v.chain == $rootScope.$storage.chain){
          $rootScope.$storage.user = v;
          $rootScope.user = $rootScope.$storage.user;
        }
      });

      if ($rootScope.$storage.chain == 'steem'){
        $rootScope.$storage.platformname = "Steem";
        $rootScope.$storage.platformpower = "Steem Power";
        $rootScope.$storage.platformsunit = "Steem";
        $rootScope.$storage.platformdollar = "Steem Dollar";
        $rootScope.$storage.platformdunit = "SBD";
        $rootScope.$storage.platformpunit = "SP";
        $rootScope.$storage.platformlunit = "STEEM";
        $rootScope.$storage.socketsteem = "wss://steemd.steemit.com";
      } else {
        $rootScope.$storage.platformname = "ГОЛОС";
        $rootScope.$storage.platformpower = "СИЛА ГОЛОСА";
        $rootScope.$storage.platformsunit = "Голос";
        $rootScope.$storage.platformdollar = "ЗОЛОТОЙ";
        $rootScope.$storage.platformdunit = "GBG";
        $rootScope.$storage.platformpunit = "GOLOSP";
        $rootScope.$storage.platformlunit = "GOLOS";
        $rootScope.$storage.socketgolos = "wss://ws.golos.io/";
      }
      
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    });
    function checkDate(date, ignore) {
      var eold = 86400000; //1 * 24 * 60 * 60 * 1000; //1 day old
      var now = new Date().getTime();
      var old = new Date(date).getTime();
      return ignore||now-old>=eold;
    }
    $rootScope.$on('changedCurrency', function(event, args){
      var xx = args.currency;
      var ignore = args.enforce;
      console.log(xx);
      var resultObject = $rootScope.$storage.currencies.filter(function ( obj ) {
          return obj.id === xx;
      })[0];
      //searchObj(xx, $rootScope.$storage.currencies);
      if (checkDate(resultObject.date, ignore)) {
        if ($rootScope.$storage.chain == 'steem'){
          APIs.getCurrencyRate("USD", xx ).then(function(res){
            $rootScope.$storage.currencyRate = Number(res.data.query.results.rate.Rate);
            $rootScope.$storage.currencies.filter(function(obj){
              if (obj.id == xx) {
                obj.rate = $rootScope.$storage.currencyRate;
                obj.date = res.data.query.results.rate.Date==="N/A"?new Date() : res.data.query.results.rate.Date;
              }
            });
          });
        } else {
          APIs.getCurrencyRate("XAU", xx ).then(function(res){
            //XAU - 31.1034768g
            //GBG rate in mg. so exchangeRate/31103.4768
            $rootScope.$storage.currencyRate = Number(res.data.query.results.rate.Rate)/31103.4768;
            $rootScope.$storage.currencies.filter(function(obj){
              if (obj.id == xx) {
                obj.rate = $rootScope.$storage.currencyRate;
                obj.date = res.data.query.results.rate.Date==="N/A"?new Date() : res.data.query.results.rate.Date;
              }
            });
            //console.log($rootScope.$storage.currencyRate);
          });
        }
      } else {
        $rootScope.$storage.currencyRate = resultObject.rate;
      }
      if (!$rootScope.$$phase) {
        $rootScope.$apply();
      }
    });

    if (window.cordova) {
      if (!ionic.Platform.isWindowsPhone()) {
        if (ionic.Platform.isIOS() || ionic.Platform.isIPad()) {
          //window.FirebasePlugin.grantPermission();
        }

        /*window.FirebasePlugin.getToken(function(token) {
            // save this server-side and use it to push notifications to this device
            $rootScope.log("device "+token);
            $rootScope.$storage.deviceid = token;
            if ($rootScope.$storage.user) {
              APIs.saveSubscription(token, $rootScope.$storage.user.username, { device: ionic.Platform.platform() }).then(function(res){
                $rootScope.log(angular.toJson(res));
              });
            } else {
              APIs.saveSubscription(token, "", { device: ionic.Platform.platform() }).then(function(res){
                $rootScope.log(angular.toJson(res));
              });
            }
        }, function(error) {
            console.error(error);
        });*/

        FCMPlugin.getToken(function(token){
          // save this server-side and use it to push notifications to this device
          $rootScope.log("device "+token);
          $rootScope.$storage.deviceid = token;
          if ($rootScope.user) {
            APIs.saveSubscription(token, $rootScope.user.username, { device: ionic.Platform.platform() }).then(function(res){
              $rootScope.log(angular.toJson(res));
            });
          } else {
            APIs.saveSubscription(token, "", { device: ionic.Platform.platform() }).then(function(res){
              $rootScope.log(angular.toJson(res));
            });
          }
        });

        /*window.FirebasePlugin.onTokenRefresh(function(token) {
          APIs.updateToken($rootScope.$storage.deviceid, token).then(function(res){
            console.log(angular.toJson(res));
            if (res.status) {
              $rootScope.$storage.deviceid = token  
            }
          });
          if (!$rootScope.$$phase){
            $rootScope.$apply();
          }
        }, function(error) {
          console.error(error);
        });*/
        FCMPlugin.onTokenRefresh(function(token){
          APIs.updateToken($rootScope.$storage.deviceid, token).then(function(res){
            console.log(angular.toJson(res));
            if (res.status) {
              $rootScope.$storage.deviceid = token  
            }
          });
          if (!$rootScope.$$phase){
            $rootScope.$apply();
          }
        });

        /*window.FirebasePlugin.onNotificationOpen(function(data) {
            $rootScope.log(angular.toJson(data));

            //console.log(angular.toJson(data));

            //$rootScope.$storage.notifications.push({title:data.title, message: data.body, author: data.author, permlink: data.permlink, created: new Date()});

            if(data.tap){
              //Notification was received on device tray and tapped by the user.
              if (data.author && data.permlink) {
                if (!$rootScope.$storage.pincode) {

                  var alertPopup = $ionicPopup.confirm({
                    title: data.title,
                    template: data.body + $filter('translate')('OPENING_POST')
                  });

                  alertPopup.then(function(res) {
                    $rootScope.log('Thank you for seeing alert from tray');
                    if (res) {
                      setTimeout(function() {
                        $rootScope.getContentAndOpen({author:data.author, permlink:data.permlink});
                      }, 10);
                    } else {
                      $rootScope.log("not sure to open alert");
                    }
                  });

                } else {
                  $rootScope.$storage.notifData = {title:data.title, body: data.body, author: data.author, permlink: data.permlink};
                  $rootScope.pinenabled = true;
                }
              }
            } else{
              //Notification was received in foreground. Maybe the user needs to be notified.
              //alert( JSON.stringify(data) );
              if (data.author && data.permlink) {
                $rootScope.showMessage(data.title, data.body+" "+data.permlink);
              } else {
                $rootScope.showMessage(data.title, data.body);
              }
            }
        }, function(error) {
            console.error(error);
        });
        */

        //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
        //Here you define your application behaviour based on the notification data.
        FCMPlugin.onNotification(function(data){
          $rootScope.log(angular.toJson(data));

            //console.log(angular.toJson(data));

            //$rootScope.$storage.notifications.push({title:data.title, message: data.body, author: data.author, permlink: data.permlink, created: new Date()});

            if(data.wasTapped){
              //Notification was received on device tray and tapped by the user.
              if (data.author && data.permlink) {
                if (!$rootScope.$storage.pincode) {

                  var alertPopup = $ionicPopup.confirm({
                    title: data.title,
                    template: data.body + $filter('translate')('OPENING_POST')
                  });

                  alertPopup.then(function(res) {
                    $rootScope.log('Thank you for seeing alert from tray');
                    if (res) {
                      if (data.chain !== $rootScope.$storage.chain) {
                        $rootScope.$storage.chain = data.chain;
                        $rootScope.$broadcast('changedChain');
                        $rootScope.$emit('changedCurrency', {currency: $rootScope.$storage.currency, enforce: true});
                      }
                      setTimeout(function() {
                        $rootScope.getContentAndOpen({author:data.author, permlink:data.permlink});
                      }, 10);
                    } else {
                      $rootScope.log("not sure to open alert");
                    }
                  });

                } else {
                  $rootScope.$storage.notifData = {title:data.title, body: data.body, author: data.author, permlink: data.permlink};
                  $rootScope.pinenabled = true;
                }
              }
            } else{
              //Notification was received in foreground. Maybe the user needs to be notified.
              //alert( JSON.stringify(data) );
              if (data.author && data.permlink) {
                $rootScope.showMessage(data.title, data.body+" "+data.permlink);
              } else {
                $rootScope.showMessage(data.title, data.body);
              }
            }
        });
      }

    }

  });
});
