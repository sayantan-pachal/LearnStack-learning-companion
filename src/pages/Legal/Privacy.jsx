import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Privacy() {
    return (
        <div id="privacy" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-theme-pink-600 dark:text-theme-pink-400">
                    <ShieldCheck size={20} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    Privacy Policy
                </h2>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                <p className="font-bold text-gray-900 dark:text-gray-300">
                    Effective Date: August 19, 2026
                </p>

                <p>
                    At LearnStack, safeguarding your privacy and protecting your data is our highest priority. This comprehensive Privacy Policy outlines how we collect, process, store, and secure your personal information when you use our web application and related services.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">1. Information We Collect</h3>
                <p>
                    To provide a highly personalized educational experience, we collect information that you voluntarily provide to us during registration and profile completion. This includes:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-gray-800 dark:text-gray-200">Account Data:</strong> Your full name, email address, phone number, and account password.</li>
                    <li><strong className="text-gray-800 dark:text-gray-200">Academic & Professional Data:</strong> Your college/institution, academic year, department major, and portfolio/social links (GitHub, LinkedIn).</li>
                    <li><strong className="text-gray-800 dark:text-gray-200">Usage & Progress Data:</strong> Course enrollment status, module completion percentages, earned certifications, and interactions within the Community forums.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">2. How We Use Your Information</h3>
                <p>
                    The data we collect is strictly used to operate, maintain, and improve the LearnStack ecosystem. Specifically, we use your data to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Authenticate your identity and manage your session securely.</li>
                    <li>Generate dynamic, personalized documents such as your ATS-optimized Resume and Course Certificates.</li>
                    <li>Track your learning progression and display your achievements.</li>
                    <li>Facilitate peer-to-peer communication in the Community section.</li>
                    <li>Send critical account notifications, including OTPs for password resets or identity verification.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">3. Application Architecture & Data Routing</h3>
                <p>
                    LearnStack is built on a modern, decoupled architecture designed for performance and security. Our front-end user interface is globally distributed and hosted on <strong>Vercel</strong>, ensuring fast, encrypted delivery of the application to your browser. 
                </p>
                <p>
                    Instead of relying on traditional commercial backend-as-a-service providers, LearnStack utilizes highly customized <strong>Google Apps Script</strong> infrastructure as our backend logic handler. Data transmitted from the Vercel front-end is routed securely to our Google-hosted endpoints for processing.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">4. Cryptography, Hashing, and Security</h3>
                <p>
                    We employ rigorous, industry-standard cryptographic techniques to ensure your data remains completely inaccessible to unauthorized parties.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-gray-800 dark:text-gray-200">No Third-Party Authentication:</strong> LearnStack relies entirely on a proprietary, self-contained authentication system. We do not use third-party OAuth providers (such as Google Login or GitHub Login), eliminating the risk of cross-platform token hijacking.</li>
                    <li><strong className="text-gray-800 dark:text-gray-200">Password Hashing:</strong> Your password is never stored in plain text. We utilize advanced cryptographic hashing algorithms (such as bcrypt/Argon2) combined with unique computational salts. This ensures that even in the highly unlikely event of a database exposure, your password remains mathematically impossible to reverse-engineer.</li>
                    <li><strong className="text-gray-800 dark:text-gray-200">In-Transit Encryption:</strong> All data exchanged between your browser, Vercel, and our Google Apps Script backend is encrypted in transit using strict TLS/SSL (HTTPS) protocols.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">5. Data Sharing and Disclosure</h3>
                <p>
                    <strong>We do not sell, rent, or trade your personal information.</strong> Your data is strictly confined to the LearnStack ecosystem. We only disclose information under the following rare circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>To comply with a valid legal subpoena, court order, or governmental request.</li>
                    <li>To protect and defend the rights, property, or safety of LearnStack, our users, or the public.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">6. Your Data Rights</h3>
                <p>
                    You retain full control over your personal data. You have the right to access, update, correct, or permanently delete your account information at any time via your Profile Settings. If you wish to request a complete erasure of your learning history and account records from our Google infrastructure, you may contact our support team.
                </p>
            </div>
        </div>
    );
}