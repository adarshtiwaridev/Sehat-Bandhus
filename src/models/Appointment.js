const mongoose = require('mongoose');

// /Users/pankajpratapsingh/_SehatBandhu/src/models/Appointment.js

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
    '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
    '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'
];

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    patientAge: {
        type: Number,
        required: true,
        min: 0,
        max: 150
    },
    patientGender: {
        type: String,
        enum: GENDERS,
        required: true
    },

    // The day selected (e.g., "Monday")
    appointmentDay: {
        type: String,
        enum: DAYS_OF_WEEK,
        required: true
    },

    // Stored as dd/mm/yyyy string to match UI requirement.
    // Example: "31/12/2025"
    appointmentDate: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // dd/mm/yyyy basic validation (does not check for invalid dates like 31/02)
                return /^\d{2}\/\d{2}\/\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid date. Use dd/mm/yyyy format.`
        }
    },

    // Selected time slot, e.g., "09:00-10:00"
    appointmentTimeSlot: {
        type: String,
        enum: TIME_SLOTS,
        required: true
    },

    // Optional free-form comment
    comment: {
        type: String,
        trim: true,
        maxlength: 2000,
        default: ''
    },

    // Symptoms described by patient (can be a short text or comma-separated values)
    symptoms: {
        type: String,
        trim: true,
        maxlength: 2000,
        default: ''
    }
}, {
    timestamps: true
});

// Export model and helper option lists for building select inputs in the UI
// Export model and helper option lists for building select inputs in the UI
appointmentSchema.statics.GENDERS = GENDERS;
appointmentSchema.statics.DAYS_OF_WEEK = DAYS_OF_WEEK;
appointmentSchema.statics.TIME_SLOTS = TIME_SLOTS;

module.exports = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
