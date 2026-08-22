import React from 'react';
import { BookOpen, Layers, ShieldCheck, Heart, Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">KitabGhar</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              An online eBook management and digital library system built with 3-tier architecture, role-based access, and an interactive in-browser reading engine.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Code2 className="w-4 h-4" />
              <span>Software Tools & Techniques Lab Practical Project</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Architecture Layers
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Tier 1: React + Vite Client
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Tier 2: Express REST API
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Tier 3: MongoDB Database
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Security: JWT Authentication
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Lab Experiments
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>Exp 1: Problem & Planning</li>
              <li>Exp 2: SRS & Modules</li>
              <li>Exp 3: Data Modeling & Schema</li>
              <li>Exp 4: UML & Activity Diagrams</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 KitabGhar eBook Management System. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Designed for college lab submission with 3-tier architecture.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
