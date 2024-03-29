import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/src/style.css';
import dayjs from "dayjs";
import "./Daypicker.css";

export const DayPickerComponent = ({ selectedDay, handleDateTimeSelect }) => {
    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleDaySelect = (selectedDay) => {
        const formattedDay = dayjs(selectedDay).format("YYYY-MM-DD")
        const selectedDateTime = `${formattedDay} ${selectedTime}`;
        handleDateTimeSelect(selectedDateTime);
    };

    return (
        <div className='daypickerDesign rdp-button'>
            <div>{handleDaySelect}</div>
            <div>
                <input
                    type="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    required
                />
                <DayPicker
                    selected={selectedDay}
                    onDayClick={handleDaySelect}
                />

                {/* {selectedDay && (
                    <p>Selected day: {selectedDay}</p>
                )} */}
            </div>
        </div>
    );
};

