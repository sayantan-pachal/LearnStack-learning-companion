/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { XCircle, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/Other/ToastContext";
import { databases, DATABASE_ID, QUESTIONS_COLLECTION_ID, PROGRESS_COLLECTION_ID } from "../../appwrite/config";
import ExamGuidelines from "./ExamGuidelines";
import ExamResult from "./ExamResult";

const ExamRunner = ({ course, progressDoc, onClose, onPassSuccess }) => {
    const showToast = useToast();
    const navigate = useNavigate();

    const [isInitializing, setIsInitializing] = useState(true);
    // Added "analyzing" to the possible views
    const [view, setView] = useState("guidelines");
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    useEffect(() => {
        const prepareExam = async () => {
            try {
                const qRes = await databases.listDocuments(DATABASE_ID, QUESTIONS_COLLECTION_ID);
                const allQuestions = qRes.documents || [];
                const courseId = String(course.ID || course.$id);

                const fetchedQuestions = allQuestions
                    .filter(q => String(q.CourseId) === courseId)
                    .map(q => {
                        const options = [q.OptionA, q.OptionB, q.OptionC, q.OptionD];
                        for (let i = options.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [options[i], options[j]] = [options[j], options[i]];
                        }
                        return { ...q, shuffledOptions: options };
                    });

                if (fetchedQuestions.length === 0) {
                    showToast("No questions found for this exam yet.", "error");
                    onClose();
                    return;
                }

                setQuestions(fetchedQuestions);
                setTimeLeft(fetchedQuestions.length * 60);
                setIsInitializing(false);
            } catch (error) {
                console.error("Exam load error:", error);
                showToast("Failed to verify credentials and load exam.", "error");
                onClose();
            }
        };
        prepareExam();
    }, [course, onClose, showToast]);

    useEffect(() => {
        if (view !== "quiz" || timeLeft <= 0 || isSubmitting) return;
        const timerId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerId);
                    submitExam();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view, timeLeft, isSubmitting]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const preventCheating = (e) => {
        e.preventDefault();
        showToast("Action disabled. This is a secure exam environment.", "error");
    };

    const submitExam = async () => {
        // Immediately switch to the analyzing animation view
        setView("analyzing");
        setIsSubmitting(true);
        let correctCount = 0;

        questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.CorrectOption) correctCount++;
        });

        const finalPercentage = Math.round((correctCount / questions.length) * 100);
        setScore(finalPercentage);

        // We create a minimum 3-second delay promise so the user gets to see the awesome animation
        const minDelay = new Promise(resolve => setTimeout(resolve, 3000));

        // This is the actual database update task
        const updateTask = (async () => {
            if (finalPercentage >= 80 && progressDoc) {
                try {
                    const targetId = progressDoc.UserId || progressDoc.userId || progressDoc.$id;
                    const todayStr = new Date().toLocaleDateString('en-US');

                    await databases.updateDocument(
                        DATABASE_ID,
                        PROGRESS_COLLECTION_ID,
                        targetId,
                        { Badge: "Y", CourseId: progressDoc.CourseId, Date: todayStr }
                    );
                    showToast("🎉 Congratulations! Your certificate has been successfully claimed.", "success");
                    onPassSuccess(progressDoc.CourseId);
                } catch (err) {
                    showToast("Failed to save passing score.", "error");
                }
            }
        })();

        // Wait for BOTH the 3-second delay AND the database update to finish before moving on
        await Promise.all([updateTask, minDelay]);

        setIsSubmitting(false);
        setView("result");
    };

    if (isInitializing) {
        return (
            <div className="fixed inset-0 z-[500] bg-white dark:bg-[#050505] flex flex-col items-center justify-center animate-in fade-in duration-300 font-dm text-center p-6">
                <img
                    src="../../../public/Svg/Building Page.svg"
                    alt="Loading..."
                    className="w-48 h-48 sm:w-64 sm:h-64 mb-6 sm:mb-8 object-contain animate-pulse drop-shadow-xl"
                />
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-2">Securing Environment</h2>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium animate-pulse">
                    Preparing questions and anti-cheat systems...
                </p>
            </div>
        );
    }

    if (view === "guidelines") {
        return (
            <ExamGuidelines
                courseTitle={course?.Title}
                questionsCount={questions.length}
                onStart={() => setView("quiz")}
                onClose={onClose}
            />
        );
    }

    // ✨ NEW VIEW: Analyzing Animation Layer
    if (view === "analyzing") {
        return (
            <div className="fixed inset-0 z-[500] bg-white dark:bg-[#050505] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 font-dm text-center p-6">
                <img
                    src="../../../public/Svg/Data analyst.svg"
                    alt="Analyzing..."
                    className="w-48 h-48 sm:w-64 sm:h-64 mb-6 sm:mb-8 object-contain drop-shadow-2xl"
                />
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-2">
                    Analyzing Responses
                </h2>
                <p className="text-base sm:text-lg text-indigo-600 dark:text-indigo-400 font-bold animate-pulse">
                    Calculating your final score...
                </p>
            </div>
        );
    }

    if (view === "result") {
        return (
            <ExamResult
                passed={score >= 80}
                score={score}
                onClose={onClose}
                onViewBadge={() => { onClose(); navigate("/achievements"); }}
                onRetake={() => {
                    setSelectedAnswers({});
                    setCurrentIndex(0);
                    setScore(0);
                    setTimeLeft(questions.length * 60);
                    setView("quiz");
                }}
            />
        );
    }

    const currentQ = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    return (
        <div
            className="fixed inset-0 z-[500] bg-white dark:bg-[#050505] flex flex-col h-screen w-screen overflow-hidden font-dm animate-in fade-in duration-300 select-none"
            onCopy={preventCheating}
            onCut={preventCheating}
            onPaste={preventCheating}
            onContextMenu={preventCheating}
        >
            {/* Modals for exit/submit */}
            {showExitConfirm && (
                <div className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl">
                        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold dark:text-white mb-2">Forfeit Exam?</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Your timer will stop, and all current progress will be lost permanently.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowExitConfirm(false)} className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-xl font-bold">Cancel</button>
                            <button onClick={onClose} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">Yes, Exit</button>
                        </div>
                    </div>
                </div>
            )}

            {showSubmitConfirm && (
                <div className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#111] p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl">
                        <CheckCircle className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold dark:text-white mb-2">Ready to Submit?</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">You cannot change your answers after this point.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowSubmitConfirm(false)} className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-xl font-bold">Review</button>
                            <button onClick={() => { setShowSubmitConfirm(false); submitExam(); }} className="flex-1 py-3 bg-green-500 text-white rounded-xl font-bold">Submit</button>
                        </div>
                    </div>
                </div>
            )}

            <header className="h-16 sm:h-20 border-b border-gray-100 dark:border-gray-900 flex items-center justify-between px-4 sm:px-8 shrink-0 relative bg-white dark:bg-[#050505]">
                <button onClick={() => setShowExitConfirm(true)} className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-bold z-10">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6" /> <span className="hidden sm:inline">Exit</span>
                </button>

                <div className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm sm:text-base font-black px-5 py-2 rounded-full border-2 transition-colors ${timeLeft <= 60 ? "bg-red-50 text-red-600 border-red-200 animate-pulse" : "bg-gray-50 text-gray-900 border-gray-200"}`}>
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" /> {formatTime(timeLeft)}
                </div>

                <div className="text-sm sm:text-base font-black text-gray-400 z-10 bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800">
                    {currentIndex + 1} <span className="opacity-50">/ {questions.length}</span>
                </div>
            </header>

            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-900 shrink-0">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
            </div>

            <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 min-h-0">
                <div className="mb-6 sm:mb-8 shrink-0 flex items-center justify-center min-h-[20%] sm:min-h-[30%] px-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white text-center leading-relaxed">
                        {currentQ.QuestionText}
                    </h2>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 min-h-0">
                    {currentQ.shuffledOptions.map((optValue, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optValue }))}
                            className={`w-full h-full flex items-center justify-center text-center p-4 sm:p-6 rounded-2xl border-2 transition-all font-bold text-base sm:text-xl shadow-sm ${selectedAnswers[currentIndex] === optValue ? "border-indigo-500 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-500/20" : "border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-gray-50"}`}
                        >
                            {optValue}
                        </button>
                    ))}
                </div>

                <div className="h-auto sm:h-24 shrink-0 flex justify-between items-center mt-6 sm:mt-8 pt-4 sm:pt-0 border-t border-gray-100 sm:border-none">
                    <button onClick={() => setCurrentIndex(prev => prev - 1)} disabled={currentIndex === 0} className="flex items-center gap-2 px-5 py-3.5 font-bold text-gray-500 disabled:opacity-30 hover:bg-gray-100 rounded-xl transition-colors">
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Previous
                    </button>

                    {isLast ? (
                        <button onClick={() => setShowSubmitConfirm(true)} disabled={isSubmitting || selectedAnswers[currentIndex] === undefined} className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg hover:-translate-y-1 min-w-[160px]">
                            {isSubmitting ? (
                                <Loader2 className="animate-spin w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <>Finish Exam <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /></>
                            )}
                        </button>
                    ) : (
                        <button onClick={() => setCurrentIndex(prev => prev + 1)} disabled={selectedAnswers[currentIndex] === undefined} className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg hover:-translate-y-1">
                            Next Question <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ExamRunner;