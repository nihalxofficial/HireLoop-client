import { requireRole } from '@/lib/core/session';

export const dynamic = 'force-dynamic';
const SeekerLayout = async({children}) => {
    await requireRole("seeker");
    return children;
};

export default SeekerLayout;