import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import './assets/prettify-jsdoc.css';
import './assets/prettify-tomorrow.css';
import './assets/tui-doc.less';
import { createApp } from './app';
import { showLnbApi, showLnbExamples, prettyPrint } from './mount';

const { store } = createApp({}, {});

prettyPrint();
if (!store.state.isTutorial) {
  const id = `${store.state.docs[0].longname}_sub`.replace(/"/g, '_');
  var selectedApi = document.getElementById(id); // do not use jquery selector
  var $selectedApi = $(selectedApi);

  $selectedApi.removeClass('hidden');
  $selectedApi
    .parent()
    .find('.glyphicon')
    .removeClass('glyphicon-plus')
    .addClass('glyphicon-minus');
  showLnbApi();
} else {
  showLnbExamples();
}
