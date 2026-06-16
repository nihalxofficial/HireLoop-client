// app/payment/success/page.jsx
import { stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/core/session';
import CheckoutSuccessClient from './CheckoutSuccessClient';
import { addSubscription } from '@/lib/actions/subscriptions';
import { redirect } from 'next/navigation';

const getFallbackSessionData = (user, session_id) => ({
    planName: "Premium",
    amountTotal: 3900,
    currency: "bdt",
    customerEmail: user?.email || "your email",
    status: "complete",
    sessionId: session_id,
});

const CheckoutSuccessPage = async ({ searchParams }) => {
    const { session_id } = await searchParams;
    const user = await getUserSession();

    if (!session_id) return redirect('/');

    if (!stripe?.checkout) {
        return <CheckoutSuccessClient sessionData={getFallbackSessionData(user, session_id)} user={user} />;
    }

    let session;
    try {
        session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['line_items', 'customer_details', 'subscription'],
        });
    } catch {
        return <CheckoutSuccessClient sessionData={getFallbackSessionData(user, session_id)} user={user} />;
    }

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
        return redirect('/');
    }

    const actualAmount = session.line_items?.data[0]?.price?.unit_amount || session.amount_total;

    const subsInfo = {
        customerId: user?.id,
        customerEmail: session.customer_details?.email || user?.email,
        customerName: session.customer_details?.name || user?.name,
        planName: session.metadata?.planName?.toLowerCase() || "premium",
        planType: session.metadata?.type || "seeker",
        amountTotal: actualAmount,
        currency: session.currency || "bdt",
        status: session.status,
        subscriptionId: session.subscription,
        sessionId: session_id,
        interval: session.metadata?.interval || "month",
    };

    let subscriptionResult = null;
    try {
        subscriptionResult = await addSubscription(subsInfo);
    } catch (err) {
        console.error('Error saving subscription:', err);
    }

    const sessionData = {
        planName: session.metadata?.planName || "Premium",
        amountTotal: actualAmount,
        currency: session.currency || "bdt",
        customerEmail: session.customer_details?.email,
        status: session.status,
        sessionId: session_id,
        subsInfo,
        subscriptionResult,
    };

    return <CheckoutSuccessClient sessionData={sessionData} user={user} />;
};

export default CheckoutSuccessPage;