import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

const ProfileRedirectPage = async() => {
    const user = await getUserSession();
    return (
        redirect(`/profile/${user?.id}`)
    );
};

export default ProfileRedirectPage;