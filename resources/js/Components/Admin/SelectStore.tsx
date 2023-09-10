import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import React from 'react'

const SelectStore = () => {
    const { mystores } = usePage<PageProps>().props;
    function handleOnChangeMyStore(e: React.ChangeEvent<HTMLSelectElement>) {
        // console.log(e.target.value);

        router.post(route('change_store'), {
            data: e.target.value
        })

    }
    return (
        <select defaultValue={Number(mystores.chosenStore)} onChange={handleOnChangeMyStore} className="select select-bordered w-full max-w-xs">
            <option value={0} disabled >Chosee Your Store</option>
            {
                mystores.stores.map((store, key) => (

                    <option key={key} value={Number(store.id)} >{store.store_name}</option>

                ))
            }
        </select>
    )
}

export default SelectStore