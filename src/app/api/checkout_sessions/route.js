import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { PLAN_PRICE_NAME, stripe } from '@/lib/stripe'
import { getUserSession } from '@/lib/core/session'

export async function POST(request) {
  try {
    const user = await getUserSession();
    const headersList = await headers()
    const origin = headersList.get('origin')

    const formData = await request.formData()
    const planName = await formData.get("planName")
    const priceId = PLAN_PRICE_NAME[planName]
    // const price = await formData.get("price")
    const currency = await formData.get("currency")
    const interval = await formData.get("interval")
    const type = await formData.get("type")

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}