import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_NAME={
    "Pro": "price_1TifF3QY9CgQi6V9B6HVYu9m",
    "Premium" : "price_1TilhNQY9CgQi6V9ynokDl37",
    "Growth" : "price_1TiljTQY9CgQi6V9beBz1wJg",
    "Enterprise" : "price_1TilkaQY9CgQi6V9FvXOEvEv"
}