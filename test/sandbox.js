/*jshint curly: false, laxcomma: true, node: true, indent: 4*/
var xmlReader = new require('../lib/xmlreader')({server: 'http://report1-muc.int.vocatus-ag.de', gateway: '/cognos8/cgi-bin/cognos.cgi'});

xmlReader.data('CAMID("AD:u:cc4e4a9faf8d08488b4d9f64f74d8b33")/folder[@name="My Folders"]/report[@name="DC54_01A_02a_ECI_XML"]', {Report_ID:1026 ,Report_Language:'en'}, function(err, data) {
    if(err) throw err;
    console.log(data);
});
