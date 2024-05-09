import * as echarts from 'echarts';
import React,{useEffect, useRef} from 'react';
import HttpRequire from "@/http/require"
const SmoothedLine = () => {
    const ref = useRef()
    // var ROOT_PATH = 'https://echarts.apache.org/examples';
    var myChart
    useEffect(()=>{
        var chartDom = document.getElementById('smoothedLine');
        myChart = echarts.init(chartDom);
        run() 
        return ()=>{
            myChart.dispose()
        }
    },[])
    async function run() {
        const require = new HttpRequire();
        try {
          let _rawData = await require.get('http://localhost:3000/api/echarts');
          const options = {
            dataset: [
              {
                id: 'dataset_raw',
                source: _rawData
              },
              {
                id: 'dataset_since_1950_of_germany',
                fromDatasetId: 'dataset_raw',
                transform: {
                  type: 'filter',
                  config: {
                    and: [
                      { dimension: 'Year', gte: 1950 },
                      { dimension: 'Country', '=': 'Germany' }
                    ]
                  }
                }
              },
              {
                id: 'dataset_since_1950_of_france',
                fromDatasetId: 'dataset_raw',
                transform: {
                  type: 'filter',
                  config: {
                    and: [
                      { dimension: 'Year', gte: 1950 },
                      { dimension: 'Country', '=': 'France' }
                    ]
                  }
                }
              }
            ],
            // title: {
            //   text: 'Income of Germany and France since 1950'
            // },
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              type: 'category',
              nameLocation: 'middle'
            },
            yAxis: {
              name: 'Income'
            },
            series: [
              {
                type: 'line',
                datasetId: 'dataset_since_1950_of_germany',
                showSymbol: false,
                encode: {
                  x: 'Year',
                  y: 'Income',
                  itemName: 'Year',
                  tooltip: ['Income']
                }
              },
              {
                type: 'line',
                datasetId: 'dataset_since_1950_of_france',
                showSymbol: false,
                encode: {
                  x: 'Year',
                  y: 'Income',
                  itemName: 'Year',
                  tooltip: ['Income']
                }
              }
            ]
          };
        myChart.setOption(options);
        } catch (error) {
          // console.log('echarts error:',error)
        }
        
      }
    return (<div ref={ref} id="smoothedLine"  style={{ width: '100%', height: '100%' }}></div>)
}

function areEqual(prevProps, nextProps) {
  // console.log('echarts update:',prevProps)
  return false;
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(SmoothedLine, areEqual);
