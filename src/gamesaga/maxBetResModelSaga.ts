import {takeLatest, put, call} from 'redux-saga/effects';
import {maxBetResponseService} from './../gameservice/maxBetResponseService';
import {actionTypes as gameLevelResponseActions} from "../gamereducer/asyncGameLevelServerResponseReducer";

export function* maxBetSaga(): Generator<any, any, any> {
    yield takeLatest(gameLevelResponseActions.GET_APPLICATION_MAX_BET_RESPONSE, fireMaxBetResponse);
}

function* fireMaxBetResponse(): Generator<any, any, any> {
    try {
        let max_bet = yield call(maxBetResponseService.sendMaxBetResponse);
        max_bet = max_bet.data.response;
        max_bet = JSON.parse(max_bet);
        yield put({
            type: gameLevelResponseActions.BET_MAX,
            max_bet
        });
    } catch (error) {
        console.log("Error",error);
        yield put({
            type: gameLevelResponseActions.BET_MAX_FAILURE,
            error
        });
    }
}

