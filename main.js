import React from 'react';
import ReactDOM from 'react-dom';
import GoldenLayout from 'golden-layout';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';
import BarChart from './BarChart.jsx';
import PieChart from './PieChart.jsx';
import Publisher from './Publisher.jsx';
import Subscriber from './Subscriber.jsx';
import $ from 'jquery';
import './dashboard.css';

var uuid;

var config = {
    settings: {
        hasHeaders: true,
        constrainDragToContainer: true,
        reorderEnabled: true,
        selectionEnabled: false,
        popoutWholeStack: false,
        blockedPopoutsThrowError: true,
        closePopoutsOnUnload: true,
        showPopoutIcon: true,
        showMaximiseIcon: true,
        responsive: true,
        responsiveMode : 'always',
        showCloseIcon: true
    },
    dimensions: {
        minItemWidth: 400
    },
    content: [{
        type: 'row',
        content: [
            {
                title: 'Bar Chart',
                type: 'react-component',
                component: 'barChart',
                props: {id:uuid + 'barChart'}
            },
            {
                title: 'Pie Chart',
                type: 'react-component',
                component: 'pieChart',
                props: {id:uuid + 'pieChart'}
            },
            {
                title: 'Publisher',
                type: 'react-component',
                component: 'publisher'
            },
            {
                title: 'Subscriber',
                type: 'react-component',
                component: 'subscriber'
            }]
    }]
};


var widgetsList = [
    {
        title: "Bar - Chart",
        component: 'barChart'
    },
    {
        title: "Pie - Chart",
        component: 'pieChart'
    },
    {
        title: "Publisher",
        component: 'publisher'
    },
    {
        title: "Subscriber",
        component: 'subscriber'
    }
];

var myLayout = new GoldenLayout(config,$("#view"));
function initializeWidgetList() {
    for (let widget in widgetsList) {
        addWidget(widgetsList[widget])
    }
}
initializeWidgetList();
myLayout.registerComponent('barChart', BarChart);
myLayout.registerComponent('pieChart', PieChart);
myLayout.registerComponent('publisher', Publisher);
myLayout.registerComponent('subscriber', Subscriber);

function addWidget(widget) {
    var element = $('<li>' + widget.title + '</li>');
    $('#menuContainer').append(element);
    var id = getGadgetUUID(widget.component);
    var newItemConfig = {
        title: widget.title,
        type: 'react-component',
        component: widget.component,
        props: {id: id},
        header: {
            show: true
        }

    };
    myLayout.createDragSource(element, newItemConfig);
}

function getGadgetUUID(widgetName) {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return widgetName + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}

myLayout.init();
window.ReactDOM = ReactDOM;
window.React = React;

myLayout.on('stateChanged', function () {
    $('#menuContainer').empty();
    initializeWidgetList();
});

$(window).resize(function () {
    myLayout.updateSize();
});

