import {takeLatest, put, call} from 'redux-saga/effects';
import {decreaseBetResponseService} from './../gameservice/decreaseBetResponseService';
import {actionTypes as gameLevelResponseActions} from "../gamereducer/asyncGameLevelServerResponseReducer";

export function* decreaseBetSaga(): Generator<any, any, any> {
    yield takeLatest(gameLevelResponseActions.GET_APPLICATION_DECREASE_BET_RESPONSE, fireDecreaseBetResponse);
}

function* fireDecreaseBetResponse(): Generator<any, any, any> {
    try {
        let decrease_bet = yield call(decreaseBetResponseService.sendDecreaseBetResponse);
        decrease_bet = decrease_bet.data.response;
        decrease_bet = JSON.parse(decrease_bet);
        yield put({
            type: gameLevelResponseActions.BET_DECREASE,
            decrease_bet
        });

    } catch (error) {
        console.log("Error",error);
        yield put({
            type: gameLevelResponseActions.BET_DECREASE_FAILURE,
            error
        });
    }
}

