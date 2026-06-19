import { requireRole } from '@/lib/core/session';


export const dynamic = 'force-dynamic';
const RecruiterLayout = async({children}) => {
    await requireRole("recruiter");
    return (
        <div>
            {children}
        </div>
    );
};

export default RecruiterLayout;