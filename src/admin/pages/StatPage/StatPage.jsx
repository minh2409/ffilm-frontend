import React from 'react';
import { useState, useEffect } from 'react';

const StatPage = () => {
    const Stats = [
        {
            user: {
                total: 12750,
                ratio: 0.125,
                status: true,
            },

            session:{
                rate: 0.294,
                status: true,
                ratio: 0.004,
            },
            
            avgClick:{
                rate: 0.568,
                status: false,
                ratio: 0.017,
            },
            
            pageViews:{
                total: 92913,
                status: false,
                ratio: 0.003,
            },
            
        }
    ]

    const [stats, setStats] = useState([]);

    useEffect(() => {
        setStats(Stats);
    }, []);

    const stat = stats[0];

    const renderStatusIcon = (status) => {
        if (status) {
          return (
            <svg
              className="inline-block size-4 self-center"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
          );
        } else {
          return (
            <svg
              className="inline-block size-4 self-center"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
              <polyline points="16 17 22 17 22 11" />
            </svg>
          );
        }
      };

  return (
    <div>
       {/* stat */}
       {stat && (                    
        <div class="max-w-[85rem] px-4 py-5 sm:px-6 lg:px-8 lg:py-7 mx-auto">
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div class="flex flex-col bg-white border shadow-sm rounded-xl">
                <div class="p-4 md:p-5 flex gap-x-4">
                    <div class="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                    <svg class="flex-shrink-0 size-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div class="grow">
                    <div class="flex items-center gap-x-2">
                        <p class="text-xs uppercase tracking-wide text-gray-500">
                        Total users
                        </p>
                        <div class="hs-tooltip">
                        <div class="hs-tooltip-toggle">
                            <svg class="flex-shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                            <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm" role="tooltip">
                            The number of daily users
                            </span>
                        </div>
                        </div>
                    </div>
                    <div class="mt-1 flex items-center gap-x-2">
                        <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                        {stat.user.total}
                        </h3>
                        <span class="inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-green-100 text-green-900">
                        {renderStatusIcon(stat.user.status)}
                        <span class="inline-block text-xs font-medium">
                            {(stat.user.ratio * 100).toFixed(2)}%
                        </span>
                        </span>
                    </div>
                    </div>
                </div>
                </div>
                <div class="flex flex-col bg-white border shadow-sm rounded-xl">
                <div class="p-4 md:p-5 flex gap-x-4">
                    <div class="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                    <svg class="flex-shrink-0 size-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
                    </div>

                    <div class="grow">
                    <div class="flex items-center gap-x-2">
                        <p class="text-xs uppercase tracking-wide text-gray-500">
                        Sessions
                        </p>
                    </div>
                    <div class="mt-1 flex items-center gap-x-2">
                        <h3 class="text-xl font-medium text-gray-800">
                        {(stat.session.rate * 100).toFixed(2)}%
                        </h3>
                        <span class="inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-green-100 text-green-900">
                        {renderStatusIcon(stat.session.status)}
                        <span class="inline-block text-xs font-medium">
                            {(stat.session.ratio * 100).toFixed(2)}%
                        </span>
                        </span>
                    </div>
                    </div>
                </div>
                </div>
                <div class="flex flex-col bg-white border shadow-sm rounded-xl">
                <div class="p-4 md:p-5 flex gap-x-4">
                    <div class="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                    <svg class="flex-shrink-0 size-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/><path d="m12 12 4 10 1.7-4.3L22 16Z"/></svg>
                    </div>

                    <div class="grow">
                    <div class="flex items-center gap-x-2">
                        <p class="text-xs uppercase tracking-wide text-gray-500">
                        Avg. Click Rate
                        </p>
                    </div>
                    <div class="mt-1 flex items-center gap-x-2">
                        <h3 class="text-xl sm:text-2xl font-medium text-gray-800">
                        {(stat.avgClick.rate * 100).toFixed(2)}%
                        </h3>
                        <span class="inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-red-100 text-red-900">
                        {renderStatusIcon(stat.avgClick.status)}
                        <span class="inline-block text-xs font-medium">
                            {(stat.avgClick.ratio * 100).toFixed(2)}%
                        </span>
                        </span>
                    </div>
                    </div>
                </div>
                </div>
                <div class="flex flex-col bg-white border shadow-sm rounded-xl">
                <div class="p-4 md:p-5 flex gap-x-4">
                    <div class="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                    <svg class="flex-shrink-0 size-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"/><path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"/><path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"/></svg>
                    </div>

                    <div class="grow">
                    <div class="flex items-center gap-x-2">
                        <p class="text-xs uppercase tracking-wide text-gray-500">
                        Pageviews
                        </p>
                        <div class="hs-tooltip">
                        <div class="hs-tooltip-toggle">
                            <svg class="flex-shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                            <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm" role="tooltip">
                            The average pageviews
                            </span>
                        </div>
                        </div>
                    </div>
                    <div class="mt-1 flex items-center gap-x-2">
                        <h3 class="text-xl font-medium text-gray-800">
                        {stat.pageViews.total}
                        </h3>
                        <span class="inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-red-100 text-red-900">
                        {renderStatusIcon(stat.pageViews.status)}
                        <span class="inline-block text-xs font-medium">
                            {(stat.pageViews.ratio * 100).toFixed(2)}%
                        </span>
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
    </div>
  )
}

export default StatPage
