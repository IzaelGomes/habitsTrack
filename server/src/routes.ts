import { FastifyInstance, FastifyRequest } from "fastify";
import dayjs from 'dayjs'
import { z } from "zod";

import { prismaClient } from "./lib/prisma";

type bodyType = {
  title: string,
  weekDays: number[],
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

  })
}
