import PricingClient from './PricingClient';
import {  getRecruiterPlans, getSeekerPlans } from '@/lib/api/pricings';

const PricingPage = async() => {
    const seekerPlans = await getSeekerPlans();
    const recruiterPlans = await getRecruiterPlans();
    return <PricingClient seekerPlans={seekerPlans} recruiterPlans={recruiterPlans}/>
};

export default PricingPage;