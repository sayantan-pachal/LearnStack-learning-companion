/* eslint-disable no-unused-vars */
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export const ID = {
    unique: () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
};

// Hashing Function
const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};

export const account = {
    // 1. Step One: Send OTP for Signup
    sendVerificationOTP: async (email, name, phone, password) => {
        const hashedPassword = await hashPassword(password);
        
        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8", // <-- FIXED
            },
            body: JSON.stringify({
                action: "sendOTP",
                name: name,
                email: email,
                phone: phone,
                password: hashedPassword
            })
        });
        
        const data = await res.json();
        if (data.status === "error") throw new Error(data.message);
        return data;
    },

    // Request a password reset OTP
    sendResetOTP: async (email) => {
        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                action: "sendResetOTP",
                email: email
            })
        });
        const data = await res.json();
        if (data.status === "error") throw new Error(data.message);
        return data;
    },

    // Verify OTP and set new password
    resetPasswordWithOTP: async (email, otp, newPassword) => {
        const hashedPassword = await hashPassword(newPassword);
        
        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                action: "resetPasswordWithOTP",
                email: email,
                otp: otp,
                newPassword: hashedPassword
            })
        });

        const data = await res.json();
        if (data.status === "error") throw new Error(data.message);
        return data;
    },

    // 2. Step Two: Verify OTP and Create Account
    verifyAndCreateAccount: async (email, otp) => {
        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8", // <-- FIXED
            },
            body: JSON.stringify({
                action: "verifyOTP",
                email: email,
                otp: otp
            })
        });

        const data = await res.json();
        if (data.status === "error") throw new Error(data.message);
        return data;
    },

    // 3. Create Session (Login)
    createEmailPasswordSession: async (email, password) => {
        const hashedPassword = await hashPassword(password);

        // <-- FIXED: Now uses the secure POST login action from your Apps Script
        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8", 
            },
            body: JSON.stringify({
                action: "login",
                email: email,
                password: hashedPassword
            })
        });

        const data = await res.json();
        if (data.status === "error") throw new Error(data.message);

        // Save session locally
        localStorage.setItem("learnstack_user", JSON.stringify(data.user));
        return data.user;
    },
    
    // 4. Get currently logged in user profile
    get: async () => {
        const userData = localStorage.getItem("learnstack_user");
        if (!userData) throw new Error("No active session");
        return JSON.parse(userData);
    },

    // 5. Logout
    deleteSession: async (sessionId = "current") => {
        localStorage.removeItem("learnstack_user");
        return true;
    },

    // 6. Update password from inside the dashboard
    updatePassword: async (email, oldPassword, newPassword) => {
        // 🔒 CRITICAL FIX: Hash both passwords so they match the Google Sheets database!
        const hashedOldPassword = await hashPassword(oldPassword);
        const hashedNewPassword = await hashPassword(newPassword);

        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                action: "updatePassword",
                email: email,
                oldPassword: hashedOldPassword, 
                newPassword: hashedNewPassword
            })
        });

        const data = await res.json();
        if (data.status === "error") throw new Error(data.message);
        return data;
    },

    // 7. Reset Password Without Email (Uses Phone Verification)
    recoverPassword: async (email, phone, newPassword) => {
        const res = await fetch(`${SCRIPT_URL}?sheet=Users`);
        const users = await res.json();

        if (users.error) throw new Error(users.error);

        // Find user by matching BOTH email and phone exactly
        const user = users.find(u => 
            String(u.email).trim().toLowerCase() === String(email).trim().toLowerCase() && 
            String(u.phone).trim() === String(phone).trim()
        );

        if (!user) throw new Error("No account matches this email and phone combination.");

        // Hash the new password
        const hashedNew = await hashPassword(newPassword);
        const updatedUser = { ...user, password: hashedNew };

        // Send update to Google Sheets
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                sheet: "Users",
                action: "update",
                id: user.userId,
                data: updatedUser
            })
        });

        return true;
    },

    updateProfile: async (email, newName, newPhone, newCollege, newYear, newDepartment) => {
        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                action: "updateProfile",
                email: email,
                name: newName,
                phone: newPhone,
                college: newCollege,
                year: newYear,
                department: newDepartment
            })
        });

        const data = await res.json();
        if (data.status === "error") throw new Error(data.message);

        const currentUser = JSON.parse(localStorage.getItem("learnstack_user"));
        const updatedUser = { 
            ...currentUser, 
            name: newName, 
            phone: newPhone,
            college: newCollege,
            year: newYear,
            department: newDepartment 
        };
        localStorage.setItem("learnstack_user", JSON.stringify(updatedUser));
        return data;
    },
};

// Replicating Appwrite's Database interface for LearnStack
export const databases = {
    listDocuments: async (dbId, collectionId, queries = []) => {
        const res = await fetch(`${SCRIPT_URL}?sheet=${collectionId}`);
        const data = await res.json();

        const currentUser = JSON.parse(localStorage.getItem("learnstack_user"));
        
        // If pulling UserProgress or ActivityLogs, only return current user's data
        if (currentUser && currentUser.userId && (collectionId === "UserProgress" || collectionId === "ActivityLogs")) {
            return { documents: data.filter(doc => doc.userId === currentUser.userId) };
        }
        // If pulling Courses, return all data
        return { documents: data };
    },

    createDocument: async (dbId, collectionId, documentId, data) => {
        const documentData = { ...data, $id: documentId };
        
        // 🧼 Clear dashboard cache so it pulls fresh learning data
        sessionStorage.removeItem("dashboard_learning_data");
        sessionStorage.removeItem("dashboard_cache_time");

        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                sheet: collectionId,
                action: "create",
                data: documentData
            })
        });
        return documentData;
    },

    updateDocument: async (dbId, collectionId, documentId, data) => {
        const documentData = { ...data, $id: documentId };

        // 🧼 Clear dashboard cache on update
        sessionStorage.removeItem("dashboard_learning_data");
        sessionStorage.removeItem("dashboard_cache_time");

        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                sheet: collectionId,
                action: "update",
                id: documentId,
                data: documentData
            })
        });
        return documentData;
    },

    deleteDocument: async (dbId, collectionId, documentId) => {
        // 🧼 Clear dashboard cache on delete
        sessionStorage.removeItem("dashboard_learning_data");
        sessionStorage.removeItem("dashboard_cache_time");

        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                sheet: collectionId,
                action: "delete",
                id: documentId
            })
        });
        return true;
    },

    // Log user learning activity
    logActivity: async (actionType, description) => {
        try {
            const currentUser = JSON.parse(localStorage.getItem("learnstack_user"));
            if (!currentUser) return; // Fail silently if not logged in

            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({
                    sheet: "ActivityLogs",
                    action: "logActivity",
                    data: {
                        userId: currentUser.userId,
                        actionType: actionType,
                        description: description
                    }
                })
            });
        } catch (e) {
            console.error("Failed to log activity", e);
        }
    }
};

export const DATABASE_ID = "learnstack_db";
export const COURSES_COLLECTION_ID = "Courses";
export const PROGRESS_COLLECTION_ID = "UserProgress";
export const ROADMAPS_COLLECTION_ID = "Roadmaps";