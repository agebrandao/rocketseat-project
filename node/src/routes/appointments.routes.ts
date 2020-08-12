import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentRepository  from '../repositories/AppointmentsRepository';

const appointmentsRouter= Router();

const appointmentsRepository = new AppointmentRepository();

//POST http://localhost:3333/appointments
appointmentsRouter.post('/', (request, response) =>{

    const { provider, date } = request.body;

    //ParseISO: converte a string em data
    //StartOfHour: hora 00:00:00
    const parsedDate = startOfHour(parseISO(date)); 

    const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);
    
    if(findAppointmentInSameDate){
        return response.status(400).json({ message: 'This appointment is alredy booked' })
    }
   
    const appointment = appointmentsRepository.create(provider, parsedDate);

    return response.json({ appointment });
});

export default appointmentsRouter;