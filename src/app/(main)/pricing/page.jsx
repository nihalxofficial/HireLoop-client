import React from 'react';
import PricingClient from './PricingClient';
import { getFaqItems, getRecruiterPlans, getSeekerPlans } from '@/lib/api/pricings';

const PricingPage = async() => {
    const seekerPlans = await getSeekerPlans();
    const recruiterPlans = await getRecruiterPlans();
    const faqItems = await getFaqItems();
    return <PricingClient seekerPlans={seekerPlans} recruiterPlans={recruiterPlans} faqItems={faqItems}/>
};

export default PricingPage;