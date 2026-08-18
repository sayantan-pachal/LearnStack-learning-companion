/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { Lightbulb, Quote, Sparkles } from "lucide-react";

// A curated list of high-quality quotes for learning, coding, growth, and motivation
const quotes = [
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Any fool can know. The point is to understand.", author: "Albert Einstein" },
  { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "It’s not that I’m so smart, it’s just that I stay with problems longer.", author: "Albert Einstein" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Education is not the learning of facts, but the training of the mind to think.", author: "Albert Einstein" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.", author: "Dan Salomon" },

  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "The important thing is to never stop questioning.", author: "Albert Einstein" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },

  { text: "The more you learn, the more you realize how much you don't know.", author: "Albert Einstein" },
  { text: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.", author: "Abigail Adams" },
  { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
  { text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch" },
  { text: "Live and learn.", author: "Proverb" },
  { text: "Knowledge speaks, but wisdom listens.", author: "Jimi Hendrix" },
  { text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", author: "Albert Einstein" },
  { text: "The roots of education are bitter, but the fruit is sweet.", author: "Aristotle" },
  { text: "Learning without reflection is a waste. Reflection without learning is dangerous.", author: "Confucius" },
  { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },

  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Good code is its own best documentation.", author: "Steve McConnell" },
  { text: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" },
  { text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
  { text: "Programs are meant to be read by humans and only incidentally for computers to execute.", author: "Harold Abelson" },
  { text: "The best code is no code at all.", author: "Jeff Atwood" },
  { text: "Walking on water and developing software from a specification are easy if both are frozen.", author: "Edward V. Berard" },
  { text: "Computers are good at following instructions, but not at reading your mind.", author: "Donald Knuth" },

  { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
  { text: "Testing can show the presence of bugs, but not their absence.", author: "Edsger W. Dijkstra" },
  { text: "The best way to predict the future is to implement it.", author: "David Heinemeier Hansson" },
  { text: "Code never lies, comments sometimes do.", author: "Ron Jeffries" },
  { text: "Fix the cause, not the symptom.", author: "Steve Maguire" },
  { text: "Deleted code is debugged code.", author: "Jeff Sickel" },
  { text: "A good programmer is someone who always looks both ways before crossing a one-way street.", author: "Doug Linder" },
  { text: "There are only two kinds of languages: the ones people complain about and the ones nobody uses.", author: "Bjarne Stroustrup" },
  { text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" },
  { text: "Debugging is twice as hard as writing the code in the first place.", author: "Brian Kernighan" },

  { text: "Failure is simply the opportunity to begin again, this time more intelligently.", author: "Henry Ford" },
  { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius" },
  { text: "Mistakes are the portals of discovery.", author: "James Joyce" },
  { text: "Failure is success in progress.", author: "Albert Einstein" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
  { text: "Don't fear failure. Fear being in the exact same place next year as you are today.", author: "Michael Hyatt" },
  { text: "Failure is not the opposite of success; it is part of success.", author: "Arianna Huffington" },
  { text: "Every mistake is a lesson if you are willing to learn.", author: "Oprah Winfrey" },
  { text: "The master has failed more times than the beginner has even tried.", author: "Stephen McCranie" },
  { text: "Fall seven times and stand up eight.", author: "Japanese Proverb" },

  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "Motivation gets you going, but discipline keeps you growing.", author: "John C. Maxwell" },
  { text: "Small disciplines repeated with consistency lead to great achievements.", author: "John C. Maxwell" },
  { text: "Success doesn't come from what you do occasionally. It comes from what you do consistently.", author: "Marie Forleo" },
  { text: "Don't limit your challenges. Challenge your limits.", author: "Jerry Dunn" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "If you want something you've never had, you must be willing to do something you've never done.", author: "Thomas Jefferson" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },

  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving them.", author: "Zig Ziglar" },
  { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "If you can dream it, you can do it.", author: "Walt Disney" },
  { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },

  { text: "Technology is best when it brings people together.", author: "Matt Mullenweg" },
  { text: "The advance of technology is based on making it fit in so that you don't really even notice it.", author: "Bill Gates" },
  { text: "The great growling engine of change is technology.", author: "Alvin Toffler" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
  { text: "The technology you use impresses no one. The experience you create with it is everything.", author: "Sean Gerety" },
  { text: "The real problem is not whether machines think but whether men do.", author: "B.F. Skinner" },
  { text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan" },
  { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" },
  { text: "The important thing is to never stop learning.", author: "Anonymous" },

  { text: "Problem-solving is the essence of computer programming.", author: "Steve McConnell" },
  { text: "We cannot solve problems with the kind of thinking we employed when we came up with them.", author: "Albert Einstein" },
  { text: "A problem well put is half solved.", author: "John Dewey" },
  { text: "The formulation of a problem is often more essential than its solution.", author: "Albert Einstein" },
  { text: "You can't solve a problem on the same level that it was created.", author: "Albert Einstein" },
  { text: "The significant problems we face cannot be solved at the same level of thinking we were at when we created them.", author: "Albert Einstein" },
  { text: "Don't find fault, find a remedy.", author: "Henry Ford" },
  { text: "The best solution to a problem is usually the simplest one.", author: "Unknown" },
  { text: "Think twice, code once.", author: "Unknown" },
  { text: "Every problem is an opportunity in disguise.", author: "John Archibald Wheeler" },

  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
  { text: "What we think, we become.", author: "Buddha" },
  { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", author: "Eleanor Roosevelt" },
  { text: "Knowledge is power.", author: "Francis Bacon" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "The beautiful thing about learning is nobody can take it away from you.", author: "B.B. King" },
  { text: "Learn from yesterday, live for today, hope for tomorrow.", author: "Albert Einstein" },
  { text: "The more difficult the victory, the greater the happiness in winning.", author: "Pelé" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },

  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  { text: "Keep your eyes on the stars, and your feet on the ground.", author: "Theodore Roosevelt" },
  { text: "Quality means doing it right when no one is looking.", author: "Henry Ford" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
  { text: "If opportunity doesn't knock, build a door.", author: "Milton Berle" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
  { text: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupéry" },
  { text: "The harder I work, the luckier I get.", author: "Samuel Goldwyn" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" }
];

export default function DailyQuote() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  // Pick a random quote on every reload/mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="relative overflow-hidden w-full group rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-theme-blue-600/50 via-purple-600 to-theme-pink-600/50 text-white shadow-xl shadow-theme-blue-500/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-theme-pink-500/20">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-theme-blue-400/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      {/* Giant Watermark Quote Icon */}
      <Quote className="absolute -bottom-4 -right-2 w-28 h-28 text-white/10 -rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-110 duration-700 pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner">
            <Lightbulb className="w-3.5 h-3.5 text-yellow-300" />
          </div>
          <h3 className="text-[10px] sm:text-xs font-bold text-white/90 uppercase tracking-widest flex items-center gap-1">
            Daily Motivation <Sparkles className="w-3 h-3 text-yellow-300 opacity-70" />
          </h3>
        </div>
        
        {/* Quote Text */}
        <p className="text-base sm:text-lg font-medium text-white leading-relaxed mb-6 font-serif italic drop-shadow-md">
          "{currentQuote.text}"
        </p>
        
        {/* Author */}
        <div className="mt-auto flex items-center gap-3">
          <div className="w-6 h-[2px] bg-white/40 rounded-full"></div>
          <p className="text-xs sm:text-sm font-bold text-white/80 tracking-wider">
            {currentQuote.author}
          </p>
        </div>
      </div>
      
    </div>
  );
}