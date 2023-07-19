'use client'
import { useState } from "react"
import PersonalInfoForm from "../../components/FormComponents/Forms/PersonalInfoForm"
import { multiModalType, multiStepFormDataType } from "@/types/FormTypes"
import MultiStepForm from "@/components/FormComponents/MultiStepForm"
import SelectPlanForm from "@/components/FormComponents/Forms/SelectPlanForm"
import AddsOnForm from "@/components/FormComponents/Forms/AddsOnForm"
import FinishingUp from "@/components/FormComponents/Forms/FinishingUp"

const initialState: multiStepFormDataType = {
    userInfo: {
        name: '',
        email: '',
        phone: { 
                 number: '',
                 countryData: {
                    name: '',
                    phoneCode: '',
                    shortName: ''
                }
               }
    },
    selectedPlan: {
        plan: {
            name: '',
            price: 0
        },
        planDuration: ''
    },
    addsOn: []
}

export const yearWithDiscond: number = 10 // 12 months - 2 months free

const MultiStepPage = () => {
    const [ canContinue, setCanContinue ] = useState(false)
    const [ controls, setControls ] = useState(false)
    const [ orderedForm, setGoToForm ] = useState<number | undefined>()
    const [ data, setData ] = useState(initialState)

    /* 
        Put every tabable elements inside the form.
        The MultiStepForm has a system that make untabable all the elements inside of the Form's form to prevent the view
        slides to the next Form component when the last tab of the current view
    */
    const Forms: multiModalType = [
        {
            formLabel: 'YOUR INFO',
            form: <PersonalInfoForm key='PersonalInfoForm' setContinue={setCanContinue} saveData={setData} data={data.userInfo} />
        },
        {
            formLabel: 'SELECT PLAN',
            form: <SelectPlanForm key='SelectPlanForm' setContinue={setCanContinue} saveData={setData} data={data.selectedPlan} />
        },
        {
            formLabel: 'ADD-ONS',
            form: <AddsOnForm key='AddsOnForm' duration={data.selectedPlan.planDuration} setContinue={setCanContinue} saveData={setData} data={data.addsOn} />
        },
        {
            formLabel: 'SUMMARY',
            form: <FinishingUp key='SummaryForm' data={data} setGoToForm={setGoToForm} controlState={[controls, setControls]} />
        },
    ]
    
    return(
        <div id='page-container' className='h-full bg-slate-200 flex justify-center items-center'>
            <MultiStepForm Forms={Forms} continueState={[canContinue, setCanContinue]} goToForm={orderedForm} setGoToForm={setGoToForm} disableControls={controls}/>
        </div>
    )
}

export default MultiStepPage