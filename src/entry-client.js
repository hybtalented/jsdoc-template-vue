import $ from './3rd/jquery';
import 'bootstrap/dist/js/bootstrap';

import './assets/prettify-jsdoc.css';
import './assets/prettify-tomorrow.css';
import './assets/tui-doc.less';
import { createApp } from './app';
import { prettyPrint, initializeMermaid } from './mount';
import { getIDByLongname } from './components/util';

const { store } = createApp({}, { env: {} });

initializeMermaid();
prettyPrint();

const doclet = store.state.docs[0];
const id = `${getIDByLongname(doclet.longname)}_nav`;

const selectedApi = document.getElementById(id); // do not use jquery selector
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
