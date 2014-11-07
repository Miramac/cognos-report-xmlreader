/*jshint laxcomma: true, node: true, indent: 4*/

var querystring = require('querystring'),
    edge = require('edge'),
    getXMLReport = edge.func({
        assemblyFile: __dirname + '/../bin/Vocatus.Cognos.Report.Reader.dll'
        , typeName: 'Vocatus.Cognos.Report.XMLReader'
        , methodName: 'GetDataByWebBrowser'
    });

function XMLReader(options) {
    options = options || {};
    var self = this;
    self.xmlReader = {
        server: options.server || 'http://cognos-server'
        , gateway: options.gateway || '/cognos8/cgi-bin/cognos.cgi'
        , cognosViewerOptions: {
            'b_action': 'cognosViewer'
            , 'ui.action': 'run'
            , 'ui.name': 'DC54_01A_02a_ECI_XML'
            , 'run.outputFormat': 'XML'
            , 'run.prompt': false
            , 'm_pg_e': 2
        }
    };

    self.xmlReader.data = function (report, param, cb) {
        var options = (typeof report === 'string') ? {'report': report} : report;
        options.parameter = (typeof param === 'object') ? param : false;
        cb = (typeof param === 'function') ? param : cb;

        var reportUrl = self.xmlReader.gateway;
        //Set required URL params
        var urlParam = self.xmlReader.cognosViewerOptions;
        //add report url
        urlParam['ui.object'] = options.report;
        //add query string tu report url
        reportUrl += '?' + querystring.stringify(urlParam);

        //add report parameter if set
        if (options.parameter) {
            reportUrl += '&' + querystring.stringify(getCognosParam(options.parameter));
        }
        getXMLReport({
            'server': self.xmlReader.server,
            'reportUrl': reportUrl
        }, cb);
    };

    return self.xmlReader;
}


/*
 * Helper function to add a 'p_' on the property name Report_ID gets p_Report_ID. Needed for Cognos URL params format.
 * @param {object} report parameters object
 * @returns {object} modified object
 */
function getCognosParam(reportParam) {
    var paramStr = JSON.stringify(reportParam);
    paramStr = paramStr.replace('{"', '{"p_').replace(',"', ',"p_');
    return JSON.parse(paramStr);
}

module.exports = XMLReader;
/*
b_action=cognosViewer,
ui.action=run,
ui.object=CAMID("AD:u:cc4e4a9faf8d08488b4d9f64f74d8b33")/folder[@name='My Folders']/report[@name='DC54_01A_02a_ECI_XML'],
ui.name=DC54_01A_02a_ECI_XML,
run.outputFormat=XML,
run.prompt=false,
p_Report_ID=1025,
ui.backURL=/cognos8/cgi-bin/cognos.cgi?b_action=xts.run,
m=portal/cc.xts,
m_tab=iC4EF8C05F1C34618A47365DBA189B7C7,
m_pagerto=25,
m_pg_e=1,
m_folder2=p-i3017F5321B444F128401CEFFC4ABE8CB,
m_pagerfrom=1,
m_folder=iC4EF8C05F1C34618A47365DBA189B7C7,
ui.toolbar=false,
ui.header=false,
cv.toolbar=false,
cv.header=false,
toolbar=no 
*/