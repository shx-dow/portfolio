"use client"

import { Github, Linkedin, Mail, Code, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <main className="min-h-screen p-8 pt-24 md:p-24 md:pt-32 transition-all duration-300 ease-in-out">
      <section className="max-w-4xl mx-auto space-y-16">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 animate-gradient">
            Hi, I'm Chitransh
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
            A second-year B.Tech CSE student passionate about technology and innovation.
          </p>
        </div>

        <section id="about" className="space-y-4 relative">
          <div className="absolute left-0 top-0 w-1 h-full glowing-line rounded-full"></div>
          <div className="pl-6">
            <h2 className="text-3xl font-semibold font-poppins">About Me</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
              I'm a curious and dedicated student, always eager to learn and explore new technologies. My journey in
              computer science has just begun, and I'm excited about the endless possibilities ahead.
            </p>
          </div>
        </section>

        <section id="skills" className="space-y-4 relative">
          <div className="absolute left-0 top-0 w-1 h-full glowing-line rounded-full"></div>
          <div className="pl-6">
            <h2 className="text-3xl font-semibold font-poppins">Skills & Interests</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                "Programming",
                "Web Development",
                "Data Structures",
                "Algorithms",
                "Machine Learning",
                "Problem Solving",
              ].map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="text-sm py-1 px-2 transition-all duration-300 ease-in-out hover:scale-105 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-4 relative">
          <div className="absolute left-0 top-0 w-1 h-full glowing-line rounded-full"></div>
          <div className="pl-6">
            <h2 className="text-3xl font-semibold font-poppins">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 mt-4">
              <Card className="transition-all duration-300 ease-in-out hover:shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <CardHeader>
                  <CardTitle>Weather App</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    A simple weather application using React and OpenWeatherMap API
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    This project demonstrates API integration, state management, and responsive design in React.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                    onClick={() => {
                      alert(`
import React, { useState } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=YOUR_API_KEY&units=metric\`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
                      `)
                    }}
                  >
                    <Code className="mr-2 h-4 w-4" /> View Code
                  </Button>
                </CardFooter>
              </Card>
              <Card className="transition-all duration-300 ease-in-out hover:shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <CardHeader>
                  <CardTitle>Todo List</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    A simple todo list application using React hooks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    This project showcases state management, component composition, and basic CRUD operations in React.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                    onClick={() => {
                      alert(`
import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
                      `)
                    }}
                  >
                    <Code className="mr-2 h-4 w-4" /> View Code
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <div className="space-y-4 relative">
          <div className="absolute left-0 top-0 w-1 h-full glowing-line rounded-full"></div>
          <div className="pl-6">
            <h2 className="text-3xl font-semibold font-poppins">Education</h2>
            <Card className="transition-all duration-300 ease-in-out hover:shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 mt-4">
              <CardHeader>
                <CardTitle>B.Tech in Computer Science and Engineering</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Your University Name, 2022 - 2026 (Expected)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Relevant coursework: Data Structures, Algorithms, Database Management, etc.</li>
                  <li>Current GPA: [Your GPA]</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4 relative">
          <div className="absolute left-0 top-0 w-1 h-full glowing-line rounded-full"></div>
          <div className="pl-6">
            <h2 className="text-3xl font-semibold font-poppins">Achievements</h2>
            <ul className="space-y-2 mt-4">
              <li className="flex items-center transition-all duration-300 ease-in-out hover:translate-x-2">
                <Award className="mr-2 h-5 w-5 text-yellow-500" />
                <span className="text-gray-700 dark:text-gray-300">Dean's List - Fall 2022, Spring 2023</span>
              </li>
              <li className="flex items-center transition-all duration-300 ease-in-out hover:translate-x-2">
                <Award className="mr-2 h-5 w-5 text-yellow-500" />
                <span className="text-gray-700 dark:text-gray-300">1st Place - University Hackathon 2023</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 relative">
          <div className="absolute left-0 top-0 w-1 h-full glowing-line rounded-full"></div>
          <div className="pl-6">
            <h2 className="text-3xl font-semibold font-poppins">Let's Connect</h2>
            <div className="flex space-x-4 mt-4">
              <Link
                href="https://github.com"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                <Github size={24} className="transition-transform duration-300 ease-in-out hover:scale-110" />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                <Linkedin size={24} className="transition-transform duration-300 ease-in-out hover:scale-110" />
              </Link>
              <Link
                href="mailto:chitransh@example.com"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                <Mail size={24} className="transition-transform duration-300 ease-in-out hover:scale-110" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

