import {takeLatest, put, call} from 'redux-saga/effects';
import {increaseBetResponseService} from './../gameservice/increaseBetResponseService';
import {actionTypes as gameLevelResponseActions} from "../gamereducer/asyncGameLevelServerResponseReducer";

export function* increaseBetSaga(): Generator<any, any, any> {
    yield takeLatest(gameLevelResponseActions.GET_APPLICATION_INCREASE_BET_RESPONSE, fireIncreaseBetResponse);
}

function* fireIncreaseBetResponse(): Generator<any, any, any> {
    try {
        let increase_bet = yield call(increaseBetResponseService.sendIncreaseBetResponse);
        increase_bet = increase_bet.data.response;
        increase_bet = JSON.parse(increase_bet);
        yield put({
            type: gameLevelResponseActions.BET_INCREASE,
            increase_bet
        });

    } catch (error) {
        console.log("Error",error);
        yield put({
            type: gameLevelResponseActions.BET_INCREASE_FAILURE,
            error
        });
    }
}

