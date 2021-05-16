const graphTheme = {
  lang: {
    loading: 'Cargando...',
    rangeSelectorFrom: "Desde",
    rangeSelectorTo: "Hasta",
    rangeSelectorZoom: "Periodo",
    resetZoom: 'Reiniciar zoom',
    resetZoomTitle: 'Reiniciar zoom',
    thousandsSep: ".",
    decimalPoint: ',',
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  },
  colors: [
    '#1BB2AD',
    '#F5A623',
    '#2DC45D',
    '#3e7aff',
    '#035A6D',
    '#0083A2',
    '#1B73A6',
    '#5FACF5',
    '#A7CBF0',
    '#6DBB3E',
    '#097143',
    '#2E5B47',
    '#3E8F6B',
    '#B36F00',
    '#996D19'
  ],  
  chart: {
    backgroundColor: 'transparent',
    plotBackgroundColor: 'transparent'
  },
  title: {
    style: {
      color: '#C0C0C0',
      font: 'bold 16px Barlow, sans-serif'
    },
  },
  subtitle: {
    style: {
      font: 'bold 12px Barlow, sans-serif'
    }
  },
  xAxis: {
    gridLineColor: '#333333',
    gridLineWidth: 0,
    labels: {
      style: {
        color: '#A0A0A0',
        font: '400 11px Barlow'
      }
    },
    lineColor: '#A0A0A0',
    tickColor: '#A0A0A0',
    title: {
      style: {
        color: '#CCC',
        fontWeight: 'bold',
        fontSize: '12px',
        fontFamily: 'Barlow'
      }
    }
  },
  yAxis: {
    gridLineColor: '#DFE3E3',
    labels: {
      style: {
        color: '#A0A0A0',
        font: '400 11px Barlow'
      }
    },
    lineColor: '#A0A0A0',
    minorTickInterval: null,
    tickColor: '#A0A0A0',
    tickWidth: 1,
    title: {
      style: {
        color: '#CCC',
        fontWeight: 'bold',
        fontSize: '12px',
        fontFamily: 'Barlow'
      }
    }
  },
  tooltip: {
    backgroundColor: '#656d78',
    // FIXME: activar cuando lleguen los datos reales
    //split: true,
    style: {
      color: '#F0F0F0'
    },
    xDateFormat: '%A %d %b',
    dateTimeLabelFormats: {
      day: "%A, %e %b, %Y",
      hour: "%A, %e %b, %H:%M",
      millisecond: "%A, %e %b, %H:%M:%S.%L",
      minute: "%A, %e %b, %H:%M",
      month: "%B %Y",
      second: "%A, %e %b, %H:%M:%S",
      week: "Semana desde %A, %e %b, %Y",
      year: "%Y"
    }
  },
  toolbar: {
    itemStyle: {
      color: 'silver'
    }
  },
  plotOptions: {
    line: {
      dataLabels: {
        color: '#CCC'
      },
      marker: {
        lineColor: '#333'
      }
    },
    spline: {
      marker: {
        lineColor: '#333'
      }
    },
    scatter: {
      marker: {
        lineColor: '#333',
      }
    },
    candlestick: {
      lineColor: 'white',
    },
    pie: {
      tooltip: {
        split: false
      },
      dataLabels: {
        enabled: true,
        color: '#FFF'
      }
    }
  },
  legend: {
    enabled: true,
    itemStyle: {
      font: '18px Barlow, sans-serif',
      color: '#2A4143'
    },
    itemHoverStyle: {
      color: '#A0A0A0'
    },
    itemHiddenStyle: {
      color: '#444'
    },
  },
  credits: {
    style: {
      fontFamily: 'Barlow',
      color: '#666'
    }
  },
  labels: {
    style: {
      font: '18px Barlow, sans-serif',
      color: '#2A4143'
    }
  },
  navigation: {
    buttonOptions: {
      symbolStroke: '#DDDDDD',
      hoverSymbolStroke: '#FFFFFF',
      theme: {
        fill: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [
              0.4,
              '#606060'
            ],
            [
              0.6,
              '#333333'
            ]
          ]
        },
        stroke: '#000000'
      }
    }
  },
  rangeSelector: {
    buttonTheme: {
      r: '2',
      fill: "#F3F7F9",
      stroke: 'transparent',
      style: {
        color: '#556769',
        fontWeight: '400'
      },
      states: {
        hover: {
          fill: '#BBBB',
          stroke: '#000000',
          style: {
            color: 'white'
          }
        },
        select: {
          r: '2',
          fill: '#CC214F',
          stroke: '#DFE3E3',
          color: '#556769'
        }
      }
    },
    inputStyle: {
      backgroundColor: '#F3F7F9',
      color: '#758789',
      font: '400 12px Barlow',
      r: '23'
    },
    labelStyle: {
      color: '#556769',
      fill: '#F3F7F9'
    },
    inputBoxBorderColor: '#DFE3E3',
    inputBoxWidth: 100
  },
  navigator: {
    handles: {
      backgroundColor: '#CC214F',
      borderColor: '#FFF',
      width: 12,
      height: 15,
      r: 2
    },
    outlineColor: '#F3F7F9',
    maskFill: 'rgba(66,132,230,0.18)',
    series: {
      color: '#7798BF',
      lineColor: '#1BB3AD'
    },
    xAxis: {
      labels: {
        style: {
          font: '600 12px Barlow'
        }
      }
    }
  },
  scrollbar: {
    barBackgroundColor: '#CC214F',
    barBorderColor: '#FFF',
    buttonArrowColor: '#FFF',
    buttonBackgroundColor: '#CC214F',
    buttonBorderColor: '#FFF',
    rifleColor: '#FFF',
    trackBackgroundColor: '#F3F7F9',
    trackBorderColor: '#F3F7F9',
    height: 30
  },
  legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  background2: 'rgb(35, 35, 70)',
  dataLabelsColor: '#444',
  textColor: '#C0C0C0',
  maskColor: 'rgba(255,255,255,0.3)'
};

export default graphTheme;
