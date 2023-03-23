import { takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes as applicationActions } from '../core/reducers/asyncServerResponseReducer';
import { freeSpinResponseService } from './../gameservice/freeSpinResponseService';

export function* freeSpinSaga(): Generator<any, any, any> {
    yield takeLatest(applicationActions.GET_APPLICATION_FREE_SPIN_RESPONSE, fireSpinResponse);
}

function* fireSpinResponse(): Generator<any, any, any> {
    try {
        let result_spin: any;
        result_spin = yield call(freeSpinResponseService.sendFreeSpinResponse);
        result_spin = result_spin.data.response;
        result_spin = JSON.parse(result_spin);
        if (localStorage.getItem("CheatPannel") == "true") {
            localStorage.setItem("CheatPannel", "false");
            localStorage.setItem("cheatModifiedRequest", "");
        }
        yield put({
            type: applicationActions.GET_APPLICATION_SPIN_SUCCESS,
            result_spin
        });
    } catch (error) {
        console.log("Error",error);
        yield put({
            type: applicationActions.GET_APPLICATION_SPIN_FAILURE,
            error
        });
    }
}

