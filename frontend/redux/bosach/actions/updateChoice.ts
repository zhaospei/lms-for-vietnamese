import { PayloadAction, current } from '@reduxjs/toolkit';
import { BoSachState } from '../bosachSlice';
import { TenBoSach } from '@/components/common/ChooseBook';
import Fetcher from '@/api/Fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';

export function updateChoice(state: BoSachState, action: PayloadAction<TenBoSach>) {
    state.currentChoice = action.payload
    let book = 0
    if (action.payload == "Cánh diều") {
        book = 1
    } else if (action.payload == "Kết nối tri thức") {
        book = 2
    } else if (action.payload == "Chân trời sáng tạo") {
        book = 3;
    }
    Fetcher.post<any, any>('/users/changeBook/', {
        "book": book,
      }).then((response : any) => {
        if (response == "changed successfully!") {
            localStorage.setItem('bosach', action.payload);
        }
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    
    // state.signedIn = action.payload.signedIn
}
