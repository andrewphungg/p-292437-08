
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Check, Star, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Premium() {
  const features = [
    "Early access to popular events",
    "Exclusive curated monthly guides",
    "Skip waiting lists for hot events",
    "Create private event groups",
    "No ads in your feed",
    "Priority customer support"
  ];

  const tiers = [
    {
      name: "Monthly",
      price: "$6.99",
      period: "per month",
      description: "Great for trying out premium features",
      buttonText: "Start Monthly Plan",
      popular: false,
      features: features,
    },
    {
      name: "Annual",
      price: "$59.99",
      period: "per year",
      description: "Save 30% compared to monthly",
      buttonText: "Start Annual Plan",
      popular: true,
      features: features,
    }
  ];
  
  return (
    <AppLayout>
      <div className="py-10 px-4 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-amber-100 text-amber-800 rounded-full p-2 mb-4">
            <Star size={24} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
            Upgrade to Premium
          </h1>
          <p className="text-gray-600 mt-2 max-w-sm mx-auto">
            Unlock exclusive features and get early access to the hottest events in your area
          </p>
        </div>
        
        <div className="space-y-6">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={cn(
                "rounded-xl overflow-hidden bg-white shadow-md border",
                tier.popular 
                  ? "border-2 border-amber-500 shadow-amber-200" 
                  : "border-gray-200"
              )}
            >
              {tier.popular && (
                <div className="bg-amber-500 text-white text-center py-1 text-xs font-medium">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{tier.name}</h3>
                    <p className="text-sm text-gray-500">{tier.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">{tier.price}</span>
                    <span className="text-gray-500 text-sm block">{tier.period}</span>
                  </div>
                </div>
                
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check size={16} className="text-green-500 shrink-0 mt-0.5 mr-2" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={cn(
                    "w-full mt-6",
                    tier.popular 
                      ? "bg-amber-500 hover:bg-amber-600" 
                      : "bg-gray-800 hover:bg-gray-900"
                  )}
                >
                  {tier.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 flex items-center">
            <Lock size={16} className="mr-2" />
            Secure Payment
          </h3>
          <p className="text-sm text-blue-600 mt-1">
            Your payment information is processed securely. We do not store credit card details.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
