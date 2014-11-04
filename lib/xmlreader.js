var edge = require('edge')
, xmlReader = edge.func({
    assemblyFile: './bin/Vocatus.Cognos.Report.Reader.dll',
    typeName: 'Vocatus.Cognos.Report.XMLReader',
    methodName: 'GetData'
});




options = {
    server: 'http://cognos-server',
    gateway: '/cognos8/cgi-bin/cognos.cgi',
    report: 'CAMID(%22AD%3au%3acc4e4a9faf8d08488b4d9f64f74d8b33%22)%2ffolder%5b%40name%3d%27My%20Folders%27%5d%2freport%5b%40name%3d%27DC54_01A_02a_ECI_XML%27%5d',
   //report: "/cognos8/cgi-bin/cognos.cgi?b_action=cognosViewer&ui.action=run&ui.object=CAMID(%22AD%3au%3acc4e4a9faf8d08488b4d9f64f74d8b33%22)%2ffolder%5b%40name%3d%27My%20Folders%27%5d%2freport%5b%40name%3d%27DC54_01A_02a_ECI_XML%27%5d&ui.name=DC54_01A_02a_ECI_XML&run.outputFormat=XML&run.prompt=false&p_Report_ID=1025&ui.backURL=%2fcognos8%2fcgi-bin%2fcognos.cgi%3fb_action%3dxts.run%26m%3dportal%2fcc.xts%26m_tab%3diC4EF8C05F1C34618A47365DBA189B7C7%26m_pagerto%3d25%26m_pg_e%3d1%26m_folder2%3dp-i3017F5321B444F128401CEFFC4ABE8CB%26m_pagerfrom%3d1%26m_folder%3diC4EF8C05F1C34618A47365DBA189B7C7&ui.toolbar=false&ui.header=false&cv.toolbar=false&cv.header=false&toolbar=no",
    parameters: {
        Report_ID:'1026',
        Report_Language: 'en'
    }
}


xmlReader(options, function(err, data) {
    if (err) throw err;
    console.log(data);
})
