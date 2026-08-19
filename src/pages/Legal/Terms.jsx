import React from 'react';
import { Scale } from 'lucide-react';

export default function Terms() {
    return (
        <div id="terms" className="scroll-mt-32">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-theme-blue-600 dark:text-theme-blue-400">
                    <Scale size={20} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    Terms & Conditions
                </h2>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                <p className="font-bold text-gray-900 dark:text-gray-300">
                    Effective Date: August 19, 2026
                </p>

                <p>
                    Welcome to LearnStack. These Terms and Conditions ("Terms", "Agreement") govern your access to and use of the LearnStack web application, services, and community forums (collectively, the "Platform"). Please read these Terms carefully before accessing or using our Platform. By registering an account or accessing the Platform, you agree to be bound by these Terms.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">1. Account Registration and Security</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Eligibility:</strong> You must be a student or an individual seeking educational resources to register for an account. By registering, you represent and warrant that all information provided is accurate and truthful.</li>
                    <li><strong>Account Credentials:</strong> You are solely responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized access to your account or any other breach of security.</li>
                    <li><strong>Account Restrictions:</strong> You may not use as a username the name of another person or entity, or a name or trademark that is subject to any rights of another person without appropriate authorization.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">2. Acceptable Use and Conduct</h3>
                <p>
                    LearnStack is a collaborative educational environment. You agree not to use the Platform in any way that violates applicable laws or regulations. Specifically, you agree not to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Post, upload, or distribute any content that is unlawful, defamatory, harassing, abusive, fraudulent, or obscene.</li>
                    <li>Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Platform.</li>
                    <li>Upload invalid data, viruses, worms, or other software agents through the Platform.</li>
                    <li>Use automated scripts, scrapers, or bots to access, copy, or manipulate any content provided on the Platform.</li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">3. Service Availability and Modifications</h3>
                <p>
                    While we strive to provide uninterrupted access to LearnStack, the Platform is provided on an "as is" and "as available" basis. Our front-end infrastructure is hosted via Vercel, ensuring high availability, but we reserve the right to modify, suspend, or discontinue the Platform (or any part thereof) at any time, with or without notice, for maintenance or other operational reasons. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the service.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">4. Intellectual Property Rights</h3>
                <p>
                    The Platform and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of LearnStack and its developers. The Platform is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">5. User-Generated Content</h3>
                <p>
                    By submitting discussions, comments, or other materials to the Community section ("User Content"), you grant LearnStack a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute that content within the context of operating the Platform. You represent and warrant that you own or have the necessary rights to use and share your User Content.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">6. Limitation of Liability</h3>
                <p>
                    In no event shall LearnStack, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Platform; (ii) any conduct or content of any third party on the Platform; and (iii) unauthorized access, use, or alteration of your transmissions or content.
                </p>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3">7. Governing Law</h3>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
            </div>
        </div>
    );
}