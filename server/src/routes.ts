import { FastifyInstance, FastifyRequest } from "fastify";
import dayjs from 'dayjs'
import { z } from "zod";

import { prismaClient } from "./lib/prisma";
import { prisma } from "@prisma/client";

type bodyType = {
  title: string,
  weekDays: number[],
}

type queryRequest = {
  date: string
}

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request:FastifyRequest<{Body:bodyType}>, reply) => {
    /*const createHabitBody = z.object({ 
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });*/

    const { title, weekDays } = request.body   
    console.log(request.body)

    const today = dayjs().startOf('day').toDate()
 
    await prismaClient.habit.create({
      data: {
        title,
        created_at: today,
        HabitWeekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: weekDay,
            };
          }),
        },
      },
    });
  });


  app.get('/day', async (request) => {
    
   
   // const convertedDate = new Date(date)
    const getDayParams = z.object({
      date: z.coerce.date()
    })
    const {date} = getDayParams.parse(request.query) 

    const parseDate = dayjs(date).startOf('day')
    const weekDay  = parseDate.get('day')
   
   
    // todos hábitos possíveis
    // hábitos que já foram completados

    const possibleHabits = await prismaClient.habit.findMany({
      where:{
        created_at:{
          lte:date, 
        }, 
        HabitWeekDays:{
          some:{
            week_day: weekDay
          }
        }
      }
    })

    console.log(parseDate, parseDate.toDate())

   const day = await prismaClient.day.findUnique({
    where:{
      date:parseDate.toDate()
    }, 
    include:{
       dayHabits:true
    }
   })

   const completedHabits = day?.dayHabits.map((dayHabit) => {
    return dayHabit.habit_id
   })

   console.log(day)
    return {
      possibleHabits, 
      completedHabits
    }
  })


  //completar / não-completar um habito 

  app.patch('/habits/:id/toggle', async (request:FastifyRequest<{Params:{id:string}}>) => {
    // route parm => parâmentro de identificação

    const {id} = request.params

    const today = dayjs().startOf('day').toDate()

    let day = await prismaClient.day.findUnique({
      where:{
        date: today
      }
    })
    
    if (!day) {
      day = await prismaClient.day.create({
        data:{
          date:today
        }
      })
    }

  })
}
