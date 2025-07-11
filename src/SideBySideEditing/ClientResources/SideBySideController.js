define([
    "dojo/_base/declare",
    "dojo/topic",
    "epi-cms/contentediting/PageDataController"
], function (
    declare,
    topic,
    PageDataController
) {

    return declare([PageDataController], {
        iframeName: "sidebysideedit",

        templateString: `<div style="width: 100%; height: 100%;">
            <div data-dojo-attach-point="mainLayoutContainer"
                 data-dojo-type="epi/shell/layout/PreserveRatioBorderContainer"
                 data-dojo-props="gutters: false, livesplitters: true" style="width: 100%; height: 100%">
                <div data-dojo-attach-point="toolbar" data-dojo-type="epi-cms/contentediting/EditToolbar"
                     data-dojo-props="region:'top'"></div>
                <div data-dojo-attach-point="notificationBar" data-dojo-type="epi-cms/contentediting/NotificationBar"
                     data-dojo-props="region:'top', layoutPriority: 99"></div>
                <div data-dojo-attach-point="editLayoutContainer" data-dojo-type="dijit/layout/ContentPane"
                     data-dojo-props="region: 'left', layoutPriority: 95, splitter: true, minSize: 400"
                     style="width: 50%; min-width: 400px">
                </div>
                <div data-dojo-attach-point="iframeWithOverlay" data-dojo-type="epi/shell/widget/IframeWithOverlay"
                     data-dojo-props="region: 'center', layoutPriority: 100, iframeName:'\${iframeName}'"></div>
            </div>
        </div>`,

        postMixInProperties: function () {
            this.inherited(arguments);

            topic.publish("/epi/shell/context/refreshcurrent");

            topic.subscribe("resize-sidebyside", function () {
                setTimeout(function () {
                    this.resize();
                }.bind(this), 0);
            }.bind(this));
        }
    });
});
