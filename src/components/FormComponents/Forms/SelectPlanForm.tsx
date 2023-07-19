import { FormPlanCheckbox, FormPlanPeriodCheckbox } from "@/components/FormComponents/Components/FormInput"
import { multiStepFormDataType, planInputValuesType, selectedPlanType } from "@/types/FormTypes"
import { FormEvent, useCallback, useMemo, useState } from "react"
import arcadeIcon from '../../../../public/icon-arcade.svg'
import advancedIcon from '../../../../public/icon-advanced.svg'
import proIcon from '../../../../public/icon-pro.svg'

//Simulate that this data is getted from a Backed, getting the current plans available and the current price
const fetchedPlansData: planInputValuesType[] = [
    {
        name: 'Arcade',
        price: 9,
        imageUrl: arcadeIcon
    },
    {
        name: 'Advanced',
        price: 12,
        imageUrl: advancedIcon
    },
    {
        name: 'Pro',
        price: 15,
        imageUrl: proIcon
    },
]

type errorType = {
    errorPlan?: string
    errorPlanDuration?: string
}

const SelectPlanForm = ({ data, saveData, setContinue }: { data: selectedPlanType, saveData: React.Dispatch<React.SetStateAction<multiStepFormDataType>>,
                                   setContinue: (x: boolean) => void }) => {
    const { plan, planDuration } = data
    const [ errorMessages, setErrorMessages ] = useState<errorType>({})

    const setPlan = useCallback((planName: string, price: number) => {
        const selectedPlan: selectedPlanType = {
            planDuration,
            plan: {
                name: planName,
                price: price
            }
        }

        saveData(prev => ({
            ...prev,
            selectedPlan
        }))
        setErrorMessages({})
    }, [planDuration, saveData])

    const planCheckboxes = useMemo(() => fetchedPlansData.map(({ name, imageUrl, price}) =>{
        const durationTxt = planDuration === 'yearly' ? 'yr' : 'mo'
        const selected = plan.name === name

        return <FormPlanCheckbox key={name} name={name} selected={selected} setPlan={setPlan}
                                 urlImage={imageUrl} price={price} duration={durationTxt}/>
    }), [plan.name, planDuration, setPlan])

    function changeDuration(duration: string ){
        const selectedPlan: selectedPlanType = {
            plan,
            planDuration: duration === 'toggle' ? 
                                planDuration === 'monthly' ? 'yearly' : 'monthly' 
                            : 
                                duration
        }

        saveData(prev => ({
            ...prev,
            selectedPlan
        }))
        setErrorMessages({})
    }

    function checkValidValues(e: FormEvent<HTMLFormElement>){
        e.preventDefault()

        //Data validation here
        if(!plan.name)
            return setErrorMessages({ errorPlan: 'Select a plan please' })
        if(!planDuration)
            return setErrorMessages({ errorPlanDuration: 'Select the payment period' })

        setContinue(true)
    } 

    return(
        <div className='flex flex-col'>
            <div className='mb-4 lg:mb-8'>
                <h2 className='font-semibold text-marine-blue text-[2rem] leading-8 mb-3 sm-lg:text-2xl'>
                    Select your plan
                </h2>
                <p className='text-cool-gray sm-lg:text-base'>
                    You have the option of monthly or yearly billing.
                </p>
            </div>
            <form onSubmit={checkValidValues} noValidate className='flex flex-col grow'>

                <div className='flex grow flex-col mb-6 mt-2'>
                    <fieldset className={`flex grow flex-col sm-lg:auto lg:flex-row lg:[&>:nth-child(3n)]:mr-0 flex-w
                                         ${ errorMessages.errorPlan ? ' [&>label>div]:border-strawberry-red' : '' }`}>
                        { planCheckboxes }
                    </fieldset>
                    { errorMessages.errorPlan && <p className='text-right text-base lg:text-lg font-medium text-strawberry-red mt-1 mr-1'>{ errorMessages.errorPlan }</p> }
                </div>

                <FormPlanPeriodCheckbox duration={planDuration || ''} handleChange={changeDuration} errorMessage={errorMessages.errorPlanDuration} />

            </form>
        </div>
    )
}

export default SelectPlanForm