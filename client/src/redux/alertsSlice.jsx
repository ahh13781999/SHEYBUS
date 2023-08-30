import { createSlice } from "@reduxjs/toolkit"

const alertSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    ShowLoading: (state, action) => {
      state.loading = true
    },
    HideLoading: (state, action) => {
      state.loading = false
    },
  },
})

export const { HideLoading, ShowLoading } = alertSlice.actions
export default alertSlice.reducer
