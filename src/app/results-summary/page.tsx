import { ReactNode, useCallback } from "react"
import data from "../../../Results summary component/data.json"
import ReactionIcon from "@/assets/images/icon-reaction.svg"
import MemoryIcon from "@/assets/images/icon-memory.svg"
import VerbalIcon from "@/assets/images/icon-verbal.svg"
import VisualIcon from "@/assets/images/icon-visual.svg"
import Image from 'next/image';

type categoryType = {
    category: string,
    score: number,
    icon: string
}

const CategoryElement = ({ icon, category, color, bgColor, score }: { icon: any, category: string,
                                                                      color: string, bgColor: string, score: number}) => {
    return(
        <li className={`flex flex-row rounded-lg p-3 my-4 ${bgColor}`}>
            <Image src={icon} alt="Reaction Icon" className='mr-2'/>
            <div className='flex items-center justify-between flex-grow'>
                <p className={`font-semibold text-base ${color}`}>{ category }</p>
                <p className='text-base'><strong className='text-gray-800'>{score}</strong><span className='text-black/40 font-semibold'> / 100</span></p>
            </div>
        </li>
    )
}

function renderCategoryWithStyle(categoryData: categoryType): ReactNode | null {
    const { category, icon, score } = categoryData

    if(category && icon && score)
        switch(category.toLocaleLowerCase()){
            case "reaction": return <CategoryElement icon={ReactionIcon} category='Reaction' bgColor='bg-light-red-transparent'
                                                     score={score} color='text-light-red' />
            case "memory": return <CategoryElement icon={MemoryIcon} category='Memory' bgColor='bg-orangey-yellow-transparent'
                                                     score={score} color='text-orangey-yellow' />
            case "verbal": return <CategoryElement icon={VerbalIcon} category='Verbal' bgColor='bg-green-teal-transparent'
                                                     score={score} color='text-green-teal' />
            case "visual": return <CategoryElement icon={VisualIcon} category='Visual' bgColor='bg-cobalt-blue-transparent'
                                                     score={score} color='text-cobalt-blue' />
        }

    return null
}

function getAverageResult(data: categoryType[]){
    return Math.round(data.reduce((accumulator, category) => {return accumulator + category.score}, 0) / data.length)
}

const ResultSummary = () => {
    return(
        <div id='page-container' className='lg:flex lg:items-center lg:justify-center'>
            <div className='w-full flex font-hanken-grotesk flex-col overflow-hidden sm:px-[5vw] lg:flex-row lg:bg-white lg:rounded-3xl lg:drop-shadow-2xl lg:w-[600px]'>
                <div className='min-w-full flex flex-col items-center rounded-b-3xl bg-gradient-to-b from-light-slate-blue to-light-royal-blue text-center
                                px-4 pt-4 pb-8 text-white lg:justify-around lg:rounded-3xl lg:min-w-half'>
                    <h4 className='text-white/60 text-[1.1rem] mb-5'>Your result</h4>
                    <div className='rounded-full flex bg-gradient-to-b from-violet-blue to-persian-blue relative p-16 items-center justify-center'>
                        <div className='absolute'>
                            <p className='text-5xl font-extrabold my-2'>{ getAverageResult(data) }</p>
                            <p className='text-white/40 text-base'>of 100</p>
                        </div>
                    </div> 
                    <div>
                        <p className='font-bold text-2xl my-3'>Great</p>
                        <p className='text-white/70 text-[0.95rem] leading-5 min-w-[16rem] w-min'>You scored higher than 65% of the people who have taken these tests.</p>
                    </div>
                </div>
                <div className='min-w-full px-6 py-4 flex-grow-1 flex-nowrap row overflow-y-auto sm:px-8 lg:min-w-half'>
                    <h4 className='font-bold text-lg'>Summary</h4>
                    <ul>
                        { 
                            data.map(category => renderCategoryWithStyle(category))
                        }
                    </ul>
                    <div className='rounded-full bg-dark-gray-blue'>
                        <button className='before:bg-gradient-to-b before:from-light-slate-blue before:to-light-royal-blue before:block before:w-full before:h-full before:absolute before:top-0 before:left-0
                                            before:rounded-full before:z-[-1] z-[1] relative p-3 w-full font-bold text-base my-3 text-white block before:opacity-0 before:transition-all hover:before:opacity-100'>
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultSummary