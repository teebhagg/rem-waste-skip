"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileCheck,
  MapPin,
  RefreshCw,
  Trash2,
  Truck,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import SkipCard from "./components/skip/skip-card";
import StepConnector from "./components/skip/step-connector";
import StepItem from "./components/skip/step-item";
import { SkipCardSkeletonGrid } from "./components/ui/skeleton-loader";
import type { SkipOption } from "./types/skip-option";

function App() {
  const [selectedSkip, setSelectedSkip] = useState<SkipOption | null>(null);
  const stepperRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  // Combined state for skip options, loading status, and error handling
  const [skipState, setSkipState] = useState<{
    options: SkipOption[];
    loading: boolean;
    error: string | null;
  }>({
    options: [],
    loading: true,
    error: null,
  });

  // Fetch skip options from API
  const fetchSkipOptions = async () => {
    try {
      // Set loading state
      setSkipState((prev) => ({ ...prev, loading: true }));

      let data;

      try {
        // Use the direct API endpoint from the network tab
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft",
          {
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response:", response);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        data = await response.json();
      } catch (corsError) {
        console.warn("CORS error encountered, using fallback data:", corsError);
      }

      setSkipState({
        options: data || [],
        loading: false,
        error:
          data && data.length > 0
            ? null
            : "No skip options available. Please try again.",
      });
    } catch (err) {
      console.error("Error in fetch process:", err);
      setSkipState({
        options: [],
        loading: false,
        error: "Failed to load skip options. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchSkipOptions();
  }, []);

  // Check if a skip should be disabled based on its properties
  const isSkipDisabled = (skip: SkipOption): boolean => {
    return !skip.allowed_on_road || !skip.allows_heavy_waste || skip.forbidden;
  };

  const handleSelectSkip = (skip: SkipOption) => {
    // Only allow selection if the skip is not disabled
    if (!isSkipDisabled(skip)) {
      setSelectedSkip(skip);
    }
  };

  const scrollStepper = (direction: "left" | "right") => {
    if (!stepperRef.current) return;

    const scrollAmount = 200;
    const currentScroll = stepperRef.current.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    stepperRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });

    // Update scroll button visibility after scrolling
    setTimeout(checkScrollButtons, 300);
  };

  const checkScrollButtons = () => {
    if (!stepperRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = stepperRef.current;
    const hasHorizontalOverflow = scrollWidth > clientWidth;

    setShowLeftScroll(hasHorizontalOverflow && scrollLeft > 0);
    setShowRightScroll(
      hasHorizontalOverflow && scrollLeft + clientWidth < scrollWidth - 10
    );
  };

  useEffect(() => {
    checkScrollButtons();
    // Add event listener for window resize to recheck
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  const steps = [
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Postcode",
      completed: true,
    },
    {
      icon: <Trash2 className="h-5 w-5" />,
      label: "Waste Type",
      completed: true,
    },
    { icon: <Truck className="h-5 w-5" />, label: "Select Skip", active: true },
    { icon: <FileCheck className="h-5 w-5" />, label: "Permit Check" },
    { icon: <Calendar className="h-5 w-5" />, label: "Choose Date" },
    { icon: <CreditCard className="h-5 w-5" />, label: "Payment" },
  ];

  // Calculate total price including VAT
  const calculateTotalPrice = (skip: SkipOption): number => {
    const vatAmount = skip.price_before_vat * (skip.vat / 100);
    return skip.price_before_vat + vatAmount;
  };

  return (
    <div className="min-h-screen min-w-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Stepper Navigation */}
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 shadow-sm">
        <div className="mx-auto px-4 py-4 relative">
          {/* Add fade effect containers */}
          <div className="absolute left-3 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-white dark:from-slate-900 to-transparent"></div>
          <div className="absolute right-3 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-white dark:from-slate-900 to-transparent"></div>

          {showLeftScroll && (
            <Button
              variant="outline"
              size={"icon"}
              onClick={() => scrollStepper("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-slate-900 rounded-full shadow-md p-1 flex items-center justify-center cursor-pointer"
              aria-label="Scroll left">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}

          <div
            ref={stepperRef}
            className="flex items-center overflow-x-auto scrollbar-hide relative"
            onScroll={checkScrollButtons}>
            <div className="flex items-center justify-between w-full min-w-max px-6">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <StepItem
                    icon={step.icon}
                    label={step.label}
                    completed={step.completed}
                    active={step.active}
                  />
                  {index < steps.length - 1 && <StepConnector />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {showRightScroll && (
            <Button
              variant="outline"
              size={"icon"}
              onClick={() => scrollStepper("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-slate-900 rounded-full shadow-md p-1 flex items-center justify-center cursor-pointer"
              aria-label="Scroll right">
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-auto px-4 py-8 max-w-full">
        <div className="text-center mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            Choose Your Skip Size
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Select the skip size that best suits your needs
          </p>
        </div>

        {/* Loading State */}
        {skipState.loading && <SkipCardSkeletonGrid />}

        {/* Error State */}
        {skipState.error && (
          <div className="text-center py-12">
            <div className="text-red-500 dark:text-red-400 mb-4">
              {skipState.error}
            </div>
            <div className="flex justify-center">
              <Button
                onClick={fetchSkipOptions}
                variant="outline"
                className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" /> Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Skip Options Grid */}
        {!skipState.loading && !skipState.error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skipState.options.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                isDisabled={isSkipDisabled(skip)}
                onSelect={handleSelectSkip}
                calculateTotalPrice={calculateTotalPrice}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!skipState.loading &&
          !skipState.error &&
          skipState.options.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                No skip options available for your area. Please try a different
                location.
              </p>
            </div>
          )}
      </main>

      {/* Fixed Bottom Bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto">
              {selectedSkip && (
                <>
                  <div className="font-medium">
                    {selectedSkip.size} Yard Skip
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-500 mt-1 sm:mt-0">
                    £{calculateTotalPrice(selectedSkip).toFixed(2)}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 sm:mt-0">
                    {selectedSkip.hire_period_days} day hire period
                  </div>
                </>
              )}
            </div>
            <div className="flex space-x-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-1/2 sm:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                size="lg"
                disabled={!selectedSkip}
                aria-disabled={!selectedSkip}
                className="rounded-full w-1/2 sm:w-auto">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
