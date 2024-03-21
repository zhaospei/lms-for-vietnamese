import { TenBoSach } from "@/components/common/ChooseBook";
import { RootState } from "../store";

export const boSachSelector = {
    selectChoice: (state: RootState): TenBoSach | undefined => state.boSach.currentChoice
}

