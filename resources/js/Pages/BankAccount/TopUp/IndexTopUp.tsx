import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { useForm } from '@inertiajs/react'
import React, { SyntheticEvent } from 'react'
type balanceSchemeAdd = {
    balance: number
}
const IndexTopUp = () => {
    // tadinya mau pake midtrans tapi ngeri salah 
    const { data, setData, errors, post, processing } = useForm<balanceSchemeAdd>({
        balance: 0
    })

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        post(route(route().current() as string))
    }
    return (
        <div className=' flex min-h-screen justify-center items-center' >
            <div className='bg-stone-400 text-white py-4 px-4 rounded-xl flex flex-col gap-5' >
                <h1>TopUp</h1>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col mx-4 items-start' >
                        <InputLabel htmlFor="balance" className=' font-medium text-white' >Insert Balance</InputLabel>
                        <TextInput className='text-black' autoComplete='balance' isFocused={true} type="number" onChange={(e) => setData("balance", Number(e.target.value))} placeholder="value" id='balance' />
                        <InputError message={errors.balance} />
                    </div>
                    <div className='mt-5 flex justify-end gap-4'>
                        <div >
                            <PrimaryButton type='submit' disabled={processing} className='py-4 px-6 !bg-blue-400' >Pay</PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default IndexTopUp