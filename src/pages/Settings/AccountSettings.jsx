import React, { useState, useEffect } from 'react';
import { User, Palette, Bell, Save, Moon, Sun, Monitor } from 'lucide-react';

export default function AccountSettings() {
    const [activeTab, setActiveTab] = useState('profile');
    
    // --- THEME LOGIC ---
    // Initialize theme from localStorage, default to 'system'
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

    useEffect(() => {
        const root = window.document.documentElement;
        
        // Remove both classes before applying the correct one
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            // Check the user's OS preference
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    // --- PROFILE DATA LOGIC ---
    // Initialize profile from localStorage or use defaults
    const [profile, setProfile] = useState(() => {
        const savedProfile = localStorage.getItem('userProfile');
        return savedProfile ? JSON.parse(savedProfile) : {
            fullName: 'Sayantan Pachal',
            headline: 'Computer Science Engineering Student',
            email: 'sayantan@example.com'
        };
    });

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const saveProfile = () => {
        localStorage.setItem('userProfile', JSON.stringify(profile));
        // In a real app, you would make an API call here
        alert('Profile saved successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 p-4 md:p-8 transition-colors duration-300">
            <div className="max-w-5xl mx-auto mt-20">
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="w-full md:w-64 shrink-0">
                        <nav className="flex flex-col gap-2">
                            <button 
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                    activeTab === 'profile' 
                                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' 
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                                }`}
                            >
                                <User size={20} />
                                Profile Info
                            </button>
                            <button 
                                onClick={() => setActiveTab('appearance')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                    activeTab === 'appearance' 
                                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' 
                                    : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                                }`}
                            >
                                <Palette size={20} />
                                Appearance
                            </button>
                            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 cursor-not-allowed">
                                <Bell size={20} />
                                Notifications (Coming Soon)
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 bg-white dark:bg-gray-900/50 rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-xl">
                        
                        {/* PROFILE TAB */}
                        {activeTab === 'profile' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">Public Profile</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Manage how you appear to others on the platform.</p>
                                </div>

                                <div className="space-y-4 max-w-lg">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Full Name</label>
                                        <input 
                                            type="text" 
                                            name="fullName"
                                            value={profile.fullName}
                                            onChange={handleProfileChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Headline / Role</label>
                                        <input 
                                            type="text" 
                                            name="headline"
                                            value={profile.headline}
                                            onChange={handleProfileChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={profile.email}
                                            disabled
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-gray-500 cursor-not-allowed outline-none"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">Email cannot be changed right now.</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <button 
                                        onClick={saveProfile}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* APPEARANCE TAB */}
                        {activeTab === 'appearance' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">Appearance</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Customize the look and feel of the application.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-4">Theme Preference</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        
                                        {/* Light Mode Button */}
                                        <button 
                                            onClick={() => setTheme('light')}
                                            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                                                theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                                            }`}
                                        >
                                            <Sun size={28} className={theme === 'light' ? 'text-blue-500' : 'text-gray-500'} />
                                            <span className="font-medium">Light</span>
                                        </button>

                                        {/* Dark Mode Button */}
                                        <button 
                                            onClick={() => setTheme('dark')}
                                            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                                                theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                                            }`}
                                        >
                                            <Moon size={28} className={theme === 'dark' ? 'text-blue-500' : 'text-gray-500'} />
                                            <span className="font-medium">Dark</span>
                                        </button>

                                        {/* System Mode Button */}
                                        <button 
                                            onClick={() => setTheme('system')}
                                            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                                                theme === 'system' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                                            }`}
                                        >
                                            <Monitor size={28} className={theme === 'system' ? 'text-blue-500' : 'text-gray-500'} />
                                            <span className="font-medium">System</span>
                                        </button>

                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                        Selecting "System" will automatically match your device's operating system settings.
                                    </p>
                                </div>
                            </div>
                        )}

                    </main>
                </div>
            </div>
        </div>
    );
}