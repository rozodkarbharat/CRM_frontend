import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { AuthReducer } from './AuthReducer/AuthReducer'
import { MiscReducer } from "./MiscReducer/MiscReducer";
import { SubscriptionsReducer } from "./SubscriptionsReducer/SubscriptionsReducer";
import { UsersReducer } from "./UsersReducer/UsersReducer"
import { TradesReducer } from "./TradesReducer/TradeReducer";
import {SubscriptionDetailReducer} from "./SubscriptionDetailReducer/subscriptionDetailReducer"
import { strategiesReducer } from "./StrategiesReducer/strategiesReducer";
import {CRMReducer} from "./CRMReducer/CRMReducer"
import { ClientDetailReducer } from "./ClientDetailReducer/ClientDetailReducer";
import { VoucherReducer } from "./VoucherReducers/VoucherReducer";


const rootReducer = combineReducers({ AuthReducer, MiscReducer, SubscriptionsReducer, UsersReducer,SubscriptionDetailReducer,strategiesReducer,CRMReducer,TradesReducer,ClientDetailReducer,VoucherReducer})


export const Store = legacy_createStore(rootReducer, applyMiddleware(thunk))