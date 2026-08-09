/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { XCircle, CheckCircle, Award, ArrowLeft, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/Other/ToastContext";
import Loader from "../../components/Other/Loader";
import { databases, DATABASE_ID, QUESTIONS_COLLECTION_ID, PROGRESS_COLLECTION_ID } from "../../appwrite/config";

const ExamRunner = ({ course, progressDoc, onClose, onPassSuccess }) => {
    const showToast = useToast();
    const navigate = useNavigate();

    const [isInitializing, setIsInitializing] = useState(true);
    const [view, setView] = useState("quiz"); 
    const [showExitConfirm, setShowExitConfirm] = useState(false); 
    const [showSubmitConfirm, setShowSubmitConfirm] = useState(false); 
    
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    useEffect(() => {
        const prepareExam = async () => {
            try {
                const delay = new Promise(res => setTimeout(res, 2000));
                const qRes = await databases.listDocuments(DATABASE_ID, QUESTIONS_COLLECTION_ID);
                const allQuestions = qRes.documents || [];
                const courseId = String(course.ID || course.$id);
                const fetchedQuestions = allQuestions.filter(q => String(q.CourseId) === courseId);
                
                await delay;

                if (fetchedQuestions.length === 0) {
                    showToast("No questions found for this exam yet.", "error");
                    onClose();
                    return;
                }

                setQuestions(fetchedQuestions);
                setIsInitializing(false);
            } catch (error) {
                console.error("Exam load error:", error);
                showToast("Failed to verify credentials and load exam.", "error");
                onClose();
            }
        };
        prepareExam();
    }, [course, onClose, showToast]);

    const handleSelect = (option) => {
        setSelectedAnswers(prev => ({ ...prev, [currentIndex]: option }));
    };

    const submitExam = async () => {
        setIsSubmitting(true);
        let correctCount = 0;

        questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.CorrectOption) correctCount++;
        });

        const finalPercentage = Math.round((correctCount / questions.length) * 100);
        setScore(finalPercentage);

        if (finalPercentage >= 80 && progressDoc) {
            try {
                const targetId = progressDoc.UserId || progressDoc.userId || progressDoc.$id;
                await databases.updateDocument(
                    DATABASE_ID,
                    PROGRESS_COLLECTION_ID,
                    targetId,
                    { Badge: "Y", CourseId: progressDoc.CourseId }
                );
                onPassSuccess(progressDoc.CourseId); 
            } catch (err) {
                showToast("Failed to save passing score.", "error");
            }
        }
        setIsSubmitting(false);
        setView("result");
    };

    if (isInitializing) {
        return (
            <div className="fixed inset-0 z-[500] bg-white dark:bg-[#050505] flex flex-col items-center justify-center animate-in fade-in duration-300 font-dm text-center p-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-6 sm:mb-8">
                    <div className="absolute inset-0 border-4 border-indigo-100 dark:border-indigo-900/30 rounded-full" />
                    <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2">Verifying Credentials</h2>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium animate-pulse">
                    Setting up your secure exam environment...
                </p>
            </div>
        );
    }

    if (view === "result") {
        const passed = score >= 80;
        return (
            <div className="fixed inset-0 z-[500] bg-gray-50 dark:bg-[#050505] flex items-center justify-center font-dm animate-in zoom-in-95 duration-300 p-4">
                <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-8 md:p-16 max-w-2xl w-full text-center shadow-2xl">
                    {passed ? (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-bounce">
                            <Award className="w-10 h-10 sm:w-12 sm:h-12" />
                        </div>
                    ) : (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                            <XCircle className="w-10 h-10 sm:w-12 sm:h-12" />
                        </div>
                    )}
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">
                        {passed ? "Congratulations!" : "Keep Trying!"}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
                        You scored <span className={`font-black text-xl sm:text-2xl ${passed ? "text-green-500" : "text-red-500"}`}>{score}%</span>
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                        {passed ? (
                            <button onClick={() => { onClose(); navigate("/achievements"); }} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 text-sm sm:text-base">
                                View My Badge
                            </button>
                        ) : (
                            <button onClick={() => { setSelectedAnswers({}); setCurrentIndex(0); setScore(0); setView("quiz"); }} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 text-sm sm:text-base">
                                Retake Exam
                            </button>
                        )}
                        <button onClick={onClose} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-all text-sm sm:text-base">
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    return (
        <div className="fixed inset-0 z-[500] bg-white dark:bg-[#050505] flex flex-col h-screen w-screen overflow-hidden font-dm animate-in fade-in duration-300">
            
            {showExitConfirm && (
                <div className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 rounded-2xl sm:rounded-3xl max-w-sm w-full text-center shadow-2xl">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <XCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Exit Exam?</h3>
                        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
                            Are you sure you want to leave? All your current answers and progress will be lost.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowExitConfirm(false)} className="flex-1 py-3 sm:py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold transition-colors text-sm sm:text-base">
                                Cancel
                            </button>
                            <button onClick={onClose} className="flex-1 py-3 sm:py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-500/30 text-sm sm:text-base">
                                Yes, Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSubmitConfirm && (
                <div className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 p-6 sm:p-8 rounded-2xl sm:rounded-3xl max-w-sm w-full text-center shadow-2xl">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Submit Exam?</h3>
                        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6 sm:mb-8">
                            Are you sure you're ready to submit? You cannot change your answers after this point.
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowSubmitConfirm(false)} className="flex-1 py-3 sm:py-3.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-bold transition-colors text-sm sm:text-base">
                                Review
                            </button>
                            <button 
                                onClick={() => {
                                    setShowSubmitConfirm(false);
                                    submitExam();
                                }} 
                                className="flex-1 py-3 sm:py-3.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-green-500/30 text-sm sm:text-base"
                            >
                                Yes, Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* HEADER */}
            <header className="h-14 sm:h-16 border-b border-gray-100 dark:border-gray-900 flex items-center justify-between px-3 sm:px-8 shrink-0 relative">
                <button 
                    onClick={() => setShowExitConfirm(true)}
                    className="flex items-center gap-1 sm:gap-2 text-gray-500 hover:text-red-500 font-bold transition-colors z-10 p-1"
                >
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6" /> <span className="hidden sm:inline">Exit Exam</span>
                </button>
                
                {/* Absolutely Centered Element */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Exam in Progress
                </div>
                
                <div className="text-xs sm:text-sm font-bold text-gray-500 z-10 p-1">
                    {currentIndex + 1} / {questions.length}
                </div>
            </header>

            <div className="w-full h-1 sm:h-1.5 bg-gray-100 dark:bg-gray-900 shrink-0">
                <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
            </div>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-3 sm:p-6 lg:p-8 min-h-0">
                
                {/* Question Area */}
                <div className="mb-4 sm:mb-6 shrink-0 flex items-center justify-center min-h-[20%] sm:min-h-[25%] md:min-h-[30%] px-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white text-center leading-snug">
                        {currentQ.QuestionText}
                    </h2>
                </div>

                {/* Options Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 min-h-0">
                    {["OptionA", "OptionB", "OptionC", "OptionD"].map((optKey) => {
                        const isSelected = selectedAnswers[currentIndex] === currentQ[optKey];
                        return (
                            <button
                                key={optKey}
                                onClick={() => handleSelect(currentQ[optKey])}
                                className={`w-full h-full flex items-center justify-center text-center p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 font-bold text-base sm:text-lg md:text-xl shadow-sm ${
                                    isSelected 
                                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 scale-[0.98]" 
                                    : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                                }`}
                            >
                                {currentQ[optKey]}
                            </button>
                        );
                    })}
                </div>

                {/* Bottom Navigation */}
                <div className="h-auto sm:h-24 shrink-0 flex justify-between items-center mt-4 sm:mt-6 pt-2 sm:pt-0">
                    <button
                        onClick={() => setCurrentIndex(prev => prev - 1)}
                        disabled={currentIndex === 0}
                        className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-3 sm:py-4 font-bold text-gray-500 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-colors text-sm sm:text-base"
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Previous
                    </button>

                    {isLast ? (
                        <button
                            onClick={() => setShowSubmitConfirm(true)}
                            disabled={isSubmitting || !selectedAnswers[currentIndex]}
                            className="flex items-center gap-1.5 sm:gap-2 px-6 sm:px-10 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg hover:-translate-y-1 text-sm sm:text-lg"
                        >
                            {isSubmitting ? "Grading..." : "Submit Exam"} <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setCurrentIndex(prev => prev + 1)}
                            disabled={!selectedAnswers[currentIndex]}
                            className="flex items-center gap-1.5 sm:gap-2 px-6 sm:px-10 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg hover:-translate-y-1 text-sm sm:text-lg"
                        >
                            Next <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ExamRunner;