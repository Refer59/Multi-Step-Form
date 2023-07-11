'use client'
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import arrowIcon from "@/assets/images/icon-arrow.svg"

type numberSelectInputTypes = {
    name: string
    integerRange: [number, number]
    handleChange: Dispatch<SetStateAction<any>>
    reverse?: boolean
    value?: number
}

const NumberSelectInput = ({ name, integerRange, handleChange, reverse, value }: numberSelectInputTypes) => {
    const range = useMemo(() => {
                                    const arr = Array.from({ length: integerRange[1] - integerRange[0] + 1 },
                                             (x, i) => integerRange[0]+i)
                                    return reverse ? arr.reverse() : arr
                                }, [integerRange, reverse])
    const [ isListOpen, setListState ] = useState(false)
    const listRef = useRef<any>(null)

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            if(e.target.value.length === 0)
                return handleChange( (prev: object) => ({ ...prev, [name]: '' }) )
            const numberValue = Number.parseInt(e.target.value)
            let maxMinRangeValuePrevention = 0

            if(numberValue >= integerRange[1])
                maxMinRangeValuePrevention = integerRange[1]
            else if(numberValue <= integerRange[0] && 
                    e.target.value.length === integerRange[0].toString().length )
                maxMinRangeValuePrevention = integerRange[0]
            handleChange( (prev: object) => ({ ...prev, [name]: maxMinRangeValuePrevention || numberValue }) )
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [integerRange])

    const handleListSelection = useCallback((e: any) => {
            handleChange((prev:object) => ({ ...prev, [name]: Number.parseInt(e.target.innerHTML) }))
            e.currentTarget.parentElement.blur()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [integerRange])
    
    return(
        <div className='w-auto inline-flex relative flex-col items-start font-poppins font-bold'>
            <label htmlFor={name} className='text-smokey-grey text-xs uppercase tracking-[0.2rem] mb-1'>
                { name }
            </label>
            <input name={name} 
                type='number' 
                value={value}
                onClick={e => e.currentTarget.select()}
                onKeyDown={e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                onChange={handleInputChange}
                className='w-full border-light-grey h-[50px] border-2 rounded-md text-xl outline-none p-[3px] pr-[15px] text-center'/>

            <div onClick={() => { listRef.current?.focus(); setListState(true) }}
                className='h-[46px] absolute bottom-[2px] px-[2px] flex items-center rounded-r-[4px] right-[2px] bg-gray-100
                           overflow-hidden cursor-pointer'>
                <p className='rotate-90 text-smokey-grey text-base select-none'>&gt;</p>
            </div>
            <div tabIndex={-1} ref={listRef} onBlur={() => setListState(false)}
                onClick={e => e.currentTarget.blur() }
                className={`${ isListOpen ? 'xsm:h-full sm:h-[150px]' : 'h-0'} outline-none sm:absolute bg-[rgba(0,0,0,0.25)] sm:top-full sm:left-2 sm:overflow-y-auto rounded-b-md  
                           shadow-md text-gray-500 z-10 sm:max-h-[150px] sm:w-[calc(100%-23px)] xsm:flex xsm:justify-center xsm:items-center
                           xsm:w-full fixed xsm:top-1/2 xsm:left-1/2 xsm:-translate-x-2/4 xsm:-translate-y-2/4`}>
                <ul onClick={handleListSelection} className={`bg-[#f7f7f7] xsm:max-h-[65%] overflow-y-auto xsm:w-[65%] ${ isListOpen ? 'xsm:py-2' : null }`}>
                {
                    isListOpen
                        ? range.map(value => <li key={`${name}-${value}`}
                                           className='hover:cursor-pointer hover:text-black text-center py-2'>
                                            { value }
                                        </li>
                                )
                        :
                    null
                }
                </ul>
            </div>
        </div> 
    )
}

const secondsYear = 31536000 * 1000 // * 1000 because JS UNIX uses miliseconds
const secondsMonth = 2628288 * 1000
const secondsDay = 86400 * 1000

function getArrayDDMMYYYY(date: Date){
    const difference = new Date().getTime() - date.getTime()
    const remainer = difference % secondsYear % secondsMonth % secondsDay
    return {
            date: { 
                    year: Math.floor(difference / secondsYear), 
                    month: Math.floor(difference % secondsYear / secondsMonth), 
                    day: Math.floor(difference % secondsYear % secondsMonth / secondsDay)  
                },
            remainer
            }
}

const AgeCalculator = () => {
    const dateToday = new Date()
    const initialData = {
        day: dateToday.getDate(),
        month: dateToday.getMonth()+1,
        year: dateToday.getFullYear()
    }
    const [ data, setData ] = useState(initialData)
    const dateObj = getArrayDDMMYYYY(new Date(data.year, data.month - 1, data.day))
    const isInputEmpty = !data.day || !data.month || !data.year
    const isDateBiggerThanToday = dateObj.remainer < 0 

    return <div id='page-container' className='h-full bg-gray-200 p-4 pt-20 sm:pt-0 sm:flex sm:items-center sm:justify-center'>
        <section className='bg-white p-5 sm:px-10 rounded-3xl rounded-br-[116px] max-w-xl sm:w-full'>
            <article className='max-w-[22rem]'>
                <form className='flex justify-between [&>div]:mr-4 [&>*:last-child]:mr-0 my-4 sm:mb-0'>
                    <NumberSelectInput name='day' integerRange={[1, data.year === initialData.year && data.month === initialData.month ? initialData.day : new Date(data.year, data.month, 0).getDate()]} handleChange={setData} value={data.day} />
                    <NumberSelectInput name='month' integerRange={[1, data.year === initialData.year ? initialData.month : 12 ]} handleChange={setData} value={ data.month }/>
                    <NumberSelectInput name='year' integerRange={[1900, initialData.year]} handleChange={setData} reverse value={data.year}/>
                </form>
            </article>
            <div className='flex h-16 items-center justify-center flex-col mt-8 mb-4 sm:mt-0 relative'>
                <div className='bg-purple inline-flex items-center justify-center rounded-full w-16 h-16 absolute right-[calc(50%-32px)] sm:right-0 transition-all duration-1000'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44" className='h-1/3'>
                        <g fill="none" stroke="#FFF" strokeWidth="2" className='stroke-[4]'>
                            <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
                        </g>
                    </svg>
                </div>
                <hr className='w-full'/>
            </div>
            <article className='font-poppins font-bold italic my-6 [&>p>span]:text-purple'>
                {   isInputEmpty || isDateBiggerThanToday ||
                    data.day === initialData.day && data.month === initialData.month && data.year === initialData.year ?
                    <p className='text-4xl text-deep-gray-purple'>{  isInputEmpty ? 'Give a complete Date' : (isDateBiggerThanToday ? 'The given Date is bigger than today' :  'Give a different Date')}</p>
                    :
                    <>  
                        { 
                            Object.entries(dateObj.date)
                                .map(value => 
                                    <p className='text-5.5 sm:text-[4rem]' key={value[0] + value[1]}>
                                        <span>{ value[1]+' '}</span>
                                        { value[0] + (value[1] > 1 ? 's' : '')}
                                    </p>
                                )
                        }
                    </>
                }
            </article>
        </section>
    </div>
}

export default AgeCalculator