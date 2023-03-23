import {takeLatest, put, call} from 'redux-saga/effects';
import {actionTypes as applicationActions} from '../core/reducers/asyncInitAction';
import {initResponseService} from './../gameservice/initResponseService'


export function* initSaga(): Generator<any, any, any> {
    yield takeLatest(applicationActions.GET_APPLICATION_INIT_RESPONSE, fireInitResponse);
}

function* fireInitResponse(): Generator<any, any, any> {
    try {
        const result = yield call(initResponseService.sendInitResponse);
        localStorage.setItem("cheatModifiedRequest", "");
        yield put({
            type: applicationActions.GET_APPLICATION_INIT_SUCCESS,
            result
        });
        yield put({
            type: applicationActions.GET_APPLICATION_INIT_SUCCESS,
            result
        });
    } catch (error) {
        console.log("Error",error);
        yield put({
            type: applicationActions.GET_APPLICATION_INIT_FAILURE,
            error
        });
    }
}

