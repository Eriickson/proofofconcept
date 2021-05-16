import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import graphTheme from '../graphTheme';

const PieHighStock = (props) => {
    const series = props.reporting.positions.positionsTo.aggregation;

    var chartSerie = {};
    series.forEach(serie => {
      chartSerie[serie.name] = {
        value: isNaN(serie.total.weight) ? 0 : parseFloat(serie.total.weight.toFixed(2)),
        level2: []
      };
      serie.level2.forEach(level => {
        var value = isNaN(level.total.weight) ? 0 : parseFloat(level.total.weight.toFixed(2));
        chartSerie[serie.name]['level2'][level.name] = {
          value: value
        };
      });
    });

    var colors = graphTheme.colors;
    var i;
    var j;
    var drillDataLen;
    var brightness;
    var browserData = [];
    var versionsData = [];
    var categories = [];
    var data = [];
    var count = 0;

    for (const i in chartSerie) {
      var entry = {
        color: colors[count],
        y: chartSerie[i]['value'],
        drilldown: {
          name: i + " " + chartSerie[i]['value'] + "%",
          categories: [],
          data: []
        }
      }
      categories.push(i + " " + chartSerie[i]['value'] + "%");
      for (const k in chartSerie[i]['level2'])
      {
        entry.drilldown.categories.push(k + " " + chartSerie[i]['level2'][k]['value'] + "%");
        entry.drilldown.data.push(chartSerie[i]['level2'][k]['value']);
      }
      data.push(entry);
      count = count + 1;
    }
    var dataLen = data.length;

    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

      // add browser data
      browserData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color
      });

      // add version data
      drillDataLen = data[i].drilldown.data.length;
      for (j = 0; j < drillDataLen; j += 1) {
        brightness = 0.2 - (j / drillDataLen) / 5;
        versionsData.push({
          name: data[i].drilldown.categories[j],
          y: data[i].drilldown.data[j],
          color: Highcharts.color(data[i].color).brighten(brightness).get()
        });
      }
    }

    const options = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Tipología de inversiones'
      },
      plotOptions: {
        pie: {
          size:'70%',
          dataLabels: {
            enabled: true,
            style: {
              textOverflow: 'clip'
            }
          }
        }
      },
      credits:{
        enabled: false,
      },
      tooltip: {
        valueSuffix: '%',
        enabled: false,
        followPointer: true,
        positioner: function () {
          return { x: 80, y: 50 };
        },
      },
      series: [{
        name: 'Categoría',
        data: browserData,
        showInLegend: true,
        dataLabels: {
          crop: false,
          distance: -30
        }
      }, {
        name: 'Subcategorías',
        data: versionsData,
        innerSize: '60%',
        dataLabels: {
          crop: true,
          overflow: "allow",
          padding: 3,
          startAngle: 10,
          distance: 5,
          style: {
            textOverflow: 'clip'
          }
        },
        id: 'versions'
      }]
    };

    return (
    <div>
      <HighchartsReact
       highcharts={Highcharts}
       options={{...graphTheme, ...options}} />
    </div>
  );
}

export default PieHighStock;
