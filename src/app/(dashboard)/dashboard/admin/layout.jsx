import { requireRole } from '@/lib/core/session';

export const dynamic = 'force-dynamic';
const AdminLayout = async({children}) => {
    await requireRole("admin");
    return children;
};

export default AdminLayout;