import applyTheme from './change-theme';
import applyNoDataNotice from './no-data-notice';
import loadStoredData from './localStorage-load';
import buildOnLoad from './localStorage-build';

// This module gathers functions that should execute on load

export function initialLoad() {
    applyTheme();
    loadStoredData();
    buildOnLoad();
    applyNoDataNotice();
}
