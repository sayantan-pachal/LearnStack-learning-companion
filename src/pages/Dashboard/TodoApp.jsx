import React, { useState, useEffect } from 'react';
import { CheckCircle2, Trash2, Edit2, Plus, X, Save, CheckSquare } from 'lucide-react';

export default function TodoApp() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("learnstack_todos");
        return saved ? JSON.parse(saved) : [
            { id: 1, text: "Review React Hooks", completed: false },
            { id: 2, text: "Finish DSA Assignment", completed: false }
        ];
    });
    
    const [inputValue, setInputValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        localStorage.setItem("learnstack_todos", JSON.stringify(todos));
    }, [todos]);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const newTodo = { id: Date.now(), text: inputValue.trim(), completed: false };
        setTodos([newTodo, ...todos]);
        setInputValue("");
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };

    const saveEdit = () => {
        if (!editText.trim()) {
            setEditingId(null);
            return;
        }
        setTodos(todos.map(todo => 
            todo.id === editingId ? { ...todo, text: editText.trim() } : todo
        ));
        setEditingId(null);
        setEditText("");
    };

    return (
        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-theme-pink-50 dark:bg-theme-pink-900/10 flex items-center justify-center text-theme-pink-600 dark:text-theme-pink-400">
                    <CheckSquare className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">My Tasks</h3>
                <span className="ml-auto text-xs font-bold text-theme-blue-600 dark:text-theme-pink-400 bg-theme-blue-50 dark:bg-theme-blue-900/10 px-2 py-1 rounded-md">
                    {todos.filter(t => t.completed).length}/{todos.length}
                </span>
            </div>

            <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-theme-blue-500 outline-none text-sm font-medium dark:text-white transition-all"
                />
                <button type="submit" disabled={!inputValue.trim()} className="bg-theme-blue-600 hover:bg-theme-blue-700 text-white p-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    <Plus className="w-5 h-5" />
                </button>
            </form>

            <div className="space-y-3 overflow-y-auto max-h-[300px] scrollbar-thin pr-2 scrollbar-hide">
                {todos.length === 0 ? (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-6 italic">No tasks yet. Add one above!</p>
                ) : (
                    todos.map((todo) => (
                        <div key={todo.id} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#111] transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                            
                            {/* Checkbox */}
                            <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                                <input 
                                    type="checkbox" 
                                    className="peer sr-only" 
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                />
                                <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-700 rounded transition-all peer-checked:bg-theme-blue-600 peer-checked:border-theme-blue-600 dark:peer-checked:bg-theme-pink-500 dark:peer-checked:border-theme-pink-500 cursor-pointer"></div>
                                <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={3} />
                            </div>

                            {/* Text or Edit Mode */}
                            <div className="flex-1 min-w-0">
                                {editingId === todo.id ? (
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="text" 
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                                            autoFocus
                                            className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-[#0a0a0a] border border-theme-blue-300 dark:border-theme-blue-700 focus:outline-none text-sm dark:text-white"
                                        />
                                        <button onClick={saveEdit} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"><Save className="w-4 h-4" /></button>
                                        <button onClick={() => setEditingId(null)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"><X className="w-4 h-4" /></button>
                                    </div>
                                ) : (
                                    <span className={`block text-sm font-medium transition-all break-words ${todo.completed ? "text-gray-400 dark:text-gray-600 line-through" : "text-gray-700 dark:text-gray-300"}`}>
                                        {todo.text}
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            {!editingId && (
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                    <button onClick={() => startEdit(todo)} className="p-1.5 text-gray-400 hover:text-theme-blue-600 transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => deleteTodo(todo.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}