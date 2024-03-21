import { PayloadAction, current } from '@reduxjs/toolkit';
import { BoSachState } from '../bosachSlice';
import { TenBoSach } from '@/components/common/ChooseBook';

export function updateChoice(state: BoSachState, action: PayloadAction<TenBoSach>) {
    state.currentChoice = action.payload;
    localStorage.setItem('bosach', action.payload);
    // state.signedIn = action.payload.signedIn
}
