// redux/bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    fullName: '',
 
    phone: '',
    email: '',
    address: '',
    cityState: '',
    vehicleType: '',
    regNumber: '',
    purchaseDate: '',
    lastService: '',
    services: [],
    servicesOther: '',
    plan: '',
    mode: '',
    date: '',
    timeSlot: '',
    notes: '',
    agreeTerms: false,
    agreeRepair: false,
  },
  step: 1,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { name, value } = action.payload;
      state.form[name] = value;
    },
    toggleService: (state, action) => { 
        const service = action.payload;
        const index = state.form.services.indexOf(service);
        if (index > -1) {
          state.form.services.splice(index, 1); // remove it
        } else {
          state.form.services.push(service); // add it
        }
      },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    resetBookingForm: () => initialState,
  },
});

export const { updateFormField, setStep, resetBookingForm, toggleService } = bookingSlice.actions;
export default bookingSlice.reducer;
