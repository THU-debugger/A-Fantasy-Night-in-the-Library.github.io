var CREATE_EVENT_HANDLER=function(r,e,t,E){var a=new cc.Component.EventHandler;return r instanceof cc.Node?a.target=r:cc.error("GLOBAL_DEF.js: method 'CREATE_EVENT_HANDLER' param 'target' must be a cc.Node!"),"string"==typeof e?a.component=e:cc.error("GLOBAL_DEF.js: method 'CREATE_EVENT_HANDLER' param 'component' must be a string!"),"string"==typeof t?a.handler=t:cc.error("GLOBAL_DEF.js: method 'CREATE_EVENT_HANDLER' param 'handler' must be a string!"),void 0!==E&&(a.customEventData=E),a},dialog_text=new Array("\u6211\u600e\u4e48\u5c31\u7761\u7740\u4e86\u5462\uff0c\u6211\u5f97\u8d76\u7d27\u627e\u5230\u51fa\u53e3","\u8d70\u4e86\u597d\u4e45\u4e86\uff0c\u600e\u4e48\u8fd8\u6ca1\u89c1\u51fa\u53e3\u5462","\u5317\u9986\u6bd4\u6211\u60f3\u8c61\u7684\u8981\u5927\u597d\u591a\u554a\uff0c\u662f\u6211\u89c1\u8bc6\u77ed\u6d45\u4e86\uff0c\u4ee5\u540e\u6709\u7a7a\u5f97\u5e38\u6765\u63a2\u7d22\u63a2\u7d22","\uff08\u627e\u5230\u4e00\u672c\u4e66\uff09\u4e66\u540d\u300a\u6e05\u534e\u7b2c\u4e00\uff0c\u5317\u5927\u7b2c\u4e8c\u300b\uff0c\u8fd9\u672c\u4e66\u597d\u50cf\u6ca1\u8fd8\uff0c\u6211\u5148\u628a\u5b83\u8fd8\u5230\u670d\u52a1\u53f0\u5427","\uff08\u628a\u4e66\u653e\u5230\u4e86\u670d\u52a1\u53f0\u4e0a\uff09\u8bf6\uff0c\u8fd9\u91cc\u6709\u4e00\u628a\u94a5\u5319","\u627e\u5230\u4e86\u4e00\u628a\u94a5\u5319\uff0c\u4e0a\u9762\u5199\u7740\uff1a\u90ba\u67b6\u8f69","\u8fd9\u91cc\u6709\u4e00\u628a\u94f2\u5b50\uff0c\u6216\u8bb8\u5f85\u4f1a\u6709\u7528","\u8fd9\u4e2a\u571f\u5806\u597d\u751f\u8e4a\u8df7\uff0c\u94f2\u5f00\u8bd5\u8bd5\uff0c\u54c8\u54c8\u679c\u771f\u6709\u4e00\u628a\u94a5\u5319\uff083F\uff09","\u5f97\u5230\u4e00\u4e2ablingbling\u7684\u661f\u661f","Card-A,\u53ef\u80fd\u8ddf\u5bc6\u7801\u6709\u5173\uff0c\u6536\u7740\u5427","\u627e\u5230\u4e86\u4e00\u5f20Card-B","\u8fd9\u91cc\u597d\u9ed1\u554a\uff0c\u770b\u6837\u5b50\u53ea\u80fd\u6478\u7740\u5899\u8d70\u4e86","\u547c\uff0c\u603b\u7b97\u8d70\u51fa\u6765\u4e86","\u8fd9\u91cc\u6709\u5f88\u591a\u7bb1\u5b50\uff0c\u83ab\u975e\u662f\uff0c\u63a8\u7bb1\u5b50\uff1f","\u6211\u53ea\u662f\u60f3\u8fd8\u4e2a\u4e66\u800c\u5df2\uff0c\u600e\u4e48\u88ab\u4f20\u9001\u5230\u8fd9\u91cc\u4e86\uff1f","\u554a\uff0c\u56fe\u4e66\u9986\u91cc\u4e3a\u4ec0\u4e48\u4f1a\u6709\u5e7d\u7075\uff0c\u6211\u5f97\u5c0f\u5fc3\u70b9\u8d70\uff0c\u4e0d\u80fd\u88ab\u4ed6\u4eec\u53d1\u73b0","\u8fd9\u91cc\u7684\u5730\u677f\u600e\u4e48\u770b\u8d77\u6765\u8fd9\u4e48\u677e\uff0c\u4e0d\u4f1a\u6389\u4e0b\u53bb\u5427\u2026","\u5267\u60c5\u63d0\u793a\u5185\u5bb9\uff08\u5f85\u7f16\u8f91\uff09","\u5934\u597d\u6655\uff0c\u8fd9\u91cc\u597d\u50cf\u6709\u5947\u602a\u7684\u78c1\u573a","\u8fd9\u4e2a\u623f\u95f4\u633a\u7279\u522b\u7684\u54c8\uff0c\u628a\u4e66\u653e\u5230\u4e2d\u95f4\u7684\u684c\u4e0a\u5e94\u8be5\u5c31\u884c\u4e86\u5427"," ","---F1---","---F2---","---F3---","---F4---","---F5---","---B1---","---B2---","---Magic Room---");