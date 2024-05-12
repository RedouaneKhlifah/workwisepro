import asynchandler from "express-async-handler";
import Calendar from "../models/CalendarModal.js";
import calendarSchema from "../validators/CalendarSchema.js";
import validator from "../validators/JoiSchemas.js";

const fetchCalendar = asynchandler(async (req, res) => {
    const CalendarDates = await Calendar.find({ userId: req.user._id });
    res.json(CalendarDates);
});

const ceateDateCalender = asynchandler(async (req, res) => {
    const validationErrors = validator(
        calendarSchema.CreateCalendarSchema,
        req.body
    );

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }

    const { start, end, title } = req.body;
    const calendarData = {
        start,
        end,
        title
    };

    const calendarDate = await Calendar.create({
        ...calendarData,
        userId: req.user._id
    });
    res.json(calendarDate);
});

const updateDateCalender = asynchandler(async (req, res) => {
    const validationErrors = validator(
        calendarSchema.CreateCalendarSchema,
        req.body
    );

    if (validationErrors) {
        res.status(400).json({ errors: validationErrors });
        return;
    }
    const { id } = req.params;
    const userId = req.user._id;

    // Check if the Calendar document exists
    const calendarDate = await Calendar.findOne({ _id: id, userId });
    if (!calendarDate) {
        return res.status(404).json({ message: "CalendarDate not found" });
    }

    const { start, end, title } = req.body;
    const calendarData = {
        start,
        end,
        title
    };

    // Update the Calendar document
    const updatedCalendarDate = await Calendar.findByIdAndUpdate(
        { _id: id, userId },
        calendarData,
        { new: true }
    );

    res.json(updatedCalendarDate);
});

const DeleteDateCalender = asynchandler(async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;
    const calendarEvent = await Calendar.findOne({ _id: id, userId });
    if (!calendarEvent) {
        return res.status(404).json({ message: "Calendar event not found" });
    }
    await Calendar.findByIdAndDelete({ _id: id, userId });
    res.json({ message: "Calendar event deleted successfully" });
});

const CalendarMethods = {
    fetchCalendar,
    ceateDateCalender,
    updateDateCalender,
    DeleteDateCalender
};

export default CalendarMethods;
