import {takeLatest, put, call} from 'redux-saga/effects';
import {walletResponseService} from '../gameservice/walletResponseService';
import {actionTypes as gameLevelResponseActions} from "../gamereducer/asyncGameLevelServerResponseReducer";

export function* walletSaga(): Generator<any, any, any> {
    yield takeLatest(gameLevelResponseActions.GET_APPLICATION_WALLET_RESPONSE, fireWalletResponse);
}

function* fireWalletResponse(): Generator<any, any, any> {
    try {
        let wallet = yield call(walletResponseService.sendWalletResponse);
        yield put({
            type: gameLevelResponseActions.WALLET,
            wallet
        });
    } catch (error) {
        console.log("Error",error);
        yield put({
            type: gameLevelResponseActions.WALLET_FAILURE,
            error
        });
    }
}

