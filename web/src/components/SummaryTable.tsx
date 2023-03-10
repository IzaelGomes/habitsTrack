import React from 'react'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { HabitDay } from './HabitDay'


export const SummaryTable = () => {

    const weekDays = [
    'D', 
    'S',
    'T',
    'Q',
    'Q',
    'S', 
    'S',
    ]
    const summaryDates = generateDatesFromYearBeginning()

    const minimunSummaryDatesSize = 18 * 7
    const amountOfDaysToFill = minimunSummaryDatesSize - summaryDates.length

  return (
    <div className='w-full flex'>
        <div className='grid grid-rows-7 grid-flow-row gap-3'>
            {weekDays.map( (weeks, index) => {
              return  (
              <div 
              key={`${weeks} - ${index}`} 
              className='text-zinc-400 text-xl hl-10 font-bold w-10 flex items-center justify-center'
              >
                {weeks}
              </div> 
              )
            })}
        </div>

           
        <div className='grid grid-rows-7 grid-flow-col gap-3'>
           
           {summaryDates.map(date => {
           return(
             <HabitDay key={`${date}`}/>
             )
           })}

           {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, i) => {
            return(
              <div key={i} className='w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'></div>
            )
           })}
         
        </div>
    </div>
  )
}

