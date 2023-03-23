import { takeLatest, put, call } from 'redux-saga/effects';
import { actionTypes as applicationActions } from '../gamereducer/actionReducer';
import { actionResponseService } from './../gameservice/actionResponseService'

export function* actionSaga(): Generator<any, any, any> {
    yield takeLatest(applicationActions.GET_APPLICATION_ACTION_RESPONSE, fireActionResponse);
}

function* fireActionResponse(): Generator<any, any, any> {
    try {
        let result = yield call(actionResponseService.sendActionResponse);
        result = result.data.response;
        result = JSON.parse(result);
        yield put({
            type: applicationActions.GET_APPLICATION_ACTION_SUCCESS,
            result
        });
    } catch (error) {
        console.log("Error",error);
        yield put({
            type: applicationActions.GET_APPLICATION_ACTION_FAILURE,
            error
        });
    }
}

