import
{
  Fragment,
  useState,
  useEffect,
} from 'react';
import moment from 'moment';
import {
  clone,
  isEmpty,
  map,
  maxBy,
  minBy,
  isNull,
  filter, isEqual,
} from 'lodash';
import queryString from 'query-string';
import { Chart } from 'react-google-charts';
import { useTranslations } from 'next-intl';
import BounceLoader from '@/components/ui/BounceLoader';

interface IDateSchedule {
  price: number,
  date: string,
  isLowestPrice: boolean,
  isFlightAvailable: boolean,
  curreny: string,
}

function ChartView(props: any) {
  const {
    data,
    pax,
    setShowInvalidSelection,
  } = props;
const beginDate = {
    "value": "2026-03-01",
    "label": "March, 2026"
}
const endDate = {
    "value": "2026-04-01",
    "label": "April, 2026"
}
  const t = useTranslations();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoadable, setLoadable] = useState(false);
  const [flightOutDate, setFlightOutDate] = useState('');
  const [flightBackDate, setFlightBackDate] = useState('');
  const [outBoundData, setOutBoundData] = useState(Array<any>());
  const [inBoundData, setInBoundData] = useState(Array<any>());
  const params = queryString.parse(window.location.search);
  
  let momLocale = 'en';
  if(momLocale == 'am') {
    momLocale = 'hy-am';
  } else if(momLocale == 'uz') {
    momLocale = 'uz-latn';
  }
  
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  });

  function correctMonthObject(YYYYMMDD: string) {
    return {
      value: YYYYMMDD,
      lable: moment(YYYYMMDD, 'YYYY-MM-DD').format('MMMM, YYYY'),
    };
  }

  const submitMonthChange = (fetchScheduleProps: any) => {
    const { end, start } = fetchScheduleProps;
    const requestParams = clone(params);
    const request = {
      depCity: requestParams.depCity,
      arrCity: requestParams.arrCity,
      depCityName: requestParams.depCityName || '',
      arrCityName: requestParams.arrCityName || '',
      startDate: start,
      endDate: end,
      adult: requestParams.adult,
      child: requestParams.child,
      infant: requestParams.infant,
    };
    setLoadable(false);
  };
  
  useEffect(() => {
    if (isLoadable) {
      submitMonthChange({
        start: beginDate.value,
        end: !isEmpty(endDate) ? endDate.value : '',
      });
    }
    setOutBoundData(data[0]);
    setInBoundData(data[1]);
  }, [beginDate, endDate, data]);
  
  const gotoFlightResult = () => {
    if (
      (flightBackDate && flightBackDate.length === 0 && flightOutDate && flightOutDate.length === 0)
      || moment(flightBackDate, 'YYYY-MM-DD').isBefore(moment(flightOutDate, 'YYYY-MM-DD'))
    ) {
      setShowInvalidSelection(true);
    } else {
      const { adult, child, infant } = pax;
      const endDateParam = flightBackDate.length === 0 ? '' : `&endDate=${moment(flightBackDate, 'YYYY-MM-DD').format('DD-MMM-YYYY')}`;
      const url = `/FlightResult?depCity=${params.depCity
      }&arrCity=${params.arrCity
      }&startDate=${moment(flightOutDate, 'YYYY-MM-DD').format('DD-MMM-YYYY')
      }${endDateParam}&adult=${adult || 1}&child=${child || 0}&infant=${infant || 0}`;
      document.location.href = url;
    }
  };
  
  const renderMonthSelector = (date: string, isArrival: boolean) => {
    const monthSelector = [];
    for (let index = -3; index < 4; index += 1) {
      const monthDate = moment(date, 'YYYY-MM-DD').add(index, 'M').format('YYYY-MM-DD');
      const newMonthDate = moment(monthDate, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD');
      const isCurrentMonth = moment(newMonthDate, 'YYYY-MM-DD').isSame(new Date(), 'month');
      const month = {
        value: isCurrentMonth && isArrival ? moment().format('YYYY-MM-DD') : newMonthDate,
        label: moment(date, 'YYYY-MM-DD').add(index, 'M').format('MMMM, YYYY'),
      };
      monthSelector.push(month);
    }
    return monthSelector;
  };

  const handleMonthBoxClick = (month: any, isEndDate: boolean) => {
    if (isEndDate) {
      const currDateObj = {
        label: moment().format('MMMM, YYYY'),
        value: moment().format('YYYY-MM-DD'),
      };
      if (isEqual(moment().format('YYYY-MM'), moment(month, 'YYYY-MM-DD').format('YYYY-MM'))) {
      } else {
      }
      if (
        beginDate && beginDate.value
        && moment(month, 'YYYY-MM-DD').isBefore(moment(beginDate.value, 'YYYY-MM-DD'))
      ) {
      } else {
        // Keep existing logic
      }
    } else {
      if (
        endDate && endDate.value
        && moment(month, 'YYYY-MM-DD').isAfter(moment(endDate.value, 'YYYY-MM-DD'))
      ) {
      } else {
        // Keep existing logic
      }
    }
    setLoadable(true);
  };

  const MonthBox = (monthProps: any) => {
    const { month, isArrival } = monthProps;
    const currYear = moment(new Date()).format('YYYY');
    const currMonth = moment(new Date()).format('M');
    const isBeforeCurrentMonth = moment(month.value, 'YYYY-MM-DD').isBefore(moment());
    const monthYear = moment(month.value, 'YYYY-MM-DD').format('YYYY');
    const dateMonth = moment(month.value, 'YYYY-MM-DD').format('M');
    const isCurrentMonth = currYear === monthYear && currMonth === dateMonth;
    
    let hightLight = false;
    if (isArrival) {
      hightLight = !isCurrentMonth ? moment(endDate.value, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD') === month.value : endDate.value === month.value;
    } else {
      hightLight = (moment(beginDate.value, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD') === month.value);
    }

    const isOneYearLater = moment().add(1, 'year').isBefore(moment(month.value, 'YYYY-MM-DD'));
    const inActive = (isBeforeCurrentMonth && !isCurrentMonth) || isOneYearLater;

    return (
      <li className="flex-1 px-1">
        <button
          className={`w-full flex flex-col items-center justify-center border border-gray-300 rounded-lg px-2 py-2 min-h-[55px] transition duration-200 ${
            hightLight 
              ? 'bg-blue-900 text-white border-blue-900' 
              : 'bg-white text-gray-900 hover:bg-gray-50'
          } ${inActive ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
          onClick={() => {
            if (!inActive) {
              handleMonthBoxClick(month.value, isArrival);
            }
          }}
          data-value={month.value}
          disabled={inActive}
        >
          <span className="year text-xs">
            {month && month.value ? moment(month.value, 'YYYY-MM-DD').year() : ''}
          </span>
          <span className="month text-sm font-medium">
            {month && month.value ? moment(month.value, 'YYYY-MM-DD').format('MMMM') : ''}
          </span>
        </button>
      </li>
    );
  };

  const MonthChart = (calendarProps: any) => {
    const { monthSchedule, flightDate, isArrival } = calendarProps;
    const excludeZeroPrice = filter(monthSchedule, (schedule: any) => schedule.price !== 0);
    const min = minBy(excludeZeroPrice, 'price');
    const max = maxBy(monthSchedule as IDateSchedule[], 'price');
    const maxPrice = max ? max.price : 0;
    const minPrice = min ? min.price : 0;
    const monthChartData = [] as any[];
    const monthSelector = renderMonthSelector(flightDate, isArrival);
    const chartText = {
      minText: t('NetWorkMap.lblMin'),
      maxText: t('NetWorkMap.lblMax'),
      priceText: t('NetWorkMap.lblPrice'),
    };
    
    monthChartData.push(['Date', chartText.minText, chartText.maxText, chartText.priceText, { role: 'style' }]);
    const selectedDate = isArrival ? flightBackDate : flightOutDate;
    let monthText = '';
    
    if (!isEmpty(monthSchedule)) {
      const [firstDate] = monthSchedule;
      monthText = moment(firstDate.date, 'YYYY-MM-DD').format('MMMM YYYY');
      monthSchedule.forEach((daySchedule: IDateSchedule) => {
        monthChartData.push([
          moment(daySchedule.date, 'YYYY-MM-DD').format('DD'),
          minPrice,
          maxPrice,
          daySchedule.price,
          selectedDate === daySchedule.date ? '#21409a' : '#d7daeb',
        ]);
      });
    }

    const isCurrentMonth = isEqual(moment(flightDate, 'YYYY-MM-DD').format('YYYY-MM'), moment().format('YYYY-MM'));
    const isLastMonthInRange = isEqual(moment().add(12, 'month').format('YYYY-MM'), moment(flightDate, 'YYYY-MM-DD').format('YYYY-MM'));

    const handlePrevMonthClick = () => {
      const prevDate = moment(flightDate, 'YYYY-MM-DD').add(-1, 'M');
      const currDate = moment(new Date());
      if (prevDate.format('M') === currDate.format('M')
        && prevDate.format('D') !== currDate.format('D')) {
        handleMonthBoxClick(currDate.format('YYYY-MM-DD'), isArrival);
      } else {
        handleMonthBoxClick(prevDate.format('YYYY-MM-DD'), isArrival);
      }
    };
    
    const currentLanguage = 'nl-NL';

    return (
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden mb-8">
        <div className="border-b border-gray-300 bg-blue-50">
          <ul className="flex p-3 justify-between items-center">
            <li className="w-12">
              <button
                onClick={() => handlePrevMonthClick()}
                disabled={isCurrentMonth}
                className={`w-12 h-12 flex items-center justify-center rounded-lg text-blue-600 text-xl ${
                  isCurrentMonth ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-100'
                }`}
              >
                <i className="fo-icon icon-back" />
              </button>
            </li>
            {
              monthSelector && monthSelector.length
                ? map(monthSelector, m => (
                  <MonthBox key={`mb_${m.value}`} month={m} isArrival={isArrival} />
                ))
                : ''
            }
            <li className="w-12">
              <button
                onClick={() => {
                  handleMonthBoxClick(moment(flightDate, 'YYYY-MM-DD').add(1, 'M').format('YYYY-MM-DD'), isArrival);
                }}
                disabled={isLastMonthInRange}
                className={`w-12 h-12 flex items-center justify-center rounded-lg text-blue-600 text-xl ${
                  isLastMonthInRange ? 'opacity-30 cursor-not-allowed' : 'hover:bg-blue-100'
                }`}
              >
                <i className="fo-icon icon-next" />
              </button>
            </li>
          </ul>
        </div>
        
        {
          !isEmpty(monthSchedule) ? (
            <div className="p-4">
              <Chart
                width="100%"
                height="300px"
                chartType="ComboChart"
                loader={
                  <div className="flex justify-center items-center h-64">
                    <BounceLoader />
                    
                  </div>
                }
                data={monthChartData}
                chartLanguage={currentLanguage}
                options={{
                  focusTarget: 'category',
                  legend: windowWidth < 580 ? 'none' : 'right',
                  vAxis: {
                    title: chartText.priceText,
                    format: '€',
                  },
                  hAxis: {
                    title: monthText,
                    textStyle: {
                      fontSize: 11,
                      color: '#053061',
                      bold: true,
                      italic: false,
                    },
                  },
                  seriesType: 'bars',
                  series: {
                    0: {
                      type: 'line',
                    },
                    1: {
                      type: 'line',
                    },
                  },
                  colors: ['#21409a', '#0094da', '#d7daeb', '#21409a'],
                }}
                chartEvents={[
                  {
                    eventName: 'select',
                    callback: ({ chartWrapper }: any) => {
                      const svg = document.querySelector('svg');
                      const chartStyles = 'text[text-anchor="middle"] { cursor: pointer; }';
                      const css = document.createElement('style');
                      if (css.style) {
                        css.style.cssText = chartStyles;
                      } else {
                        css.appendChild(document.createTextNode(chartStyles));
                      }
                      if (svg) {
                        svg.appendChild(css);
                      }
                      
                      const sel = chartWrapper.getChart().getSelection();
                      if (!isEmpty(sel)) {
                        const [sele] = sel;
                        const { row } = sele;
                        if (!isNull(row)) {
                          const index = row;
                          if (typeof index !== 'undefined' && isArrival) {
                            if (!moment(
                              monthSchedule[index].date, 'YYYY-MM-DD',
                            ).isBefore(
                              moment(flightOutDate, 'YYYY-MM-DD'),
                            )) {
                              setFlightBackDate(monthSchedule[index].date);
                            }
                          }
                          if (typeof index !== 'undefined' && !isArrival) {
                            if (!moment(
                              monthSchedule[index].date, 'YYYY-MM-DD',
                            ).isAfter(
                              moment(flightBackDate, 'YYYY-MM-DD'),
                            )) {
                              setFlightOutDate(monthSchedule[index].date);
                            }
                          }
                        }
                      }
                    },
                  },
                ]}
                rootProps={{ 'data-testid': '1' }}
              />
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              {t('NetWorkMap.lblNoSchedule')}
            </div>
          )
        }
      </div>
    );
  };
  
  return (
    <Fragment>
      {
        data && data.length
          ? (
            <div className="w-full">
              <div className="mb-8">
                <div className="mb-4">
                  {
                    params
                      ? (
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-bold text-blue-900 flex items-center">
                            <i className="fo-icon icon-fo-flight2-right mr-3 text-2xl" />
                            {`${params.depCityName} (${params.depCity})`}
                            <i className="fo-icon icon-fo-arrow-right-long3 mx-4" />
                            {`${params.arrCityName} (${params.arrCity})`}
                          </h4>
                        </div>
                      )
                      : ''
                  }
                </div>
                {
                  !isEmpty(outBoundData)
                    ? (
                      <MonthChart
                        monthSchedule={outBoundData}
                        isArrival={false}
                        flightDate={beginDate?.value}
                      />
                    )
                    : (
                      <div className="flex justify-center items-center h-64">
                        <BounceLoader />
                      </div>
                    )
                }
              </div>
              
              {
                !isEmpty(inBoundData)
                  ? (
                    <Fragment>
                      <div className="mb-8">
                        <div className="mb-4">
                          {
                            params
                              ? (
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="text-xl font-bold text-blue-900 flex items-center">
                                    <i className="fo-icon icon-fo-flight2-left mr-3 text-2xl" />
                                    {`${params.arrCityName} (${params.arrCity})`}
                                    <i className="fo-icon icon-fo-arrow-right-long3 mx-4" />
                                    {`${params.depCityName} (${params.depCity})`}
                                  </h4>
                                </div>
                              )
                              : ''
                          }
                        </div>
                        {
                          !isEmpty(inBoundData)
                            ? (
                              <MonthChart
                                monthSchedule={inBoundData}
                                isArrival
                                flightDate={endDate.value}
                              />
                            )
                            : (
                              <div className="flex justify-center items-center h-64">
                                <BounceLoader/>
                              </div>
                            )
                        }
                      </div>
                      
                      <div className="flex justify-end mt-10">
                        <button
                          disabled={
                            (flightOutDate.length === 0 && flightBackDate.length !== 0) ||
                            (flightBackDate.length === 0 && flightOutDate.length === 0)
                          }
                          onClick={() => {
                            gotoFlightResult();
                          }}
                          className={`px-8 py-3 rounded-lg font-bold text-lg ${
                            (flightOutDate.length === 0 && flightBackDate.length !== 0) ||
                            (flightBackDate.length === 0 && flightOutDate.length === 0)
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition duration-200'
                          }`}
                        >
                          {
                            (
                              (flightOutDate.length !== 0 && flightBackDate.length === 0) ||
                              (flightBackDate.length !== 0 && flightOutDate.length !== 0)
                            ) ? t('NetWorkMap.lblContinueToBooking') : t('FlightResult.lblContinue')
                          }
                        </button>
                      </div>
                    </Fragment>
                  )
                  : <Fragment />
              }
            </div>
          )
          : (
            <div className="flex justify-center items-center h-64">
              <BounceLoader />
              <span className="ml-4 text-gray-600">Loading fare data...</span>
            </div>
          )
      }
    </Fragment>
  );
}


export default ChartView;