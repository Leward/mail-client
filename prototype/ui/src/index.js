import angular from 'angular';
import 'angular-ui-router';
import 'foundation-apps/dist/js/foundation-apps';
import 'foundation-apps/dist/js/foundation-apps-templates';

import './index.scss';

import {EmailService} from './app/services/EmailService';

import {App} from './app/containers/App';
import {Navigation} from './app/components/Navigation';
import {EmailList} from './app/components/EmailList';
import {EmailViewer} from './app/components/EmailViewer';
import routesConfig from './routes';

// import './index.scss';

angular
  .module('app', ['ui.router', 'foundation'])
  .config(routesConfig)
  .service('EmailService', EmailService)
  .component('app', App)
  .component('navigation', Navigation)
  .component('emailList', EmailList)
  .component('emailViewer', EmailViewer)
;
