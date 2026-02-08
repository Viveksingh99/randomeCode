import { useState, useEffect, useRef, Fragment } from "react";
import Cookies from "js-cookie";
import {
  map,
  find,
  filter,
  cloneDeep,
  findIndex,
  slice,
  isEmpty,
  isEqual,
} from "lodash";
import moment from "moment";
import NumberSpinner from "./NumberSpinner";
import { useTranslations } from "next-intl";
import LoadingPage from "@/components/ui/LoadingPage";
import ChartView from "./ChartView";
import MonthView from "./MonthView";
import { COOKIE_T_TOKEN } from "@/lib/utils";
import { airportFilter, groupCityColumn } from "@/lib/utilsFunction";

interface ICountryAriport {
  countryCode: string;
  countryName: string;
  airports: IAirportDetail[];
}
interface ICountryAriport {
  countryCode: string;
  countryName: string;
  airports: IAirportDetail[];
}
interface IArrivalCountryAirport {
  depCode: string;
  arrAirports: ICountryAriport[];
}
interface IAirportDetail {
  code: any;
  name: string;
}

function FareView(props: any) {
  const t = useTranslations();
  const [isShowModal, setIsShowModal] = useState(false);
  const [viewChosing, setViewChosing] = useState(1);
  const {
    depCountry,
    arrCountry,
    currentArrAirportsFiltered,
    depAirportsFiltered,
    arrivalAirports,
    portalType,
  } = props;
  const {
         query,
    showPageLoader,
         defaultEndDate,
         defaultStartDate,
  } = props;
const arrCity = {
    "code": "IST",
    "name": "Istanbul"
}
const depCity = {
    "code": "RMO",
    "name": "Kishinev Airport"
}
const departureAirports = [
    {
        "countryCode": "default",
        "countryName": "All Airports",
        "airports": [
            {
                "code": "EVN",
                "name": "Yerevan"
            },
            {
                "code": "BEY",
                "name": "Beirut"
            },
            {
                "code": "KIV",
                "name": "Chisinau"
            },
            {
                "code": "PMF",
                "name": "Parma Airport"
            },
            {
                "code": "VRN",
                "name": "Verona"
            },
            {
                "code": "MXP",
                "name": "Malpensa Airport"
            },
            {
                "code": "DUS",
                "name": "Dusseldorf"
            },
            {
                "code": "FCO",
                "name": "Rome Fiumicino"
            },
            {
                "code": "DME",
                "name": "Domodedovo Airport"
            },
            {
                "code": "VKO",
                "name": "Moscow Vnukovo Airport"
            },
            {
                "code": "MOW",
                "name": "Moscow"
            },
            {
                "code": "IST",
                "name": "Istanbul"
            },
            {
                "code": "LED",
                "name": "St Petersburg"
            },
            {
                "code": "AER",
                "name": "Sochi"
            },
            {
                "code": "MRV",
                "name": "Mineralnye Vody"
            },
            {
                "code": "KUF",
                "name": "Samara"
            },
            {
                "code": "OVB",
                "name": "Novosibirsk"
            },
            {
                "code": "TLV",
                "name": "Tel Aviv"
            },
            {
                "code": "SVX",
                "name": "Yekaterinburg"
            },
            {
                "code": "MAD",
                "name": "Madrid"
            },
            {
                "code": "BCN",
                "name": "Barcelona"
            },
            {
                "code": "VLC",
                "name": "Valencia"
            },
            {
                "code": "TBS",
                "name": "Tbilisi"
            },
            {
                "code": "BER",
                "name": "Berlin"
            },
            {
                "code": "MUC",
                "name": "Munich"
            },
            {
                "code": "LTN",
                "name": "London Luton Airport"
            },
            {
                "code": "HHN",
                "name": "Hahn Airport"
            },
            {
                "code": "IKA",
                "name": "Imam Khomeini International Airport"
            },
            {
                "code": "DUB",
                "name": "Dublin"
            },
            {
                "code": "PRG",
                "name": "Prague"
            },
            {
                "code": "AMS",
                "name": "Amsterdam"
            },
            {
                "code": "LIS",
                "name": "Lisbon"
            },
            {
                "code": "BRU",
                "name": "Brussels"
            },
            {
                "code": "CDG",
                "name": "Charles de Gaulle Airport"
            },
            {
                "code": "NCE",
                "name": "Nice"
            },
            {
                "code": "LYS",
                "name": "Lyon"
            },
            {
                "code": "DWC",
                "name": "Dubai World Central"
            },
            {
                "code": "ZRH",
                "name": "Zurich"
            },
            {
                "code": "LCA",
                "name": "Larnaca"
            },
            {
                "code": "BLQ",
                "name": "Bologna"
            },
            {
                "code": "VCE",
                "name": "Venice"
            },
            {
                "code": "DXB",
                "name": "Dubai"
            },
            {
                "code": "LHR",
                "name": "London Heathrow"
            },
            {
                "code": "SVO",
                "name": "Sheremetyevo Airport"
            },
            {
                "code": "OTP",
                "name": "Bucharest Airport"
            },
            {
                "code": "RMO",
                "name": "Kishinev Airport"
            },
            {
                "code": "LON",
                "name": "London"
            },
            {
                "code": "STN",
                "name": "London Stansted"
            },
            {
                "code": "SKG",
                "name": "Thessaloniki"
            },
            {
                "code": "AYT",
                "name": "Antalya"
            },
            {
                "code": "MAN",
                "name": "Manchester"
            },
            {
                "code": "DBI",
                "name": "Dubai International Airport"
            },
            {
                "code": "ROM",
                "name": "Rome"
            },
            {
                "code": "TRN",
                "name": "Turin"
            },
            {
                "code": "CRA",
                "name": "Craiova"
            },
            {
                "code": "CLJ",
                "name": "Cluj"
            },
            {
                "code": "TIV",
                "name": "Tivat"
            },
            {
                "code": "DBB",
                "name": "El Alamein International Airport"
            },
            {
                "code": "TAS",
                "name": "Tashkent"
            },
            {
                "code": "GVA",
                "name": "Geneva"
            },
            {
                "code": "AGP",
                "name": "Malaga"
            }
        ]
    },
    {
        "countryCode": "AM",
        "countryName": "Armenian Republic",
        "airports": [
            {
                "code": "EVN",
                "name": "Yerevan"
            }
        ]
    },
    {
        "countryCode": "BE",
        "countryName": "Belgium",
        "airports": [
            {
                "code": "BRU",
                "name": "Brussels"
            }
        ]
    },
    {
        "countryCode": "CY",
        "countryName": "Cyprus",
        "airports": [
            {
                "code": "LCA",
                "name": "Larnaca"
            }
        ]
    },
    {
        "countryCode": "CZ",
        "countryName": "Czech Republic",
        "airports": [
            {
                "code": "PRG",
                "name": "Prague"
            }
        ]
    },
    {
        "countryCode": "EG",
        "countryName": "Egypt",
        "airports": [
            {
                "code": "DBB",
                "name": "El Alamein International Airport"
            }
        ]
    },
    {
        "countryCode": "FR",
        "countryName": "France",
        "airports": [
            {
                "code": "CDG",
                "name": "Charles de Gaulle Airport"
            },
            {
                "code": "NCE",
                "name": "Nice"
            },
            {
                "code": "LYS",
                "name": "Lyon"
            }
        ]
    },
    {
        "countryCode": "GE",
        "countryName": "Georgia Republic",
        "airports": [
            {
                "code": "TBS",
                "name": "Tbilisi"
            }
        ]
    },
    {
        "countryCode": "DE",
        "countryName": "Germany Republic",
        "airports": [
            {
                "code": "DUS",
                "name": "Dusseldorf"
            },
            {
                "code": "BER",
                "name": "Berlin"
            },
            {
                "code": "MUC",
                "name": "Munich"
            },
            {
                "code": "HHN",
                "name": "Hahn Airport"
            }
        ]
    },
    {
        "countryCode": "GR",
        "countryName": "Greece",
        "airports": [
            {
                "code": "SKG",
                "name": "Thessaloniki"
            }
        ]
    },
    {
        "countryCode": "IR",
        "countryName": "Iran",
        "airports": [
            {
                "code": "IKA",
                "name": "Imam Khomeini International Airport"
            }
        ]
    },
    {
        "countryCode": "IE",
        "countryName": "Ireland",
        "airports": [
            {
                "code": "DUB",
                "name": "Dublin"
            }
        ]
    },
    {
        "countryCode": "IL",
        "countryName": "Israel",
        "airports": [
            {
                "code": "TLV",
                "name": "Tel Aviv"
            }
        ]
    },
    {
        "countryCode": "IT",
        "countryName": "Italy",
        "airports": [
            {
                "code": "PMF",
                "name": "Parma Airport"
            },
            {
                "code": "VRN",
                "name": "Verona"
            },
            {
                "code": "MXP",
                "name": "Malpensa Airport"
            },
            {
                "code": "FCO",
                "name": "Rome Fiumicino"
            },
            {
                "code": "BLQ",
                "name": "Bologna"
            },
            {
                "code": "VCE",
                "name": "Venice"
            },
            {
                "code": "ROM",
                "name": "Rome"
            },
            {
                "code": "TRN",
                "name": "Turin"
            }
        ]
    },
    {
        "countryCode": "LB",
        "countryName": "Lebanon",
        "airports": [
            {
                "code": "BEY",
                "name": "Beirut"
            }
        ]
    },
    {
        "countryCode": "MD",
        "countryName": "Moldova Republic",
        "airports": [
            {
                "code": "KIV",
                "name": "Chisinau"
            },
            {
                "code": "RMO",
                "name": "Kishinev Airport"
            }
        ]
    },
    {
        "countryCode": "ME",
        "countryName": "Montenegro",
        "airports": [
            {
                "code": "TIV",
                "name": "Tivat"
            }
        ]
    },
    {
        "countryCode": "NL",
        "countryName": "Netherlands",
        "airports": [
            {
                "code": "AMS",
                "name": "Amsterdam"
            }
        ]
    },
    {
        "countryCode": "PT",
        "countryName": "Portugal",
        "airports": [
            {
                "code": "LIS",
                "name": "Lisbon"
            }
        ]
    },
    {
        "countryCode": "RO",
        "countryName": "Romania",
        "airports": [
            {
                "code": "OTP",
                "name": "Bucharest Airport"
            },
            {
                "code": "CRA",
                "name": "Craiova"
            },
            {
                "code": "CLJ",
                "name": "Cluj"
            }
        ]
    },
    {
        "countryCode": "RU",
        "countryName": "Russian Federation",
        "airports": [
            {
                "code": "DME",
                "name": "Domodedovo Airport"
            },
            {
                "code": "VKO",
                "name": "Moscow Vnukovo Airport"
            },
            {
                "code": "MOW",
                "name": "Moscow"
            },
            {
                "code": "LED",
                "name": "St Petersburg"
            },
            {
                "code": "AER",
                "name": "Sochi"
            },
            {
                "code": "MRV",
                "name": "Mineralnye Vody"
            },
            {
                "code": "KUF",
                "name": "Samara"
            },
            {
                "code": "OVB",
                "name": "Novosibirsk"
            },
            {
                "code": "SVX",
                "name": "Yekaterinburg"
            },
            {
                "code": "SVO",
                "name": "Sheremetyevo Airport"
            }
        ]
    },
    {
        "countryCode": "ES",
        "countryName": "Spain And Canary Islands",
        "airports": [
            {
                "code": "MAD",
                "name": "Madrid"
            },
            {
                "code": "BCN",
                "name": "Barcelona"
            },
            {
                "code": "VLC",
                "name": "Valencia"
            },
            {
                "code": "AGP",
                "name": "Malaga"
            }
        ]
    },
    {
        "countryCode": "CH",
        "countryName": "Switzerland",
        "airports": [
            {
                "code": "ZRH",
                "name": "Zurich"
            },
            {
                "code": "GVA",
                "name": "Geneva"
            }
        ]
    },
    {
        "countryCode": "TR",
        "countryName": "Turkey",
        "airports": [
            {
                "code": "IST",
                "name": "Istanbul"
            },
            {
                "code": "AYT",
                "name": "Antalya"
            }
        ]
    },
    {
        "countryCode": "AE",
        "countryName": "United Arab Emirates",
        "airports": [
            {
                "code": "DWC",
                "name": "Dubai World Central"
            },
            {
                "code": "DXB",
                "name": "Dubai"
            },
            {
                "code": "DBI",
                "name": "Dubai International Airport"
            }
        ]
    },
    {
        "countryCode": "GB",
        "countryName": "United Kingdom",
        "airports": [
            {
                "code": "LTN",
                "name": "London Luton Airport"
            },
            {
                "code": "LHR",
                "name": "London Heathrow"
            },
            {
                "code": "LON",
                "name": "London"
            },
            {
                "code": "STN",
                "name": "London Stansted"
            },
            {
                "code": "MAN",
                "name": "Manchester"
            }
        ]
    },
    {
        "countryCode": "UZ",
        "countryName": "Uzbekistan Republic",
        "airports": [
            {
                "code": "TAS",
                "name": "Tashkent"
            }
        ]
    }
]
let isArrCityPicking = false;
let isDepCityPicking = false;
const beginDate = {
    "value": "2026-03-01",
    "label": "March, 2026"
}
const endDate = {
    "value": "2026-04-01",
    "label": "April, 2026"
}
const monthSelector = [
    {
        "label": "February, 2026",
        "value": "2026-02-07"
    },
    {
        "label": "March, 2026",
        "value": "2026-03-01"
    },
    {
        "label": "April, 2026",
        "value": "2026-04-01"
    },
    {
        "label": "May, 2026",
        "value": "2026-05-01"
    },
    {
        "label": "June, 2026",
        "value": "2026-06-01"
    },
    {
        "label": "July, 2026",
        "value": "2026-07-01"
    },
    {
        "label": "August, 2026",
        "value": "2026-08-01"
    },
    {
        "label": "September, 2026",
        "value": "2026-09-01"
    },
    {
        "label": "October, 2026",
        "value": "2026-10-01"
    },
    {
        "label": "November, 2026",
        "value": "2026-11-01"
    },
    {
        "label": "December, 2026",
        "value": "2026-12-01"
    },
    {
        "label": "January, 2027",
        "value": "2027-01-01"
    },
    {
        "label": "February, 2027",
        "value": "2027-02-01"
    }
]
const exchangeRate = 0;
const selectedCurrencyCode = 'EUR';
const currentArrivalAirports = [
    {
        "countryCode": "default",
        "countryName": "All Airports",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "EVN",
                "name": "Yerevan"
            },
            {
                "code": "BEY",
                "name": "Beirut"
            },
            {
                "code": "PMF",
                "name": "Parma Airport"
            },
            {
                "code": "VRN",
                "name": "Verona"
            },
            {
                "code": "MXP",
                "name": "Malpensa Airport"
            },
            {
                "code": "DUS",
                "name": "Dusseldorf"
            },
            {
                "code": "FCO",
                "name": "Rome Fiumicino"
            },
            {
                "code": "DME",
                "name": "Domodedovo Airport"
            },
            {
                "code": "VKO",
                "name": "Moscow Vnukovo Airport"
            },
            {
                "code": "MOW",
                "name": "Moscow"
            },
            {
                "code": "IST",
                "name": "Istanbul"
            },
            {
                "code": "LED",
                "name": "St Petersburg"
            },
            {
                "code": "AER",
                "name": "Sochi"
            },
            {
                "code": "MRV",
                "name": "Mineralnye Vody"
            },
            {
                "code": "KUF",
                "name": "Samara"
            },
            {
                "code": "OVB",
                "name": "Novosibirsk"
            },
            {
                "code": "TLV",
                "name": "Tel Aviv"
            },
            {
                "code": "SVX",
                "name": "Yekaterinburg"
            },
            {
                "code": "MAD",
                "name": "Madrid"
            },
            {
                "code": "BCN",
                "name": "Barcelona"
            },
            {
                "code": "VLC",
                "name": "Valencia"
            },
            {
                "code": "TBS",
                "name": "Tbilisi"
            },
            {
                "code": "BER",
                "name": "Berlin"
            },
            {
                "code": "MUC",
                "name": "Munich"
            },
            {
                "code": "LTN",
                "name": "London Luton Airport"
            },
            {
                "code": "HHN",
                "name": "Hahn Airport"
            },
            {
                "code": "IKA",
                "name": "Imam Khomeini International Airport"
            },
            {
                "code": "DUB",
                "name": "Dublin"
            },
            {
                "code": "PRG",
                "name": "Prague"
            },
            {
                "code": "AMS",
                "name": "Amsterdam"
            },
            {
                "code": "LIS",
                "name": "Lisbon"
            },
            {
                "code": "BRU",
                "name": "Brussels"
            },
            {
                "code": "CDG",
                "name": "Charles de Gaulle Airport"
            },
            {
                "code": "NCE",
                "name": "Nice"
            },
            {
                "code": "LYS",
                "name": "Lyon"
            },
            {
                "code": "ZRH",
                "name": "Zurich"
            },
            {
                "code": "LCA",
                "name": "Larnaca"
            },
            {
                "code": "BLQ",
                "name": "Bologna"
            },
            {
                "code": "VCE",
                "name": "Venice"
            },
            {
                "code": "DXB",
                "name": "Dubai"
            },
            {
                "code": "LON",
                "name": "London"
            },
            {
                "code": "STN",
                "name": "London Stansted"
            },
            {
                "code": "SKG",
                "name": "Thessaloniki"
            },
            {
                "code": "AYT",
                "name": "Antalya"
            },
            {
                "code": "MAN",
                "name": "Manchester"
            },
            {
                "code": "DBI",
                "name": "Dubai International Airport"
            },
            {
                "code": "TRN",
                "name": "Turin"
            },
            {
                "code": "TAS",
                "name": "Tashkent"
            },
            {
                "code": "GVA",
                "name": "Geneva"
            },
            {
                "code": "AGP",
                "name": "Malaga"
            }
        ]
    },
    {
        "countryCode": "AM",
        "countryName": "Armenian Republic",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "EVN",
                "name": "Yerevan"
            }
        ]
    },
    {
        "countryCode": "LB",
        "countryName": "Lebanon",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "BEY",
                "name": "Beirut"
            }
        ]
    },
    {
        "countryCode": "IT",
        "countryName": "Italy",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "PMF",
                "name": "Parma Airport"
            },
            {
                "code": "VRN",
                "name": "Verona"
            },
            {
                "code": "MXP",
                "name": "Malpensa Airport"
            },
            {
                "code": "FCO",
                "name": "Rome Fiumicino"
            },
            {
                "code": "BLQ",
                "name": "Bologna"
            },
            {
                "code": "VCE",
                "name": "Venice"
            },
            {
                "code": "TRN",
                "name": "Turin"
            }
        ]
    },
    {
        "countryCode": "DE",
        "countryName": "Germany Republic",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "DUS",
                "name": "Dusseldorf"
            },
            {
                "code": "BER",
                "name": "Berlin"
            },
            {
                "code": "MUC",
                "name": "Munich"
            },
            {
                "code": "HHN",
                "name": "Hahn Airport"
            }
        ]
    },
    {
        "countryCode": "RU",
        "countryName": "Russian Federation",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "DME",
                "name": "Domodedovo Airport"
            },
            {
                "code": "VKO",
                "name": "Moscow Vnukovo Airport"
            },
            {
                "code": "MOW",
                "name": "Moscow"
            },
            {
                "code": "LED",
                "name": "St Petersburg"
            },
            {
                "code": "AER",
                "name": "Sochi"
            },
            {
                "code": "MRV",
                "name": "Mineralnye Vody"
            },
            {
                "code": "KUF",
                "name": "Samara"
            },
            {
                "code": "OVB",
                "name": "Novosibirsk"
            },
            {
                "code": "SVX",
                "name": "Yekaterinburg"
            }
        ]
    },
    {
        "countryCode": "TR",
        "countryName": "Turkey",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "IST",
                "name": "Istanbul"
            },
            {
                "code": "AYT",
                "name": "Antalya"
            }
        ]
    },
    {
        "countryCode": "IL",
        "countryName": "Israel",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "TLV",
                "name": "Tel Aviv"
            }
        ]
    },
    {
        "countryCode": "ES",
        "countryName": "Spain And Canary Islands",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "MAD",
                "name": "Madrid"
            },
            {
                "code": "BCN",
                "name": "Barcelona"
            },
            {
                "code": "VLC",
                "name": "Valencia"
            },
            {
                "code": "AGP",
                "name": "Malaga"
            }
        ]
    },
    {
        "countryCode": "GE",
        "countryName": "Georgia Republic",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "TBS",
                "name": "Tbilisi"
            }
        ]
    },
    {
        "countryCode": "GB",
        "countryName": "United Kingdom",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "LTN",
                "name": "London Luton Airport"
            },
            {
                "code": "LON",
                "name": "London"
            },
            {
                "code": "STN",
                "name": "London Stansted"
            },
            {
                "code": "MAN",
                "name": "Manchester"
            }
        ]
    },
    {
        "countryCode": "IR",
        "countryName": "Iran",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "IKA",
                "name": "Imam Khomeini International Airport"
            }
        ]
    },
    {
        "countryCode": "IE",
        "countryName": "Ireland",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "DUB",
                "name": "Dublin"
            }
        ]
    },
    {
        "countryCode": "CZ",
        "countryName": "Czech Republic",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "PRG",
                "name": "Prague"
            }
        ]
    },
    {
        "countryCode": "NL",
        "countryName": "Netherlands",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "AMS",
                "name": "Amsterdam"
            }
        ]
    },
    {
        "countryCode": "PT",
        "countryName": "Portugal",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "LIS",
                "name": "Lisbon"
            }
        ]
    },
    {
        "countryCode": "BE",
        "countryName": "Belgium",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "BRU",
                "name": "Brussels"
            }
        ]
    },
    {
        "countryCode": "FR",
        "countryName": "France",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "CDG",
                "name": "Charles de Gaulle Airport"
            },
            {
                "code": "NCE",
                "name": "Nice"
            },
            {
                "code": "LYS",
                "name": "Lyon"
            }
        ]
    },
    {
        "countryCode": "CH",
        "countryName": "Switzerland",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "ZRH",
                "name": "Zurich"
            },
            {
                "code": "GVA",
                "name": "Geneva"
            }
        ]
    },
    {
        "countryCode": "CY",
        "countryName": "Cyprus",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "LCA",
                "name": "Larnaca"
            }
        ]
    },
    {
        "countryCode": "AE",
        "countryName": "United Arab Emirates",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "DXB",
                "name": "Dubai"
            },
            {
                "code": "DBI",
                "name": "Dubai International Airport"
            }
        ]
    },
    {
        "countryCode": "GR",
        "countryName": "Greece",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "SKG",
                "name": "Thessaloniki"
            }
        ]
    },
    {
        "countryCode": "UZ",
        "countryName": "Uzbekistan Republic",
        "airports": [
            {
                "code": false,
                "name": "Anywhere available"
            },
            {
                "code": "TAS",
                "name": "Tashkent"
            }
        ]
    }
]
const fareCalendarSchedule = [
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


  const {
    depCity: dCity,
    arrCity: aCity,
    startDate: sDate,
    endDate: eDate,
    depCityName,
    arrCityName,
    adult = 1,
    child = 0,
    infant = 0,
  } = query;
  const WORKFLOW_TYPE: any = 2;
  const startIndex = findIndex(monthSelector, { value: beginDate.value });
  const [returnMonthSelector, setReturnMonthSelector] = useState(
    slice(monthSelector, startIndex),
  );

  const chooseOrignText = t("NetWorkMap.lblChooseOrgCity");
  const chooseDestiText = t("NetWorkMap.lblChooseDestCity");
  const [departureText, setDepartureText] = useState(chooseOrignText);
  const [arrivalText, setArrivalText] = useState(chooseDestiText);
  const [isFetchable, setFetchable] = useState(false);
  const [adultCnt, setadultCnt] = useState(1);
  const [childCnt, setchildCnt] = useState(0);
  const [infantCnt, setinfantCnt] = useState(0);
  const totalCntt = adultCnt + childCnt;
  const [totalCnt, setTotalCnt] = useState(1);
  const paxLimit = 9;
  const paxleftCount = paxLimit - (adultCnt + childCnt);
  const [maxAdult, setMaxAdult] = useState(paxleftCount);
  const [maxChild, setMaxChild] = useState(paxleftCount);
  const [maxInfant, setMaxInfant] = useState(adultCnt);

  const [deptStartDate, setDepartDate] = useState(defaultStartDate);
  const [retnEndDate, setRetnEndDate] = useState({ label: "", value: "" });

  useEffect(() => {
    if (!isEmpty(defaultStartDate) && !isEmpty(defaultStartDate.value)) {
      let starBegtIndex = findIndex(monthSelector, {
        value: moment(defaultStartDate.value, "YYYY-MM-DD")
          .startOf("month")
          .format("YYYY-MM-DD"),
      });
      if (
        isEqual(
          moment().format("YYYY-MM"),
          moment(defaultStartDate.value, "YYYY-MM-DD").format("YYYY-MM"),
        )
      ) {
        starBegtIndex = findIndex(monthSelector, {
          value: moment().format("YYYY-MM-DD"),
        });
        setReturnMonthSelector(slice(monthSelector, starBegtIndex));
        setDepartDate({
          label: moment().format("MMMM, YYYY"),
          value: moment().format("YYYY-MM-DD"),
        });
      } else {
        setReturnMonthSelector(slice(monthSelector, starBegtIndex));
        setDepartDate({
          label: defaultStartDate.label,
          value: moment(defaultStartDate.value, "YYYY-MM-DD")
            .startOf("month")
            .format("YYYY-MM-DD"),
        });
      }
    }
  }, [defaultStartDate]);

  useEffect(() => {
    if (!isEmpty(defaultEndDate) && !isEmpty(defaultEndDate.value)) {
      if (
        isEqual(
          moment().format("YYYY-MM"),
          moment(defaultEndDate.value, "YYYY-MM-DD").format("YYYY-MM"),
        )
      ) {
        setRetnEndDate({
          label: moment().format("MMMM, YYYY"),
          value: moment().format("YYYY-MM-DD"),
        });
      } else {
        setRetnEndDate({
          label: defaultEndDate.label,
          value: moment(defaultEndDate.value, "YYYY-MM-DD")
            .startOf("month")
            .format("YYYY-MM-DD"),
        });
      }
    }
  }, [defaultEndDate]);

  const [showInvalidSelection, setShowInvalidSelection] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState(0);
  const [isPaxDropdownOpen, setIsPaxDropdownOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("search-view");
    if (process.env.API_ENV === "production") {
      document.body.classList.add("live-mode");
    }
    setadultCnt(Number(adult));
    setchildCnt(Number(child));
    setinfantCnt(Number(infant));
    const paxleftCountt = paxLimit - (Number(adult) + Number(child));
    setTotalCnt(paxleftCountt);
    setMaxAdult(paxleftCountt);
    setMaxChild(paxleftCountt);
    setMaxInfant(Number(adult));
    if (dCity && aCity) {
      setDepartureText(`${depCityName ? `${depCityName}-` : ""} ${dCity}`);
      setArrivalText(`${arrCityName ? `${arrCityName}-` : ""} ${aCity}`);
    }
  }, [depCity, arrivalAirports, currentArrivalAirports]);

  useEffect(() => {
    document.body.classList.add("search-view");
    if (process.env.API_ENV === "production") {
      document.body.classList.add("live-mode");
    }

    setMaxInfant(adultCnt);
    setMaxAdult(paxLimit - childCnt);
    setMaxChild(paxLimit - adultCnt);
    setTotalCnt(totalCntt);
    if (adultCnt < infantCnt) {
      setinfantCnt(adultCnt);
    }
  }, [adultCnt, childCnt, infantCnt, maxAdult]);

  const pickDepCityRef = useRef(null);
  const pickArrCityRef = useRef(null);
  const pickArrCityInputRef = useRef<HTMLInputElement>(null);
  const pickDepCityMobRef = useRef<HTMLInputElement>(null);
  const pickArrCityMobRef = useRef<HTMLInputElement>(null);

  const useOutsideClick = (ref: any, callback: Function) => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };

  useOutsideClick(pickDepCityRef, () => {
    if (isDepCityPicking) {
      if (depCity && depCity.code) {
        setDepartureText(`${depCity.name} -${depCity.code}`);
      }
    }
  });

  useOutsideClick(pickArrCityRef, () => {
    if (isArrCityPicking) {
      if (arrCity && arrCity.code) {
        setArrivalText(`${arrCity.name} - ${arrCity.code}`);
      }
    }
  });

  const [defaultDepCity, setDefaultDepCity] = useState(null as any);
  const [defaultArrCity, setDefaultArrCity] = useState(null as any);

  function autoSelectOnPressEnter(key: string, action: Function) {
    useEffect(() => {
      function onKeyup(e: KeyboardEvent) {
        if (typeof e.key !== "undefined" && e.key.toString() === key) action();
      }
      window.addEventListener("keyup", onKeyup);
      return () => window.removeEventListener("keyup", onKeyup);
    }, [defaultDepCity, defaultArrCity]);
  }

  const encToken = Cookies.get(COOKIE_T_TOKEN);
  const redirectUrl = (detail: any) => {
    const url = `/FareCalendar?${
      detail.depCityName ? `depCityName=${detail.depCityName}` : ""
    }${detail.depCity ? `&depCity=${detail.depCity}` : ""}${
      detail.arrCityName ? `&arrCityName=${detail.arrCityName}` : ""
    }${detail.arrCity ? `&arrCity=${detail.arrCity}` : ""}${
      detail.startDate ? `&startDate=${detail.startDate}` : ""
    }${!isEmpty(detail.endDate) ? `&endDate=${detail.endDate}` : ""}${
      detail.adult ? `&adult=${detail.adult}` : ""
    }${detail.child ? `&child=${detail.child}` : ""}${
      detail.infant ? `&infant=${detail.infant}` : ""
    }${portalType === WORKFLOW_TYPE.B2B ? `&t=${encToken}` : ""}`;
    document.location.href = url;
  };

  const submitMonthChange = (fetchScheduleProps: any) => {
    const { end, start } = fetchScheduleProps;

    const request = {
      depCity: depCity.code,
      arrCity: arrCity.code,
      depCityName: depCity.name,
      arrCityName: arrCity.name,
      startDate: start,
      endDate: end,
      adult: adultCnt,
      child: childCnt,
      infant: infantCnt,
    };
  };

  const onSubmit = () => {
    const isDeptDateValid =
      moment(beginDate.value).isValid() &&
      moment(deptStartDate.value).isValid();

    if (
      beginDate &&
      endDate &&
      endDate.value &&
      beginDate.value &&
      moment(endDate.value, "YYYY-MM-DD") <
        moment(beginDate.value, "YYYY-MM-DD")
    ) {
      window.alert(t("NetWorkMap.lbltrnDatGrtrStrMonth"));
      return false;
    }

    const isRedirectable =
      depCity &&
      depCity.code &&
      arrCity &&
      arrCity.code &&
      isDeptDateValid &&
      (depCity.code !== dCity ||
        arrCity.code !== aCity ||
        adultCnt !== adult ||
        childCnt !== child ||
        infantCnt !== infant ||
        beginDate.value !== deptStartDate.value ||
        endDate.value !== retnEndDate.value);

    if (isRedirectable) {
      redirectUrl({
        depCity: depCity.code,
        arrCity: arrCity.code,
        depCityName: depCity.name,
        arrCityName: arrCity.name,
        startDate: deptStartDate.value || "",
        endDate: !isEmpty(retnEndDate.value) ? retnEndDate.value : "",
        adult: adultCnt,
        child: childCnt,
        infant: infantCnt,
      });
    } else if (isFetchable && isDeptDateValid) {
      submitMonthChange({
        start: beginDate.value,
        end: endDate.value,
      });
    }
  };

  const switchView = (view: number) => {
    if (view !== viewChosing) {
      setViewChosing(view);
    }
  };

  const [noDeptCityFound, setNoDeptCityFound] = useState(false);
  const [noArvlCityFound, setNoArvlCityFound] = useState(false);

  const deptCityKeySearch = (e: any) => {
    const filterKey = e.target.value;
    setDepartureText(e.target.value);
    const airportFiltered = map(
      cloneDeep(departureAirports) as ICountryAriport[],
      (countryOption) => {
        const cityOptions = filter(
          countryOption.airports,
          (airport) => airportFilter(filterKey, airport) as boolean,
        ) as IAirportDetail[];
        const { countryCode, countryName } = countryOption;
        return { countryCode, countryName, airports: cityOptions };
      },
    );
    if (
      filterKey.length > 0 &&
      airportFiltered &&
      airportFiltered.length > 0 &&
      airportFiltered[0] &&
      airportFiltered[0].airports &&
      airportFiltered[0].airports.length > 0
    ) {
      const firstOption = airportFiltered[0].airports[0];
      setDefaultDepCity(firstOption);
    }
    const filteredCityList = filter(
      airportFiltered as ICountryAriport[],
      (x) => x.airports.length > 0,
    );
    setNoDeptCityFound(isEmpty(filteredCityList));
  };

  const arrvlCityKeySearch = (e: any) => {
    setArrivalText(e.target.value);
    const filterKey = e.target.value;
    const airportFiltered:any = map(
      cloneDeep(currentArrivalAirports) as ICountryAriport[],
      (countryOption) => {
        const cityOptions = filter(
          countryOption.airports,
          (airport) => airportFilter(filterKey, airport) as boolean,
        ) as IAirportDetail[];
        const { countryCode, countryName } = countryOption;
        return { countryCode, countryName, airports: cityOptions };
      },
    );
    if (filterKey.length > 0 && airportFiltered && airportFiltered.length > 0) {
      const firstOption = airportFiltered[0].airports[0];
      setDefaultArrCity(firstOption);
    }
    const filteredCityList = filter(
      airportFiltered as ICountryAriport[],
      (x) => x.airports.length > 0,
    );
    setNoArvlCityFound(isEmpty(filteredCityList));
  };

  const BindMonthList = (months: any) => {
    const monthList: any = [];
    map(months, (McList: any) => {
      monthList.push(
        <option key={`fcMonth_${McList.value}`} value={McList.value}>
          {McList.label}
        </option>,
      );
    });
    return monthList;
  };

  const swtchDest = () => {
    let tmpContry: any = "";
    const { code: arrCode, name: arrName } = arrCity;
    const { code: depCode, name: depName } = depCity;
    tmpContry = `${arrName ? `${arrName}-` : ""} ${arrCode}`;
    setArrivalText(`${depName ? `${depName}-` : ""} ${depCode}`);
    setDepartureText(tmpContry);
  };

  return (
    <div className="w-full search-view">
      {/* <ModalComponent
        modData=""
        show={isShowModal}
        modalSize="MedSize"
        isError
        ModalType=""
        modalTitle=""
        modalBody="SearchFormInvalid"
        onHide={() => setIsShowModal(false)}
      /> */}
      <LoadingPage isOpen={showPageLoader} />
      <Fragment>
        {/* Banner Section */}
        <div
          className="relative bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/static/images/sky1-flyone-fare%20calendar.jpg')",
            minHeight: "600px",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-800/50"></div>
          <div className="relative container mx-auto px-4">
            <div className="pt-32 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-14 opacity-0">
                Fare Calendar
              </h1>
            </div>

            {/* Search Form */}
            <div className="relative z-10 -mb-16">
              <div className="bg-white rounded-xl shadow-2xl p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                  }}
                >
                  <div className="flex flex-wrap -mx-2">
                    {/* City Picker Section */}
                    <div className="w-full lg:w-1/3 px-2 mb-4 lg:mb-0">
                      <div className="flex -mx-1">
                        {/* Origin City */}
                        <div
                          className="w-1/2 px-1 relative"
                          ref={pickDepCityRef}
                        >
                          <div className="mb-0 relative">
                            <input
                              onKeyPress={(ev: any) => {
                                if (ev.charCode === 13) {
                                  ev.target.blur();
                                  if (
                                    pickArrCityInputRef &&
                                    pickArrCityInputRef.current
                                  ) {
                                    pickArrCityInputRef.current.focus();
                                    setArrivalText("");
                                    setNoArvlCityFound(false);
                                  }
                                }
                              }}
                              onFocus={() => {
                                if (
                                  deviceWidth <= 747 &&
                                  pickDepCityMobRef &&
                                  pickDepCityMobRef.current
                                ) {
                                  pickDepCityMobRef.current.focus();
                                }
                                if (noDeptCityFound) {
                                  deptCityKeySearch({
                                    target: {
                                      value: "",
                                    },
                                  });
                                  setDepartureText("");
                                }
                              }}
                              autoComplete="new-origin1"
                              type="text"
                              placeholder={t("NetWorkMap.lblChooseOrgCity")}
                              name="originAirport"
                              value={departureText || ""}
                              onChange={(e: any) => deptCityKeySearch(e)}
                              className="w-full h-16 border-none rounded-l-lg bg-blue-50 text-gray-600 text-sm px-4 focus:ring-0 focus:outline-none"
                            />
                            <button
                              type="button"
                              className="absolute right-[-13px] top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center z-10 p-0"
                              onClick={swtchDest}
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* City Dropdown */}
                          {isDepCityPicking && (
                            <div className="absolute left-0 top-full mt-1 w-full md:w-[450px] bg-blue-50 rounded-lg shadow-lg z-50 border border-gray-200">
                              <div className="p-2">
                                <input
                                  autoComplete="new-origin2"
                                  type="text"
                                  placeholder={t("NetWorkMap.lblChooseOrgCity")}
                                  name="originAirport"
                                  value={departureText || ""}
                                  ref={pickDepCityMobRef}
                                  onKeyPress={(ev: any) => {
                                    if (ev.charCode === 13) {
                                      ev.target.blur();
                                      if (
                                        pickArrCityInputRef &&
                                        pickArrCityInputRef.current
                                      ) {
                                        pickArrCityInputRef.current.focus();
                                        setArrivalText("");
                                        setNoArvlCityFound(false);
                                      }
                                    }
                                  }}
                                  onChange={(e: any) => deptCityKeySearch(e)}
                                  className="w-full h-12 border border-gray-300 rounded px-3 focus:ring-0 focus:outline-none"
                                />
                              </div>

                              {noDeptCityFound ? (
                                <div className="p-4">
                                  <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded">
                                    {t("NetWorkMap.lblNoCtyFound")}
                                  </div>
                                </div>
                              ) : (
                                <div className="flex">
                                  <div className="w-64 p-3 bg-blue-50 rounded-l-lg">
                                    <div className="text-blue-900 text-lg font-bold mb-3">
                                      {t("PaymentPage.lblCountry")}
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                      {depAirportsFiltered &&
                                        depAirportsFiltered.length > 0 &&
                                        groupCityColumn(
                                          depAirportsFiltered,
                                          10,
                                        ).map(
                                          (children: any, index: number) => (
                                            <div
                                              key={`depAirport_${index.toString()}_${children.length}`}
                                            >
                                              {children.map(
                                                (countryOption: any) => {
                                                  const {
                                                    countryCode,
                                                    countryName,
                                                  } = countryOption;
                                                  return (
                                                    <label
                                                      key={`depAirport_${countryCode}`}
                                                      htmlFor={`dep-${countryCode}`}
                                                      className="mb-1 block"
                                                    >
                                                      <div>
                                                        <input
                                                          type="radio"
                                                          name="countryOption"
                                                          id={`dep-${countryCode}`}
                                                          value={countryCode}
                                                          hidden={
                                                            countryCode ===
                                                            "default"
                                                          }
                                                          defaultChecked={
                                                            countryCode ===
                                                            "default"
                                                          }
                                                          className="hidden"
                                                        />
                                                        <div className="cursor-pointer px-3 py-2 bg-blue-50 hover:bg-blue-100 border-none rounded text-gray-800">
                                                          {countryName}
                                                        </div>
                                                      </div>
                                                    </label>
                                                  );
                                                },
                                              )}
                                            </div>
                                          ),
                                        )}
                                    </div>
                                  </div>

                                  <div className="w-64 p-3 bg-white rounded-r-lg">
                                    <div className="text-blue-900 text-lg font-bold mb-3">
                                      {t("NetWorkMap.lblCityDropDownLabel")}
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                      {depCountry &&
                                        depAirportsFiltered &&
                                        find(
                                          depAirportsFiltered as ICountryAriport[],
                                          { countryCode: depCountry },
                                        ) &&
                                        map(
                                          (
                                            find(
                                              depAirportsFiltered as ICountryAriport[],
                                              { countryCode: depCountry },
                                            ) as ICountryAriport
                                          ).airports,
                                          (airport: IAirportDetail) => {
                                            const { code, name } = airport;
                                            if (!code) return null;
                                            return (
                                              <label
                                                key={`depAirport_${code}_1`}
                                                htmlFor={`dep-${code}`}
                                                className="mb-1 block"
                                              >
                                                <div>
                                                  <input
                                                    type="radio"
                                                    name="cityOption"
                                                    id={`dep-${code}`}
                                                    value={code}
                                                    onClick={() => {
                                                      if (
                                                        pickArrCityInputRef &&
                                                        pickArrCityInputRef.current
                                                      ) {
                                                        pickArrCityInputRef.current.focus();
                                                        setArrivalText("");
                                                        setNoArvlCityFound(
                                                          false,
                                                        );
                                                      }
                                                      setDepartureText(
                                                        `${name} -${code}`,
                                                      );
                                                    }}
                                                    className="hidden"
                                                  />
                                                  <div className="cursor-pointer px-3 py-2 bg-white hover:bg-blue-50 border-none rounded text-gray-800">
                                                    {`${name} (${code})`}
                                                  </div>
                                                </div>
                                              </label>
                                            );
                                          },
                                        )}
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="p-3 border-t border-gray-200">
                                <button
                                  onClick={() => {
                                    if (isDepCityPicking) {
                                      if (depCity && depCity.code) {
                                        setDepartureText(
                                          `${depCity.name} (${depCity.code})`,
                                        );
                                      }
                                    }
                                  }}
                                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* Destination City */}
                        <div
                          className="w-1/2 px-1 relative"
                          ref={pickArrCityRef}
                        >
                          <div className="mb-0">
                            <input
                              onClick={() => {
                                if (
                                  deviceWidth <= 747 &&
                                  pickArrCityMobRef &&
                                  pickArrCityMobRef.current
                                ) {
                                  pickArrCityMobRef.current.focus();
                                }
                                if (isEmpty(arrivalText)) {
                                  arrvlCityKeySearch({
                                    target: {
                                      value: "",
                                    },
                                  });
                                }
                              }}
                              ref={pickArrCityInputRef as any}
                              autoComplete="new-destination1"
                              onFocus={() => {
                                if (noArvlCityFound) {
                                  setArrivalText("");
                                }
                                setNoArvlCityFound(false);
                              }}
                              type="text"
                              placeholder={t("NetWorkMap.lblChooseDestCity")}
                              value={arrivalText || ""}
                              name="destinationAirport"
                              onChange={(e: any) => arrvlCityKeySearch(e)}
                              className="w-full h-16 border-none bg-blue-50 text-gray-600 text-sm px-4 focus:ring-0 focus:outline-none"
                            />
                          </div>

                          {/* Destination City Dropdown */}
                          {depCity && depCity.code !== ""
                            ? isArrCityPicking && (
                                <div className="absolute left-0 top-full mt-1 w-full md:w-[450px] bg-blue-50 rounded-lg shadow-lg z-50 border border-gray-200">
                                  <div className="p-2">
                                    <input
                                      autoComplete="new-destination2"
                                      type="text"
                                      placeholder={t(
                                        "NetWorkMap.lblChooseDestCity",
                                      )}
                                      value={arrivalText || ""}
                                      name="destinationAirport"
                                      ref={pickArrCityMobRef}
                                      onFocus={() => {
                                        if (noArvlCityFound) {
                                          setArrivalText("");
                                        }
                                        setNoArvlCityFound(false);
                                      }}
                                      onChange={(e: any) =>
                                        arrvlCityKeySearch(e)
                                      }
                                      className="w-full h-12 border border-gray-300 rounded px-3 focus:ring-0 focus:outline-none"
                                    />
                                  </div>

                                  {noArvlCityFound ? (
                                    <div className="p-4">
                                      <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded">
                                        {t("NetWorkMap.lblNoCtyFound")}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex">
                                      <div className="w-64 p-3 bg-blue-50 rounded-l-lg">
                                        <div className="text-blue-900 text-lg font-bold mb-3">
                                          {t("PaymentPage.lblCountry")}
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                          {currentArrAirportsFiltered &&
                                            currentArrAirportsFiltered.length >
                                              0 &&
                                            groupCityColumn(
                                              currentArrAirportsFiltered,
                                              10,
                                            ).map(
                                              (
                                                children: any,
                                                index: number,
                                              ) => (
                                                <div
                                                  key={`ArrAirport_${index.toString()}_${children.length}`}
                                                >
                                                  {children.map(
                                                    (
                                                      countryOption: any,
                                                      i: number,
                                                    ) => {
                                                      const {
                                                        countryCode,
                                                        countryName,
                                                      } = countryOption;
                                                      return (
                                                        <label
                                                          key={`ArrAirport_${countryCode}_2`}
                                                          htmlFor={`arr-${countryCode}`}
                                                          className="mb-1 block"
                                                        >
                                                          <div>
                                                            <input
                                                              type="radio"
                                                              name="countryOption"
                                                              id={`arr-${countryCode}`}
                                                              value={
                                                                countryCode
                                                              }
                                                              defaultChecked={
                                                                currentArrAirportsFiltered[
                                                                  i
                                                                ]
                                                                  .countryCode ===
                                                                "default"
                                                              }
                                                              className="hidden"
                                                            />
                                                            <div className="cursor-pointer px-3 py-2 bg-blue-50 hover:bg-blue-100 border-none rounded text-gray-800">
                                                              {countryName}
                                                            </div>
                                                          </div>
                                                        </label>
                                                      );
                                                    },
                                                  )}
                                                </div>
                                              ),
                                            )}
                                        </div>
                                      </div>

                                      <div className="w-64 p-3 bg-white rounded-r-lg">
                                        <div className="text-blue-900 text-lg font-bold mb-3">
                                          {t("NetWorkMap.lblCityDropDownLabel")}
                                        </div>
                                        <div className="max-h-64 overflow-y-auto">
                                          {arrCountry &&
                                            currentArrAirportsFiltered &&
                                            find(currentArrAirportsFiltered, {
                                              countryCode: arrCountry,
                                            }) &&
                                            map(
                                              (
                                                find(
                                                  currentArrAirportsFiltered,
                                                  { countryCode: arrCountry },
                                                ) as ICountryAriport
                                              ).airports,
                                              (airport: IAirportDetail) => {
                                                const { code, name } = airport;
                                                if (!code) return null;
                                                return (
                                                  <label
                                                    key={`countryCode_${code}_2`}
                                                    htmlFor={`arr-${code}`}
                                                    className="mb-1 block"
                                                  >
                                                    <div>
                                                      <input
                                                        type="radio"
                                                        name="cityOption"
                                                        id={`arr-${code}`}
                                                        value={code}
                                                        onClick={() => {
                                                          setArrivalText(
                                                            `${name} ${code ? `(${code})` : ""}`,
                                                          );
                                                        }}
                                                        className="hidden"
                                                      />
                                                      <div className="cursor-pointer px-3 py-2 bg-white hover:bg-blue-50 border-none rounded text-gray-800">
                                                        {`${name} ${code ? `(${code})` : ""}`}
                                                      </div>
                                                    </div>
                                                  </label>
                                                );
                                              },
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  <div className="p-3 border-t border-gray-200">
                                    <button
                                      onClick={() => {
                                        if (isArrCityPicking) {
                                          if (arrCity && arrCity.code) {
                                            setArrivalText(
                                              `${arrCity.name} (${arrCity.code})`,
                                            );
                                          }
                                        }
                                      }}
                                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              )
                            : isArrCityPicking && (
                                <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-lg shadow-lg z-50 p-4 border border-gray-200">
                                  <strong className="text-amber-600">
                                    {t("NetWorkMap.lblPleaseChoseDptArpt")}
                                  </strong>
                                </div>
                              )}
                        </div>
                      </div>
                    </div>

                    {/* Month Selectors */}
                    <div className="w-full lg:w-1/3 px-2 mb-4 lg:mb-0">
                      <div className="flex -mx-1">
                        <div className="w-1/2 px-1">
                          <div className="mb-0">
                            <select
                              value={deptStartDate.value}
                              autoComplete="off"
                              required
                              onChange={(ev: any) => {
                                const selectedObj = {
                                  label: ev.target.selectedOptions[0].text,
                                  value: ev.target.value,
                                };
                                setDepartDate(selectedObj);
                                if (
                                  !isEmpty(retnEndDate) &&
                                  !isEmpty(retnEndDate.value) &&
                                  !isEmpty(selectedObj.value)
                                ) {
                                  const currDeptDtMnth = moment(
                                    selectedObj.value,
                                    "YYYY-MM-DD",
                                  );
                                  const currRetnDtMnth = moment(
                                    retnEndDate.value,
                                    "YYYY-MM-DD",
                                  );
                                  const monthDiff = currRetnDtMnth.diff(
                                    currDeptDtMnth,
                                    "month",
                                  );
                                  if (monthDiff < 1) {
                                    setRetnEndDate(selectedObj);
                                  }
                                  setFetchable(true);
                                  const startIndex2 = findIndex(monthSelector, {
                                    value: ev.target.value,
                                  });
                                  if (startIndex2 === -1) {
                                    setReturnMonthSelector([]);
                                    setRetnEndDate({
                                      label: moment().format("MMMM, YYYY"),
                                      value: moment().format("YYYY-MM-DD"),
                                    });
                                  } else {
                                    setReturnMonthSelector(
                                      slice(monthSelector, startIndex2),
                                    );
                                  }
                                }
                              }}
                              className="w-full h-16 border-none bg-white text-gray-600 px-4 focus:ring-0 focus:outline-none"
                            >
                              <option value="">
                                {t("NetWorkMap.lblFlyOut")}
                              </option>
                              {BindMonthList(monthSelector)}
                            </select>
                          </div>
                        </div>

                        <div className="w-1/2 px-1">
                          <div className="mb-0">
                            <select
                              value={
                                !isEmpty(retnEndDate) &&
                                typeof retnEndDate !== "undefined"
                                  ? retnEndDate.value
                                  : ""
                              }
                              autoComplete="off"
                              required
                              onChange={(ev: any) => {
                                const selectedObj = {
                                  label: ev.target.selectedOptions[0].text,
                                  value: ev.target.value,
                                };
                                setRetnEndDate(selectedObj);
                                setFetchable(true);
                              }}
                              className="w-full h-16 border-none bg-white text-gray-600 px-4 focus:ring-0 focus:outline-none"
                            >
                              <option value="">
                                {t("NetWorkMap.lblFlyBack")}
                              </option>
                              {BindMonthList(returnMonthSelector)}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Passenger Selector and Search Button */}
                    <div className="w-full lg:w-1/3 px-2">
                      <div className="flex -mx-1">
                        <div className="w-2/3 px-1">
                          <div className="mb-0 bg-white h-16 flex items-center px-4 rounded-l-lg">
                            <div className="w-full relative">
                              <div
                                className="flex items-center justify-between w-full cursor-pointer"
                                onClick={() =>
                                  setIsPaxDropdownOpen(!isPaxDropdownOpen)
                                }
                              >
                                <span className="text-gray-600">
                                  {totalCnt > 1
                                    ? `${totalCnt.toString()} Passengers`
                                    : `${totalCnt.toString()} Passenger`}
                                </span>
                                <svg
                                  className="w-4 h-4 text-blue-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>

                              {isPaxDropdownOpen && (
                                <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
                                  <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h4 className="font-semibold text-gray-800">
                                          {t("FlightResult.lblAdults")}
                                        </h4>
                                        <span className="text-sm text-gray-600">
                                          {t("FlightResult.lblAdultAge")}
                                        </span>
                                      </div>
                                      <div className="text-right">
                                        <NumberSpinner
                                          getCount={(value: number) => {
                                            setadultCnt(value);
                                            setTotalCnt(adultCnt + childCnt);
                                          }}
                                          min={1}
                                          max={maxAdult}
                                          step={1}
                                          currentValue={adultCnt}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h4 className="font-semibold text-gray-800">
                                          {t("FlightResult.lblChild")}
                                        </h4>
                                        <span className="text-sm text-gray-600">
                                          {t("FlightResult.lblChildAge")}
                                        </span>
                                      </div>
                                      <div className="text-right">
                                        <NumberSpinner
                                          getCount={(value: number) => {
                                            setchildCnt(value);
                                            setTotalCnt(adultCnt + childCnt);
                                          }}
                                          min={0}
                                          max={maxChild}
                                          step={1}
                                          currentValue={childCnt}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h4 className="font-semibold text-gray-800">
                                          {t("FlightResult.lblInfant")}
                                        </h4>
                                        <span className="text-sm text-gray-600">
                                          {t("FlightResult.lblInfantAge")}
                                        </span>
                                      </div>
                                      <div className="text-right">
                                        <NumberSpinner
                                          getCount={(value: number) => {
                                            setinfantCnt(value);
                                          }}
                                          min={0}
                                          max={maxInfant}
                                          step={1}
                                          currentValue={infantCnt}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="w-1/3 px-1">
                          <button
                            type="submit"
                            className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-r-lg border-none text-lg"
                          >
                            <svg
                              className="inline w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                            {t("NetWorkMap.lblSearch")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 mt-20">
          <div className="mt-8">
            {!isEmpty(fareCalendarSchedule) &&
            fareCalendarSchedule.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* View Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      onClick={() => switchView(1)}
                      className={`px-8 py-4 font-medium text-lg flex items-center ${
                        viewChosing === 1
                          ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      {t("NetWorkMap.lblChartView")}
                    </button>
                    <button
                      onClick={() => switchView(2)}
                      className={`px-8 py-4 font-medium text-lg flex items-center ${
                        viewChosing === 2
                          ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {t("NetWorkMap.lblMonthView")}
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {viewChosing === 1 ? (
                    <ChartView
                      data={fareCalendarSchedule}
                      styles={{}}
                      exchangeRate={exchangeRate}
                      selectedCurrencyCode={selectedCurrencyCode}
                      pax={{
                        adult: adultCnt,
                        child: childCnt,
                        infant: infantCnt,
                      }}
                      setShowInvalidSelection={setShowInvalidSelection}
                    />
                  ) : (
                    <MonthView
                      styles={{}}
                      data={fareCalendarSchedule}
                      exchangeRate={exchangeRate}
                      selectedCurrencyCode={selectedCurrencyCode}
                      pax={{
                        adult: adultCnt,
                        child: childCnt,
                        infant: infantCnt,
                      }}
                      setShowInvalidSelection={setShowInvalidSelection}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-red-50 text-red-800 border border-red-200 rounded p-4">
                {t("NetWorkMap.lblFlgtNotAvailSelectn")}
              </div>
            )}
          </div>
        </div>

        {/* <ModalComponent
          modData=""
          show={showInvalidSelection}
          modalSize="MedSize"
          ModalType=""
          modalTitle=""
          modalBody="invalidDateSelection"
          onHide={() => setShowInvalidSelection(false)}
        /> */}
      </Fragment>
    </div>
  );
}

export default FareView;
