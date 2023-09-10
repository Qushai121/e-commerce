import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react'

const MyStoreNow = ({ className }: { className?: any }) => {
    const { mystores } = usePage<PageProps>().props;

    const chosenStoreName = mystores?.stores.filter((store) => {
        // console.log(store.id == Number(mystores.chosenStore));
        // console.log(store.id);
        // console.log(mystores.chosenStore);

        return store.id == Number(mystores.chosenStore)
    }).map((store, key) => store)

    return (
        <h1 className={className}>{chosenStoreName[0]?.store_name}</h1>
    )
}

export default MyStoreNow