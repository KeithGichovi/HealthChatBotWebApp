import React, { useState, useEffect, useContext } from 'react';
import Navbar from "../../components/Navbar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { ThemeContext } from "../../contexts/ThemeContext";
import AnimatedCursor from "react-animated-cursor";
import { AuthContext } from "../../contexts/AuthContext";

const localizer = momentLocalizer(moment);


const Appointments = () => {

    const [appointments, setAppointments] = useState([]);
    const { auth } = useContext(AuthContext);
    const { isDarkTheme } = useContext(ThemeContext);

    useEffect(() => {
        if (auth) {
            fetchAppointments();
        }
    }, [auth]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/appointments", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            const formattedAppointments = data.map(appointment => ({
                ...appointment,
                start: new Date(appointment.start),
                end: new Date(appointment.end),
            }));

            setAppointments(formattedAppointments);
        } catch (error) {
            console.error("Error fetching appointments: ", error);
        }
    };

    function getCalendarStyles(isDarkTheme) {
      const commonStyles = {
        height: 800,
        width: 'auto',
        justifyContent: 'center',
        color: 'black',
        paddingRight: 40,
        paddingLeft: 40,
        cursor: "pointer",
        transitionTimingFunction: "ease-in-out",
        transitionDuration: '300ms',
      };

      const darkThemeStyles = {
        backgroundColor: '#0C1821',
        color: 'white'
      };

        return isDarkTheme ? { ...commonStyles, ...darkThemeStyles } : commonStyles;
    }

    const calendarStyles = getCalendarStyles(isDarkTheme);


    return (
        <>
            <Navbar/>
            <div className={`h-screen ease-in-out duration-300 ${isDarkTheme ? 'bg-[#0C1821] text-white' : 'text-gray-900'}`}>
                <AnimatedCursor/>
                <Calendar
                    localizer={localizer}
                    events={appointments}
                    showAllEvents={true}
                    views={[Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]}
                    defaultView="month"
                    style={calendarStyles}

                />
            </div>
        </>
    )
}

export default Appointments;