import { TenBoSach } from "@/components/common/ChooseBook";
import { createSlice } from "@reduxjs/toolkit";
import { updateChoice } from "./actions/updateChoice";

export interface BoSachState {
    currentChoice: TenBoSach | undefined
}

const initialState: BoSachState = {
    currentChoice: localStorage.getItem('bosach') as TenBoSach || undefined
}

export const {reducer: boSachReducer, actions: boSachActions} = createSlice({
    name: 'bosach',
    initialState,
    reducers: {
        updateChoice
    }
})

