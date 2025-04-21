import applyTheme from './change-theme';
import applyNoDataNotice from './no-data-notice';

// This module gathers functions that should execute on load

export function initialLoad() {
    applyTheme();
    applyNoDataNotice();
}
