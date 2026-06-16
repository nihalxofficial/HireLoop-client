import { stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/core/session';
import CheckoutSuccessClient from './CheckoutSuccessClient';

const CheckoutSuccessPage = async ({ searchParams }) => {
    const { session_id } = await searchParams;
    const user = await getUserSession();
    
    let sessionData = null;
    
    if (session_id) {
        try {
            // Retrieve the Stripe session with expanded data
            const session = await stripe.checkout.sessions.retrieve(session_id, {
                expand: ['line_items', 'customer_details']
            });
            
            sessionData = {
                planName: session.metadata?.planName || "Premium",
                amountTotal: session.amount_total,
                currency: session.currency,
                customerEmail: session.customer_details?.email,
                status: session.status,
                sessionId: session_id
            };
        } catch (error) {
            console.error("Error fetching session:", error);
        }
    }
    
    return <CheckoutSuccessClient sessionData={sessionData} user={user} />;
};

export default CheckoutSuccessPage;