// app/api/checkout_sessions/route.js
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { PLAN_PRICE_NAME, stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/core/session';

export async function POST(request) {
  try {
    const user = await getUserSession();
    const headersList = await headers();
    const origin = headersList.get('origin');

    const formData = await request.formData();
    const planName = formData.get("planName");
    const priceId = PLAN_PRICE_NAME[planName];
    const currency = formData.get("currency");
    const interval = formData.get("interval");
    const type = formData.get("type");

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: {
        planName: planName,
        type: type,
        interval: interval,
        currency: currency,
        userId: user?.id,
      },
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}