var mwcCore = require('mwc_core');
//setting up the config
var MWC = new mwcCore(require('./config.json').development);

MWC.usePlugin('mwc_plugin_example');
MWC.usePlugin('mwc_plugin_spine');

MWC.listen(process.env.PORT || 3000);
//listening of MWC events. 'Coocoo!' is emmited by mwc_plugin_example every 5 seconds
MWC.on('Coocoo!',function(message){
    console.log('Coocoo! Coocoo! '+message);
});

MWC.on('honeypot accessed',function(message){
    console.log('Attention! Somebody tries to hack us! '+message);
});

