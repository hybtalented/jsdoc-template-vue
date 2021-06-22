import $ from './3rd/jquery';
import 'bootstrap/dist/js/bootstrap';

import './assets/prettify-jsdoc.css';
import './assets/prettify-tomorrow.css';
import './assets/tui-doc.less';
import { createApp } from './app';
import { prettyPrint } from './mount';

const { store } = createApp({}, { env: {} });

prettyPrint();

const id = `${store.state.docs[0].longname}_sub`.replace(/"/g, '_').replace(/[\\/]/g, '-');
var selectedApi = document.getElementById(id); // do not use jquery selector
if (selectedApi) {
  var $selectedApi = $(selectedApi);
  var $selectTab = $(`#${$selectedApi.parents('.lnb-api').data('member-tab')}`);
  $selectedApi.parents('.collapse').collapse('show');
  $selectedApi.collapse('show');
  $selectTab.tab('show');
} else {
  $('.lnb-tab')
    .find('[data-toggle="tab"]')
    .first()
    .tab('show');
}
