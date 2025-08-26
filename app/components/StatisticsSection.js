'use client';
import { useState, useEffect, useRef, useMemo } from 'react';

export default function StatisticsSection() {
    const [counts, setCounts] = useState({
        years: 0,
        projects: 0,
        safety: 0,
        operations: 0
    });
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const targetCounts = useMemo(() => ({
        years: 30,
        projects: 280,
        safety: 99,
        operations: 24
    }), []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;

        const intervals = {};

        Object.keys(targetCounts).forEach(key => {
            const target = targetCounts[key];
            let current = 0;
            const increment = target / steps;

            intervals[key] = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(intervals[key]);
                }
                setCounts(prev => ({
                    ...prev,
                    [key]: Math.floor(current)
                }));
            }, stepDuration);
        });

        return () => {
            Object.values(intervals).forEach(interval => clearInterval(interval));
        };
    }, [isVisible, targetCounts]);

    return (
        <section id="statistics" ref={sectionRef} className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                        Our Achievements
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Decades of excellence in steel processing with unmatched safety standards and operational efficiency
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {/* Years Experience */}
                    <div className="text-center">
                        <div className="text-5xl md:text-7xl font-black text-orange-600 mb-4">
                            {counts.years}+
                        </div>
                        <div className="text-lg text-gray-700 font-medium">Years Experience</div>
                        <div className="mt-4 w-12 h-0.5 bg-black mx-auto"></div>
                    </div>

                    {/* Projects Completed */}
                    <div className="text-center">
                        <div className="text-5xl md:text-7xl font-black text-orange-600 mb-4">
                            {counts.projects}+
                        </div>
                        <div className="text-lg text-gray-700 font-medium">Projects Completed</div>
                        <div className="mt-4 w-12 h-0.5 bg-black mx-auto"></div>
                    </div>

                    {/* Safety Record */}
                    <div className="text-center">
                        <div className="text-5xl md:text-7xl font-black text-orange-600 mb-4">
                            {counts.safety}%
                        </div>
                        <div className="text-lg text-gray-700 font-medium">Safety Record</div>
                        <div className="mt-4 w-12 h-0.5 bg-black mx-auto"></div>
                    </div>

                    {/* Operations */}
                    <div className="text-center">
                        <div className="text-5xl md:text-7xl font-black text-orange-600 mb-4">
                            {counts.operations}/7
                        </div>
                        <div className="text-lg text-gray-700 font-medium">Operations</div>
                        <div className="mt-4 w-12 h-0.5 bg-black mx-auto"></div>
                    </div>
                </div>

                {/* Bottom decorative element */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center space-x-2 px-6 py-3">
                        <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                        <span className="text-black text-sm font-medium">Real-time Statistics</span>
                        <div className="w-2 h-2 bg-black rounded-full animate-pulse delay-1000"></div>
                    </div>
                </div>
            </div>
        </section>
    );
} 