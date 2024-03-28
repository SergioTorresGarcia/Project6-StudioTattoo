import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/src/style.css';

import "./Daypicker.css"


export const DayPickerComponent = ({ selectedDay, handleDayClick }) => {
    return (
        <div className='daypickerDesign'>
            <DayPicker
                selected={selectedDay}
                onDayClick={handleDayClick}
            />
            {selectedDay && (
                <p>Selected day: {selectedDay.toLocaleDateString()}</p>
            )}
        </div>
    );
};