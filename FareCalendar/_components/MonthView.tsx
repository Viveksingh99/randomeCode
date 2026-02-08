import { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import {
  ceil,
  clone,
  map,
  isEmpty,
  isEqual,
} from 'lodash';

import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/lib/addonUtils';

interface IDateSchedule {
  price: string,
  date: string,
  isLowestPrice: boolean,
  isFlightAvailable: boolean,
  curreny: string,
}

function MonthView(props: any) {
  const {
   exchangeRate, selectedCurrencyCode,
    styles,
    setShowInvalidSelection,
    dispatch,
  } = props;

  const data = [
    [
        {
            "price": 77,
            "date": "2026-03-01",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-02",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-03",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-04",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-05",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-06",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-07",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-08",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-09",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-10",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-11",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-12",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-13",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-14",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-15",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-16",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-17",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-18",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-19",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-20",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-21",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-22",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-23",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-24",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-25",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-26",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-27",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 77,
            "date": "2026-03-28",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-03-29",
            "isLowestPrice": false,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-03-30",
            "isLowestPrice": false,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-03-31",
            "isLowestPrice": false,
            "isFlightAvailable": true,
            "curreny": "EUR"
        }
    ],
    [
        {
            "price": 87,
            "date": "2026-04-01",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-02",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-03",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-04",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-05",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-06",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-07",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-08",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-09",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-10",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-11",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-12",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-13",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-14",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-15",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-16",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-17",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-18",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-19",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-20",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-21",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-22",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-23",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-24",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-25",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-26",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-27",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-28",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-29",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        },
        {
            "price": 87,
            "date": "2026-04-30",
            "isLowestPrice": true,
            "isFlightAvailable": true,
            "curreny": "EUR"
        }
    ]
]
const beginDate = {
    "value": "2026-03-01",
    "label": "March, 2026"
}
const endDate = {
    "value": "2026-04-01",
    "label": "April, 2026"
}
const pax = {
    "adult": 1,
    "child": 0,
    "infant": 0
}
  const t = useTranslations();
  const [flightOutDate, setFlightOutDate] = useState('');
  const [flightBackDate, setFlightBackDate] = useState('');
  const [isLoadable, setLoadable] = useState(false);

  function correctMonthObject(YYYYMMDD: string) {
    return {
      value: YYYYMMDD,
      lable: moment(YYYYMMDD, 'YYYY-MM-DD').format('MMMM, YYYY'),
    };
  }
const params = {
    "arrCity": "TIV",
    "arrCityName": "Tivat",
    "depCity": "EVN",
    "depCityName": "Yerevan",
    "endDate": "2026-05-01",
    "startDate": "2026-05-01"
}

  const submitMonthChange = (fetchScheduleProps: any) => {
    const { end, start } = fetchScheduleProps;
    const requestParams: any = clone(params);
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
        end: endDate.value,
      });
    }
  }, [beginDate, endDate, data]);

  const gotoFlightResult = () => {
    const { adult, child, infant } = pax;
    if (
      (flightBackDate && flightBackDate.length === 0 && flightOutDate && flightOutDate.length === 0) ||
      moment(flightBackDate, 'YYYY-MM-DD').isBefore(moment(flightOutDate, 'YYYY-MM-DD'))
    ) {
      setShowInvalidSelection(true);
    } else {
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
      
      setLoadable(true);
    }
  };

  const DateComponent = (dateProps: any) => {
    const {
      data: propData,
      isArrival,
    } = dateProps;
    const {
      price, date,
      isLowestPrice, isFlightAvailable,
      curreny,
    } = propData;
    const showPrice = true;

    const isSelected = (isArrival && date === flightBackDate) || (!isArrival && date === flightOutDate);

    return (
      <div
        className={`
          p-3 h-24 flex flex-col justify-between cursor-pointer border border-gray-200
          ${isFlightAvailable ? 'hover:bg-blue-50' : 'cursor-not-allowed opacity-60'}
          ${date.length === 0 ? 'bg-gray-100' : ''}
          ${isSelected ? 'bg-blue-100 border-blue-300' : ''}
        `}
        onClick={() => {
          if (isFlightAvailable && !isArrival) {
            setFlightOutDate(date);
          }
          if (isFlightAvailable && isArrival) {
            setFlightBackDate(date);
          }
        }}
      >
        <div className="flex justify-between items-start">
          <div className="text-sm font-medium text-gray-700">
            {moment(date, 'YYYY-MM-DD').date() || ''}
          </div>
          <div className="text-xs">
            {
              isLowestPrice && date.length > 0
                ? (
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-blue-600 text-blue-600 text-xs font-bold">
                    *
                  </span>
                )
                : ''
            }
          </div>
        </div>
        <div className="text-right">
          {
            showPrice && date.length > 0 && isFlightAvailable
              ? (
                <span className="text-lg font-bold text-blue-600">
                  {formatCurrency(
                    price,
                    curreny,
                    exchangeRate,
                    selectedCurrencyCode,
                  )}
                </span>
              ) : (
                <span className="text-sm text-gray-400">-</span>
              )
          }
        </div>
      </div>
    );
  };

  const setWeek = (monthSchedule: IDateSchedule[]) => {
    const weekAmount = ceil(monthSchedule.length / 7);
    let weeks = [] as IDateSchedule[][];
    for (let week = 0; week < weekAmount; week += 1) {
      let days = [] as IDateSchedule[];
      for (let day = 0; day < 7; day += 1) {
        const dateSchedule = monthSchedule[7 * week + day];
        if (dateSchedule) {
          days = [...days, dateSchedule];
        }
      }
      weeks = [...weeks, days];
    }
    return weeks;
  };

  const MonthBox = (monthProps: any) => {
    const { month, isArrival } = monthProps;
    const currYear = moment(new Date()).format('YYYY');
    const currMonth = moment(new Date()).format('M');
    const isBeforeCurrentMonth = moment(month.value, 'YYYY-MM-DD').isBefore(moment());
    const monthYear = moment(month.value, 'YYYY-MM-DD').format('YYYY');
    const dateMonth = moment(month.value, 'YYYY-MM-DD').format('M');
    const isCurrentMonth = currYear === monthYear && currMonth === dateMonth;
    const isOneYearLater = moment().add(1, 'year').isBefore(moment(month.value, 'YYYY-MM-DD'));
    const inActive = (isBeforeCurrentMonth && !isCurrentMonth) || isOneYearLater;
    
    let hightLight = false;
    if (isArrival) {
      hightLight = !isCurrentMonth ? 
        moment(endDate.value, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD') === month.value : 
        endDate.value === month.value;
    } else {
      hightLight = (moment(beginDate.value, 'YYYY-MM-DD').startOf('month').format('YYYY-MM-DD') === month.value);
    }

    return (
      <li className="flex-1 px-1">
        <button
          className={`
            w-full flex flex-col items-center justify-center border rounded-lg px-2 py-2 min-h-[55px] transition duration-200
            ${hightLight 
              ? 'bg-blue-900 text-white border-blue-900' 
              : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
            }
            ${inActive ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
          `}
          onClick={() => {
            if (!inActive) {
              handleMonthBoxClick(month.value, isArrival);
            }
          }}
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

  const injectPrevDays = (currentDay: number) => {
    const curDate = moment(currentDay, 'YYYY-MM-DD').date();
    let curMonth: any = moment(currentDay, 'YYYY-MM-DD').month() + 1;
    if (curMonth < 10) {
      curMonth = `0${curMonth}`;
    }
    const curYear = moment(currentDay, 'YYYY-MM-DD').year();
    const newMonthSchedule: Array<any> = [];
    for (let index = 1; index < curDate; index += 1) {
      const newDay = index < 10 ? `0${index}` : index;
      newMonthSchedule.push({
        price: 0,
        date: `${curYear}-${curMonth}-${newDay}`,
        isLowestPrice: false,
        isFlightAvailable: false,
        curreny: 'EUR',
      });
    }
    return newMonthSchedule;
  };

  const Calendar = (calendarProps: any) => {
    let { monthSchedule, flightDate } = calendarProps;
    const { isArrival } = calendarProps;

    if (monthSchedule) {
      const currentDate = moment(monthSchedule[0].date, 'YYYY-MM-DD').date();
      if (currentDate !== 1) {
        const remainDates = injectPrevDays(monthSchedule[0].date);
        monthSchedule = [
          ...remainDates,
          ...monthSchedule,
        ];
      }
    }

    const monthSelector = renderMonthSelector(flightDate, isArrival);
    let fcSchedule = [] as any[];
    
    if (monthSchedule) {
      const firstDate = monthSchedule[0].date;
      const deltaDate = moment(firstDate, 'YYYY-MM-DD').day() || 7;
      for (let index = 1; index < deltaDate; index += 1) {
        monthSchedule = [{
          price: '',
          date: '',
          isLowestPrice: false,
          isFlightAvailable: false,
          curreny: '',
        }, ...monthSchedule];
      }
      fcSchedule = setWeek(monthSchedule);
    }

    const isCurrentMonth = isEqual(moment(flightDate, 'YYYY-MM-DD').format('YYYY-MM'), moment().format('YYYY-MM'));
    const isLastMonthInRange = isEqual(moment().add(12, 'month').format('YYYY-MM'), moment(flightDate, 'YYYY-MM-DD').format('YYYY-MM'));

    const dayAbbreviations = [
      t('days.lblShortMon'),
      t('days.lblShortTue'),
      t('days.lblShortWed'),
      t('days.lblShortThu'),
      t('days.lblShortFri'),
      t('days.lblShortSat'),
      t('days.lblShortSun')
    ];

    return (
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden mb-8">
        <div className="border-b border-gray-300 bg-blue-50">
          <ul className="flex p-3 justify-between items-center">
            <li className="w-12">
              <button
                onClick={() => {
                  handleMonthBoxClick(moment(flightDate, 'YYYY-MM-DD').add(-1, 'M').format('YYYY-MM-DD'), isArrival);
                }}
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
                  <MonthBox key={`mView_${m.value}`} month={m} isArrival={isArrival} />
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
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {dayAbbreviations.map((day, index) => (
                  <th key={`th_${index}`} className="p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                monthSchedule && fcSchedule && fcSchedule.length
                  ? map(fcSchedule, (weekSchedule: any, index: number) => (
                    <tr key={`tr_${isArrival ? 'arr' : 'dep'}_${index}`}>
                      {
                        weekSchedule && weekSchedule.length
                          ? map(weekSchedule, (daySchedule: any, i: number) => {
                            const obSelectedClass = !isEmpty(flightBackDate) && daySchedule && daySchedule.date === flightBackDate;
                            const ibSelectedClass = !isEmpty(flightOutDate) && daySchedule && daySchedule.date === flightOutDate;
                            
                            return (
                              <td 
                                key={`tb_${isArrival ? 'arr' : 'dep'}_${i}`} 
                                className={`
                                  border border-gray-200
                                  ${((isArrival && obSelectedClass) || (!isArrival && ibSelectedClass)) && daySchedule ? 'bg-blue-100' : ''}
                                `}
                              >
                                {
                                  daySchedule
                                    ? (<DateComponent data={daySchedule} isArrival={isArrival} />)
                                    : (
                                      <div className="p-3 h-24 flex flex-col justify-between bg-gray-50">
                                        <div className="text-sm font-medium text-gray-400">-</div>
                                        <div className="text-right">
                                          <span className="text-sm text-gray-400">-</span>
                                        </div>
                                      </div>
                                    )
                                }
                              </td>
                            );
                          })
                          : ''
                      }
                    </tr>
                  ))
                  : ''
              }
            </tbody>
          </table>
        </div>
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
                
                <Calendar monthSchedule={data[0]} isArrival={false} flightDate={beginDate.value} />
                
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <ul className="flex flex-wrap gap-4">
                    <li className="flex items-center text-sm text-gray-700">
                      <span className="w-4 h-4 rounded-full border border-gray-400 mr-2"></span>
                      {t('NetWorkMap.lblNoFlight')}
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <span className="text-blue-600 font-bold mr-2">€</span>
                      {t('NetWorkMap.lblFlightAvailable')}
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-blue-600 text-blue-600 text-xs font-bold mr-2">
                        *
                      </span>
                      {t('NetWorkMap.lblChepeast')}
                    </li>
                  </ul>
                </div>
              </div>
              
              {
                !isEmpty(data[1])
                  ? (
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
                      
                      <Calendar monthSchedule={data[1]} isArrival flightDate={endDate.value} />
                      
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <ul className="flex flex-wrap gap-4">
                          <li className="flex items-center text-sm text-gray-700">
                            <span className="w-4 h-4 rounded-full border border-gray-400 mr-2"></span>
                            {t('NetWorkMap.lblNoFlight')}
                          </li>
                          <li className="flex items-center text-sm text-gray-700">
                            <span className="text-blue-600 font-bold mr-2">€</span>
                            {t('NetWorkMap.lblFlightAvailable')}
                          </li>
                          <li className="flex items-center text-sm text-gray-700">
                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-blue-600 text-blue-600 text-xs font-bold mr-2">
                              *
                            </span>
                            {t('NetWorkMap.lblChepeast')}
                          </li>
                        </ul>
                      </div>
                    </div>
                  )
                  : <Fragment />
              }
              
              <div className="flex justify-end mt-10">
                <button
                  disabled={
                    (flightOutDate.length === 0 && flightBackDate.length !== 0) ||
                    (flightBackDate.length === 0 && flightOutDate.length === 0)
                  }
                  onClick={() => {
                    gotoFlightResult();
                  }}
                  className={`
                    px-8 py-3 rounded-lg font-bold text-lg transition duration-200
                    ${(flightOutDate.length === 0 && flightBackDate.length !== 0) ||
                      (flightBackDate.length === 0 && flightOutDate.length === 0)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                    }
                  `}
                >
                  {
                    (
                      (flightOutDate.length !== 0 && flightBackDate.length === 0) ||
                      (flightBackDate.length !== 0 && flightOutDate.length !== 0)
                    ) ? t('NetWorkMap.lblContinueToBooking') : t('FlightResult.lblContinue')
                  }
                </button>
              </div>
            </div>
          )
          : (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {t('NetWorkMap.lblNoSchedule')}
              </div>
            </div>
          )
      }
    </Fragment>
  );
}


export default MonthView;