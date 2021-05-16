import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import graphTheme from '../graphTheme';
import Moment from 'moment';

type Props = {
  reporting: any
}

const HighStock : React.FC<Props>  = ({ reporting } ) => {
    const series = reporting.performance.serie;
    Moment.locale('es');
    var chartSeries = series.map((serie: { dateAsString: Moment.MomentInput; accReturn: any; }) => {
      var date = Moment(serie.dateAsString);
      return [date.valueOf(), serie.accReturn];
    });

    const options = {
      title: {
        text: 'Rentabilidad de tu cartera'
      },
      series: [{
        name: 'Cartera',
        data: chartSeries,
        showInLegend: true,
        tooltip: {
           valueDecimals: 2,
        }
      }],
      chart: {
        type: 'line'
      },
      plotOptions: {
        series: {
          compare: 'percent',
          showInNavigator: true
        }
      },
      rangeSelector: {
        selected: 5,
        buttons: [
          {
            type: 'month',
            count: 1,
            text: '1m'
          }, {
            type: 'month',
            count: 3,
            text: '3m'
          }, {
            type: 'month',
            count: 6,
            text: '6m'
          } ,{
            type: 'year',
            count: 1,
            text: '1y'
          },{
            type: 'ytd',
            text: 'YTD'
          }, {
            type: 'all',
            text: 'All'
          }
        ]
      },
      credits:{
        enabled: false,
      },
      yAxis: {
        labels: {
          formatter: function (value: number) {
            return (value > 0 ? ' + ' : '') + value + '%';
          }
        },
        title: {
          text: ''
        }
      },
      tooltip: {
        pointFormat: 'Cartera: rentabilidad periodo {point.y}%',
        valueDecimals: 4,
        valueSuffix: '',
        split: true
      },
    };

    return (
    <div>
      <HighchartsReact
       highcharts={Highcharts}
       constructorType={'stockChart'}
       options={{...graphTheme, ...options}} />
    </div>
  );
}

export default HighStock;
