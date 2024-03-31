import React, { useState } from 'react';
import './AppointmentForm.css';
import { DayPickerComponent } from '../../common/Daypicker/Daypicker';

export const AppointmentForm = () => {
    const [selectedDateTime, setSelectedDateTime] = useState('');

    const handleDateTimeSelect = (dateTime) => {
        localStorage.setItem("dateTime", dateTime)
        setSelectedDateTime(dateTime);
    };

    return (
        <div className="appointment-form">
            <div className="form-group daypickerDesign">
                <DayPickerComponent
                    selectedDay={selectedDateTime}
                    handleDateTimeSelect={handleDateTimeSelect}
                />
            </div>
        </div>
    );
};


