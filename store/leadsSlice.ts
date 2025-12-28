import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  role: string;
}

const initialState: Lead[] = [];

export const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Lead>) => {
      state.push(action.payload);
    },

    deleteLead: (state, action: PayloadAction<string>) => {
      return state.filter((lead) => lead.id !== action.payload);
    },
  },
});

export const { addLead, deleteLead } = leadsSlice.actions;
export default leadsSlice.reducer;
