import { FormEvent, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { PageProps } from '@/types';

const AddAvatarForm = ({ className = '' }) => {
    const user = usePage<PageProps>().props.auth.user;
    const [previewImage, setPreviewImage] = useState<string>()

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        avatar: Blob
    });

    function handleImage(params: React.ChangeEvent<HTMLInputElement>) {
        if (params.target.files && params.target.files[0]) {
            const data = URL.createObjectURL(params.target.files[0]);
            setPreviewImage(data);
            setData('avatar', params.target.files[0])
        }
    }

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('profile.updateAvatar'))
    };


    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Picture</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile Picture
                </p>
            </header>
            <div className='mt-4'>
                <img className='w-52 h-44 rounded-lg object-cover' src={`/storage/${user.avatar}`} alt={user.avatar?.split('/')[1]} />
            </div>
            <form onSubmit={submit} className="mt-6 space-y-6" encType='multipart/form-data'>
                <div>
                    <InputLabel htmlFor="avatar" value="Avatar" />
                    <TextInput
                        id="avatar"
                        type="file"
                        className="mt-1 block !w-[40%]"
                        onChange={handleImage}
                    />
                    <InputError message={errors.avatar} className="mt-2" />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    )
}

export default AddAvatarForm